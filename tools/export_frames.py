"""Bake Lump's browser animation into a binary the firmware plays back.

    python3 tools/export_frames.py --bake                 # headless Chrome: writes firmware/data/lump.bin
    python3 tools/export_frames.py --clip encore          # just the sequences named encore / encore_*,
                                                          # as ~/.desk-buddy/clips/encore.clip (sent over Wi-Fi).
                                                          # design/clips/encore.js, if there is one, is loaded
                                                          # first: it adds the clip's drawings and its sequence
    python3 tools/export_frames.py --clip all             # every design/clips/*.js
    python3 tools/export_frames.py --clip encore --sheet encore.png
                                                          # don't bake: save its drawings side by side to look at
    python3 tools/export_frames.py --clip encore --define my_clips.json
                                                          # ...where the JSON adds sequences built from his
                                                          # existing drawings: {"encore": {"home": "idle", "seq": [["S1", 4], ...]}}
    python3 tools/export_frames.py 8767                   # serve design/ for editing; run EXPORT_JS in the
                                                          # page's console to bake from your own browser

The page posts its mood/sequence list to /meta, then every 24 fps frame of every sequence: the
picture (raw RGBA) and the canvas calls that drew it. Identical frames are stored once. Each frame
is kept as drawing instructions (about a kilobyte, drawn on the board by firmware/src/vec.h) when
that renderer reproduces the browser's picture closely enough, and as pixels otherwise.

lump.bin layout (little-endian), version 4:
  "LUMP" u16 version=4  u16 nFrames  u8 nMoods  u8 fps
  per mood:      u8 base mood index, u8 nameLen, name
  u8 nSeqs
  per sequence:  u8 kind (0 loop, 1 transition, 2 event), u8 from, u8 to,
                 u8 nameLen, name, u16 length, u16 frame index per tick
  u32 offset[nFrames]  (from start of frame data; top bit set = an instruction frame)
  frame data: a pixel frame is runs of [u8 count (1..255)][u16 rgb565 big-endian] until 57600 px;
              an instruction frame is u16 length, then the instructions (see encode())
A clip is the same layout holding only its own sequences and frames.
"""
import argparse, glob, hashlib, http.server, json, os, re, shutil, socket, struct, subprocess, sys, tempfile, threading, zlib
from urllib.parse import urlparse, parse_qs

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESIGN = os.path.join(ROOT, "design")
OUT = os.path.join(ROOT, "firmware", "data", "lump.bin")
CLIPS = os.path.expanduser("~/.desk-buddy/clips")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PIXELS = 240 * 240 * 4
MAX_MEAN, MAX_FAR = 2.0, 300      # an instruction frame may differ from the browser's by this much: mean % of full
                                  # scale, and pixels more than a quarter of full scale apart (thin edge fringes)

units = {}    # frame id -> (rgba bytes, canvas calls)
where = {}    # (sequence key, tick) -> frame id
meta = {}
done = threading.Event()
result = {}
out_path = OUT

