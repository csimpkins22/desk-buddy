// Dozing on his feet, his cowlick uncurls into a periscope, looks left, right and at us, and snaps back just before he opens his eyes. Once he is asleep it goes up again.
// group: odd
(() => {
  const L = window.__lump, { D, xf } = L, kit = L.kit, k = kit.clip('cowlick_periscope'), TAU = Math.PI * 2;
  const V = kit.view(1.35, [128, 78], [96, 118]);
  const mix = (A, B, t) => A.map((p, i) => [p[0] + (B[i][0] - p[0]) * t, p[1] + (B[i][1] - p[1]) * t]);
  const DOZY = [['stroke', [[110, 110], [116, 113], [122, 110]], 3], ['stroke', [[134, 108], [140, 111], [146, 108]], 3], ['oval', 128, 125, 3, 3.5]];
  // the cowlick standing h tall from its root, its top bent over to look left (-1), at us (0) or right (1)
  const scope = (h, turn, [x, y] = [128, 71]) => [[x, y], [x + 1, y - h * 0.5], [x, y - h], [x + turn * 12, y - h - 5], [x + turn * 24, y - h - 4]];
  const lens = (turn, r, spotted) => (c, d) => {
    const [x, y] = d.curl[4];
    c.save(); c.fillStyle = kit.CREAM; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    c.fillStyle = '#0B0E14'; c.beginPath(); c.arc(x + turn * r * 0.4, y, r * 0.5, 0, TAU); c.fill(); c.restore();
    if (spotted) kit.mark(c, '!', x + 30, y + 26, 0.9);
  };
  const pose = (curl, turn, r, o = {}, spotted) => xf(D.N, { face: DOZY, ...o, extra: { view: V, ...(curl && { curl }), ...(r && { front: lens(turn, r, spotted) }) } });

  k.add('nod0', 3, xf(D.N, { face: kit.look(0, 2, 'flat'), extra: { view: kit.cam(0.26, kit.HOME, V) } }));
  k.add('nod1', 2, xf(D.N, { ky: 0.98, face: DOZY, extra: { view: kit.cam(0.74, kit.HOME, V) } }));
  k.add('br0', 4, pose());
  k.add('br1', 4, pose(null, 0, 0, { ky: 0.975 }));
  k.add('br0', 4);
  [0.35, 0.7, 1].forEach((t, i) => k.add('un' + i, 2, pose(mix(D.N.curl, scope(18, 1), t), 1, [0, 4, 6][i])));
  kit.steps(18, 56, 4).slice(1).forEach((h, i) => k.add('up' + i, i === 2 ? 4 : 2, pose(scope(h, 1), 1, 8)));
  k.add('mid', 2, pose(scope(56, 0), 0, 9));
  k.add('left', 8, pose(scope(56, -1), -1, 8));
  k.add('mid', 2);
  k.add('up2', 8);
  k.add('mid', 2);
  k.add('spot', 10, pose(scope(61, 0), 0, 11, {}, true));
  k.add('snap0', 2, pose(mix(scope(61, 0), D.N.curl, 0.6)));
  k.add('snap1', 2, pose([[128, 71], [121, 64], [125, 58], [134, 60], [131, 65]], 0, 0, { ky: 0.97 }));
  k.add('open', 6, pose(null, 0, 0, { face: kit.look(0, 0, 'flat') }));
  k.add('lookl', 4, pose(null, 0, 0, { face: kit.look(-6, 0, 'flat') }));
  k.add('lookr', 4, pose(null, 0, 0, { face: kit.look(6, 0, 'flat') }));
  k.add('lookup', 6, pose(null, 0, 0, { face: kit.look(0, -6, 'flat') }));
  k.add('fine', 8, pose(null, 0, 0, { face: kit.look(0, 0, 'smile') }));

  const S = D.S1.curl[0], asleep = (curl, turn, r) => xf(D.S1, { extra: { curl, ...(r && { front: lens(turn, r) }) } });
  k.add('t1', 8, xf(D.T1, { extra: { view: kit.cam(0.4, V, kit.HOME) } }));
  k.add('t2', 6, xf(D.T2, { extra: { view: kit.cam(0.8, V, kit.HOME) } }));
  k.add('s', 4, xf(D.S1, {}));
  k.add('pk0', 2, asleep(mix(D.S1.curl, scope(18, -1, S), 0.5)));
  k.add('pk1', 2, asleep(scope(18, -1, S), -1, 4));
  k.add('pk2', 2, asleep(scope(34, -1, S), -1, 7));
  k.add('pk3', 8, asleep(scope(50, -1, S), -1, 8));
  k.add('pk4', 12, asleep(scope(50, 0, S), 0, 10));
  k.done({ doze: false });
})();
