// Rate limited: he sits behind a "back in 5" sign tapping his watch, stares at you, taps some more, then holds the watch up.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, openPath } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2;
  const bored = [['stroke',[[109,107],[123,107]],2.6], ['dot',116,111,3], ['stroke',[[133,105],[147,105]],2.6], ['dot',140,109,3], ['stroke',[[122,125],[134,125]],2.6]];
  const checking = [['dot',118,114,3.6], ['dot',140,113,3.6], ['stroke',[[122,126],[128,125],[134,126]],2.6]];
  const pointed = [['stroke',[[108,101],[121,105]],3], ['stroke',[[136,103],[149,99]],3], ['dot',117,111,3.4], ['dot',142,109,3.4], ['stroke',[[121,126],[135,126]],3]];
  const clock = (c, x, y, r, w) => {                 // a clock face: ring and two hands
    c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = w; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = w * 0.8; c.beginPath(); c.moveTo(x, y - r * 0.6); c.lineTo(x, y); c.lineTo(x + r * 0.45, y + r * 0.2); c.stroke();
  };
  // rise: how far the sign has popped up. watch: [x, y, size] on his wrist. tap: marks where his other hand lands.
  const props = ({ rise = 1, watch, tap } = {}) => (c, d, seed) => {
    const y = 164 + (1 - rise) * 30;
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(82, y, 92, 37, 6); c.fill(); c.stroke();
    clock(c, 106, y + 18.5, 11, 2.6);
    c.strokeStyle = '#FFD23F'; c.lineWidth = 3.4;                                                             // "5", in strokes
    openPath(c, [[150, y + 8], [137, y + 8], [136, y + 17], [146, y + 16], [151, y + 22], [146, y + 29], [136, y + 28]]); c.stroke();
    if (watch) {
      const [x, wy, r] = watch;
      c.strokeStyle = CREAM; c.lineWidth = r * 0.9; c.beginPath(); c.moveTo(x, wy - r * 1.5); c.lineTo(x, wy + r * 1.5); c.stroke();      // the strap
      clock(c, x, wy, r, Math.max(2, r * 0.16));
    }
    if (tap) { c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); for (const [x0, y0, x1, y1] of [[122, 132, 118, 124], [130, 130, 130, 121], [138, 132, 142, 124]]) { c.moveTo(x0, y0); c.lineTo(x1, y1); } c.stroke(); }
    c.restore();
  };
  const sat = (face, o = {}, extra = {}) => xf(D.N, { ky: 0.93, kx: 1.04, face, ...o, extra });
  const WRIST = { arm2: [[168, 150], [136, 153]] }, WATCH = [144, 152, 9];
  D.rate_limited_up = sat(bored, {}, { front: props({ rise: 0.4 }) });
  D.rate_limited_sit = sat(bored, {}, { front: props() });
  D.rate_limited_wrist = sat(checking, {}, { ...WRIST, front: props({ watch: WATCH }) });
  D.rate_limited_tap0 = sat(checking, {}, { ...WRIST, arm: [[90, 150], [114, 136]], front: props({ watch: WATCH }) });
  D.rate_limited_tap1 = sat(checking, { ky: 0.92 }, { ...WRIST, arm: [[90, 150], [124, 149]], front: props({ watch: WATCH, tap: true }) });
  D.rate_limited_stare = sat(bored, {}, { ...WRIST, arm: [[90, 150], [114, 136]], front: props({ watch: WATCH }) });
  D.rate_limited_show0 = sat(pointed, { rot: 0.03 }, { arm2: [[168, 146], [190, 124]], front: props({ watch: [200, 108, 21] }), fxm: 'alert', fx: [92, 60] });
  D.rate_limited_show1 = sat(pointed, { rot: 0.05 }, { arm2: [[168, 146], [192, 122]], front: props({ watch: [203, 105, 21] }), fxm: 'alert', fx: [92, 60] });
  const s = (id, n) => ['rate_limited_' + id, n], taps = (n, t) => Array.from({ length: n * 2 }, (_, i) => s(i % 2 ? 'tap1' : 'tap0', t));
  CLIPS.rate_limited = { home: 'idle', seq: [...WAKE, s('up', 2), s('sit', 10), s('wrist', 6), ...taps(4, 3), s('stare', 12), ...taps(4, 2),
    s('show0', 4), s('show1', 4), s('show0', 4), s('show1', 4), s('show0', 6), s('up', 2), ...DOZE] };
})();
