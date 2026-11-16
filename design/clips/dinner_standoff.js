// Dinner standoff: a small Lump pops up behind his salad at the far end of the table; he leans right across it, shouting and pointing, and the small one just blinks and goes back to his dinner.
// group: memes
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', INK = '#0B0E14', RED = '#FF5A4D', YELLOW = '#FFD23F', BLUE = '#5AB8FF', NIGHT = '#22304A', WOOD = '#8A5A2B', BROWN = '#6B4A1F', WHITE = '#F4F8FF', SHADE = '#C9D4E0', GREEN = '#58D68D', LEAF = '#2FA866', MOSS = '#1F7F4C', TAU = Math.PI * 2, P = 'dinner_standoff_';
  // his faces, turned towards the far end of the table
  const idle = [['dot',126,110,3.8], ['dot',150,108,3.8], ['stroke',[[130,123],[137,127],[144,123]],2.8]];
  const brow = [['stroke',[[116,100],[130,105]],3], ['stroke',[[144,103],[158,98]],3], ['dot',127,112,3.6], ['dot',151,110,3.6]];
  const glare = [...brow, ['stroke',[[132,127],[146,126]],3]];
  const inhale = [['stroke',[[118,104],[126,109],[118,114]],3], ['stroke',[[158,102],[150,107],[158,112]],3], ['dot',139,124,3], ['stroke',[[110,116],[114,123],[121,126]],2.4], ['stroke',[[166,114],[162,121],[155,124]],2.4]];
  const yell = [...brow, ['mouth',[[123,119],[153,117],[155,134],[139,143],[123,135]],[139,138,9,5]]];
  const yell2 = [...brow, ['mouth',[[125,120],[151,118],[152,131],[139,138],[126,132]],[139,134,8,4]]];
  const spent = [['stroke',[[118,105],[131,106]],2.6], ['dot',127,112,3.4], ['stroke',[[144,104],[157,103]],2.6], ['dot',151,110,3.4], ['mouth',[[131,121],[147,120],[148,131],[139,136],[131,131]],[139,133,6,4]]];
  // the small one's, looking back at him; drawn at half size, so a little bolder
  const dinner = [['dot',106,117,5], ['dot',132,115,5], ['stroke',[[110,128],[118,133],[126,128]],3.6]];
  const stare = [['dot',104,110,5], ['dot',130,108,5], ['stroke',[[110,126],[122,126]],3.6]];
  const blink = [['stroke',[[97,111],[111,111]],3.8], ['stroke',[[123,109],[137,109]],3.8], ['stroke',[[110,126],[122,126]],3.6]];
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const jog = (c, x, y, seed, rot = 0) => { c.translate(x + (seed % 3 - 1) * 0.5, y + (seed % 2) * 0.5); c.rotate(rot + (seed % 3 - 1) * 0.008); };
  // the small one, drawn the way the page draws him, and cut off where the table hides him
  const guest = (c, d, seed) => {
    c.save(); c.beginPath(); c.rect(0, 0, 240, 178); c.clip();
    c.save(); c.translate(3, 2); closedPath(c, boil(d.body, seed + 57, 1.6)); c.fillStyle = tint(); c.fill(); c.restore();
    c.strokeStyle = CREAM; closedPath(c, boil(d.body, seed + 7, 1.6)); inkStroke(c, 3.4);
    openPath(c, boil(d.curl, seed + 27, 1)); inkStroke(c, 2.8);
    c.fillStyle = c.strokeStyle = INK;
    d.face.forEach(mk => {
      if (mk[0] === 'dot') { c.beginPath(); c.arc(mk[1], mk[2], mk[3], 0, TAU); c.fill(); }
      else { openPath(c, mk[1]); c.lineWidth = mk[2]; c.stroke(); }
    });
    c.restore();
  };
  const windowpane = (c, fade, seed) => {
    c.save(); c.globalAlpha = fade; jog(c, 150, 46, seed); c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = NIGHT; c.beginPath(); c.rect(-24, -26, 48, 46); c.fill(); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.arc(10, -12, 6, 0, TAU); c.fill(); c.fillStyle = NIGHT; c.beginPath(); c.arc(13, -14, 5, 0, TAU); c.fill();
    c.fillStyle = CREAM; [[-13, -15], [-6, 8], [14, 9]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 1.3, 0, TAU); c.fill(); });
    c.lineWidth = 2; c.beginPath(); c.moveTo(0, -26); c.lineTo(0, 20); c.moveTo(-24, -3); c.lineTo(24, -3); c.stroke();
    c.lineWidth = 3.4; c.beginPath(); c.moveTo(-29, 22); c.lineTo(29, 22); c.stroke();
    c.restore();
  };
  // leaves fanned out on a plate at (x, y), with tomato and cucumber tucked in front
  const salad = (c, x, y, seed) => {
    c.save(); jog(c, x, y, seed); c.scale(1.2, 1.2);
    c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); c.ellipse(0, 0, 25, 5.5, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = SHADE; c.lineWidth = 1.6; c.beginPath(); c.ellipse(0, 0.5, 17, 3, 0, 0, TAU); c.stroke();
    [[-1.25, 15, LEAF], [1.2, 15, LEAF], [-0.62, 18, GREEN], [0.6, 18, GREEN], [0, 19, LEAF]].forEach(([a, len, colour]) => {
      c.save(); c.translate(a * 5, -2); c.rotate(a); c.fillStyle = colour; c.strokeStyle = CREAM; c.lineWidth = 1.8;
      c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(-8, -len * 0.6, 0, -len); c.quadraticCurveTo(8, -len * 0.6, 0, 0); c.fill(); c.stroke();
      c.strokeStyle = colour === LEAF ? MOSS : LEAF; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, -3); c.lineTo(0, -len + 4); c.stroke();
      c.restore();
    });
    c.strokeStyle = CREAM; c.lineWidth = 1.6;
    c.fillStyle = RED; [[-10, -4], [11, -3]].forEach(([tx, ty]) => { c.beginPath(); c.arc(tx, ty, 4.6, 0, TAU); c.fill(); c.stroke(); });
    c.fillStyle = '#C8F0D4'; c.beginPath(); c.arc(1, -3, 4.6, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = LEAF; c.beginPath(); c.arc(1, -3, 1.4, 0, TAU); c.fill();
    c.restore();
  };
  // a dinner table in front of them both; hop: his glass jumping
  const table = (c, slide, hop, seed) => {
    c.save(); jog(c, slide, 0, seed); c.strokeStyle = CREAM; c.lineWidth = 2.8; c.fillStyle = BROWN;
    c.beginPath(); c.rect(112, 188, 9, 14); c.rect(212, 188, 9, 14); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(166, 184, 72, 9, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = WOOD; c.beginPath(); c.ellipse(166, 177, 72, 9, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 1.8; c.beginPath(); c.moveTo(142, 181); c.quadraticCurveTo(158, 184, 174, 182); c.moveTo(108, 175); c.quadraticCurveTo(116, 177, 124, 176); c.stroke();
    c.translate(124, 176 - hop); c.rotate(hop * 0.03);
    c.fillStyle = BLUE; c.beginPath(); c.moveTo(-5.6, -9); c.lineTo(5.6, -9); c.lineTo(4.6, 0); c.lineTo(-4.6, 0); c.closePath(); c.fill();
    c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); c.moveTo(-6.6, -17); c.lineTo(-4.6, 0); c.lineTo(4.6, 0); c.lineTo(6.6, -17); c.stroke();
    c.restore();
  };
  const HOME = { k: 0.78, dx: -50 }, SEAT = { k: 0.52, dx: 70, dy: -19 };
  // one drawing. slide: how far off the table still is; fade: the room coming up; pal: [the small one's face, how far he has sunk behind the table, squash, how hard he is being shouted at]; hand: where his right nub points, from its shoulder; shout: 1 or 2, the lines coming out of his mouth
  const shot = (o, face, { slide = 0, fade = 1, pal, hand, shout, hop = 0, sweat } = {}) => {
    const q = { ...HOME, ...o }; q.dy = 201 - Math.max(...D.N.body.map(p => pt(q, p)[1]));        // leaning, he stays on the floor
    const s = pt(q, [162, 132]), m = pt(q, [141, 127]), small = pal && xf(D.N, { ...SEAT, dy: SEAT.dy + pal[1], ky: pal[2] || 1, rot: (pal[3] || 0) * 0.02, face: pal[0] });
    if (small && pal[3]) small.curl = small.curl.map(([x, y], i) => [x + i * pal[3], y + i * pal[3] * 0.3]);       // his cowlick blown back
    return xf(D.N, { ...q, face, extra: { ...(hand && { arm2: [s, [s[0] + hand[0], s[1] + hand[1]]] }),
      back: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        windowpane(c, fade, seed); if (small) guest(c, small, seed);
        c.restore();
      },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round'; table(c, slide, hop, seed); salad(c, 196 + slide, 181, seed);
        if (shout) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); [-0.66, -0.43, -0.2].forEach((a, i) => { const r0 = 41 + (i === 1 ? 3 : 0), r1 = r0 + (shout > 1 ? 13 : 8) + (i === 1 ? 4 : 0); c.moveTo(m[0] + Math.cos(a) * r0, m[1] + Math.sin(a) * r0); c.lineTo(m[0] + Math.cos(a) * r1, m[1] + Math.sin(a) * r1); }); c.stroke(); }
        if (sweat) { const [x, y] = pt(q, [100, 92]); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x, y - 7); c.quadraticCurveTo(x + 6, y + 3, x, y + 4); c.quadraticCurveTo(x - 6, y + 3, x, y - 7); c.fill(); c.stroke(); }
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he steps back to his end as the table slides in, and the small one pops up behind his plate; all undone at the end
  const WALK = [[0.96, -10], [0.91, -22], [0.86, -35], [0.81, -45], [0.78, -50]], SLIDE = [170, 104, 52, 14, 0];
  WALK.forEach(([k, dx], i) => add('in' + i, i ? 2 : 3, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, idle, { slide: SLIDE[i], fade: (i + 1) / 5 })));
  [[46, 1.05], [12, 1.08], [-5, 1.04], [0, 0.96]].forEach(([sunk, ky], i) => add('up' + i, 2, shot({}, idle, { pal: [dinner, sunk, ky] })));
  add('tuck', 4, shot({ rot: 0.03 }, glare, { pal: [dinner, 0] }));
  add('breath0', 2, shot({ rot: -0.07, ky: 1.04, kx: 1.02 }, glare, { pal: [dinner, 0] }));
  add('breath1', 4, shot({ rot: -0.14, ky: 1.1, kx: 1.07 }, inhale, { pal: [dinner, 0] }));
  add('lunge', 2, shot({ rot: 0.34, ky: 1.08, kx: 0.95 }, yell, { pal: [stare, 0, 0.94, 2.4], hand: [36, -4], shout: 2, hop: 5 }));
  // the tirade: two drawings back and forth, his nub jabbing, while the small one blinks once
  for (let i = 0; i < 14; i++) add('rant' + i, 2, shot(i % 2 ? { rot: 0.24, ky: 0.98 } : { rot: 0.28, ky: 1.03 }, i % 2 ? yell2 : yell, { pal: [i === 7 ? blink : stare, 0, 1, i % 2 ? 1.2 : 2], hand: i % 2 ? [29, -3] : [35, -6], shout: 1 + i % 2, hop: i % 4 === 2 ? 2 : 0 }));
  add('spent0', 4, shot({ rot: 0.22, ky: 0.95, kx: 1.03 }, spent, { pal: [stare, 0], hand: [31, 0], sweat: true }));
  add('spent1', 4, shot({ rot: 0.2, ky: 0.98 }, spent, { pal: [blink, 0], hand: [30, 3], sweat: true }));
  add('spent2', 4, shot({ rot: 0.2, ky: 0.95, kx: 1.03 }, spent, { pal: [stare, 0], hand: [29, 5], sweat: true }));
  add('shrug', 12, shot({ rot: 0.18, ky: 0.97 }, spent, { pal: [dinner, 0, 0.97], hand: [27, 9], sweat: true }));
  [4, 3, 2, 1, 0].forEach((i, n) => add('out' + n, 2, shot({ k: WALK[i][0], dx: WALK[i][1], rot: i % 2 ? 0.05 : -0.05 }, n < 2 ? spent : idle, { slide: SLIDE[i], fade: (i + 1) / 5, pal: n < 2 && [dinner, n ? 40 : 10] })));
  CLIPS.dinner_standoff = { home: 'idle', seq: [...seq, ...DOZE] };
})();
