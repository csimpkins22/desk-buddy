// Limbo: the bar lowers in steps, he flattens further each pass, and gets stuck under the last one.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('limbo');
  const set = (c, y, a = 1) => kit.fade(c, a, () => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.fillStyle = kit.BROWN; [20, 212].forEach(x => { c.beginPath(); c.roundRect(x, 46, 8, 155, 3); c.fill(); c.stroke(); });
    c.fillStyle = kit.YELLOW; c.beginPath(); c.roundRect(15, y - 4, 210, 8, 4); c.fill(); c.stroke();
    c.restore();
  });
  const L = (o, y, a, sweat) => xf(D.N, { ...o, extra: { front: (c, d, seed) => { set(c, y, a); if (sweat) kit.sweat(c, 204, 150, seed, 1); } } });
  const LV = [{ y: 58, ky: 1, kx: 1 }, { y: 82, ky: 0.76, kx: 1.08 }, { y: 114, ky: 0.56, kx: 1.18 }, { y: 148, ky: 0.37, kx: 1.3 }];
  const FACES = [FACE.happy, FACE.ah, FACE.puff];

  [0.3, 0.65, 1].forEach((a, i) => k.add('in' + i, 2, L({ dx: -30, face: FACE.lookup }, 58, a)));
  [[-30, 30, 4], [30, -30, 4], [-30, 0, 3]].forEach(([from, to, n], i) => {
    const p = LV[i], q = LV[i + 1];
    kit.steps(0, 1, 4).slice(1).forEach((t, j) => k.add('low' + i + j, 2, L({ dx: from, ky: p.ky + (q.ky - p.ky) * t, kx: p.kx + (q.kx - p.kx) * t, face: FACE.lookup }, p.y + (q.y - p.y) * t)));
    kit.steps(from, to, n + 1).slice(1).forEach((dx, j) => k.add('go' + i + j, 2, L({ dx, ky: q.ky + (j % 2 ? 0.02 : 0), kx: q.kx, face: FACES[i] }, q.y)));
  });
  const s = LV[3];
  k.add('w0', 2, L({ dx: 5, ky: s.ky, kx: s.kx, face: FACE.puff }, s.y, 1, true));
  k.add('w1', 2, L({ dx: -5, ky: s.ky, kx: s.kx, face: FACE.puff }, s.y, 1, true));
  k.add('w0', 2); k.add('w1', 2);
  k.add('stuck', 12, L({ ky: s.ky, kx: s.kx, face: FACE.grump }, s.y, 1, true));
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, L({ ky: s.ky, kx: s.kx, face: FACE.grump }, s.y, a)));
  k.add('pop', 2, xf(D.N, { ky: 1.1, kx: 0.94, face: FACE.shock }));
  k.add('free', 4, xf(D.N, { face: FACE.happy }));
  k.done();
})();
