// Big diff: sheets of paper land on him faster and faster until only his cowlick shows. It waves, droops, and he bursts out.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', SHIFT = [0, 6, -5, 3, -7, 5, -2, 7, -6, 2, -4, 6, -3, 4];
  const worried = [['dot',117,106,4.2], ['dot',141,104,4.2], ['stroke',[[108,96],[120,93]],2.4], ['stroke',[[136,91],[148,93]],2.4], ['mouth',[[124,120],[132,120],[133,126],[128,129],[123,126]]]];
  const sheet = (c, x, y, turn, i) => {              // one sheet edge-on, with a green or red line of changes on it
    c.save(); c.translate(x, y); c.rotate(turn);
    c.fillStyle = CREAM; c.strokeStyle = '#17161A'; c.lineWidth = 1.6; c.beginPath(); c.rect(-66, -5, 132, 10); c.fill(); c.stroke();
    c.fillStyle = i % 3 ? '#58D68D' : '#FF5A4D'; c.fillRect(-56 + (i * 29) % 60, -2, 22 + (i * 13) % 20, 4);
    c.restore();
  };
  const pile = (n, more) => (c, d, seed) => {        // n sheets stacked from the floor, and the next two on their way down
    for (let i = 0; i < n; i++) sheet(c, 128 + SHIFT[i], 196 - i * 10, 0, i);
    if (!more) return;
    sheet(c, 128 + SHIFT[n], 158 - n * 10, n % 2 ? 0.18 : -0.18, n);
    sheet(c, 128 + SHIFT[n + 1], 16, n % 2 ? -0.22 : 0.22, n + 1);
  };
  const burst = r => (c, d, seed) => {
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.3; sheet(c, 128 + Math.cos(a) * r, 136 + Math.sin(a) * r * 0.8, (a * 1.3 + r / 40) % Math.PI, i); }
  };
  const TOP = 13, piling = [];
  for (let n = 0; n <= TOP; n++) {
    D['big_diff_' + n] = xf(D.N, { face: n < 3 ? FACE.lookup : n < 6 ? worried : FACE.shock, ky: 1 - n * 0.003, extra: { front: pile(n, n < TOP) } });
    piling.push(['big_diff_' + n, n === TOP ? 8 : [7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2][n]]);
  }
  D.big_diff_wave0 = xf(D.N, { rot: 0.06, extra: { front: pile(TOP) } });
  D.big_diff_wave1 = xf(D.N, { rot: -0.06, extra: { front: pile(TOP) } });
  D.big_diff_droop = xf(D.N, { extra: { curl: [[128, 71], [123, 62], [115, 59], [109, 64], [110, 70]], front: pile(TOP) } });
  D.big_diff_out0 = xf(D.N, { face: FACE.choo, ky: 1.06, kx: 0.96, extra: { front: burst(56) } });
  D.big_diff_out1 = xf(D.N, { face: FACE.choo, ky: 1.03, extra: { front: burst(104) } });
  D.big_diff_out2 = xf(D.N, { face: FACE.puff, extra: { front: burst(150) } });
  D.big_diff_phew = xf(D.N, { face: FACE.puff, ky: 0.97 });
  const s = (id, n) => ['big_diff_' + id, n];
  CLIPS.big_diff = { home: 'idle', seq: [...WAKE, ...piling, s('wave0', 3), s('wave1', 3), s('wave0', 3), s('wave1', 3), s('droop', 14),
    s('out0', 2), s('out1', 2), s('out2', 2), s('phew', 6), ...DOZE] };
})();
