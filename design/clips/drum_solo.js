// Drum solo: he hammers a small drum kit, a stick flies out of his hand, and he finishes on the cymbal with his head.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('drum_solo'), { CREAM, RED, BLUE, WHITE, YELLOW, GREY, TAU } = kit;
  const o = { k: 0.9, dx: -22 };
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const stick = (c, a, b) => { ink(c, 3.6); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); };
  const drums = (c, a = 1, tilt = 0, crash = false) => kit.fade(c, a, () => {
    ink(c);
    [[72, RED], [128, BLUE]].forEach(([x, col]) => {
      c.fillStyle = col; c.beginPath(); c.roundRect(x - 23, 174, 46, 26, 4); c.fill(); c.stroke();
      c.fillStyle = WHITE; c.beginPath(); c.ellipse(x, 174, 23, 6, 0, 0, TAU); c.fill(); c.stroke();
    });
    c.beginPath(); c.moveTo(200, 200); c.lineTo(200, 104); c.moveTo(188, 200); c.lineTo(212, 200); c.stroke();
    c.save(); c.translate(200, 102); c.rotate(tilt); c.fillStyle = YELLOW; c.beginPath(); c.ellipse(0, 0, 24, 5, 0, 0, TAU); c.fill(); c.stroke(); c.restore();
    if (crash) { c.lineWidth = 3.2; [[168, 78, 160, 64], [186, 72, 184, 56], [206, 76, 214, 62]].forEach(([x0, y0, x1, y1]) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); }); }
  });
  const pose = (oo, face, l, r, front) => { const p = { ...o, ...oo }, a = kit.pt(p, [90, 140]), b = kit.pt(p, [166, 140]);
    return xf(D.N, { ...p, face, extra: { arm: [a, [a[0] + l[0], a[1] + l[1]]], arm2: [b, [b[0] + r[0], b[1] + r[1]]], front: c => front(c, [a[0] + l[0], a[1] + l[1]], [b[0] + r[0], b[1] + r[1]]) } }); };
  const UP = [-16, -16], DN = [-12, 18], UP2 = [16, -16], DN2 = [8, 20];
  const play = (face, l, r, a = 1, oo = {}) => pose(oo, face, l, r, (c, hl, hr) => {
    drums(c, a);
    stick(c, hl, l === UP ? [hl[0] - 6, hl[1] - 30] : [72, 172]);
    stick(c, hr, r === UP2 ? [hr[0] + 6, hr[1] - 30] : [126, 172]);
  });
  k.add('in0', 2, play(FACE.happy, UP, UP2, 0.3)); k.add('in1', 2, play(FACE.happy, UP, UP2, 0.65));
  k.add('hitl', 2, play(FACE.happy, DN, UP2, 1, { ky: 0.97 })); k.add('hitr', 2, play(FACE.happy, UP, DN2, 1, { ky: 1.02 }));
  for (let i = 0; i < 4; i++) { k.add('hitl', 2); k.add('hitr', 2); }
  k.add('both', 2, play(FACE.aah, DN, DN2, 1, { ky: 0.94, kx: 1.04 }));
  k.add('wind', 2, play(FACE.aah, DN, UP2, 1, { ky: 1.04 }));
  [[176, 84, 0.6], [186, 46, 1.9], [192, 2, 3.2]].forEach(([x, y, r], i) => k.add('fly' + i, 2, pose({}, FACE.shock, DN, UP2, (c, hl) => {
    drums(c); stick(c, hl, [72, 172]);
    stick(c, [x - 15 * Math.cos(r), y - 15 * Math.sin(r)], [x + 15 * Math.cos(r), y + 15 * Math.sin(r)]);
  })));
  k.add('gone', 6, pose({}, FACE.lookr, DN, [14, -10], (c, hl) => { drums(c); stick(c, hl, [72, 172]); }));
  k.add('back', 2, pose({ rot: -0.12 }, FACE.grump, DN, [10, 6], (c, hl) => { drums(c); stick(c, hl, [72, 172]); }));
  const butt = (tilt, a = 1, crash = true) => pose({ rot: 0.36 }, FACE.spiral, [-14, 10], [14, 14], c => drums(c, a, tilt, crash));
  k.add('bang1', 4, butt(0.3)); k.add('bang2', 4, butt(-0.18)); k.add('bang1', 4); k.add('bang2', 4);
  k.add('out0', 2, pose({ rot: 0.18 }, FACE.spiral, [-14, 10], [14, 14], c => drums(c, 0.65, 0.1)));
  k.add('out1', 2, pose({}, FACE.spiral, [-14, 10], [14, 14], c => drums(c, 0.3)));
  k.done();
})();
