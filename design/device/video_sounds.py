"""Candidate sounds for the clips in the "Lump's day" video, which have none of their own.

    python3 design/device/video_sounds.py            # writes design/device/animatic/sfx/<clip>.wav and .mp3

Made with the same ocarina voice and effects as his tap gags (tools/make_gag_sounds.py). Each is timed in drawing frames
(24 a second) from the start of the stretch of the clip that the video shows, given beside it.
"""
import math, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(ROOT, "tools"))
import make_gag_sounds as m
from make_gag_sounds import (add, alarm_bell, at, bloop, boing, brrr, clang, clock_tick, crackle, crash, fade, filt, flap, heh, hmph, lick, lvl,
                             noise, oc, pat, ping, shape, sigh, snore, sparkle, thud, whistle, whoosh, yawn, zip_)

OUT = os.path.join(ROOT, "design", "device", "animatic", "sfx")
wind = lambda d, f=700: shape(filt(noise(d), "bp", lambda t: f + 250 * math.sin(t * 2.1), 0.8), fade(d, .4, .5))


def alarm_clock(tr):                       # the whole clip, 0 to 2.8 s
    tr.add(0, snore(.5), .3, "snore")
    tr.add(9, alarm_bell(.92), .8, "alarm")
    tr.add(27, whoosh(.16, 500, 1400), .4, "arm")
    tr.add(32, add(lvl(thud(200, 85, .3, .9), 1), lvl(clang(900, .5), .45)), .95, "flattened")
    tr.add(35, boing(.5, 260, 16), .5, "spring")
    for i, tick in enumerate((42, 46, 50, 53)): tr.add(tick, clock_tick(2200 - i * 150), .3, "cog rolls off" if i == 0 else None)
    tr.add(56, snore(.7), .35, "snore")


def coffee(tr):                            # the whole clip, 0 to 5.6 s
    tr.add(3, yawn(.95), .5, "yawn")
    tr.add(30, sigh(.5, 380, 290), .35, "groggy")
    for tick in (47, 60):
        tr.add(tick, add(lvl(lick(), 1), at(lvl(bloop(.1, 260, 420), .6), .12)), .45, "sip" if tick == 47 else None)
    tr.add(69, oc(.3, [(0, 1.0), (1, 1.12)]), .4, "hm")
    tr.add(80, add(lvl(sparkle(.6, 9, 1800, 4200, 1), 1), lvl(brrr(.55, 1.5), .7)), .7, "it hits")
    tr.add(97, oc(.14, 1.5), .5, "wheee"); tr.add(101, oc(.14, 1.68), .5); tr.add(105, oc(.4, [(0, 2.0), (1, 2.24)], vib=.03), .55)


def dramatic_turn(tr):                     # 1.2 to 5.3 s of the clip
    tr.add(10, zip_(.14, 400, 1900), .5, "snaps round")
    tr.add(12, thud(150, 70, .4, .5), .6, "the stare")
    tr.add(66, whistle(.22, 500, 900, air=.1), .4, "eyebrow")
    tr.add(86, sigh(.45, 420, 330), .3, "lets it go")


def wink(tr):                              # 1.25 to 2.55 s of the clip
    tr.add(16, add(lvl(ping(2900, .5, .14), 1), at(lvl(ping(4350, .4, .1), .7), .05)), .5, "wink")
    tr.add(20, heh(1.5), .4, "heh")


def disco(tr):                             # the disco tap gag as the video shows it, without its band: only him and the mirror ball
    S = 13 / 4
    tr.add(0, sparkle(.55, 7, 2200, 4500, -1), .4, "ball comes down")
    tr.add(6, oc(.25, [(0, 1.26), (1, 1.68)]), .55, "ooh!")
    tr.add(12, add(lvl(ping(3100, .5, .1), 1), lvl(ping(4650, .4, .07), .6)), .55, "shades on")
    for k, (t, n, d) in enumerate([(18 + 2 * S, "E5", .12), (31, "G5", .12), (31 + 3 * S, "A5", .38), (44 + 2 * S, "G5", .12), (57, "E5", .12)]):
        tr.add(t, oc(d, m.sing(n), atk=.01, tail=.4), .5, "doo-doo-dooo" if k == 0 else None)
    tr.add(57 + 2 * S, oc(.2, [(0, m.sing("G5")), (1, m.sing("A5"))], atk=.01), .5)
    tr.add(70, oc(.4, [(0, m.sing("A5")), (1, m.sing("E6"))], vib=.3, vibhz=7, atk=.01), .55, "woo!")
    tr.add(80, sparkle(.5, 6, 2200, 4500, 1), .35, "ball goes up")


