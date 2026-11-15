// Bonsai: he snips a tiny tree with shears, admires it, takes one snip too many and the top falls off.
(() => {
  const { D, xf, FACE, boil, closedPath, openPath, kit } = window.__lump, k = kit.clip('bonsai');
  const TOP = [190, 108, 0];
  const puff = (c, x, y, r, seed) => { closedPath(c, boil([0, 1, 2, 3, 4, 5, 6, 7].map(i => [x + Math.cos(i * kit.TAU / 8) * r, y + Math.sin(i * kit.TAU / 8) * r * 0.85]), seed, 1)); c.fill(); c.stroke(); };
  const scene = (c, seed, a, top) => kit.fade(c, a, () => {
    kit.table(c, 190, seed, { w: 60 });
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    openPath(c, [[190, 152], [187, 140], [191, 126]]); c.lineWidth = 8; c.stroke(); c.strokeStyle = kit.BROWN; c.lineWidth = 4.5; c.stroke();
    c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.fillStyle = kit.RED; closedPath(c, [[175, 150], [205, 150], [201, 164], [179, 164]]); c.fill(); c.stroke();
    c.fillStyle = kit.GREEN; puff(c, 177, 130, 11, seed + 1); puff(c, 204, 128, 11, seed + 2); puff(c, top[0], top[1], 13, seed + 3);
    c.restore();
  });
  const shears = (c, hx, hy, open, a = 1) => kit.fade(c, a, () => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3.2;
    c.beginPath(); c.moveTo(hx - 4, hy - 4); c.lineTo(hx + 22, hy + open); c.moveTo(hx - 4, hy + 4); c.lineTo(hx + 22, hy - open); c.stroke();
    c.fillStyle = kit.RED; c.lineWidth = 2; [-5, 5].forEach(dy => { c.beginPath(); c.arc(hx - 7, hy + dy, 4.5, 0, kit.TAU); c.fill(); c.stroke(); });
    c.restore();
  });
  const B = (o, { a = 1, top = TOP, hand, open = 0, sa = 1, spark } = {}) => {
    const p = { dx: -34, ...o };
    return xf(D.N, { ...p, extra: { ...(hand ? { arm2: [kit.pt(p, [166, 140]), hand] } : {}), front: (c, d, seed) => {
      scene(c, seed, a, top); if (hand) shears(c, hand[0] + 4, hand[1], open, sa * a); if (spark) kit.sparkle(c, 214, 104, 9, kit.YELLOW);
    } } });
  };

  [0.3, 0.65, 1].forEach((a, i) => k.add('in' + i, 2, B({ face: FACE.lookr }, { a })));
  k.add('look', 4, B({ face: FACE.happy }));
  k.add('get0', 2, B({ face: FACE.lookr }, { hand: [150, 158], sa: 0.5 }));
  k.add('get1', 2, B({ face: FACE.lookr }, { hand: [154, 140], open: 8 }));
  k.add('so', 4, B({ face: FACE.lookr }, { hand: [156, 128], open: 9 }));
  k.add('sc', 2, B({ face: FACE.lookr, kx: 1.02 }, { hand: [158, 128], open: 1 }));
  k.add('so', 4); k.add('sc', 2);
  k.add('admire', 12, B({ face: FACE.cute, rot: -0.06 }, { hand: [152, 152], open: 1, spark: true }));
  k.add('ro', 4, B({ face: FACE.lookr }, { hand: [156, 118], open: 9 }));
  k.add('rc', 2, B({ face: FACE.happy, kx: 1.02 }, { hand: [158, 118], open: 1 }));
  [[186, 122], [176, 146], [168, 172], [166, 188]].forEach((top, i) => k.add('fall' + i, 2, B({ face: FACE.shock }, { hand: [158, 118], open: 1, top })));
  k.add('oops', 12, B({ face: FACE.shock, ky: 0.97 }, { hand: [152, 150], open: 1, top: [166, 188] }));
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, B({ face: FACE.grump }, { a, hand: [152, 150], open: 1, top: [166, 188] })));
  k.done();
})();
