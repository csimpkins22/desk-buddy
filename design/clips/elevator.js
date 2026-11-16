// He rides a lift: floors scroll down past a window on the left, it stops with a bounce, and the doors part on starlight.
// group: scenes
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const { CREAM, DARK, YELLOW, GREEN, BROWN, GREY, TAU } = kit, k = kit.clip('elevator');
  const WALL = '#262D38', SHAFT = '#0B0D12', FLOOR = '#171A20', F = 170, HERE = 30;
  const stars = [[22, 30, 9], [56, 78, 7], [34, 132, 10], [72, 172, 7], [104, 22, 8], [156, 34, 10], [204, 20, 7], [228, 74, 9], [226, 150, 8], [84, 112, 8], [186, 60, 7]];
  const waver = n => xf(D.N, { k: 0.6, face: FACE.happy, extra: { arm2: [[151, 164], n % 2 ? [172, 146] : [177, 157]] } });
  const plant = (c, x, y) => {
    c.save(); c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.fillStyle = GREEN; [[-12, -34, -0.5], [0, -42, 0], [12, -34, 0.5]].forEach(([dx, dy, r]) => { c.beginPath(); c.ellipse(x + dx, y + dy, 7, 16, r, 0, TAU); c.fill(); c.stroke(); });
    c.fillStyle = BROWN; c.beginPath(); c.moveTo(x - 13, y - 20); c.lineTo(x + 13, y - 20); c.lineTo(x + 9, y); c.lineTo(x - 9, y); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  // what the window shows at scroll s: each floor's slab and ceiling line, a plant on the first, a door on the second, a twin waving on the third
  const shaft = (c, s, seed, n) => {
    for (let j = 0; j <= 4; j++) {
      const y = 176 + s - j * F;
      if (y < 20 || y > 300) continue;
      c.strokeStyle = CREAM; c.lineWidth = 2.4;
      if (j === 1 && y > 40 && y < 236) plant(c, 52, y);
      if (j === 2 && y > 40 && y < 250) { c.beginPath(); c.rect(34, y - 76, 36, 76); c.stroke(); c.fillStyle = YELLOW; c.beginPath(); c.arc(62, y - 38, 3, 0, TAU); c.fill(); }
      if (j === 3 && y > 40 && y < 270) kit.twin(c, waver(n), seed, -86, y - 201);
      if (y > 30 && y < 180) { c.fillStyle = GREY; c.fillRect(0, y, 100, 8); }
      c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, y); c.lineTo(100, y); c.moveTo(0, y - 122); c.lineTo(100, y - 122); c.stroke();
    }
  };
  // the car: door panels g apart (0 is shut), the window at scroll s, starlight behind at `glow`, the car floor at `fl`
  const car = (gap, scroll, n, glow, fl) => (c, d, seed) => {
    const g = Math.round(gap), s = Math.round(scroll);      // whole pixels: the board snaps straight edges, and a half-pixel door edge would not match
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (glow > 0) kit.fade(c, glow, () => stars.forEach(([x, y, r], i) => kit.sparkle(c, x, y, r + (seed + i) % 2 * 2, i % 3 ? CREAM : YELLOW)));
    if (fl > 0) kit.fade(c, fl, () => { c.fillStyle = FLOOR; c.fillRect(0, 201, 240, 39); c.strokeStyle = GREY; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 201); c.lineTo(240, 201); c.stroke(); });
    if (g < 127) {
      c.fillStyle = WALL; c.fillRect(-g - 6, 0, 126, 201); c.fillRect(120 + g, 0, 126, 201);
      c.save(); c.translate(-g, 0); c.beginPath(); c.rect(10, 36, 82, 140); c.clip();
      c.fillStyle = SHAFT; c.fillRect(10, 36, 82, 140); shaft(c, s, seed, n); c.restore();
      c.strokeStyle = CREAM; c.lineWidth = 3;
      c.beginPath(); c.roundRect(10 - g, 36, 82, 140, 6); c.stroke();
      c.beginPath(); c.moveTo(120 - g, 0); c.lineTo(120 - g, 201); c.moveTo(120 + g, 0); c.lineTo(120 + g, 201); c.stroke();
      c.fillStyle = DARK; c.lineWidth = 2; c.beginPath(); c.roundRect(128 + g, 8, 88, 24, 6); c.fill(); c.stroke();
      c.fillStyle = CREAM; c.beginPath(); c.moveTo(138 + g, 14); c.lineTo(145 + g, 26); c.lineTo(131 + g, 26); c.closePath(); c.fill();
      const lit = Math.min(4, Math.round(s / F));
      for (let i = 0; i < 5; i++) { c.fillStyle = i === lit ? YELLOW : GREY; c.beginPath(); c.arc(156 + g + i * 13, 20, i === lit ? 5 : 3.2, 0, TAU); c.fill(); }
    }
    c.restore();
  };

  const shutting = kit.steps(130, 0, 6).slice(1);
  kit.walk(0, HERE, 5, { face: kit.look(-4, -2, 'o') }).forEach((o, i) => k.add('shut' + i, 2, xf(D.N, { ...o, extra: { back: car(shutting[i], 0, 0, 0, (i + 1) / 5) } })));

  const ss = u => u * u * (3 - 2 * u), at = n => 4 * F * ss(Math.pow(n / 29, 0.75));
  for (let n = 0; n < 30; n++) {
    const s = at(n), ty = 176 + s - 3 * F;
    const face = n < 2 ? FACE.shock : ty > 262 ? kit.faces.worried : ty > 60 ? kit.look(-7, Math.max(-5, Math.min(6, (ty - 150) / 12)), 'o', 4.6) : kit.look(-6, -1, 'flat');
    k.add('ride' + n, 2, xf(D.N, { dx: HERE, ky: [0.9, 0.95][n] || 1, kx: [1.06, 1.03][n] || 1, face, extra: { back: car(0, s, n, 0, 1) } }));
  }
  [[12, 0.8, 1.14], [-7, 1.07, 0.96], [3, 0.96, 1.03], [0, 1, 1]].forEach(([b, ky, kx], i) =>
    k.add('stop' + i, i === 3 ? 4 : 2, xf(D.N, { dx: HERE, ky, kx, face: i < 2 ? FACE.shock : kit.look(0, 0, 'flat'), extra: { back: car(0, 4 * F + b, 0, 0, 1) } })));
  kit.steps(0, 132, 8).slice(1).forEach((g, i) => k.add('open' + i, 2, xf(D.N, { dx: HERE, face: i < 4 ? kit.look(0, -1, 'o') : kit.faces.wide, extra: { back: car(g, 4 * F, 0, 1, 1) } })));
  k.add('stars', 14, xf(D.N, { dx: HERE, face: FACE.cute, extra: { back: car(200, 4 * F, 0, 1, 1) } }));
  kit.walk(HERE, 0, 4, { face: kit.faces.closed }).forEach((o, i) => k.add('home' + i, 2, xf(D.N, { ...o, extra: { back: car(200, 0, 0, [0.75, 0.5, 0.25, 0][i], [0.75, 0.5, 0.25, 0][i]) } })));
  k.done();
})();
