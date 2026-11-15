// Popcorn: he watches one kernel in a pan; it pops, then dozens do, burying him up to the eyes.
(() => {
  const { D, xf, FACE, boil, closedPath, kit } = window.__lump, k = kit.clip('popcorn');
  const { CREAM, YELLOW, GREY, WHITE, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const pose = t => ({ k: 1 - 0.1 * t, dx: -30 * t }), O = pose(1);
  const DOWN = [['dot', 122, 114, 3.8], ['dot', 146, 112, 3.8], ['stroke', [[124, 125], [129, 126], [134, 125]], 2.6]];
  const pan = (c, x) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = GREY;
    c.beginPath(); c.roundRect(x + 20, 187, 26, 6, 3); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(x - 24, 184, 48, 17, 5); c.fill(); c.stroke(); c.restore();
  };
  const kernel = (c, x, y) => { c.save(); c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 6, 0, TAU); c.fill(); c.stroke(); c.restore(); };
  const BUMPS = [[60, 188], [96, 180], [136, 190], [172, 184], [78, 162], [118, 158], [156, 166], [100, 140], [140, 144]];
  const mound = (c, top, seed, j) => {
    for (let i = 0; i < 5; i++) kit.puff(c, 30 + (j * 53 + i * 71) % 180, top - 14 - (j * 37 + i * 29) % 50, seed + i, 8, WHITE);
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    const pts = [[22, 201], [34, top + 34], [66, top + 8], [104, top], [150, top + 5], [190, top + 12], [212, top + 38], [220, 201]].map(([x, y]) => [x, Math.min(201, y)]);
    closedPath(c, boil(pts, seed, 1.5)); c.fill(); c.stroke();
    c.strokeStyle = GREY; c.fillStyle = YELLOW;
    BUMPS.filter(([, y]) => y > top + 22).forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 9, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); c.beginPath(); c.arc(x + 12, y + 3, 3, 0, TAU); c.fill(); });
    c.restore();
  };
  const L = (face, o, s) => xf(D.N, { ...o, face, extra: { front: (c, d, seed) => {
    pan(c, s.pan ?? 180);
    if (s.k) kernel(c, s.k[0], s.k[1]);
    if (s.p) kit.puff(c, s.p[0], s.p[1], seed, s.p[2], WHITE);
    if (s.top !== undefined && s.top < 197) mound(c, s.top, seed, s.j || 0);
  } } });

  tw(0, 1, 3).forEach((t, i) => k.add('go' + i, 2, L(FACE.lookr, pose(t), { pan: 260 - 80 * t, k: [260 - 80 * t, 178] })));
  k.add('watch', 10, L(DOWN, O, { k: [180, 178] }));
  D.popcorn_ja = L(DOWN, O, { k: [177, 177] }); D.popcorn_jb = L(DOWN, O, { k: [183, 176] });
  for (let i = 0; i < 2; i++) { k.add('ja', 2); k.add('jb', 2); }
  [[180, 152, 6], [178, 128, 9], [180, 172, 9]].forEach((p, i) => k.add('pop' + i, 2, L(i ? FACE.happy : FACE.shock, O, { p })));
  k.add('one', 8, L(FACE.happy, O, { p: [180, 172, 9] }));
  tw(201, 128, 5).forEach((top, j) => k.add('burst' + j, 2, L(FACE.shock, O, { p: [180, 172, 9], top, j: j + 1 })));
  k.add('buried', 10, L(FACE.shock, O, { top: 128, j: 7 }));
  k.add('peek', 6, L(FACE.lookr, O, { top: 128, j: 8 }));
  tw(0, 1, 3).forEach((t, i) => k.add('sink' + i, 2, L(FACE.grump, pose(1 - t), { pan: 180 + 80 * t, top: 128 + 80 * t, j: 9 + i })));
  k.done();
})();
