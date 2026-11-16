// Merge conflict: two arrows grab a hand each and tug him wider and wider, until he snaps back and is left dizzy.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', K = 0.8, CX = 120;
  const lookl = [['dot',108,110,3.8], ['dot',132,108,3.8], ['stroke',[[116,124],[121,126],[126,124]],2.6]];
  const strain = [...FACE.chooEyes, ['stroke',[[119,126],[123,123],[127,126],[131,123],[135,126]],2.6]];
  // an arrow each side, its tail at `reach` from his middle, pointing away from him
  const arrows = (reach, y) => (c, d, seed) => {
    c.save(); c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    [[-1, '#5AB8FF'], [1, '#58D68D']].forEach(([s, colour]) => {
      const x = CX + s * reach, len = Math.max(20, Math.min(46, 114 - reach)), neck = x + s * (len - 17);
      c.fillStyle = colour; c.beginPath();
      [[x, -6], [neck, -6], [neck, -16], [x + s * len, 0], [neck, 16], [neck, 6], [x, 6]].forEach(([px, py], i) => i ? c.lineTo(px, y + py) : c.moveTo(px, y + py));
      c.closePath(); c.fill(); c.stroke();
    });
    c.restore();
  };
  // wide: how far he is stretched. lean: which arrow is winning.
  const pulled = (wide, lean, face, more) => {
    const ky = 1 - (wide - 1) * 0.3, half = 48 * wide, y = 201 - 61 * K * ky, x = CX + lean;
    return xf(D.N, { k: K, kx: wide, ky, dx: x - 128, face, extra: { arm: [[x - half + 12, y], [x - half - 12, y]], arm2: [[x + half - 12, y], [x + half + 12, y]], front: arrows(half + 16, y), ...more } });
  };
  const sprung = (kx, ky, face, more) => xf(D.N, { k: K, kx, ky, dx: CX - 128, face, extra: more });
  D.merge_conflict_in = xf(D.N, { k: 0.9, dx: -4 });
  D.merge_conflict_l = pulled(1, 0, lookl);
  D.merge_conflict_r = pulled(1, 0, FACE.lookr);
  [[1.08, -7], [1.14, 7], [1.22, -6], [1.3, 6], [1.38, -4], [1.46, 4]].forEach(([wide, lean], i) => { D['merge_conflict_t' + i] = pulled(wide, lean, i < 2 ? FACE.shock : strain); });
  D.merge_conflict_m0 = pulled(1.52, -2, strain);
  D.merge_conflict_m1 = pulled(1.52, 2, strain);
  D.merge_conflict_s0 = sprung(0.7, 1.24, FACE.shock, { front: arrows(108, 150), fxm: 'alert', fx: [150, 70] });
  D.merge_conflict_s1 = sprung(1.22, 0.86, FACE.spiral);
  D.merge_conflict_s2 = sprung(0.88, 1.1, FACE.spiral);
  D.merge_conflict_s3 = sprung(1.07, 0.96, FACE.spiral);
  D.merge_conflict_d0 = xf(D.N, { k: K, dx: CX - 128, rot: -0.05, face: FACE.spiral, extra: { fxm: 'oops', fx: [CX, 78] } });
  D.merge_conflict_d1 = xf(D.N, { k: K, dx: CX - 128, rot: 0.05, face: FACE.spiral, extra: { fxm: 'oops', fx: [CX, 78] } });
  const s = (id, n) => ['merge_conflict_' + id, n];
  CLIPS.merge_conflict = { home: 'idle', seq: [...WAKE, s('in', 2), s('l', 7), s('r', 7), s('t0', 4), s('t1', 4), s('t2', 3), s('t3', 3), s('t4', 3), s('t5', 3),
    s('m0', 2), s('m1', 2), s('m0', 2), s('m1', 2), s('m0', 2), s('m1', 2), s('s0', 2), s('s1', 2), s('s2', 2), s('s3', 2),
    s('d0', 5), s('d1', 5), s('d0', 5), s('d1', 5), s('in', 2), ...DOZE] };
})();
