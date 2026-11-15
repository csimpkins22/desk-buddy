// Magic hat: he pulls a flower, then a string of flags out of a top hat, reaches in a third time and is pulled in himself.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('magic_hat');
  const { CREAM, YELLOW, RED, GREEN, BLUE, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const pose = t => ({ k: 1 - 0.1 * t, dx: -30 * t }), O = pose(1), HX = 186, FELT = '#3A4350';
  const hat = (c, x) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8; c.fillStyle = FELT;
    c.beginPath(); c.roundRect(x - 20, 160, 40, 41, 4); c.fill(); c.stroke();
    c.fillStyle = RED; c.fillRect(x - 18.5, 167, 37, 7);
    c.fillStyle = FELT; c.beginPath(); c.roundRect(x - 31, 154, 62, 9, 4); c.fill(); c.stroke(); c.restore();
  };
  // a flower held at (x, y) with its head len above the hand
  const flower = (c, x, y, len) => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = GREEN; c.lineWidth = 3.5; c.beginPath(); c.moveTo(x, y + 8); c.lineTo(x, y - len); c.stroke();
    c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 2;
    for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(x + 8 * Math.cos(i * TAU / 5 - 1.57), y - len + 8 * Math.sin(i * TAU / 5 - 1.57), 5.5, 0, TAU); c.fill(); c.stroke(); }
    c.fillStyle = YELLOW; c.beginPath(); c.arc(x, y - len, 5, 0, TAU); c.fill(); c.restore();
  };
  // bunting from the hand at (x, y) back down into the hat
  const flags = (c, x, y) => {
    const len = Math.hypot(HX - x, 160 - y), ux = (HX - x) / len, uy = (160 - y) / len;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x, y); c.lineTo(HX, 160); c.stroke(); c.lineWidth = 2;
    [RED, YELLOW, BLUE, GREEN].forEach((col, i) => {
      const px = x + ux * (10 + i * 18), py = y + uy * (10 + i * 18); if (py > 140) return;
      c.fillStyle = col; c.beginPath(); c.moveTo(px - 7, py); c.lineTo(px + 7, py); c.lineTo(px, py + 14); c.closePath(); c.fill(); c.stroke();
    });
    c.restore();
  };
  // s.hat: its x; s.hand: where his right hand is; s.fl: flower stem length; s.flags
  const L = (face, o, s = {}) => xf(D.N, { ...o, face, extra: { ...(s.hand ? { arm2: [kit.pt(o, [166, 140]), s.hand] } : {}), front: c => {
    if (s.fl) flower(c, s.hand[0], s.hand[1], s.fl);
    if (s.flags) flags(c, s.hand[0], s.hand[1]);
    hat(c, s.hat ?? HX);
  } } });
  const IN = [176, 160], F = [[[174, 150], 6], [[168, 134], 18], [[162, 120], 30]], B = [[172, 140], [166, 116], [160, 94]];

  tw(0, 1, 3).forEach((t, i) => k.add('go' + i, 2, L(FACE.lookr, pose(t), { hat: HX + 80 * (1 - t) })));
  k.add('in', 2, L(FACE.lookr, O, { hand: IN }));
  k.add('rum', 4, L(FACE.lookup, O, { hand: [180, 162] }));
  F.forEach(([hand, fl], i) => k.add('fl' + i, 2, L(i < 2 ? FACE.lookr : FACE.happy, O, { hand, fl })));
  k.add('flower', 6, L(FACE.happy, { ...O, ky: 1.03 }, { hand: F[2][0], fl: 30 }));
  k.add('fl1', 2); k.add('fl0', 2); k.add('in', 2);
  B.forEach((hand, i) => k.add('bu' + i, 2, L(i < 2 ? FACE.lookup : FACE.happy, O, { hand, flags: 1 })));
  k.add('bunting', 6, L(FACE.happy, { ...O, ky: 1.03 }, { hand: B[2], flags: 1 }));
  k.add('bu1', 2); k.add('bu0', 2);
  k.add('rum', 4);
  k.add('tug', 2, L(FACE.shock, { ...O, rot: 0.12 }, { hand: [180, 162] }));
  [{ k: 0.7, dx: 5, dy: -22, rot: 0.5, shadowK: 0.6 }, { k: 0.45, dx: 22, dy: -51, rot: 1.4, shadowK: 0.3 }, { k: 0.25, dx: 48, dy: -51, rot: 2.5, shadowK: 0 }]
    .forEach((o, i) => k.add('yank' + i, 2, L(FACE.shock, o, { hand: [182, 160] })));
  k.add('gone', 10, L([], { k: 0.02, dx: 56, dy: -25, shadowK: 0 }));
  k.add('pop0', 2, L(FACE.spiral, { k: 0.4, dx: 56, dy: -36, shadowK: 0 }));
  k.add('pop1', 2, L(FACE.spiral, { k: 0.65, dx: 14, dy: -34, shadowK: 0.5 }));
  k.add('land', 2, L(FACE.spiral, { ...O, ky: 0.9, kx: 1.06 }));
  k.add('dizzy', 10, L(FACE.spiral, O));
  tw(0, 1, 3).forEach((t, i) => k.add('off' + i, 2, L(FACE.grump, pose(1 - t), { hat: HX + 80 * t })));
  k.done();
})();
