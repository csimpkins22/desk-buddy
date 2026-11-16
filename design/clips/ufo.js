// He never wakes: a saucer slides in from the top, its beam lifts him off the floor, tumbles him over and sets him down facing the other way, then leaves him snoring.
// group: scenes
(() => {
  const { D, xf, kit } = window.__lump, { TAU } = kit;
  const k = kit.clip('ufo', { asleep: true });
  const CX = 124, CY = 170, HOVER = 38, Q = Math.PI / 4;

  const saucer = (c, y, seed) => {
    c.save(); c.strokeStyle = kit.CREAM; c.lineWidth = 2.8; c.lineJoin = 'round';
    c.fillStyle = kit.BLUE; c.beginPath(); c.arc(CX, y - 5, 22, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = kit.GREY; c.beginPath(); c.ellipse(CX, y, 56, 14, 0, 0, TAU); c.fill(); c.stroke();
    [-32, 0, 32].forEach((dx, i) => { c.fillStyle = (seed + i) % 2 ? kit.YELLOW : kit.RED; c.beginPath(); c.arc(CX + dx, y + (dx ? 2 : 5), 4.5, 0, TAU); c.fill(); });
    c.restore();
  };
  // the beam: w is half its width at the floor
  const beam = (c, w) => {
    c.save(); c.fillStyle = '#3A3A18'; c.beginPath(); c.moveTo(CX - 24, 48); c.lineTo(CX + 24, 48); c.lineTo(CX + w, 206); c.lineTo(CX - w, 206); c.closePath(); c.fill();
    c.strokeStyle = kit.YELLOW; c.lineWidth = 2.6; c.lineCap = 'round'; c.beginPath(); c.moveTo(CX - 24, 48); c.lineTo(CX - w, 206); c.moveTo(CX + 24, 48); c.lineTo(CX + w, 206); c.stroke(); c.restore();
  };
  const ship = (y, w) => ({ back: c => { if (w) beam(c, w); }, front: (c, d, seed) => saucer(c, y, seed) });
  // asleep and turned by a about his middle; `other` is him facing the other way
  const he = (o, extra, other) => other ? kit.flip(xf(D.S1, { ox: CX, oy: CY, dx: 8, ...o, rot: -(o.rot || 0), extra })) : xf(D.S1, { ox: CX, oy: CY, ...o, extra });
  const turned = { fxm: 'idle', fx: [58, 136] };

  kit.steps(-30, HOVER, 5).forEach((y, i) => k.add('in' + i, 2, he({}, { fxm: 'idle', ...ship(y) })));
  k.add('hover', 10, he({}, { fxm: 'idle', ...ship(HOVER + 2) }));
  [10, 50, 96].forEach((w, i) => k.add('beam' + i, 2, he({}, { fxm: 'idle', ...ship(HOVER, w) })));
  const up = kit.steps(0, 1, 6).slice(1).map(t => ({ dy: -43 * t, k: 1 - 0.1 * t, shadowK: 1 - 0.5 * t })), air = up[4];
  up.forEach((o, i) => k.add('lift' + i, i === 4 ? 6 : 2, he(o, ship(HOVER + (i % 2) * 2, 96))));
  for (let n = 1; n <= 6; n++) k.add('roll' + n, n === 1 ? 4 : 2, he({ ...air, rot: -n * Q }, ship(HOVER + (n % 2) * 2, 96)));
  for (let m = 3; m <= 8; m++) k.add('over' + m, m === 8 ? 6 : 2, he({ ...air, rot: -m * Q }, ship(HOVER + (m % 2) * 2, 96), true));
  up.slice(0, 4).reverse().concat({}).forEach((o, i) => k.add('lower' + i, 2, he(o, { ...(i === 4 && turned), ...ship(HOVER, 96) }, true)));
  k.add('settle', 2, kit.flip(xf(D.S1, { dx: 8, ky: 0.9, kx: 1.04, extra: ship(HOVER, 96) })));
  [96, 50, 10].forEach((w, i) => k.add('off' + i, 2, he({}, { ...turned, ...ship(HOVER, w) }, true)));
  k.add('hover2', 6, he({}, { ...turned, ...ship(HOVER + 2) }, true));
  kit.steps(HOVER, -30, 5).slice(1).forEach((y, i) => k.add('out' + i, 2, he({}, { ...turned, ...ship(y) }, true)));
  k.add('snore', 26, he({}, turned, true));
  k.done();
})();
