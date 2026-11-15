// Stargaze: he leans back under a night sky, a shooting star crosses, and he squeezes his eyes shut to wish.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('stargaze'), { CREAM, YELLOW } = kit;
  const wish = [...FACE.chooEyes, ['stroke', [[122, 123], [128, 126], [134, 123]], 3]];
  const sky = (a, s) => c => {
    kit.fade(c, a, () => [[30, 40], [76, 24], [150, 34], [206, 56], [36, 100], [214, 124]].forEach(([x, y], i) => kit.sparkle(c, x, y, 6 + (i % 3) * 2, i % 2 ? YELLOW : CREAM)));
    if (s === undefined) return;
    const x = 250 - s * 270, y = 16 + s * 34;
    c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 4; c.globalAlpha = 0.6;
    c.beginPath(); c.moveTo(x + 36, y - 5); c.lineTo(x + 8, y - 1); c.stroke(); c.restore();
    kit.sparkle(c, x, y, 12, YELLOW);
  };
  const sc = (o, face, a = 1, s) => xf(D.N, { ...o, face, extra: { back: sky(a, s) } });
  const lean = { rot: -0.16, dx: 10 };

  k.add('in0', 2, sc({}, FACE.lookup, 0.3));
  k.add('in1', 2, sc({}, FACE.lookup, 0.65));
  k.add('gaze', 6, sc({}, FACE.lookup));
  k.add('lean0', 2, sc({ rot: -0.08, dx: 5 }, FACE.lookup));
  k.add('lean', 12, sc(lean, FACE.lookup));
  for (let i = 0; i < 7; i++) k.add('star' + i, 2, sc(i > 2 ? { ...lean, ky: 1.03 } : lean, i > 2 ? FACE.shock : FACE.lookup, 1, i / 6));
  k.add('shut0', 2, sc({ ...lean, ky: 0.97 }, wish));
  k.add('wish', 16, sc({ rot: -0.1, dx: 6, ky: 0.93, kx: 1.05 }, wish));
  k.add('open', 8, sc({ ky: 1.02 }, FACE.happy));
  k.add('out0', 2, sc({}, FACE.happy, 0.6));
  k.add('out1', 2, sc({}, FACE.happy, 0.3));
  k.done();
})();