EXPORT_JS = r"""
(async () => {
  // Body colour is exported as pure magenta, a marker the firmware swaps for the real colour
  // at runtime (so his colour can change on the fly).
  const cfg = window.__lumpExport || {};
  const TINT = cfg.tint || '#FF00FF';
  const L = window.__lump, cv = document.createElement('canvas'); cv.width = cv.height = 240;
  const c = cv.getContext('2d', { willReadFrequently: true });
  L.setLine('glow'); L.setTint(TINT);
  for (const [name, def] of Object.entries(cfg.define || {})) L.CLIPS[name] = def;
  // draw through a recorder, so each frame is also kept as the canvas calls that made it
  let ops = [];
  const rec = new Proxy(c, {
    get(t, p) { const v = t[p]; if (typeof v !== 'function') return v;
      return (...a) => { ops.push([p, ...a.map(x => (typeof x === 'number' || typeof x === 'string' || Array.isArray(x)) ? x : null)]); return v.apply(t, a); }; },
    set(t, p, v) { t[p] = v; ops.push(['=' + p, (p === 'fillStyle' || p === 'strokeStyle') ? t[p] : v]); return true; }
  });
  const meta = L.meta();
  if (cfg.only) meta.seqs = meta.seqs.filter(s => cfg.only.some(n => s.name === n || s.name.startsWith(n + '_')));
  await fetch('/meta', { method: 'POST', body: JSON.stringify(meta) });
  const seen = new Map(); let n = 0;
  L.render(c, 'idle', L.at('idle', 0).id, 0, { dim: false });     // one frame first, as the page has always drawn one before
  for (const s of meta.seqs) {
    for (let t = 0; t < L.seqLen(s.key); t++) {
      const a = s.kind === 0 ? L.at(s.key, t) : L.atSeq(s.key, t);
      // the page doesn't reset the canvas between frames, so a frame starts with whatever the last one left set
      ops = [['=lineCap', c.lineCap], ['=lineJoin', c.lineJoin], ['=lineWidth', c.lineWidth], ['=fillStyle', c.fillStyle], ['=strokeStyle', c.strokeStyle],
             ['=globalAlpha', c.globalAlpha], ['setLineDash', c.getLineDash()], ['=lineDashOffset', c.lineDashOffset]];
      L.render(rec, s.kind === 0 ? s.key : L.fxFor(a.id), a.id, t, { dim: false });
      const calls = JSON.stringify(ops), q = `seq=${encodeURIComponent(s.key)}&tick=${t}`, was = seen.get(calls);
      if (was !== undefined && !calls.includes('"drawImage"')) await fetch(`/same?${q}&as=${was}`, { method: 'POST' });   // same calls, same picture
      else { seen.set(calls, n); await fetch(`/frame?${q}&id=${n}`, { method: 'POST', body: new Blob([c.getImageData(0, 0, 240, 240).data, calls]) }); }
      n++;
    }
  }
  return n + ' frames; ' + await (await fetch('/finish', { method: 'POST' })).text();
})().catch(e => fetch('/error', { method: 'POST', body: String(e && e.stack || e) }))
"""


def rgb565(r, g, b):
    return ((r >> 3) << 11) | ((g >> 2) << 5) | (b >> 3)


def rle(rgba):
    px = [rgb565(rgba[i], rgba[i + 1], rgba[i + 2]) for i in range(0, len(rgba), 4)]
    out = bytearray(); i = 0; n = len(px)
    while i < n:
        v = px[i]; j = i + 1
        while j < n and px[j] == v and j - i < 255:
            j += 1
        out += bytes([j - i]) + struct.pack(">H", v)
        i = j
    return bytes(out)


# ---- instructions: one byte saying which canvas call, then its numbers. Lengths are in 1/16 px,
# angles in 1/4096 radian, scales in 1/256, colours RGBA. firmware/src/vec.h reads exactly this. ----
OP = {"beginPath": 1, "closePath": 2, "moveTo": 3, "lineTo": 4, "quadraticCurveTo": 5, "bezierCurveTo": 6, "arc": 7,
      "ellipse": 8, "rect": 9, "fillRect": 10, "fill": 11, "stroke": 12, "clip": 13, "save": 14, "restore": 15,
      "translate": 16, "rotate": 17, "scale": 18, "setTransform": 19, "=fillStyle": 20, "=strokeStyle": 21,
      "=lineWidth": 22, "=globalAlpha": 23, "setLineDash": 24, "roundRect": 25, "=lineDashOffset": 26}
# every stroke is drawn with round ends and corners, which is all his drawings use bar a few pointed corners
SAME = {"=lineCap": ("round",), "=lineJoin": ("round", "miter"), "=globalCompositeOperation": ("source-over",)}


def q(v, scale=16):
    return struct.pack("<h", max(-32768, min(32767, round(v * scale))))


