// Karaoke: he sings into a microphone with notes drifting up, goes for the high note, and a hanging lightbulb pops.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('karaoke'), { CREAM, GREY, YELLOW, DARK, TAU } = kit;
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  const mic = c => {
    ink(c, 3.4); c.beginPath(); c.moveTo(190, 199); c.lineTo(218, 199); c.moveTo(204, 199); c.lineTo(204, 120); c.lineTo(172, 112); c.stroke();
    ink(c, 2.6); c.fillStyle = GREY; c.beginPath(); c.arc(166, 111, 8, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = DARK; c.fillRect(162, 109, 8, 3);
  };
  const bulb = (c, len, sx, st) => {
    c.save(); ink(c, 3); c.beginPath(); c.moveTo(40, 0); c.lineTo(40 + sx, len); c.stroke();
    c.translate(40 + sx, len); c.lineWidth = 2.4; c.fillStyle = GREY; c.beginPath(); c.rect(-6, 0, 12, 9); c.fill(); c.stroke();
    if (st === 0) { c.fillStyle = YELLOW; c.beginPath(); c.arc(0, 22, 14, 0, TAU); c.fill(); c.stroke(); }
    else if (st === 1) {
      c.strokeStyle = YELLOW; c.lineWidth = 3.5;
      for (let i = 0; i < 7; i++) { const a = i * TAU / 7 + 0.3; c.beginPath(); c.moveTo(Math.cos(a) * 8, 22 + Math.sin(a) * 8); c.lineTo(Math.cos(a) * 25, 22 + Math.sin(a) * 25); c.stroke(); }
    } else { c.beginPath(); [[-6, 9], [-8, 17], [-3, 13], [0, 20], [4, 13], [8, 17], [6, 9]].forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); }
    c.restore();
  };
  const note = (c, x, y) => {
    c.fillStyle = CREAM; c.beginPath(); c.ellipse(x, y, 6, 4.5, -0.4, 0, TAU); c.fill();
    ink(c, 3); c.beginPath(); c.moveTo(x + 5, y - 1); c.lineTo(x + 5, y - 19); c.lineTo(x + 13, y - 14); c.stroke();
  };
  const f = (o, face, { a = 1, len = 44, st = 0, notes, shake } = {}) => xf(D.N, { dx: -14, ...o, face, extra: { front: (c, d, seed, tick) => {
    const t = Math.floor(tick / 2) * 2;
    bulb(c, len, shake ? (t % 4 ? 3 : -3) : 0, st);
    kit.fade(c, a, () => mic(c));
    if (notes) [0, 1].forEach(j => { const p = (t * 2.5 + j * 38) % 76; note(c, 186 + j * 20 + (p % 20 < 10 ? 2 : -2), 94 - p); });
  } } });

  const lens = kit.steps(-30, 44, 3);
  kit.steps(0, -14, 3).forEach((x, i) => k.add('in' + i, 2, f({ dx: x }, FACE.lookr, { a: [0.35, 0.7, 1][i], len: lens[i] })));
  k.add('s0', 4, f({ rot: 0.04 }, FACE.ah, { notes: true })); k.add('s1', 4, f({ rot: -0.04, ky: 1.03 }, FACE.aah, { notes: true }));
  for (let i = 0; i < 2; i++) { k.add('s0', 4); k.add('s1', 4); }
  k.add('inhale', 4, f({ ky: 0.9, kx: 1.05 }, FACE.puff));
  k.add('high', 10, f({ ky: 1.12, kx: 0.96 }, FACE.aah, { notes: true, shake: true }));
  k.add('pop', 2, f({ ky: 1.1, kx: 0.97 }, FACE.aah, { st: 1 }));
  k.add('oops', 14, f({ ky: 0.97 }, FACE.shock, { st: 2 }));
  k.add('out0', 2, f({ dx: -7 }, FACE.shock, { st: 2, a: 0.6, len: 10 }));
  k.add('out1', 2, f({ dx: 0 }, FACE.shock, { st: 2, a: 0.3, len: -30 }));
  k.done();
})();
