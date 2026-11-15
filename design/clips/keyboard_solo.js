// Keyboard solo: a little electric keyboard rolls in and he plays it with a completely straight face, nubs going up and down in turn, even as a long stage hook comes over his head, takes him round the middle and hauls him off. Then it comes back for the keyboard.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', SLATE = '#3A4656', DEEP = '#2B3440', WHITE = '#E9EEF5', GREY = '#9FB0C4', RED = '#FF5A4D', WINE = '#C8402F', YELLOW = '#FFD23F', BROWN = '#6B4A1F', TAU = Math.PI * 2;
  const P = 'keyboard_solo_', HOME = -14, KX = 114, KY = 143, PIVOT = [330, 136], BLACKS = [0, 1, 3, 4, 5, 7, 8];
  const deadpan = [['stroke',[[109,103.5],[123,104]],2.6], ['stroke',[[133,102],[147,101.5]],2.6], ['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[122,125],[134,124]],2.8]];
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]];
  const lookdown = [['dot',114,114,3.8], ['dot',138,112,3.8], ['stroke',[[121,126],[127,127.5],[133,126]],2.6]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  // the boards and footlights along the front of the stage
  const stage = fade => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.globalAlpha = fade; c.fillStyle = '#2A1E14'; c.fillRect(0, 209, 240, 31);
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.45 * fade; c.beginPath(); c.moveTo(0, 209); c.lineTo(240, 209); c.stroke();
    c.globalAlpha = fade; c.fillStyle = YELLOW; c.lineWidth = 2.2;
    [30, 110, 190].forEach(x => { c.beginPath(); c.arc(x, 229, 8, Math.PI, 0); c.closePath(); c.fill(); c.stroke(); });
    c.restore();
  };
  // the curtain in the wings, drawn back `off` to the right
  const curtain = (c, off, seed) => {
    c.save(); c.translate(off, 0); c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 3;
    closedPath(c, boil([[212, -8], [208, 40], [213, 92], [208, 142], [212, 188], [208, 207], [250, 207], [250, -8]], seed + 41, 1.4), [0, 5, 6, 7]); c.fill(); c.stroke();
    c.strokeStyle = WINE; c.lineWidth = 2.4; openPath(c, [[221, 0], [219, 62], [223, 124], [219, 198]]); c.stroke(); openPath(c, [[232, 0], [230, 70], [234, 140], [230, 198]]); c.stroke();
    c.strokeStyle = YELLOW; c.lineWidth = 3; c.beginPath(); c.moveTo(210, 201); c.lineTo(244, 201); c.stroke();
    c.restore();
  };
  // the keyboard on its folding stand, x along from its place and tipped by tilt about its feet. down: the white keys being held down.
  const keyboard = (c, seed, x = 0, tilt = 0, down = []) => {
    const sx = (u, v) => u * (1 + v * 0.0039), quad = (u0, u1, v0, v1) => { c.moveTo(sx(u0, v0), v0); c.lineTo(sx(u1, v0), v0); c.lineTo(sx(u1, v1), v1); c.lineTo(sx(u0, v1), v1); c.closePath(); };
    c.save(); c.translate(KX + x, 203); c.rotate(tilt); c.translate((seed % 3 - 1) * 0.4, KY - 203);
    c.beginPath(); c.moveTo(-40, 34); c.lineTo(40, 59); c.moveTo(40, 34); c.lineTo(-40, 59); c.moveTo(-51, 59.5); c.lineTo(-30, 59.5); c.moveTo(30, 59.5); c.lineTo(51, 59.5);
    c.strokeStyle = CREAM; c.lineWidth = 6.4; c.stroke(); c.strokeStyle = GREY; c.lineWidth = 3; c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(0, 46.5, 2.4, 0, TAU); c.fill();
    c.strokeStyle = CREAM; c.lineWidth = 3;
    c.fillStyle = DEEP; c.beginPath(); quad(-57, 57, 27, 34.5); c.fill(); c.stroke();
    c.fillStyle = SLATE; c.beginPath(); quad(-57, 57, 0, 27); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.fillRect(-9, 3, 18, 4.6);
    c.fillStyle = RED; c.beginPath(); c.arc(15, 5.3, 1.8, 0, TAU); c.fill();
    c.fillStyle = CREAM; c.beginPath(); [24, 31, 38].forEach(u => { c.moveTo(u + 1.7, 5.3); c.arc(u, 5.3, 1.7, 0, TAU); }); c.fill();
    c.strokeStyle = GREY; c.lineWidth = 1.5; c.beginPath(); [-48, -43, -38, -33, -28].forEach(u => { c.moveTo(u, 3.4); c.lineTo(u, 7.4); }); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); quad(-50, 50, 10.5, 25); c.fill();
    if (down.length) { c.fillStyle = '#8796AC'; c.beginPath(); down.forEach(i => quad(-50 + i * 10, -40 + i * 10, 10.5, 25)); c.fill(); }
    c.strokeStyle = DARK; c.lineWidth = 1.4; c.beginPath(); for (let i = 1; i < 10; i++) { c.moveTo(sx(-50 + i * 10, 10.5), 10.5); c.lineTo(sx(-50 + i * 10, 25), 25); } c.stroke();
    c.fillStyle = DARK; c.beginPath(); BLACKS.forEach(i => quad(-43 + i * 10, -37 + i * 10, 10.5, 19.5)); down.forEach(i => quad(-50 + i * 10, -40 + i * 10, 22.4, 25)); c.fill();
    c.restore();
  };
  // one of his nubs, drawn the way the page draws them, so it can reach over the keys
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed, 0.8));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 3); c.restore();
  };
  // the stage hook: its crook resting on (x, y), its pole running back to whoever holds it in the wings
  const hook = (c, [x, y], seed) => {
    c.save(); c.translate(x, y); c.rotate(Math.atan2(PIVOT[1] - y, PIVOT[0] - x));
    openPath(c, boil([[300, 0], [150, 0], [18, 0], [4, -0.6], [-7, -4.5], [-12, -12], [-8, -20.5], [0, -24], [8, -23]], seed + 31, 1));
    c.strokeStyle = CREAM; c.lineWidth = 8.6; c.stroke(); c.strokeStyle = BROWN; c.lineWidth = 5.2; c.stroke();
    c.strokeStyle = '#A9783A'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(34, -1.2); c.lineTo(260, -1.2); c.stroke();
    c.strokeStyle = YELLOW; c.lineWidth = 2.4; c.beginPath(); c.moveTo(22, -3.2); c.lineTo(22, 3.2); c.moveTo(28, -3.2); c.lineTo(28, 3.2); c.stroke();
    c.restore();
  };
  const note = (c, x, y, s, two) => {
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = c.strokeStyle = two ? YELLOW : CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.ellipse(0, 0, 6, 4.5, -0.4, 0, TAU); c.fill();
    c.beginPath(); c.moveTo(5, -1); c.lineTo(5, -22);
    if (two) { c.lineTo(23, -26); c.lineTo(23, -5); } else c.quadraticCurveTo(14, -18, 13, -10);
    c.stroke();
    if (two) { c.beginPath(); c.ellipse(18, -4, 6, 4.5, -0.4, 0, TAU); c.fill(); }
    c.restore();
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  // one drawing. L, R: where each hand is. kb: the keyboard's [x, tilt, keys down]. hk: the hook's crook; over: the hook is this side of the keyboard.
  // notes: [side, age] of each one in the air. cur: how far the curtain is drawn back. streak: he is being dragged.
  const shot = (o, face, { L, R, kb, hk, over, notes = [], cur = 0, fade = 1, streak } = {}) => {
    const q = { dx: HOME, ...o }, sl = pt(q, [95, 135]), sr = pt(q, [170, 135]);
    return xf(D.N, { ...q, face, extra: { back: stage(fade), front: (c, d, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round';
      if (hk && !over) hook(c, hk, seed);
      if (kb) keyboard(c, seed, ...kb);
      if (L) nub(c, sl, typeof L === 'function' ? L(sl) : L, seed + 98);
      if (R) nub(c, sr, typeof R === 'function' ? R(sr) : R, seed + 99);
      if (hk && over) hook(c, hk, seed);
      if (streak) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.globalAlpha = 0.7; c.beginPath(); [[88, 0, 30], [106, -14, 22], [124, 4, 26]].forEach(([y, x, n]) => { c.moveTo(streak + x, y); c.lineTo(streak + x - n, y); }); c.stroke(); }
      notes.forEach(([side, age, two]) => { c.globalAlpha = Math.min(1, (10 - age) / 3); note(c, (side < 0 ? 26 : 186) + side * (age * 0.8 + Math.sin(age * 0.9) * 3), 152 - age * 4.4, 0.72 + age * 0.03, two); });
      c.globalAlpha = 1; curtain(c, cur, seed);
      c.restore();
    } } });
  };
  add('in0', 3, shot({ dx: -5 }, lookl, { kb: [-200, 0], cur: 32, fade: 0.4 }));
  add('in1', 2, shot({ dx: -10 }, lookl, { kb: [-124, -0.06], cur: 15, fade: 0.75 }));
  add('in2', 2, shot({}, lookl, { kb: [-54, -0.05] }));
  add('in3', 2, shot({ ky: 0.97 }, lookdown, { kb: [7, 0.04] }));
  add('in4', 4, shot({}, lookdown, { kb: [0, 0] }));
  add('ready', 4, shot({ ky: 1.035, kx: 0.98 }, deadpan, { kb: [0, 0], L: s => [s[0] - 17, s[1] - 18], R: s => [s[0] + 17, s[1] - 18] }));

  // playing: each hand is down on a key for two drawings, swings out and up, stays up for two, and swings back down; the two hands take turns
  const keyX = i => KX + (-45 + i * 10) * 1.06, KEYS = [[2, 7], [1, 8], [3, 6], [2, 7]];
  const reach = (side, key, ph) => s => ph < 2 ? [keyX(key), 158] : ph === 2 || ph === 5 ? [s[0] + side * 22, s[1] + 5] : [s[0] + side * 17, s[1] - 18];
  const HOOK = [[236, 136], [198, 122], [150, 74], [86, 56], [42, 134], [61, 136], [60, 136], [60, 136], [60, 136], [60, 136], [57, 136], [55, 136]];
  // a note leaves each side of the keyboard as that hand comes down; air: the ones still drifting up at drawing g
  const played = [], air = (g, left) => played.filter(n => g - n[1] < 10 && (!left || n[0] < 0)).map(([side, born, two]) => [side, g - born, two]);
  for (let g = 0; g < 24; g++) {
    const ph = g % 6, [lk, rk] = KEYS[Math.floor(g / 6)];
    if (ph === 0) played.push([-1, g, g % 12 === 0]); if (ph === 3) played.push([1, g, g % 12 === 3]);
    add('play' + g, 2, shot({ rot: [-0.03, -0.02, 0, 0.03, 0.02, 0][ph], ky: ph % 3 ? 1 : 0.985 }, deadpan, {
      kb: [0, 0, ph < 2 ? [lk] : ph === 3 || ph === 4 ? [rk] : []], L: reach(-1, lk, ph), R: reach(1, rk, (ph + 3) % 6), hk: HOOK[g - 12],
      notes: air(g) }));
  }
  // hauled off, still reaching for the keys
  add('pull0', 2, shot({ dx: HOME + 16, rot: 0.17, kx: 1.07 }, deadpan, { kb: [0, 0, [2, 7]], L: () => [keyX(2), 158], R: () => [keyX(7), 158], hk: [82, 135], notes: air(24) }));
  add('pull1', 2, shot({ dx: HOME + 60, rot: 0.24, kx: 1.13, ky: 0.95 }, deadpan, { kb: [0, -0.02], L: s => [s[0] - 30, s[1] + 2], R: s => [s[0] - 27, s[1] - 12], hk: [128, 133], notes: air(25, true), streak: 78 }));
  add('pull2', 2, shot({ dx: HOME + 124, rot: 0.2, kx: 1.1, ky: 0.96 }, deadpan, { kb: [0, 0.015], L: s => [s[0] - 30, s[1] - 6], R: s => [s[0] - 24, s[1] - 18], hk: [192, 133], notes: air(26, true), streak: 138 }));
  add('pull3', 2, shot({ dx: HOME + 200 }, deadpan, { kb: [0, 0], hk: [270, 136], notes: air(27) }));
  add('alone0', 2, shot({ dx: HOME + 200 }, deadpan, { kb: [0, 0], notes: air(28) }));
  add('alone1', 4, shot({ dx: HOME + 200 }, deadpan, { kb: [0, 0], notes: air(30) }));
  // and the hook comes back for the keyboard
  [[[236, 150], 0, 0], [[150, 112], 0, 0], [[40, 160], 0, 0], [[53, 160], 7, 0.05], [[106, 158], 60, 0.09], [[172, 158], 126, 0.07], [[250, 158], 204, 0.05]].forEach(([hk, x, tilt], i) =>
    add('take' + i, 2, shot({ dx: HOME + 200 }, deadpan, { kb: [x, tilt], hk, over: true })));
  add('back0', 2, shot({ dx: 96, rot: -0.05 }, deadpan, { cur: 4 }));
  add('back1', 2, shot({ dx: 50, rot: 0.05 }, deadpan, { cur: 16, fade: 0.7 }));
  add('back2', 2, shot({ dx: 14, rot: -0.03 }, deadpan, { cur: 32, fade: 0.35 }));
  CLIPS.keyboard_solo = { home: 'idle', seq: [...seq, ...DOZE] };
})();
