// A rolling pin flattens him into a sheet, a cutter stamps out three tiny Lumps who walk off three ways, and the holey sheet gathers back into him.
// group: odd
(() => {
  const L = window.__lump, { D, xf, FACE } = L, kit = L.kit, k = kit.clip('dough'), TAU = Math.PI * 2;
  const mix = (A, B, t) => A.map((p, i) => [p[0] + (B[i][0] - p[0]) * t, p[1] + (B[i][1] - p[1]) * t]);
  // his outline laid out as a flat oval on the floor, point for point, so he can be eased between the two
  const SHEET = D.N.body.map(([x, y]) => { const a = Math.atan2(y - 140, x - 128); return [128 + Math.cos(a) * 104, 186 + Math.sin(a) * 15]; });
  const CURL = [[128, 172], [120, 168], [122, 163], [130, 163], [131, 167]];
  const face = (t, mood) => {
    const m = (a, b) => a + (b - a) * t, x1 = m(116, 138), x2 = m(140, 160), y = m(109, 183), mx = m(128, 149), my = m(125, 192), s = mood === 'smile' ? 1 : -1;
    const eyes = mood === 'ouch' ? [['stroke', [[x1 - 5, y - 4], [x1 + 2, y], [x1 - 5, y + 4]], 3], ['stroke', [[x2 + 5, y - 4], [x2 - 2, y], [x2 + 5, y + 4]], 3]] : [['dot', x1, y, 3.8], ['dot', x2, y - 1, 3.8]];
    return [...eyes, ['stroke', [[mx - 7, my - s], [mx, my + 2 * s], [mx + 7, my - s]], 2.8]];
  };
  const lump = (t, mood, extra) => ({ ...D.N, body: mix(D.N.body, SHEET, t), curl: mix(D.N.curl, CURL, t), face: face(t, mood), shadow: [127, 60 + 46 * t], ...extra });

  const pin = (c, y, turn) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3;
    c.fillStyle = kit.BROWN; c.beginPath(); c.roundRect(30, y - 5, 196, 10, 4); c.fill(); c.stroke();
    c.fillStyle = '#D9B57A'; c.beginPath(); c.roundRect(52, y - 14, 152, 28, 11); c.fill(); c.stroke();
    c.strokeStyle = kit.BROWN; c.lineWidth = 2.4;
    [0, 1].forEach(i => { const gy = y - 9 + (turn * 7 + i * 11) % 19; c.beginPath(); c.moveTo(72 + i * 44, gy); c.lineTo(112 + i * 50, gy); c.stroke(); });
    c.restore();
  };
  const cutter = (c, x, y) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.8; c.fillStyle = kit.GREY;
    c.beginPath(); c.moveTo(x + 22, y - 22); c.lineTo(x + 22, y); c.ellipse(x, y, 22, 7, 0, 0, Math.PI); c.lineTo(x - 22, y - 22); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = kit.WHITE; c.beginPath(); c.ellipse(x, y - 22, 22, 7, 0, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 4; c.beginPath(); c.arc(x, y - 27, 15, Math.PI, TAU); c.stroke();
    c.restore();
  };
  const hole = (c, x, r = 1) => { c.save(); c.fillStyle = '#000000'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6 * r; c.beginPath(); c.ellipse(x, 186, 17 * r, 6 * r, 0, 0, TAU); c.fill(); c.stroke(); c.restore(); };

  const top = t => 70 + 101 * t;
  k.add('see', 3, xf(D.N, { face: kit.look(0, -6, 'o'), extra: { front: c => pin(c, -6, 0) } }));
  k.add('near', 2, xf(D.N, { ky: 0.97, face: kit.faces.worried, extra: { front: c => pin(c, 26, 1) } }));
  [0.1, 0.3, 0.52, 0.45, 0.7, 0.88, 1].forEach((t, i) => k.add('press' + i, i === 3 ? 4 : 2, lump(t, i === 3 ? 'frown' : 'ouch', { front: c => pin(c, top(t) - 11, i + 2) })));
  [146, 110, 66, 20, -24].forEach((y, i) => k.add('lift' + i, 2, lump(1, 'frown', { front: c => pin(c, y, i) })));
  k.add('sheet', 6, lump(1, 'frown'));

  const HX = [58, 100, 196], SMALL = [['dot', 112, 112, 7], ['dot', 144, 110, 7], ['stroke', [[114, 131], [128, 138], [142, 131]], 5.5]];
  // the one cutter: down on a hole every fifth drawing (2, 7, 12), hopping to the next between
  const cut = j => j < 2 ? [HX[0], -6 + j * 96] : j >= 12 ? (j > 15 ? null : [HX[2], 186 - (j - 12) * 65])
    : (i => { const p = (j - 2 - i * 5) / 5; return [HX[i] + (HX[i + 1] - HX[i]) * p, 186 - 92 * Math.sin(Math.PI * p)]; })(Math.floor((j - 2) / 5));
  // the Lump cut from hole i, n drawings after the cutter set off for it: up out of the hole, a hop, then away (left, toward us, right)
  const tiny = (i, n) => {
    if (n < 3) return null;
    const o = { k: 0.5, dx: HX[i] - 128, dy: -15, face: SMALL, shadowK: 0.5 };
    if (n === 3) return xf(D.N, { ...o, ky: 0.5 });
    if (n === 4) return xf(D.N, { ...o, dy: -36, ky: 1.1 });
    if (n === 5) return xf(D.N, { ...o, dy: -8, ky: 0.88 });
    const m = n - 5, rot = m % 2 ? 0.09 : -0.09;
    if (i === 1) return m > 5 ? null : xf(D.N, { ...o, k: 0.5 + m * 0.07, dy: -8 + m * 30, rot });
    const dx = o.dx + (i ? 15 : -15) * m;
    return Math.abs(dx + 8) > 156 ? null : xf(D.N, { ...o, dx, dy: Math.min(0, -8 + m * 4), rot });
  };
  for (let j = 0; j < 22; j++) {
    k.add('cut' + j, 2, lump(1, j % 5 === 2 && j < 13 ? 'ouch' : 'frown', { front: (c, d, seed) => {
      [0, 1, 2].forEach(i => { if (j - i * 5 >= 3) hole(c, HX[i]); });
      [0, 2, 1].forEach(i => { const t = tiny(i, j - i * 5); if (t) kit.twin(c, t, seed + i); });
      const at = cut(j); if (at) cutter(c, at[0], at[1]);
    } }));
  }

  k.add('holes', 8, lump(1, 'frown', { front: c => HX.forEach(x => hole(c, x)) }));
  [[0.82, 0.6], [0.6, 0.3], [0.38, 0], [0.18, 0], [0.05, 0]].forEach(([t, r], i) => k.add('gather' + i, 2, lump(t, 'smile', { front: r && (c => HX.forEach(x => hole(c, x + (128 - x) * (1 - t), r))) })));
  k.add('spring', 2, xf(D.N, { ky: 1.08, kx: 0.95, face: FACE.happy }));
  k.add('whole', 10, xf(D.N, { face: FACE.happy }));
  k.done();
})();
