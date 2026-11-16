// Paddle rally: two paddles bat him back and forth as the ball, faster each time, until he sails past one and a point pip ticks up.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', RED = '#FF5A4D', TAU = Math.PI * 2, P = 'paddle_rally_';
  const wheee = [['dot',112,108,8], ['dot',144,106,8], ['mouth',[[118,122],[138,121],[140,138],[128,144],[116,138]]]];
  const oof = [...FACE.chooEyes, ['mouth',[[121,118],[135,117],[137,131],[128,136],[119,131]]]];
  // paddles at heights ly and ry, slid `out` past their edges; `lit` is the one he is hitting (0 left, 1 right); the left one's pips up top
  const court = (ly, ry, { lit = -1, score = 0, out = 0, flash = false } = {}) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineJoin = c.lineCap = 'round';
    [[12 - out, ly, BLUE], [228 + out, ry, RED]].forEach(([x, y, colour], i) => {
      c.lineWidth = 3; c.fillStyle = i === lit ? CREAM : colour; c.beginPath(); c.roundRect(x - 7, y - 30, 14, 60, 6); c.fill(); c.stroke();
      if (i !== lit) return;
      const s = i ? -1 : 1; c.lineWidth = 2.5; c.beginPath();
      [-34, 0, 34].forEach(a => { c.moveTo(x + s * 16, y + a); c.lineTo(x + s * 26, y + a * 1.3); });
      c.stroke();
    });
    for (let i = 0; i < 3; i++) {
      const on = i < score, r = on && flash ? 8 : 5;
      c.lineWidth = 2; c.fillStyle = BLUE; c.globalAlpha = on ? 1 : 0.4; c.beginPath(); c.arc(44 + i * 18, 14, r, 0, TAU); if (on) c.fill(); c.stroke();
    }
    if (flash) {
      c.globalAlpha = 1; c.lineWidth = 2.5; c.beginPath();
      for (let k = 0; k < 6; k++) { const a = k * TAU / 6 + 0.5; c.moveTo(44 + Math.cos(a) * 13, 14 + Math.sin(a) * 13); c.lineTo(44 + Math.cos(a) * 19, 14 + Math.sin(a) * 19); }
      c.stroke();
    }
    c.restore();
  };
  const seq = [...WAKE, [P + 'in1', 3], [P + 'in2', 5], [P + 'ready', 3], [P + 'launch', 2]];
  D[P + 'in1'] = xf(D.N, { face: FACE.lookr, extra: { back: court(150, 104, { out: 16 }) } });
  D[P + 'in2'] = xf(D.N, { face: FACE.shock, extra: { back: court(150, 104), fxm: 'alert', fx: [150, 56] } });
  D[P + 'ready'] = xf(D.N, { face: FACE.shock, ky: 0.8, kx: 1.1, extra: { back: court(150, 104) } });
  D[P + 'launch'] = xf(D.N, { k: 0.68, ky: 1.2, dy: -14, face: wheee, shadowK: 0.5, extra: { back: court(150, 104) } });
  // each leg: where he ends up, and how many two-tick steps it takes; the rally speeds up, and the last leg goes straight past
  const LEGS = [[192, 104, 3], [50, 62, 5], [192, 150, 4], [50, 112, 3], [192, 72, 2], [50, 140, 2], [296, 84, 3]];
  let from = [128, 150], pad = [150, 104], n = 0;
  LEGS.forEach(([x, y, steps], leg) => {
    const side = x > 128 ? 1 : 0, last = leg === LEGS.length - 1, was = pad[side];
    for (let i = 1; i <= steps; i++) {
      const u = i / steps, bx = from[0] + (x - from[0]) * u, by = from[1] + (y - from[1]) * u, hit = i === steps && !last;
      pad[side] = was + ((last ? 184 : y) - was) * u;                 // the last time the paddle goes the wrong way
      const o = hit ? { kx: 0.7, face: oof } : { rot: n * 0.9, face: wheee };
      D[P + 'b' + n] = xf(D.N, { k: 0.5, ox: 128, oy: 136, dx: bx - 128, dy: by - 136, shadowK: 0, ...o, extra: { back: court(pad[0], pad[1], { lit: hit ? side : -1 }) } });
      seq.push([P + 'b' + n++, hit ? 3 : 2]);
    }
    from = [x, y];
  });
  const away = { dx: 400, shadowK: 0 }, drop = { face: FACE.shock, ky: 1.25, kx: 0.88 };
  D[P + 'gone'] = xf(D.N, { ...away, extra: { back: court(140, 184) } });
  D[P + 'point1'] = xf(D.N, { ...away, extra: { back: court(140, 184, { score: 1, flash: true }) } });
  D[P + 'point2'] = xf(D.N, { ...away, extra: { back: court(140, 184, { score: 1 }) } });
  D[P + 'back1'] = xf(D.N, { ...drop, dy: -150, shadowK: 0.4, extra: { back: court(140, 184, { score: 1, out: 10 }) } });
  D[P + 'back2'] = xf(D.N, { ...drop, dy: -60, shadowK: 0.7, extra: { back: court(140, 184, { score: 1, out: 30 }) } });
  D[P + 'land'] = xf(D.N, { face: FACE.spiral, ky: 0.6, kx: 1.25 });
  D[P + 'daze1'] = xf(D.N, { face: FACE.spiral, rot: 0.05 });
  D[P + 'daze2'] = xf(D.N, { face: FACE.spiral, rot: -0.05 });
  D[P + 'after'] = xf(D.N, { face: FACE.sheep });
  seq.push(...[['gone', 5], ['point1', 4], ['point2', 3], ['point1', 4], ['point2', 5], ['back1', 2], ['back2', 2], ['land', 4],
    ['daze1', 4], ['daze2', 4], ['daze1', 4], ['daze2', 4], ['after', 8]].map(([name, t]) => [P + name, t]), ...DOZE);
  CLIPS.paddle_rally = { home: 'idle', seq };
})();
