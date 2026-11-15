// Rubber duck: he explains something to a rubber duck at great length. The duck nods off and face-plants.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', DX = -26;
  const eyes = [['dot',124,110,3.8], ['dot',148,108,3.8]];
  const shut = [...eyes, ['stroke',[[127,124],[132,126],[137,124]],2.6]];
  const open = [...eyes, ['mouth',[[124,119],[138,118],[139,128],[131,132],[123,128]]]];
  const oops = [...eyes, ['stroke',[[124,125],[128,123],[132,125],[136,123]],2.6], ['stroke',[[116,99],[128,96]],2.4]];
  // sleep: 0 awake, 1 nodding with a z, 2 two z's, 3 flat on its beak
  const duck = sleep => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.2;
    if (sleep === 1 || sleep === 2) for (let i = 0; i < sleep; i++) {
      const x = 196 + i * 13, y = 142 - i * 15, s = 7 + i * 3;
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + s, y); c.lineTo(x, y + s); c.lineTo(x + s, y + s); c.stroke();
    }
    c.translate(208, sleep === 3 ? 189 : 199); c.rotate([0, -0.18, -0.26, -1][sleep]);
    c.lineWidth = 2.4; c.fillStyle = '#FFD23F';
    c.beginPath(); c.moveTo(14, -22); c.lineTo(25, -27); c.lineTo(21, -12); c.fill(); c.stroke();      // tail
    c.beginPath(); c.ellipse(2, -13, 20, 13, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.arc(-9, -33, 11, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = '#FF8A3D'; c.beginPath(); c.ellipse(-22, -30, 7, 3.6, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = c.strokeStyle = '#17161A';
    if (sleep) { c.beginPath(); c.moveTo(-15, -35); c.lineTo(-8, -35); c.stroke(); }
    else { c.beginPath(); c.arc(-12, -36, 2.2, 0, Math.PI * 2); c.fill(); }
    c.restore();
  };
  // what he's saying: a bubble that keeps filling up with lines
  const bubble = n => (c, d, seed) => {
    const x = 138, y = 10, w = 94, h = 14 + n * 9;
    c.save(); c.lineJoin = c.lineCap = 'round'; c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.roundRect(x, y, w, h, 8); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x + 10, y + h - 1.5); c.lineTo(x - 4, y + h + 13); c.lineTo(x + 24, y + h - 1.5); c.fill(); c.stroke();
    c.lineWidth = 2; c.globalAlpha = 0.8;
    for (let i = 0; i < n; i++) {
      const end = x + w - 10 - (i === n - 1 ? 30 : (i * 17) % 14), ly = y + 12 + i * 9;
      openPath(c, boil([[x + 10, ly], [x + 30, ly - 1.5], [x + 50, ly + 1.5], [end, ly]], seed + i, 1.2)); c.stroke();
    }
    c.restore();
  };
  const both = (...f) => (c, d, seed, tick) => f.forEach(g => g(c, d, seed, tick));
  const UP = { arm2: [[166 + DX, 140], [196 + DX, 114]] }, DOWN = { arm2: [[166 + DX, 142], [198 + DX, 136]] };
  const seq = [['rubber_duck_0', 8]];
  D.rubber_duck_0 = xf(D.N, { dx: DX, face: shut, extra: { front: duck(0) } });
  for (let n = 1; n <= 8; n++) {
    const z = n < 4 ? 0 : n < 6 ? 1 : 2;
    D['rubber_duck_a' + n] = xf(D.N, { dx: DX, face: open, rot: 0.03, extra: { ...UP, front: both(duck(z), bubble(n)) } });
    D['rubber_duck_b' + n] = xf(D.N, { dx: DX, face: shut, extra: { ...DOWN, front: both(duck(z), bubble(n)) } });
    seq.push(['rubber_duck_a' + n, 4], ['rubber_duck_b' + n, 3]);
  }
  D.rubber_duck_9 = xf(D.N, { dx: DX, face: open, extra: { ...UP, front: both(duck(3), bubble(8)) } });
  D.rubber_duck_10 = xf(D.N, { dx: DX, face: oops, extra: { front: duck(3) } });
  D.rubber_duck_11 = xf(D.N, { dx: DX / 2, face: oops, extra: { front: duck(3) } });
  CLIPS.rubber_duck = { home: 'idle', seq: [...WAKE, ...seq, ['rubber_duck_9', 5], ['rubber_duck_10', 12], ['rubber_duck_11', 3], ...DOZE] };
})();
