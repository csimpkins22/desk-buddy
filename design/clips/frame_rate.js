// He moves in stiff held poses, two a second, like a bad connection. He thumps the side of the screen and glides off smoothly; then it drops again as he dozes.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const k = kit.clip('frame_rate');
  // a ring of dots at the top right, one lit, fixed to the screen
  const dots = (c, lit, s = 1) => {
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    for (let i = 0; i < 8; i++) { const a = i / 8 * kit.TAU; c.fillStyle = i === lit % 8 ? kit.CREAM : '#6F7886'; c.beginPath(); c.arc(204 + Math.cos(a) * 16 * s, 38 + Math.sin(a) * 16 * s, 4.2 * s, 0, kit.TAU); c.fill(); }
    c.restore();
  };
  const thump = (c, n) => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3.5;
    [[10, 110, 22 + n * 4, 98 - n * 3], [13, 128, 30 + n * 5, 128], [10, 146, 22 + n * 4, 158 + n * 3]].forEach(([x0, y0, x1, y1]) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); });
    c.restore();
  };
  const sh = o => kit.pt(o, [90, 140]);
  const held = (o, i, hand, hit) => xf(D.N, { ...o, extra: { still: true, arm: hand && [sh(o), hand], front: c => { dots(c, i); if (hit) thump(c, hit - 1); } } });

  const LEFT = kit.look(-5, 0, 'flat'), EDGE = { dx: -50, rot: -0.05 };
  [held({ dx: -6, rot: 0.05, face: LEFT }, 0),
   held({ dx: -24, rot: -0.07, ky: 0.98, face: LEFT }, 1),
   held({ dx: -44, rot: 0.07, ky: 1.02, face: LEFT }, 2),
   held({ dx: -48, rot: 0.06, face: FACE.grump }, 3, [30, 100]),
   held({ ...EDGE, face: FACE.grump }, 4, [5, 126], 1),
   held({ dx: -48, face: kit.look(0, 0, 'flat') }, 5),
   held({ dx: -44, rot: 0.13, face: FACE.grump }, 6, [50, 94]),
   held({ ...EDGE, rot: -0.07, face: FACE.aah }, 7, [4, 124], 2),
  ].forEach((d, i) => k.add('held' + i, 12, d));

  // the picture jumps, and he can move again
  [[112, 0.7], [125, 0.35]].forEach(([x, s], i) => k.add('jolt' + i, 2, xf(D.N, { ...EDGE, face: FACE.shock, extra: { view: kit.view(1, [120, 120], [x, 120]), arm: [sh(EDGE), [8, 130 + i * 12]], front: c => dots(c, 7, s) } })));
  k.add('oh', 6, xf(D.N, { dx: -50, face: kit.faces.wide }));
  kit.steps(-50, 0, 12).forEach((dx, i) => {
    const o = { dx, rot: 0.1 * Math.sin(i * 0.9), ky: 1 + 0.03 * Math.sin(i * 1.8) }, len = Math.min(30, i * 8, (11 - i) * 10), aL = Math.PI + 0.7 * Math.sin(i * 0.9), aR = -0.7 * Math.sin(i * 0.9), l = sh(o), r = kit.pt(o, [166, 140]);
    k.add('glide' + i, 2, xf(D.N, { ...o, face: FACE.happy, extra: len > 4 ? { arm: [l, [l[0] + Math.cos(aL) * len, l[1] + Math.sin(aL) * len]], arm2: [r, [r[0] + Math.cos(aR) * len, r[1] + Math.sin(aR) * len]] } : {} }));
  });
  k.add('ta', 6, xf(D.N, { face: FACE.happy }));
  k.add('n', 4, xf(D.N, {}));
  k.add('stuck', 12, xf(D.T1, { extra: { still: true, front: c => dots(c, 2) } }));
  k.add('asleep', 4, xf(D.S1, {}));
  k.done({ doze: false });
})();
