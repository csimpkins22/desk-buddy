// Sign spinner: he twirls an arrow sign faster and faster, then stops it dead, pointing straight out at you.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', HUB = [188, 100], START = 42;
  const keen = [['dot',116,108,4], ['dot',140,106,4], ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const busy = [...FACE.chooEyes, ['stroke',[[122,124],[134,123]],2.8]];
  const you = [['dot',118,110,4.6], ['dot',142,108,4.6], ['stroke',[[110,98],[122,96]],2.4], ['stroke',[[138,94],[150,95]],2.4], ['stroke',[[124,125],[136,124]],2.8]];
  const blink = [['stroke',[[113,110],[123,110]],2.8], ['stroke',[[137,108],[147,108]],2.8], ['stroke',[[124,125],[136,124]],2.8]];
  const sign = c => { c.lineJoin = c.lineCap = 'round'; c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 3; };
  const arrow = (c, a) => {
    c.save(); c.translate(...HUB); c.rotate(a); sign(c);
    c.beginPath(); c.moveTo(-42, -9); c.lineTo(8, -9); c.lineTo(8, -22); c.lineTo(42, 0); c.lineTo(8, 22); c.lineTo(8, 9); c.lineTo(-42, 9); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  // each drawing turns it further than the last (angles kept within one turn: the board's limit is about 8 radians)
  const spin = (c, d, seed, tick) => {
    const n = Math.max(0, Math.floor((tick - START) / 2)), a = (0.25 * n + 0.02 * n * n) % (Math.PI * 2);
    arrow(c, a);
    if (n < 12) return;
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2; c.lineCap = 'round'; c.globalAlpha = 0.6;
    for (let k = 0; k < 2; k++) { const from = (a + k * Math.PI + 4.4) % (Math.PI * 2); c.beginPath(); c.arc(...HUB, 47, from, from + 1); c.stroke(); }
    c.restore();
  };
  // seen end on: a big head coming out of the screen, the tail far behind it
  const atYou = k => c => {
    c.save(); c.translate(188, 112); c.scale(k, k); sign(c);
    c.beginPath(); c.moveTo(-6, -50); c.lineTo(6, -50); c.lineTo(15, 0); c.lineTo(44, 0); c.lineTo(0, 60); c.lineTo(-44, 0); c.lineTo(-15, 0); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = DARK; c.beginPath();                                 // "YOU"
    c.moveTo(-22, 7); c.lineTo(-16.5, 14); c.lineTo(-11, 7); c.moveTo(-16.5, 14); c.lineTo(-16.5, 22);
    c.moveTo(5.5, 14.5); c.ellipse(0, 14.5, 5.5, 7.5, 0, 0, Math.PI * 2);
    c.moveTo(11, 7); c.lineTo(11, 17); c.bezierCurveTo(11, 23.5, 22, 23.5, 22, 17); c.lineTo(22, 7);
    c.stroke(); c.restore();
  };
  const X = -34, ARM = { arm2: [[132, 140], [178, 108]] };
  D.sign_spinner_in = xf(D.N, { dx: X / 2 });
  D.sign_spinner_1 = xf(D.N, { dx: X, face: keen, extra: { ...ARM, front: c => arrow(c, 0) } });
  D.sign_spinner_2 = xf(D.N, { dx: X, face: keen, extra: { ...ARM, front: spin } });
  D.sign_spinner_3 = xf(D.N, { dx: X, face: busy, rot: -0.04, extra: { ...ARM, front: spin } });
  D.sign_spinner_4 = xf(D.N, { dx: X, face: busy, rot: 0.04, extra: { ...ARM, front: spin } });
  D.sign_spinner_5 = xf(D.N, { dx: X, face: FACE.shock, ky: 0.94, extra: { ...ARM, front: atYou(1.16) } });
  D.sign_spinner_6 = xf(D.N, { dx: X, face: you, ky: 1.03, extra: { ...ARM, front: atYou(0.95) } });
  D.sign_spinner_7 = xf(D.N, { dx: X, face: you, extra: { ...ARM, front: atYou(1) } });
  D.sign_spinner_8 = xf(D.N, { dx: X, face: blink, extra: { ...ARM, front: atYou(1) } });
  const rock = n => Array.from({ length: n }, (_, i) => ['sign_spinner_' + (3 + i % 2), 4]);
  CLIPS.sign_spinner = { home: 'idle', seq: [...WAKE, ['sign_spinner_in', 3], ['sign_spinner_1', 10], ['sign_spinner_2', 20], ...rock(7),
    ['sign_spinner_5', 2], ['sign_spinner_6', 2], ['sign_spinner_7', 14], ['sign_spinner_8', 3], ['sign_spinner_7', 10], ['sign_spinner_in', 3], ...DOZE] };
})();
