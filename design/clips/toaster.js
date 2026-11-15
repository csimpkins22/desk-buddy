// Toaster: he waits by a toaster, taps his side impatiently, and the toast launches and lands on his head.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('toaster');
  const toast = (c, x, y, rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.4;
    c.fillStyle = '#D9A441'; c.beginPath(); c.roundRect(-11, -10, 22, 20, 4); c.fill(); c.stroke();
    c.fillStyle = '#A8742A'; c.fillRect(-6, -5, 12, 10);
    c.restore();
  };
  const scene = (c, seed, a, t, up) => kit.fade(c, a, () => {
    kit.table(c, 190, seed, { w: 64 });
    toast(c, ...t);
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.fillStyle = kit.CREAM; c.fillRect(211, up ? 144 : 154, 8, 5);
    c.fillStyle = kit.GREY; c.beginPath(); c.roundRect(168, 138, 44, 27, 6); c.fill(); c.stroke();
    c.strokeStyle = kit.DARK; c.lineWidth = 4; c.beginPath(); c.moveTo(178, 143); c.lineTo(202, 143); c.stroke();
    c.restore();
  });
  const IN = [190, 153, 0];
  const T = (o, { a = 1, t = IN, up = false, tap } = {}) => {
    const p = { dx: -34, ...o };
    return xf(D.N, { ...p, extra: { ...(tap ? { arm: [kit.pt(p, [90, 140]), tap] } : {}), front: (c, d, seed) => scene(c, seed, a, t, up) } });
  };

  [0.3, 0.65, 1].forEach((a, i) => k.add('in' + i, 2, T({ face: FACE.lookr }, { a })));
  k.add('wait', 6, T({ face: FACE.lookr }));
  k.add('t0', 2, T({ face: FACE.grump }, { tap: [44, 168] }));
  k.add('t1', 2, T({ face: FACE.grump }, { tap: [34, 156] }));
  for (let i = 0; i < 3; i++) { k.add('t0', 2); k.add('t1', 2); }
  k.add('wait2', 4, T({ face: FACE.grump }, { tap: [44, 168] }));
  [[190, 122, 0], [188, 86, 0.3], [180, 52, 0.8], [160, 30, 1.4], [130, 26, 2.2], [106, 42, 2.8]].forEach((t, i) =>
    k.add('pop' + i, 2, T({ face: i ? FACE.lookup : FACE.shock, ky: i ? 1 : 1.05 }, { t, up: true })));
  k.add('land', 2, T({ face: FACE.shock, ky: 0.93, kx: 1.04 }, { t: [95, 70, 3.3], up: true }));
  k.add('hat', 14, T({ face: FACE.happy }, { t: [94, 62, 3.3], up: true }));
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, T({ face: FACE.happy }, { a, t: [94, 62, 3.3], up: true })));
  k.done();
})();
