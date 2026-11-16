// Calendar avalanche: one calendar page drops beside him, then two more, then the whole week buries him to the eyes. The last lands on his head.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', RED = '#FF5A4D';
  const eyes = (dx, dy, r = 3.8) => [['dot',116 + dx,110 + dy,r], ['dot',140 + dx,108 + dy,r]];
  const worried = [...eyes(0, -2, 4.4), ['mouth',[[123,121],[133,120],[134,129],[128,132],[122,129]]]];
  const fedUp = [['stroke',[[109,109],[123,109]],3], ['stroke',[[133,107],[147,107]],3], ['dot',116,114,3.2], ['dot',140,112,3.2]];
  // where each page comes to rest, its tilt, and the tick it lands on (counted from when he's awake)
  const PAGES = [[204, 181, 0.1, 6], [20, 181, -0.12, 20], [236, 183, -0.2, 26],
    [56, 181, 0.12, 36], [92, 183, 0.2, 38], [164, 183, -0.1, 40], [128, 185, 0.05, 43], [36, 143, -0.1, 46], [220, 143, 0.2, 48],
    [109, 148, -0.18, 51], [149, 147, 0.14, 54], [52, 106, 0.25, 57], [205, 105, -0.15, 60], [128, 59, 0.16, 72]];
  const DIGITS = [[[-4, 3], [1, -1], [1, 13]], [[-5, 0], [5, 0], [-1, 13]], [[2, 13], [2, -1], [-6, 8], [6, 8]]];
  const page = (c, x, y, rot, i) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = CREAM; c.beginPath(); c.roundRect(-20, -20, 40, 40, 5); c.fill();
    c.fillStyle = RED; c.beginPath(); c.roundRect(-20, -20, 40, 13, 5); c.fill();
    c.strokeStyle = DARK; c.lineWidth = 2.2; c.beginPath(); c.roundRect(-20, -20, 40, 40, 5); c.stroke();
    c.lineWidth = 3.4; c.beginPath(); DIGITS[i % 3].forEach(([px, py], k) => k ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke();
    c.restore();
  };
  const pile = (c, d, seed, tick) => {
    const t = Math.floor((tick - 29) / 2) * 2;
    PAGES.forEach(([x, y, rot, lands], i) => { const up = Math.max(0, lands - t); if (y - up * 16 > -30) page(c, x, y - up * 16, rot + up * 0.12, i); });
  };
  const F = { front: pile };
  D.calendar_avalanche_1 = xf(D.N, { face: FACE.lookr, extra: F });
  D.calendar_avalanche_2 = xf(D.N, { face: [...eyes(-7, 1), ['stroke',[[116,124],[121,126],[126,124]],2.6]], extra: F });
  D.calendar_avalanche_3 = xf(D.N, { face: FACE.lookup, extra: F });
  D.calendar_avalanche_4 = xf(D.N, { face: worried, ky: 0.97, extra: F });
  D.calendar_avalanche_5 = xf(D.N, { face: eyes(-5, 0, 4.2), extra: F });
  D.calendar_avalanche_6 = xf(D.N, { face: eyes(5, 0, 4.2), extra: F });
  D.calendar_avalanche_7 = xf(D.N, { face: eyes(2, -6, 4.2), extra: F });
  D.calendar_avalanche_8 = xf(D.N, { face: fedUp, ky: 0.93, kx: 1.03, extra: F });
  const n = i => 'calendar_avalanche_' + i;
  CLIPS.calendar_avalanche = { home: 'idle', seq: [...WAKE, [n(3), 6], [n(1), 12], [n(2), 8], [n(1), 8], [n(3), 10], [n(4), 16], [n(5), 4], [n(6), 4], [n(5), 4], [n(7), 6],
    [n(8), 24], ...DOZE] };
})();
