// Paper boat: he sets a folded paper boat on a strip of water, blows, and waves it off as it sails out of view.
(() => {
  const { D, xf, FACE, kit, boil, openPath } = window.__lump, k = kit.clip('paper_boat'), { CREAM, BLUE, WHITE, GREY } = kit;
  const ink = (c, w = 2.6) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const water = (c, seed) => {
    c.fillStyle = BLUE; c.fillRect(126, 194, 114, 14); ink(c, 3);
    openPath(c, boil([126, 150, 174, 198, 222, 240].map((x, i) => [x, 194 + (i % 2 ? 2 : -2)]), seed, 1.2)); c.stroke();
  };
  const boat = (c, x, y, t = 0) => {
    c.save(); c.translate(x, y); c.rotate(t); ink(c); c.fillStyle = WHITE;
    c.beginPath(); c.moveTo(0, -24); c.lineTo(11, -8); c.lineTo(-11, -8); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-20, -9); c.lineTo(20, -9); c.lineTo(12, 2); c.lineTo(-12, 2); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = GREY; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -21); c.lineTo(0, -10); c.stroke(); c.restore();
  };
  const gust = c => { ink(c, 3); c.globalAlpha = 0.7; [[104, 118, 128, 128], [106, 130, 134, 142], [102, 142, 124, 158]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); }); c.globalAlpha = 1; };
  const f = (o, face, { a = 1, b, hand, blow } = {}) => {
    const oo = { dx: -52, ...o };
    return xf(D.N, { ...oo, face, extra: { ...(hand ? { arm2: [kit.pt(oo, [166, 140]), hand] } : {}),
      front: (c, d, seed) => kit.fade(c, a, () => { if (b) boat(c, ...b); water(c, seed); if (blow) gust(c); }) } });
  };

  kit.steps(0, -52, 3).forEach((x, i) => k.add('in' + i, 2, f({ dx: x }, FACE.lookr, { a: [0.35, 0.7, 1][i], b: [x + 204, 148], hand: [x + 192, 150] })));
  [[154, 164], [157, 182], [158, 196]].forEach(([x, y], i) => k.add('set' + i, 2, f({ rot: 0.03 * (i + 1) }, FACE.lookr, { b: [x, y], hand: [x - 12, y - 8] })));
  k.add('look', 6, f({}, FACE.happy, { b: [158, 196] }));
  k.add('inhale', 4, f({ ky: 1.06, kx: 0.96, rot: -0.04 }, FACE.puff, { b: [158, 196] }));
  for (let i = 0; i < 8; i++) {
    const b = [172 + i * 15, 196 + (i % 2), i % 2 ? 0.08 : -0.08];
    k.add('sail' + i, 2, i < 3 ? f({ ky: 0.96, rot: 0.1 }, FACE.puff, { b, blow: true })
      : f({}, FACE.happy, { b, hand: i % 2 ? [152, 108] : [156, 124] }));
  }
  k.add('sail6', 4); k.add('sail7', 4); k.add('sail6', 4); k.add('sail7', 4);
  k.add('out0', 2, f({ dx: -35 }, FACE.happy, { a: 0.6, hand: [150, 150] }));
  k.add('out1', 2, f({ dx: -17 }, FACE.happy, { a: 0.3 }));
  k.done();
})();
