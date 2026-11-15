// Dominoes: he sets up a row, flicks the first, and the last one, a giant, tips back onto him.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('dominoes');
  const { CREAM, DARK, WHITE, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const pose = t => ({ k: 1 - 0.15 * t, dx: -62 * t }), O = pose(1), sh = kit.pt(O, [166, 140]);
  const DOMS = [[128, 36, 12], [146, 36, 12], [164, 36, 12], [182, 36, 12], [208, 150, 16]];
  const dom = (c, [x, h, w], ang, yo) => {
    c.save(); c.translate(x, 201 + yo); c.rotate(ang); c.lineJoin = 'round'; c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.roundRect(-w / 2, -h, w, h, 3); c.fill(); c.stroke();
    c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.moveTo(-w / 2 + 2, -h / 2); c.lineTo(w / 2 - 2, -h / 2); c.stroke();
    c.fillStyle = DARK; [-h * 0.75, -h * 0.25].forEach(y => { c.beginPath(); c.arc(0, y, w * 0.24, 0, TAU); c.fill(); }); c.restore();
  };
  // s.n: how many have landed (the next is on its way down); s.ang: lean of each; s.a: opacity
  const L = (face, o, s, hand) => xf(D.N, { ...o, face, extra: { ...(hand ? { arm2: [sh, hand] } : {}), front: c => kit.fade(c, s.a ?? 1, () => {
    DOMS.forEach((d, i) => { if (i < s.n) dom(c, d, (s.ang || [])[i] || 0, 0); else if (i === s.n) dom(c, d, 0, i === 4 ? -100 : -70); });
  }) } });
  const point = [sh[0] + 24, sh[1] - 6], lean = f => [0, 1, 2, 3].map(i => Math.max(0, Math.min((f - i) * 0.55, i === 3 ? 0.8 : 1.15)));

  tw(0, 1, 3).forEach((t, i) => k.add('go' + i, 2, L(FACE.lookr, pose(t), { n: -1 })));
  for (let n = 0; n < 6; n++) k.add('set' + n, 2, L(n < 4 ? FACE.happy : FACE.lookup, O, { n }, point));
  k.add('ready', 8, L(FACE.happy, O, { n: 5 }));
  k.add('wind', 2, L(FACE.lookr, O, { n: 5 }, [108, 172]));
  k.add('flick', 2, L(FACE.lookr, O, { n: 5, ang: [0.2] }, [120, 180]));
  for (let f = 1; f <= 5; f++) k.add('run' + f, 2, L(FACE.lookr, O, { n: 5, ang: [...lean(f), f === 5 ? 0.05 : 0] }));
  [0, -0.1].forEach((g, i) => k.add('wob' + i, 2, L(i ? FACE.shock : FACE.lookr, O, { n: 5, ang: [...lean(6), g] })));
  [-0.4, -0.8].forEach((g, i) => k.add('tip' + i, 2, L(FACE.shock, O, { n: 5, ang: [...lean(6), g] })));
  const flat = { ...O, ky: 0.5, kx: 1.2 }, down = { n: 5, ang: [...lean(6), -1.15] };
  k.add('hit', 2, L(FACE.shock, flat, down));
  k.add('flat', 12, L(FACE.spiral, flat, down));
  tw(0, 1, 3).forEach((t, i) => k.add('off' + i, 2, L(FACE.grump, { ...pose(1 - t), ky: 0.5 + 0.5 * t, kx: 1.2 - 0.2 * t }, { ...down, a: 1 - t })));
  k.done();
})();
