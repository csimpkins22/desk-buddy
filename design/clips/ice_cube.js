// Asleep, he freezes into a block; it melts and he melts with it into a puddle with eyes; the puddle pulls itself back up into him, wobbling, and he dozes off still dripping.
(() => {
  const { xf, D, kit } = window.__lump, { CREAM, WHITE, BLUE, TAU } = kit;
  const k = kit.clip('ice_cube', { asleep: true });
  const ICE = '#2B5878';
  const lerp = (a, b, t) => a + (b - a) * t, mix = (A, B, t) => A.map((p, i) => [lerp(p[0], B[i][0], t), lerp(p[1], B[i][1], t)]);
  // him as a puddle with a hump for his eyes: once with S1's fourteen points, once with N's sixteen
  const PUD14 = [[46, 199], [90, 203], [146, 203], [196, 200], [208, 196], [200, 190], [178, 188], [160, 180], [148, 166], [128, 163], [110, 168], [98, 181], [78, 188], [54, 189]];
  const PUD16 = [[46, 199], [90, 203], [146, 203], [194, 201], [208, 196], [200, 190], [178, 188], [160, 180], [150, 168], [138, 163], [124, 163], [110, 169], [98, 181], [78, 188], [54, 189], [42, 194]];
  const PUDCURL = [[132, 164], [127, 153], [131, 145], [139, 148], [136, 154]];
  const EYES0 = [[168, 165], [183, 168]], EYESP = [[122, 178], [142, 177]], EYESN = [[116, 110], [140, 108]];
  const dots = (E, g = 0) => E.map(([x, y]) => ['dot', x + g, y, 3.8]);

  const water = (c, rx) => { if (rx < 4) return; c.save(); c.fillStyle = BLUE; c.beginPath(); c.ellipse(128, 203, rx, 6, 0, 0, TAU); c.fill(); c.restore(); };
  const block = (c, top, grow = 0, dx = 0) => {
    if (203 - top < 8) return;
    c.save(); c.lineJoin = 'round'; c.fillStyle = ICE; c.strokeStyle = WHITE; c.lineWidth = 3;
    c.beginPath(); c.roundRect(34 - grow + dx, top, 180 + grow * 2, 203 - top, Math.min(14, (203 - top) / 2)); c.fill(); c.stroke(); c.restore();
  };
  const shine = (c, top, dx = 0) => {
    if (203 - top < 50) return;
    c.save(); c.lineCap = 'round'; c.strokeStyle = WHITE; c.lineWidth = 3.4;
    c.beginPath(); c.moveTo(46 + dx, top + 30); c.lineTo(62 + dx, top + 11); c.moveTo(59 + dx, top + 33); c.lineTo(70 + dx, top + 20); c.stroke(); c.restore();
  };
  // a drop falling off his right side, again and again
  const drip = (c, d, tick) => {
    const [px, py] = d.body.reduce((a, b) => b[0] > a[0] ? b : a), ph = (Math.floor(tick / 2) * 2 % 16) / 16;
    const x = px + 9, y = py + 10 + (192 - py - 10) * ph * ph, r = ph < 0.2 ? 4 : 6.5;
    c.save(); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2.2; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(x, y - r * 2); c.quadraticCurveTo(x + r * 1.3, y, x, y + r); c.quadraticCurveTo(x - r * 1.3, y, x, y - r * 2); c.fill(); c.stroke(); c.restore();
  };
  const wet = { back: c => water(c, 92), front: (c, d, seed, tick) => drip(c, d, tick) };

  // the ice comes up round him as he sleeps
  [190, 168, 138, 118].forEach((top, i) => k.add('frz' + i, 2, xf(D.S1, { extra: { back: c => block(c, top), front: c => shine(c, top) } })));
  [-1.5, 1.5].forEach((dx, i) => k.add('cold' + i, 4, xf(D.S1, { dx, extra: { back: c => block(c, 118, 0, dx), front: c => { shine(c, 118, dx); kit.sparkle(c, 200 + dx, 102, i ? 13 : 9, WHITE); } } })));
  k.add('cold0', 4); k.add('cold1', 4); k.add('cold0', 4); k.add('cold1', 4);
  // the block sinks into a pool, and he goes with it
  kit.steps(0, 1, 9).slice(1).forEach((t, i) => k.add('melt' + i, 4, { ...D.S1, body: mix(D.S1.body, PUD14, t), curl: mix(D.S1.curl, PUDCURL, t), face: dots(mix(EYES0, EYESP, t)),
    shadow: [128, lerp(78, 90, t)], back: c => { water(c, 100 * t); block(c, lerp(118, 200, t), 10 * t); }, front: c => shine(c, lerp(118, 200, t)) }));
  const puddle = g => ({ ...D.N, body: PUD16, curl: PUDCURL, face: dots(EYESP, g), shadow: [128, 90], back: c => water(c, 100) });
  k.add('pud_l', 12, puddle(-4)); k.add('pud_r', 12, puddle(4)); k.add('pud_c', 10, puddle(0));
  // the puddle gathers and climbs back into his shape
  kit.steps(0, 1, 7).slice(1).forEach((t, i) => k.add('up' + i, 4, { ...D.N, body: mix(PUD16, D.N.body, t), curl: mix(PUDCURL, D.N.curl, t),
    face: [...dots(mix(EYESP, EYESN, t)), ...(t > 0.5 ? [['oval', 128, lerp(190, 125, t), 4, 5]] : [])], shadow: [128, lerp(90, 60, t)], back: c => water(c, lerp(100, 92, t)) }));
  [[0.86, 1.16], [1.13, 0.87], [0.91, 1.1], [1.08, 0.93], [0.96, 1.04], [1, 1]].forEach(([kx, ky], i) => k.add('jelly' + i, 2, xf(D.N, { kx, ky, face: kit.faces.worried, extra: wet })));
  k.add('wet', 16, xf(D.N, { face: kit.look(4, 5, 'wobble'), extra: wet }));
  k.add('n', 4, xf(D.N, { face: kit.faces.closed, extra: wet }));
  k.add('t1', 8, xf(D.T1, { extra: wet })); k.add('t2', 6, xf(D.T2, { extra: wet })); k.add('s1', 12, xf(D.S1, { extra: wet }));
  k.done();
})();
