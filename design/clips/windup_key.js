// Wind-up key: a key turns on his back as he marches; it slows, he droops mid-step, then one last twitch.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('windup_key'), { CREAM, YELLOW, TAU } = kit;
  const sleepy = [['stroke', [[110, 110], [116, 114], [122, 110]], 3], ['stroke', [[134, 108], [140, 112], [146, 108]], 3], ['stroke', [[122, 126], [134, 126]], 3]];
  const key = (o, ph, a) => c => kit.fade(c, a, () => {
    const [x, y] = kit.pt(o, [76, 150]), w = 4 + 9 * Math.abs(Math.cos(ph));
    c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 9; c.beginPath(); c.moveTo(x + 8, y); c.lineTo(x - 18, y); c.stroke();
    c.strokeStyle = YELLOW; c.lineWidth = 4; c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = YELLOW; c.beginPath(); c.ellipse(x - 28, y, w, 15, 0, 0, TAU); c.fill(); c.stroke();
  });
  const pose = (o, face, ph, a = 1) => xf(D.N, { ...o, face, extra: { back: key(o, ph, a) } });
  const droop = { dx: 14, rot: 0.1, ky: 0.9, kx: 1.05 };

  k.add('in0', 2, pose({ dx: 5 }, FACE.happy, 0, 0.4));
  k.add('in1', 2, pose({ dx: 10 }, FACE.happy, 0.4, 0.8));
  [2, 2, 2, 2, 2, 2, 4, 4, 6, 8].forEach((t, i) => k.add('m' + i, t, pose({ dx: 14, rot: i % 2 ? 0.07 : -0.07, dy: i % 2 ? -4 : 0 }, FACE.happy, 0.8 + i * 0.8)));
  k.add('sag', 2, pose({ dx: 14, rot: 0.08, ky: 0.95 }, sleepy, 8.4));
  k.add('droop', 12, pose(droop, sleepy, 8.4));
  k.add('twitch', 2, pose({ dx: 14, rot: -0.05, ky: 1.03, dy: -3 }, FACE.shock, 9.2));
  k.add('droop2', 12, pose(droop, sleepy, 9.2));
  k.add('out0', 2, pose({ dx: 10, ky: 0.95 }, sleepy, 9.2, 0.6));
  k.add('out1', 2, pose({ dx: 5 }, sleepy, 9.2, 0.3));
  k.done();
})();
