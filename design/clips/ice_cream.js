// A hot sun comes out top left and he melts like a scoop: drips run down him in close-up, he sags into a puddle, then a cloud covers the sun and he firms up lopsided.
(() => {
  const { D, xf, FACE, mixHex, tint, kit } = window.__lump, { TAU } = kit;
  const k = kit.clip('ice_cream');
  const SUN = [58, 48], F = [124, 100];

  const sun = (c, x, y, seed, rays = true) => {
    c.save(); c.lineCap = 'round';
    if (rays) {
      c.strokeStyle = kit.YELLOW; c.lineWidth = 4; c.beginPath();
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + (seed % 2) * 0.39; c.moveTo(x + Math.cos(a) * 27, y + Math.sin(a) * 27); c.lineTo(x + Math.cos(a) * 36, y + Math.sin(a) * 36); }
      c.stroke();
    }
    c.fillStyle = kit.YELLOW; c.strokeStyle = kit.CREAM; c.lineWidth = 2.8; c.beginPath(); c.arc(x, y, 20, 0, TAU); c.fill(); c.stroke(); c.restore();
  };
  const cloud = (c, x, y) => {
    c.save(); c.beginPath();
    [[-30, 6, 18], [-6, -8, 24], [24, 0, 20], [40, 10, 13], [4, 12, 22]].forEach(([dx, dy, r]) => { c.moveTo(x + dx + r, y + dy); c.arc(x + dx, y + dy, r, 0, TAU); });
    c.strokeStyle = kit.CREAM; c.lineWidth = 5.6; c.stroke(); c.fillStyle = '#DCE6F2'; c.fill(); c.restore();
  };
  // a drip of him running from a to b, with a bead at its end
  const drip = (c, a, b, w = 6) => {
    const pale = mixHex(tint(), '#FFFFFF', 0.45);
    c.save(); c.lineCap = 'round';
    [[kit.CREAM, 2.5], [pale, 0]].forEach(([col, grow]) => {
      c.strokeStyle = c.fillStyle = col; c.lineWidth = w * 2 + grow * 2; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
      c.beginPath(); c.arc(b[0], b[1], w + 3 + grow, 0, TAU); c.fill();
    });
    c.restore();
  };
  // three drips starting on the top of his head; p is how far they have run, o is how he has been reshaped
  const DRIPS = [[100, 82, 66], [129, 73, 16], [156, 84, 54]];
  const drips = (c, o, p) => { if (p > 0) DRIPS.forEach(([x, y, len], i) => drip(c, kit.pt(o, [x, y]), kit.pt(o, [x, y + 4 + len * p * (i === 1 ? 1 : 0.6 + 0.4 * p)]))); };
  const puddle = (c, s) => {
    if (s <= 0) return;
    c.save(); c.fillStyle = mixHex(tint(), '#FFFFFF', 0.45); c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.ellipse(128, 200, 100 * s, 5 + 8 * s, 0, 0, TAU); c.fill(); c.stroke(); c.restore();
  };
  const melted = [['dot', 110, 98, 4.2], ['dot', 146, 96, 4.2], ['stroke', [[102, 86], [116, 82]], 2.6], ['stroke', [[140, 80], [154, 84]], 2.6], ['stroke', [[118, 132], [128, 125], [138, 132]], 2.8]];
  const sag = s => ({ ky: 1 - 0.55 * s, kx: 1 + 0.5 * s });

  [[-30, -30], [26, 20], SUN].forEach(([x, y], i) => k.add('sun' + i, 2, xf(D.N, { face: kit.look(-5, -4, 'o'), extra: { back: (c, d, seed) => sun(c, x, y, seed) } })));
  k.add('hot', 4, xf(D.N, { face: kit.faces.worried, extra: { back: (c, d, seed) => sun(c, ...SUN, seed), front: c => drips(c, {}, 0.08) } }));
  k.add('in', 2, xf(D.N, { face: kit.faces.worried, extra: { view: kit.zoom(1.5, F), back: (c, d, seed) => sun(c, ...SUN, seed), front: c => drips(c, {}, 0.15) } }));
  [0.3, 0.5, 0.75, 1].forEach((p, i) => k.add('drip' + i, 4, xf(D.N, { face: kit.look(i % 2 ? 2 : -2, -4, 'wobble'), extra: { view: kit.view(2, F), front: c => drips(c, {}, p) } })));

  kit.steps(2, 1, 6).forEach((z, i) => {
    const s = kit.steps(0, 1, 6)[i], o = sag(s);
    k.add('sag' + i, 2, xf(D.N, { ...o, face: s > 0.3 ? melted : kit.look(0, -4, 'wobble'),
      extra: { view: kit.zoom(z, F), back: (c, d, seed) => { if (z < 1.9) sun(c, ...SUN, seed); puddle(c, s); }, front: c => drips(c, o, 1) } }));
  });
  k.add('sag5', 12);
  kit.steps(-50, 60, 4).forEach((x, i) => k.add('cloud' + i, 2, xf(D.N, { ...sag(1), face: melted,
    extra: { back: (c, d, seed) => { sun(c, ...SUN, seed, i < 3); cloud(c, x, 48); puddle(c, 1); }, front: c => drips(c, sag(1), 1) } })));

  [[0.62, 1.35, 0, 0.7, 0.6], [0.85, 1.15, 0.03, 0.4, 0.3], [1.07, 0.96, 0.07, 0.15, 0], [0.94, 1.06, 0.13, 0, 0]].forEach(([ky, kx, rot, pud, p], i) =>
    k.add('firm' + i, 2, xf(D.N, { ky, kx, rot, face: i < 2 ? melted : kit.faces.wide, extra: { back: c => { cloud(c, 60, 48); puddle(c, pud); }, front: c => drips(c, { ky, kx, rot }, p) } })));
  const lop = { ky: 0.94, kx: 1.06, rot: 0.13, face: FACE.sheep };
  k.add('lop', 6, xf(D.N, { ...lop, extra: { back: c => cloud(c, 60, 48) } }));
  [[30, 22], [-10, -10], [-60, -40]].forEach(([x, y], i) => k.add('clear' + i, 2, xf(D.N, { ...lop, extra: { back: c => cloud(c, x, y) } })));
  k.done();
})();
