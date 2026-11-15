// A quiet one: he lies back, small in the corner of a wide night sky. Stars come out, a shooting star crosses slowly, and he shuts his eyes.
(() => {
  const { D, xf, mixHex, openPath, closedPath, kit } = window.__lump;
  const { CREAM, YELLOW, TAU } = kit, k = kit.clip('stargaze_b');
  const Z = 0.7, LIE = 1.25, SKY = '#0B1026', HILL = '#101C18';
  const sc = (X, Y) => [(X - 172) / Z + 128, (Y - 222) / Z + 201];     // a screen point in the wide view, as a scene point
  const cam = e => kit.view(1 + (Z - 1) * e, [128, 201], [128 + 44 * e, 201 + 21 * e]);
  // screen x, y and size, in the order they come out, three at a time; the big ones are sparkles
  const STARS = [[30, 40, 11], [112, 48, 3.2], [205, 50, 10], [70, 22, 3.2], [160, 26, 11], [20, 95, 3.2], [60, 75, 10], [140, 80, 3.2], [225, 100, 3.2],
                 [100, 104, 11], [185, 96, 3.2], [40, 140, 3.2], [85, 150, 10], [228, 22, 3.2], [14, 186, 3.2], [120, 130, 3.2], [190, 20, 10], [52, 112, 3.2]];
  const path = t => [-16 + 276 * t, 24 + 44 * t + 16 * t * t];
  // the sky: `full` groups of stars out and the next one `grow` of the way, everything eased in by e; shoot is how far the shooting star has got
  const sky = (full, grow, e, shoot, dim = 1) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = mixHex('#000000', SKY, e); c.fillRect(-140, -140, 400, 345);
    c.fillStyle = mixHex('#000000', HILL, e); closedPath(c, [[-150, 214], [-40, 206], [128, 203], [250, 207], [250, 246], [-150, 246]]); c.fill();
    c.globalAlpha = 0.5 * e; c.strokeStyle = CREAM; c.lineWidth = 2.4 / Z; openPath(c, [[-150, 214], [-40, 206], [128, 203], [250, 207]]); c.stroke(); c.globalAlpha = 1;
    STARS.forEach(([X, Y, s], i) => {
      const g = Math.floor(i / 3), a = (g < full ? 1 : g === full ? grow : 0) * dim; if (a <= 0.05) return;
      const [x, y] = sc(X, Y), r = s / Z * a * (s > 4 && Math.floor(seed + i) % 3 === 0 ? 0.75 : 1);
      if (s > 4) kit.sparkle(c, x, y, r, i % 2 ? CREAM : YELLOW); else { c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }
    });
    if (shoot !== undefined) {
      const P = [0, 0.05, 0.11, 0.18].map(b => sc(...path(shoot - b)));
      c.strokeStyle = CREAM; c.globalAlpha = 0.6; c.lineWidth = 3.4 / Z; openPath(c, [P[2], P[3]]); c.stroke();
      c.globalAlpha = 1; c.lineWidth = 6 / Z; openPath(c, [P[0], P[1], P[2]]); c.stroke();
      kit.sparkle(c, P[0][0], P[0][1], 13 / Z, YELLOW);
    }
    c.restore();
  };
  // eyes turned toward a screen point, allowing for how far over he is lying
  const gaze = ([X, Y], mouth = 'smile') => { const a = Math.atan2(Y - 170, X - 186) - LIE; return kit.look(7 * Math.cos(a), 6 * Math.sin(a), mouth, 5.4); };
  const smile = ['stroke', [[120, 123], [128, 128], [136, 123]], 3.4];
  const half = [['dot', 112, 111, 3.4], ['dot', 136, 109, 3.4], ['stroke', [[105, 106], [119, 107]], 3.8], ['stroke', [[129, 104], [143, 105]], 3.8], smile];
  const shut = [['stroke', [[108, 109], [116, 113], [124, 109]], 4.2], ['stroke', [[132, 107], [140, 111], [148, 107]], 4.2], smile];
  const lie = (rot, face, e, back, base = D.N) => xf(base, { ...(base === D.N ? kit.tip(rot, { dy: Math.min(10, 10 * rot / LIE) }) : {}), face, extra: { view: cam(e), back } });

  kit.steps(0, 1, 7).slice(1).forEach((e, i) => k.add('in' + i, 2, lie(LIE * e, kit.look(-5 * e, -4 * e, 'smile', 4 + 1.4 * e), e, sky(0, 0, e))));
  for (let g = 0; g < 6; g++) {
    const face = gaze(STARS[g * 3]);
    k.add('s' + g + 'a', 2, lie(LIE, face, 1, sky(g, 0.4, 1)));
    k.add('s' + g + 'b', 2, lie(LIE, face, 1, sky(g, 0.75, 1)));
    k.add('s' + g, 12, lie(LIE, face, 1, sky(g + 1, 0, 1)));
  }
  for (let i = 0; i < 40; i++) k.add('fall' + i, 2, lie(LIE, gaze(path(i / 39)), 1, sky(6, 0, 1, i / 39 * 1.12)));
  k.add('after', 14, lie(LIE, gaze([250, 96]), 1, sky(6, 0, 1)));
  k.add('half', 4, lie(LIE, half, 1, sky(6, 0, 1)));
  k.add('shut', 30, lie(LIE, shut, 1, sky(6, 0, 1)));
  kit.steps(1, 0, 7).slice(1).forEach((e, i) => k.add('out' + i, 2, i < 2 ? lie(LIE + 0.15 * (i + 1), shut, e, sky(6, 0, e, undefined, e))
    : lie(0, undefined, e, sky(6, 0, e, undefined, e), i < 4 ? D.T2 : D.S1)));
  k.done({ doze: false });
})();
