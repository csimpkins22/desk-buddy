// Sandcastle: he pats a castle into shape, plants a flag, stands back proudly, and a wave washes it flat.
(() => {
  const { D, xf, FACE, kit, closedPath } = window.__lump, k = kit.clip('sandcastle'), { CREAM, RED, BLUE, WHITE, BROWN, TAU } = kit, SAND = '#E8C860';
  const castle = (c, g, flag, a = 1) => kit.fade(c, a, () => {
    const x = 186, h = 34 * g, t = 26 * g, top = 201 - h - t;
    c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8; c.fillStyle = SAND;
    if (flag > 0) {
      c.beginPath(); c.moveTo(x, top); c.lineTo(x, top - 24 * flag); c.stroke();
      c.fillStyle = RED; c.beginPath(); c.moveTo(x, top - 24 * flag); c.lineTo(x + 16 * flag, top - 18 * flag); c.lineTo(x, top - 12 * flag); c.closePath(); c.fill(); c.stroke(); c.fillStyle = SAND;
    }
    if (g > 0.45) {
      c.beginPath(); c.rect(x - 14, top, 28, t + 2); c.rect(x - 14, top - 7, 8, 7); c.rect(x - 4, top - 7, 8, 7); c.rect(x + 6, top - 7, 8, 7); c.fill(); c.stroke();
    }
    c.beginPath(); c.moveTo(x - 34, 201); c.lineTo(x - 28, 201 - h); c.lineTo(x + 28, 201 - h); c.lineTo(x + 34, 201); c.closePath(); c.fill(); c.stroke();
    if (g > 0.7) { c.fillStyle = BROWN; c.beginPath(); c.arc(x, 201, 8, Math.PI, TAU); c.fill(); }
  });
  const wave = (c, x) => {
    c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8; c.fillStyle = BLUE;
    closedPath(c, [[x, 201], [x + 8, 178], [x + 28, 164], [x + 46, 174], [x + 62, 158], [x + 110, 166], [x + 110, 201]]); c.fill(); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); c.ellipse(x + 14, 180, 7, 4, -0.8, 0, TAU); c.fill();
  };
  const sc = (o, face, hand, g, { flag = 0, a = 1, wx } = {}) => xf(D.N, { ...o, face, extra: {
    ...(hand ? { arm2: [kit.pt(o, [166, 140]), hand] } : {}),
    front: c => { if (a) castle(c, g, flag, a); if (wx !== undefined) wave(c, wx); },
  } });
  const at = { dx: -44 }, back = kit.steps(-52, 0, 4);

  k.add('in0', 2, sc(at, FACE.lookr, null, 0.3, { a: 0.4 }));
  k.add('in1', 2, sc(at, FACE.lookr, null, 0.3, { a: 0.8 }));
  k.add('look', 4, sc(at, FACE.lookr, null, 0.3));
  [0.5, 0.75, 1].forEach((g, i) => {
    k.add('up' + i, 2, sc(at, FACE.lookr, [156, 118], g - 0.25 + (i ? 0 : 0.05)));
    k.add('pat' + i, 4, sc({ ...at, ky: 0.96 }, FACE.happy, [158, 201 - 60 * g + 2], g));
  });
  k.add('flag0', 2, sc(at, FACE.happy, [160, 132], 1, { flag: 0.5 }));
  k.add('flag1', 2, sc(at, FACE.happy, [162, 122], 1, { flag: 1 }));
  k.add('proud', 12, sc({ dx: -52, ky: 1.04 }, FACE.happy, null, 1, { flag: 1 }));
  k.add('wave0', 2, sc({ dx: -52 }, FACE.lookr, null, 1, { flag: 1, wx: 228 }));
  k.add('wave1', 2, sc({ dx: -52, ky: 1.03 }, FACE.shock, null, 1, { flag: 1, wx: 190 }));
  k.add('wave2', 2, sc({ dx: -52 }, FACE.shock, null, 0.6, { wx: 150 }));
  k.add('wave3', 2, sc({ dx: -52 }, FACE.shock, null, 0.2, { wx: 190 }));
  k.add('wave4', 2, sc({ dx: -52 }, FACE.shock, null, 0.2, { wx: 232 }));
  k.add('flat', 14, sc({ dx: -52, ky: 0.94, kx: 1.04 }, FACE.grump, null, 0.2));
  k.add('out0', 2, sc({ dx: back[1] }, FACE.grump, null, 0.2, { a: 0.6 }));
  k.add('out1', 2, sc({ dx: back[2] }, FACE.grump, null, 0.2, { a: 0.3 }));
  k.done();
})();
