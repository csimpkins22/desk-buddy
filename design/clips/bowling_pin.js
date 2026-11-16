// Bowling pin: the tap sends a ball down the lane and he goes over like a pin. A little arm sets him upright. Then the next ball shows up.
// group: tap
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', GREY = '#9FB0C4';
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[116,124],[121,126],[126,124]],2.6]];
  const nervous = [['dot',109,109,4.2], ['dot',133,107,4.2], ['stroke',[[112,125],[116,122],[121,125],[126,122],[130,125]],2.6]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  const ball = (x, spin = x / 22) => c => {
    c.save(); c.translate(x, 180); c.rotate(spin); c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.arc(0, 0, 22, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = CREAM; [[-6, -9], [5, -10], [0, -1]].forEach(([hx, hy]) => { c.beginPath(); c.arc(hx, hy, 3, 0, Math.PI * 2); c.fill(); });
    c.restore();
  };
  // the pinsetter: an arm from above with a claw at (x, y)
  const setter = (x, y, open) => c => {
    const rod = () => { c.beginPath(); c.moveTo(x, -10); c.lineTo(x, y - 22); c.stroke(); }, w = open ? 21 : 11;
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 10; rod(); c.strokeStyle = GREY; c.lineWidth = 5; rod();
    c.strokeStyle = CREAM; c.lineWidth = 4; c.beginPath(); c.moveTo(x - w, y + 3); c.quadraticCurveTo(x - w - 5, y - 16, x, y - 22); c.quadraticCurveTo(x + w + 5, y - 16, x + w, y + 3); c.stroke();
    c.fillStyle = GREY; c.lineWidth = 2.5; c.beginPath(); c.arc(x, y - 22, 6.5, 0, Math.PI * 2); c.fill(); c.stroke();
    c.restore();
  };
  // turned by r about the top of his head, which is put at (hx, hy): that is where the claw holds him
  const held = (r, hx, hy, face, shadow, front) => xf(D.N, { ox: 130, oy: 72, rot: r, dx: hx - 130, dy: hy - 72, face, extra: { shadow, front } });
  const P = 'bowling_pin_', LIE = [Math.PI / 2, 204, 144];
  D[P + 'tap'] = xf(D.N, { face: lookl, extra: { front: tap(30, 120, 8) } });
  D[P + 'roll1'] = xf(D.N, { face: lookl, extra: { front: c => { tap(30, 120, 16)(c); ball(-14)(c); } } });
  D[P + 'roll2'] = xf(D.NB, { face: FACE.shock, extra: { front: ball(18), fxm: 'none' } });
  D[P + 'roll3'] = xf(D.N, { face: FACE.shock, extra: { front: ball(48) } });
  D[P + 'hit1'] = xf(D.N, { face: FACE.shock, rot: 0.45, dx: 10, dy: -10, shadowK: 0.8, extra: { back: ball(86) } });
  D[P + 'hit2'] = xf(D.N, { face: FACE.spiral, rot: 1.05, dx: -20, dy: -26, shadowK: 0.6, extra: { back: ball(150) } });
  D[P + 'down1'] = held(LIE[0], 204, 138, FACE.spiral, [138, 60], ball(226));
  D[P + 'down2'] = held(...LIE, FACE.spiral, [138, 66]);
  [50, 100].forEach((y, i) => { D[P + 'reach' + i] = held(...LIE, FACE.spiral, [138, 66], setter(204, y, true)); });
  D[P + 'reach2'] = held(...LIE, FACE.spiral, [138, 66], setter(204, 144, true));
  D[P + 'grab'] = held(...LIE, FACE.shock, [138, 66], setter(204, 144));
  [[1.2, 194, 110, 50], [0.7, 170, 76, 46], [0.25, 142, 58, 44], [0, 130, 56, 44], [0, 130, 72, 60]].forEach(([r, x, y, sh], i) => {
    D[P + 'lift' + i] = held(r, x, y, i < 3 ? FACE.shock : FACE.sheep, [150 - i * 6, sh], setter(x, y)); });
  D[P + 'free'] = xf(D.N, { face: FACE.sheep, extra: { front: setter(130, 66, true) } });
  D[P + 'away'] = xf(D.N, { face: FACE.sheep, rot: 0.07, extra: { front: setter(130, 20, true) } });
  D[P + 'teeter1'] = xf(D.N, { face: FACE.sheep, rot: -0.08 });
  D[P + 'teeter2'] = xf(D.N, { face: FACE.sheep, rot: 0.05 });
  D[P + 'steady'] = xf(D.C1, {});
  D[P + 'next1'] = xf(D.C1, { extra: { front: ball(-12) } });
  D[P + 'next2'] = xf(D.N, { face: lookl, extra: { front: ball(8) } });
  D[P + 'next3'] = xf(D.N, { face: nervous, kx: 0.97, extra: { front: ball(8) } });
  D[P + 'next4'] = xf(D.N, { face: nervous, extra: { front: ball(-12) } });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.bowling_pin = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['roll1', 2], ['roll2', 2], ['roll3', 2], ['hit1', 2], ['hit2', 2], ['down1', 2], ['down2', 8],
    ['reach0', 2], ['reach1', 2], ['reach2', 2], ['grab', 3], ['lift0', 2], ['lift1', 2], ['lift2', 2], ['lift3', 4], ['lift4', 3], ['free', 2], ['away', 2],
    ['teeter1', 3], ['teeter2', 3], ['teeter1', 3], ['steady', 8], ['next1', 2], ['next2', 4], ['next3', 12], ['next4', 2], ['teeter2', 5]), ...DOZE] };
})();
