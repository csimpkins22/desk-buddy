"""Build the "Lump's day" video shot by shot: export each shot's animation, render it in the Blender scene, and join the shots.

    python3 design/device/make_animatic.py                # every shot, at draft quality
    python3 design/device/make_animatic.py 5 6            # just these shots
    QUALITY=720 python3 design/device/make_animatic.py    # or 1080: full frame rate, and it carries on where it stopped if run again

Each shot lists the pieces of animation it shows as (sequence, from second, to second), where the camera goes, and the time of day.
Shots marked "full" are his animation alone, filling the frame, with no device.
"""
import glob, os, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
QUALITY = os.environ.get("QUALITY", "draft")
WORK = os.path.join(ROOT, "design", "device", "animatic", *([] if QUALITY == "draft" else [QUALITY]))
BLENDER = "/Applications/Blender.app/Contents/MacOS/Blender"
FPS, RES, SAMPLES = {"draft": (12, "640x360", 12), "720": (24, "1280x720", 48), "1080": (24, "1920x1080", 96)}[QUALITY]

SHOTS = [    # timed to design/device/music/music.wav: quiet to 0:20, a hit at 0:20, a build to 0:32, full until 0:56, then a quiet tail
    dict(n=1, name="before dawn", parts=[("idle", 0, 2), ("idle", 0, 2), ("idle", 0, 1)], light="dawn", cams="-150,-420,150|-110,-330,110", lens=50),
    dict(n=2, name="alarm clock", parts=[("alarm_clock", 0, 2.8), ("idle", 0, 1.2)], light="dawn", cams="-60,-215,62|-56,-208,61"),
    dict(n=3, name="coffee", parts=[("coffee", 0, 5.6)], light="dawn>morning", cams="-66,-215,60|-20,-225,64"),
    dict(n=4, name="this is lump", parts=[("dramatic_turn", 1.2, 5.3), ("wink", 1.25, 2.55)], light="morning", cams="-12,-150,58|-8,-135,57"),
    dict(n=5, name="two taps", parts=[("tap_disco_idle", 0.9, 4.4), ("tap_moto_idle", 1.0, 4.5)], light="morning>day", cams="70,-200,70|40,-205,66", taps=(0, 3.5)),
    dict(n=6, name="into the cube", parts=[("trampoline", 1.2, 5.6)], light="day", cams="-50,-210,64|-26,-150,60|-6,-84,56|-2,-66,55", aims="0,20,34|0,28,42|0,33,47|0,34,48"),
    dict(n=7, name="the daydream", parts=[("trampoline", 5.6, 8.4), ("rainbow_flight", 1.6, 4.8), ("parachute", 3.0, 6.6), ("moon_bike", 2.5, 5.3), ("skateboard", 2.2, 4.0)],
         light="day", cams="-2,-66,55|5,-100,50|-10,-108,52|5,-104,50|0,-100,50", aims="0,34,48|0,34,39|0,34,39|0,34,39|0,34,39"),
    dict(n=8, name="back on the desk", parts=[("skateboard", 4.0, 5.3), ("idle>awake", 0, 0.9)], light="day>golden", cams="0,-100,50|-30,-150,62|-64,-212,62", aims="0,34,39|0,26,36|0,20,30"),
    dict(n=9, name="golden hour", parts=[("this_is_fine", 2.6, 4.2), ("table_flip", 2.8, 4.4), ("tap_bomb_idle", 3.8, 5.4)], light="golden", cams="-95,-190,48|-30,-215,60|75,-185,80"),
    dict(n=10, name="stargazing", parts=[("stargaze", 2.0, 5.0)], light="golden>night", cams="-40,-215,60|-70,-260,75"),
    dict(n=11, name="good night", parts=[("idle", 0, 1), ("sleepy_wink", 0, 2), ("idle", 0, 1)], light="night", cams="-110,-330,110|-150,-420,150", lens=50),
]


CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SOUNDS = os.path.expanduser("~/.desk-buddy/sounds")
# words on screen: (from second, to second, big line, small line, smaller line)
TITLES = [(15.4, 19.6, "This is Lump.", "", ""),
          (56.3, 59.75, "Lump", "A tiny desk friend. Build your own. github.com/csimpkins22/desk-buddy", "Based on Lump by Joe Bentham. github.com/joebentham/desk-buddy")]
