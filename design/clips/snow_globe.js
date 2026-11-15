// Snow globe: a glass dome drops over him, his whole world gets a good shake, and the snow settles on his head.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', SNOW = '#F4F8FF', CX = 128, CY = 116, R = 108;
  const flake = (c, x, y, r) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, Math.PI * 2); };
  const cap = (c, seed) => {                        // the snow that lands on his head
    c.fillStyle = SNOW; c.strokeStyle = CREAM; c.lineWidth = 2;
    closedPath(c, boil([[94, 93], [106, 76], [130, 65], [154, 74], [170, 95], [160, 90], [148, 97], [136, 89], [124, 96], [112, 88], [102, 95]], seed, 1)); c.fill(); c.stroke();
  };
  // snow: 0 none, 1 lying on the floor, 2 whirling, 3 falling. dx, rot: the shake, about his feet. lift: the dome still on its way down.
  const globe = (snow, dx = 0, rot = 0, lift = 0, capped = false) => (c, d, seed, tick) => {
    const s = Math.floor(tick / 2);
    c.save(); c.translate(128 + dx, 201); c.rotate(rot); c.translate(-128, -201); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = SNOW; c.beginPath();
    if (snow === 2) for (let i = 0; i < 26; i++) { const a = i * 2.4 + s * 0.8, r = 24 + i * 37 % 76; flake(c, CX + Math.cos(a) * r, CY + Math.sin(a) * r * 0.9, 2 + i % 3); }
    if (snow === 3) for (let i = 0; i < 20; i++) { const x = 30 + i * 47 % 196 + Math.sin(s * 0.9 + i) * 4, y = 14 + (i * 31 + s * 7) % 184; if (Math.hypot(x - CX, y - CY) < R - 6) flake(c, x, y, 2 + i % 3); }
    c.fill();
    if (snow === 1 || snow === 3) { closedPath(c, boil([[64, 204], [84, 194], [108, 198], [132, 194], [158, 198], [178, 193], [192, 204]], seed, 1.2)); c.fill(); }
    if (capped) cap(c, seed);
    c.fillStyle = '#8A5A2B'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(54, 203, 148, 30, 8); c.fill(); c.stroke();
    c.translate(0, -lift); c.globalAlpha = 0.8; c.beginPath(); c.arc(CX, CY, R, Math.PI - 0.94, Math.PI * 2 + 0.94); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 5; c.beginPath(); c.arc(CX, CY, R - 13, -2.7, -2.1); c.stroke();
    c.restore();
  };
  const P = 'snow_globe_';
  D[P + 1] = xf(D.N, { face: FACE.lookup, extra: { front: globe(1, 0, 0, 150) } });
  D[P + 2] = xf(D.N, { face: FACE.lookup, extra: { front: globe(1, 0, 0, 60) } });
  D[P + 3] = xf(D.N, { face: FACE.shock, ky: 0.94, extra: { front: globe(1) } });
  D[P + 4] = xf(D.N, { face: FACE.lookr, extra: { front: globe(1) } });
  [[-1, FACE.shock], [1, FACE.shock], [-1, FACE.spiral], [1, FACE.spiral]].forEach(([side, face], i) => {
    D[P + 'shake' + i] = xf(D.N, { face, dx: side * 12, rot: side * 0.14, extra: { front: globe(2, side * 12, side * 0.14) } });
  });
  D[P + 5] = xf(D.N, { face: FACE.spiral, extra: { front: globe(3) } });
  D[P + 6] = xf(D.N, { face: FACE.lookup, extra: { front: globe(3, 0, 0, 0, true) } });
  D[P + 7] = xf(D.N, { face: FACE.happy, extra: { front: globe(1, 0, 0, 0, true) } });
  D[P + 8] = xf(D.N, { face: FACE.happy, extra: { front: globe(1, 0, 0, 60, true) } });
  D[P + 9] = xf(D.N, { face: FACE.happy, extra: { front: globe(1, 0, 0, 150, true) } });
  D[P + 10] = xf(D.N, { face: FACE.cute, extra: { front: (c, d, seed) => cap(c, seed) } });
  const shake = (a, b) => [[P + 'shake' + a, 3], [P + 'shake' + b, 3], [P + 'shake' + a, 3], [P + 'shake' + b, 3]];
  CLIPS.snow_globe = { home: 'idle', seq: [...WAKE, [P + 1, 3], [P + 2, 2], [P + 3, 3], [P + 4, 12], ...shake(0, 1), ...shake(2, 3),
    [P + 5, 10], [P + 6, 16], [P + 7, 10], [P + 8, 2], [P + 9, 3], [P + 10, 10], ...DOZE] };
})();
