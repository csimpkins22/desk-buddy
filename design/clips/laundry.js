// Laundry: he pegs two socks on a washing line, the wind takes one, and he watches it go with a sigh.
(() => {
  const { D, xf, FACE, kit, openPath } = window.__lump, k = kit.clip('laundry'), { CREAM, BLUE, WHITE, BROWN } = kit;
  const sad = [['dot', 116, 111, 3.8], ['dot', 140, 109, 3.8], ['stroke', [[121, 128], [128, 124], [135, 128]], 3]];
  const sock = (c, [x, y, rot = 0, peg = true]) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = BLUE;
    c.beginPath(); c.moveTo(-7, 0); c.lineTo(7, 0); c.lineTo(7, 20); c.lineTo(17, 25); c.lineTo(17, 33); c.lineTo(-2, 33); c.lineTo(-7, 27); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = WHITE; c.fillRect(-5.5, 1.5, 11, 6);
    if (peg) { c.lineWidth = 2; c.fillStyle = BROWN; c.beginPath(); c.rect(-3, -9, 6, 14); c.fill(); c.stroke(); }
    c.restore();
  };
  const scene = (a, s1, s2, wind) => c => kit.fade(c, a, () => {
    c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; openPath(c, [[14, 58], [128, 64], [226, 58]]); c.stroke();
    if (s1) sock(c, s1); if (s2) sock(c, s2);
    if (wind !== undefined) kit.fade(c, wind ? 0.7 : 0.35, () => { c.strokeStyle = CREAM; c.lineWidth = 3; [[20, 30], [50, 96], [0, 44]].forEach(([x, y]) => { c.beginPath(); c.moveTo(14 + x + wind * 30, y); c.lineTo(42 + x + wind * 30, y); c.stroke(); }); });
  });
  const o = { k: 0.9 }, L = kit.pt(o, [90, 140]), R = kit.pt(o, [166, 140]), P1 = [44, 62], P2 = [208, 62];
  const sc = (face, s1, s2, { a = 1, arm, arm2, wind, ky = 1, kx = 1 } = {}) => xf(D.N, { k: 0.9, ky, kx, face, extra: { ...(arm ? { arm: [L, arm] } : {}), ...(arm2 ? { arm2: [R, arm2] } : {}), front: scene(a, s1, s2, wind) } });

  k.add('in0', 2, sc(FACE.lookup, null, null, { a: 0.35 }));
  k.add('in1', 2, sc(FACE.lookup, null, null, { a: 0.7 }));
  [[60, 150], [50, 108], [46, 76]].forEach(([x, y], i) => k.add('a' + i, 2, sc(FACE.lookup, [x - 2, y - 10, 0, false], null, { arm: [x, y] })));
  k.add('peg1', 2, sc(FACE.lookup, P1, null, { arm: [48, 74] }));
  [[196, 150], [206, 108], [210, 76]].forEach(([x, y], i) => k.add('b' + i, 2, sc(FACE.lookup, P1, [x - 2, y - 10, 0, false], { arm2: [x, y] })));
  k.add('peg2', 2, sc(FACE.lookup, P1, P2, { arm2: [204, 74] }));
  k.add('proud', 8, sc(FACE.happy, P1, P2, { ky: 1.03 }));
  k.add('gust0', 2, sc(FACE.happy, [44, 62, -0.4], [208, 62, -0.25], { wind: 0 }));
  k.add('gust1', 2, sc(FACE.lookup, [44, 62, -0.8], [208, 62, -0.4], { wind: 1 }));
  [[70, 40, -1.4], [118, 24, -2.2], [170, 20, -3], [214, 14, -3.8]].forEach(([x, y, r], i) => k.add('fly' + i, 2, sc(i < 2 ? FACE.lookup : FACE.lookr, [x, y, r, false], [208, 62, i % 2 ? -0.2 : -0.35], { wind: 2 + i })));
  k.add('gone', 6, sc(FACE.lookr, null, P2));
  k.add('sigh0', 2, sc(sad, null, P2, { ky: 0.97 }));
  k.add('sigh', 14, sc(sad, null, P2, { ky: 0.92, kx: 1.05 }));
  k.add('out0', 2, sc(sad, null, P2, { a: 0.6, ky: 0.96 }));
  k.add('out1', 2, sc(sad, null, P2, { a: 0.3 }));
  k.done();
})();
