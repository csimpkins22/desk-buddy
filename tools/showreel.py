"""Play everything Lump can do, back to back, through the bridge.

    python3 tools/showreel.py                 # moods, then events, tap gags and clips
    python3 tools/showreel.py gags clips      # just some of: moods events gags clips

Moods are shown for a few seconds each (so the transitions between them play too); everything else
plays once, timed from the lengths in firmware/data/lump.bin and the clip files. While it runs, a
Claude session changing state can move him to another mood; the gags then play in that mood.
"""
import json, os, struct, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, "firmware", "data", "lump.bin")
CLIPS = os.path.expanduser("~/.desk-buddy/clips")
BRIDGE = "http://127.0.0.1:47823"
MOODS = ["idle", "working", "longhaul", "alert", "waiting", "done", "awake", "letter", "meeting", "night", "idle"]


def sequences(path):
    """(kind, name, seconds) for every sequence in a lump.bin or clip file."""
    d = open(path, "rb").read()
    n_moods, fps = d[8], d[9]; p = 10
    for _ in range(n_moods): p += 2 + d[p + 1]
    wide = 2 if d[4] >= 5 else 1                     # version 5 on: a two-byte count
    out = []; count = int.from_bytes(d[p:p + wide], "little"); p += wide
    for _ in range(count):
        kind, n = d[p], d[p + 3]; name = d[p + 4:p + 4 + n].decode(); p += 4 + n
        ticks, = struct.unpack_from("<H", d, p); p += 2 + 2 * ticks
        out.append((kind, name, ticks / fps))
    return out


def post(path, body):
    try:
        return urllib.request.urlopen(urllib.request.Request(BRIDGE + path, data=body.encode(), method="POST"), timeout=30).read().decode()
    except Exception as e:
        return f"failed: {e}"


def show(label, path, body, secs):
    print(f"{label:28s} {secs:4.1f} s  {post(path, body)}", flush=True)
    time.sleep(secs)


def main():
    want = set(sys.argv[1:]) or {"moods", "events", "gags", "clips"}
    events = {name: secs for kind, name, secs in sequences(ART) if kind == 2}
    longest = lambda gag: max(s for n, s in events.items() if n.startswith(f"tap_{gag}_"))
    playable = json.loads(urllib.request.urlopen(BRIDGE + "/play", timeout=5).read())
    if "moods" in want:
        for m in MOODS: show("mood: " + m, "/cmd", "s " + m, 6)
    for name in playable:
        if name == "tap": continue                       # a random gag: the named ones below cover it
        if name in events:                               # hello, oops, the fidgets
            if "events" in want: show(name, "/play", name, events[name] + 3)
        elif os.path.exists(os.path.join(CLIPS, name + ".clip")):
            if "clips" in want: show("clip: " + name, "/play", name, max(s for _, _, s in sequences(os.path.join(CLIPS, name + ".clip"))) + 4)
        elif "gags" in want:
            show("gag: " + name, "/play", name, longest(name) + (6 if name == "startle" else 1.5))   # the startle walks to night first
    post("/cmd", "s idle")


if __name__ == "__main__":
    main()
