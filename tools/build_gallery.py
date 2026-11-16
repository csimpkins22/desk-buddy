"""Build the gallery of everything Lump can play: the data beside gallery/index.html.

    python3 tools/build_gallery.py                        # bake clips that are new or changed, write the manifest
    python3 -m http.server 8771 --directory gallery       # then open http://localhost:8771

The page replays his drawing instructions on a canvas, from the same files the board gets:
firmware/data/lump.bin (copied to gallery/lump.bin) and every design/clips/*.js baked to
gallery/clips/NAME.clip. gallery/manifest.json lists what to show and in which group.

A clip's first line says what happens and its second which group it belongs to (// group: weather).
The groups, in the order the page shows them, are below.
"""
import concurrent.futures, glob, json, os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "tools"))
from showreel import sequences

SCRIPTS = os.path.join(ROOT, "design", "clips")
OUT = os.path.join(ROOT, "gallery")
PLAY = "curl -X POST --data {} 127.0.0.1:47823/play"

GROUPS = [   # id, title, what it is
    ("moods", "Moods", "The loop he sits in for each Claude Code state."),
    ("reactions", "Reactions", "Small things he does by himself: a hello, an oops, a fidget."),
    ("gags", "Tap gags", "Built in. A tap on the glass sets one off, and each has a version for every mood."),
    ("tap", "Tap reactions", "More answers to a tap, mixed in with the gags."),
    ("work", "At work", "Tests, pushes, builds, merges, and the paperwork round them."),
    ("waiting", "Waiting on you", "Ways of asking for an answer."),
    ("celebrations", "Celebrations", "When a task is done."),
    ("meetings", "Meetings and messages", "A meeting coming up, a message landing."),
    ("clock", "Around the clock", "Once a day each, at their hour."),
    ("pastimes", "Pastimes", "What he gets up to when nothing is happening."),
    ("weather", "Weather", "Rain, sun, wind and snow, all indoors."),
    ("gadgets", "Tools and gadgets", "Things he found in a drawer."),
    ("nonsense", "Nonsense", "Physics is optional."),
    ("games", "Classic games", "Nods to old video games."),
    ("movies", "Movie scenes", "Nods to famous scenes."),
    ("memes", "Memes", "Nods to well-known memes."),
    ("scenes", "Scenes", "One-offs of every kind: close-ups, wide shots, quiet pieces, things that happen while he sleeps."),
    ("odd", "Odd ones", "He knows he is a drawing, lives in a glass cube, and time and scale don't always behave."),
    ("transitions", "Transitions", "How he gets from one mood to the next. He never cuts."),
]


def bake(name):
    out = os.path.join(OUT, "clips", name + ".clip"); src = os.path.join(SCRIPTS, name + ".js")
    if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src): return None
    cmd = [sys.executable, os.path.join(ROOT, "tools", "export_frames.py"), "--clip", name, "--out", out]
    for _ in range(2):                                       # now and then a headless Chrome never starts drawing: give it one more go
        try: r = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
        except subprocess.TimeoutExpired: continue
        return name if r.returncode == 0 else f"{name} failed: {(r.stderr or r.stdout).strip()[-300:]}"
    return f"{name} failed: Chrome didn't finish, twice"


def main():
    os.makedirs(os.path.join(OUT, "clips"), exist_ok=True)
    known = [g for g, *_ in GROUPS]; clips = {}
    for path in sorted(glob.glob(os.path.join(SCRIPTS, "*.js"))):
        head = open(path).read().split("\n", 4)
        tag = next((m.group(1) for line in head[:4] if (m := re.match(r"// group: (\w+)", line))), None)
        if tag not in known: sys.exit(f"{os.path.relpath(path, ROOT)} needs a line '// group: ...' with one of: {', '.join(known)}")
        clips[os.path.basename(path)[:-3]] = (tag, head[0].lstrip("/ ").strip())
    for f in os.listdir(os.path.join(OUT, "clips")):          # scripts that have gone
        if f[:-5] not in clips: os.remove(os.path.join(OUT, "clips", f))

    names = list(clips); done = [bake(names[0])]             # the first by itself: it may have the frame checker to compile
    with concurrent.futures.ThreadPoolExecutor(4) as pool: done += pool.map(bake, names[1:])
    failed = [d for d in done if d and " failed: " in d]
    if failed: sys.exit("\n".join(failed))

    shutil.copyfile(os.path.join(ROOT, "firmware", "data", "lump.bin"), os.path.join(OUT, "lump.bin"))
    items = []
    for kind, name, secs in sequences(os.path.join(OUT, "lump.bin")):
        it = {"n": name, "f": "lump.bin", "s": name, "secs": round(secs, 1)}
        if kind == 0: it.update(g="moods", cmd=f"curl -X POST --data 's {name}' 127.0.0.1:47823/cmd")
        elif kind == 1: it.update(g="transitions", n=name.replace(">", " > "))
        elif not name.startswith("tap_"): it.update(g="reactions", cmd=PLAY.format(name))
        elif name.endswith("_idle") or name == "tap_startle_night":
            gag = name.split("_")[1]; it.update(g="gags", n=gag, cmd=PLAY.format(gag))
        else: continue                                       # a tap gag's versions for the other moods
        items.append(it)
    for name, (group, about) in clips.items():
        _, seq, secs = sequences(os.path.join(OUT, "clips", name + ".clip"))[0]
        items.append({"n": name, "f": f"clips/{name}.clip", "s": seq, "secs": round(secs, 1), "g": group, "about": about, "cmd": PLAY.format(name)})
    items.sort(key=lambda it: known.index(it["g"]))
    used = {it["g"] for it in items}
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump({"groups": [{"id": g, "title": t, "blurb": b} for g, t, b in GROUPS if g in used], "items": items}, f, separators=(",", ":"))
    size = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
    print(f"{len(items)} animations in {len(used)} groups; {sum(1 for d in done if d)} clips baked; gallery/ is {size / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
