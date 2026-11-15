// Three Lumps pass a steaming potato along, faster and faster, until the other two back out of opposite edges and he is left holding it.
(() => {
  const { D, xf, boil, openPath, closedPath } = window.__lump, kit = window.__lump.kit, { CREAM, BROWN, TAU } = kit;
  const k = kit.clip('hot_potato_b');
  const CX = { L: 3, C: 128, R: 253 }, PY = 40, WIDE = 0.62, lerp = (a, b, t) => a + (b - a) * t;
  const cam = z => { const t = (1 - z) / (1 - WIDE); return kit.view(z, [128, 150], [128 - 8 * t, 150 - 10 * t]); };
  // faces big enough to read from across the room
  const big = (dx = 0, dy = 0) => [['dot', 114 + dx, 108 + dy, 6.5], ['dot', 142 + dx, 106 + dy, 6.5], ['oval', 128, 127, 4.5, 4.5]];
  const panic = [['oval', 113, 106, 7, 8.5], ['oval', 143, 104, 7, 8.5], ['mouth', [[116, 119], [140, 118], [139, 133], [128, 138], [117, 133]], [128, 134, 7, 4]]];
  const relief = [['stroke', [[106, 106], [114, 111], [122, 106]], 5], ['stroke', [[134, 104], [142, 109], [150, 104]], 5], ['stroke', [[118, 123], [128, 130], [138, 123]], 5]];

  const potato = (c, x, y, seed, z, rot = 0, steam = true) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.translate(x, y); c.rotate(rot); c.scale(1.5, 1.5);
    closedPath(c, boil([[-19, 2], [-14, -10], [0, -13], [14, -11], [20, 0], [13, 11], [-4, 13], [-16, 10]], seed, 1)); c.fillStyle = '#B9803C'; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2 / z; c.stroke();
    c.fillStyle = BROWN; [[-7, -3], [7, 3]].forEach(([u, v]) => { c.beginPath(); c.arc(u, v, 2.6, 0, TAU); c.fill(); });
    c.restore();
    if (!steam) return;
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.6 / z; c.lineCap = 'round';
    [-9, 9].forEach(u => { const s = seed % 2 ? 1 : -1; openPath(c, [[x + u, y - 26], [x + u + 4 * s, y - 33], [x + u - 4 * s, y - 40], [x + u + 3 * s, y - 47]]); c.stroke(); });
    c.restore();
  };
  // one of the three in a mode: holding it (hopping, b alternates), reaching for it, relieved to be rid of it, or watching it
  const lump = (who, mode, pot, b = 0, off = 0) => {
    const cx = CX[who] + off, o = { dx: cx - 128 };
    if (mode === 'hold') {
      const oo = { ...o, dy: -5 * b, ky: b ? 1.04 : 0.97 }, sy = kit.pt(oo, [90, 140])[1];
      return xf(D.N, { ...oo, face: panic, extra: { arm: [[cx - 38, sy], [pot[0] - 14, pot[1] + 13]], arm2: [[cx + 38, sy], [pot[0] + 14, pot[1] + 13]] } });
    }
    if (mode === 'reach') return xf(D.N, { ...o, ky: 1.03, face: big(Math.sign(pot[0] - cx) * 5, -5), extra: { arm: [[cx - 38, 138], [cx - 36, 78]], arm2: [[cx + 38, 138], [cx + 36, 78]] } });
    if (mode === 'relief') return xf(D.N, { ...o, ky: 0.95, face: relief });
    return xf(D.N, { ...o, rot: off ? (b ? 0.05 : -0.05) : 0, face: big(Math.max(-6, Math.min(6, (pot[0] - cx) / 18)), -4) });
  };
  const shot = (z, modes, pot, b = 0, off = 0) => ({ ...lump('C', modes.C, pot, b), view: cam(z),
    back: (c, d, seed) => { kit.twin(c, lump('L', modes.L, pot, b, -off), seed + 3); kit.twin(c, lump('R', modes.R, pot, b, off), seed + 8); },
    front: (c, d, seed) => potato(c, pot[0], pot[1], seed, z, pot[2] || 0) });
  const held = (who, b, y = PY) => [CX[who] + (b ? 6 : -6), y - 5 * b];
  const modes = (holder, to) => Object.fromEntries(['L', 'C', 'R'].map(w => [w, to ? (w === holder ? 'relief' : w === to ? 'reach' : 'wait') : w === holder ? 'hold' : 'wait']));

  kit.steps(1, WIDE, 5).slice(1).forEach((z, i) => k.add('back' + i, 2, shot(z, modes('L'), held('L', i % 2), i % 2)));
  const PASS = ['LC', 'CR', 'RC', 'CL', 'LC', 'CR', 'RC'], HOLD = [4, 3, 2, 2, 1, 1, 1], FLY = [3, 3, 2, 2, 2, 1, 1];
  PASS.forEach(([from, to], p) => {
    for (let j = 0; j < HOLD[p]; j++) k.add(`h${p}_${j}`, 2, shot(WIDE, modes(from), held(from, j % 2), j % 2));
    for (let j = 1; j <= FLY[p]; j++) { const t = j / (FLY[p] + 1); k.add(`f${p}_${j}`, 2, shot(WIDE, modes(from, to), [lerp(CX[from], CX[to], t), PY - 240 * t * (1 - t), t * 3])); }
  });
  for (let j = 0; j < 4; j++) k.add('mine' + j % 2, 2, shot(WIDE, modes('C'), held('C', j % 2), j % 2));
  // the other two back away and the view closes in on him
  kit.steps(WIDE, 1, 6).slice(1).forEach((z, i) => k.add('left' + i, 2, shot(z, modes('C'), held('C', i % 2, lerp(PY, 56, (i + 1) / 5)), i % 2, 28 * (i + 1))));
  const alone = (b, face) => { const d = lump('C', 'hold', held('C', b, 56), b); return { ...d, face: face || d.face, front: (c, _, seed) => potato(c, ...held('C', b, 56), seed, 1) }; };
  k.add('look0', 4, alone(0, big(-6, 0)));
  k.add('look1', 4, alone(1, big(6, 0)));
  for (let j = 0; j < 6; j++) k.add('hot' + j % 2, 2, alone(j % 2));
  // and that is how he dozes off: with it sitting on him, still steaming
  const on = (base, x, y, a = 1, extra = {}) => xf(base, { extra: { ...extra, front: (c, d, seed) => kit.fade(c, a, () => potato(c, x, y, seed, 1, 0.1)) } });
  k.add('t1', 4, on(D.T1, 128, 64));
  k.add('t2', 4, on(D.T2, 138, 98));
  k.add('s1', 12, on(D.S1, 128, 124, 1, { fxm: 'idle' }));
  k.add('s2', 2, on(D.S1, 128, 124, 0.6, { fxm: 'idle' }));
  k.add('s3', 2, on(D.S1, 128, 124, 0.3, { fxm: 'idle' }));
  k.done({ doze: false });
})();
