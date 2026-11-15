---
name: lump-clip
description: Write a new animation ("clip") for Lump, the desk-buddy blob, and play it on the board. Use this whenever the user asks for a new Lump animation, clip, gag, reaction or scene, gives an idea for him to act out ("make him juggle", "do one where he..."), wants an existing clip changed or fixed, or asks to see an idea on the device quickly, even if they never say "clip".
---

# Writing a clip for Lump

A clip is one script, `design/clips/<name>.js`, that adds a few drawings and one sequence. The bake
turns it into a small file and the bridge sends it to the board over Wi-Fi. Everything about the
script's shape, his poses, faces, arms and the canvas calls the board can draw is in
`design/clips/README.md`: read it once per session before writing. Props and helpers live in
`design/clip_kit.js` (`window.__lump.kit`); read that too, it is short, and use it rather than
redrawing a mug, a table or a second Lump.

## Pick a mode

Ask yourself what the user wants: to see an idea now, or a clip worth keeping.

**Fast** (idea on the board in about a minute). Write the script, bake, play. No preview.
Expect a rough edge or two; say so, and offer to refine.

```bash
python3 tools/export_frames.py --clip NAME && curl -s -X POST --data NAME 127.0.0.1:47823/play
```

**Careful** (a clip to keep). Write it, render the sheet, look at every page once against the
checklist below, fix everything you see in one pass, then bake and play. One round catches most of
what goes wrong; a second is worth it only if the first found something structural.

```bash
python3 tools/export_frames.py --clip NAME --sheet design/clips/previews/NAME.png   # then Read each page
python3 tools/export_frames.py --clip NAME --gif design/clips/previews/NAME.gif     # to show the user it moving
```

In both modes read the bake's report: `kept_as` must be all instructions, and `lint` must be empty
or explained (it names the drawings, so an entrance from an edge is easy to tell from a prop cut
off mid-scene). If lint names something real, fix it and bake again; that is cheaper than a preview round.

## Make it its own thing

Left alone, every clip comes out the same: he wakes in the middle, a prop arrives on the right, he
pokes it, something goes wrong, he dozes. Each choice is safe; together they are a formula. Before
writing, decide these on purpose, and when making several, spread them so no two share a row.

**What kind of idea is it?** A prop gag is one kind among many:
- something happens to him (weather, gravity, the floor, the light);
- his own body is the joke (he stretches, splits, melts, inflates, turns inside out);
- he goes somewhere: crosses the screen, leaves and comes back changed, is chased;
- the view is the joke: a close-up on his face, a wide shot that reveals what he is standing on, a slow pan;
- several Lumps, and what passes between them;
- he plays with the screen itself: its edges, its corners, the glass in front of him;
- pure pantomime with nothing but him and a mark or two;
- a quiet mood piece with no punchline.

**The staging brief.** Write one line each before the script:
- where he is: left, right, centre, on the move, off screen for a beat, upside down;
- where things come from: left, right, above, below, behind him, out of him, or already there when he wakes;
- how close: close-up (`kit.view(2, ...)`), normal, wide (`kit.view(0.6, ...)`), or changing;
- how long: anything from 3 to 12 seconds, counting the 2 seconds of waking and dozing. A single hit can be 3; a slow burn wants 10;
- the rhythm: slow burn, rapid fire, one big hit, a loop that escalates, a long hold;
- how it ends: back to rest, an exit, or left changed (still wet, still tiny, still stuck) when he dozes.

If the brief reads "centre, from the right, normal, 5 seconds, three beats, back to rest", change at
least three of them. `kit.clip(name, { mirror: true })` flips a whole clip left to right for free. `{ asleep: true }`
skips the waking and dozing, for things that happen to him while he sleeps (base those drawings on `D.S1`).

The bake's report has a `staging` entry (where he stood, how big he was, how long it ran). In a
batch, compare them: if they agree, the clips look alike.

## Building it

Start from `kit.clip(name)`, which handles the wake, the doze, drawing names and hold lengths.
Three sketches of how different clips can be (not templates):

