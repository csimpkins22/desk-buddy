# Writing a clip

A clip is one extra animation for Lump: a script in this folder that adds its own drawings and one
sequence. `tools/export_frames.py` bakes it into a small file, and the bridge sends that to him over
Wi-Fi when it's first played. `coffee.js` is the shortest example; `juggle.js` and `yoyo.js` show
props that move every frame, `raincloud.js` shows him moving about, and `tests_pass.js` shows arms.

## The shape of a script

```js
// One line saying what happens.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, mixHex, tint } = window.__lump;
  D.wave_1 = xf(D.N, { face: FACE.happy, extra: { arm2: [[166, 140], [200, 110]] } });
  D.wave_2 = xf(D.N, { face: FACE.happy, extra: { arm2: [[166, 140], [204, 122]] } });
  CLIPS.wave = { home: 'idle', seq: [...WAKE, ['wave_1', 5], ['wave_2', 5], ['wave_1', 5], ['wave_2', 5], ...DOZE] };
})();
```

- The file name, the `CLIPS` key and the name you play it by are the same: lower case, digits and
  `_` only (`wave.js`, `CLIPS.wave`).
- Name every drawing `<clip name>_<something>`, so no two clips collide.
- `home: 'idle'` means it starts and ends asleep: begin with `...WAKE` (29 ticks) and end with
  `...DOZE` (22 ticks). He walks to idle by himself before it plays.
- A sequence is `[drawing, ticks]` pairs at 24 ticks a second. Hold each drawing 2 ticks or more
  and reuse drawings: 4 to 8 seconds and 30 to 100 distinct drawings is typical. His wobble changes
  every 2 ticks from tick 0 and the wake is 29 ticks, so hold the first drawing after it for 3;
  otherwise every 2-tick drawing straddles two wobbles and is stored twice.

## Drawings

The screen is 240 by 240 with the floor at y = 201. Standing (`D.N`) he spans about x 68 to 187
and y 70 to 201, with eyes at (116, 110) and (140, 108) and his mouth near (128, 124).

- `xf(base, options)` reshapes an existing drawing. Options: `k` (scale), `kx`, `ky` (stretch),
  `rot` (radians), `dx`, `dy` (move), all about his feet at (128, 201) unless `ox`, `oy` say
  otherwise; `face` (a new face, in the base drawing's coordinates); `shadowK` (shrink his shadow
  as he leaves the floor); `extra` (props, in screen coordinates, which do not move with him).
- Bases worth knowing: `N` standing, `NB` noticing, `K1` startled squash, `C1` content, `P1`
  perking up, `R1` unimpressed, `D1` `D2` `D3` grinning (used directly in a sequence they sparkle),
  `HL1` `HL2` waving, `A1` to `A5` jumping, `Y1` to `Y3` yawning, `T1` `T2` dozing, `S1` asleep.
  `K1` and the lying poses keep their faces elsewhere (K1's is near (160, 130)), so a standing
  face passed to them lands in the wrong place.
- A face is a list of marks: `['dot', x, y, r]`, `['stroke', [[x, y], ...], width]`,
  `['mouth', [[x, y], ...], [tongueX, tongueY, rx, ry]]`, `['oval', x, y, rx, ry]`,
  `['shine', x, y, r]`, `['blush', x, y, rx, ry]`, `['spiral', x, y, r]`. Ready-made ones are in
  `FACE`: `happy` `shock` `spiral` `puff` `ah` `aah` `choo` `sheep` `grump` `cute` `lookup` `lookr`
  `aahEyes` `chooEyes`.
  Keep faces simple (dot eyes, small mouths) and let props sell the gag.
- Arms: `extra: { arm: [[shoulderX, shoulderY], [handX, handY]], arm2: [...] }`. Left shoulder is
  near (90, 140), right near (166, 140). Arms are drawn before `front`, so a `front` prop covers
  his hands; a prop he should stand in front of goes in `back`.
- Marks around him: `extra: { fxm: 'alert', fx: [x, y] }` for the "!" and `fxm: 'done'` for sparkles.
  The sparkles are arranged round his head, so leave `fx` alone with `'done'`.
- Your own props: `extra: { front: (c, d, seed, tick) => { ... }, back: ... }` draws on the canvas
  in front of him or behind him. `tick` counts from the start of the sequence; for anything that
  moves every frame use `Math.floor(tick / 2) * 2` so it is drawn on twos like the rest of him.
  `boil(points, seed, amount)` gives a line his hand-drawn wobble; `openPath(c, points)` and
  `closedPath(c, points)` trace smooth curves through points. `d` is the drawing itself, so
  `d.body` and `d.curl` are his outline and cowlick where they ended up: clip to `d.body` to paint
  on him, or use `d.curl[2]` to find the cowlick's tip. `front` draws over his face too.
- `shadowK: 0` hides his shadow. Whatever is still on screen vanishes when `...DOZE` starts, so
  give a prop its own exit if that matters.

## What the board can draw

The board redraws each frame from the canvas calls that made it, so stick to these: `beginPath`,
`closePath`, `moveTo`, `lineTo`, `quadraticCurveTo`, `bezierCurveTo`, `arc`, `ellipse`, `rect`,
`roundRect`, `fillRect`, `fill()`, `stroke()`, `clip()`, `save`, `restore`, `translate`, `rotate`,
`scale`, `setTransform`, `fillStyle` and `strokeStyle` as plain colours, `lineWidth`, `globalAlpha`,
`setLineDash`, `lineDashOffset`, with round line caps and joins.

Not available: text, gradients, shadows, images, filters, blend modes, `fill('evenodd')`. Letters
have to be drawn as strokes. Don't stroke under a lopsided `scale` (such as `scale(1, 0.3)`): the
board keeps the line the same width all round, so it won't match. A frame that uses any of these is stored as pixels instead (about
eight times larger), and the bake's report says so under `kept_as`.

Colours: cream `#FFF1DC` for lines, `#17161A` for dark fills, and greys, yellows, reds, browns,
greens and blues for props (`#FFD23F`, `#FF5A4D`, `#6B4A1F`, `#58D68D`, `#5AB8FF`, `#9FB0C4`). The
board takes pinks and purples (more red than green, with a lot of blue) for his body colour and
recolours them, so avoid those. For something that should match his body, use `tint()`, or
`mixHex(tint(), '#FFFFFF', 0.45)` for a paler version.

## Looking at it, then baking

```bash
python3 tools/export_frames.py --clip wave --sheet design/clips/previews/wave.png   # every drawing, side by side
python3 tools/export_frames.py --clip wave                                          # bake ~/.desk-buddy/clips/wave.clip
curl -X POST --data wave 127.0.0.1:47823/play
```

A script error stops the export and prints the message. In the bake's report, `kept_as` should
show every frame as instructions. The sheet shows every distinct drawing, 24 to a picture: after
`wave.png` come `wave_2.png`, `wave_3.png` and so on.
