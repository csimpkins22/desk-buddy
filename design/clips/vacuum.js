// Vacuum: he hoovers the floor, takes a look at the business end, and is pulled in. The bag swells with him inside until it pops.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', GREY = '#9FB0C4', DARK = '#17161A', DX = -30;
  const busy = [['dot',121,113,3.6], ['dot',145,111,3.6], ['stroke',[[124,125],[130,127],[136,125]],2.6]];
  // head at (nx, ny) turned by ha, pole up to (px, py), a bag on the pole. inside: 0 nobody, 1 his eyes, 2 blinking, 3 straining
  const vac = (nx, ny, px, py, bag, ha = 0, inside = 0) => (c, d, seed) => {
    const a = Math.atan2(py - ny, px - nx);
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(nx, ny); c.lineTo(px, py); c.strokeStyle = CREAM; c.lineWidth = 9; c.stroke(); c.strokeStyle = GREY; c.lineWidth = 5; c.stroke();
    c.save(); c.translate(nx, ny); c.rotate(ha); c.fillStyle = GREY; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.roundRect(-21, -7, 42, 14, 5); c.fill(); c.stroke(); c.restore();
    c.translate(nx + (px - nx) * 0.52, ny + (py - ny) * 0.52); c.strokeStyle = CREAM;
    if (inside) { c.lineWidth = 3.4; openPath(c, boil([[-14, -bag + 4], [-20, -bag - 8], [-16, -bag - 16], [-8, -bag - 13], [-11, -bag - 7]], seed, 1.2)); c.stroke(); }
    c.save(); c.rotate(a + Math.PI / 2); c.fillStyle = '#FF5A4D'; c.lineWidth = 2.6; c.beginPath(); c.ellipse(0, 0, bag * (inside ? 0.9 : 0.62), bag, 0, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore();
    c.fillStyle = c.strokeStyle = DARK; c.lineWidth = 3;
    if (inside === 1) { c.beginPath(); c.arc(-10, -6, 4, 0, Math.PI * 2); c.arc(10, -7, 4, 0, Math.PI * 2); c.fill(); }
    if (inside === 2) { c.beginPath(); c.moveTo(-15, -6); c.lineTo(-5, -6); c.moveTo(5, -7); c.lineTo(15, -7); c.stroke(); }
    if (inside === 3) { c.beginPath(); c.moveTo(-16, -11); c.lineTo(-8, -6); c.lineTo(-16, -1); c.moveTo(16, -12); c.lineTo(8, -7); c.lineTo(16, -2); c.stroke(); }
    if (inside) { c.lineWidth = 2.6; c.beginPath(); c.moveTo(-6, 9); c.lineTo(-2, 7); c.lineTo(2, 9); c.lineTo(6, 7); c.stroke(); }
    c.restore();
  };
  const dust = n => (c, d, seed) => { c.save(); c.fillStyle = CREAM; c.globalAlpha = 0.8; [[178, 199], [232, 194], [226, 199]].slice(0, n).forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 2, 0, Math.PI * 2); c.fill(); }); c.restore(); };
  const whoosh = (x, y) => (c, d, seed) => {             // air rushing into the head
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineCap = 'round'; c.globalAlpha = 0.8;
    [-1, 0, 1].forEach(k => { openPath(c, boil([[x - 34, y + k * 20], [x - 8, y + k * 6]], seed + k, 1)); c.stroke(); });
    c.restore();
  };
  const burst = (x, y) => (c, d, seed) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.2, r = 74 + (i % 2) * 8; c.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.lineTo(x + Math.cos(a) * (r + 16), y + Math.sin(a) * (r + 16)); }
    c.stroke(); c.restore();
  };
  const both = (...f) => (c, d, seed, tick) => f.forEach(g => g(c, d, seed, tick));
  const pushA = n => ({ arm2: [[136, 140], [157, 130]], front: both(dust(n), vac(192, 196, 161, 127, 21)) });
  const pushB = n => ({ arm2: [[136, 142], [165, 137]], front: both(dust(n), vac(214, 196, 170, 135, 21)) });
  D.vacuum_1 = xf(D.N, { dx: DX, face: busy, extra: pushA(3) });
  D.vacuum_2 = xf(D.N, { dx: DX, face: busy, rot: 0.04, extra: pushB(3) });
  D.vacuum_3 = xf(D.N, { dx: DX, face: busy, extra: pushA(2) });
  D.vacuum_4 = xf(D.N, { dx: DX, face: busy, rot: 0.04, extra: pushB(1) });
  const lifted = vac(168, 108, 224, 168, 21, Math.PI / 2), MOUTH = [158, 108];
  D.vacuum_5 = xf(D.N, { dx: DX, face: FACE.lookr, extra: { arm2: [[136, 140], [176, 124]], front: lifted } });
  D.vacuum_6 = xf(D.N, { dx: DX, face: FACE.shock, rot: 0.1, extra: { arm2: [[138, 138], [176, 124]], front: both(lifted, whoosh(...MOUTH)), fxm: 'alert', fx: [112, 62] } });
  // shrinking into the head: scaled about its mouth
  [0.62, 0.32, 0.1].forEach((k, i) => { D['vacuum_' + (7 + i)] = xf(D.N, { ox: MOUTH[0] - DX, oy: MOUTH[1], dx: DX, k, rot: 0.15 + i * 0.25, face: FACE.shock, extra: { front: both(lifted, whoosh(...MOUTH)) } }); });
  const full = (bag, inside) => xf(D.N, { k: 0.02, dx: 20, dy: -68, extra: { front: vac(150, 196, 146, 66, bag, 0, inside) } });
  D.vacuum_10 = full(22, 2);
  D.vacuum_11 = full(34, 1);
  D.vacuum_12 = full(44, 1);
  D.vacuum_13 = full(44, 2);
  D.vacuum_14 = full(50, 3);
  const flat = vac(212, 196, 146, 191, 10);
  D.vacuum_15 = xf(D.N, { dx: -16, k: 1.06, face: FACE.shock, extra: { front: both(flat, burst(114, 134)) } });
  D.vacuum_16 = xf(D.N, { dx: -16, ky: 0.84, kx: 1.1, face: FACE.spiral, extra: { front: flat } });
  D.vacuum_17 = xf(D.N, { dx: -12, rot: -0.05, face: FACE.spiral, extra: { front: flat } });
  D.vacuum_18 = xf(D.N, { dx: -8, rot: 0.05, face: FACE.spiral, extra: { front: flat } });
  CLIPS.vacuum = { home: 'idle', seq: [...WAKE, ['vacuum_1', 4], ['vacuum_2', 4], ['vacuum_1', 4], ['vacuum_2', 4], ['vacuum_3', 4], ['vacuum_4', 4], ['vacuum_5', 9], ['vacuum_6', 3],
    ['vacuum_7', 2], ['vacuum_8', 2], ['vacuum_9', 2], ['vacuum_10', 3], ['vacuum_11', 3], ['vacuum_12', 8], ['vacuum_13', 2], ['vacuum_12', 5], ['vacuum_14', 5],
    ['vacuum_15', 3], ['vacuum_16', 5], ['vacuum_17', 5], ['vacuum_18', 5], ...DOZE] };
})();
