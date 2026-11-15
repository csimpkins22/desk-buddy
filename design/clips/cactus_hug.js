// Cactus hug: he admires a potted cactus, hugs it, freezes, and backs away covered in prickles.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('cactus_hug'), { CREAM, GREEN, BROWN, YELLOW, TAU } = kit;
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const limb = (c, pts, w) => {
    c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    ink(c, w + 5.5); c.stroke(); c.strokeStyle = GREEN; c.lineWidth = w; c.stroke();
  };
  const cactus = c => {
    limb(c, [[192, 160], [210, 160], [210, 142]], 9); limb(c, [[192, 152], [175, 152], [175, 134]], 9); limb(c, [[192, 176], [192, 124]], 20);
    c.strokeStyle = '#2E9E5E'; c.lineWidth = 3; c.beginPath(); c.moveTo(192, 170); c.lineTo(192, 128); c.stroke();
    ink(c); c.fillStyle = BROWN; c.beginPath(); c.moveTo(174, 178); c.lineTo(210, 178); c.lineTo(205, 201); c.lineTo(179, 201); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(192, 113, 5.5, 0, TAU); c.fill(); c.stroke();
  };
  const prickles = (c, o) => {
    c.lineCap = 'round'; c.strokeStyle = GREEN; c.lineWidth = 3.2;
    [[178, 118], [184, 146], [180, 172], [158, 92], [150, 134], [164, 160], [138, 150], [172, 100]].forEach((p, i) => {
      const [x, y] = kit.pt(o, p); c.beginPath(); c.moveTo(x, y); c.lineTo(x + 10, y - 6 + (i % 3) * 4); c.stroke();
    });
  };
  const OW = [['stroke', [[110, 106], [120, 110], [110, 114]], 3], ['stroke', [[146, 104], [136, 108], [146, 112]], 3], ['stroke', [[120, 126], [125, 123], [130, 127], [135, 124]], 3]];
  const f = (o, face, { a = 1, hug, pr, bang } = {}) => xf(D.N, { ...o, face, extra: { front: (c, d, seed) => {
    kit.fade(c, a, () => { cactus(c); if (pr) prickles(c, o); });
    if (hug) kit.arm(c, [kit.pt(o, [166, 140]), [214, 150]], seed);
    if (bang) kit.mark(c, '!', 100, 56);
  } } });
  const hug = { dx: -10, rot: 0.1 };

  kit.steps(0, -34, 3).forEach((x, i) => k.add('in' + i, 2, f({ dx: x }, FACE.lookr, { a: [0.35, 0.7, 1][i] })));
  k.add('admire', 12, f({ dx: -34, rot: 0.04 }, FACE.cute));
  k.add('antic', 2, f({ dx: -38, rot: -0.05, ky: 0.96 }, FACE.cute));
  k.add('go', 2, f({ dx: -22, rot: 0.06 }, FACE.happy));
  k.add('hug', 8, f(hug, FACE.happy, { hug: true }));
  k.add('freeze', 10, f({ ...hug, ky: 1.04 }, FACE.shock, { hug: true, bang: true }));
  kit.steps(-16, -40, 3).forEach((x, i) => k.add('back' + i, 2, f({ dx: x, rot: -0.03 }, FACE.shock, { pr: true })));
  k.add('ouch', 16, f({ dx: -40, ky: 0.97 }, OW, { pr: true }));
  k.add('out0', 2, f({ dx: -26 }, OW, { pr: true, a: 0.6 }));
  k.add('out1', 2, f({ dx: -13 }, OW, { pr: true, a: 0.3 }));
  k.done();
})();
