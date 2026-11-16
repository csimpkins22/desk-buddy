// Asleep with an alarm clock by his tail: it rings, one nub comes up and over and flattens it without his eyes opening, and a spring and a cog roll away.
// group: scenes
(() => {
  const { D, CLIPS, xf, kit } = window.__lump;
  const NAME = 'alarm_clock', k = kit.clip(NAME, { asleep: true }), X = 48, TAU = kit.TAU;
  const ink = (c, w = 3) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = w; };
  const disc = (c, x, y, rx, ry, colour) => { c.fillStyle = colour; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fill(); c.stroke(); };

  // the clock standing on the floor at X: tilted by rot, with ring marks 1 or 2 when it is going off
  const clock = (c, rot = 0, ring = 0) => {
    c.save(); c.translate(X, 203); c.rotate(rot); ink(c);
    c.beginPath(); c.moveTo(-10, -10); c.lineTo(-15, 0); c.moveTo(10, -10); c.lineTo(15, 0); c.stroke();
    [-1, 1].forEach(s => { c.fillStyle = kit.YELLOW; c.beginPath(); c.arc(s * 13, -43 - (ring && s * (ring === 1 ? 2 : -2)), 9, Math.PI, TAU); c.closePath(); c.fill(); c.stroke(); });
    c.beginPath(); c.moveTo(0, -46); c.lineTo(ring === 1 ? -5 : ring === 2 ? 5 : 0, -54); c.stroke();
    disc(c, 0, -26, 21, 21, kit.RED); c.lineWidth = 2; disc(c, 0, -26, 15, 15, kit.WHITE);
    c.strokeStyle = kit.DARK; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -36); c.lineTo(0, -26); c.lineTo(8, -22); c.stroke();
    if (ring) {
      const L = ring === 1 ? 9 : 5; ink(c);
      c.beginPath(); [[-27, -52, -1, -0.7], [0, -62, 0, -1], [27, -52, 1, -0.7]].forEach(([x, y, ux, uy]) => { c.moveTo(x, y); c.lineTo(x + ux * L, y + uy * L); }); c.stroke();
    }
    c.restore();
  };
  // squashed: h 0.5 on the way down, 0 flat on the floor
  const squashed = (c, h) => {
    c.save(); ink(c);
    const ry = 6 + h * 14, rx = 27 - h * 8, y = 203 - ry;
    [-1, 1].forEach(s => disc(c, X + s * (rx + 2), y + 2 - h * 10, 8 - h * 2, 4 + h * 3, kit.YELLOW));
    disc(c, X, y, rx, ry, kit.RED); c.lineWidth = 2; disc(c, X, y - 1, rx - 7, Math.max(2.5, ry - 4), kit.WHITE);
    c.restore();
  };
  const bang = c => { c.save(); ink(c); c.beginPath(); [[-38, -14, -13, -9], [-26, -26, -7, -13], [38, -14, 13, -9], [26, -26, 7, -13]].forEach(([x, y, ux, uy]) => { c.moveTo(X + x, 203 + y); c.lineTo(X + x + ux, 203 + y + uy); }); c.stroke(); c.restore(); };
  const spring = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = kit.GREY; c.lineWidth = 3.5;
    c.beginPath(); c.moveTo(-15, 7); [[-10, -7], [-5, 7], [0, -7], [5, 7], [10, -7], [15, 7]].forEach(([px, py]) => c.lineTo(px, py)); c.stroke(); c.restore();
  };
  const cog = (c, x) => {
    c.save(); c.translate(x, 191); c.rotate(x / 11); ink(c, 2.6); c.fillStyle = kit.YELLOW;
    c.beginPath(); for (let i = 0; i < 32; i++) { const r = i % 4 < 2 ? 12.5 : 8, t = (i + 0.5) / 32 * TAU; i ? c.lineTo(Math.cos(t) * r, Math.sin(t) * r) : c.moveTo(Math.cos(t) * r, Math.sin(t) * r); } c.closePath(); c.fill(); c.stroke();
    c.fillStyle = kit.DARK; c.beginPath(); c.arc(0, 0, 3.6, 0, TAU); c.fill(); c.restore();
  };

  const SH = [86, 160], FROWN = [...D.S1.face, ['stroke', [[164, 160], [177, 157]], 2.8]];
  const asleep = (base, front, o = {}, extra = {}) => xf(base, { ...o, extra: { front, ...extra } });

  // already there when the clip starts
  D[NAME + '_pre'] = asleep(D.S1, c => clock(c), {}, { fxm: 'idle' });
  k.add('rest', 8, asleep(D.S2, c => clock(c), {}, { fxm: 'idle' }));

  // it rings and rattles; he scowls in his sleep, and a nub comes up
  const ringing = (n, arm) => asleep(D.S1, c => clock(c, n % 2 ? 0.14 : -0.14, 1 + n % 2), { ky: n % 2 ? 1 : 1.04, face: FROWN }, arm ? { arm: [SH, arm] } : {});
  k.add('ra', 2, ringing(0)); k.add('rb', 2, ringing(1));
  for (let n = 0; n < 3; n++) { k.add('ra', 2); k.add('rb', 2); }
  [[88, 130], [70, 114], [56, 108]].forEach((hand, n) => k.add('up' + n, 2, ringing(n, hand)));

  // and over, flat on top of it
  k.add('half', 2, asleep(D.S1, c => squashed(c, 0.5), { face: FROWN }, { arm: [SH, [50, 168]] }));
  const HANDS = [[49, 187], [49, 187], [49, 187], [49, 187], [49, 187], [60, 178], [75, 168]];
  const SPRING = [[42, 166], [34, 138], [24, 118], [11, 114], [-3, 126], [-18, 150]];
  for (let n = 0; n < 13; n++) {
    const a = n < 9 ? 1 : n < 10 ? 0.66 : n < 11 ? 0.33 : 0;
    k.add('flat' + n, 2, asleep(n % 4 < 2 ? D.S1 : D.S2, c => {
      if (a) kit.fade(c, a, () => squashed(c, 0));
      if (!n) bang(c);
      if (SPRING[n]) spring(c, ...SPRING[n], n * 0.9);
      if (n < 11) cog(c, 60 + 20 * n);
    }, {}, { ...(HANDS[n] ? { arm: [SH, HANDS[n]] } : {}), ...(n > 6 ? { fxm: 'idle' } : {}) }));
  }
  k.done();
  CLIPS[NAME].seq[0] = [NAME + '_pre', 3];
})();