# sounds over the music: (at second, what, from second in that sound, for how long, how loud). A name is one of his own
# sounds from ~/.desk-buddy/sounds; "=..." is made here with ffmpeg's tone and noise sources.
SFX = [    # "clip:name" is that clip's sound from design/device/video_sounds.py, placed where the clip starts in the video
    (5.0, "clip:alarm_clock", 0, 3.2, 0.9), (9.0, "clip:coffee", 0, 4.9, 0.9), (14.6, "clip:dramatic_turn", 0, 4.1, 0.9), (18.7, "clip:wink", 0, 1.3, 0.9),
    (20.0, "=aevalsrc='0.7*sin(2*PI*(160-90*t)*t)*exp(-20*t)'", 0, 0.25, 1.0),                        # a knock on the glass
    (20.0, "clip:disco", 0, 3.5, 0.9),
    (23.5, "=aevalsrc='0.7*sin(2*PI*(160-90*t)*t)*exp(-20*t)'", 0, 0.25, 1.0),
    (23.77, "tap_moto", 0, 3.2, 0.9),
    (27.0, "clip:trampoline", 0, 6.9, 0.9), (34.8, "clip:rainbow_flight", 0, 3.2, 0.9), (38.0, "clip:parachute", 0, 3.5, 0.9), (41.6, "clip:moon_bike", 0, 2.8, 0.9),
    (44.4, "clip:skateboard", 0, 3.3, 0.9), (47.8, "clip:this_is_fine", 0, 1.6, 0.9), (49.4, "clip:table_flip", 0, 1.5, 0.9),
    (51.0, "tap_bomb", 2.6, 1.6, 0.9),
    (52.6, "clip:stargaze", 0, 3.0, 0.9), (56.6, "clip:sleepy_wink", 0, 2.3, 0.9),
]


def title_card(i, big, small, smaller, w, h):
    """The words as a see-through picture the size of the frame, drawn by Chrome."""
    page, out = os.path.join(WORK, f"title{i}.html"), os.path.join(WORK, f"title{i}.png"); u = h / 360
    open(page, "w").write(f"""<body style="margin:0;width:{w}px;height:{h}px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;
      font-family:'Avenir Next','Helvetica Neue',sans-serif;color:#FFF1DC;text-shadow:0 {2 * u}px {10 * u}px rgba(0,0,0,.85);padding-bottom:{20 * u}px;box-sizing:border-box">
      <div style="font-size:{34 * u}px;font-weight:700;letter-spacing:{-0.5 * u}px">{big}</div>
      <div style="font-size:{12.5 * u}px;font-weight:500;margin-top:{5 * u}px;opacity:.92">{small}</div>
      <div style="font-size:{9.5 * u}px;font-weight:500;margin-top:{6 * u}px;opacity:.7">{smaller}</div></body>""")
    run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--default-background-color=00000000", f"--window-size={w},{h}", f"--screenshot={out}", "file://" + page])
    return out


def join(done):
    """Every shot cut to its planned length, with the words, the music and his sounds."""
    w, h = [int(v) for v in RES.split("x")]; long = {s["n"]: sum(b - a for _, a, b in s["parts"]) for s in SHOTS}
    listing = os.path.join(WORK, "shots.txt"); open(listing, "w").write("".join(f"file '{p}'\noutpoint {long[int(p[-6:-4])]:.3f}\n" for p in done))
    ins, steps, last = ["-f", "concat", "-safe", "0", "-i", listing], [], "0:v"
    for i, (a, b, big, small, smaller) in enumerate(TITLES):
        ins += ["-loop", "1", "-framerate", "24", "-t", "60", "-i", title_card(i, big, small, smaller, w, h)]
        steps.append(f"[{i + 1}:v]format=rgba,fade=t=in:st={a}:d=0.5:alpha=1,fade=t=out:st={b - 0.5}:d=0.5:alpha=1[t{i}];[{last}][t{i}]overlay=shortest=1:enable='between(t,{a},{b})'[v{i}]"); last = f"v{i}"
    music = os.path.join(ROOT, "design", "device", "music", "music.wav"); n = len(TITLES) + 1; mix = []
    if os.path.exists(music):
        ins += ["-i", music]; steps.append(f"[{n}:a]volume=0.8[m]"); mix.append("[m]"); n += 1
    for k, (at, what, start, dur, loud) in enumerate(SFX):
        if what.startswith("="): ins += ["-f", "lavfi", "-t", str(dur), "-i", what[1:] + (":d=%s" % dur if what.startswith("=aevalsrc") else "")]
        elif what.startswith("clip:"): ins += ["-t", str(dur), "-i", os.path.join(ROOT, "design", "device", "animatic", "sfx", what[5:] + ".wav")]
        else: ins += ["-ss", str(start), "-t", str(dur), "-i", os.path.join(SOUNDS, what + ".wav")]
        steps.append(f"[{n}:a]aresample=44100,aformat=channel_layouts=stereo,afade=t=out:st={max(0, dur - 0.08)}:d=0.08,volume={loud},adelay={round(at * 1000)}:all=1[s{k}]"); mix.append(f"[s{k}]"); n += 1
    steps.append(f"{''.join(mix)}amix=inputs={len(mix)}:normalize=0:duration=first[a]")
    out = os.path.join(WORK, "lumps_day.mp4")
    run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(steps), "-map", f"[{last}]", "-map", "[a]", "-t", str(sum(long.values())),
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-c:a", "aac", "-b:a", "192k", out])
    return out


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if r.returncode: sys.exit(f"{' '.join(cmd[:4])} ... failed:\n{(r.stderr or r.stdout)[-600:]}")
    return r


