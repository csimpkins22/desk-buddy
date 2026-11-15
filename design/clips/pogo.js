// Pogo: he hops on a pogo stick, each bounce higher, and on the last the stick stays stuck in the floor without him.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('pogo'), { CREAM, RED, GREY } = kit;
  const stick = (c, h, s, { tilt = 0, a = 1 } = {}) => kit.fade(c, a, () => {
    c.save(); c.translate(128, 201 - h); c.rotate(tilt); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); [1, 2, 3].forEach(i => c.lineTo(i % 2 ? 6 : -6, -s * i / 4)); c.lineTo(0, -s); c.stroke();
    c.lineWidth = 2.4; c.fillStyle = RED; c.beginPath(); c.roundRect(-4, -s - 54, 8, 54, 3); c.fill(); c.stroke();
    c.fillStyle = GREY; c.beginPath(); c.roundRect(-26, -s - 7, 52, 7, 3); c.roundRect(-30, -s - 60, 60, 8, 4); c.fill(); c.stroke();
    c.restore();
  });
  const ride = (h, face, sq) => { const s = sq ? 10 : 18; return xf(D.N, { k: 0.85, dy: -(h + s + 6), ky: sq ? 0.9 : 1, kx: sq ? 1.06 : 1, shadowK: 1 - h / 90, face, extra: { front: c => stick(c, h, s) } }); };
  const free = (o, face, st) => xf(D.N, { k: 0.85, ...o, face, extra: { front: c => stick(c, -5, 18, st) } });

  k.add('on0', 2, xf(D.N, { k: 0.95, dy: -8, face: FACE.happy, extra: { front: c => stick(c, 0, 18, { a: 0.4 }) } }));
  k.add('on1', 2, xf(D.N, { k: 0.9, dy: -16, face: FACE.happy, extra: { front: c => stick(c, 0, 18, { a: 0.8 }) } }));
  k.add('ready', 6, ride(0, FACE.happy));
  [10, 24, 40].forEach((p, i) => {
    k.add('sq' + i, 2, ride(0, FACE.happy, true));
    k.add('up' + i, 2, ride(p * 0.6, FACE.happy));
    k.add('top' + i, 4, ride(p, i ? FACE.aah : FACE.happy));
    k.add('dn' + i, 2, ride(p * 0.6, FACE.happy));
  });
  k.add('sq3', 4, ride(0, FACE.happy, true));
  k.add('fly0', 2, free({ dy: -50, dx: -14, shadowK: 0.6 }, FACE.aah));
  k.add('fly1', 4, free({ dy: -74, dx: -32, shadowK: 0.3 }, FACE.shock, { tilt: 0.07 }));
  k.add('fly2', 2, free({ dy: -34, dx: -50, shadowK: 0.6 }, FACE.shock, { tilt: -0.07 }));
  k.add('land', 2, free({ dx: -62, ky: 0.86, kx: 1.08 }, FACE.shock, { tilt: 0.05 }));
  k.add('stuck0', 4, free({ dx: -62 }, FACE.lookr, { tilt: -0.04 }));
  k.add('stuck1', 12, free({ dx: -62 }, FACE.lookr));
  k.add('out0', 2, free({ dx: -42, k: 0.9 }, FACE.lookr, { a: 0.6 }));
  k.add('out1', 2, free({ dx: -20, k: 0.95 }, FACE.lookr, { a: 0.3 }));
  k.done();
})();