def colour(s):
    m = re.fullmatch(r"#([0-9a-fA-F]{6})", s)
    if m: return bytes.fromhex(m.group(1)) + b"\xff"
    p = [float(x) for x in re.fullmatch(r"rgba?\(([^)]+)\)", s).group(1).split(",")]
    return bytes([int(p[0]), int(p[1]), int(p[2]), round((p[3] if len(p) > 3 else 1) * 255)])


def encode(calls):
    """The instructions for one frame's canvas calls, or None if it uses something vec.h can't draw."""
    out = bytearray()
    try:
        for o in calls:
            n, a = o[0], o[1:]
            if n in SAME:
                if a[0] not in SAME[n]: return None
                continue
            if n not in OP or (n in ("fill", "clip") and a): return None
            out.append(OP[n])
            if n in ("moveTo", "lineTo", "translate"): out += q(a[0]) + q(a[1])
            elif n == "quadraticCurveTo": out += b"".join(q(v) for v in a[:4])
            elif n == "bezierCurveTo": out += b"".join(q(v) for v in a[:6])
            elif n == "arc": out += q(a[0]) + q(a[1]) + q(a[2]) + q(a[3], 4096) + q(a[4], 4096) + bytes([1 if len(a) > 5 and a[5] else 0])
            elif n == "ellipse": out += b"".join(q(v) for v in a[:4]) + b"".join(q(v, 4096) for v in a[4:7]) + bytes([1 if len(a) > 7 and a[7] else 0])
            elif n in ("rect", "fillRect"): out += b"".join(q(v) for v in a[:4])
            elif n == "roundRect": out += b"".join(q(v) for v in a[:4]) + q(a[4][0] if isinstance(a[4], list) else a[4])
            elif n == "rotate": out += q(a[0], 4096)
            elif n == "scale": out += q(a[0], 256) + q(a[1], 256)
            elif n == "setTransform": out += b"".join(q(v, 256) for v in a[:4]) + q(a[4]) + q(a[5])
            elif n in ("=fillStyle", "=strokeStyle"): out += colour(a[0])
            elif n == "=lineWidth": out += struct.pack("<H", min(65535, round(a[0] * 16)))
            elif n == "=globalAlpha": out.append(max(0, min(255, round(a[0] * 255))))
            elif n == "setLineDash":
                if len(a[0]) > 8: return None
                out.append(len(a[0])); out += b"".join(struct.pack("<H", min(65535, round(v * 16))) for v in a[0])
            elif n == "=lineDashOffset": out += q(a[0])
    except (TypeError, AttributeError, IndexError):      # a gradient, an image, an argument that isn't a number
        return None
    return bytes(out) if len(out) < 65536 else None


def check(frames):
    """How well vec.h redraws each (instructions, rgba): a list of (mean % difference, far pixels, overflowed)."""
    exe = os.path.join(tempfile.gettempdir(), "lump_vec_check")
    src = os.path.join(ROOT, "tools", "vec_check.cpp"); hdr = os.path.join(ROOT, "firmware", "src", "vec.h")
    if not os.path.exists(exe) or os.path.getmtime(exe) < max(os.path.getmtime(src), os.path.getmtime(hdr)):
        subprocess.run(["clang++", "-O2", "-std=c++17", "-I", os.path.dirname(hdr), src, "-o", exe], check=True)
    feed = b"".join(struct.pack("<I", len(v)) + v + rgba for v, rgba in frames)
    res = subprocess.run([exe], input=feed, capture_output=True, check=True).stdout.decode().split("\n")
    return [(float(a), int(b), c == "1") for a, b, c in (line.split() for line in res if line)]


def pstr(s):
    b = s.encode(); return bytes([len(b)]) + b


