// This is fine: he settles at a little table with a mug while flames come up round the room, takes a calm sip, and goes on smiling when the mug catches fire too.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', YELLOW = '#FFD23F', WOOD = '#8A5A2B', BROWN = '#6B4A1F', WHITE = '#F4F8FF', SHADE = '#C9D4E0', BLUE = '#5AB8FF', GREEN = '#58D68D', TAU = Math.PI * 2, P = 'this_is_fine_';
  // faces turned a little towards the table
  const calm = [['dot',124,110,3.8], ['dot',148,108,3.8], ['stroke',[[127,121],[136,127],[145,121]],2.8]];
  const aside = [['dot',108,111,3.8], ['dot',132,109,3.8], ['stroke',[[113,123],[121,127],[129,123]],2.8]];
  const sipping = [['stroke',[[116,108],[122,111],[128,108]],2.8], ['stroke',[[140,106],[146,109],[152,106]],2.8]];
  const aah = [['stroke',[[118,110],[124,105],[130,110]],3], ['stroke',[[142,108],[148,103],[154,108]],3], ['mouth',[[130,120],[142,119],[141,127],[136,130],[131,127]]]];
  const eyeing = [['dot',129,114,3.8], ['dot',153,112,3.8], ['stroke',[[133,126],[142,126]],2.6]];
  const fine = [['stroke',[[118,110],[124,105],[130,110]],3], ['stroke',[[142,108],[148,103],[154,108]],3], ['stroke',[[126,120],[136,128],[146,120]],2.8]];
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  // a flame standing on (x, y), h tall, licking through three shapes; side: which way it leans
  const flame = (c, x, y, h, ph, seed, side = 1) => {
    if (h < 4) return;
    const w = h * 0.52 * side, lean = [-0.26, 0.04, 0.24][ph], lick = [0.56, 0.82, 0.66][ph];
    const [a, b, tip, n, notch, tongue, e, f, i, top, j] = boil([[-0.5, 0], [-0.84, -0.5], [lean, -1], [0, -0.66], [0.2, -0.45], [0.54, -lick], [0.8, -0.3], [0.5, 0], [-0.56, -0.36], [lean * 0.5, -0.66], [0.5, -0.3]].map(([u, v]) => [x + u * w, y + v * h]), seed, 1.2);
    c.beginPath(); c.moveTo(...a); c.quadraticCurveTo(...b, ...tip); c.quadraticCurveTo(...n, ...notch); c.lineTo(...tongue); c.quadraticCurveTo(...e, ...f); c.closePath();
    c.fillStyle = RED; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.stroke();
    c.beginPath(); c.moveTo(x - 0.3 * w, y); c.quadraticCurveTo(...i, ...top); c.quadraticCurveTo(...j, x + 0.3 * w, y); c.closePath(); c.fillStyle = YELLOW; c.fill();
  };
  // [x, floor, height, when it starts (0 to 1), side]: the ones behind him, then the ones this side of him
  const BEHIND = [[20, 203, 68, 0, 1], [236, 203, 90, 0.12, -1], [41, 203, 40, 0.42, -1]], NEAR = [[60, 241, 44, 0.3, 1], [224, 241, 52, 0.4, -1], [130, 241, 34, 0.55, 1], [8, 241, 46, 0.5, -1]];
  const fire = (c, list, g, ph, seed) => list.forEach(([x, y, h, from, side], i) => { const lv = Math.max(0, Math.min(1, (g - from) / 0.45)); flame(c, x, y, h * lv * (2 - lv), (ph + i) % 3, seed + i * 3, side); });
  const jog = (c, x, y, seed, rot = 0) => { c.translate(x + (seed % 3 - 1) * 0.5, y + (seed % 2) * 0.5); c.rotate(rot + (seed % 3 - 1) * 0.008); };
  const picture = (c, fade, seed) => {
    c.save(); c.globalAlpha = fade; jog(c, 205, 58, seed, -0.05); c.strokeStyle = CREAM; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-9, -16); c.lineTo(0, -25); c.lineTo(9, -16); c.stroke();
    c.lineWidth = 2.6; c.fillStyle = BROWN; c.beginPath(); c.rect(-22, -16, 44, 33); c.fill(); c.stroke();
    c.fillStyle = BLUE; c.fillRect(-16, -10, 32, 21);
    c.fillStyle = YELLOW; c.beginPath(); c.arc(8, -3, 4, 0, TAU); c.fill();
    c.fillStyle = GREEN; c.beginPath(); c.moveTo(-16, 11); c.lineTo(-16, 5); c.quadraticCurveTo(-5, -5, 5, 6); c.quadraticCurveTo(10, 2, 16, 6); c.lineTo(16, 11); c.closePath(); c.fill();
    c.lineWidth = 1.6; c.beginPath(); c.rect(-16, -10, 32, 21); c.stroke();
    c.restore();
  };
  const table = (c, slide, seed) => {
    c.save(); jog(c, slide, 0, seed); c.strokeStyle = CREAM; c.lineWidth = 2.8; c.fillStyle = BROWN;
    c.beginPath(); c.rect(181, 172, 10, 25); c.roundRect(163, 196, 46, 7, 3); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(186, 170, 44, 8, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = WOOD; c.beginPath(); c.ellipse(186, 164, 44, 8, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 1.8; c.beginPath(); c.moveTo(152, 165); c.quadraticCurveTo(164, 169, 178, 167); c.moveTo(200, 160); c.quadraticCurveTo(212, 162, 222, 161); c.stroke();
    c.restore();
  };
  // standing on (x, y) and tipped by rot, squashed to ky. top: 'steam', or how big the flame on it is
  const mug = (c, x, y, rot, top, seed, ky = 1) => {
    const S = 1.25, h = 26 * ky, w = 12 / Math.sqrt(ky);
    c.save(); jog(c, x, y, seed, rot); c.scale(S, S);
    c.beginPath(); c.moveTo(w - 1, -h * 0.8); c.bezierCurveTo(w + 13, -h * 0.86, w + 13, -h * 0.2, w - 2, -h * 0.24);
    c.strokeStyle = CREAM; c.lineWidth = 6.4; c.stroke(); c.strokeStyle = SHADE; c.lineWidth = 2.4; c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.2; c.fillStyle = WHITE;
    c.beginPath(); c.moveTo(-w, -h); c.lineTo(-w + 2, -3); c.quadraticCurveTo(-w + 2, 0, -w + 5, 0); c.lineTo(w - 5, 0); c.quadraticCurveTo(w - 2, 0, w - 2, -3); c.lineTo(w, -h); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = SHADE; c.beginPath(); c.moveTo(w - 4.6, -h + 3); c.lineTo(w - 1.4, -h + 3); c.lineTo(w - 3.2, -3); c.lineTo(w - 6, -3); c.closePath(); c.fill();
    c.fillStyle = BLUE; c.beginPath(); c.moveTo(-w + 0.8, -h * 0.64); c.lineTo(w - 0.8, -h * 0.64); c.lineTo(w - 1.3, -h * 0.38); c.lineTo(-w + 1.3, -h * 0.38); c.closePath(); c.fill();
    c.fillStyle = BROWN; c.beginPath(); c.ellipse(0, -h, w, 3.4, 0, 0, TAU); c.fill(); c.stroke();
    c.restore();
    const rx = x + S * h * Math.sin(rot), ry = y - S * h * Math.cos(rot), ph = seed % 3;
    if (top === 'steam') {
      c.save(); c.globalAlpha = 0.75; c.strokeStyle = CREAM; c.lineWidth = 2.2;
      [-5, 6].forEach((dx, i) => { const s = [-3, 2, 3][(ph + i) % 3]; openPath(c, [[rx + dx, ry - 7], [rx + dx + s, ry - 13], [rx + dx - s, ry - 20], [rx + dx + s * 0.6, ry - 26]]); c.stroke(); });
      c.restore();
    } else if (top) flame(c, rx, ry + 2, 34 * top, ph, seed + 40, -1);
  };
  const HOME = { k: 0.8, dx: -36 }, ON_TABLE = [182, 163, 0], HAND = [[172, 148], [165, 147]], CUP = [158, 170];
  // one drawing. slide: how far off the table still is; fade: the room coming up; g: how far the fire has got (0 to 1); at: where the mug is, top and ky: see mug; reach: [his shoulder, where the hand goes]; spark: an ember on its way
  const shot = (o, face, { slide = 0, fade = 1, g = 0, at = ON_TABLE, top = 'steam', reach, ky, spark } = {}) => {
    const q = { ...HOME, ...o };
    return xf(D.N, { ...q, face, extra: { ...(reach && { arm2: [pt(q, reach[0]), reach[1]] }),
      back: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        picture(c, fade, seed); fire(c, BEHIND, g, seed % 3, seed);
        c.restore();
      },
      front: (c, d, seed) => {
        const ph = seed % 3;
        c.save(); c.lineCap = c.lineJoin = 'round'; table(c, slide, seed); mug(c, at[0] + slide, at[1], at[2], top, seed, ky);
        if (spark) { c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 1.6; c.beginPath(); c.arc(spark[0], spark[1], 3.4, 0, TAU); c.fill(); c.stroke(); }
        fire(c, NEAR, g, ph, seed + 20);
        if (g > 0.55) { c.fillStyle = YELLOW; [[36, 118], [212, 96], [84, 58], [158, 40]].forEach(([x, y], i) => { const n = (ph + i) % 3; c.globalAlpha = 0.9 - n * 0.28; c.beginPath(); c.arc(x + n * 2, y - n * 9, 2, 0, TAU); c.fill(); }); }
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he shuffles back to his seat as the table slides in; and the same undone at the end
  const WALK = [[0.96, -8], [0.91, -17], [0.86, -26], [0.82, -32], [0.8, -36]], SLIDE = [120, 70, 34, 10, 0];
  WALK.forEach(([k, dx], i) => add('in' + i, i ? 2 : 3, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, calm, { slide: SLIDE[i], fade: (i + 1) / 5 })));
  add('sit', 2, shot({ ky: 0.94, kx: 1.04 }, calm));
  add('calm', 6, shot({}, calm));
  add('f0', 4, shot({}, calm, { g: 0.12 }));
  add('f1', 2, shot({ rot: -0.02 }, aside, { g: 0.24 }));
  add('f2', 6, shot({ rot: -0.03 }, aside, { g: 0.36 }));
  add('f3', 6, shot({}, calm, { g: 0.5 }));
  add('reach', 4, shot({ rot: 0.05 }, calm, { g: 0.6, reach: HAND }));
  add('lift', 2, shot({ rot: 0.02 }, calm, { g: 0.66, at: [160, 157, -0.25], reach: [HAND[0], [148, 146]] }));
  add('sip0', 4, shot({ rot: -0.04 }, sipping, { g: 0.72, at: [136, 160, -0.5], reach: [CUP, [133, 162]] }));
  add('sip1', 8, shot({ rot: -0.08, ky: 1.02 }, sipping, { g: 0.8, at: [131, 157, -0.68], reach: [CUP, [129, 159]] }));
  add('lower', 2, shot({ rot: 0.02 }, sipping, { g: 0.85, at: [160, 157, -0.2], reach: [HAND[0], [148, 146]] }));
  add('set', 2, shot({ rot: 0.05 }, calm, { g: 0.9, reach: HAND, ky: 0.88 }));
  add('aah', 6, shot({ ky: 1.02 }, aah, { g: 0.94 }));
  add('spark0', 2, shot({}, calm, { g: 0.96, spark: [222, 104] }));
  add('spark1', 2, shot({}, calm, { g: 0.98, spark: [203, 116] }));
  add('catch0', 2, shot({}, calm, { g: 1, top: 0.3 }));
  add('catch1', 2, shot({}, eyeing, { g: 1, top: 0.7 }));
  add('look', 6, shot({ rot: 0.03 }, eyeing, { g: 1, top: 1 }));
  add('fine0', 8, shot({}, calm, { g: 1, top: 1 }));
  add('fine1', 12, shot({ rot: -0.03, ky: 1.02 }, fine, { g: 1, top: 1 }));
  [0.62, 0.38, 0.18, 0.05, 0].forEach((g, n) => { const i = 4 - n, [k, dx] = WALK[i]; add('out' + n, 2, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, calm, { slide: SLIDE[i], fade: (i + 1) / 5, g, top: g > 0.1 ? g : 0 })); });
  CLIPS.this_is_fine = { home: 'idle', seq: [...seq, ...DOZE] };
})();
