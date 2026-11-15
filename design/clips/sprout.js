// Sprout: he waters a seedling from a can; it grows into a tall flower in three stages and the flower nods at him.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('sprout'), { CREAM, RED, BLUE, YELLOW, GREEN, GREY, BROWN, TAU } = kit;
  const can = (c, tilt, a, f) => kit.fade(c, a, () => {
    c.save(); c.translate(160, 132); c.rotate(tilt); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    c.lineWidth = 6; c.beginPath(); c.moveTo(12, 4); c.lineTo(30, -10); c.stroke();
    c.lineWidth = 2.6; c.beginPath(); c.arc(-14, 0, 8, Math.PI / 2, Math.PI * 1.5); c.stroke();
    c.fillStyle = GREY; c.beginPath(); c.roundRect(-14, -12, 28, 24, 4); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.fillRect(-12.5, -3, 25, 6);
    c.restore();
    if (f === undefined) return;
    c.fillStyle = BLUE; [0, 1].forEach(j => { c.beginPath(); c.arc(190 + j * 5, 148 + (j * 24 + f * 12) % 48, 3.6, 0, TAU); c.fill(); });
  });
  const plant = (c, h, bloom, nod, a) => kit.fade(c, a, () => {
    const x = 198, ty = 197 - h + Math.abs(nod) * 0.5;
    c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.fillStyle = BROWN; c.beginPath(); c.ellipse(x, 198, 17, 5, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = GREEN; c.lineWidth = 4.5; c.beginPath(); c.moveTo(x, 196); c.quadraticCurveTo(x, 197 - h * 0.5, x + nod, ty); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2; c.fillStyle = GREEN;
    const lf = Math.min(1, h / 28);
    c.beginPath(); c.ellipse(x - 8 * lf, 197 - h * 0.45, 9 * lf, 4.5 * lf, 0.5, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(x + 8 * lf, 197 - h * 0.6, 9 * lf, 4.5 * lf, -0.5, 0, TAU); c.fill(); c.stroke();
    if (bloom > 0) {
      c.lineWidth = 2.6; c.fillStyle = RED; c.beginPath(); c.arc(x + nod, ty - 6, 14 * bloom, 0, TAU); c.fill(); c.stroke();
      c.fillStyle = YELLOW; c.beginPath(); c.arc(x + nod, ty - 6, 6 * bloom, 0, TAU); c.fill();
    } else if (h > 30) { c.beginPath(); c.arc(x, ty - 3, 6, 0, TAU); c.fill(); c.stroke(); }
  });
  const o = { dx: -46 }, S = kit.pt(o, [166, 140]);
  const sc = (face, { h = 10, bloom = 0, nod = 0, pa = 1, tilt = 0, ca = 1, f, ky = 1, dx = -46, hand = [148, 136] } = {}) => xf(D.N, { dx, ky, face, extra: {
    ...(ca ? { arm2: [S, hand] } : {}),
    front: c => { plant(c, h, bloom, nod, pa); if (ca) can(c, tilt, ca, f); },
  } });

  k.add('in0', 2, sc(FACE.lookr, { pa: 0.4, ca: 0.4 }));
  k.add('in1', 2, sc(FACE.lookr, { pa: 0.8, ca: 0.8 }));
  k.add('look', 6, sc(FACE.lookr));
  [[10, 28, 0], [28, 46, 0], [46, 60, 1]].forEach(([h0, h1, b], s) => [0, 1, 2, 3].forEach(f =>
    k.add('pour' + s + f, 2, sc(FACE.lookr, { tilt: 0.5, f, h: f < 2 ? h0 : f === 2 ? (h0 + h1) / 2 : h1, bloom: b * (f < 2 ? 0 : f === 2 ? 0.5 : 1) }))));
  k.add('wow', 6, sc(FACE.happy, { h: 60, bloom: 1, ky: 1.03 }));
  k.add('down0', 2, sc(FACE.happy, { h: 60, bloom: 1, ca: 0.6, hand: [146, 150] }));
  k.add('down1', 2, sc(FACE.happy, { h: 60, bloom: 1, ca: 0.3, hand: [140, 162] }));
  const up = sc(FACE.happy, { h: 60, bloom: 1, ca: 0 }), nod = sc(FACE.happy, { h: 60, bloom: 1, ca: 0, nod: -12, ky: 1.03 });
  k.add('nod0', 2, sc(FACE.happy, { h: 60, bloom: 1, ca: 0, nod: -6 }));
  k.add('nod', 6, nod);
  k.add('up', 4, up);
  k.add('nod0', 2);
  k.add('nod', 12);
  k.add('out0', 2, sc(FACE.happy, { h: 60, bloom: 1, ca: 0, pa: 0.6, dx: -32 }));
  k.add('out1', 2, sc(FACE.happy, { h: 60, bloom: 1, ca: 0, pa: 0.3, dx: -14 }));
  k.done();
})();
