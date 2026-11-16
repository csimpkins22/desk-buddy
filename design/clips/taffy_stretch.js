// Taffy stretch: two gloved hands take him by the sides and pull him long and thin. They let go, he twangs back, and his cowlick stays stretched.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const lookl = [['dot',109,110,3.8], ['dot',133,108,3.8], ['stroke',[[119,124],[124,126],[129,124]],2.6]];
  const strain = [...FACE.chooEyes, ['stroke',[[119,126],[124,123],[129,126],[134,123],[138,126]],2.8]];
  // the hands, gripping at x = l and x = r; an arm runs from each to its edge of the screen
  const hands = (l, r) => c => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    [[l, -1], [r, 1]].forEach(([x, s]) => {
      c.strokeStyle = '#9FB0C4'; c.lineWidth = 10; c.beginPath(); c.moveTo(x + s * 14, 152); c.lineTo(x + s * 150, 152); c.stroke();
      c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
      c.beginPath(); c.ellipse(x - s * 2, 132, 6, 9, s * 0.5, 0, Math.PI * 2); c.fill(); c.stroke();
      c.beginPath(); c.roundRect(x - 13, 135, 26, 34, 11); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(x + s * 13, 141); c.lineTo(x + s * 13, 163); c.stroke();
    });
    c.restore();
  };
  // pulled to s times his width: lower, and thinnest in the middle, where he sags
  const pull = (s, face, dy = 0) => {
    const T = ([x, y]) => [128 + (x - 128) * s, 201 + dy - (201 - y) * Math.pow(s, -0.6) * (1 - (s - 1) * 0.75 * Math.exp(-(((x - 128) / 30) ** 2)))];
    return { ...D.N, body: D.N.body.map(T), curl: D.N.curl.map(T), face: face.map(mk => mk[0] === 'dot' ? ['dot', ...T([mk[1], mk[2]]), mk[3]] : [mk[0], mk[1].map(T), mk[2]]),
      shadow: [128, 60 * s], front: hands(128 - 60 * s - 4, 128 + 59 * s + 4) };
  };
  const twang = k => (c, _, seed) => {                  // the air shaking either side of him
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.6; c.lineCap = 'round'; c.globalAlpha = 0.75;
    [-1, 1].forEach(s => [0, 1].forEach(i => { const x = 128 + s * (66 * k + 12 + i * 11); c.beginPath(); c.moveTo(x, 104 + i * 14); c.quadraticCurveTo(x + s * 7, 140, x, 176 - i * 14); c.stroke(); }));
    c.restore();
  };
  D.taffy_stretch_1 = xf(D.N, { face: lookl, extra: { front: hands(18, 238) } });
  D.taffy_stretch_2 = xf(D.N, { face: FACE.lookr, extra: { front: hands(42, 214) } });
  D.taffy_stretch_3 = xf(D.N, { kx: 0.92, ky: 1.04, face: FACE.shock, extra: { front: hands(69, 187), fxm: 'alert', fx: [150, 50] } });
  [1.12, 1.26, 1.4, 1.52, 1.6].forEach((s, i) => { D['taffy_stretch_p' + i] = pull(s, i ? strain : FACE.shock); });
  D.taffy_stretch_4 = pull(1.63, strain, 1);
  D.taffy_stretch_5 = xf(D.N, { kx: 0.7, ky: 1.26, face: FACE.shock, extra: { front: (c, d, seed) => { hands(-2, 258)(c); twang(0.7)(c, d, seed); } } });
  [[1.3, 0.8], [0.84, 1.14], [1.13, 0.91], [0.94, 1.05]].forEach(([kx, ky], i) => { D['taffy_stretch_t' + i] = xf(D.N, { kx, ky, face: FACE.spiral, extra: { front: twang(kx) } }); });
  const limp = { curl: [[128, 71], [124, 50], [130, 30], [146, 24], [160, 34], [164, 52], [160, 64]] };
  D.taffy_stretch_6 = { ...xf(D.N, { rot: -0.05, face: FACE.spiral }), ...limp };
  D.taffy_stretch_7 = { ...xf(D.N, { rot: 0.05, face: FACE.spiral }), curl: limp.curl.map(([x, y]) => [x + 6, y]) };
  D.taffy_stretch_8 = { ...xf(D.N, { face: [['dot',122,103,3.8], ['dot',146,101,3.8], ['stroke',[[125,122],[131,121],[137,122]],2.6]] }), ...limp };
  D.taffy_stretch_9 = { ...xf(D.N, { ky: 0.96, face: FACE.sheep }), curl: [[128, 76], [120, 62], [126, 48], [138, 50], [136, 60]] };
  const each = (p, n, t) => Array.from({ length: n }, (_, i) => [p + i, t]);
  CLIPS.taffy_stretch = { home: 'idle', seq: [...WAKE, ['taffy_stretch_1', 4], ['taffy_stretch_2', 4], ['taffy_stretch_3', 6], ...each('taffy_stretch_p', 5, 3),
    ['taffy_stretch_4', 2], ['taffy_stretch_p4', 2], ['taffy_stretch_4', 2], ['taffy_stretch_p4', 2], ['taffy_stretch_4', 2], ['taffy_stretch_p4', 2], ['taffy_stretch_5', 2], ...each('taffy_stretch_t', 4, 2),
    ['taffy_stretch_6', 3], ['taffy_stretch_7', 3], ['taffy_stretch_6', 3], ['taffy_stretch_7', 3], ['taffy_stretch_8', 9], ['taffy_stretch_9', 2], ['N', 5], ...DOZE] };
})();
