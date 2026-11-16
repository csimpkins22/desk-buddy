// A quiet night, seen from far off: he sits small by a little fire under a few stars, warms his nubs, yawns, leans, and falls asleep beside it as it burns low.
// group: scenes
(() => {
  const { D, xf, boil, closedPath, kit } = window.__lump, { TAU } = kit;
  const k = kit.clip('campfire');
  const cam = t => kit.view(1 - 0.4 * t, [128, 201], [128 - 8 * t, 201 - t]), wide = cam(1), X = 150, HIM = -94;
  const STARS = [[-40, -96], [40, -60], [120, -108], [210, -70], [290, -100], [252, -18]];

  // the night: stars, two crossed logs and a flame of the given size (0 is unlit) with sparks climbing off it
  const night = (c, seed, tick, size, logs = 1, stars = true) => {
    if (stars) STARS.forEach(([x, y], i) => kit.sparkle(c, x, y, i % 2 ? 13 : 17));
    if (logs <= 0) return;
    c.save(); c.globalAlpha = logs; c.lineCap = c.lineJoin = 'round';
    [[kit.CREAM, 15], [kit.BROWN, 9]].forEach(([col, w]) => {
      c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(X - 26, 197); c.lineTo(X + 22, 187); c.moveTo(X + 26, 197); c.lineTo(X - 22, 187); c.stroke();
    });
    c.globalAlpha = 1;
    if (size > 0) {
      const flame = (s, col, line) => {
        closedPath(c, boil([[X - 17 * s, 188], [X - 13 * s, 188 - 22 * s], [X, 188 - 50 * s], [X + 13 * s, 188 - 22 * s], [X + 17 * s, 188]], seed, 6 * s));
        c.fillStyle = col; c.fill(); if (line) { c.strokeStyle = kit.CREAM; c.lineWidth = 4; c.stroke(); }
      };
      flame(size, kit.RED, true); flame(size * 0.55, kit.YELLOW);
      const ph = Math.floor(tick / 2) % 6; c.fillStyle = kit.YELLOW;
      for (let j = 0; j < (size > 0.7 ? 3 : size > 0.3 ? 1 : 0); j++) {
        const step = (ph + j * 2) % 6;
        c.beginPath(); c.arc(X + [-11, 9, -2][j] + (step % 2 ? 4 : -4), 174 - 50 * size - step * 13, 6.5 - step * 0.7, 0, TAU); c.fill();
      }
    }
    c.restore();
  };
  const set = (size, more = {}) => ({ view: wide, back: (c, d, seed, tick) => night(c, seed, tick, size), ...more });
  const sit = { dx: HIM, ky: 0.93, kx: 1.04 };

  kit.steps(0, 1, 6).forEach((t, i) => k.add('out' + i, 2, xf(D.N, { dx: HIM * t, rot: i % 2 ? 0.05 : -0.05, face: kit.look(-4, 0),
    extra: { view: cam(t), back: (c, d, seed, tick) => night(c, seed, tick, 0, (t - 0.4) / 0.6, t > 0.3) } })));
  [0.15, 0.4, 0.75, 1].forEach((s, i) => k.add('light' + i, 4, xf(D.N, { ...sit, face: kit.look(5, 2, i < 2 ? 'o' : 'smile'), extra: set(s) })));
  k.add('sit', 30, xf(D.N, { ...sit, face: kit.look(5, 2, 'smile'), extra: set(1) }));

  // warming his nubs: the near one held out to the fire, the far one peeping out from behind him
  const warm = (name, lift) => {
    const o = { ...sit, rot: 0.07 }, sh = kit.pt(o, [166, 140]), far = kit.pt(o, [150, 154]);
    k.add(name, 6, xf(D.N, { ...o, face: kit.look(5, 3, 'smile'), extra: { view: wide, arm2: [sh, [sh[0] + 34, sh[1] - 6 - lift]],
      back: (c, d, seed, tick) => { night(c, seed, tick, 1); kit.arm(c, [far, [far[0] + 54, far[1] - 2 + lift]], seed); } } }));
  };
  warm('warm0', 0); warm('warm1', 6); k.add('warm0', 6); k.add('warm1', 6);
  k.add('content', 20, xf(D.N, { ...sit, face: kit.faces.closed, extra: set(1) }));

  const yawn = [['stroke', [[109, 108], [116, 104], [123, 108]], 3], ['stroke', [[133, 106], [140, 102], [147, 106]], 3], ['mouth', [[116, 114], [140, 113], [143, 132], [128, 141], [113, 132]], [128, 136, 8, 5]]];
  k.add('yawn0', 4, xf(D.N, { ...sit, face: kit.look(0, -2, 'o'), extra: set(1) }));
  k.add('yawn1', 14, xf(D.N, { dx: HIM, ky: 1.06, kx: 0.98, face: yawn, extra: set(1) }));
  k.add('heavy', 16, xf(D.N, { ...sit, face: D.Y3.face, extra: set(1) }));
  k.add('lean0', 8, xf(D.N, { ...sit, rot: 0.14, face: D.Y3.face, extra: set(1) }));
  k.add('lean1', 8, xf(D.T1, { dx: HIM, rot: 0.1, extra: set(1) }));
  k.add('lean2', 8, xf(D.T2, { dx: HIM, extra: set(0.9) }));
  [[0.8, 12], [0.62, 12], [0.5, 12], [0.4, 28]].forEach(([s, ticks], i) => k.add('asleep' + i, ticks, xf(D.S1, { dx: HIM, extra: set(s, { fxm: 'idle' }) })));
  k.done({ doze: false });
})();
