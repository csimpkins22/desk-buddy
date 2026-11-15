// Clone: he splits in two, the bald twin wants the cowlick, and a tug of war pings it off. They merge and it lands back on him.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', K = 0.7;
  const gaze = (dx, dy = 0) => [['dot',116 + dx,110 + dy,5], ['dot',140 + dx,108 + dy,5], ['stroke',[[122 + dx,125],[128 + dx,127],[134 + dx,125]],3]];
  const cross = (dx, open) => [['stroke',[[104 + dx,97],[120 + dx,103]],3.4], ['stroke',[[136 + dx,101],[152 + dx,95]],3.4], ['dot',116 + dx,112,4.6], ['dot',140 + dx,110,4.6],
    open ? ['mouth',[[120 + dx,121],[136 + dx,120],[137 + dx,133],[128 + dx,137],[120 + dx,132]]] : ['stroke',[[121 + dx,128],[135 + dx,127]],3.4]];
  const strain = [...FACE.chooEyes, ['stroke',[[119,126],[124,123],[129,126],[134,123],[138,126]],3]];
  const bald = d => ({ ...d, curl: d.curl.map(() => d.curl[0]) });
  // the other one, drawn the way the page draws him
  const twin = d => (c, _, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 203, d.shadow[1], 6, 0, 0, Math.PI * 2); c.fill();
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 50, 2.2)); c.fillStyle = tint(); c.fill(); c.restore();
    c.strokeStyle = CREAM; c.lineWidth = 4; closedPath(c, boil(d.body, seed, 2.2)); c.stroke();
    c.fillStyle = c.strokeStyle = '#0B0E14';
    d.face.forEach(mk => {
      if (mk[0] === 'dot') { c.beginPath(); c.arc(mk[1], mk[2], mk[3], 0, Math.PI * 2); c.fill(); }
      else if (mk[0] === 'stroke') { openPath(c, mk[1]); c.lineWidth = mk[2]; c.stroke(); }
      else { closedPath(c, mk[1]); c.fill(); }
    });
    c.restore();
  };
  const lock = (x, y) => (c, _, seed) => {             // the cowlick on its own, in the air
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3.4; c.lineCap = 'round';
    openPath(c, boil([[0, 19], [-6, 8], [-2, 0], [6, 3], [3, 9]].map(([u, v]) => [x + u, y + v]), seed, 1.2)); c.stroke(); c.restore();
  };
  // him on the left (a) and the twin on the right (b); sep: how far apart
  const pair = (a, b, extra = {}, sep = 52, k = K) => {
    const me = xf(D.N, { k, ...a, dx: (a.dx || 0) - sep }), other = twin(bald(xf(D.N, { k, ...b, dx: (b.dx || 0) + sep })));
    const also = extra.also, slot = extra.behind ? 'back' : 'front';
    return { ...(a.bald ? bald(me) : me), ...extra, [slot]: (c, d, seed) => { other(c, d, seed); if (also) also(c, d, seed); } };
  };
  const tug = (lean, hand, sag) => {
    const d = pair({ rot: -lean, face: strain }, { rot: lean, face: strain }, { arm2: [[150, 150], hand] }), top = d.curl[0];
    return { ...d, curl: [top, [(top[0] + hand[0]) / 2, (top[1] + hand[1]) / 2 + sag], hand] };
  };
  const pop = (c, _, seed) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    [[-8, -26], [8, -26], [-12, 0], [12, 0], [-8, 26], [8, 26]].forEach(([u, v]) => { c.moveTo(128 + u * 0.3, 150 + v * 0.6); c.lineTo(128 + u, 150 + v); });
    c.stroke(); c.restore();
  };
  D.clone_1 = xf(D.N, { kx: 1.15, ky: 0.93, face: FACE.shock });
  D.clone_2 = xf(D.N, { kx: 1.42, ky: 0.82, face: strain });
  D.clone_3 = pair({ face: strain }, { face: strain }, { behind: true }, 26, 0.8);
  D.clone_4 = pair({ face: FACE.shock, rot: -0.08 }, { face: FACE.shock, rot: 0.08 }, { also: pop });
  D.clone_5 = pair({ face: gaze(9) }, { face: gaze(-9) });
  D.clone_6 = pair({ face: gaze(9) }, { face: gaze(-12, -7) }, { fxm: 'alert', fx: [200, 96] });
  D.clone_7 = pair({ face: cross(8, true), rot: 0.08 }, { face: cross(-8), rot: -0.06 });
  D.clone_8 = pair({ face: cross(8), rot: 0.06 }, { face: cross(-8, true), rot: -0.1 });
  D.clone_9 = tug(0.03, [128, 136], 6);
  D.clone_10 = tug(0.14, [136, 130], 0);
  D.clone_11 = pair({ face: FACE.shock, rot: -0.3, bald: true }, { face: FACE.shock, rot: 0.3 }, { also: lock(118, 62) });
  D.clone_12 = pair({ face: gaze(6, -8), bald: true }, { face: gaze(-6, -8) }, { also: lock(120, 14) });
  D.clone_13 = pair({ face: gaze(6, -8), bald: true }, { face: gaze(-6, -8) });
  D.clone_14 = pair({ face: gaze(9), bald: true }, { face: gaze(-9) });
  D.clone_15 = pair({ face: strain, bald: true }, { face: strain }, { behind: true }, 26, 0.8);
  D.clone_16 = bald(xf(D.N, { kx: 1.34, ky: 0.84, face: strain }));
  D.clone_17 = { ...bald(xf(D.N, { kx: 0.95, ky: 1.05, face: FACE.lookup })), front: lock(124, 4) };
  D.clone_18 = { ...bald(xf(D.N, { face: FACE.lookup })), front: lock(124, 30) };
  D.clone_19 = xf(D.N, { ky: 0.9, kx: 1.05, face: [['stroke',[[110,110],[122,110]],3], ['stroke',[[134,108],[146,108]],3], ['stroke',[[122,124],[128,126],[134,124]],2.8]] });
  D.clone_20 = xf(D.N, { face: FACE.happy, extra: { fxm: 'done', fx: [128, 52] } });
  const row = (a, b, n, t) => Array.from({ length: n }, (_, i) => [i % 2 ? b : a, t]);
  CLIPS.clone = { home: 'idle', seq: [...WAKE, ['clone_1', 4], ['clone_2', 4], ['clone_3', 3], ['clone_4', 4], ['clone_5', 8], ['clone_6', 8],
    ...row('clone_7', 'clone_8', 4, 5), ['clone_9', 5], ...row('clone_10', 'clone_9', 5, 3), ['clone_11', 3], ['clone_12', 3], ['clone_13', 7], ['clone_14', 5],
    ['clone_15', 3], ['clone_16', 3], ['clone_17', 3], ['clone_18', 3], ['clone_19', 3], ['clone_20', 10], ...DOZE] };
})();
