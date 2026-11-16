// Close on his face: he shouts, the rings leave to the right, he waits a long time, and the echo comes back from behind and bowls him over.
// group: scenes
(() => {
  const { D, CLIPS, xf, FACE, DOZE, kit } = window.__lump;
  const k = kit.clip('echo'), F = [128, 112], cam = (z, x, y) => kit.view(Math.round(z * 256) / 256, F, [x, y]), CLOSE = cam(1.8, 62, 120), TAU = kit.TAU;
  const face = (f, view = CLOSE, o = {}, extra = {}) => xf(D.N, { ...o, face: f, extra: { view, ...extra } });

  // the view closes in on his face, left of centre
  kit.steps(0, 1, 5).slice(1).forEach((t, i) => k.add('in' + i, 2, face(kit.look(0, 0, 'smile'), cam(1 + 0.8 * t, 128 - 66 * t, 112 + 8 * t))));

  // a big breath
  k.add('br0', 2, face(kit.look(0, -2, 'o'), CLOSE, { kx: 1.05, ky: 1.03, rot: -0.04 }));
  k.add('br1', 2, face(FACE.ah, CLOSE, { kx: 1.11, ky: 1.07, rot: -0.09 }));
  k.add('br2', 6, face(FACE.ah, CLOSE, { kx: 1.16, ky: 1.1, rot: -0.12 }));

  // the shout: rings leave his mouth to the right
  const rings = (M, rs) => c => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 4.5;
    rs.filter(r => r >= 12 && r < 118).forEach(r => { c.globalAlpha = 1 - r / 260; c.beginPath(); c.arc(M[0], M[1], r, -0.7, 0.7); c.stroke(); });
    c.restore();
  };
  for (let n = 0; n < 13; n++) {
    const o = n < 7 ? { rot: n % 2 ? 0.12 : 0.1, kx: 1.06, ky: 0.97 } : { rot: n < 9 ? 0.05 : 0 };
    k.add('sh' + n, 2, face(n < 7 ? FACE.aah : kit.look(5, 0, n < 9 ? 'o' : 'smile'), CLOSE, o, { front: rings(kit.pt({ rot: 0.1 }, [134, 124]), [0, 2, 4].map(s => 12 + 12 * (n - s))) }));
  }

  // a long wait, eyes drifting
  const BLINK = [['stroke', [[110, 110], [122, 110]], 3], ['stroke', [[134, 108], [146, 108]], 3], ['stroke', [[122, 125], [134, 125]], 2.8]];
  [[6, 0, 'smile', 10], [6, 0, 'flat', 8], [3, -5, 'flat', 6], [-4, -5, 'flat', 6], [-6, 1, 'flat', 8], [0, 0, 'blink', 2], [6, 0, 'flat', 10], [6, 2, 'frown', 8]]
    .forEach(([dx, dy, m, ticks], i) => k.add('wait' + i, ticks, face(m === 'blink' ? BLINK : kit.look(dx, dy, m))));

  // the view eases back as the echo arrives from behind him, bigger
  const echo = (q, a = 1) => c => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 7; c.globalAlpha = a;
    [0, 1, 2].forEach(j => { c.beginPath(); c.arc(-160, 125, 143 + 14 * q - 24 * j, -0.42, 0.42); c.stroke(); });
    c.restore();
  };
  const hair = (len, axis) => (c, d) => {
    const [hx, hy] = d.curl[0];
    c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.beginPath();
    for (let n = 0; n < 7; n++) { const a = axis + (n / 6 - 0.5) * 2.2, L = len * (n % 2 ? 0.7 : 1); c.moveTo(hx + Math.cos(a) * 5, hy + Math.sin(a) * 5); c.lineTo(hx + Math.cos(a) * L, hy + Math.sin(a) * L); }
    c.stroke(); c.restore();
  };
  const V2 = cam(1.2, 128, 116);
  kit.steps(0, 1, 5).slice(1).forEach((t, q) => k.add('ease' + q, 2, face(kit.look(5, 1, 'frown'), cam(1.8 - 0.6 * t, 62 + 66 * t, 120 - 4 * t), {}, { back: echo(q) })));
  k.add('near0', 2, face(kit.look(0, 0, 'flat'), V2, {}, { back: echo(4) }));
  k.add('near1', 2, face(kit.faces.wide, V2, {}, { back: echo(5) }));
  k.add('near2', 2, face(kit.look(-5, 0, 'o', 5), V2, { kx: 0.97 }, { back: echo(6) }));
  k.add('hit', 2, face(FACE.shock, V2, { kx: 0.8, ky: 1.08, rot: 0.16, dx: 10 }, { back: echo(7.5), front: hair(24, -TAU / 4 + 0.16) }));

  // bowled over to the right as the view comes back to normal, ending flat on his side with his hair on end
  const under = dx => ({ shadow: [124 + dx, 56] });   // tipping swings his shadow round with him, so put it back under him
  const lie = (rot, kk, dx, o = {}) => kit.tip(rot, { k: kk, dx, dy: (1 - kk) * (Math.abs(Math.sin(rot)) * 60 + Math.abs(Math.cos(rot)) * 65), ...o });
  kit.steps(0, 1, 11).slice(1).forEach((t, r) => {
    const rot = 0.16 + (TAU + 1.57 - 0.16) * t;
    k.add('roll' + r, 2, xf(D.N, { ...lie(rot, 1 - 0.15 * t, 10 + 26 * t), face: r < 3 ? FACE.shock : FACE.spiral,
      extra: { ...under(10 + 26 * t), view: cam(1.2 - 0.2 * t, 128, 116 - 4 * t), back: r < 4 ? echo(9.5 + r * 2.2, 1 - (r + 1) * 0.2) : undefined, front: hair(26, rot - TAU / 4) } }));
  });
  const UPISH = -TAU / 4 - 0.35;
  k.add('skid', 2, xf(D.N, { ...lie(1.72, 0.85, 36), face: FACE.spiral, extra: { ...under(36), front: hair(26, UPISH + 0.5) } }));
  k.add('rock', 2, xf(D.N, { ...lie(1.5, 0.85, 32), face: FACE.spiral, extra: { ...under(32), front: hair(26, UPISH + 0.2) } }));
  k.add('flat', 14, xf(D.N, { ...lie(1.57, 0.85, 30), face: FACE.spiral, extra: { ...under(30), front: hair(26, UPISH) } }));

  // he goes to sleep where he fell
  [[0.86, 22, 0.88, 20], [0.72, 14, 0.92, 15], [0.6, 7, 0.96, 11], [0.52, 2, 1, 8]].forEach(([kx, dx, kk, len], i) =>
    k.add('melt' + i, 2, xf(D.N, { ...kit.tip(1.57, { k: kk, kx, dx, dy: 60 * (1 - kx * kk) }), face: kit.faces.closed, extra: { ...under(dx), front: hair(len, UPISH) } })));
  k.done();
  CLIPS.echo.seq.splice(-DOZE.length, DOZE.length, ['S1', 4]);
})();
