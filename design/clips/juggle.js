// Juggling: three balls, then a fourth, then it all comes down on his head.
// group: pastimes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', COLOURS = ['#FFD23F', '#5AB8FF', '#FF5A4D', '#7BE38B'];
  const focused = [['dot',117,103,3.8], ['dot',141,101,3.8], ['stroke',[[122,123],[128,124],[134,123]],2.8], ['stroke',[[108,94],[120,96]],2.4], ['stroke',[[136,94],[148,92]],2.4]];
  const strained = [['dot',117,103,4.2], ['dot',141,101,4.2], ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6], ['stroke',[[106,96],[120,92]],2.6], ['stroke',[[136,90],[150,94]],2.6]];
  const ball = (c, x, y, i) => { c.fillStyle = COLOURS[i % 4]; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(x, y, 7.5, 0, Math.PI * 2); c.fill(); c.stroke(); };
  const HANDS = { arm: [[92, 142], [72, 152]], arm2: [[164, 142], [184, 152]] };
  // n balls thrown hand to hand in arcs over his head; one throw takes `beat` ticks
  const cascade = (n, beat, start) => (c, d, seed, tick) => {
    const t = Math.floor((tick - start) / 2) * 2;                       // drawn on twos, like the rest of him
    for (let i = 0; i < n; i++) {
      const u = (t / beat + i * 2 / n) % 2, p = u % 1, toLeft = u < 1, h = 92 + (i % 2) * 10;
      ball(c, toLeft ? 180 - 104 * p : 76 + 104 * p, 148 - 4 * h * p * (1 - p), i);
    }
  };
  const falling = k => (c, d, seed) => {                                 // the moment it goes wrong
    [[84, 60], [128, 34], [170, 70], [206, 110]].forEach(([x, y], i) => ball(c, x + (i - 1.5) * k * 4, Math.min(193, y + k * (30 + i * 9)), i));
  };
  const onFloor = k => (c, d, seed) => { [[52, 0], [206, 1], [222, 2], [30, 3]].forEach(([x, i]) => ball(c, x + (x < 128 ? -k : k) * 5, 193, i)); };
  D.jug1 = xf(D.N, { face: focused, extra: { ...HANDS, front: cascade(3, 16, 29) } });
  D.jug2 = xf(D.N, { face: strained, extra: { ...HANDS, front: cascade(4, 12, 29) } });
  D.jug3 = xf(D.N, { face: FACE.shock, extra: { ...HANDS, front: falling(0) } });
  D.jug4 = xf(D.N, { face: FACE.shock, ky: 0.94, extra: { front: falling(1.6) } });
  D.jug5 = xf(D.N, { face: FACE.spiral, ky: 0.84, kx: 1.1, extra: { front: falling(4), fxm: 'alert', fx: [150, 84] } });
  D.jug6 = xf(D.N, { face: FACE.spiral, rot: -0.06, extra: { front: onFloor(0) } });
  D.jug7 = xf(D.N, { face: FACE.spiral, rot: 0.06, extra: { front: onFloor(2) } });
  D.jug8 = xf(D.N, { face: FACE.sheep, extra: { front: onFloor(4) } });
  CLIPS.juggle = { home: 'idle', seq: [...WAKE, ['jug1', 48], ['jug2', 36], ['jug3', 3], ['jug4', 3], ['jug5', 6], ['jug6', 5], ['jug7', 5], ['jug6', 5], ['jug7', 5], ['jug8', 12], ...DOZE] };
})();
