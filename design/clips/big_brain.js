// Big brain: a thought lights a spark over his head, which grows into a halo, then beams, then a blazing aura that lifts him off the floor with dots in orbit; it all fizzles out and leaves one small question mark.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', PALE = '#FFE685', GLARE = '#FFF6CC', RED = '#FF5A4D', BLUE = '#5AB8FF', GREEN = '#58D68D', WHITE = '#F4F8FF', GREY = '#9FB0C4', AMBER = '#D9981A', DARK = '#17161A', TAU = Math.PI * 2, P = 'big_brain_';
  const think = [['dot',120,104,3.8], ['dot',144,102,3.8], ['stroke',[[123,124],[133,123]],2.6]];
  const ah = [['dot',119,103,4.6], ['dot',143,101,4.6], ['mouth',[[123,117],[133,116],[134,125],[128,128],[122,125]]]];
  const pleased = [['dot',120,103,3.8], ['dot',144,101,3.8], ['stroke',[[121,119],[128,125],[136,119]],2.8]];
  const smug = [['stroke',[[110,108],[116,111],[122,108]],3], ['stroke',[[134,106],[140,109],[146,106]],3], ['stroke',[[119,120],[128,126],[138,119]],2.8]];
  const awed = [['oval',116,106,5.4,6.2], ['oval',140,104,5.4,6.2], ['shine',118,103,2], ['shine',142,101,2], ['mouth',[[123,118],[133,117],[134,125],[128,128],[122,125]]]];
  const cosmic = [['shine',116,107,6.2], ['shine',140,105,6.2], ['stroke',[[121,122],[128,125],[135,122]],2.6]];
  const uhoh = [['dot',116,108,4.4], ['dot',140,106,4.4], ['stroke',[[122,125],[128,122],[134,125]],2.6]];
  const blank = [['stroke',[[133,96],[146,93]],2.4], ['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[123,125],[133,125]],2.6]];
  const shut = [['stroke',[[133,97],[146,95]],2.4], ['stroke',[[110,110],[122,110]],2.8], ['stroke',[[134,108],[146,108]],2.8], ['stroke',[[123,125],[133,125]],2.6]];
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const star = (c, x, y, s) => { c.beginPath(); c.moveTo(x, y - s); c.quadraticCurveTo(x, y, x + s, y); c.quadraticCurveTo(x, y, x, y + s); c.quadraticCurveTo(x, y, x - s, y); c.quadraticCurveTo(x, y, x, y - s); c.fill(); };
  // the glow's four stages, each drawn round a point on him
  const spark = (c, x, y, r, ph) => {
    c.fillStyle = YELLOW; star(c, x, y, r * [1, 0.8, 1.14][ph]); c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, r * 0.3, 0, TAU); c.fill();
    if (ph !== 1 && r > 6) { c.strokeStyle = YELLOW; c.lineWidth = 2; c.beginPath(); [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([u, v]) => { c.moveTo(x + u * r * 0.6, y + v * r * 0.6); c.lineTo(x + u * r * 0.95, y + v * r * 0.95); }); c.stroke(); }
  };
  const halo = (c, x, y, s, ph) => {
    c.beginPath(); c.ellipse(x, y, 31 * s, 8.5 * s, 0, 0, TAU); c.strokeStyle = CREAM; c.lineWidth = 8.4; c.stroke(); c.strokeStyle = YELLOW; c.lineWidth = 4.6; c.stroke();
    c.fillStyle = CREAM; star(c, x + [31, -24, 6][ph] * s, y + [-2, -7, -9][ph] * s, 5.5);
  };
  const beams = (c, x, y, r0, r1, ph) => {
    [0, 1].forEach(odd => {
      c.fillStyle = odd ? PALE : YELLOW; c.beginPath();
      for (let i = odd; i < 13; i += 2) { const a = -Math.PI - 0.5 + i * (Math.PI + 1) / 12 + (ph - 1) * 0.035, r = r1 * (odd ? 0.74 : 1);
        c.moveTo(x + Math.cos(a - 0.09) * r0, y + Math.sin(a - 0.09) * r0); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.lineTo(x + Math.cos(a + 0.09) * r0, y + Math.sin(a + 0.09) * r0); }
      c.fill();
    });
  };
  // a ragged blaze all round him, s of its full size, its tongues taking turns to leap
  const aura = (c, x, y, s, ph, seed) => {
    const shape = k => boil(Array.from({ length: 16 }, (_, i) => { const a = i / 16 * TAU - Math.PI / 2, r = (i % 2 ? 0.74 : [1, 1.1, 0.92][(ph + i / 2) % 3]) * k * s; return [x + Math.cos(a) * 82 * r, y + Math.sin(a) * (Math.sin(a) < 0 ? 100 : 66) * r]; }), seed + 9, 2);
    closedPath(c, shape(1), [0, 2, 4, 6, 8, 10, 12, 14]); c.fillStyle = YELLOW; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 3; c.stroke();
    closedPath(c, shape(0.8), [0, 2, 4, 6, 8, 10, 12, 14]); c.fillStyle = PALE; c.fill();
    closedPath(c, shape(0.6), [0, 2, 4, 6, 8, 10, 12, 14]); c.fillStyle = GLARE; c.fill();
  };
  const ORBITS = [[-0.42, 0, BLUE], [0.42, 2.2, GREEN], [-0.42, 3.3, RED]];
  // dots circling his head on two tilted rings: the far halves behind him, the near halves in front. turn: how far round they are
  const orbit = (c, x, y, k, turn, near) => {
    c.strokeStyle = AMBER; c.lineWidth = 2;
    [-0.42, 0.42].forEach(tilt => { c.beginPath(); c.ellipse(x, y, 64 * k, 17 * k, tilt, near ? 0 : Math.PI, near ? Math.PI : TAU); c.stroke(); });
    c.strokeStyle = DARK; c.lineWidth = 2;
    ORBITS.forEach(([tilt, at, colour]) => {
      const a = turn + at, u = Math.cos(a) * 64 * k, v = Math.sin(a) * 17 * k;
      if (Math.sin(a) >= 0 !== !!near) return;
      c.fillStyle = colour; c.beginPath(); c.arc(x + u * Math.cos(tilt) - v * Math.sin(tilt), y + u * Math.sin(tilt) + v * Math.cos(tilt), 6, 0, TAU); c.fill(); c.stroke();
    });
  };
  // a pile of books beside him, `off` to the left of its place
  const books = (c, off, seed) => {
    c.save(); c.translate(-off + (seed % 3 - 1) * 0.5, 0); c.strokeStyle = CREAM; c.lineWidth = 2.4;
    [[6, 190, 46, 12, BLUE, YELLOW], [11, 178, 38, 12, RED, CREAM], [8, 167, 41, 11, GREEN, YELLOW]].forEach(([x, y, w, h, cover, band], i) => {
      c.fillStyle = cover; c.beginPath(); c.roundRect(x, y, w, h, 2.5); c.fill(); c.stroke();
      c.fillStyle = WHITE; c.fillRect(i % 2 ? x + 2 : x + w - 8, y + 2.6, 6, h - 5.2);
      c.fillStyle = band; c.fillRect(i % 2 ? x + w - 12 : x + 8, y + 1.4, 3.4, h - 2.8);
    });
    c.restore();
  };
  // the question mark that is left, s of its full size
  const query = (c, x, y, s, seed) => {
    c.save(); c.translate(x, y); c.scale(s, s); c.strokeStyle = c.fillStyle = CREAM;
    openPath(c, boil([[-7, -9], [-4, -16], [4, -17], [8, -11], [4, -4], [0, 0], [0, 5]], seed + 4, 0.9)); c.lineWidth = 3.8; c.stroke();
    c.beginPath(); c.arc(0.5, 12.5, 2.7, 0, TAU); c.fill();
    c.restore();
  };
  // one drawing. off: the books; chin: his nub to his chin; glow: { spark, halo, disc, beams: [from, to], aura, orbit: [size, turn] or the tick it began at }; wisp: smoke off his cowlick; mark: the question mark's size
  const shot = (o, face, { off = 0, fade = 1, chin, glow = {}, wisp, mark } = {}) => {
    const head = pt(o, [128, 106]), crown = pt(o, [128, 80]), top = pt(o, [128, 34]), ring = pt(o, [128, 47]), k = o.k ?? 1;
    const turn = tick => glow.orbit.length ? glow.orbit[1] : Math.floor((tick - glow.orbit) / 2) * 0.5, size = () => glow.orbit.length ? glow.orbit[0] : 1;
    return xf(D.N, { ...o, face, extra: { ...(chin && { arm2: [pt(o, [166, 142]), pt(o, [147, 131])] }),
      back: (c, d, seed, tick) => {
        const ph = seed % 3;
        c.save(); c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        if (glow.beams) beams(c, head[0], head[1], glow.beams[0], glow.beams[1], ph);
        if (glow.aura) aura(c, head[0], head[1] + 20 * k, glow.aura, ph, seed);
        if (glow.disc) { c.fillStyle = YELLOW; c.globalAlpha = 0.14; [58, 74].forEach(r => { c.beginPath(); c.arc(head[0], head[1], r * k * glow.disc, 0, TAU); c.fill(); }); c.globalAlpha = 1; }
        if (glow.orbit !== undefined) orbit(c, crown[0], crown[1], k * size(), turn(tick), false);
        c.restore();
      },
      front: (c, d, seed, tick) => {
        const ph = seed % 3;
        c.save(); c.lineCap = c.lineJoin = 'round'; books(c, off, seed);
        if (glow.orbit !== undefined) orbit(c, crown[0], crown[1], k * size(), turn(tick), true);
        if (glow.halo) halo(c, ring[0], ring[1], glow.halo * k, ph);
        if (glow.spark) spark(c, top[0], top[1], glow.spark, ph);
        if (wisp) { c.globalAlpha = wisp; c.strokeStyle = GREY; c.lineWidth = 2.4; openPath(c, boil([[top[0], top[1] + 8], [top[0] - 5, top[1] - 2], [top[0] + 4, top[1] - 12], [top[0] - 2, top[1] - 22]], seed, 2)); c.stroke(); c.globalAlpha = 1; }
        if (mark) query(c, 164, 42, mark, seed);
        c.restore();
      } } });
  };
  let now = 29;
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); now += ticks; }, squash = ky => ({ ky, kx: 1 + (1 - ky) * 0.6 });

  [56, 24, 6].forEach((off, i) => add('hm' + i, i ? 2 : 3, shot({ rot: i === 1 ? -0.02 : 0 }, think, { off, fade: (i + 1) / 3, chin: i > 0 })));
  add('think', 6, shot({ rot: -0.03 }, think, { chin: true }));
  // a spark
  add('idea0', 2, shot(squash(0.92), ah, { glow: { spark: 6 } }));
  add('idea1', 2, shot(squash(1.05), ah, { glow: { spark: 19 } }));
  add('idea2', 8, shot({}, pleased, { glow: { spark: 14 } }));
  // a halo
  add('halo0', 2, shot({ k: 0.97, ...squash(0.9) }, pleased, { glow: { spark: 16, halo: 0.5 } }));
  add('halo1', 2, shot({ k: 0.94, ...squash(1.06) }, smug, { glow: { halo: 1.2, disc: 0.7 } }));
  add('halo2', 10, shot({ k: 0.93 }, smug, { glow: { halo: 1, disc: 1 } }));
  // beams
  add('beam0', 2, shot({ k: 0.9, ...squash(0.88) }, smug, { glow: { halo: 1, disc: 1, beams: [50, 62] } }));
  add('beam1', 2, shot({ k: 0.87, ...squash(1.07) }, awed, { glow: { halo: 1.05, disc: 1.1, beams: [48, 112] } }));
  add('beam2', 12, shot({ k: 0.86 }, awed, { glow: { halo: 1, disc: 1, beams: [48, 98] } }));
  // the lot, and off the floor
  add('aura0', 2, shot({ k: 0.83, ...squash(0.82) }, awed, { glow: { halo: 1, disc: 1, beams: [48, 104], aura: 0.5 } }));
  add('aura1', 2, shot({ k: 0.8, ...squash(1.12), dy: -8, shadowK: 0.85 }, cosmic, { glow: { halo: 1.1, beams: [50, 150], aura: 1.12, orbit: [0.7, 0] } }));
  const from = now;
  for (let i = 0; i < 10; i++) add('aura' + (i + 2), 2, shot({ k: 0.78, dy: -16 - 3 * Math.sin(i * TAU / 10), shadowK: 0.7 }, cosmic, { glow: { halo: 1, beams: [50, 140], aura: 1, orbit: from } }));
  // ...and out
  add('fizz0', 2, shot({ k: 0.82, dy: -12, shadowK: 0.8 }, uhoh, { glow: { halo: 0.9, beams: [48, 84], aura: 0.7, orbit: [1.1, 5.3] } }));
  add('fizz1', 2, shot({ k: 0.88, dy: -5, ky: 1.05, shadowK: 0.9 }, uhoh, { glow: { halo: 0.6, aura: 0.4, orbit: [1.3, 5.9] } }));
  add('fizz2', 2, shot({ k: 0.95, ...squash(0.86) }, uhoh, { glow: { spark: 10 } }));
  add('fizz3', 2, shot(squash(1.04), uhoh, { glow: { spark: 5 }, wisp: 0.8 }));
  add('huh0', 2, shot({}, blank, { wisp: 0.5, mark: 1.3 }));
  add('huh1', 8, shot({}, blank, { mark: 1 }));
  add('huh2', 2, shot({}, shut, { mark: 1 }));
  add('huh3', 8, shot({ rot: 0.03 }, blank, { mark: 1 }));
  [[0.65, 18], [0.3, 50]].forEach(([mark, off], i) => add('out' + i, 2, shot({}, blank, { mark, off, fade: 0.6 - i * 0.4 })));
  CLIPS.big_brain = { home: 'idle', seq: [...seq, ...DOZE] };
})();
