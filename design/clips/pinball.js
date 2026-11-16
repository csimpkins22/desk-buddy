// Pinball: the tap turns the screen into a pinball table with him as the ball. Each bumper he hits lights a pip, then he drains for the jackpot.
// group: tap
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, BUMPERS = [[42, 66, '#FF5A4D'], [200, 62, '#5AB8FF'], [120, 150, '#FFD23F']];
  const wheee = [['dot',112,108,8], ['dot',144,106,8], ['mouth',[[118,122],[138,121],[140,138],[128,144],[116,138]]]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, TAU); c.stroke(); c.restore();
  };
  // the score: a row of pips along the top, `score` of them lit
  const pips = score => c => {
    c.save(); c.strokeStyle = CREAM; c.fillStyle = '#FFD23F'; c.lineWidth = 2;
    for (let i = 0; i < 8; i++) { c.globalAlpha = i < score ? 1 : 0.4; c.beginPath(); c.arc(72 + i * 16, 14, 5, 0, TAU); if (i < score) c.fill(); c.stroke(); }
    c.restore();
  };
  // the bumpers, with bumper `lit` flashing as he hits it
  const table = (lit, score) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = c.lineJoin = 'round';
    BUMPERS.forEach(([x, y, colour], i) => {
      const on = i === lit, r = on ? 23 : 19;
      c.fillStyle = colour; c.lineWidth = 3; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.stroke();
      c.fillStyle = on ? CREAM : '#17161A'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 0.45, 0, TAU); c.fill(); c.stroke();
      if (!on) return;
      c.lineWidth = 2.5; c.beginPath();
      for (let k = 0; k < 8; k++) { const a = k * TAU / 8 + 0.4; c.moveTo(x + Math.cos(a) * 29, y + Math.sin(a) * 29); c.lineTo(x + Math.cos(a) * 36, y + Math.sin(a) * 36); }
      c.stroke();
    });
    c.restore(); pips(score)(c);
  };
  const P = 'pinball_', seq = [...WAKE, [P + 'tap', 4], [P + 'on', 4], [P + 'launch', 2]];
  D[P + 'tap'] = xf(D.N, { face: FACE.lookr, extra: { front: tap(208, 150, 8) } });
  D[P + 'on'] = xf(D.K1, { extra: { back: table(-1, 0), front: tap(208, 150, 16), fxm: 'none' } });
  D[P + 'launch'] = xf(D.N, { k: 0.68, ky: 1.2, dy: -14, face: wheee, shadowK: 0.5, extra: { back: table(-1, 0) } });
  // where his middle goes, two ticks a step; a third number is the bumper he hits there
  let score = 0;
  [[128, 176], [102, 137], [77, 98, 0], [114, 82], [151, 68, 1], [154, 90], [156, 112, 2], [176, 114], [195, 113, 1], [155, 106], [116, 101], [77, 98, 0],
   [72, 121], [68, 144, 2], [96, 114], [128, 98]].forEach(([x, y, hit = -1], i) => {
    if (hit >= 0) score++;
    D[P + 'b' + i] = xf(D.N, { k: 0.44, ox: 128, oy: 136, rot: i * 0.9, dx: x - 128, dy: y - 136, face: wheee, shadowK: 0, extra: { back: table(hit, score) } });
    seq.push([P + 'b' + i, hit >= 0 ? 3 : 2]);
  });
  D[P + 'drop'] = xf(D.N, { k: 0.75, dy: -50, ky: 1.15, face: wheee, shadowK: 0.6, extra: { back: table(-1, 6) } });
  D[P + 'land'] = xf(D.N, { ky: 0.7, kx: 1.2, face: FACE.spiral, extra: { front: pips(8) } });
  D[P + 'win1'] = xf(D.N, { rot: 0.05, face: FACE.spiral, extra: { front: pips(0) } });
  D[P + 'win2'] = xf(D.N, { rot: -0.05, face: FACE.spiral, extra: { front: pips(8) } });
  D[P + 'after'] = xf(D.N, { face: FACE.sheep });
  seq.push(...[['drop', 2], ['land', 4], ['win1', 3], ['win2', 3], ['win1', 3], ['win2', 3], ['win1', 3], ['win2', 5], ['after', 8]].map(([n, t]) => [P + n, t]), ...DOZE);
  CLIPS.pinball = { home: 'idle', seq };
})();
