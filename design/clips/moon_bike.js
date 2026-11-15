// Moon bike: a full moon comes up and he hops off to fetch a bicycle. Back he comes, small and in silhouette, pedalling up and across it, until the front wheel dips and he has to pedal like mad.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', BLACK = '#000000', MOON = '#FFE08A', CRATER = '#E9C766', TAU = Math.PI * 2, MX = 120, MY = 104, MR = 90;
  const eager = [...FACE.chooEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const strain = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const RIM = Array.from({ length: 12 }, (_, i) => [Math.cos(i / 12 * TAU) * MR, Math.sin(i / 12 * TAU) * MR]);
  const CRATERS = [[-36, -34, 16, 12], [30, -50, 9, 7], [42, 24, 19, 14], [-22, 40, 11, 8], [-62, 8, 6, 5], [4, -6, 5, 4]];
  const STARS = [[22, 22, 5], [214, 30, 4], [226, 150, 5], [12, 128, 4], [196, 208, 2], [40, 196, 2], [150, 8, 2]];
  const both = (...f) => (c, d, seed, tick) => f.forEach(g => g && g(c, d, seed, tick));
  // behind everything. rise: how far the moon has still to come up (or has set). fade: how much of the stars there is.
  const night = (rise = 0, fade = 1) => (c, d, seed) => {
    c.save(); c.lineJoin = 'round'; c.globalAlpha = fade; c.fillStyle = CREAM; c.beginPath();
    STARS.forEach(([x, y, s], i) => {
      if (s < 3) { c.moveTo(x + s, y); c.arc(x, y, s, 0, TAU); return; }
      const r = s + ((seed + i) % 3 === 0 ? 2 : 0);
      c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r);
    });
    c.fill(); c.globalAlpha = 1;
    c.translate(MX, MY + rise); c.fillStyle = MOON; c.strokeStyle = CREAM; c.lineWidth = 3; closedPath(c, boil(RIM, seed + 4, 1.6)); c.fill(); c.stroke();
    c.fillStyle = CRATER; CRATERS.forEach(([x, y, rx, ry]) => { c.beginPath(); c.ellipse(x, y, rx, ry, -0.3, 0, TAU); c.fill(); });
    c.restore();
  };
  // the bicycle, in its own space: wheels on the line y = 0, facing right
  const A = [-26, -17], B = [28, -17], BB = [-1, -14], S = [-15, -38], H = [19, -39], WR = 17;
  const ink = (c, w) => { c.strokeStyle = CREAM; c.lineWidth = w + 3.4; c.stroke(); c.strokeStyle = BLACK; c.lineWidth = w; c.stroke(); };    // black with a rim of light, so it shows off the moon too
  const pedal = (turn, side) => [BB[0] + Math.cos(turn) * 8 * side, BB[1] + Math.sin(turn) * 8 * side];
  const leg = (c, [px, py], alpha = 1) => { c.globalAlpha = alpha; c.beginPath(); c.moveTo(S[0] + 8, S[1] - 3); c.quadraticCurveTo((S[0] + px) / 2 + 13, (S[1] + py) / 2 - 2, px, py - 2); c.moveTo(px - 2, py - 2); c.lineTo(px + 5, py - 2); ink(c, 4); c.globalAlpha = 1; };
  const bike = (x, y, pitch, turn, spin) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(pitch); c.lineCap = c.lineJoin = 'round';
    const far = pedal(turn, -1), near = pedal(turn, 1);
    leg(c, far);
    c.beginPath(); [A, B].forEach(([wx, wy]) => { c.moveTo(wx + WR, wy); c.arc(wx, wy, WR, 0, TAU); });
    c.moveTo(...BB); c.lineTo(...S); c.lineTo(...H); c.lineTo(21, -32); c.lineTo(...BB); c.lineTo(...A); c.lineTo(...S); c.lineTo(S[0] - 2, S[1] - 5);
    c.moveTo(17, -49); c.lineTo(21, -32); c.lineTo(...B); c.moveTo(12, -51); c.lineTo(23, -49); c.quadraticCurveTo(29, -48, 28, -43); ink(c, 3);
    c.beginPath();
    [A, B].forEach(([wx, wy]) => [0, 1].forEach(i => { const a = spin + i * Math.PI / 2, ux = Math.cos(a) * (WR - 2), uy = Math.sin(a) * (WR - 2); c.moveTo(wx - ux, wy - uy); c.lineTo(wx + ux, wy + uy); }));
    ink(c, 1.4);
    c.beginPath(); c.moveTo(...far); c.lineTo(...near); [far, near].forEach(([px, py]) => { c.moveTo(px - 4, py); c.lineTo(px + 4, py); }); ink(c, 2.6);
    c.restore();
  };
  // drawn over him: his near leg, his arm on the bars, and when he is flat out a blur of feet and flying sweat (n: which drawing of it)
  const limbs = (x, y, pitch, turn, flatOut, n) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(pitch); c.lineCap = c.lineJoin = 'round';
    if (flatOut) {
      [2.1, 4.2].forEach(a => leg(c, pedal(turn + a, 1), 0.45));
      c.beginPath(); [0, Math.PI].forEach(a => { c.moveTo(BB[0] + Math.cos(turn + a) * 15, BB[1] + Math.sin(turn + a) * 15); c.arc(BB[0], BB[1], 15, turn + a, turn + a + 1.2); });
      [[-40, -86], [-52, -68], [-30, -103]].forEach(([dx, dy], i) => { const q = (n + i) % 3; c.moveTo(dx - q * 8, dy - q * 4); c.lineTo(dx - q * 8 - 5, dy - q * 4 - 2.5); });
      ink(c, 1.8);
    }
    leg(c, pedal(turn, 1));
    c.beginPath(); c.moveTo(4, -66); c.quadraticCurveTo(18, -62, 22, -50); ink(c, 6);
    c.restore();
  };
  const P = 'moon_bike_', seq = [], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  // one drawing of him riding: the wheels at (x, y), nose up or down by pitch
  const ride = (name, x, y, pitch, n, face, { flatOut, alert, turn = n * Math.PI / 3 } = {}) => {
    const cs = Math.cos(pitch), sn = Math.sin(pitch), sx = x + S[0] * cs - (S[1] - 1) * sn, sy = y + S[0] * sn + (S[1] - 1) * cs;
    add(name, 2, xf(D.N, { k: 0.5, rot: pitch + 0.1, dx: sx - 128, dy: sy - 201, shadowK: 0, face,
      extra: { inverse: true, back: both(night(), bike(x, y, pitch, turn, n * 0.42)), front: limbs(x, y, pitch, turn, flatOut, n), ...(alert ? { fxm: 'alert', fx: [sx + 34, sy - 66] } : { fxm: 'none' }) } }));
  };
  [[190, 0.3], [112, 0.6], [44, 1], [0, 1]].forEach(([rise, fade], i) => add('rise' + i, i ? 2 : 3, xf(D.N, { face: FACE.lookup, extra: { back: night(rise, fade) } })));
  add('awe', 6, xf(D.N, { face: FACE.cute, ky: 1.02, extra: { back: night() } }));
  add('crouch', 4, xf(D.N, { face: eager, ky: 0.86, kx: 1.07, extra: { back: night() } }));
  add('hop0', 2, xf(D.N, { face: FACE.happy, dx: -64, dy: -46, rot: -0.25, ky: 1.06, shadowK: 0.6, extra: { back: night() } }));
  add('hop1', 2, xf(D.N, { face: FACE.happy, dx: -176, dy: -30, rot: -0.4, shadowK: 0.4, extra: { back: night() } }));
  add('wait', 2, xf(D.N, { dx: -400, extra: { back: night() } }));
  for (let i = 0; i < 12; i++) {                                         // up and across
    const u = (i + 2) / 13;
    ride('climb' + i, -18 + 138 * u, 258 - 106 * Math.sin(u * Math.PI / 2), -0.6 * Math.cos(u * Math.PI / 2), i, FACE.happy);
  }
  [[125, 153, 0.16], [129, 159, 0.36], [132, 167, 0.5]].forEach(([x, y, pitch], i) => ride('dip' + i, x, y, pitch, 12 + i, FACE.shock, { alert: i > 0 }));
  const PITCH = [0.5, 0.52, 0.5, 0.46, 0.38, 0.27, 0.14, 0.02, -0.1, -0.2, -0.26], SINK = [172, 178, 182, 184, 184, 184, 182, 178, 172, 165, 158];
  PITCH.forEach((pitch, i) => ride('mad' + i, 133 + i * i * 0.26, SINK[i] + (i % 2 ? 2 : 0), pitch, i, strain, { flatOut: true, turn: i * 1.9 }));
  for (let i = 0; i < 5; i++) ride('away' + i, 172 + i * 30, 148 - i * 13, -0.3, i, FACE.happy);
  add('back0', 2, xf(D.N, { face: FACE.puff, dx: 170, dy: -50, rot: 0.25, shadowK: 0.4, extra: { back: night(50, 0.7) } }));
  add('back1', 2, xf(D.N, { face: FACE.puff, dx: 84, dy: -40, rot: 0.14, ky: 1.05, shadowK: 0.6, extra: { back: night(120, 0.45) } }));
  add('land', 3, xf(D.N, { face: FACE.puff, dx: 14, ky: 0.84, kx: 1.1, extra: { back: night(200, 0.2) } }));
  add('phew0', 3, xf(D.N, { face: FACE.puff, dx: 4, ky: 1.03 }));
  add('phew1', 3, xf(D.N, { face: FACE.puff, ky: 0.97, kx: 1.02 }));
  add('phew2', 3, xf(D.N, { face: FACE.happy }));
  CLIPS.moon_bike = { home: 'idle', seq: [...WAKE, ...seq, ...DOZE] };
})();
