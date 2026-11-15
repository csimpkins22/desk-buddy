// Weightlift: he strains at a barbell that won't move, heaves it overhead, and its weight tips him over backwards.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('weightlift'), { CREAM, GREY, DARK } = kit;
  const bar = (c, x, y) => {
    c.save(); c.translate(x, y); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-60, 0); c.lineTo(60, 0);
    c.strokeStyle = CREAM; c.lineWidth = 8; c.stroke(); c.strokeStyle = GREY; c.lineWidth = 3.5; c.stroke();
    [-62, 48].forEach(px => {
      c.fillStyle = GREY; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); c.roundRect(px, -17, 14, 34, 5); c.fill(); c.stroke();
      c.fillStyle = DARK; c.fillRect(px + 5, -10, 4, 20);
    });
    c.restore();
  };
  const pose = (o, face, bx, by, arms = true, alpha = 1, extra = {}) => xf(D.N, { ...o, face, extra: {
    ...(arms ? { arm: [kit.pt(o, [90, 140]), [bx - 40, by]], arm2: [kit.pt(o, [166, 140]), [bx + 40, by]] } : {}),
    front: c => kit.fade(c, alpha, () => bar(c, bx, by)), ...extra } });

  [0.35, 0.7, 1].forEach((a, i) => k.add('in' + i, 2, pose({}, FACE.lookr, 128, 184, false, a)));
  k.add('grab', 6, pose({ ky: 0.96 }, FACE.grump, 128, 184));
  k.add('sa', 4, pose({ ky: 0.93, kx: 1.03 }, FACE.puff, 128, 183, true, 1, { back: c => kit.sweat(c, 190, 92, 0, 1) }));
  k.add('sb', 4, pose({ ky: 0.95, kx: 1.02 }, FACE.puff, 128, 185, true, 1, { back: c => kit.sweat(c, 62, 96, 1, -1) }));
  k.add('sa', 4); k.add('sb', 4);
  k.add('antic', 4, pose({ ky: 0.86, kx: 1.06 }, FACE.grump, 128, 186));
  const kys = kit.steps(1, 1.1, 3);
  kit.steps(150, 46, 3).forEach((y, i) => k.add('up' + i, 2, pose({ ky: kys[i] }, FACE.puff, 128, y)));
  k.add('triumph', 12, pose({ ky: 1.05 }, FACE.happy, 128, 44));
  k.add('wobble', 4, pose({ rot: -0.07 }, FACE.shock, 122, 46));
  const rot = kit.steps(-0.3, -1.5, 4), dx = kit.steps(15, 100, 4), dy = kit.steps(-8, -52, 4), ks = kit.steps(1, 0.92, 4);
  const lie = { rot: -1.5, dx: 100, dy: -52, k: 0.92 };
  rot.forEach((r, i) => {
    const o = { rot: r, dx: dx[i], dy: dy[i], k: ks[i] }, [bx, by] = i < 2 ? kit.pt(o, [128, 44]) : i === 2 ? [112, 80] : [140, 98];
    k.add('tip' + i, 2, pose(o, FACE.shock, bx, by, i < 2));
  });
  k.add('flat', 12, pose(lie, FACE.spiral, 140, 98, false));
  [0.6, 0.3].forEach((a, i) => k.add('out' + i, 2, pose(lie, FACE.spiral, 140, 98, false, a)));
  [[-1, 66, -35, 0.95], [-0.5, 33, -17, 0.98], [0, 0, 0, 1]].forEach(([r, x, y, s], i) => k.add('rise' + i, 2, xf(D.N, { rot: r, dx: x, dy: y, k: s, face: FACE.spiral })));
  k.done();
})();