def build():
    moods = [m["name"] for m in meta["moments"]]
    uniq, pics, calls, body = {}, [], [], bytearray()
    for s in meta["seqs"]:
        ticks = sorted(t for (k, t) in where if k == s["key"])
        seq = []
        for t in ticks:
            rgba, ops = units[where[(s["key"], t)]]; h = hashlib.sha1(rgba).digest()
            if h not in uniq:
                uniq[h] = len(pics); pics.append(rgba); calls.append(ops)
            seq.append(uniq[h])
        body += struct.pack("<BBB", s["kind"], moods.index(s["from"]), moods.index(s["to"])) + pstr(s["name"])
        body += struct.pack("<H", len(seq)) + struct.pack(f"<{len(seq)}H", *seq)
    vec = [encode(c) for c in calls]
    scores = iter(check([(v, pics[i]) for i, v in enumerate(vec) if v is not None]))
    blobs, why = [], {"instructions": 0, "pixels: uses something the renderer can't draw": 0, "pixels: didn't match closely enough": 0}
    worst = (0.0, 0)
    for i, v in enumerate(vec):
        if v is None:
            why["pixels: uses something the renderer can't draw"] += 1; blobs.append((0, rle(pics[i]))); continue
        mean, far, overflowed = next(scores)
        if overflowed or mean > MAX_MEAN or far > MAX_FAR:
            why["pixels: didn't match closely enough"] += 1; blobs.append((0, rle(pics[i]))); continue
        worst = (max(worst[0], mean), max(worst[1], far))
        why["instructions"] += 1; blobs.append((1, struct.pack("<H", len(v)) + v))
    out = bytearray(b"LUMP") + struct.pack("<HHBB", 4, len(blobs), len(moods), 24)
    for m in meta["moments"]:
        out += bytes([m["base"]]) + pstr(m["name"])
    out += bytes([len(meta["seqs"])]) + body
    off = 0
    for kind, blob in blobs:
        out += struct.pack("<I", off | (kind << 31)); off += len(blob)
    for _, blob in blobs:
        out += blob
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(out)
    return {"frames_rendered": len(where), "unique_frames": len(blobs), "bytes": len(out), "moods": len(moods),
            "sequences": len(meta["seqs"]), "kept_as": why, "instruction_bytes": sum(len(b) for k, b in blobs if k),
            "pixel_bytes": sum(len(b) for k, b in blobs if not k),
            "worst_instruction_frame": {"mean_difference_pct": worst[0], "pixels_far_off": worst[1]}, "out": out_path}


