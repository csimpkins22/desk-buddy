// Wrench: he tightens a bolt on the edge of the frame. Every heave tilts the whole picture, until he slides off down the slope.
// group: gadgets
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', GREY = '#9FB0C4', BOLT = [224, 112], MID = [120, 120], UP = Math.PI + 0.5, DOWN = Math.PI - 0.5;
  const strain = [...FACE.chooEyes, ['stroke',[[120,125],[124,122],[128,125],[132,122],[136,125]],2.6]];
  const turned = (a, [x, y]) => [MID[0] + (x - MID[0]) * Math.cos(a) - (y - MID[1]) * Math.sin(a), MID[1] + (x - MID[0]) * Math.sin(a) + (y - MID[1]) * Math.cos(a)];
  // the floor and his shadow, turned with the picture about the middle of the screen
  const world = (a, sx) => (c, d, seed) => {
    c.save(); c.translate(MID[0], MID[1]); c.rotate(a); c.translate(-MID[0], -MID[1]);
    c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(sx + 4, 203, 60, 6, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = CREAM; c.globalAlpha = 0.5; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-80, 205); c.lineTo(320, 205); c.stroke();
    c.restore();
  };
  // the bolt stays put on the frame; the wrench is on it (or wherever it fell), handle pointing along w
  const tool = (w, x = BOLT[0], y = BOLT[1]) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.save(); c.translate(x, y); c.rotate(w);
    c.beginPath(); c.moveTo(13, 0); c.lineTo(54, 0); c.strokeStyle = CREAM; c.lineWidth = 11; c.stroke(); c.strokeStyle = GREY; c.lineWidth = 7; c.stroke();
    c.beginPath(); c.arc(0, 0, 13, 0, Math.PI * 2); c.strokeStyle = CREAM; c.lineWidth = 10; c.stroke(); c.strokeStyle = GREY; c.lineWidth = 6; c.stroke();
    c.restore();
    c.translate(BOLT[0], BOLT[1]); c.rotate(x === BOLT[0] ? w : 0);
    c.beginPath(); for (let i = 0; i < 6; i++) c.lineTo(Math.cos(i * Math.PI / 3) * 8, Math.sin(i * Math.PI / 3) * 8); c.closePath();
    c.fillStyle = '#5E6B7A'; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2; c.stroke();
    c.restore();
  };
  const grip = w => [BOLT[0] + Math.cos(w) * 42, BOLT[1] + Math.sin(w) * 42];
  // him on the floor of a picture tilted by a, slid s along it to the left
  const lump = (a, s, face, extra, o = {}) => xf(D.N, { rot: a, ox: MID[0], oy: MID[1], dx: -s * Math.cos(a), dy: -s * Math.sin(a), shadowK: 0, face, ...o,
    extra: { back: world(a, 128 - s), ...extra } });
  const heave = (a, w) => lump(a, 0, w === UP ? FACE.lookr : strain, { arm2: [turned(a, [166, 138]), grip(w)], front: tool(w) });
  const TILT = [0, -0.07, -0.15, -0.26];
  D.wrench_u0 = heave(0, UP);
  [1, 2, 3].forEach(i => { D['wrench_d' + i] = heave(TILT[i], DOWN); D['wrench_u' + i] = heave(TILT[i], UP); });
  const hung = { front: tool(DOWN) }, fallen = { front: tool(Math.PI, 212, 191) };
  D.wrench_o = lump(TILT[3], 0, FACE.shock, { ...hung, fxm: 'alert', fx: [150, 40] });
  D.wrench_s1 = lump(TILT[3], 28, FACE.shock, hung);
  D.wrench_s2 = lump(TILT[3], 56, FACE.shock, hung);
  D.wrench_s3 = lump(TILT[3], 74, FACE.spiral, hung, { kx: 0.84 });
  D.wrench_b1 = lump(0.06, 56, FACE.spiral, { front: tool(Math.PI - 0.9, 214, 150) });
  D.wrench_b2 = lump(0, 40, FACE.spiral, fallen, { rot: -0.05, ox: 128, oy: 201, dx: -40, dy: 0 });
  D.wrench_b3 = lump(0, 24, FACE.spiral, fallen, { rot: 0.05, ox: 128, oy: 201, dx: -24, dy: 0 });
  D.wrench_b4 = lump(0, 10, FACE.sheep, fallen);
  CLIPS.wrench = { home: 'idle', seq: [...WAKE, ['wrench_u0', 8], ['wrench_d1', 5], ['wrench_u1', 4], ['wrench_d2', 5], ['wrench_u2', 4], ['wrench_d3', 5],
    ['wrench_o', 5], ['wrench_s1', 2], ['wrench_s2', 2], ['wrench_s3', 6], ['wrench_b1', 3], ['wrench_b2', 5], ['wrench_b3', 5], ['wrench_b4', 6], ...DOZE] };
})();