def trampoline(tr):                        # 1.2 to 8.4 s of the clip, across the push-in and the start of the daydream
    for i, tick in enumerate((2, 26, 50, 82, 121)):
        tr.add(tick, boing(.45, 170 + i * 28, 14), .55 + i * .06, "bounce" if i == 0 else None)
        tr.add(tick + 3, whistle(.4 + i * .08, 420 + i * 60, 900 + i * 180, air=.15), .3 + i * .04, "up" if i == 0 else None)
    tr.add(92, sparkle(1.4, 10, 2400, 4600, 1), .35, "stars")
    tr.add(150, oc(.5, [(0, 1.5), (1, 2.0)], vib=.03), .45, "ooh")


def rainbow_flight(tr):                    # 1.6 to 4.8 s of the clip
    tr.add(0, whoosh(2.8, 500, 1500, 0.9), .4, "flying")
    tr.add(4, sparkle(2.6, 20, 2000, 4800, -1), .45, "rainbow trail")
    tr.add(10, oc(1.3, [(0, 1.5), (.4, 2.24), (1, 2.0)], vib=.04), .5, "wheee")


def parachute(tr):                         # 3.0 to 6.6 s of the clip
    tr.add(0, wind(3.5), .35, "wind")
    tr.add(4, flap(), .3, "canopy")
    tr.add(14, whistle(2.2, 1100, 620, vib=.02, air=.25), .28, "drifting down")
    tr.add(52, oc(.6, [(0, 1.26), (1, 1.5)], vib=.03), .4, "aah")


def moon_bike(tr):                         # 2.5 to 5.3 s of the clip
    for k in range(13): tr.add(4 + k * 4.5, clock_tick(1900 if k % 2 else 2300), .22, "pedals" if k == 0 else None)
    tr.add(30, add(lvl(ping(2600, .5, .2), 1), at(lvl(ping(2600, .5, .2), 1), .16)), .4, "bell")


def skateboard(tr):                        # 2.2 to 5.3 s of the clip: the last two passes, then the stroll back in
    roll = lambda d, f: shape(filt(noise(d), "bp", f, 1.6), fade(d, d * .45, d * .45))
    tr.add(0, roll(.9, 700), .4, "rolling past")
    tr.add(20, add(lvl(roll(1.0, 380), 1), lvl(whoosh(.8, 300, 1600), .8)), .85, "huge and close")
    for i, tick in enumerate((50, 55, 60, 65)): tr.add(tick, pat(300 + 20 * i), .35, "strolls back" if i == 0 else None)
    tr.add(70, heh(1.26), .4, "heh")


def this_is_fine(tr):                      # 2.6 to 4.2 s of the clip
    tr.add(0, crackle(1.6, 55, 1500), .45, "fire")
    tr.add(10, lick(), .4, "sip")
    tr.add(20, oc(.4, [(0, 1.26), (1, 1.2)], vib=.02), .4, "mm, fine")


def table_flip(tr):                        # 2.8 to 4.4 s of the clip
    tr.add(0, hmph(), .5, "simmering")
    tr.add(8, whoosh(.3, 300, 1800), .6, "heave")
    tr.add(12, add(lvl(crash(.9), 1), at(lvl(clang(1200, .6), .5), .1), at(lvl(clang(1700, .5), .4), .22)), 1.0, "everything goes")


def stargaze(tr):                          # 2.0 to 5.0 s of the clip
    tr.add(0, sparkle(1.5, 5, 2600, 5000, 0), .28, "stars")


def sleepy_wink(tr):                       # the whole clip, 0 to 2 s
    tr.add(8, oc(.16, [(0, 1.0), (1, 1.26)]), .3, "hm?")
    tr.add(25, add(lvl(ping(2900, .5, .14), 1), at(lvl(ping(4350, .4, .1), .7), .05)), .4, "wink")


CLIPS = [alarm_clock, coffee, dramatic_turn, wink, disco, trampoline, rainbow_flight, parachute, moon_bike, skateboard, this_is_fine, table_flip, stargaze, sleepy_wink]

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for make in CLIPS:
        m.rng.seed(make.__name__); tr = m.Track(); make(tr)
        s = tr.b + [0.0] * int(.05 * m.SR); s = m.limit(m.g(s, m.LOUD * tr.level / m.loudness(s, .1)))
        wav = os.path.join(OUT, make.__name__ + ".wav"); m.write_wav(wav, s)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-b:a", "160k", wav[:-4] + ".mp3"], check=True)
        print(f"{make.__name__:16s} {len(s) / m.SR:4.1f} s  cues: {', '.join(c[1] for c in sorted(tr.cues))}")
