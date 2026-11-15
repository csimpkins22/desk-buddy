// Piggy bank: he drops a coin in, shakes the pig by his ear, hears nothing, and one coin rolls back out.
(() => {
  const { D, xf, FACE, boil, closedPath, openPath, kit } = window.__lump, k = kit.clip('piggy_bank');
  const { CREAM, DARK, YELLOW, RED, BROWN, TAU } = kit;
  const tw = (a, b, n) => kit.steps(a, b, n + 1).slice(1);
  const pose = t => ({ k: 1 - 0.1 * t, dx: -34 * t }), O = pose(1), sh = kit.pt(O, [166, 140]);
  const pig = (c, x, y, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = RED;
    c.beginPath(); c.rect(x - 15, y + 12, 8, 10); c.rect(x + 7, y + 12, 8, 10); c.fill(); c.stroke();
    openPath(c, boil([[x + 23, y - 2], [x + 30, y - 8], [x + 33, y - 2]], seed + 3, 1)); c.stroke();
    closedPath(c, boil(Array.from({ length: 10 }, (_, i) => [x + 24 * Math.cos(i * TAU / 10), y + 18 * Math.sin(i * TAU / 10)]), seed, 1)); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(x - 13, y - 15); c.lineTo(x - 7, y - 28); c.lineTo(x, y - 17); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(x - 25, y + 2, 6, 8, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = DARK; c.beginPath(); c.arc(x - 12, y - 4, 3, 0, TAU); c.fill();
    c.strokeStyle = DARK; c.lineWidth = 3.5; c.beginPath(); c.moveTo(x + 3, y - 15); c.lineTo(x + 14, y - 13); c.stroke();
    c.restore();
  };
  const coin = (c, x, y) => {
    c.save(); c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(x, y, 7, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, y - 3); c.lineTo(x, y + 3); c.stroke(); c.restore();
  };
  const L = (face, o, s, arm2) => xf(D.N, { ...o, face, extra: { ...(arm2 ? { arm2 } : {}), front: (c, d, seed) => {
    if (s.coin) kit.fade(c, s.a ?? 1, () => coin(c, s.coin[0], s.coin[1]));
    pig(c, s.pig[0], s.pig[1], seed);
  } } });
  const HOME = [190, 179], up = [sh, [160, 130]];

  tw(0, 1, 3).forEach((t, i) => k.add('go' + i, 2, L(FACE.lookr, pose(t), { pig: [270 - 80 * t, 179] })));
  tw(-10, 120, 3).forEach((y, i) => k.add('fall' + i, 2, L(FACE.lookup, O, { pig: HOME, coin: [166, y] }, up)));
  k.add('have', 4, L(FACE.happy, O, { pig: HOME, coin: [166, 120] }, up));
  [[176, 128], [186, 142], [190, 158]].forEach((p, i) => k.add('drop' + i, 2, L(FACE.lookr, O, { pig: HOME, coin: p }, [sh, [164, 136 + i * 8]])));
  k.add('in', 6, L(FACE.happy, O, { pig: HOME }));
  const lift = tw(0, 1, 3).map(t => [190 - 14 * t, 179 - 63 * t]);
  lift.forEach((p, i) => k.add('lift' + i, 2, L(FACE.lookr, O, { pig: p }, [sh, [p[0] - 14, p[1] + 8]])));
  D.piggy_bank_sa = L(FACE.lookr, O, { pig: [181, 113] }, [sh, [166, 122]]);
  D.piggy_bank_sb = L(FACE.lookr, O, { pig: [171, 119] }, [sh, [158, 127]]);
  for (let i = 0; i < 3; i++) { k.add('sa', 2); k.add('sb', 2); }
  k.add('hm', 6, L(FACE.grump, O, { pig: [176, 116] }, [sh, [162, 124]]));
  [...lift].reverse().slice(1).concat([HOME]).forEach((p, i) => k.add('down' + i, 2, L(FACE.grump, O, { pig: p }, [sh, [p[0] - 14, p[1] + 8]])));
  tw(184, 148, 4).forEach((x, i) => k.add('roll' + i, 2, L(FACE.lookr, O, { pig: HOME, coin: [x, 194] })));
  k.add('out', 12, L(FACE.grump, O, { pig: HOME, coin: [148, 194] }));
  tw(0, 1, 3).forEach((t, i) => k.add('off' + i, 2, L(FACE.grump, pose(1 - t), { pig: [190 + 80 * t, 179], coin: [148, 194], a: 1 - t })));
  k.done();
})();
