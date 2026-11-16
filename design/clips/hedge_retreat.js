// Hedge retreat: a hedge grows up behind him. Holding a wide-eyed stare at you, he backs slowly into it until only his cowlick shows; then his eyes peek back out.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', DEEP = '#1D5A3C', MID = '#2F8D59', GREEN = '#58D68D', GAP = '#123A27', TWIG = '#6B4A1F', TURF = '#143524', INK = '#0B0E14', TAU = Math.PI * 2, P = 'hedge_retreat_';
  const stare = [['oval',116,108,5.4,6.2], ['oval',140,106,5.4,6.2], ['shine',117.6,105,1.8], ['shine',141.6,103,1.8], ['stroke',[[123,125],[133,124]],2.6]];
  const EDGE = [[8,204],[5,170],[9,136],[6,102],[13,70],[30,48],[58,41],[88,45],[118,39],[148,44],[178,40],[206,47],[227,68],[233,102],[230,136],[234,170],[231,204]];
  // the clumps of leaves: [x, y, size, how far back he has to be before it closes in front of him]. The last two are over his mouth and his eyes.
  const CLUMPS = [[36,172,24], [30,114,22], [50,68,22], [222,174,24], [226,114,22], [206,68,22], [92,58,20], [166,58,20],
    [84,182,24,0.1], [172,184,24,0.2], [128,191,23,0.3], [78,142,23,0.42], [178,144,23,0.52], [90,104,22,0.63], [166,102,22,0.73], [128,148,22,0.86], [128,109,22,1]];
  const N = 14, T = Array.from({ length: N }, (_, i) => { const u = i / (N - 1); return u * u * (3 - 2 * u); });
  const clump = (c, [x, y, r], seed, turn = 0, dy = 0) => {
    const at = (i, k) => { const a = x + turn + i / 6 * TAU; return [x + Math.cos(a) * r * k, y + dy + Math.sin(a) * r * k * 0.88]; };
    const pts = boil(Array.from({ length: 6 }, (_, i) => at(i, 1)), seed + x, 1.4);
    c.beginPath(); c.moveTo(...pts[0]); for (let i = 1; i <= 6; i++) c.quadraticCurveTo(...at(i - 0.5, 1.4), ...pts[i % 6]);
    c.fill(); c.stroke();
  };
  const leaf = (c, x, y, turn, s = 1) => {
    const ux = Math.cos(turn) * 6 * s, uy = Math.sin(turn) * 6 * s;
    c.moveTo(x - ux, y - uy); c.quadraticCurveTo(x - uy * 0.9, y + ux * 0.9, x + ux, y + uy); c.quadraticCurveTo(x + uy * 0.9, y - ux * 0.9, x - ux, y - uy);
  };
  const leaves = (c, list) => { c.fillStyle = GREEN; c.beginPath(); list.forEach(([x, y, r], i) => { if (i % 3 < 2) leaf(c, x - r * 0.3, y - r * 0.35, i * 1.9); }); c.fill(); };
  const twig = (c, pts) => { openPath(c, pts); c.strokeStyle = CREAM; c.lineWidth = 5.4; c.stroke(); c.strokeStyle = TWIG; c.lineWidth = 2.6; c.stroke(); };
  // s: how far the hedge still has to rise. t: how far back into it he is, 0 to 1. f: which step of backing in this is, for the rustle.
  // hidden: he is right inside, so only his cowlick shows. part: how far the leaves over his eyes have parted. look: which way the eyes in the gap are looking.
  const shot = ({ s = 0, t = 0, f = 99, hidden, part = 0, look, twitch = 0, ...o }) => {
    const split = thr => thr !== undefined && t >= thr, grown = Math.max(0, 1 - s / 190);
    const d = xf(D.N, { k: 1 - 0.2 * t, dy: -8 * t, shadowK: 0, ...o });
    if (twitch) { const [bx, by] = d.curl[0]; d.curl = d.curl.map(([x, y]) => [bx + (x - bx) * Math.cos(twitch) - (y - by) * Math.sin(twitch), by + (x - bx) * Math.sin(twitch) + (y - by) * Math.cos(twitch)]); }
    if (part) d.curl = d.curl.map(([x, y]) => [x, y - 15 * part]);            // the leaves on his head lift, and his cowlick with them
    d.back = (c, _, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round';
      c.globalAlpha = grown; c.fillStyle = TURF; c.fillRect(0, 203, 240, 37); c.globalAlpha = 1;
      c.translate(0, s);
      twig(c, [[196, 60], [205, 40], [216, 27]]); twig(c, [[205, 40], [196, 30]]); twig(c, [[44, 62], [34, 44], [36, 31]]);
      const E = boil(EDGE, seed + 3, 1.6);
      c.beginPath(); c.moveTo(...E[0]);
      for (let i = 1; i < E.length; i++) { const [ax, ay] = E[i - 1], [bx, by] = E[i], l = Math.hypot(bx - ax, by - ay); c.quadraticCurveTo((ax + bx) / 2 + (by - ay) / l * 10, (ay + by) / 2 - (bx - ax) / l * 10, bx, by); }
      c.closePath(); c.fillStyle = DEEP; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 3; c.stroke();
      c.fillStyle = GAP; c.beginPath(); [[60, 126, 9], [196, 128, 9], [128, 80, 9], [128, 56, 6]].forEach(([x, y, r]) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU); }); c.fill();
      const behind = CLUMPS.filter(k => !split(k[3]));
      c.fillStyle = MID; c.strokeStyle = GREEN; c.lineWidth = 2; behind.forEach(k => clump(c, k, seed));
      leaves(c, behind);
      c.translate(0, -s);
      if (!hidden) { c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, 60 * (1 - 0.2 * t) * (1 - t), 6, 0, 0, TAU); c.fill(); }
      c.restore();
    };
    d.front = (c, _, seed) => {
      const ahead = CLUMPS.filter(k => split(k[3])), loose = [];
      c.save(); c.lineCap = c.lineJoin = 'round'; c.translate(0, s);
      if (hidden) { c.fillStyle = DEEP; c.beginPath(); c.ellipse(128, 142, 56, 60, 0, 0, TAU); c.fill(); }
      if (look !== undefined) {                                            // his eyes, in the gap between the leaves
        c.fillStyle = tint(); c.beginPath(); c.ellipse(128, 120, 30, 11, 0, 0, TAU); c.fill();
        c.fillStyle = INK; c.beginPath(); [118.4, 137.6].forEach(x => { c.moveTo(x + look + 4.4, 120); c.arc(x + look, 120, 4.4, 0, TAU); }); c.fill();
        c.fillStyle = CREAM; c.beginPath(); [118.4, 137.6].forEach(x => { c.moveTo(x + look + 3, 118); c.arc(x + look + 1.4, 118, 1.5, 0, TAU); }); c.fill();
      }
      c.fillStyle = MID; c.strokeStyle = GREEN; c.lineWidth = 2;
      ahead.forEach(k => {
        const age = f - T.findIndex(v => v >= k[3]), [x, y, r, thr] = k, lift = thr === 1 ? -15 * part : thr > 0.8 ? 5 * part : age ? 0 : -3;
        clump(c, k, seed, (age === 0 ? 0.5 : age === 1 ? -0.25 : 0) + (thr > 0.8 ? part * 0.2 : 0), lift);
        if (age >= 0 && age < 3) loose.push([x - r - age * 4, y - r * 0.6 + age * age * 6, age], [x + r * 0.9 + age * 5, y - r * 0.8 + age * age * 7, age + 2]);
      });
      c.fillStyle = GREEN; c.beginPath(); ahead.forEach(([x, y, r, thr], i) => leaf(c, x - r * 0.3, y - r * 0.35 + (thr === 1 ? -15 * part : thr > 0.8 ? 5 * part : 0), i * 1.9 + 0.6)); c.fill();
      if (loose.length) { c.strokeStyle = CREAM; c.lineWidth = 1.6; c.beginPath(); loose.forEach(([x, y, a]) => leaf(c, x, y, a * 1.3, 1.1)); c.fill(); c.stroke(); }
      if (hidden) { c.strokeStyle = CREAM; openPath(c, boil(d.curl, seed + 20, 1.2)); inkStroke(c, 3.4); }
      c.translate(0, -s); c.globalAlpha = grown; c.strokeStyle = GREEN; c.lineWidth = 2.4; c.beginPath();
      [16, 52, 196, 230].forEach((x, i) => { [-5, 0, 5].forEach(lean => { c.moveTo(x + lean * 0.4, 208 + i % 2 * 9); c.lineTo(x + lean, 199 + i % 2 * 9 + Math.abs(lean) * 0.5); }); }); c.stroke();
      c.restore();
    };
    return d;
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  add('up0', 3, shot({ s: 190, face: FACE.lookr }));
  add('up1', 2, shot({ s: 112, face: FACE.lookr }));
  add('up2', 2, shot({ s: 46, face: FACE.lookup }));
  add('up3', 2, shot({ s: -7, face: FACE.lookup, ky: 1.03 }));
  add('up4', 4, shot({ face: D.N.face }));
  add('spot', 4, shot({ face: stare, ky: 0.93, kx: 1.05, extra: { fxm: 'alert', fx: [166, 62] } }));
  add('stare', 8, shot({ face: stare }));
  add('lean', 2, shot({ face: stare, ky: 1.025, kx: 0.985 }));
  for (let f = 1; f < N + 2; f++) add('back' + f, 2, shot({ t: T[f] || 1, f, face: stare, hidden: f >= N - 1, twitch: f < N ? 0 : f === N ? 0.3 : -0.2 }));
  D[P + 'gone0'] = shot({ t: 1, hidden: true });
  D[P + 'gone1'] = shot({ t: 1, hidden: true, twitch: 0.35 });
  show('gone0', 4); show('gone1', 4); show('gone0', 2);
  add('part', 2, shot({ t: 1, hidden: true, part: 0.5, look: 0 }));
  D[P + 'peek'] = shot({ t: 1, hidden: true, part: 1, look: 0 });
  show('peek', 6);
  add('peekl', 4, shot({ t: 1, hidden: true, part: 1, look: -4, twitch: -0.2 }));
  add('peekr', 4, shot({ t: 1, hidden: true, part: 1, look: 4, twitch: 0.2 }));
  show('peek', 8);
  add('down0', 2, shot({ t: 1, hidden: true, part: 1, look: 0, s: -6 }));
  add('down1', 2, shot({ t: 0.999, k: 0.86, dy: -5, s: 62, face: FACE.sheep }));
  add('down2', 2, shot({ t: 0.999, k: 0.93, dy: -2, s: 132, face: FACE.sheep }));
  add('down3', 2, shot({ t: 0.999, k: 1, dy: 0, s: 200, face: FACE.sheep }));
  add('out', 2, xf(D.N, { face: FACE.sheep }));
  CLIPS.hedge_retreat = { home: 'idle', seq: [...seq, ...DOZE] };
})();
