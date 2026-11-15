// Pancake flip: he flips a pancake higher each time; the third sticks to the ceiling, then drops on his head.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('pancake_flip'), { CREAM, BROWN, TAU } = kit, PAN = '#4A5562', CAKE = '#E8B050';
  const pan = (c, y, a) => kit.fade(c, a, () => {
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 7; c.beginPath(); c.moveTo(176, y); c.lineTo(160, y + 2); c.stroke();
    c.strokeStyle = PAN; c.lineWidth = 3; c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = PAN; c.beginPath(); c.ellipse(196, y, 22, 7, 0, 0, TAU); c.fill(); c.stroke();
  });
  const cake = (c, [x, y, ry = 4, rot = 0, rx = 16], a = 1) => kit.fade(c, a, () => {
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.fillStyle = CAKE; c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = BROWN; c.beginPath(); c.ellipse(x, y, rx * 0.5, ry * 0.45, rot, 0, TAU); c.fill();
  });
  const base = { dx: -26 }, S = kit.pt(base, [166, 140]);
  const sc = (o, face, py, ck, { pa = 1, ca = 1 } = {}) => xf(D.N, { ...base, ...o, face, extra: {
    ...(pa ? { arm2: [S, [164, py + 2]] } : {}),
    front: c => { if (pa) pan(c, py, pa); if (ck) cake(c, ck, ca); },
  } });
  const head = (o, ry) => { const [x, y] = kit.pt({ ...base, ...o }, [128, 72]); return [x, y + 2, ry, 0, 22]; };

  k.add('in0', 2, sc({}, FACE.lookr, 150, [196, 147], { pa: 0.4, ca: 0.4 }));
  k.add('in1', 2, sc({}, FACE.lookr, 150, [196, 147], { pa: 0.8, ca: 0.8 }));
  [110, 66].forEach((p, i) => {
    k.add('dip' + i, 2, sc({ ky: 0.96 }, FACE.lookr, 156, [196, 153]));
    k.add('toss' + i, 2, sc({ ky: 1.03 }, FACE.lookr, 142, [196, (136 + p) / 2, 8, 0.8]));
    k.add('apex' + i, 2, sc({}, FACE.lookup, 146, [196, p, 9, 1.6]));
    k.add('fall' + i, 2, sc({}, FACE.lookr, 150, [196, (136 + p) / 2, 8, 2.4]));
    k.add('catch' + i, 4, sc({ ky: 0.97 }, FACE.happy, 154, [196, 151]));
  });
  k.add('dip2', 4, sc({ ky: 0.93 }, FACE.lookr, 158, [196, 155]));
  k.add('hurl0', 2, sc({ ky: 1.05 }, FACE.lookr, 138, [176, 96, 8, 0.8]));
  k.add('hurl1', 2, sc({}, FACE.lookup, 146, [138, 46, 9, 1.6]));
  k.add('hurl2', 2, sc({}, FACE.lookup, 150, [104, 20, 7, 0]));
  k.add('stuck', 4, sc({}, FACE.lookup, 150, [104, 14, 4]));
  k.add('wait0', 2, sc({}, FACE.lookup, 156, [104, 14, 4], { pa: 0.6 }));
  k.add('wait1', 2, sc({}, FACE.lookup, 162, [104, 14, 4], { pa: 0.3 }));
  k.add('wait', 6, sc({}, FACE.lookup, 0, [104, 14, 4], { pa: 0 }));
  k.add('peel', 2, sc({}, FACE.shock, 0, [104, 20, 7], { pa: 0 }));
  k.add('drop', 2, sc({}, FACE.shock, 0, [104, 46, 6], { pa: 0 }));
  k.add('splat', 2, sc({ ky: 0.86, kx: 1.08 }, FACE.grump, 0, head({ ky: 0.86 }, 7), { pa: 0 }));
  k.add('worn', 14, sc({ ky: 0.95, kx: 1.02 }, FACE.grump, 0, head({ ky: 0.95 }, 7), { pa: 0 }));
  k.add('out0', 2, sc({ dx: -18 }, FACE.grump, 0, head({ dx: -18 }, 7), { pa: 0, ca: 0.6 }));
  k.add('out1', 2, sc({ dx: -8 }, FACE.grump, 0, head({ dx: -8 }, 7), { pa: 0, ca: 0.3 }));
  k.done();
})();
