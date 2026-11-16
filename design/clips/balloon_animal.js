// He twists himself, squeaking, into a balloon dog made of his own body, admires it for a beat, and pops back to himself with a bang.
// group: odd
// Staging: centre, his own body is the prop; the view pushes in a little on the dog; 4.5 seconds; one big hit; the bang drops him back, startled.
(() => {
  const { D, xf, FACE, boil, openPath, tint, mixHex } = window.__lump, kit = window.__lump.kit, k = kit.clip('balloon_animal');
  // him with his sides pinched in at the heights ys, like a balloon being twisted
  const waist = (ys, a) => ({ ...D.N, body: D.N.body.map(([x, y]) => [128 + (x - 128) * (1 - ys.reduce((s, y0) => s + a * Math.exp(-(((y - y0) / 15) ** 2)), 0)), y]) });
  const squeak = (x, y, side) => c => {
    c.save(); c.strokeStyle = kit.CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    [[-9, 8, -14], [0, 9, 0], [9, 8, 14]].forEach(([dy, a, by]) => { c.beginPath(); c.moveTo(x + side * a, y + dy); c.lineTo(x + side * (a + 12), y + by); c.stroke(); });
    c.restore();
  };
  // one sausage of balloon from a to b, w thick: his colour, his outline, a pale shine
  const seg = (c, a, b, w, seed) => {
    const [p, q] = boil([a, b], seed, 1.4), n = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1, ox = (q[1] - p[1]) / n * w * 0.24, oy = -(q[0] - p[0]) / n * w * 0.24, at = t => [p[0] + (q[0] - p[0]) * t + ox, p[1] + (q[1] - p[1]) * t + oy];
    c.lineCap = 'round';
    [[kit.CREAM, w + 6], [tint(), w]].forEach(([col, lw]) => { c.strokeStyle = col; c.lineWidth = lw; c.beginPath(); c.moveTo(...p); c.lineTo(...q); c.stroke(); });
    c.strokeStyle = mixHex(tint(), '#FFFFFF', 0.45); c.lineWidth = 3; c.beginPath(); c.moveTo(...at(0.2)); c.lineTo(...at(0.55)); c.stroke();
  };
  const eyes = (c, P) => { c.fillStyle = c.strokeStyle = '#0B0E14'; P.forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 3.6, 0, kit.TAU); c.fill(); }); };
  const floor = (c, rx) => { c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(126, 203, rx, 6, 0, 0, kit.TAU); c.fill(); };
  // three links, half way there
  const links = (c, d, seed) => {
    c.save(); floor(c, 50);
    seg(c, [102, 182], [154, 184], 32, seed); seg(c, [150, 148], [112, 140], 28, seed + 1); seg(c, [116, 104], [146, 98], 28, seed + 2);
    eyes(c, [[122, 100], [140, 96]]); c.lineWidth = 2.8; openPath(c, [[124, 110], [131, 113], [139, 109]]); c.stroke();
    c.strokeStyle = kit.CREAM; c.lineWidth = 3.4; openPath(c, [[130, 82], [124, 71], [128, 63], [136, 66], [133, 72]]); c.stroke();
    c.restore();
  };
  const dog = (s, wag) => (c, d, seed) => {
    c.save(); floor(c, 56 * s); c.translate(122, 201); c.scale(s, s); c.translate(0, -54);
    const tip = [-48 + wag * 7, -40];
    seg(c, [-22, 8], [-19, 44], 14, seed + 1); seg(c, [35, 8], [41, 44], 14, seed + 2);
    seg(c, [-34, -8], tip, 11, seed + 3);
    c.strokeStyle = kit.CREAM; c.lineWidth = 3.4; openPath(c, [[tip[0], tip[1] - 6], [tip[0] - 6, tip[1] - 16], [tip[0] - 2, tip[1] - 24], [tip[0] + 6, tip[1] - 21], [tip[0] + 3, tip[1] - 15]]); c.stroke();
    seg(c, [-30, 0], [26, 0], 26, seed + 4);
    seg(c, [-31, 8], [-35, 44], 15, seed + 5); seg(c, [26, 8], [30, 44], 15, seed + 6);
    seg(c, [28, -8], [34, -34], 17, seed + 7);
    seg(c, [30, -46], [22, -72], 13, seed + 8); seg(c, [41, -47], [48, -73], 13, seed + 9);
    seg(c, [33, -43], [70, -35], 22, seed + 10);
    c.fillStyle = tint(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.6; c.beginPath(); c.arc(84, -33, 4.5, 0, kit.TAU); c.fill(); c.stroke();
    eyes(c, [[44, -48], [57, -45]]); c.lineWidth = 2.8; openPath(c, [[52, -35], [59, -31], [66, -34]]); c.stroke();
    c.restore();
  };
  const bang = (R, bits) => (c, d, seed) => {
    const star = (r, col) => { c.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * kit.TAU + 0.2, q = (i % 2 ? 0.58 : 1) * r; c[i ? 'lineTo' : 'moveTo'](122 + Math.cos(a) * q, 140 + Math.sin(a) * q * 0.9); } c.closePath(); c.fillStyle = col; c.fill(); };
    c.save(); c.lineJoin = 'round';
    if (R) { star(R, kit.YELLOW); c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.stroke(); star(R * 0.55, kit.WHITE); }
    for (let i = 0; i < 7; i++) { const a = i / 7 * kit.TAU + 0.5, x = 122 + Math.cos(a) * bits, y = 140 + Math.sin(a) * bits * 0.9; seg(c, [x, y], [x + Math.cos(a + 1) * 12, y + Math.sin(a + 1) * 12], 9, seed + i); }
    c.restore();
  };
  const both = (...fs) => (c, d, seed, tick) => fs.forEach(f => f(c, d, seed, tick));
  const F = [122, 140], Z = [1.08, 1.16, 1.24, 1.3];
  const strain = [...FACE.chooEyes, ['stroke', [[120, 126], [124, 123], [128, 126], [132, 123], [136, 126]], 2.8]];

  k.add('brace', 2, xf(D.N, { ky: 0.9, kx: 1.06, face: kit.look(0, 2, 'flat') }));
  k.add('tw1', 4, xf(waist([152], 0.42), { rot: 0.07, face: strain, extra: { view: kit.zoom(Z[0], F), front: squeak(178, 150, 1) } }));
  k.add('tw2', 4, xf(waist([166, 112], 0.5), { rot: -0.07, ky: 1.05, face: strain.map(m => m[0] === 'stroke' ? ['stroke', m[1].map(([x, y]) => [x, y - 22]), m[2]] : m), extra: { view: kit.zoom(Z[1], F), front: both(squeak(80, 166, -1), squeak(176, 112, 1)) } }));
  k.add('tw3', 4, kit.gone({ view: kit.zoom(Z[2], F), front: both(links, squeak(170, 150, 1), squeak(92, 120, -1)) }));
  k.add('in', 2, kit.gone({ view: kit.zoom(Z[3], F), front: dog(0.84, 0) }));
  k.add('dogA', 6, kit.gone({ view: kit.zoom(Z[3], F), front: both(dog(1, 0), c => kit.sparkle(c, 196, 76, 9)) }));
  k.add('dogB', 6, kit.gone({ view: kit.zoom(Z[3], F), front: both(dog(1, 1), c => kit.sparkle(c, 60, 96, 7)) }));
  k.add('dogA', 6);
  k.add('bang1', 2, kit.gone({ view: kit.zoom(Z[3], F), front: bang(72, 30) }));
  k.add('bang2', 2, kit.gone({ view: kit.zoom(1.14, F), front: bang(96, 84) }));
  k.add('bang3', 2, xf(D.K1, { dy: -14, shadowK: 0.7, extra: { fxm: 'none', front: bang(0, 150) } }));
  k.add('land', 4, xf(D.K1, { extra: { fxm: 'none' } }));
  k.add('phew', 8, xf(D.N, { ky: 1.03, face: FACE.shock }));
  k.add('ok', 6, xf(D.N, { face: FACE.sheep }));
  k.done();
})();
