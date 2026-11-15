// Distracted: out strolling with his balloon, he turns to watch a bigger, shinier one drift by, and the balloon on his string glares at him and deflates in protest.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', INK = '#0B0E14', RED = '#FF5A4D', DEEP = '#C8402F', GOLD = '#FFD23F', AMBER = '#D9981A', GREEN = '#58D68D', BLUE = '#5AB8FF', TAU = Math.PI * 2, P = 'distracted_';
  const move = (face, dx, dy) => face.map(m => m[0] === 'stroke' ? ['stroke', m[1].map(([x, y]) => [x + dx, y + dy]), m[2]] : m[0] === 'mouth' ? ['mouth', m[1].map(([x, y]) => [x + dx, y + dy]), m[2] && [m[2][0] + dx, m[2][1] + dy, m[2][2], m[2][3]]] : [m[0], m[1] + dx, m[2] + dy, ...m.slice(3)]);
  const ahead = [['dot',108,109,4], ['dot',132,107,4], ['stroke',[[112,121],[120,126],[128,121]],2.8]];
  const up = [['dot',124,103,3.8], ['dot',148,101,3.8], ['stroke',[[128,119],[135,123],[142,118]],2.8]];
  const spot = [['dot',103,109,4.8], ['dot',127,107,4.8], ['mouth',[[110,120],[120,119],[121,128],[115,131],[109,128]]]];
  const smitten = (dx, dy) => move(FACE.cute, dx, dy);
  const sheepish = [['dot',129,114,3.6], ['dot',153,112,3.6], ['stroke',[[131,127],[135,125],[139,127],[143,125],[147,127]],2.6]];
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const star = (c, x, y, s) => { c.beginPath(); c.moveTo(x, y - s); c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s); c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill(); };
  const line = (c, pts, w) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.lineWidth = w; c.stroke(); };
  // the balloon on his string, centred on (x, y) at k of its full size. mood: 'ahead', 'side' (eyeing him), 'cross', 'puff' (about to blow) or 'pfft'
  const pal = (c, x, y, k, mood, seed, tilt = 0) => {
    const rx = 23 * k, ry = 27 * k, [lx, ly] = mood === 'ahead' ? [-5, 0] : [-6, 4];
    c.save(); c.translate(x + (seed % 3 - 1) * 0.5, y + (seed % 2) * 0.5); c.rotate(tilt);
    c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    c.beginPath(); c.moveTo(0, ry - 2); c.lineTo(-5, ry + 6); c.lineTo(5, ry + 6); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(0, 0, rx, ry, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = DEEP; c.lineWidth = 2.2; c.beginPath(); c.arc(0, 1, rx * 0.74, 0.3, 1.2); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(0, -2, rx * 0.68, -2.75, -1.95); c.stroke();
    c.fillStyle = c.strokeStyle = INK;
    if (mood === 'puff' || mood === 'pfft') {
      line(c, [[-12, -8], [-5, -4], [-12, 0]], 2.4); line(c, [[10, -8], [3, -4], [10, 0]], 2.4);
      c.beginPath(); c.arc(-1, 8, mood === 'pfft' ? 3.4 * k : 2.2, 0, TAU); c.fill();
    } else {
      c.beginPath(); c.arc(-7 + lx, -3 + ly, 2.7, 0, TAU); c.arc(7 + lx, -3 + ly, 2.7, 0, TAU); c.fill();
      if (mood === 'ahead') { c.beginPath(); c.moveTo(-5 + lx, 6); c.quadraticCurveTo(lx, 11, 5 + lx, 6); c.lineWidth = 2.2; c.stroke(); }
      else if (mood === 'side') line(c, [[-4 + lx, 9 + ly], [4 + lx, 9 + ly]], 2.2);
      else { line(c, [[-13 + lx, -11 + ly], [-4 + lx, -7 + ly]], 2.4); line(c, [[4 + lx, -7 + ly], [13 + lx, -11 + ly]], 2.4); c.beginPath(); c.moveTo(-5 + lx, 12 + ly); c.quadraticCurveTo(lx, 7 + ly, 5 + lx, 12 + ly); c.lineWidth = 2.2; c.stroke(); }
    }
    c.restore();
  };
  // ...and what is left of it: hanging from its knot at (x, y), or dropped on the path (y at the floor)
  const limp = (c, x, y, seed, huff) => {
    const down = y > 190;
    c.save(); c.translate(x, y); c.rotate(down ? -1.25 : (seed % 3 - 1) * 0.04); c.scale(1.3, 1.3); c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 2.1;
    closedPath(c, boil([[0, 0], [5, 6], [10, 16], [9, 28], [2, 35], [-6, 32], [-10, 22], [-8, 11], [-4, 5]], seed + 3, 1), [0]); c.fill(); c.stroke();
    c.strokeStyle = DEEP; line(c, [[-6, 12], [-2, 15]], 1.5); line(c, [[6, 26], [2, 30]], 1.5);
    c.strokeStyle = INK; line(c, [[-6, 19], [-2, 20]], 1.8); line(c, [[2, 20], [6, 19]], 1.8); c.beginPath(); c.moveTo(-3, 27); c.quadraticCurveTo(0, 24, 3, 27); c.lineWidth = 1.6; c.stroke();
    if (huff) { c.strokeStyle = CREAM; c.globalAlpha = 0.8; line(c, [[-5, 37], [-8, 42]], 1.6); line(c, [[1, 38], [1, 44]], 1.6); line(c, [[7, 36], [10, 40]], 1.6); }
    c.restore();
  };
  // the one drifting by, centred on (x, y): a long ribbon, a deep sheen, and glints that take turns
  const beauty = (c, x, y, seed) => {
    const ph = seed % 3, sway = [-4, 3, 5][ph];
    c.save(); c.translate(x, y + (ph - 1) * 0.7); c.strokeStyle = CREAM;
    c.lineWidth = 2; openPath(c, [[0, 48], [sway, 59], [-sway, 72], [sway * 0.7, 84], [-sway * 0.5, 94]]); c.stroke();
    c.fillStyle = GOLD; c.lineWidth = 3;
    c.beginPath(); c.moveTo(0, 37); c.lineTo(-7, 48); c.lineTo(7, 48); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(0, 0, 33, 39, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = AMBER; c.lineWidth = 3.6; c.beginPath(); c.arc(0, 3, 23, 0.25, 1.3); c.stroke();
    c.strokeStyle = '#FFF8E0'; c.lineWidth = 4.6; c.beginPath(); c.arc(0, -4, 21, -2.8, -1.9); c.stroke();
    c.fillStyle = '#FFF8E0'; c.beginPath(); c.arc(13, -24, 2.8, 0, TAU); c.fill();
    c.fillStyle = CREAM; [[-40, -30, 8], [37, -39, 6], [43, 12, 7]].forEach(([sx, sy, s], i) => { if (i !== ph) star(c, sx, sy, s); });
    c.restore();
  };
  const TUFTS = [[24, 0], [112, 1], [196, 0], [262, 1]];
  // the path he is strolling along: grass going by behind him, and bigger, faster, in front
  const path = (c, scroll, fade, near) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (!near) { c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); }
    c.globalAlpha = near ? fade * 0.6 : fade; c.strokeStyle = GREEN; c.lineWidth = near ? 3 : 2.4; c.beginPath();
    TUFTS.forEach(([x0, flower]) => {
      const s = near ? 1.5 : 1, x = ((x0 + (near ? 70 : 0) + scroll * s) % 290 + 290) % 290 - 25, y = near ? 232 : 203;
      c.moveTo(x - 7 * s, y); c.lineTo(x - 5 * s, y - 7 * s); c.lineTo(x - 2 * s, y); c.lineTo(x, y - 11 * s); c.lineTo(x + 2 * s, y); c.lineTo(x + 6 * s, y - 6 * s); c.lineTo(x + 7 * s, y);
      if (flower && !near) { c.moveTo(x + 15, y); c.lineTo(x + 16, y - 12); }
    });
    c.stroke();
    if (!near) { c.fillStyle = GOLD; c.strokeStyle = CREAM; c.lineWidth = 1.6; TUFTS.forEach(([x0, flower]) => { if (flower) { const x = ((x0 + scroll) % 290 + 290) % 290 - 25; c.beginPath(); c.arc(x + 16, 189, 3.4, 0, TAU); c.fill(); c.stroke(); } }); }
    c.restore();
  };
  const HOME = { k: 0.78, dx: 8 }, AX = 200, AY = 60;
  // one drawing. a: his balloon { x, y (off its usual place), k, mood, tilt }; down: it has gone flat, hanging from his hand (true) or dropped on the path at that x; huff: air leaving it; b: where the shiny one is; scroll: how far the path has gone by; grip: he has the string
  const shot = (o, face, { a = {}, down, huff, b, scroll = 0, fade = 1, grip = true, sweat } = {}) => {
    const q = { ...HOME, ...o }, s = pt(q, [166, 142]), hand = [s[0] + 25, s[1] - 9], ax = AX + (a.x || 0), ay = AY + (a.y || 0), k = a.k || 1;
    return xf(D.N, { ...q, face, extra: { ...(grip && { arm2: [s, hand] }),
      back: (c, d, seed) => { path(c, scroll, fade); if (b) { c.save(); c.lineCap = c.lineJoin = 'round'; beauty(c, b[0], b[1], seed); c.restore(); } },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2;
        if (down) {
          const [x, y] = down === true ? [hand[0] + 7, hand[1] + 10] : [down, 199];
          c.beginPath();
          if (down === true) { c.moveTo(hand[0] + 4, hand[1]); c.lineTo(x, y); } else { c.moveTo(x, y); c.bezierCurveTo(x - 12, 204, x - 26, 193, x - 40, 200); }
          c.stroke(); limp(c, x, y, seed, huff);
        } else {
          const t = a.tilt || 0, kx = ax - Math.sin(t) * (27 * k + 6), ky = ay + Math.cos(t) * (27 * k + 6), sag = (seed % 3 - 1) * 2;
          c.beginPath(); c.moveTo(kx, ky);
          if (grip) c.quadraticCurveTo((kx + hand[0]) / 2 + 5 + sag, (ky + hand[1]) / 2 + 4, hand[0] + 4, hand[1]);
          else c.bezierCurveTo(kx + 5 + sag, ky + 22, kx - 6 - sag, ky + 44, kx + 2, ky + 64);
          c.stroke();
          if (huff) { c.globalAlpha = 0.85; [[-9, 5], [0, 10], [9, 5]].forEach(([u, v]) => line(c, [[kx + u * 0.6, ky + v * 0.6 + 3], [kx + u * 1.5, ky + v * 1.5 + 5]], 2.2)); c.globalAlpha = 1; }
          pal(c, ax, ay, k, a.mood || 'ahead', seed, t);
        }
        if (sweat) { const [x, y] = pt(q, [96, 96]); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x, y - 7); c.quadraticCurveTo(x + 6, y + 3, x, y + 4); c.quadraticCurveTo(x - 6, y + 3, x, y - 7); c.fill(); c.stroke(); }
        c.restore(); path(c, scroll, fade, true);
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he steps back onto the path as his balloon comes down to him, and takes its string
  const WALK = [[0.95, 2], [0.9, 4], [0.85, 6], [0.81, 7], [0.78, 8]], DROP = [-96, -52, -16, 4, 0];
  WALK.forEach(([k, dx], i) => add('in' + i, i ? 2 : 3, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, up, { fade: (i + 1) / 5, a: { y: DROP[i] }, grip: i > 2 })));
  // strolling: four steps round and round, the path going by and the balloon bobbing after him. The shiny one comes in on the last few
  const STEP = [{ rot: -0.05 }, { ky: 0.95, kx: 1.03 }, { rot: 0.05 }, { ky: 1.03, kx: 0.98 }], BOB = [0, 3, 0, -3], ENTER = [[-34, 152], [-19, 141], [-5, 130], [7, 119]];
  for (let i = 0; i < 12; i++) add('walk' + i, 2, shot(STEP[i % 4], ahead, { scroll: (i + 1) * 7, a: { x: 4, y: BOB[(i + 3) % 4], tilt: 0.1 }, b: ENTER[i - 8] }));
  add('spot', 2, shot({ ky: 0.93, kx: 1.05 }, spot, { scroll: 86, a: { y: 4 }, b: [17, 109] }));
  // his head follows it up while the one on his string looks round at him, and takes it badly
  [[24, 101], [31, 93], [38, 85], [44, 78], [48, 72], [50, 68]].forEach((b, i) => add('gaze' + i, 2, shot({ rot: -0.04 - i * 0.012, ky: 1 + i * 0.008 }, smitten(-13 + i, -i * 1.4), { scroll: 86, b, a: { mood: i < 2 ? 'ahead' : i < 4 ? 'side' : 'cross', tilt: [0.08, 0.03, -0.06, -0.12, -0.14, -0.14][i] } })));
  add('sigh0', 4, shot({ rot: -0.1, ky: 1.04 }, smitten(-8, -8), { scroll: 86, b: [51, 66], a: { mood: 'cross', tilt: -0.14 } }));
  add('sigh1', 4, shot({ rot: -0.1, ky: 1.05 }, smitten(-8, -9), { scroll: 86, b: [52, 63], a: { mood: 'puff', k: 1.15, tilt: -0.1 } }));
  [[5, 6, 0.9, 0.25], [-3, 24, 0.72, -0.2], [9, 50, 0.56, 0.6], [1, 78, 0.44, 0.1]].forEach(([x, y, k, tilt], i) => add('pfft' + i, 2, shot({ rot: -0.1, ky: 1.05 }, smitten(-7, -10), { scroll: 86, b: [54 + i * 2, 54 - i * 14], a: { x, y, k, tilt, mood: 'pfft' }, huff: true })));
  add('flop', 2, shot({ rot: -0.09, ky: 1.05 }, smitten(-6, -11), { scroll: 86, b: [66, -10], down: true, huff: true }));
  add('gone', 4, shot({ rot: -0.06, ky: 1.03 }, smitten(-6, -11), { scroll: 86, b: [70, -56], down: true }));
  add('turn', 2, shot({ rot: 0.02 }, D.N.face, { scroll: 86, down: true }));
  add('oops0', 8, shot({ rot: 0.05, ky: 0.97 }, sheepish, { scroll: 86, down: true, sweat: true }));
  add('oops1', 8, shot({ rot: 0.05, ky: 0.96 }, sheepish, { scroll: 86, down: true, sweat: true, huff: true }));
  // he lets the string go and walks on, and the path takes it away
  [[0.78, 8], [0.82, 7], [0.87, 5], [0.92, 3], [0.97, 1]].forEach(([k, dx], i) => add('out' + i, 2, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, i < 2 ? sheepish : ahead, { scroll: 86 + (i + 1) * 12, down: 204 + i * 20, grip: false, fade: 1 - (i + 1) / 5 })));
  CLIPS.distracted = { home: 'idle', seq: [...seq, ...DOZE] };
})();
