// Windy: a breeze turns into a gale. He leans into it, grabs a post, flaps from it like a flag, and drops when it stops.
// group: weather
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', LEAVES = ['#FFD23F', '#FF5A4D', '#58D68D', '#C89B5A'];
  const squint = [...FACE.chooEyes, ['stroke',[[121,126],[135,125]],2.8]];
  // drawn a quarter turn round, so they come out upright once he is blown flat
  const aaah = [['dot',121,132,4.6], ['dot',120,112,4.6], ['mouth',[[131,130],[130,116],[144,114],[149,123],[144,132]]]];
  const stunned = [['dot',121,132,3.6], ['dot',120,112,3.6], ['stroke',[[139,129],[139,117]],2.8]];
  const leaf = (c, x, y, turn, i, k = 1.3) => {
    c.save(); c.translate(x, y); c.rotate(turn); c.scale(k, k); c.fillStyle = LEAVES[i % 4]; c.strokeStyle = CREAM; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(-10, 0); c.quadraticCurveTo(0, -9, 10, 0); c.quadraticCurveTo(0, 9, -10, 0); c.fill(); c.stroke(); c.restore();
  };
  const post = c => { c.save(); c.fillStyle = '#C89B5A'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(207, 92, 11, 111, 5); c.fill(); c.stroke(); c.restore(); };
  // gale: 1 a breeze, 2 blowing, 3 howling. Streaks and leaves cross from right to left, on twos.
  const wind = gale => (c, d, seed, tick) => {
    const s = Math.floor(tick / 2) - 14, speed = 10 + gale * 8;
    c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.globalAlpha = 0.7; c.lineWidth = 3; c.beginPath();
    for (let i = 0; i < gale * 2; i++) { const x = 270 - (s * speed * 1.4 + i * 97) % 330, y = 30 + i * 53 % 150, len = 22 + gale * 8; c.moveTo(x, y); c.quadraticCurveTo(x + len / 2, y - 4, x + len, y); }
    c.stroke(); c.globalAlpha = 1;
    for (let i = 0; i < gale * 2 - 1; i++) leaf(c, 260 - (s * speed + i * 71) % 290, 44 + i * 67 % 140 + Math.sin(s * 0.9 + i * 2) * 8, (s * 0.7 + i) % 6.28, i);
    c.restore();
  };
  const P = 'windy_', CLING = { arm: [[182, 100], [210, 106]], arm2: [[182, 134], [210, 120]] };
  D[P + 1] = xf(D.N, { face: FACE.lookr, extra: { back: post, front: wind(1) } });
  D[P + 2] = xf(D.N, { face: squint, rot: 0.12, extra: { back: post, front: wind(2) } });
  D[P + 3] = xf(D.N, { face: squint, rot: 0.26, dx: -6, extra: { back: post, front: wind(3), arm2: [[176, 150], [208, 136]] } });
  D[P + 4] = xf(D.N, { face: FACE.shock, rot: 0.8, dx: -30, dy: -36, shadowK: 0.8, extra: { back: post, front: wind(3), arm2: [[176, 128], [209, 124]] } });
  D[P + 5] = xf(D.N, { face: aaah, rot: 1.42, dx: -60, dy: -80, shadowK: 0.6, extra: { back: post, front: wind(3), ...CLING } });
  D[P + 6] = xf(D.N, { face: aaah, rot: 1.6, dx: -60, dy: -84, ky: 1.05, shadowK: 0.6, extra: { back: post, front: wind(3), ...CLING } });
  D[P + 7] = xf(D.N, { face: stunned, rot: 1.5, dx: -60, dy: -82, shadowK: 0.6, extra: { back: post, ...CLING } });
  D[P + 8] = xf(D.N, { face: FACE.shock, rot: 0.7, dx: -24, dy: -30, shadowK: 0.8, extra: { back: post } });
  D[P + 9] = xf(D.N, { face: FACE.spiral, ky: 0.78, kx: 1.14, extra: { back: post, front: c => leaf(c, 152, 60, 0.6, 2, 2) } });
  D[P + 10] = xf(D.N, { face: FACE.sheep, extra: { back: post, front: c => leaf(c, 142, 76, -0.35, 2, 2) } });
  const flap = [[P + 5, 3], [P + 6, 3]];
  CLIPS.windy = { home: 'idle', seq: [...WAKE, [P + 1, 10], [P + 2, 8], [P + 3, 12], [P + 4, 2], ...flap, ...flap, ...flap, ...flap,
    [P + 7, 5], [P + 8, 2], [P + 9, 5], [P + 10, 12], ...DOZE] };
})();
