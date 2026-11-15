// Bee: a bee loops round him, lands on his nose, and he goes cross-eyed and perfectly still until it leaves.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('bee'), { CREAM, YELLOW, DARK, WHITE, TAU } = kit;
  const lookl = [['dot', 108, 110, 3.8], ['dot', 132, 108, 3.8], ['stroke', [[120, 124], [125, 126], [130, 124]], 2.6]];
  const cross = [['dot', 121, 109, 4.2], ['dot', 135, 108, 4.2]];
  const bee = (x, y, flap, a = 1) => c => kit.fade(c, a, () => {
    c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM;
    if (flap >= 0) {
      c.lineWidth = 2; c.fillStyle = WHITE;
      c.beginPath(); c.ellipse(x - 5, y - 9, 5, flap ? 8 : 5, -0.4, 0, TAU); c.fill(); c.stroke();
      c.beginPath(); c.ellipse(x + 5, y - 9, 5, flap ? 8 : 5, 0.4, 0, TAU); c.fill(); c.stroke();
    }
    c.lineWidth = 2.4; c.fillStyle = YELLOW; c.beginPath(); c.ellipse(x, y, 11, 8, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = DARK; c.lineWidth = 3.2; c.beginPath(); c.moveTo(x - 3, y - 5); c.lineTo(x - 3, y + 5); c.moveTo(x + 4, y - 5); c.lineTo(x + 4, y + 5); c.stroke();
  });
  const sc = (o, face, b) => xf(D.N, { ...o, face, extra: { front: b } });
  const loop = i => { const t = -Math.PI / 2 + i * TAU / 10; return [128 + 76 * Math.cos(t), 112 + 56 * Math.sin(t)]; };

  for (let i = 0; i < 10; i++) { const [x, y] = loop(i); k.add('loop' + i, 2, sc({}, y < 70 ? FACE.lookup : x > 128 ? FACE.lookr : lookl, bee(x, y, i % 2, i === 0 ? 0.4 : i === 1 ? 0.8 : 1))); }
  k.add('top', 2, sc({}, FACE.lookup, bee(128, 56, 0)));
  for (let i = 1; i < 6; i++) k.add('loop' + i, 2);
  k.add('near0', 2, sc({}, FACE.shock, bee(128, 152, 1)));
  k.add('near1', 2, sc({ ky: 1.02 }, FACE.shock, bee(128, 136, 0)));
  k.add('still', 18, sc({ ky: 0.98 }, cross, bee(128, 124, -1)));
  k.add('off0', 2, sc({ ky: 0.98 }, cross, bee(140, 112, 1)));
  k.add('off1', 2, sc({}, FACE.lookr, bee(176, 78, 0)));
  k.add('off2', 2, sc({}, FACE.lookr, bee(210, 42, 1, 0.5)));
  k.add('phew', 8, sc({ ky: 0.95, kx: 1.04 }, FACE.puff));
  k.add('ok', 2, sc({}, FACE.happy));
  k.done();
})();
