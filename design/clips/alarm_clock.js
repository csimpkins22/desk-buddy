// Alarm clock: it rings and rattles beside him; he squints at it, flattens it with one nub, and goes back to sleep.
(() => {
  const { D, xf, FACE, kit, openPath } = window.__lump, k = kit.clip('alarm_clock'), { CREAM, YELLOW, RED, WHITE, DARK, TAU } = kit;
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const clock = (c, a, alpha = 1) => kit.fade(c, alpha, () => {
    c.save(); c.translate(194, 201); c.rotate(a); ink(c);
    c.beginPath(); c.moveTo(-10, -8); c.lineTo(-15, -1); c.moveTo(10, -8); c.lineTo(15, -1); c.stroke();
    c.fillStyle = YELLOW; [-12, 12].forEach(x => { c.beginPath(); c.arc(x, -40, 8, 0, TAU); c.fill(); c.stroke(); });
    c.fillStyle = RED; c.beginPath(); c.arc(0, -22, 18, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = WHITE; c.beginPath(); c.arc(0, -22, 12, 0, TAU); c.fill();
    c.strokeStyle = DARK; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -31); c.lineTo(0, -22); c.lineTo(6, -19); c.stroke();
    ink(c, 3); c.beginPath(); c.moveTo(-26, -46); c.lineTo(-33, -54); c.moveTo(0, -54); c.lineTo(0, -65); c.moveTo(24, -46); c.lineTo(30, -53); c.stroke();
    c.restore();
  });
  const flat = (c, alpha = 1) => kit.fade(c, alpha, () => {
    ink(c); c.fillStyle = YELLOW; [-20, 20].forEach(x => { c.beginPath(); c.ellipse(194 + x, 191, 8, 4, 0, 0, TAU); c.fill(); c.stroke(); });
    c.fillStyle = RED; c.beginPath(); c.ellipse(194, 195, 24, 6, 0, 0, TAU); c.fill(); c.stroke();
    ink(c, 3); openPath(c, [[204, 188], [212, 182], [205, 176], [214, 170], [208, 163]]); c.stroke();
  });
  const SQ = [['stroke', [[110, 112], [122, 109]], 3.2], ['stroke', [[134, 108], [146, 111]], 3.2], ['stroke', [[121, 128], [128, 125], [135, 128]], 3]];
  const CALM = [['stroke', [[110, 110], [116, 113], [122, 110]], 3.2], ['stroke', [[134, 109], [140, 112], [146, 109]], 3.2], ['stroke', [[122, 124], [128, 128], [134, 124]], 3]];
  const sh = [144, 140];
  const f = (o, face, front, hand) => xf(D.N, { dx: -22, ...o, face, extra: { ...(hand ? { arm2: [sh, hand] } : {}), front } });
  const ring = i => c => clock(c, i % 2 ? -0.14 : 0.14);

  kit.steps(0, -22, 3).forEach((x, i) => k.add('in' + i, 2, f({ dx: x }, FACE.shock, c => clock(c, i % 2 ? -0.14 : 0.14, [0.35, 0.7, 1][i]))));
  k.add('ra', 2, f({}, FACE.shock, ring(1))); k.add('rb', 2, f({}, FACE.shock, ring(0)));
  for (let i = 0; i < 2; i++) { k.add('ra', 2); k.add('rb', 2); }
  k.add('sa', 2, f({ ky: 0.98 }, SQ, ring(1))); k.add('sb', 2, f({ ky: 0.98 }, SQ, ring(0)));
  for (let i = 0; i < 3; i++) { k.add('sa', 2); k.add('sb', 2); }
  k.add('lift0', 2, f({}, SQ, ring(1), [170, 126]));
  k.add('lift1', 2, f({ ky: 1.03 }, SQ, ring(0), [182, 96]));
  k.add('lift2', 2, f({ ky: 1.04, rot: -0.04 }, SQ, ring(1), [184, 92]));
  k.add('slam', 2, f({ ky: 0.93, kx: 1.04, rot: 0.07 }, SQ, c => { flat(c); kit.puff(c, 172, 194, 0, 7); kit.puff(c, 218, 194, 1, 6); }, [190, 186]));
  k.add('flat', 14, f({ ky: 0.97, rot: 0.05 }, CALM, c => flat(c), [190, 186]));
  k.add('back0', 2, f({}, CALM, c => flat(c), [178, 162]));
  k.add('back1', 2, f({ dx: -11 }, CALM, c => flat(c, 0.6), [164, 158]));
  k.add('back2', 2, f({ dx: 0 }, CALM, c => flat(c, 0.3)));
  k.done();
})();
