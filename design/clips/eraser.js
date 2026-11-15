// A giant eraser rubs out his lower half. He finds a pencil, draws himself feet (one far too big) and goes to sleep on them.
(() => {
  const { D, xf, FACE, boil, openPath, closedPath, tint, kit } = window.__lump;
  const k = kit.clip('eraser'), PAPER = '#E9E2D2', LEAD = '#C3CCD6';
  const BITS = [[62, 199, 3], [178, 200, 3.5], [96, 202, 2.5], [150, 198, 3], [44, 201, 3], [204, 199, 2.5], [120, 201, 3.5], [80, 197, 2.5], [190, 203, 3], [135, 203, 2.5], [108, 198, 3], [166, 202, 2.6]];
  // the line he draws, from his right side round to his left
  const FEET = [[182, 140], [184, 168], [178, 186], [194, 189], [204, 196], [196, 203], [168, 202], [150, 197], [136, 199], [118, 204], [72, 204], [48, 198], [54, 188], [78, 185], [77, 165], [85, 140]];

  const rubbed = (c, top, seed) => {
    if (top > 204) return;
    c.fillStyle = '#000';
    closedPath(c, [...boil(Array.from({ length: 13 }, (_, i) => [34 + i * 15.5, top + (i % 2 ? 3 : -3)]), seed + 3, 3), [224, 216], [30, 216]], [0, 12, 13, 14]); c.fill();
  };
  const crumbs = (c, n) => BITS.slice(0, n).forEach(([x, y, r], i) => { c.fillStyle = i % 3 ? PAPER : tint(); c.beginPath(); c.arc(x, y, r, 0, kit.TAU); c.fill(); });
  const rubber = (c, x, y, a) => {
    c.save(); c.translate(Math.round(x), Math.round(y)); c.rotate(a); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = kit.BLUE; c.beginPath(); c.roundRect(-48, -24, 96, 48, 10); c.fill();
    c.fillStyle = PAPER; c.beginPath(); c.roundRect(-6, -24, 54, 48, 10); c.fill(); c.fillRect(-6, -24, 14, 48);
    c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(-48, -24, 96, 48, 10); c.stroke();
    c.beginPath(); c.moveTo(-6, -24); c.lineTo(-6, 24); c.stroke();
    c.strokeStyle = kit.WHITE; c.lineWidth = 4; c.beginPath(); c.moveTo(-36, -8); c.lineTo(-18, -8); c.moveTo(-36, 7); c.lineTo(-24, 7); c.stroke();
    c.restore();
  };
  // a pencil with its point at (x, y), lying back along angle a
  const pencil = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
    c.fillStyle = kit.YELLOW; c.beginPath(); c.rect(12, -5, 44, 10); c.fill(); c.stroke();
    c.fillStyle = kit.GREY; c.beginPath(); c.rect(56, -5, 6, 10); c.fill(); c.stroke();
    c.fillStyle = kit.BLUE; c.beginPath(); c.roundRect(62, -5, 9, 10, 3); c.fill(); c.stroke();
    c.fillStyle = PAPER; c.beginPath(); c.moveTo(0, 0); c.lineTo(12, -5); c.lineTo(12, 5); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  // the pencil at work, in the hand on that side
  const hold = (c, [x, y], a, shoulder, seed) => { pencil(c, x, y, a); kit.arm(c, [shoulder, [x + Math.cos(a) * 30, y + Math.sin(a) * 30]], seed); };
  // the first n points of his new feet, coloured in once fill is above 0
  const feet = (c, n, fill, seed) => {
    const P = boil(FEET, seed + 9, 1.2);
    if (fill) {
      c.save(); c.globalAlpha = fill;
      c.fillStyle = '#191816'; c.beginPath(); c.ellipse(128, 205, 82, 6, 0, 0, kit.TAU); c.fill();
      c.fillStyle = tint(); closedPath(c, P, [0, 15]); c.fill(); c.restore();
    }
    c.lineJoin = c.lineCap = 'round'; c.strokeStyle = LEAD; c.lineWidth = 3; openPath(c, P.slice(0, n)); c.stroke();
  };
  const scene = (face, top, bits, more) => xf(D.N, { face, extra: { front: (c, d, seed) => { rubbed(c, top, seed); crumbs(c, bits); if (more) more(c, seed); } } });
  const done = (face, more) => scene(face, 150, 12, (c, s) => { feet(c, 16, 1, s); if (more) more(c, s); });

  k.add('hm', 3, xf(D.N, { face: kit.look(-6, 2, 'flat') }));
  [-60, -25, 10, 45].forEach((x, i) => k.add('in' + i, 2, scene(kit.look(-6, 5, 'o'), 210, 0, c => rubber(c, x, 188, -0.2))));
  [84, 132, 176, 150, 100, 70, 112, 160, 182, 140, 96, 128].forEach((x, i) => {
    const t = (i + 1) / 12;
    k.add('rub' + i, 2, scene(i < 6 ? kit.look(0, 6, 'o') : kit.faces.worried, Math.round(203 - 53 * t), Math.round(12 * t), c => rubber(c, x, 190 - 26 * t, i % 2 ? 0.2 : -0.2)));
  });
  [160, 195, 232, 270, 312].forEach((x, i) => k.add('out' + i, 2, scene(kit.faces.worried, 150, 12, c => rubber(c, x, 162 - i * 6, 0.2 + i * 0.08))));
  k.add('gone', 14, scene(kit.look(0, 7, 'open'), 150, 12));
  k.add('oh', 6, scene(kit.faces.worried, 150, 12));

  [250, 200, 156].forEach((x, i) => k.add('roll' + i, 2, scene(kit.look(6, 4, 'o'), 150, 12, c => pencil(c, x, 197, 0))));
  k.add('see', 4, scene(kit.look(7, 6, 'smile'), 150, 12, c => pencil(c, 156, 197, 0)));
  k.add('reach', 2, scene(kit.look(7, 6, 'smile'), 150, 12, (c, s) => { pencil(c, 156, 197, 0); kit.arm(c, [[166, 140], [176, 162]], s); }));
  k.add('grab', 2, scene(kit.look(6, 6, 'smile'), 150, 12, (c, s) => { pencil(c, 156, 197, 0); kit.arm(c, [[166, 140], [188, 188]], s); }));
  k.add('lift', 2, scene(kit.look(4, 5, 'smile'), 150, 12, (c, s) => hold(c, [172, 172], -0.5, [166, 140], s)));
  [3, 5, 7, 8, 10, 12, 14, 16].forEach((n, i) => {
    const tip = FEET[n - 1], right = tip[0] >= 140;
    k.add('draw' + i, 4, scene(kit.look(right ? 4 : -4, 7, 'flat'), 150, 12, (c, s) => {
      feet(c, n, 0, s); hold(c, tip, right ? -1.25 : -2.2, right ? [166, 140] : [90, 140], s);
      if (i === 4) kit.arm(c, [[166, 140], [174, 156]], s + 1);
    }));
  });
  k.add('fill', 2, scene(kit.look(-4, 7, 'smile'), 150, 12, (c, s) => { feet(c, 16, 0.5, s); hold(c, [70, 150], -2, [90, 140], s); }));
  k.add('up', 6, done(FACE.happy, (c, s) => hold(c, [58, 128], -1.9, [90, 140], s)));
  [[30, 96, -2.5, [56, 108]], [-10, 80, -3.2, [66, 122]], [-64, 90, -3.9, [78, 136]]].forEach(([x, y, a, hand], i) =>
    k.add('toss' + i, 2, done(FACE.happy, (c, s) => { pencil(c, x, y, a); kit.arm(c, [[90, 140], hand], s); })));
  k.add('look', 8, done(kit.look(0, 7, 'smile')));
  k.add('big', 8, done(kit.look(-6, 7, 'flat')));
  k.add('proud', 16, done(FACE.sheep));

  // down to sleep with the feet still on
  const stub = (c, x, y, s, seed) => {
    const P = boil([[0, -10], [14, -9], [24, -2], [18, 5], [0, 5]].map(([u, v]) => [x + u * s, y + v * Math.abs(s)]), seed + x, 1);
    c.lineJoin = c.lineCap = 'round'; c.fillStyle = tint(); closedPath(c, P, [0, 4]); c.fill(); c.strokeStyle = LEAD; c.lineWidth = 3; openPath(c, P); c.stroke();
  };
  [[D.T1, 8, 180, 76, 8], [D.T2, 6, 190, 66, 4], [D.S1, 6, 188, 58, 0]].forEach(([base, ticks, xr, xl, bits], i) =>
    k.add('doze' + i, ticks, xf(base, { extra: { front: (c, d, seed) => { crumbs(c, bits); stub(c, xr, 196, 1, seed); stub(c, xl, 197, -1.7, seed); } } })));
  k.done({ doze: false });
})();
