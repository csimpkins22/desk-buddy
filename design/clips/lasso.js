// Lasso: he whirls a lasso overhead in widening loops, throws it, and it drops neatly round himself and pulls tight.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('lasso'), { YELLOW } = kit;
  const rope = c => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = YELLOW; c.lineWidth = 3.6; };
  const half = (c, x, y, rx, ry, tilt, from, a = 1) => kit.fade(c, a, () => { rope(c); c.beginPath(); c.ellipse(x, y, rx, ry, tilt, from, from + Math.PI); c.stroke(); });
  const line = (c, pts, a = 1) => kit.fade(c, a, () => { rope(c); c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(p => c.lineTo(p[0], p[1])); c.stroke(); });
  const whirl = (n, rx, tilt, hand, t = 2) => k.add(n, t, xf(D.N, { face: FACE.lookup, ky: 1.02, extra: { arm2: [[166, 140], hand], front: c => {
    half(c, 128, 44, rx, rx * 0.3, tilt, 0); half(c, 128, 44, rx, rx * 0.3, tilt, Math.PI);
    line(c, [[hand[0] + 2, hand[1] - 6], [128 + rx * Math.cos(tilt) * (tilt > 0 ? 1 : 0.4), 44 + rx * 0.3]]);
  } } }));
  k.add('ready', 4, xf(D.N, { face: FACE.happy, extra: { arm2: [[166, 140], [196, 150]], front: c => { half(c, 204, 176, 12, 16, 0, 0); half(c, 204, 176, 12, 16, 0, Math.PI); } } }));
  [[14, 12], [24, 18], [34, 24], [44, 30], [52, 34]].forEach(([r], i) => { whirl('w' + i + 'a', r, 0.22, [190, 104]); whirl('w' + i + 'b', r + 4, -0.22, [182, 100]); });
  k.add('throw', 2, xf(D.N, { face: FACE.happy, rot: 0.08, extra: { arm2: [[166, 140], [204, 128]], front: c => { half(c, 150, 30, 56, 14, 0.3, 0); half(c, 150, 30, 56, 14, 0.3, Math.PI); line(c, [[206, 122], [200, 44]]); } } }));
  const round = (n, t, y, rx, o, a = 1, tail = [[0, 0], [14, 30]]) => k.add(n, t, xf(D.N, { ...o, extra: {
    back: c => half(c, 128, y, rx, 13, 0, Math.PI, a),
    front: c => { half(c, 128, y, rx, 13, 0, 0, a); line(c, tail.map(([dx, dy]) => [128 + rx + dx, y + dy]), a); } } }));
  round('fall0', 2, 40, 64, { face: FACE.lookup });
  round('fall1', 2, 84, 66, { face: FACE.shock });
  round('fall2', 2, 128, 68, { face: FACE.shock });
  round('fall3', 2, 154, 66, { face: FACE.shock });
  round('pull', 2, 154, 58, { face: FACE.shock, kx: 0.93, ky: 1.05 }, 1, [[0, 0], [30, -14]]);
  round('tight1', 6, 154, 52, { face: FACE.shock, kx: 0.84, ky: 1.12 }, 1, [[0, 0], [36, -20]]);
  round('tight2', 4, 154, 54, { face: FACE.grump, kx: 0.87, ky: 1.09 }, 1, [[0, 0], [30, 8]]);
  round('tight3', 6, 154, 53, { face: FACE.grump, kx: 0.86, ky: 1.1, rot: 0.03 }, 1, [[0, 0], [22, 30]]);
  round('out0', 2, 176, 62, { face: FACE.grump, kx: 0.95, ky: 1.03 }, 0.65);
  round('out1', 2, 194, 68, { face: FACE.grump }, 0.3);
  k.done();
})();
