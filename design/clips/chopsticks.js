// Extreme close-up: he fills the right of the screen, one small pea sits on a plate rim at lower left. Chopsticks hover, tremble, grip, and the pea pings off three edges while his eyes follow.
(() => {
  const { D, xf, kit } = window.__lump;
  const { CREAM, BROWN, GREEN, GREY, WHITE, YELLOW, TAU, steps, look } = kit;
  const k = kit.clip('chopsticks');
  const FOCUS = [128, 112], TO = [200, 100], V = kit.zoom(2.2, FOCUS, TO);
  const PEA = [40, 193], U = [0.434, -0.9], NRM = [0.9, 0.434];
  // draw in screen pixels whatever the view is doing: the plate, pea and chopsticks stay small while he is huge
  const pen = (c, v) => {
    const z = v[0], X = x => v[1] + (x - v[3]) / z, Y = y => v[2] + (y - v[4]) / z;
    return { m: (x, y) => c.moveTo(X(x), Y(y)), l: (x, y) => c.lineTo(X(x), Y(y)), w: n => { c.lineWidth = n / z; }, o: (x, y, rx, ry = rx) => c.ellipse(X(x), Y(y), rx / z, ry / z, 0, 0, TAU) };
  };
  const scene = (v, { off = [0, 0], pea, r = 10, sticks, hit } = {}) => (c, d, seed) => {
    const p = pen(c, v); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = WHITE; c.strokeStyle = CREAM; p.w(3); c.beginPath(); p.o(20 + off[0], 262 + off[1], 120, 60); c.fill(); c.stroke();
    c.strokeStyle = GREY; p.w(2.6); c.beginPath(); p.o(20 + off[0], 270 + off[1], 92, 44); c.stroke();
    if (pea) {
      c.fillStyle = GREEN; c.strokeStyle = CREAM; p.w(2.6); c.beginPath(); p.o(pea[0], pea[1], r); c.fill(); c.stroke();
      c.fillStyle = WHITE; c.beginPath(); p.o(pea[0] - 3, pea[1] - 3, 2.4); c.fill();
    }
    if (sticks) {
      const [s, gap, jit = 0] = sticks, bx = PEA[0] + U[0] * s + NRM[0] * jit, by = PEA[1] + U[1] * s + NRM[1] * jit;
      [-1, 1].forEach(side => {
        const tx = bx + NRM[0] * (10 + gap) * side, ty = by + NRM[1] * (10 + gap) * side, fx = tx + U[0] * 320 - NRM[0] * 6 * side, fy = ty + U[1] * 320 - NRM[1] * 6 * side;
        c.strokeStyle = CREAM; p.w(6.5); c.beginPath(); p.m(tx, ty); p.l(fx, fy); c.stroke();
        c.strokeStyle = BROWN; p.w(2.6); c.beginPath(); p.m(tx + U[0] * 5, ty + U[1] * 5); p.l(fx, fy); c.stroke();
      });
    }
    if (hit) {
      c.strokeStyle = YELLOW; p.w(3.6);
      for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.3; c.beginPath(); p.m(hit[0] + Math.cos(a) * 14, hit[1] + Math.sin(a) * 14); p.l(hit[0] + Math.cos(a) * 24, hit[1] + Math.sin(a) * 24); c.stroke(); }
    }
  };
  const brows = [['stroke', [[108, 100], [122, 104]], 2.6], ['stroke', [[134, 102], [148, 98]], 2.6]];
  const atPea = look(-5, 4, 'flat'), conc = [...look(-5, 4, 'wobble'), ...brows];
  const wide = (ex, ey) => [['shine', 116, 109, 8], ['shine', 140, 107, 8], ['dot', 116 + ex, 109 + ey, 3.8], ['dot', 140 + ex, 107 + ey, 3.8], ['oval', 128, 128, 4, 5]];
  const shot = (name, ticks, face, sc, front) => k.add(name, ticks, xf(D.N, { face, extra: { view: V, front: (c, d, seed) => { scene(V, sc)(c, d, seed); if (front) front(c, seed); } } }));

  steps(1, 2.2, 5).slice(1).forEach((z, i) => {
    const v = kit.zoom(z, FOCUS, TO), t = (i + 1) / 4, off = [-60 * (1 - t), 50 * (1 - t)];
    k.add('in' + i, 2, xf(D.N, { face: look(-4 * t, 3 * t, 'smile'), extra: { view: v, front: scene(v, { off, pea: [PEA[0] + off[0], PEA[1] + off[1]] }) } }));
  });
  shot('eye', 6, atPea, { pea: PEA });
  steps(250, 24, 4).forEach((s, i) => shot('come' + i, 2, atPea, { pea: PEA, sticks: [s, 7] }));
  [[0, 0, 2], [-3, 2, -2], [2, -1, 3], [-4, 2, -3], [1, 0, 2], [-2, -2, -1]].forEach(([ds, dg, jit], i) => shot('hover' + i, 2, conc, { pea: PEA, sticks: [24 + ds, 7 + dg, jit] }));
  shot('hold', 14, conc, { pea: PEA, sticks: [14, 4] }, (c, seed) => kit.sweat(c, 106, 86, seed, 1));
  shot('grip0', 2, conc, { pea: PEA, sticks: [4, 1] });
  shot('grip1', 4, wide(-4.5, 4), { pea: PEA, r: 8.5, sticks: [0, -1.5] });

  const PATH = [PEA, [84, 10], [230, 168], [136, 230], [-24, 150]], OUT = [34, 100, 180, 270];
  let n = 0;
  for (let seg = 0; seg < 4; seg++) for (let j = 1; j <= 3; j++) {
    const a = PATH[seg], b = PATH[seg + 1], pea = [a[0] + (b[0] - a[0]) * j / 3, a[1] + (b[1] - a[1]) * j / 3];
    const ex = Math.max(-4.5, Math.min(4.5, (pea[0] - 200) / 18)), ey = Math.max(-4.5, Math.min(4.5, (pea[1] - 93) / 18));
    shot('ping' + n, 2, wide(ex, ey), { pea, hit: j === 3 && seg < 3 ? b : null, sticks: n < 4 ? [OUT[n], 6] : null });
    n++;
  }
  shot('gone', 4, wide(-4.5, 1.5), {});
  shot('plate', 10, look(-5, 4, 'flat'), {});
  steps(2.2, 1, 5).slice(1).forEach((z, i) => {
    const v = kit.zoom(z, FOCUS, TO), t = (i + 1) / 4;
    k.add('out' + i, 2, xf(D.N, { face: look(-4 * (1 - t), 3 * (1 - t), 'flat'), extra: { view: v, front: scene(v, { off: [-60 * t, 50 * t] }) } }));
  });
  k.done();
})();
