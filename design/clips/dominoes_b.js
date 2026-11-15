// Six thin little Lumps stand in a row from the right edge like dominoes; the far one tips, they fall in turn toward him on the left, he braces, and ends asleep under the heap.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const k = kit.clip('dominoes_b');
  const HIM = -92, cam1 = t => kit.view(1 - 0.3 * t, [128, 201], [128 - 8 * t, 201 + 5 * t]), wide = cam1(1);
  const cam2 = t => kit.view(0.7 + 0.3 * t, [128 + HIM, 201], [55.6 + 72.4 * t, 206 - 5 * t]);

  const UP = [['dot', 108, 108, 8], ['dot', 148, 106, 8], ['oval', 128, 132, 9, 7]];
  const SHUT = [['stroke', [[98, 106], [108, 113], [118, 106]], 4], ['stroke', [[138, 104], [148, 111], [158, 104]], 4], ['oval', 128, 132, 7, 6]];
  // a thin twin with its middle at (cx, cy), turned by r
  const tw = (cx, cy, r, face, sh = 0) => xf(D.N, { k: 0.62, kx: 0.5, ox: 128, oy: 136, rot: r, dx: cx - 128, dy: cy - 136, face, shadowK: sh });
  const FX = i => 288 - 32 * i;                                             // where twin i stands: 0 is the far one
  const lean = (i, r, off = 0) => [FX(i) + off + 40.3 * Math.sin(r), 201 - 40.3 * Math.cos(r), r];
  const HEAP = [[12, 56, -1.55], [-16, 96, -1.4], [32, 90, 1.55], [2, 132, -1.5], [56, 124, -1.65], [104, 128, -0.9]];
  const row = (c, seed, poses, face) => { for (let i = 5; i >= 0; i--) kit.twin(c, tw(...poses[i], face, Math.abs(poses[i][2]) < 0.2 ? 1 : 0), seed + i * 3); };
  const him = (o, face, extra) => xf(D.N, { dx: HIM, ...o, face, extra });

  kit.steps(0, 1, 5).forEach((t, i) => k.add('open' + i, 2, him({ dx: HIM * t, rot: i % 2 ? 0.05 : -0.05 }, kit.look(5, 0),
    { view: cam1(t), front: (c, d, seed) => row(c, seed, [0, 1, 2, 3, 4, 5].map(j => lean(j, 0, 230 * (1 - t))), UP) })));
  const stood = [0, 1, 2, 3, 4, 5].map(j => lean(j, 0));
  k.add('see', 4, him({}, kit.look(5, 0, 'o'), { view: wide, front: (c, d, seed) => row(c, seed, stood, UP) }));
  k.add('teeter', 2, him({}, kit.look(5, 0, 'o'), { view: wide, front: (c, d, seed) => row(c, seed, stood.map((p, j) => j ? p : lean(0, 0.12)), UP) }));

  const END = [-1, -1, -1, -1, -0.8, -0.55], angle = (i, T) => Math.max(END[i], [0, -0.3, -0.65, -1][Math.max(0, Math.min(3, T - i + 1))]);
  const brace = (o = {}) => { const b = { dx: HIM, rot: 0.1, ...o }, sh = kit.pt(b, [166, 140]); return { ...b, arm2: [sh, [sh[0] + 30, sh[1] - 6]] }; };
  for (let T = 0; T < 8; T++) {
    const poses = [0, 1, 2, 3, 4, 5].map(j => lean(j, angle(j, T))), b = brace();
    k.add('fall' + T, 2, T < 3 ? him({}, kit.faces.worried, { view: wide, front: (c, d, seed) => row(c, seed, poses, UP) })
      : him(b, FACE.grump, { view: wide, arm2: b.arm2, front: (c, d, seed) => row(c, seed, poses, UP) }));
  }
  const fallen = [0, 1, 2, 3, 4, 5].map(j => lean(j, END[j]));
  const held = (name, ticks, o) => { const b = brace(o); k.add(name, ticks, him(b, FACE.grump, { view: wide, arm2: b.arm2,
    front: (c, d, seed) => { row(c, seed, fallen, UP); kit.sweat(c, 128 + b.dx - 46, 96, seed, -1); } })); };
  held('hit', 2, { dx: HIM - 5, rot: -0.06 });
  held('hold0', 2, { rot: 0.05 }); held('hold1', 2, { dx: HIM - 2, rot: 0 });
  k.add('hold0', 2); k.add('hold1', 2);

  // it all comes down: each twin tumbles to its place in the heap as the view closes back in on him
  const mix = t => fallen.map(([x, y, r], i) => [x + (HEAP[i][0] + HIM + 92 - x) * t, y + (HEAP[i][1] - y) * t, r + (HEAP[i][2] - r) * t]);
  const [t1, t2] = kit.steps(0, 1, 4).slice(1);
  k.add('down0', 2, xf(D.T2, { dx: HIM, ky: 0.92, extra: { view: cam2(t1), front: (c, d, seed) => row(c, seed, mix(t1), SHUT) } }));
  k.add('down1', 2, xf(D.S1, { dx: HIM, ky: 0.85, kx: 1.05, extra: { view: cam2(t2), front: (c, d, seed) => { row(c, seed, mix(t2), SHUT); kit.puff(c, HIM + 40, 196, seed, 12); kit.puff(c, HIM + 210, 196, seed + 1, 12); } } }));
  k.add('heap', 38, xf(D.S1, { dx: HIM, extra: { view: cam2(1), front: (c, d, seed) => row(c, seed, mix(1), SHUT) } }));
  k.done({ doze: false });
})();
