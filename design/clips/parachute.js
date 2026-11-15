// He jumps off the top of the screen, then drifts down, tiny, under a round parachute from the top left to the bottom right over hills and a low sun. He lands, the canopy settles beside him, and he sits looking at the view.
(() => {
  const { xf, D, FACE, kit } = window.__lump, { CREAM, WHITE, RED, GREEN, BROWN, YELLOW, GREY, TAU } = kit;
  const k = kit.clip('parachute');
  // zooms are whole 256ths: the board stores a zoom that finely, and anything between drifts a wide scene off by a pixel
  const Z = 104 / 256, F1 = [15.5, 11], PAN = 300, FROM = [-692.5, -565], RIM = 25;
  const lerp = (a, b, t) => a + (b - a) * t, clamp = t => Math.max(0, Math.min(1, t));
  // where a point on standing Lump lands after xf(D.N, o), whatever o turns him about
  const on = (o, [x, y]) => { const r = o.rot || 0, ox = o.ox ?? 128, oy = o.oy ?? 201, u = (x - ox) * (o.kx ?? 1), v = (y - oy) * (o.ky ?? 1);
    return [ox + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), oy + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };

  // the land he comes down over, drawn large: it all lies left of where he lands. gx is how far right the ground line runs.
  const HILLS = [[-640, 150, 120, 0], [-470, 170, 150, 0], [-300, 150, 110, 0], [-150, 140, 135, 0], [-560, 120, 70, 1], [-380, 130, 80, 1], [-215, 120, 60, 1], [-90, 80, 50, 1]];
  const TREES = [[-560, 135], [-360, 127], [-150, 162], [-90, 156]];
  const CLOUDS = [[-250, -330], [-430, -150], [-120, -110], [150, -190]];
  const scene = (c, gx = 330, sun = 0, land = true, at) => {
    const seen = (x, y, r) => !at || (Math.abs(x - at[0]) < 300 + r && Math.abs(y - at[1]) < 300 + r);   // skip what the view at `at` can't see
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (land && seen(0, 204, 150)) {
    c.fillStyle = YELLOW; c.beginPath(); c.arc(-225, 92 + sun, 44, 0, TAU); c.fill();
    HILLS.filter(([x, w]) => seen(x, 204, w)).forEach(([x, w, h, near]) => {
      c.beginPath(); c.moveTo(x - w, 204); c.quadraticCurveTo(x, 204 - h * 2, x + w, 204); c.closePath();
      c.fillStyle = near ? '#1C4A30' : '#12301F'; c.fill(); c.strokeStyle = near ? GREEN : '#2F7D55'; c.lineWidth = 6; c.stroke();
    });
    TREES.filter(([x]) => seen(x, 204, 30)).forEach(([x, y]) => {
      c.strokeStyle = BROWN; c.lineWidth = 8; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - 30); c.stroke();
      c.fillStyle = '#2F7D55'; c.strokeStyle = CREAM; c.lineWidth = 5; c.beginPath(); c.arc(x, y - 50, 24, 0, TAU); c.fill(); c.stroke();
    });
    c.strokeStyle = CREAM; c.lineWidth = 6; c.beginPath(); c.moveTo(-780, 204); c.lineTo(gx, 204); c.stroke();
    }
    c.fillStyle = '#3A4654'; c.strokeStyle = GREY; c.lineWidth = 10;
    CLOUDS.filter(([x, y]) => seen(x, y, 70)).forEach(([x, y]) => { c.beginPath(); [[x - 32, y, 26], [x, y - 12, 34], [x + 34, y + 2, 26]].forEach(([a, b, r]) => { c.moveTo(a + r, b); c.arc(a, b, r, 0, TAU); }); c.stroke(); c.fill(); });
    c.restore();
  };
  // a round canopy, its rim centred on (x, y), in red and white gores
  const canopy = (c, x, y, rot, rx, ry) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round'; c.lineWidth = 5; c.strokeStyle = CREAM;
    [-1, -0.5, 0, 0.5].forEach((u, i) => {
      const a = u * rx, b = (u + 0.5) * rx;
      c.beginPath(); c.moveTo(a, 0); c.quadraticCurveTo(a, -ry, 0, -ry); c.quadraticCurveTo(b, -ry, b, 0); c.quadraticCurveTo((a + b) / 2, -ry * 0.16, a, 0); c.closePath();
      c.fillStyle = i % 2 ? WHITE : RED; c.fill(); c.stroke();
    });
    c.restore();
  };
  // the canopy and its four lines: each line runs from the rim to him, or (as slack goes to 1) to the ground beside the canopy
  const HOLD = [[96, 98], [116, 74], [142, 73], [166, 96]];
  const rig = (c, o, x, y, rot, rx, ry, slack = 0) => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 6; c.beginPath();
    [-0.94, -0.33, 0.33, 0.94].forEach((u, i) => {
      const h = on(o, HOLD[i]), ex = lerp(h[0], x + u * 60, slack), ey = lerp(h[1], 204, slack);
      c.moveTo(x + u * rx * Math.cos(rot), y + u * rx * Math.sin(rot)); c.lineTo(ex, ey);
    });
    c.stroke(); c.restore();
    canopy(c, x, y, rot, rx, ry);
  };

  // up and away, the view going up after him until there is only cloud
  k.add('look', 4, xf(D.N, { face: FACE.lookup }));
  k.add('crouch', 4, xf(D.N, { kx: 1.12, ky: 0.78, face: FACE.lookup }));
  k.add('spring', 2, xf(D.N, { kx: 0.88, ky: 1.25, dy: -30, shadowK: 0.7, face: FACE.lookup }));
  k.add('up', 2, xf(D.N, { kx: 0.85, ky: 1.3, dy: -150, shadowK: 0.3, face: FACE.lookup, extra: { front: c => { c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); [[100, 30], [128, 44], [156, 30]].forEach(([x, l]) => { c.moveTo(x, 70); c.lineTo(x, 70 + l); }); c.stroke(); c.restore(); } } }));
  [560, 300, 120, 30].forEach((off, i) => k.add('sky' + i, 2, kit.gone({ view: kit.view(Z, [F1[0] - PAN, F1[1] - PAN + off]), back: c => scene(c, 330, 0, false) })));
  // the long drift down, the view following him
  const N = 56;
  kit.steps(0, 1, N).forEach((e, i) => {
    const o = { dx: FROM[0] * (1 - e), dy: FROM[1] * (1 - e), rot: 0.12 * Math.sin(i * 0.38) * (1 - e), ox: 128, oy: RIM, shadowK: 0 };
    const at = [F1[0] - PAN * (1 - e), F1[1] - PAN * (1 - e)];
    k.add('drift' + i, 2, xf(D.N, { ...o, face: kit.look(3, 4, 'smile'), extra: { view: kit.view(Z, at),
      back: c => { scene(c, 330, 0, true, at); rig(c, o, 128 + o.dx, RIM + o.dy, o.rot, 90, 58); } } }));
  });
  // down: a soft squash, and the canopy sinks to the ground on his left
  const wide = kit.view(Z, F1), sit = { kx: 1.08, ky: 0.8 };
  const land = { kx: 1.1, ky: 0.86 };
  k.add('land', 2, xf(D.N, { ...land, face: kit.look(0, 4, 'smile'), extra: { view: wide, back: c => { scene(c); rig(c, land, 128, RIM, 0, 90, 58); } } }));
  kit.steps(0, 1, 8).slice(1).forEach((s, i) => {
    const o = { kx: lerp(1, sit.kx, s), ky: lerp(1.04, sit.ky, s) };
    k.add('fold' + i, 2, xf(D.N, { ...o, face: kit.look(-6 * s, 0, 'smile'), extra: { view: wide,
      back: c => { scene(c); rig(c, o, lerp(128, -120, Math.pow(s, 0.7)), lerp(RIM, 204, Math.pow(s, 1.6)), -0.9 * Math.sin(Math.PI * s), lerp(90, 72, s), lerp(58, 30, s), clamp((s - 0.3) / 0.7)); } } }));
  });
  // he sits and looks; the sun goes down a little
  [0, 5, 10].forEach((sun, i) => k.add('sit' + i, 8, xf(D.N, { ...sit, face: kit.look(-6, -1, 'smile'), extra: { view: wide, back: c => { scene(c, 330, sun); rig(c, sit, -120, 204, 0, 72, 30, 1); } } })));
  // back in to him, the land sliding off to the left and the ground line drawing back with it
  kit.steps(0, 1, 7).slice(1).forEach((q, i) => {
    const o = { kx: lerp(sit.kx, 1, q), ky: lerp(sit.ky, 1, q) };
    k.add('home' + i, 2, xf(D.N, { ...o, face: kit.look(-6 * (1 - q), 0, 'smile'), extra: { view: kit.view(Math.round(lerp(Z, 1, q) * 256) / 256, [128, 201], [lerp(165, 128, q), lerp(196, 201, q)]),
      back: c => { scene(c, lerp(330, -30, q), 10); rig(c, o, -120, 204, 0, 72, 30, 1); } } }));
  });
  k.done();
})();
