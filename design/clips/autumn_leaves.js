// Autumn leaves: he rakes the leaves into a pile, drops the rake, and jumps in.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', LEAVES = ['#FFD23F', '#FF5A4D', '#C89B5A', '#58D68D'], PX = 170;
  const leaf = (c, x, y, turn, i) => {
    c.save(); c.translate(x, y); c.rotate(turn); c.fillStyle = LEAVES[i % 4]; c.strokeStyle = CREAM; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(-13, 0); c.quadraticCurveTo(0, -11, 13, 0); c.quadraticCurveTo(0, 11, -13, 0); c.fill(); c.stroke(); c.restore();
  };
  // head at (tx, ty), with the handle running back through his hand
  const rake = (c, hx, hy, tx, ty) => {
    c.save(); c.translate(tx, ty); c.rotate(Math.atan2(ty - hy, tx - hx));
    c.strokeStyle = '#C89B5A'; c.lineWidth = 5; c.beginPath(); c.moveTo(-104, 0); c.lineTo(-9, 0); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(-9, -12); c.lineTo(-9, 12); [-12, -4, 4, 12].forEach(y => { c.moveTo(-9, y); c.lineTo(0, y); }); c.stroke();
    c.restore();
  };
  const SPOTS = [[0, 0.8], [-0.5, 0.45], [0.5, 0.5], [-0.15, 0.3], [0.3, 0.2], [-0.75, 0.12], [0.75, 0.14], [0.1, 0.55], [-0.35, 0.7], [0.4, 0.75], [0, 0.1], [-0.5, 0.15]];
  const pile = (c, seed, r, h, n) => {
    c.fillStyle = '#8A5A2B'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    closedPath(c, boil([[PX - r, 203], [PX - r * 0.72, 201 - h * 0.62], [PX, 201 - h], [PX + r * 0.72, 201 - h * 0.62], [PX + r, 203]], seed, 1.5), [0, 4]); c.fill(); c.stroke();
    SPOTS.slice(0, n).forEach(([fx, fy], i) => leaf(c, PX + fx * r, 201 - fy * h, i * 1.3 % 3.14, i));
  };
  // raking: the pile after g strokes, the leaves still lying about, and where the rake is
  const R = [0, 20, 34, 48], LOOSE = [[150, 166, 184, 200, 216, 232], [204, 224], [226], []], DROPPED = [8, 198, 88, 198];
  const yard = (g, rk) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    LOOSE[g].forEach((x, i) => leaf(c, x, 195, i % 2 ? 0.3 : -0.2, i));
    if (g) pile(c, seed, R[g], R[g] * 0.9, g * 4);
    rake(c, ...rk);
    c.restore();
  };
  // after the jump: the pile flattens under him as its leaves fly out (k: 1 to 3) and settle
  const heap = k => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    rake(c, ...DROPPED);
    pile(c, seed, 52 + k * 6, 50 - k * 7, 12);
    for (let i = 0; i < 10; i++) { const a = -2.8 + i * 0.27, far = k * (26 + i % 3 * 10); leaf(c, PX + Math.cos(a) * far * 1.2, Math.min(195, 170 + Math.sin(a) * far + (k - 1) * (k - 1) * 40), i * 0.9 % 3.14, i); }
    if (k === 3) leaf(c, 184, 76, -0.3, 0);
    c.restore();
  };
  const P = 'autumn_leaves_', UP = [150, 92, 150, 198];
  D[P + 1] = xf(D.N, { face: FACE.lookr, dx: -40, extra: { arm2: [[126, 140], [150, 138]], front: yard(0, UP) } });
  [1, 2, 3].forEach(g => {
    D[P + 'reach' + g] = xf(D.N, { face: FACE.lookr, dx: -40, rot: 0.06, extra: { arm2: [[126, 140], [158, 128]], front: yard(g - 1, [158, 128, 234, 195]) } });
    D[P + 'pull' + g] = xf(D.N, { face: FACE.lookr, dx: -40, rot: -0.04, extra: { arm2: [[126, 140], [146, 146]], front: yard(g, [146, 146, PX + R[g] + 8, 195]) } });
  });
  D[P + 2] = xf(D.N, { face: FACE.happy, dx: -40, extra: { arm2: [[126, 140], [150, 138]], front: yard(3, UP) } });
  D[P + 3] = xf(D.A1, { dx: -40, extra: { front: yard(3, DROPPED) } });
  D[P + 4] = xf(D.A2, { dx: -14, dy: -30, rot: 0.12, extra: { front: yard(3, DROPPED) } });
  D[P + 5] = xf(D.A3, { dx: 18, dy: -40, rot: 0.2, extra: { front: yard(3, DROPPED) } });
  D[P + 6] = xf(D.A4, { dx: 38, dy: -8, extra: { front: yard(3, DROPPED) } });
  D[P + 7] = xf(D.N, { face: FACE.aah, dx: 40, ky: 0.8, kx: 1.1, extra: { front: heap(1) } });
  D[P + 8] = xf(D.N, { face: FACE.aah, dx: 40, ky: 0.92, extra: { front: heap(2) } });
  D[P + 9] = xf(D.N, { face: FACE.happy, dx: 40, extra: { front: heap(3) } });
  D[P + 10] = xf(D.N, { face: FACE.happy, dx: 22, extra: { front: heap(3) } });
  const stroke = g => [[P + 'reach' + g, 4], [P + 'pull' + g, 5]];
  CLIPS.autumn_leaves = { home: 'idle', seq: [...WAKE, [P + 1, 8], ...stroke(1), ...stroke(2), ...stroke(3), [P + 2, 8], [P + 3, 4], [P + 4, 2], [P + 5, 3], [P + 6, 2],
    [P + 7, 3], [P + 8, 4], [P + 9, 14], [P + 10, 4], ...DOZE] };
})();