def gif_of(seq):
    """His animation as a GIF, exported once and kept."""
    out = os.path.join(WORK, "gifs", seq.replace(">", "_to_") + ".gif")
    if not os.path.exists(out):
        os.makedirs(os.path.dirname(out), exist_ok=True)
        run(["python3", os.path.join(ROOT, "tools", "export_frames.py"), "--clip", seq, "--gif", out], cwd=ROOT)
    return out


def pictures(shot):
    """The shot's animation as numbered pictures at the shot's frame rate; how many there are."""
    d = os.path.join(WORK, f"shot{shot['n']:02d}", "screen"); shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    n = 0
    for seq, a, b in shot["parts"]:                     # one picture a tick from the GIF, then exactly the ticks this part covers
        ticks = os.path.join(WORK, "ticks", seq.replace(">", "_to_"))
        if not os.path.isdir(ticks):
            os.makedirs(ticks); run(["ffmpeg", "-y", "-loglevel", "error", "-i", gif_of(seq), "-fps_mode", "passthrough", "-start_number", "0", os.path.join(ticks, "%04d.png")])
        last = len(os.listdir(ticks)) - 1
        for k in range(round((b - a) * FPS)):
            n += 1; shutil.copy(os.path.join(ticks, f"{min(last, round(a * 24 + k * 24 / FPS)):04d}.png"), os.path.join(d, f"s_{n:04d}.png"))
    return d, n


def render(shot):
    d, n = pictures(shot); out = os.path.join(WORK, f"shot{shot['n']:02d}.mp4"); w, h = RES.split("x")
    if QUALITY != "draft" and os.path.exists(out): return out
    if shot.get("full"):                                # his picture alone, as large as the frame allows, on black
        # It arrives from where it sat in the last frame of the shot before: that frame stays behind it and fades to black
        # while the picture slides the last of the way to the middle, so the desk falls away and no cut is seen.
        w, h = int(w), int(h); x0, y0 = [round(v * h / 360) for v in shot.get("enter", (140, 0))]; x1 = (w - h) // 2; T = 0.9
        ease = f"(pow(min(t/{T},1),2)*(3-2*min(t/{T},1)))"; before = os.path.join(WORK, f"shot{shot['n'] - 1:02d}.mp4"); last = os.path.join(WORK, "last.png")
        run(["ffmpeg", "-y", "-loglevel", "error", "-sseof", "-0.2", "-i", before, "-update", "1", "-frames:v", "1", last])
        run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(d, "s_%04d.png"), "-loop", "1", "-framerate", "24", "-t", str(n / FPS), "-i", last,
             "-filter_complex", f"[1]scale={w}:{h},fade=t=out:st=0:d={T},format=gbrp[bg];[0]fps=24,scale={h}:{h}:flags=neighbor[fg];color=black:s={w}x{h}:r=24[k];"
                                f"[k][fg]overlay=x='{x1}+({x0}-{x1})*(1-{ease})':y='{y0}*(1-{ease})':shortest=1,format=gbrp[pic];"
                                f"[bg][pic]blend=all_mode=lighten:shortest=1,format=yuv420p",      # his black is see-through, as it is in the glass
             "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", out])
        return out
    frames = os.path.join(WORK, f"shot{shot['n']:02d}", "frames")
    if QUALITY == "draft": shutil.rmtree(frames, ignore_errors=True)          # a long render keeps its frames, so one that was cut short carries on
    env = dict(os.environ, FRAMES=str(n), FPS=str(FPS), RES=RES, LIGHT=shot["light"], CAMS=shot["cams"], AIMS=shot.get("aims", ""), LENS=str(shot.get("lens", 85)),
               SHAKES=",".join(str(1 + round(s * FPS)) for s in shot.get("taps", ())))
    run([BLENDER, "-b", "-P", os.path.join(ROOT, "design", "device", "build_device.py"), "--", os.path.join(d, "s_0001.png"), frames, str(SAMPLES)], cwd=ROOT, env=env)
    run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(frames, "f%04d.png"), "-vf", "fps=24", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", out])
    return out


if __name__ == "__main__":
    want = [int(a) for a in sys.argv[1:]] or [s["n"] for s in SHOTS]
    for shot in SHOTS:
        if shot["n"] in want: print(f"shot {shot['n']:2d} {shot['name']}: {render(shot)}", flush=True)
    done = [p for p in (os.path.join(WORK, f"shot{s['n']:02d}.mp4") for s in SHOTS) if os.path.exists(p)]
    if len(done) == len(SHOTS):
        join(done)
        print("joined:", os.path.join(WORK, "lumps_day.mp4"))
