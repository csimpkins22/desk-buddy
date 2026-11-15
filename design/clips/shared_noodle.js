// Shared noodle: a table for two with his double across the plate. They slurp one strand of spaghetti from both ends until they bump noses, and both blush.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', WINE = '#C8402F', YELLOW = '#FFD23F', WHITE = '#F4F8FF', TAU = Math.PI * 2, K = 0.74, MOUTH = [171, 125], P = 'shared_noodle_';
  // faces turned towards the middle of the table
  const gaze = [['dot',142,110,4], ['dot',164,107,4], ['stroke',[[150,124],[157,127],[164,123]],2.8]];
  const peckish = [['dot',143,115,4], ['dot',165,113,4], ['mouth',[[152,123],[164,122],[163,130],[158,133],[153,130]]]];
  const slurp = [['stroke',[[136,111],[142,106],[148,111]],3], ['stroke',[[158,108],[164,103],[170,108]],3], ['dot',170,125,3.4]];
  const suck = [['stroke',[[136,106],[144,110],[136,114]],3], ['stroke',[[170,103],[162,107],[170,111]],3], ['dot',171,125,2.6]];
  const wide = [['dot',146,110,5.2], ['dot',166,107,5.2], ['dot',171,126,2.6]];
  const cheeks = [['blush',124,124,10,6], ['blush',158,122,10,6], ['stroke',[[119,121],[123,127]],2], ['stroke',[[125,120],[129,126]],2], ['stroke',[[154,119],[158,125]],2], ['stroke',[[160,118],[164,124]],2]];
  const shy = [['dot',126,112,3.6], ['dot',148,110,3.6], ...cheeks, ['stroke',[[133,128],[137,126],[141,128],[145,126]],2.6]];
  const peek = [['dot',134,111,3.6], ['dot',156,109,3.6], ...cheeks, ['stroke',[[138,126],[144,129],[150,125]],2.6]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * o.k + o.dx, 201 + (u * Math.sin(r) + v * Math.cos(r)) * o.k + o.dy]; };
  const flip = d => ({ shadow: [256 - d.shadow[0], d.shadow[1]], body: d.body.map(([x, y]) => [256 - x, y]), curl: d.curl.map(([x, y]) => [256 - x, y]),
    face: d.face.map(mk => mk[0] === 'stroke' || mk[0] === 'mouth' ? [mk[0], mk[1].map(([x, y]) => [256 - x, y]), mk[2]] : [mk[0], 256 - mk[1], ...mk.slice(2)]) });
  // his double, drawn the way the page draws him; away: how far off to the right it still is
  const twin = (c, d, seed, away) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(away, 0);
    c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 203, d.shadow[1], 6, 0, 0, TAU); c.fill();
    c.save(); c.translate(4, 2.5); closedPath(c, boil(d.body, seed + 57, 2.2)); c.fillStyle = tint(); c.fill(); c.restore();
    c.strokeStyle = CREAM; closedPath(c, boil(d.body, seed + 7, 2.2)); inkStroke(c, 4);
    openPath(c, boil(d.curl, seed + 27, 1.2)); inkStroke(c, 3.4);
    d.face.forEach(mk => {
      c.fillStyle = c.strokeStyle = '#0B0E14';
      if (mk[0] === 'dot') { c.beginPath(); c.arc(mk[1], mk[2], mk[3], 0, TAU); c.fill(); }
      else if (mk[0] === 'stroke') { openPath(c, mk[1]); c.lineWidth = mk[2]; c.stroke(); }
      else if (mk[0] === 'mouth') { closedPath(c, mk[1]); c.fill(); }
      else { c.fillStyle = 'rgba(255,241,220,.33)'; c.beginPath(); c.ellipse(mk[1], mk[2], mk[3], mk[4], 0, 0, TAU); c.fill(); }
    });
    c.restore();
  };
  const lamp = (c, drop) => {
    c.save(); c.translate(128, drop); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(0, -70); c.lineTo(0, 16); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(0, 36, 7, 0, Math.PI); c.fill();
    c.fillStyle = '#58D68D'; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, 16); c.lineTo(10, 16); c.lineTo(22, 36); c.lineTo(-22, 36); c.closePath(); c.fill(); c.stroke();
    c.restore();
  };
  // the table for two in front of them, `rise` below its place. strand: the noodle, [his mouth, the double's mouth, how far its middle hangs, a twang]
  const table = (c, seed, rise, strand) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.translate(0, rise); c.strokeStyle = CREAM;
    c.fillStyle = '#6B4A1F'; c.lineWidth = 2.6; c.beginPath(); c.rect(121, 190, 14, 11); c.roundRect(103, 199, 50, 6, 3); c.fill(); c.stroke();
    c.fillStyle = WINE; c.lineWidth = 3; c.beginPath(); c.moveTo(57, 174); c.lineTo(57, 192);
    for (let i = 1; i < 10; i++) c.lineTo(57 + i * 14.2, i % 2 ? 198 : 192);                     // the cloth's pointed hem
    c.lineTo(199, 192); c.lineTo(199, 174); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = RED; c.beginPath(); for (let i = 0; i < 5; i++) c.rect(64 + i * 28, 183, 14, 8); c.fill();
    c.beginPath(); c.ellipse(128, 173, 73, 9, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = WHITE; c.lineWidth = 2.6; c.beginPath(); c.ellipse(128, 172, 37, 6.5, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = '#C9D4E0'; c.lineWidth = 2; c.beginPath(); c.ellipse(128, 172.5, 27, 3.8, 0, 0, TAU); c.stroke();
    if (strand) {
      const [a, b, dip, twang] = strand, y = (a[1] + b[1]) / 2 + twang, mid = x => a[0] + (b[0] - a[0]) * x;
      openPath(c, dip ? [a, [mid(0.2), y + dip * 0.8], [mid(0.5), y + dip], [mid(0.8), y + dip * 0.8], b] : [a, [mid(0.5), y], b]);
      c.strokeStyle = CREAM; c.lineWidth = 6; c.stroke(); c.strokeStyle = YELLOW; c.lineWidth = 3; c.stroke();
      if (twang) { c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); [-1, 1].forEach(side => { c.moveTo(123, y + side * 7); c.lineTo(133, y + side * 7); }); c.stroke(); }
    }
    c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    closedPath(c, boil([[103, 172], [107, 162], [117, 156], [129, 154], [141, 157], [149, 164], [153, 172]], seed + 3, 1.2), [0, 6]); c.fill(); c.stroke();
    c.strokeStyle = '#C89B5A'; c.lineWidth = 1.8; openPath(c, [[109, 167], [118, 161], [129, 165], [141, 160], [148, 167]]); c.stroke(); openPath(c, [[113, 171], [124, 166], [136, 170], [146, 165]]); c.stroke();
    c.fillStyle = RED; c.beginPath(); c.ellipse(129, 158, 13, 4.5, 0, 0, TAU); c.fill();
    c.fillStyle = '#8A5A2B'; c.strokeStyle = CREAM; c.lineWidth = 2; [[122, 154], [135, 156]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 5.5, 0, TAU); c.fill(); c.stroke(); });
    c.restore();
  };
  const sit = (sep, o) => ({ k: K, dx: -sep, dy: 0, ...o });
  // him at `o` and his double mirrored at `o2`, with the lamp and table. spark: the bump
  const duo = (o, face, { o2 = o, face2 = face, away = 0, rise = 0, drop = 0, dip, twang = 0, spark, solo } = {}) => {
    const other = !solo && flip(xf(D.N, { ...o2, face: face2 })), a = pt(o, MOUTH), b = pt(o2, MOUTH);
    return xf(D.N, { ...o, face, extra: {
      back: (c, d, seed) => { lamp(c, drop); if (other) twin(c, other, seed, away); },
      front: (c, d, seed) => {
        table(c, seed, rise, dip === undefined ? null : [a, [256 - b[0], b[1]], dip, twang]);
        if (spark) { c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); [[-9, -22], [0, -27], [9, -22]].forEach(([x, y]) => { c.moveTo(128 + x * 0.5, a[1] - 20 + y * 0.5); c.lineTo(128 + x, a[1] - 20 + y); }); c.stroke(); c.restore(); }
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he backs round to his side of the table as it comes up, the lamp comes down, and his double arrives; and the same undone at the end
  const WALK = [[0.95, -13], [0.88, -30], [0.81, -45], [0.76, -56], [K, -62]], AWAY = [0, 0, 120, 60, 22], RISE = [92, 50, 22, 8, 0], DROP = [-70, -44, -22, -6, 0];
  const walk = (i, face, face2) => duo({ k: WALK[i][0], dx: WALK[i][1], dy: 0, rot: i % 2 ? 0.05 : -0.05 }, face, { o2: sit(62), face2, away: AWAY[i], solo: i < 2, rise: RISE[i], drop: DROP[i] });
  for (let i = 0; i < 5; i++) add('sit' + i, i ? 2 : 3, walk(i, peckish, gaze));
  add('meet', 6, duo(sit(62), gaze));
  add('eye', 4, duo(sit(62), peckish));
  add('dive', 4, duo(sit(65, { rot: 0.24, ky: 0.94 }), suck));
  add('got', 4, duo(sit(62, { rot: 0.03 }), slurp, { dip: 24 }));
  [[61, 0.05, 16, 10], [58, 0.08, 5, 0], [54.5, 0.12, 0, 0], [51, 0.17, 0, 0]].forEach(([sep, rot, dip, dip2], i) => {
    add('pull' + i, 4, duo(sit(sep, { rot, ky: 1.04, kx: 0.98 }), suck, { dip }));
    add('rest' + i, 4, duo(sit(sep - 1.5, { rot: rot + 0.02, ky: 0.98 }), slurp, { dip: dip2, twang: i === 1 ? 1.5 : 0 }));
  });
  add('near', 2, duo(sit(48.5, { rot: 0.22 }), suck, { dip: 0 }));
  add('bump', 4, duo(sit(47.5, { rot: 0.25, kx: 0.92, ky: 1.05 }), wide, { spark: true }));
  add('oh', 6, duo(sit(48, { rot: 0.23 }), wide));
  add('apart', 2, duo(sit(64, { rot: -0.1, ky: 1.04 }), shy));
  add('blush', 10, duo(sit(62, { rot: -0.05 }), shy));
  add('peek', 6, duo(sit(62, { rot: -0.02 }), peek, { face2: shy }));
  add('both', 8, duo(sit(62, { rot: -0.02 }), peek));
  for (let i = 3; i >= 0; i--) add('go' + i, 2, walk(i, i > 1 ? peek : gaze, peek));
  CLIPS.shared_noodle = { home: 'idle', seq: [...seq, ...DOZE] };
})();