```js
// One hit, 3 seconds, close on his face: he notices you, and winks.
const k = kit.clip('wink');
kit.steps(1, 2, 3).forEach((z, i) => k.add('in' + i, 2, xf(D.N, { face: kit.look(0, 0, 'flat'), extra: { view: kit.zoom(z, [128, 112]) } })));
k.add('wink', 14, xf(D.N, { face: kit.faces.wink, extra: { view: kit.view(2, [128, 112]) } }));
k.done();
```

```js
// On the move, nothing else on screen: he waddles off the left edge and comes back in from the right, puzzled.
kit.walk(0, -190, 8, { face: kit.look(-5) }).forEach((o, i) => k.add('off' + i, 2, xf(D.N, o)));
k.add('empty', 10, kit.gone());
kit.walk(190, 0, 8, { face: kit.faces.worried }).forEach((o, i) => k.add('back' + i, 2, xf(D.N, o)));
```

```js
// Wide and slow: the view pulls back to show the small hill he is standing on, under a big moon. No punchline.
const hill = c => { /* drawn large: a wide view shows more than the 240 square */ };
kit.steps(1, 0.55, 8).forEach((z, i) => k.add('out' + i, 3, xf(D.N, { face: kit.faces.closed, extra: { view: kit.view(z, [128, 201], [120, 150 + i * 6]), back: hill } })));
```

Things to know about views, tipping and endings:
- Move between views with `kit.cam(t, from, to)`, t from 0 to 1: `kit.cam(t, kit.HOME, kit.view(0.6, ...))` eases out to a
  wide shot and the same swapped comes back. `kit.HOME` is no view at all; come back to it before a normal doze.
  `kit.zoom(z, focus)` is the short form for a push in or out on one point.
- `front` and `back` hooks draw inside the view. For something fixed to the screen whatever the view
  (a border, a caption mark), start the hook with `c.setTransform(1, 0, 0, 1, 0, 0)`.
- A view scales line widths too. In a wide shot draw props with `width / zoom`, and remember his own
  outline thins: at 0.4 nothing fine survives.
- He is about 150 pixels tall with his cowlick. A view that follows him upward has to pull back
  within the first 60 pixels of his rise or his head leaves the top.
- Size goes by stored frames, not drawings: a held drawing is stored three times (his wobble), more
  if a hook uses `tick` or it has snoring z's. A setting or full-screen prop costs 1.3 to 2 KB a
  frame and each `kit.twin` about 0.7, so a long wide piece or a crowd reaches the 150 KB limit at
  about 80 to 110 frames. Reuse drawings, shorten holds, and skip props that are outside the view.
- Straight edges on half pixels (easy to get from `kit.steps`) can fail the match: round the
  coordinates of rects, doors and floors.
- `kit.tip` assumes he is at full size and unstretched, and his shadow swings round with him: pass
  `shadow` in `extra` to put it back under him.
- To end changed (still buried, still on the moon), draw your own way down to sleep from `D.T1`,
  `D.T2` and `D.S1` with the prop in `extra`, and finish with `k.done({ doze: false })`: the clip then
  ends on your last drawing. His idle loop takes over straight after, plain and centred, so a
  drawing that is him asleep in the usual place hands over without a jump and anything else it
  shows simply stays to the last tick. On your own asleep drawings `fxm: 'idle'` brings back the
  snoring z's (set `fx` in `extra` to place them).
- For something that is there from the very first frame, or a clip where he never stands at
  centre, use `kit.clip(name, { bare: true })`: nothing is added at either end, so open and close
  on drawings of him asleep (`D.S1`) with the scene already round him.
- `{ mirror: true }` flips about x 120 while he stands at 128, so the first and last drawings of a
  mirrored clip want `dx: -16` to sit on his standing pose. Marks like `?` come out backwards.

## Rules that save a round

These are the mistakes earlier clips made over and over. Each has a reason; keep the reason in mind
and the rule follows.

