// He goes down: digs at an X and the view follows him below the floor past a boot, a bone and a bed of stones to a chest holding one sock. He sleeps down there.
// group: scenes
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const { CREAM, BROWN, YELLOW, RED, GREY, WHITE, TAU, steps, pt, look } = kit;
  const k = kit.clip('treasure_chest');
  const SURF = 203, L = 54, R = 202, DEEP = 439, FLOOR = 201 + DEEP, CX = 232;
  const LAYERS = [[SURF, 330, BROWN], [330, 470, '#4E3616'], [470, 520, '#39404A'], [520, 760, '#22303C']];
  const soil = depth => LAYERS.find(([, y1]) => 201 + depth < y1)[2];

  const chest = (c, open, glow) => {
    const x = CX, y = FLOOR;
    c.lineWidth = 2.8; c.strokeStyle = CREAM;
    if (glow) {
      c.strokeStyle = YELLOW; c.lineWidth = 3.6;
      for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.42, r1 = 30 + (i % 2) * 14; c.beginPath(); c.moveTo(x + Math.cos(a) * 12, y - 36 + Math.sin(a) * 12); c.lineTo(x + Math.cos(a) * r1, y - 36 + Math.sin(a) * r1); c.stroke(); }
      c.strokeStyle = CREAM; c.lineWidth = 2.8;
    }
    c.save(); c.translate(x + 28, y - 30); c.rotate(open * 1.25);
    c.fillStyle = BROWN; c.beginPath(); c.moveTo(-56, 0); c.bezierCurveTo(-56, -24, 0, -24, 0, 0); c.closePath(); c.fill(); c.stroke();
    c.restore();
    c.fillStyle = BROWN; c.beginPath(); c.rect(x - 28, y - 30, 56, 30); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.fillRect(x - 19, y - 28.5, 6, 27); c.fillRect(x + 13, y - 28.5, 6, 27); c.fillRect(x - 4, y - 24, 8, 10);
    if (open > 0.5) { c.fillStyle = glow ? YELLOW : '#000'; c.beginPath(); c.ellipse(x, y - 30, 24, 5, 0, 0, TAU); c.fill(); c.stroke(); }
  };
  const sock = (c, x, y) => {
    c.lineJoin = 'round'; c.lineWidth = 2.6; c.strokeStyle = CREAM; c.fillStyle = WHITE;
    c.beginPath(); c.moveTo(x - 9, y - 34); c.lineTo(x + 9, y - 34); c.lineTo(x + 9, y + 14); c.lineTo(x - 27, y + 14); c.lineTo(x - 27, y + 2); c.lineTo(x - 9, y - 4); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = RED; c.fillRect(x - 7.5, y - 29, 15, 8); c.fillRect(x - 25.5, y + 4, 8, 8.5);
  };

  // the ground in section, drawing only what the view (panned down by pan) can see
  const world = (depth, pan, { a = 1, x = 0, pocket = 0, open = 0, glow = false, sk } = {}) => (c, d, seed) => {
    const top = pan - 4, bot = pan + 244, see = (y0, y1) => y1 > top && y0 < bot;
    c.save(); c.lineCap = c.lineJoin = 'round'; c.globalAlpha = a;
    LAYERS.forEach(([y0, y1, col]) => { if (see(y0, y1)) { const t = Math.max(y0, top), b = Math.min(y1, bot); c.fillStyle = col; c.fillRect(-70, t, 400, b - t); } });
    c.fillStyle = '#000';
    if (depth > 0 && see(SURF, 203 + depth)) { const t = Math.max(SURF, top); c.fillRect(L, t, R - L, 203 + depth - t); }
    if (pocket) c.fillRect(R - 1, FLOOR - 62, pocket + 1, 64);
    c.strokeStyle = CREAM; c.lineWidth = 3;
    if (see(SURF, SURF)) {
      c.beginPath(); c.moveTo(-70, SURF);
      if (depth > 0) { c.lineTo(L, SURF); c.moveTo(R, SURF); }
      c.lineTo(330, SURF); c.stroke();
      const h = Math.min(13, depth * 0.4);
      if (h > 2) { c.fillStyle = BROWN; [[L - 34, L - 2], [R + 2, R + 34]].forEach(([x0, x1]) => { c.beginPath(); c.moveTo(x0, SURF); c.quadraticCurveTo((x0 + x1) / 2, SURF - h * 2, x1, SURF); c.closePath(); c.fill(); c.stroke(); }); }
      if (x) { c.globalAlpha = a * x; c.strokeStyle = RED; c.lineWidth = 4.5; c.beginPath(); c.moveTo(116, 212); c.lineTo(140, 232); c.moveTo(140, 212); c.lineTo(116, 232); c.stroke(); c.globalAlpha = a; c.strokeStyle = CREAM; }
    }
    if (see(244, 282)) {      // a boot in the right wall
      c.lineWidth = 2.6; c.fillStyle = GREY; c.beginPath(); c.moveTo(210, 246); c.lineTo(224, 246); c.lineTo(224, 265); c.lineTo(238, 269); c.lineTo(238, 280); c.lineTo(210, 280); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(210, 275); c.lineTo(238, 275); c.stroke();
    }
    if (see(370, 410)) {      // a bone in the left wall
      c.strokeStyle = c.fillStyle = WHITE; c.lineWidth = 7; c.beginPath(); c.moveTo(16, 398); c.lineTo(40, 384); c.stroke();
      [[12, 394], [16, 403], [39, 379], [44, 388]].forEach(([bx, by]) => { c.beginPath(); c.arc(bx, by, 5.5, 0, TAU); c.fill(); });
      c.strokeStyle = CREAM;
    }
    if (see(470, 520)) {      // a bed of stones, either side of where he dug through it
      c.lineWidth = 2.4; c.fillStyle = GREY;
      [[-22, 496, 13, 10], [8, 488, 12, 9], [34, 500, 13, 10], [222, 490, 13, 10], [250, 500, 12, 9], [278, 488, 13, 10]].forEach(([sx, sy, rx, ry]) => { c.beginPath(); c.ellipse(sx, sy, rx, ry, 0, 0, TAU); c.fill(); c.stroke(); });
    }
    if (see(FLOOR - 60, FLOOR)) { chest(c, open, glow); if (sk) sock(c, sk[0], sk[1]); }
    c.restore();
  };
  // clods thrown up either side of his feet
  const clods = (depth, i, spark) => (c, d, seed) => {
    c.lineWidth = 2; c.strokeStyle = CREAM; c.fillStyle = spark ? GREY : soil(depth) === BROWN ? '#8A6230' : BROWN;
    [[-74, -26], [-86 - (i % 2) * 8, -58], [74, -34], [90 + (i % 2) * 6, -66 + (i % 3) * 8]].forEach(([dx, dy], j) => { c.beginPath(); c.arc(128 + dx, 201 + depth + dy - ((i + j) % 2) * 12, 6 - (j % 2), 0, TAU); c.fill(); c.stroke(); });
    if (spark) { c.strokeStyle = YELLOW; c.lineWidth = 3; [[-58, -6, -72, -16], [58, -6, 74, -14], [0, 6, 0, 16]].forEach(([x0, y0, x1, y1]) => { c.beginPath(); c.moveTo(128 + x0, 199 + depth + y0); c.lineTo(128 + x1, 199 + depth + y1); c.stroke(); }); }
  };

  const shot = (name, ticks, depth, o = {}, w = {}) => {
    const pan = w.pan ?? depth, p = { dy: depth, kx: o.kx, ky: o.ky }, extra = { view: kit.view(1, [120 + (w.px || 0), 120 + pan], [120, 120]), back: world(depth, pan, w) };
    if (w.front) extra.front = w.front;
    if (o.arm) extra.arm = [pt(p, [90, 140]), pt(p, o.arm)];
    if (o.arm2) extra.arm2 = [pt(p, [166, 140]), pt(p, o.arm2)];
    k.add(name, ticks, xf(w.base || D.N, { ...p, shadowK: depth ? 0 : 1, face: o.face, extra: { ...extra, ...(w.extra || {}) } }));
  };
  const dig = (name, ticks, depth, i, face, spark) => shot(name, ticks, depth, i % 2
    ? { ky: 0.93, kx: 1.04, face, arm: [60, 182], arm2: [198, 114] }
    : { ky: 1.03, kx: 0.98, face, arm: [58, 114], arm2: [196, 182] }, { front: clods(depth, i, spark) });

  [0.6, 0.8, 1].forEach((a, i) => shot('x' + i, 2, 0, { face: look(0, 5, 'o') }, { a, x: (i + 1) / 3 }));
  shot('see', 8, 0, { face: FACE.cute }, { x: 1 });
  const down = look(0, 6, 'flat'), grit = [['stroke', [[108, 104], [122, 109]], 3], ['stroke', [[134, 107], [148, 102]], 3], ['dot', 116, 113, 3.6], ['dot', 140, 111, 3.6], ['stroke', [[121, 126], [135, 125]], 3]];
  let n = 0;
  steps(19, 152, 8).forEach(dep => dig('dig' + n, 2, dep, n++, down));
  shot('boot', 8, 152, { face: look(7, 0, 'o') });
  steps(171, 269, 6).forEach(dep => dig('dig' + n, 2, dep, n++, down));
  shot('bone', 8, 269, { face: look(-7, 0, 'o') });
  steps(286, 319, 3).forEach(dep => dig('dig' + n, 4, dep, n++, grit, true));
  steps(339, DEEP, 6).forEach(dep => dig('dig' + n, 2, dep, n++, down));
  shot('found', 6, DEEP, { face: FACE.cute });
  [[20, 15], [42, 30], [62, 44]].forEach(([pocket, px], i) => shot('side' + i, 2, DEEP, { face: look(6, 3, 'smile'), ky: i % 2 ? 1.02 : 0.95, arm2: [200, 150 + (i % 2) * 24] }, { pocket, px, front: clods(DEEP, i) }));
  const AT = { pocket: 62, px: 44 };
  [0.35, 0.7, 1].forEach((open, i) => shot('open' + i, 2, DEEP, { face: look(6, 3, 'o'), arm2: [200, 150 - i * 8] }, { ...AT, open, glow: i > 0 }));
  shot('glow', 10, DEEP, { face: FACE.cute, arm: [62, 110], arm2: [196, 110] }, { ...AT, open: 1, glow: true });
  [[CX - 2, FLOOR - 44], [CX - 2, FLOOR - 68], [CX - 2, FLOOR - 90]].forEach((sk, i) => shot('sock' + i, 2, DEEP, { face: look(6, -1 - i, 'o') }, { ...AT, open: 1, glow: i < 1, sk }));
  shot('one', 18, DEEP, { face: [['stroke', [[109, 107], [123, 107]], 3], ['stroke', [[133, 105], [147, 105]], 3], ['dot', 119, 111, 3], ['dot', 143, 109, 3], ['stroke', [[122, 126], [134, 126]], 2.8]] }, { ...AT, open: 1, sk: [CX - 2, FLOOR - 88] });
  shot('shut0', 2, DEEP, { face: look(4, 2, 'flat') }, { ...AT, open: 1, sk: [CX - 2, FLOOR - 52] });
  shot('shut1', 2, DEEP, { face: look(0, 0, 'flat') }, { ...AT, open: 0.4 });
  shot('nod1', 8, DEEP, {}, { ...AT, base: D.T1 });
  shot('nod2', 6, DEEP, {}, { ...AT, base: D.T2 });
  shot('nod3', 6, DEEP, {}, { ...AT, base: D.S1 });
  steps(1, 0, 9).slice(1).forEach((t, i) => shot('up' + i, 2, DEEP, {}, { ...AT, px: 44 * t, pan: DEEP * t, base: D.S1 }));
  shot('top', 16, DEEP, {}, { pan: 0, pocket: 62, base: D.S1, extra: { fxm: 'idle', fx: [118, 198] } });
  k.done({ doze: false });
})();
