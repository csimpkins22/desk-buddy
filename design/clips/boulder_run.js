// Boulder run: he swaps a golden idol for a sandbag, ever so carefully. The pedestal sinks anyway, the floor rumbles, and a huge boulder rolls him off the screen. He walks back in flat.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', STONE = '#8C8577', SHADE = '#5E594F', GOLD = '#FFD23F', DEEP = '#D9A520', TAN = '#C8A46A', BROWN = '#6B4A1F', GREEN = '#58D68D', TAU = Math.PI * 2;
  const PX = 190, TOP = 134, R = 74;
  const brow = [['stroke',[[114,100],[128,98]],2.4]];
  const weighing = [['dot',123,113,3.6], ['dot',147,111,3.6], ['stroke',[[126,126],[136,125]],2.6], ...brow];
  const careful = [['dot',124,110,3.2], ['dot',148,108,3.2], ['stroke',[[114,101],[130,104]],2.4], ['stroke',[[142,102],[158,99]],2.4], ['stroke',[[128,125],[134,126],[138,123]],2.6]];
  const tense = [['dot',124,108,4.6], ['dot',148,106,4.6], ['dot',137,124,2.4]];
  const smug = [...FACE.aahEyes, ['stroke',[[119,121],[128,127],[137,121]],2.8]];
  const uhOh = [['dot',125,109,4], ['dot',149,107,4], ['stroke',[[124,125],[136,124]],2.8]];
  const nervous = [['dot',121,104,3.8], ['dot',145,102,3.8], ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const panic = [['dot',124,107,4.6], ['dot',148,105,4.6], ['mouth',[[125,118],[139,117],[141,131],[133,136],[124,131]]]];
  const where = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const star = (c, x, y, s) => { c.fillStyle = CREAM; c.beginPath(); c.moveTo(x, y - s); c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s); c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill(); };
  // a small golden him, standing at (x, y). glint: the size of its twinkle.
  const idol = (c, x, y, { glint = 0, rot = 0 } = {}) => {
    const at = ([px, py]) => [(px - 128) * 0.3, (py - 201) * 0.3];
    c.save(); c.translate(x, y); c.rotate(rot); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = GOLD; c.strokeStyle = CREAM; c.lineWidth = 2.4; closedPath(c, D.N.body.filter((_, i) => i % 2 === 0).map(at)); c.fill(); c.stroke();
    openPath(c, D.N.curl.map(at)); c.stroke();
    c.strokeStyle = DEEP; c.lineWidth = 3; openPath(c, [[174, 184], [178, 140], [164, 100]].map(at)); c.stroke();
    c.strokeStyle = c.fillStyle = BROWN; c.lineWidth = 1.6; c.beginPath(); c.arc(-4, -27.5, 1.7, 0, TAU); c.arc(3.5, -28, 1.7, 0, TAU); c.fill(); c.beginPath(); c.arc(0, -24.5, 3, 0.3, 2.8); c.stroke();
    if (glint) star(c, 15, -36, glint);
    c.restore();
  };
  // a sandbag sitting at (x, y). slump: 0 hanging from its neck, 1 sat down, 2 landing flat.
  const bag = (c, x, y, seed, slump = 1, rot = 0) => {
    const w = 12 + slump * 3, h = 27 - slump * 4.5;
    c.save(); c.translate(x, y - h); c.rotate(rot); c.lineCap = c.lineJoin = 'round'; c.fillStyle = TAN; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(-4, 2); c.lineTo(-8, -6); c.lineTo(0, -3); c.lineTo(8, -6); c.lineTo(4, 2); c.fill(); c.stroke();
    closedPath(c, boil([[-4, 2], [4, 2], [w - 2, h * 0.45], [w, h - 4], [w - 5, h], [-w + 5, h], [-w, h - 4], [-w + 2, h * 0.45]], seed + 11, 1)); c.fill(); c.stroke();
    c.strokeStyle = '#9C7B45'; c.lineWidth = 3; openPath(c, [[-w + 4, h - 4.5], [0, h - 3], [w - 4, h - 4.5]]); c.stroke();
    c.lineWidth = 1.8; c.beginPath(); c.moveTo(1, h * 0.5); c.lineTo(6, h * 0.5 + 4); c.moveTo(6, h * 0.5); c.lineTo(1, h * 0.5 + 4); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 2.8; c.beginPath(); c.moveTo(-4.5, 2); c.lineTo(4.5, 2); c.stroke();
    c.restore();
  };
  const pedestal = (c, sink, seed) => {                      // going down into the floor as it sinks
    c.save(); c.beginPath(); c.rect(0, 0, 240, 204); c.clip(); c.translate(PX, sink); c.lineJoin = 'round'; c.fillStyle = STONE; c.strokeStyle = CREAM; c.lineWidth = 3;
    closedPath(c, boil([[-16, TOP + 8], [16, TOP + 8], [18, 193], [-18, 193]], seed + 3, 1), [0, 1, 2, 3]); c.fill(); c.stroke();
    c.fillStyle = SHADE; c.fillRect(8, TOP + 11, 8, 46);
    c.strokeStyle = SHADE; c.lineWidth = 2.2; c.beginPath(); c.moveTo(-13, 154); [-8, -3, 2].forEach((x, i) => c.lineTo(x, i % 2 ? 154 : 149)); c.moveTo(-1, 172); c.arc(-5, 172, 4, 0, TAU); c.moveTo(-12, 184); c.lineTo(4, 184); c.stroke();
    c.fillStyle = STONE; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.roundRect(-24, TOP, 48, 10, 3); c.fill(); c.stroke(); c.beginPath(); c.roundRect(-26, 191, 52, 14, 3); c.fill(); c.stroke();
    c.restore();
  };
  // rolling along the floor, centred on x; its cracks and pits turn with it
  const boulder = (c, x, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = '#9FB0C4'; c.globalAlpha = 0.45; [[58, 192, 9], [76, 184, 7], [86, 195, 5]].forEach(([dx, y, r]) => { c.beginPath(); c.arc(x + dx, y, r, 0, TAU); c.fill(); }); c.globalAlpha = 1;
    c.translate(x, 201 - R);
    c.fillStyle = SHADE; c.strokeStyle = CREAM; c.lineWidth = 3.5;
    closedPath(c, boil(Array.from({ length: 10 }, (_, i) => [Math.cos(i / 10 * TAU + x / R) * R, Math.sin(i / 10 * TAU + x / R) * R]), 9, 4)); c.fill(); c.stroke();
    c.fillStyle = STONE; c.beginPath(); c.arc(-7, -8, R - 13, 0, TAU); c.fill();
    c.rotate(x / R); c.strokeStyle = c.fillStyle = SHADE; c.lineWidth = 2.6;
    [[[-52, -18], [-36, -8], [-40, 10], [-24, 22]], [[16, -54], [27, -38], [46, -36]], [[8, 30], [22, 43], [18, 58]]].forEach(p => { openPath(c, p); c.stroke(); });
    c.beginPath(); [[-12, -40, 6], [40, 8, 7], [-36, 42, 5], [2, 2, 4]].forEach(([px, py, r]) => { c.moveTo(px + r, py); c.arc(px, py, r, 0, TAU); }); c.fill();
    c.restore();
  };
  // the temple behind him. fade: how much of it is there. jolt: shaken sideways. fall: pebbles on their way down. sink: how far the
  // pedestal has gone (undefined: no pedestal), with `on` it. rock: where the boulder is.
  const set = ({ fade = 1, jolt = 0, fall = 0, sink, on, glint = 0, slump = 1, stash, tick, rock } = {}) => (c, d, seed) => {
    c.save(); c.translate(jolt * 2, jolt); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.2;
    c.globalAlpha = 0.28 * fade; c.beginPath();
    [[0, 46, 58, 46], [28, 46, 28, 98], [0, 98, 36, 98], [176, 30, 240, 30], [204, 30, 204, 84], [188, 84, 240, 84]].forEach(([a, b, x, y]) => { c.moveTo(a, b); c.lineTo(x, y); }); c.stroke();
    c.globalAlpha = 0.55 * fade; c.beginPath(); c.moveTo(-6, 204); c.lineTo(246, 204); [14, 66, 122, 170, 224].forEach(x => { c.moveTo(x, 204); c.lineTo(x - 5, 222); }); c.stroke();
    c.strokeStyle = c.fillStyle = GREEN; c.globalAlpha = 0.7 * fade; c.lineWidth = 2.4;
    openPath(c, [[12, -4], [18, 22], [10, 46], [16, 70]]); c.stroke(); openPath(c, [[226, -4], [220, 14], [228, 34]]); c.stroke();
    c.beginPath(); [[21, 24, 0.6], [7, 46, -0.6], [19, 70, 0.4], [217, 14, -0.5], [231, 36, 0.5]].forEach(([x, y, a]) => { c.moveTo(x, y); c.ellipse(x, y, 6, 3, a, 0, TAU); }); c.fill();
    c.globalAlpha = 1;
    if (fall) { c.fillStyle = STONE; c.beginPath(); [[40, 0], [96, 50], [150, 20], [214, 70], [70, 110], [182, 130]].forEach(([x, y0], i) => { const y = (y0 + fall * 36) % 196; c.moveTo(x + 3, y); c.arc(x, y, 2.4 + i % 2, 0, TAU); }); c.fill(); }
    if (rock !== undefined) boulder(c, rock, seed);
    if (stash) bag(c, 150, stash, seed, 0);
    if (sink !== undefined) {
      c.save(); c.beginPath(); c.rect(0, 0, 240, 204); c.clip();
      if (on === 'idol') idol(c, PX, TOP + sink, { glint }); else if (on) bag(c, PX, TOP + sink, seed, slump);
      c.restore(); pedestal(c, sink, seed);
      if (tick) { c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); [[-34, 186, -42, 182], [-36, 196, -45, 197], [34, 186, 42, 182], [36, 196, 45, 197]].forEach(([a, b, x, y]) => { c.moveTo(PX + a, b); c.lineTo(PX + x, y); }); c.stroke(); }
    }
    c.restore();
  };
  // what he is holding, in front of him: ['idol', x, y, options] or ['bag', x, y, slump, rot]
  const hold = (...things) => (c, d, seed) => things.forEach(([what, x, y, a, b]) => what === 'idol' ? idol(c, x, y, a) : bag(c, x, y, seed, a, b));
  const P = 'boulder_run_', seq = [], HOME = { dx: -44 }, S = [122, 140];
  const add = (name, ticks, o, back, extra = {}) => { D[P + name] = xf(D.N, { ...o, extra: { ...extra, back } }); seq.push([P + name, ticks]); };
  add('rise0', 3, { dx: -22, face: FACE.lookr }, set({ fade: 0.4, sink: 66, on: 'idol' }));
  add('rise1', 2, { ...HOME, face: FACE.lookr }, set({ fade: 0.7, sink: 30, on: 'idol' }));
  add('rise2', 2, { ...HOME, face: FACE.lookr }, set({ sink: 6, on: 'idol' }));
  add('see0', 3, { ...HOME, face: FACE.cute }, set({ sink: 0, on: 'idol', glint: 5 }));
  add('see1', 3, { ...HOME, face: FACE.cute, ky: 1.02 }, set({ sink: 0, on: 'idol', glint: 9 }));
  add('bag0', 2, { ...HOME, face: FACE.lookr, rot: -0.03 }, set({ sink: 0, on: 'idol', stash: 196 }), { arm2: [S, [140, 172]] });
  add('bag1', 2, { ...HOME, face: weighing }, set({ sink: 0, on: 'idol' }), { arm2: [S, [146, 150]], front: hold(['bag', 152, 148, 0]) });
  const weigh = [[{ ...HOME, face: weighing }, [S, [150, 136]], 132, 1], [{ ...HOME, face: [...FACE.lookr, ...brow], ky: 1.02 }, [S, [150, 128]], 118, 0]];
  weigh.forEach(([o, arm2, y, slump], i) => { D[P + 'weigh' + i] = xf(D.N, { ...o, extra: { arm2, back: set({ sink: 0, on: 'idol', glint: i * 5 }), front: hold(['bag', 153, y, slump]) } }); });
  for (let i = 0; i < 4; i++) seq.push([P + 'weigh' + i % 2, 3]);
  const LEAN = { dx: -44, rot: 0.1, face: careful };
  add('reach', 4, { ...LEAN, rot: 0.06 }, set({ sink: 0, on: 'idol' }), { arm2: [[130, 142], [156, 104]], arm: [[136, 162], [156, 144]], front: hold(['bag', 158, 132, 0]) });
  [[[164, 84], [166, 128], 113], [[161, 88], [169, 124], 117]].forEach(([hand, reach, y], i) => {
    D[P + 'hover' + i] = xf(D.N, { ...LEAN, extra: { arm2: [[132, 143], hand], arm: [[140, 164], reach], back: set({ sink: 0, on: 'idol', glint: i * 6 }), front: hold(['bag', hand[0] + 2, y, 0]) } });
  });
  for (let i = 0; i < 4; i++) seq.push([P + 'hover' + i % 2, 3]);
  add('snap', 2, { dx: -44, rot: 0.04, face: [...FACE.chooEyes, ['stroke',[[122,125],[134,124]],2.8]] }, set({ sink: 0 }),
    { arm2: [[128, 142], [168, 108]], arm: [[138, 164], [156, 150]], front: hold(['bag', PX - 2, TOP - 6, 0, 0.25], ['idol', 164, 156, { rot: -0.4 }]) });
  const HUG = { arm: [[136, 162], [150, 156]] };
  add('plop', 2, { ...HOME, rot: -0.04, ky: 0.97, face: tense }, set({ sink: 0, on: 'bag', slump: 2 }), { ...HUG, front: hold(['idol', 152, 160, { rot: -0.15 }]) });
  add('wait', 8, { ...HOME, rot: -0.04, face: tense }, set({ sink: 0, on: 'bag' }), { ...HUG, front: hold(['idol', 152, 160, { rot: -0.15 }]) });
  [5, 9].forEach((glint, i) => add('smug' + i, 4, { ...HOME, ky: 1.03 - i * 0.02, face: smug }, set({ sink: 0, on: 'bag' }), { arm2: [S, [146, 106 + i * 2]], front: hold(['idol', 150, 102 + i * 2, { glint, rot: 0.1 }]) }));
  add('click', 6, { ...HOME, face: uhOh }, set({ sink: 8, on: 'bag', slump: 1.7, tick: true }), { arm2: [S, [146, 110]], front: hold(['idol', 150, 106, { rot: 0.1 }]) });
  const CLUTCH = i => ({ arm2: [[S[0] + i, 140], [142 + i, 128]], front: hold(['idol', 146 + i, 136, { rot: -0.1 }]) });
  [16, 32, 52, 74, undefined, undefined].forEach((sink, i) => {
    const j = i % 2 ? 2 : -2;
    add('rumble' + i, 2, { dx: -44 + j, face: nervous, ky: 0.97 }, set({ sink, on: 'bag', slump: 1.4, jolt: j / 2, fall: i + 1, rock: i > 4 ? 318 : undefined }), CLUTCH(j));
  });
  [296, 272].forEach((rock, i) => add('here' + i, 2, { dx: -44 + (i ? 2 : -2), face: panic, ky: 1.03 }, set({ jolt: i ? 1 : -1, fall: 7 + i, rock }), { ...CLUTCH(0), fxm: 'alert', fx: [112, 58] }));
  add('windup', 2, { dx: -38, rot: 0.1, ky: 0.9, kx: 1.06, face: panic }, set({ fall: 9, rock: 246 }), CLUTCH(8));
  [[-72, 210], [-110, 172], [-152, 132], [-204, 90], [-268, 46]].forEach(([dx, rock], i) => {
    const o = { dx, rot: -0.28, kx: 1.05, ky: 0.96, dy: i % 2 ? 0 : -9, shadowK: 0.8, face: panic }, [sx, sy] = where(o, [166, 140]), [ax, ay] = where(o, [90, 140]);
    add('run' + i, 2, o, set({ jolt: i % 2 ? 1 : -1, fall: 10 + i, rock }), { arm2: [[sx, sy], [sx + 22, sy - 30]], arm: [[ax, ay], [ax - 32, ay + (i % 2 ? -14 : 6)]], front: hold(['idol', sx + 26, sy - 30, { rot: 0.5 }]) });
  });
  [0, -46, -100].forEach((rock, i) => add('roll' + i, 2, { dx: -400 }, set({ jolt: i % 2 ? -1 : 1, fall: 15 + i, rock })));
  add('gone', 4, { dx: -400 }, set({ fade: 0.8 }));
  [[-124, -0.1, 0.65], [-90, 0.1, 0.5], [-52, -0.1, 0.35], [-14, 0.07, 0.2]].forEach(([dx, rot, fade], i) => add('flat' + i, 2, { dx, rot, kx: 0.14, face: [] }, set({ fade })));
  add('turn', 2, { dx: -6, kx: 0.6, ky: 1.05, face: FACE.spiral });
  add('pop', 2, { kx: 1.15, ky: 0.9, face: FACE.spiral });
  add('daze0', 4, { rot: -0.05, face: FACE.spiral });
  add('daze1', 4, { rot: 0.05, face: FACE.sheep });
  CLIPS.boulder_run = { home: 'idle', seq: [...WAKE, ...seq, ...DOZE] };
})();
