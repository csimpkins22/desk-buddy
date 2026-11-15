// A bar the width of the screen comes down in steps; he waddles under it lower and flatter each pass, until it pins him flat and lifts away without him.
(() => {
  const { D, xf } = window.__lump, kit = window.__lump.kit, { CREAM, YELLOW, RED } = kit;
  const k = kit.clip('limbo');
  const bar = y => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    [34, 206].forEach(x => { c.beginPath(); c.moveTo(x, -6); c.lineTo(x + (seed % 2 ? 1 : -1), y - 6); c.stroke(); });
    c.fillStyle = YELLOW; c.lineWidth = 2.8; c.beginPath(); c.rect(-8, y - 6, 256, 12); c.fill(); c.stroke();
    c.fillStyle = RED; for (let x = 4; x < 240; x += 44) c.fillRect(x, y - 4.5, 20, 9);
    c.restore();
  };
  const lin = (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1));
  // a face for a squashed Lump: eyes high and mouth low, so they stay apart
  const SM = ['stroke', [[118, 144], [128, 149], [138, 144]], 3], FL = ['stroke', [[119, 147], [137, 147]], 3], WB = ['stroke', [[116, 148], [122, 144], [128, 148], [134, 144], [140, 148]], 3];
  const low = (mouth, ex = 0, ey = 0) => [['dot', 110 + ex, 102 + ey, 4.4], ['dot', 146 + ex, 100 + ey, 4.4], mouth];
  const wideLow = [['oval', 110, 100, 5.5, 6.5], ['oval', 146, 98, 5.5, 6.5], WB];
  const pass = (name, xs, ky, kx, lean, y, face, ticks = () => 2) => xs.forEach((dx, i) =>
    k.add(name + i, ticks(i), xf(D.N, { dx, kx, ky: ky * (i % 2 ? 0.95 : 1.04), rot: lean + (i % 2 ? 0.03 : -0.03), face, extra: { front: bar(y) } })));
  const lower = (name, from, to) => kit.steps(from, to, 4).slice(1).forEach((y, i) => k.add(name + i, i === 2 ? 6 : 2, kit.gone({ front: bar(y) })));

  [8, 30, 46].forEach((y, i) => k.add('in' + i, i === 2 ? 6 : 2, xf(D.N, { face: kit.look(0, -5, 'o'), ky: i === 2 ? 0.97 : 1, extra: { front: bar(y) } })));
  kit.walk(0, -56, 4, { face: kit.look(-4, 0) }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, { ...o, extra: { front: bar(46) } })));
  kit.steps(46, 90, 4).slice(1).forEach((y, i) => k.add('duck' + i, i === 2 ? 6 : 2, xf(D.N, { dx: -56, ky: 1 - 0.34 * (i + 1) / 3, kx: 1 + 0.15 * (i + 1) / 3, face: kit.look(4, -4, 'flat'), extra: { front: bar(y) } })));
  pass('p1_', lin(-56, 190, 10), 0.66, 1.15, -0.1, 90, kit.look(4, -3, 'smile'));
  lower('dn1_', 90, 122);
  pass('p2_', lin(215, -215, 14), 0.46, 1.3, 0.05, 122, low(FL, -4));
  lower('dn2_', 122, 144);
  pass('p3_', [...lin(-222, -40, 6), -24, -12, -4], 0.32, 1.42, 0, 144, low(WB, 4), i => i < 6 ? 2 : 4);

  const pinned = (dx, y, face, sweat) => xf(D.N, { dx, ky: 0.26, kx: 1.4, face, extra: { front: (c, d, seed) => { bar(y)(c, d, seed); if (sweat) { kit.sweat(c, 214, 176, seed, 1); kit.sweat(c, 42, 176, seed, -1); } } } });
  k.add('pin', 2, pinned(0, 156, wideLow));
  for (let n = 0; n < 2; n++) { k.add('w0', 2, pinned(-5, 156, wideLow, true)); k.add('w1', 2, pinned(5, 156, wideLow, true)); }
  k.add('pin', 8);
  lin(156, -14, 6).slice(1).forEach((y, i) => k.add('up' + i, 2, pinned(0, y, low(FL, 0, -3))));
  k.add('flat', 14, xf(D.N, { ky: 0.26, kx: 1.4, face: low(FL) }));
  k.add('z0', 4, xf(D.S1, { ky: 0.5, kx: 1.14 }));
  k.add('z1', 4, xf(D.S1, { ky: 0.76, kx: 1.06, extra: { fxm: 'idle' } }));
  k.done({ doze: false });
})();
