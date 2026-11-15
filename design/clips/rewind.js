// He strolls into a vase and it smashes; rewind marks come up and it all runs backwards. The second time he tiptoes round the vase, and backs into another.
(() => {
  const L = window.__lump, { D, xf, FACE, closedPath } = L, kit = L.kit, k = kit.clip('rewind');
  const AX = 300, BX = 480, W = x => kit.view(0.7, [x, 150], [120, 150]);
  const pen = (c, w = 4) => { c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = w; };
  const VASE = [[-8, 0], [8, 0], [15, -16], [13, -30], [6, -38], [8, -46], [-8, -46], [-6, -38], [-13, -30], [-15, -16]].map(([x, y]) => [x * 1.3, y * 1.3]);
  const BITS = [[-22, -2, 0.4], [-9, -6, 2.1], [4, -3, 1.2], [17, -5, 3.0], [29, -2, 0.2], [-34, -3, 2.6]];
  // a stand at x and its vase: s is 0 standing, 1 tipping, 2 off the edge, 3 falling, 4 bursting, 5 in pieces
  const prop = (c, x, s, colour) => {
    c.save(); pen(c); c.fillStyle = kit.GREY; c.beginPath(); c.rect(x - 10, 157, 20, 38); c.rect(x - 20, 150, 40, 7); c.rect(x - 18, 195, 36, 6); c.fill(); c.stroke();
    c.fillStyle = colour;
    if (s < 4) {
      const [dx, dy, rot] = [[0, 0, 0], [9, 0, 0.4], [32, 2, 1.1], [48, 26, 1.9]][s];
      c.translate(x + dx, 150 + dy); c.rotate(rot); pen(c, 3.6); closedPath(c, VASE); c.fill(); c.stroke();
      c.strokeStyle = kit.WHITE; c.beginPath(); c.moveTo(-14, -28); c.lineTo(14, -28); c.stroke();
    } else {
      pen(c, 3);
      BITS.forEach(([dx, dy, r], i) => { c.save(); c.translate(x + 56 + dx * (s - 3.5) / 1.5, 198 + dy - (5 - s) * (24 + i % 3 * 9)); c.rotate(r + s); c.beginPath(); c.moveTo(-8, 5); c.lineTo(0, -10); c.lineTo(10, 6); c.closePath(); c.fill(); c.stroke(); c.restore(); });
    }
    c.restore();
  };
  // rewind marks fixed to the screen, s of the way grown, and with n given two tracking lines that jump about
  const marks = (s, n) => c => {
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = c.strokeStyle = kit.WHITE;
    [0, 1].forEach(i => { c.beginPath(); c.moveTo(20 + i * 20 + 18 * s, 18); c.lineTo(20 + i * 20, 18 + 13 * s); c.lineTo(20 + i * 20 + 18 * s, 18 + 26 * s); c.closePath(); c.fill(); });
    if (n !== undefined) { c.lineWidth = 3; c.beginPath(); [0, 1].forEach(i => { const y = 50 + (n * 53 + i * 97) % 160; c.moveTo(0, y); c.lineTo(240, y); }); c.stroke(); }
  };
  // him through the wide view centred on x (or a view of its own), vase A in state a and vase B in state b (null: out of sight)
  const shot = (o, face, cx, a, b, extra = {}) => xf(D.N, { ...o, face, extra: { view: typeof cx === 'number' ? W(cx) : cx,
    back: c => { prop(c, AX, a, kit.BLUE); if (b !== null) prop(c, BX, b, kit.YELLOW); }, ...extra } });

  const HUM = kit.faces.closed, WINCE = [...FACE.chooEyes, ['stroke', [[119, 126], [123, 123], [128, 126], [133, 123], [137, 126]], 2.6]];
  const F = [
    ...kit.walk(0, 98, 6).map(o => [o, HUM, 0]),
    [{ dx: 99, kx: 0.95, rot: 0.04 }, kit.look(6, 0, 'o'), 1],
    [{ dx: 97 }, kit.look(7, 2, 'o'), 2],
    [{ dx: 97 }, kit.look(7, 6, 'o'), 3],
    [{ dx: 97, ky: 0.93, kx: 1.05 }, FACE.shock, 4],
    [{ dx: 97 }, WINCE, 5],
  ];
  k.add('rev0', 3, shot({}, kit.look(0, 0, 'smile'), kit.cam(0.26, kit.HOME, W(222)), 0, null));
  k.add('rev1', 2, shot({}, kit.look(0, 0, 'smile'), kit.cam(0.74, kit.HOME, W(222)), 0, null));
  F.forEach(([o, f, a], i) => k.add('f' + i, i < 6 ? 4 : i < 10 ? 2 : 10, shot(o, f, 222, a, null)));
  k.add('m0', 2, shot(F[10][0], WINCE, 222, 5, null, { front: marks(0.5) }));
  k.add('m1', 6, shot(F[10][0], kit.look(-7, -6, 'wobble'), 222, 5, null, { front: marks(1) }));
  for (let i = 9; i >= 0; i--) k.add('r' + i, 2, shot(F[i][0], F[i][1], 222, F[i][2], null, { front: marks(1, i) }));
  k.add('m2', 2, shot({}, kit.look(0, 0, 'o'), 222, 0, null, { front: marks(0.5) }));
  k.add('huh', 6, shot({}, FACE.spiral, 222, 0, null));

  [1, 2, 3].forEach(i => k.add('f' + i, 4));
  k.add('stop', 8, shot({ dx: 64, ky: 0.96 }, kit.faces.wide, 222, 0, null, { front: c => kit.mark(c, '!', 262, 62, 1.3) }));
  for (let i = 0; i < 5; i++) {
    const t = (i + 1) / 5, near = Math.sin(Math.PI * t), cx = 222 + 108 * t;
    k.add('tip' + i, 4, shot({ dx: 64 + 192 * t, dy: 12 * near, k: 1 + 0.06 * near, ky: i % 2 ? 1.05 : 0.98, rot: i % 2 ? 0.04 : -0.04 }, kit.look(t < 0.5 ? 6 : -7, 4, 'wobble'), cx, 0, cx > 285 ? 0 : null));
  }
  k.add('phew', 8, shot({ dx: 256 }, kit.look(-7, 0, 'smile'), 330, 0, 0, { front: (c, d, seed) => kit.sweat(c, 336, 84, seed, -1) }));
  [263, 270, 277].forEach((dx, i) => k.add('bk' + i, 4, shot({ dx, rot: i % 2 ? -0.04 : 0.05 }, kit.faces.smug, 350 + i * 25, 0, 0)));
  [[{ dx: 279, kx: 0.95, rot: -0.04 }, kit.look(0, 0, 'o'), 1], [{ dx: 277 }, kit.look(5, 2, 'o'), 2], [{ dx: 277 }, kit.look(7, 6, 'o'), 3], [{ dx: 277, ky: 0.93, kx: 1.05 }, FACE.shock, 4], [{ dx: 277 }, WINCE, 5]]
    .forEach(([o, f, b], i) => k.add('b' + i, i < 4 ? 2 : 10, shot(o, f, 400, 0, b)));
  k.add('us', 10, shot({ dx: 277 }, kit.look(0, 0, 'flat'), 400, 0, 5));
  [328, 379, 430, 481, 532].forEach((dx, i) => k.add('exit' + i, 2, shot({ dx, rot: i % 2 ? 0.05 : -0.05, ky: i % 2 ? 0.97 : 1.02 }, FACE.sheep, 400, 0, 5)));
  [0.3, 0.65].forEach((t, i) => k.add('pan' + i, 2, kit.gone({ view: kit.cam(t, W(400), kit.HOME), back: c => prop(c, AX, 0, kit.BLUE) })));
  k.add('empty', 4, kit.gone());
  kit.walk(-190, 0, 6).forEach((o, i) => k.add('in' + i, 2, xf(D.N, { ...o, face: kit.look(0, -5, 'o') })));
  k.add('innocent', 8, xf(D.N, { face: FACE.sheep }));
  k.done();
})();
