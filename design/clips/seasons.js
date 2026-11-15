// A year passes round him while he stands still: blossom and a shoot, a hot sun, falling leaves, then snow that leaves a cap on his head.
(() => {
  const { D, xf, boil, openPath, closedPath, mixHex, tint, kit } = window.__lump, { TAU, CREAM, WHITE, GREEN, YELLOW, RED, BLUE, GREY } = kit;
  const k = kit.clip('seasons'), PETAL = mixHex(tint(), '#FFFFFF', 0.45), LEAF = ['#F0A030', RED, YELLOW];
  const ramp = (f, a, b) => { const t = Math.max(0, Math.min(1, (f - a) / (b - a))); return t * t * (3 - 2 * t); };
  // n things that set off from the top one after another between frames `from` and `to`
  const fall = (f, n, speed, from, to, draw) => { for (let i = 0; i < n; i++) { const y = (f - from - ((i * 7) % n) * (to - from) / n) * speed - 12; if (y >= -12 && y < 200) draw(i, y); } };
  const sideX = i => i % 2 ? 196 + (i * 13) % 30 : 16 + (i * 17) % 44;
  const bead = (c, x, y, r) => {
    c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(x, y - r * 1.9); c.quadraticCurveTo(x + r * 1.3, y, x, y + r); c.quadraticCurveTo(x - r * 1.3, y, x, y - r * 1.9); c.fill(); c.stroke();
  };
  // snow settled on the top of whatever pose he is in
  const cap = (c, d, seed, a) => {
    if (a < 0.08) return;
    const top = Math.min(...d.body.map(p => p[1])), near = d.body.filter(p => p[1] < top + 12), cx = near.reduce((s, p) => s + p[0], 0) / near.length, w = 12 + 16 * a;
    c.save(); c.lineJoin = c.lineCap = 'round';
    closedPath(c, boil([[cx - w, top + 8], [cx - w * 0.75, top - 1 - 5 * a], [cx, top - 4 - 7 * a], [cx + w * 0.75, top - 1 - 5 * a], [cx + w, top + 8], [cx + w * 0.4, top + 5], [cx, top + 9], [cx - w * 0.4, top + 5]], seed + 9, 0.7));
    c.fillStyle = WHITE; c.fill(); c.strokeStyle = GREY; c.lineWidth = 2; c.stroke(); c.restore();
  };
  const sun = f => c => {
    const t = ramp(f, 18, 25) - ramp(f, 40, 47); if (t < 0.02) return;
    const x = 268 - 74 * t, y = -30 + 72 * t;
    c.save(); c.lineCap = 'round'; c.strokeStyle = YELLOW; c.lineWidth = 3.5; c.beginPath();
    for (let i = 0; i < 8; i++) { const a = f * 0.08 + i * TAU / 8; c.moveTo(x + Math.cos(a) * 25, y + Math.sin(a) * 25); c.lineTo(x + Math.cos(a) * 33, y + Math.sin(a) * 33); }
    c.stroke(); c.fillStyle = YELLOW; c.beginPath(); c.arc(x, y, 19, 0, TAU); c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2.6; c.stroke(); c.restore();
  };
  const year = f => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    const h = 30 * ramp(f, 3, 18) + 16 * ramp(f, 22, 34) - 46 * ramp(f, 68, 82), heap = ramp(f, 46, 70), hp = heap * (1 - ramp(f, 86, 92)), sn = 16 * (ramp(f, 68, 90) - ramp(f, 100, 105));
    if (h > 2) {
      const stem = mixHex(GREEN, '#A0A040', ramp(f, 46, 58)), lf = Math.min(1, Math.max(0, (h - 10) / 12));
      c.strokeStyle = c.fillStyle = stem; c.lineWidth = 4;
      openPath(c, boil([[36, 201], [34, 201 - h / 2], [37, 201 - h]], seed, 0.8)); c.stroke();
      if (lf > 0.1) [[-1, 0.45], [1, 0.7]].forEach(([s, at]) => { c.beginPath(); c.ellipse(35 + s * 8 * lf, 201 - h * at, 7 * lf, 3.5 * lf, -s * 0.5, 0, TAU); c.fill(); });
      const fl = 7 * (ramp(f, 26, 34) - ramp(f, 46, 54));
      if (fl > 1) { c.fillStyle = YELLOW; c.beginPath(); c.arc(37, 201 - h, fl, 0, TAU); c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2; c.stroke(); }
    }
    if (hp > 0.05) [[50, 62, 22], [202, 54, 18]].forEach(([x, w, hh], n) => {
      closedPath(c, boil([[x - w / 2, 203], [x - w * 0.3, 201 - hh * hp * 0.7], [x, 201 - hh * hp], [x + w * 0.3, 201 - hh * hp * 0.75], [x + w / 2, 203]], seed + n, 1));
      c.fillStyle = LEAF[0]; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.stroke();
      [[-0.2, RED], [0.2, YELLOW]].forEach(([o, col]) => { c.fillStyle = col; c.beginPath(); c.ellipse(x + o * w, 201 - hh * hp * 0.45, 6 * hp, 3.5 * hp, o * 3, 0, TAU); c.fill(); });
    });
    fall(f, 6, 10, 0, 10, (i, y) => { c.fillStyle = PETAL; c.beginPath(); c.ellipse(sideX(i) + 9 * Math.sin(f * 0.35 + i * 2), y, 6.5, 3.5, f * 0.3 + i, 0, TAU); c.fill(); });
    fall(f, 8, 10, 40, 54, (i, y) => {
      if (y > 198 - (i % 2 ? 18 : 22) * hp) return;
      c.fillStyle = LEAF[i % 3]; c.beginPath(); c.ellipse(sideX(i + 1) + 11 * Math.sin(f * 0.4 + i), y, 7.5, 4, f * 0.45 + i * 2, 0, TAU); c.fill();
    });
    if (sn > 0.5) {
      const bump = x => 1 + 1.1 * heap * (Math.exp(-(((x - 50) / 30) ** 2)) + 0.8 * Math.exp(-(((x - 202) / 28) ** 2))), pts = [];
      for (let x = -10; x <= 250; x += 26) pts.push([x, 201 - sn * bump(x)]);
      closedPath(c, [...pts, [262, 201 + Math.min(3, sn)], [-22, 201 + Math.min(3, sn)]]); c.fillStyle = WHITE; c.fill(); c.strokeStyle = GREY; c.lineWidth = 2; c.stroke();
    }
    fall(f, 10, 10, 62, 76, (i, y) => {
      const x = 14 + (i * 47) % 212;
      if (y > 198 - sn || (x > 84 && x < 172 && y > 62)) return;
      c.fillStyle = WHITE; c.beginPath(); c.arc(x + 3 * Math.sin(f * 0.5 + i), y, 3.4, 0, TAU); c.fill();
    });
    const sw = ramp(f, 26, 29) - ramp(f, 41, 44);
    if (sw > 0.1) bead(c, 158 + 5 * ramp(f, 28, 42), 86 + 30 * ramp(f, 28, 42), 6 * sw);
    c.restore();
    cap(c, d, seed, ramp(f, 70, 92));
  };
  const face = f => f < 20 ? kit.look(-5, -4, 'smile') : f < 26 ? kit.look(5, -5, 'flat') : f < 44 ? kit.look(0, 1, 'wobble') : f < 62 ? kit.look(5, 3, 'o') : f < 82 ? kit.look(0, -5, 'flat') : f < 100 ? kit.faces.worried : kit.faces.closed;
  for (let f = 0; f <= 105; f++) k.add('y' + f, 2, xf(D.N, { face: face(f), extra: { back: sun(f), front: year(f) } }));
  const capped = (c, d, seed) => cap(c, d, seed, 1);
  k.add('t1', 8, xf(D.T1, { extra: { front: capped } }));
  k.add('t2', 6, xf(D.T2, { extra: { front: capped } }));
  k.add('s1', 8, xf(D.S1, { extra: { front: capped, fxm: 'idle' } }));
  k.done({ doze: false });
})();
