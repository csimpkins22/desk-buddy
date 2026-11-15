// Cave dig: he tunnels down through the dirt in a winding trail, a boulder wobbles above him, and he scoots out just before it drops.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, K = 0.36, TOP = 46, ROW = 190, BY = 141, P = 'cave_dig_';
  const set = [['dot',113,108,8], ['dot',143,106,8], ['stroke',[[119,128],[137,127]],5]];
  const up = [['dot',116,98,8], ['dot',146,96,8], ['stroke',[[122,124],[128,122],[134,124]],5]];
  const yikes = [['dot',116,100,9], ['dot',146,98,9], ['mouth',[[120,120],[136,119],[139,138],[128,144],[117,138]]]];
  const wince = [['stroke',[[104,100],[118,108],[104,116]],6], ['stroke',[[152,98],[138,106],[152,114]],6], ['stroke',[[116,128],[122,124],[128,128],[134,124],[140,128]],5]];
  const phew = [['stroke',[[104,110],[113,102],[122,110]],6], ['stroke',[[134,108],[143,100],[152,108]],6], ['mouth',[[122,122],[134,121],[135,132],[128,136],[121,132]]]];
  const PATH = [[196, 24], [196, 92], [44, 92], [44, ROW], [128, ROW], [204, ROW]], SPECKS = [[26, 142], [86, 150], [184, 134], [216, 152], [96, 56], [22, 228], [120, 230], [204, 229]];
  // how far he has dug: the trail so far, and which way he is heading
  const along = dist => {
    const pts = [PATH[0]];
    for (let i = 1; i < PATH.length; i++) {
      const [x0, y0] = PATH[i - 1], [x1, y1] = PATH[i], len = Math.abs(x1 - x0) + Math.abs(y1 - y0), p = Math.min(1, dist / len);
      pts.push([x0 + (x1 - x0) * p, y0 + (y1 - y0) * p]); dist -= len;
      if (dist <= 0) return { pts, dir: [Math.sign(x1 - x0), Math.sign(y1 - y0)] };
    }
    return { pts, dir: [1, 0] };
  };
  // the dirt, his trail, and the boulder at height `by`, leaning by `tilt`; `mark` 1 sprays crumbs ahead of him, 2 is the thud
  const cave = (dist, by = BY, tilt = 0, mark = 0) => (c, d, seed) => {
    const { pts, dir } = along(dist), [x, y] = pts[pts.length - 1], bx = 128 + tilt * 14;
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#6B4A1F'; c.fillRect(0, TOP, 240, 240 - TOP);
    c.fillStyle = '#4A3212'; SPECKS.forEach(([sx, sy]) => { c.beginPath(); c.arc(sx, sy, 3, 0, TAU); c.fill(); });
    c.strokeStyle = CREAM; c.lineWidth = 3; openPath(c, boil([[0, TOP], [60, TOP + 1], [120, TOP - 1], [180, TOP], [240, TOP]], seed, 1.5)); c.stroke();
    c.strokeStyle = '#58D68D'; c.lineWidth = 2.6; c.beginPath();
    [18, 64, 104, 146, 232].forEach(gx => { c.moveTo(gx - 4, TOP - 9); c.lineTo(gx, TOP - 2); c.lineTo(gx + 5, TOP - 10); });
    c.stroke();
    c.strokeStyle = '#000'; c.lineWidth = 50; c.beginPath(); c.moveTo(196, 30); pts.slice(1).forEach(q => c.lineTo(...q)); c.stroke();
    c.fillStyle = '#9FB0C4'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    closedPath(c, boil([1, 0.84, 1.05, 0.9, 1, 0.82, 0.96, 1.06].map((l, i) => [bx + Math.cos(i / 8 * TAU + tilt) * 23 * l, by + Math.sin(i / 8 * TAU + tilt) * 23 * l]), seed + 5, 1));
    c.fill(); c.stroke();
    if (tilt && by < BY + 4) { c.beginPath(); [-1, 1].forEach(k => { c.moveTo(128 + k * 31, by - 8); c.lineTo(128 + k * 34, by + 4); }); c.stroke(); }
    c.fillStyle = '#A0672A';
    if (mark === 1) [[28, -8], [33, 7], [38, -1]].forEach(([f, s], i) => { const w = (seed + i) % 3 * 2; c.beginPath(); c.arc(x + dir[0] * (f + w) - dir[1] * s, y + dir[1] * (f + w) + dir[0] * s, 2.4, 0, TAU); c.fill(); });
    if (tilt) [[114, 4], [131, 12], [143, 2]].forEach(([cx, cy], i) => { c.beginPath(); c.arc(cx, by + 28 + cy + (seed + i) % 3 * 5, 2.4, 0, TAU); c.fill(); });
    if (mark === 2) { c.lineWidth = 2.6; c.beginPath(); [[-32, -2, -42, -10], [-30, 14, -40, 18], [32, -2, 42, -10], [30, 14, 40, 18]].forEach(([a, b, e, f]) => { c.moveTo(128 + a, by + b); c.lineTo(128 + e, by + f); }); c.stroke(); }
    c.restore();
  };
  const seq = [...WAKE];
  const put = (name, o, back, ticks = 2) => { D[P + name] = xf(D.N, { k: K, shadowK: 0, ...o, extra: { back, ...o.extra } }); seq.push([P + name, ticks]); };
  const inTunnel = (name, x, o, back, ticks) => put(name, { ox: 128, oy: 136, dx: x - 128, dy: ROW + 2 - 136, ...o }, back, ticks);
  put('in1', { k: 0.7, dx: 34, dy: -80, face: FACE.lookup }, cave(0), 3);      // an odd hold, so each drawing after it keeps one wobble for its two ticks
  put('in2', { k: 0.48, dx: 60, dy: -145, face: set }, cave(0));
  for (let t = 0; t <= 40; t += 2) {
    const { pts, dir } = along(t * 10.05), [x, y] = pts[pts.length - 1];
    put('dig' + t, { ox: 128, oy: 136, dx: x - 128, dy: y + 2 - 136, kx: dir[0] < 0 ? -1 : 1, rot: dir[0] * 0.2 + (t % 4 ? 0.06 : -0.06), face: set }, cave(t * 10.05, BY, 0, 1));
  }
  [0.1, -0.1, 0.1].forEach((tilt, i) => inTunnel('hm' + i, 128, { face: up }, cave(402, BY, tilt)));
  [0.22, -0.22, 0.22, -0.22, 0.22].forEach((tilt, i) => inTunnel('uhoh' + i, 128, { face: yikes, ky: 0.9, extra: { fxm: 'alert', fx: [160, 172] } }, cave(402, BY + 2, tilt)));
  inTunnel('go1', 160, { face: yikes, kx: 1.3, ky: 0.85, rot: 0.25 }, cave(434, BY + 8, -0.1));
  inTunnel('go2', 202, { face: wince, kx: 1.2, ky: 0.9, rot: 0.2 }, cave(478, BY + 30, 0.1));
  inTunnel('thud', 204, { face: wince, kx: -0.9, ky: 0.9 }, cave(478, ROW + 2, 0.2, 2));
  inTunnel('safe1', 204, { face: yikes, kx: -1 }, cave(478, ROW + 2, 0.2), 8);
  inTunnel('safe2', 204, { face: phew, kx: -1, ky: 0.95 }, cave(478, ROW + 2, 0.2), 14);
  D[P + 'up'] = xf(D.N, { k: 0.7, dx: 30, face: FACE.aah });
  D[P + 'ok'] = xf(D.N, { face: FACE.aah });
  seq.push([P + 'up', 2], [P + 'ok', 10], ...DOZE);
  CLIPS.cave_dig = { home: 'idle', seq };
})();
