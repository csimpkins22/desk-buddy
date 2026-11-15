// Seen from the floor he towers over us; he notices, leans over until his face fills the screen and blots it out, and when the light comes back he is his usual size.
(() => {
  const L = window.__lump, { D, xf } = L, kit = L.kit, k = kit.clip('ants_eye');
  const mix = (A, B, t) => A.map((p, i) => [p[0] + (B[i][0] - p[0]) * t, p[1] + (B[i][1] - p[1]) * t]);
  // his outline from below, point for point with the standing one: towering, leaning in, nearly on us, and covering the screen
  const S = {
    n: D.N.body,
    tower: [[10, 238], [80, 244], [160, 244], [230, 238], [222, 205], [204, 160], [184, 118], [166, 82], [150, 54], [128, 42], [106, 50], [92, 76], [76, 116], [58, 158], [38, 200], [18, 230]],
    lean: [[10, 238], [80, 244], [160, 244], [230, 238], [212, 214], [196, 190], [204, 150], [204, 96], [176, 44], [124, 22], [72, 40], [40, 92], [38, 148], [48, 190], [32, 214], [16, 232]],
    near: [[-10, 250], [80, 256], [160, 256], [250, 250], [246, 225], [240, 190], [252, 130], [244, 50], [196, -14], [120, -34], [44, -14], [-4, 50], [-12, 130], [0, 190], [-6, 225], [-10, 240]],
    full: D.N.body.map((_, i) => { const a = (135 - i * 22.5) * Math.PI / 180; return [120 + Math.cos(a) * 240, 120 + Math.sin(a) * 240]; }),
  };
  const C = {
    n: D.N.curl, tower: [[128, 43], [125, 36], [128, 31], [132, 33], [130, 37]], lean: [[124, 23], [116, 6], [122, -6], [134, -2], [130, 8]],
    near: [[120, -34], [110, -52], [118, -66], [130, -62], [126, -52]], full: [[120, -120], [110, -140], [118, -154], [130, -150], [126, -140]],
  };
  // eyes, their size, and the mouth: [x1, y1, x2, y2, r, mouth x, mouth y, half its width, its weight]
  const F = {
    n: [116, 110, 140, 108, 3.6, 128, 125, 8, 2.8], tower: [120, 62, 137, 61, 2.6, 128, 71, 5, 2.2], spot: [121, 67, 139, 66, 3.8, 130, 78, 3.5, 2.4],
    lean: [98, 92, 146, 90, 8, 122, 124, 15, 4], near: [70, 92, 172, 88, 17, 122, 168, 38, 7], full: [10, 70, 232, 62, 34, 120, 300, 60, 9],
  };
  const face = ([x1, y1, x2, y2, r, mx, my, mw, w]) => [['dot', x1, y1, r], ['dot', x2, y2, r],
    ...(r > 6 ? [['shine', x1 + r * 0.3, y1 - r * 0.35, r * 0.28], ['shine', x2 + r * 0.3, y2 - r * 0.35, r * 0.28]] : []),
    ['stroke', [[mx - mw, my - mw * 0.3], [mx, my + mw * 0.25], [mx + mw, my - mw * 0.35]], w]];
  const at = (a, b = a, t = 0, extra = {}) => ({ ...D.N, body: mix(S[a], S[b], t), curl: mix(C[a], C[b], t), face: face(F[a].map((v, i) => v + (F[b][i] - v) * t)), ...extra });

  k.add('drop0', 3, at('n', 'tower', 0.35));
  k.add('drop1', 2, at('n', 'tower', 0.7));
  k.add('tower', 6, at('tower'));
  k.add('spot', 6, at('tower', 'tower', 0, { face: face(F.spot), front: c => kit.mark(c, '!', 172, 62, 0.8) }));
  k.add('lean0', 2, at('tower', 'lean', 0.5));
  k.add('lean1', 2, at('lean'));
  k.add('lean2', 2, at('lean', 'near', 0.5));
  k.add('near', 6, at('near'));
  k.add('near2', 2, at('near', 'full', 0.5));
  [150, 90, 40].forEach((r, i) => k.add('blot' + i, 2, at('full', 'full', 0, { front: c => kit.iris(c, 120, 120, r) })));
  k.add('dark', 6, kit.gone({ front: c => { c.fillStyle = '#000000'; c.fillRect(0, 0, 240, 240); } }));
  [44, 104, 180].forEach((r, i) => k.add('light' + i, 2, xf(D.N, { face: kit.look(0, 0, 'smile'), extra: { front: c => kit.iris(c, 128, 116, r) } })));
  k.add('back', 4, xf(D.N, { face: kit.look(0, 0, 'smile') }));
  k.add('wink', 12, xf(D.N, { face: kit.faces.wink }));
  k.done();
})();
