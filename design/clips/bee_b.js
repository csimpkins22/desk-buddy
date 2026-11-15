// Extreme close-up on his eyes: a bee loops round in front of them, lands between them, he goes cross-eyed and holds still; it leaves and one eye stays crossed.
(() => {
  const { xf, D, kit } = window.__lump, { CREAM, DARK, YELLOW, WHITE, TAU } = kit;
  const k = kit.clip('bee_b');
  const F = [128, 104], L = [116, 109], R = [140, 107], LAND = [128, 96];
  // zoom 1 leaves the scene where it is; zoom 3 puts his eyes across the middle of the screen
  const cam = z => kit.view(z, F, [F[0] + (120 - F[0]) * (z - 1) / 2, F[1] + (120 - F[1]) * (z - 1) / 2]);
  const MOUTH = { flat: ['stroke', [[122, 125], [134, 125]], 2.8], tight: ['stroke', [[124, 126], [132, 126]], 2.8], smile: ['stroke', [[121, 123], [128, 127], [135, 123]], 2.8], o: ['oval', 128, 125, 3.2, 4.2] };
  // whites of radius w with a pupil each, pushed l and r off centre
  const eyes = (w, l, r, mouth) => [['shine', L[0], L[1], w], ['shine', R[0], R[1], w], ['dot', L[0] + l[0], L[1] + l[1], 4.2], ['dot', R[0] + r[0], R[1] + r[1], 4.2], MOUTH[mouth]];
  const gaze = ([ex, ey], [bx, by]) => { const dx = bx - ex, dy = by - ey, d = Math.hypot(dx, dy) || 1, m = Math.min(4.6, d * 0.4) / d; return [dx * m, dy * m]; };
  const CROSSED = gaze(R, LAND);

  // where the bee is at step u: in from the right, once round his face, a spiral in to land on his brow (16), then away up and left
  const at = u => {
    if (u > 16) { const v = u - 16; return [128 - 9 * v, LAND[1] - 2 * v - 1.6 * v * v]; }
    const th = 0.5 + 0.48 * u, s = u > 13 ? (16 - u) / 3 : 1, far = Math.max(0, 1.5 - u);
    return [128 + (26 + far * 16) * s * Math.cos(th), 106 - s * ((20 + far * 8) * Math.sin(th) + 2) - (1 - s) * (106 - LAND[1])];
  };
  const bee = (c, [x, y], dir, flap, tilt) => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 0.9;
    [-1.6, 1.8].forEach(wx => { c.beginPath(); c.ellipse(wx * dir, flap ? -5.4 : -3.6, 2.2, flap ? 3.6 : 1.8, 0, 0, TAU); c.fill(); c.stroke(); });
    c.fillStyle = YELLOW; c.beginPath(); c.ellipse(0, 0, 5.2, 3.8, 0, 0, TAU); c.fill();
    c.save(); c.clip(); c.fillStyle = DARK; c.fillRect(-3.2, -4, 1.9, 8); c.fillRect(0.4, -4, 1.9, 8); c.restore();
    c.beginPath(); c.ellipse(0, 0, 5.2, 3.8, 0, 0, TAU); c.stroke();
    c.fillStyle = DARK; c.beginPath(); c.arc(3.6 * dir, -0.6, 0.9, 0, TAU); c.fill();
    c.restore();
  };
  // the bee in flight at step u, a dotted trail behind it
  const flying = u => c => {
    const p = at(u), q = at(u + 0.2), dir = q[0] >= p[0] ? 1 : -1;
    c.fillStyle = CREAM;
    for (let j = 1; j <= 5; j++) { const t = at(Math.max(-1, u - 0.36 * j)); c.beginPath(); c.arc(t[0], t[1], 1.6 - j * 0.15, 0, TAU); c.fill(); }
    bee(c, p, dir, Math.round(u) % 2, Math.max(-0.4, Math.min(0.4, (q[1] - p[1]) * 0.12)) * dir);
  };
  const shot = (face, front) => xf(D.N, { face, extra: { view: cam(3), front } });

  [[1.6, 3], [2.4, 6], [3, 9]].forEach(([z, w], i) => k.add('in' + i, 2, xf(D.N, { face: eyes(w, [0, 0], [0, 0], 'smile'), extra: { view: cam(z) } })));
  for (let u = 0; u <= 15; u++) k.add('fly' + u, 2, shot(eyes(9, gaze(L, at(u)), gaze(R, at(u)), u > 11 ? 'o' : 'flat'), flying(u)));
  k.add('land', 30, shot(eyes(9, gaze(L, LAND), CROSSED, 'tight'), c => bee(c, LAND, 1, 0, 0)));
  for (let v = 1; v <= 5; v++) k.add('off' + v, 2, shot(eyes(9, gaze(L, at(16 + v)), CROSSED, 'tight'), flying(16 + v)));
  k.add('stuck', 12, shot(eyes(9, [0, 0], CROSSED, 'flat')));
  k.add('back0', 2, shot(eyes(9, [0, 0], [CROSSED[0] / 2, 0], 'flat')));
  k.add('back1', 6, shot(eyes(9, [0, 0], [0, 0], 'smile')));
  [[2.4, 6], [1.6, 3], [1, 0]].forEach(([z, w], i) => k.add('out' + i, 2, xf(D.N, { face: eyes(w, [0, 0], [0, 0], 'smile'), extra: { view: cam(z) } })));
  k.done();
})();