Staging
- Choose his size on purpose. His face stops reading below about 0.75, so if he is smaller than
  that the beat must not depend on his expression; to give a scene room, a wide `kit.view` or moving
  him aside both beat shrinking him a little.
- Anything meant to be seen whole stays inside x 12 to 228 and y 8 up. Crossing an edge is fine when
  it is the point (an entrance, an exit, a close-up).
- Whatever carries the gag must not be hidden behind his body: put it on either side, above, below, or in `front`.
- To lay him down or tip him over use `kit.tip(rot)`; turning him about his feet buries half of him.
  For a beat without him use `kit.gone()`.
- An arm goes from the shoulder on its own side outward (left shoulder (90, 140), right (166, 140)).
  An arm reaching across his body reads as a bar on his belly. To reach the far side, turn or lean
  him, or let the hand come up from behind the prop.
- Once he is moved, leaned or scaled, find his shoulder or mouth with `kit.pt(o, [166, 140])`
  rather than by eye.
- A second Lump (`kit.twin`) can go down to 0.6 scale, no smaller, and wants big simple faces.
- Small or squashed faces: below about half size, or with `ky` under 0.5, eyes and mouth collide.
  Use two dots and a stroke; a round mouth beside dot eyes reads as three eyes.
- A standing face belongs on standing bases. `K1` and the lying poses keep their faces elsewhere.

Movement
- Nothing appears, vanishes or changes size in one drawing. Give it two or three in-betweens
  (`kit.steps`), slide it in from an edge, drop it, or `kit.fade` it. That includes props still on
  screen at the end: `DOZE` wipes them, so take them off first.
- Anticipate a big move with a small opposite one, squash on impact (`ky` below 1, `kx` above),
  and settle after.
- Hold the punchline 10 ticks or more. Anything shorter is missed on the device.
- Anything that moves every frame inside a `front` or `back` hook uses `Math.floor(tick / 2) * 2`.

Detail
- Nothing important thinner than 3 pixels or smaller than about 10. A pin, a blink at half scale
  and a faint smirk all vanished on the device. Make the gesture bigger instead of finer.
- Build a prop from a few shapes with a cream outline (`kit.CREAM`, width 2.4 to 3) and a second
  tone, so it reads without the story. Wobble its outline with `boil` to match his.
- No words. Marks only: `kit.mark` draws `?`, `!`, a tick and a cross.

What the board refuses or repaints
- No text, gradients, shadows, images or blend modes, and no stroke under a lopsided `scale`. Such
  a frame is stored as pixels, eight times larger.
- A translucent full-screen fill (a flash, a tint, a fade to black) often fails the match and is
  stored as pixels: 25 and 35 to 40 percent have both failed. Use 60 percent or more, or fade the
  props themselves instead.
- The board repaints anything it takes for his body colour: pinks and purples, and also dark warm
  browns whose red is clearly above their green (`#3D2E14` is repainted, `#3D3514` is not). Lint names
  any it finds. For his body colour use `tint()`, which is safe anywhere, views and hooks included.
- Lump is the only character. No real people, known characters, logos or brands.

## Preview checklist (careful mode)

Look at every page of the sheet once, and note everything before changing anything:

1. Is he readable and at a sensible size in every drawing?
2. Is every prop whole, on screen, and recognisable by itself?
3. Does anything pop in or out, or jump more than about 40 pixels between neighbours?
4. Do arms come from the right shoulder and end where the hand should be?
5. Does his face change with each beat, and is the punchline drawing the clearest one?
6. Is the last drawing before the doze clear of props?

Then fix it all in one edit, bake, and play.

## After it plays

Tell the user what you made in a sentence, its length, and anything you know is rough. To make
him play it by himself, add its name to a list in `CLIP_SETS` in `tools/buddy_bridge.py` (`idle`
for most), copy that file to `~/.desk-buddy/bridge.py` and restart the bridge; ask before doing
this, since it changes what he does all day. Don't commit unless asked.
