// Snorkel: water rises up the screen; he puts on a mask and snorkel, a small fish swims past, and he waves at it.
(() => {
  const { D, xf, FACE, kit, boil, openPath } = window.__lump, k = kit.clip('snorkel'), { CREAM, BLUE, YELLOW, RED, DARK, TAU } = kit;
  const water = (c, y, seed) => {
    if (y >= 240) return;
    c.save(); c.globalAlpha = 0.28; c.fillStyle = BLUE; c.fillRect(0, y, 240, 240 - y); c.globalAlpha = 0.8;
    c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    openPath(c, boil([0, 40, 80, 120, 160, 200, 240].map((x, i) => [x, y + (i % 2 ? 3 : -3)]), seed, 1.5)); c.stroke(); c.restore();
  };
  const mask = (c, a) => kit.fade(c, a, () => {
    c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(134, 127); c.quadraticCurveTo(172, 130, 172, 100); c.lineTo(172, 60);
    c.strokeStyle = CREAM; c.lineWidth = 10; c.stroke(); c.strokeStyle = YELLOW; c.lineWidth = 5; c.stroke();
    c.strokeStyle = RED; c.beginPath(); c.moveTo(172, 70); c.lineTo(172, 60); c.stroke();
    c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2.8; c.beginPath(); c.roundRect(100, 96, 56, 26, 10); c.fill(); c.stroke();
    c.fillStyle = DARK; [[116, 110], [140, 108]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 3.6, 0, TAU); c.fill(); });
  });
  const fish = (c, x, y) => {
    c.save(); c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = RED; c.beginPath(); c.moveTo(x + 12, y); c.lineTo(x + 26, y - 9); c.lineTo(x + 26, y + 9); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.ellipse(x, y, 15, 9, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = DARK; c.beginPath(); c.arc(x - 7, y - 2, 2.4, 0, TAU); c.fill(); c.restore();
  };
  const f = (face, lvl, m, fx, hand) => xf(D.N, { face, extra: { ...(hand ? { arm2: [[166, 140], hand] } : {}),
    front: (c, d, seed) => { if (m) mask(c, m); if (fx !== undefined) fish(c, fx, 160); water(c, lvl, seed); } } });
  const wave = i => i % 2 ? [200, 112] : [204, 126];

  kit.steps(236, 92, 7).forEach((y, i) => k.add('rise' + i, 2, f(i < 2 ? FACE.lookr : FACE.shock, y)));
  [0.35, 0.7, 1].forEach((a, i) => k.add('mask' + i, 2, f(FACE.happy, 92, a)));
  k.add('ready', 4, f(FACE.happy, 92, 1));
  for (let i = 0; i < 13; i++) k.add('fish' + i, 2, f(FACE.happy, 92, 1, 256 - i * 23.5, i ? wave(i) : [190, 148]));
  k.add('bye0', 4, f(FACE.happy, 92, 1, undefined, wave(1))); k.add('bye1', 4, f(FACE.happy, 92, 1, undefined, wave(0)));
  k.add('glad', 6, f(FACE.happy, 92, 1, undefined, [190, 148]));
  kit.steps(92, 240, 4).forEach((y, i) => k.add('drain' + i, 2, f(FACE.happy, y, 1 - i / 3)));
  k.done();
})();