def sheet():
    """Instead of baking: the distinct drawings, in the order they first appear, side by side in one PNG."""
    order, seen = [], set()
    for s in meta["seqs"]:
        for t in sorted(t for (k, t) in where if k == s["key"]):
            i = where[(s["key"], t)]
            if i not in seen: seen.add(i); order.append(i)
    order = order[::max(1, -(-len(order) // 30))]                 # at most 30 of them
    cols = min(6, len(order)); rows = -(-len(order) // cols)
    px = bytearray(cols * 240 * rows * 240 * 3)
    for n, i in enumerate(order):
        rgba = units[i][0]; x0, y0 = (n % cols) * 240, (n // cols) * 240
        for y in range(240):
            row = rgba[y * 960:(y + 1) * 960]; at = ((y0 + y) * cols * 240 + x0) * 3
            px[at:at + 720] = bytes(b for k in range(0, 960, 4) for b in row[k:k + 3])
    raw = b"".join(b"\x00" + bytes(px[y * cols * 720:(y + 1) * cols * 720]) for y in range(rows * 240))
    chunk = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d))
    with open(out_path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", cols * 240, rows * 240, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw, 6)) + chunk(b"IEND", b""))
    return {"drawings": len(seen), "shown": len(order), "ticks": len(where), "seconds": round(len(where) / 24, 1), "out": out_path}


finish = build


class H(http.server.SimpleHTTPRequestHandler):
    page = None                                    # headless: the page to serve at /, with the export script added

    def __init__(self, *a, **k):
        super().__init__(*a, directory=DESIGN, **k)

    def log_message(self, *a):
        pass

    def do_GET(self):
        if self.page is not None and urlparse(self.path).path == "/":
            self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.end_headers()
            self.wfile.write(self.page); return
        super().do_GET()

    def do_POST(self):
        u = urlparse(self.path); n = int(self.headers.get("Content-Length", 0)); body = self.rfile.read(n)
        q = parse_qs(u.query)
        if u.path == "/meta":
            meta.clear(); meta.update(json.loads(body)); units.clear(); where.clear(); res = b"ok"
        elif u.path == "/frame":
            units[int(q["id"][0])] = (body[:PIXELS], json.loads(body[PIXELS:])); where[(q["seq"][0], int(q["tick"][0]))] = int(q["id"][0]); res = b"ok"
        elif u.path == "/same":
            where[(q["seq"][0], int(q["tick"][0]))] = int(q["as"][0]); res = b"ok"
        elif u.path == "/error":                    # the page hit a script error (headless: say so and stop)
            result["error"] = body.decode(errors="replace"); done.set(); res = b"ok"
        elif u.path == "/finish":
            info = finish(); print(json.dumps(info, indent=1), flush=True); res = json.dumps(info).encode()
            result.update(info); done.set()
        else:
            self.send_error(404); return
        self.send_response(200); self.send_header("Content-Type", "text/plain"); self.end_headers(); self.wfile.write(res)


def headless(config, scripts=()):
    """Run the export in headless Chrome (after any clip scripts) and wait for it to finish."""
    report = "<script>addEventListener('error', e => fetch('/error', { method: 'POST', body: e.message + ' (line ' + e.lineno + ')' }));</script>"
    page = open(os.path.join(DESIGN, "lump.html")).read() + report + "".join(f"<script>{open(p).read()}</script>" for p in scripts)
    H.page = (page + f"<script>window.__lumpExport = {json.dumps(config)};{EXPORT_JS}</script>").encode()
    done.clear(); result.clear()
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", port), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    profile = tempfile.mkdtemp(prefix="lump-export-")
    chrome = subprocess.Popen([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
                               f"--user-data-dir={profile}", f"http://127.0.0.1:{port}/"],
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        if not done.wait(900): sys.exit("Chrome didn't finish the export")
    finally:
        chrome.terminate(); chrome.wait(10); srv.shutdown(); shutil.rmtree(profile, ignore_errors=True)
    if "error" in result: sys.exit("the page stopped with an error: " + result["error"])


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("port", nargs="?", type=int, default=8765, help="serve design/ here (when not baking headless)")
    ap.add_argument("--bake", action="store_true", help="bake everything into firmware/data/lump.bin with headless Chrome")
    ap.add_argument("--clip", metavar="NAME", help="bake only the sequences called NAME or NAME_*, as a clip ('all': every design/clips/*.js)")
    ap.add_argument("--sheet", metavar="PNG", help="with --clip: save its drawings as one picture instead of baking")
    ap.add_argument("--define", metavar="JSON", help="a file of extra sequences made from existing drawings")
    ap.add_argument("--out", help="where to write (default: lump.bin, or ~/.desk-buddy/clips/NAME.clip)")
    args = ap.parse_args()
    if args.clip:
        source = lambda n: os.path.join(DESIGN, "clips", n + ".js")
        names = sorted(os.path.basename(p)[:-3] for p in glob.glob(source("*"))) if args.clip == "all" else [args.clip]
        for name in names:
            config = {"define": json.load(open(args.define)) if args.define else {}, "only": [name]}
            out_path = args.out or os.path.join(CLIPS, name + ".clip")
            if args.sheet: config["tint"] = "#FF7A45"; out_path = args.sheet; finish = sheet
            headless(config, [source(name)] if os.path.exists(source(name)) else [])
    elif args.bake:
        if args.out: out_path = args.out
        headless({})
    else:
        print(f"serving {DESIGN} on http://localhost:{args.port}", flush=True)
        http.server.ThreadingHTTPServer(("127.0.0.1", args.port), H).serve_forever()
