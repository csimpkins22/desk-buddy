// Obvious outcome: he holds a pin up beside a balloon, gives you a look, pokes it, and when it pops he stands there with a perfectly round mouth, astonished.
(() => {
  const { D, CLIPS, xf, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', YELLOW = '#FFD23F', BLUE = '#5AB8FF', NAVY = '#3A86C8', GREEN = '#58D68D', GREY = '#9FB0C4', SLATE = '#6F7C8C', TAU = Math.PI * 2, P = 'obvious_outcome_';
  const eager = [['dot',124,110,4], ['dot',148,108,4], ['stroke',[[128,122],[136,127],[144,121]],2.8]];
  const atPin = [['dot',129,105,4], ['dot',153,103,4], ['stroke',[[130,121],[137,125],[144,120]],2.8]];
  const atYou = [['stroke',[[107,98],[120,95]],2.4], ['stroke',[[135,94],[148,95]],2.4], ['dot',116,110,4.2], ['dot',140,108,4.2], ['stroke',[[119,122],[128,126],[138,120]],2.8]];
  const wink = [...atYou.slice(0, 3), ['stroke',[[134,109],[140,104],[146,109]],3], ['stroke',[[119,122],[128,127],[138,120]],2.8]];
  const aim = [['stroke',[[116,101],[129,105]],2.6], ['stroke',[[143,103],[156,99]],2.6], ['dot',127,112,3.8], ['dot',151,110,3.8], ['stroke',[[131,126],[141,125]],2.8]];
  const flinch = [['stroke',[[112,104],[120,109],[112,114]],3], ['stroke',[[152,102],[144,107],[152,112]],3], ['oval',132,125,5,5]];
  const gasp = [['stroke',[[114,95],[127,93]],2.4], ['stroke',[[141,92],[154,94]],2.4], ['dot',124,108,5.2], ['dot',148,106,5.2], ['oval',136,127,8,8]];
  const gaspAtYou = [['stroke',[[107,95],[120,93]],2.4], ['stroke',[[135,92],[148,94]],2.4], ['dot',116,108,5.4], ['dot',140,106,5.4], ['oval',128,127,9,9]];
  const pt = (o, [x, y]) => { const k = o.k ?? 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const FLAGS = [[18, YELLOW], [52, RED], [86, GREEN], [120, BLUE], [154, YELLOW], [188, RED], [222, GREEN]];
  // party bunting strung across the top, `lift` above its place
  const bunting = (c, lift, seed) => {
    const sag = x => 5 + 60 * (x / 240) * (1 - x / 240) - lift;
    c.save(); c.globalAlpha = 0.85; c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 5 - lift); c.quadraticCurveTo(120, 35 - lift, 240, 5 - lift); c.stroke();
    FLAGS.forEach(([x, colour], i) => { const y = sag(x) - 1, w = (seed + i) % 3 - 1; c.fillStyle = colour; c.beginPath(); c.moveTo(x - 8, y); c.lineTo(x + 8, y); c.lineTo(x + w, y + 17); c.closePath(); c.fill(); });
    c.restore();
  };
  // the pin: held by its head at (x, y), pointing along a; glint: its point catching the light
  const pin = (c, x, y, a, glint) => {
    c.save(); c.translate(x, y); c.rotate(a);
    c.beginPath(); c.moveTo(0, 0); c.lineTo(26, 0); c.lineTo(31, 0); c.strokeStyle = CREAM; c.lineWidth = 5; c.stroke(); c.beginPath(); c.moveTo(0, 0); c.lineTo(29, 0); c.strokeStyle = GREY; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = RED; c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); c.arc(0, 0, 5.6, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(-1.6, -1.8, 1.5, 0, TAU); c.fill();
    if (glint) { c.beginPath(); c.moveTo(34, -9); c.quadraticCurveTo(34, 0, 43, 0); c.quadraticCurveTo(34, 0, 34, 9); c.quadraticCurveTo(34, 0, 25, 0); c.quadraticCurveTo(34, 0, 34, -9); c.fill(); }
    c.restore();
  };
  const BX = 192, BY = 96, BITS = [[-0.9, -0.5], [0.1, -1], [0.95, -0.45], [0.8, 0.55], [-0.2, 0.95], [-0.75, 0.35]], STAR = [1, 0.5, 0.86, 0.46, 1.05, 0.52, 0.8, 0.44, 0.98, 0.5, 0.9, 0.42, 1.04, 0.5, 0.84, 0.46];
  // the balloon on its weight, `off` to the right of its place. stage: 0 whole (lean: swaying), 1 dented by the pin, 2 the bang, 3 and 4 the bits flying and falling, 5 all over the floor
  const balloon = (c, off, stage, lean, seed) => {
    const x = BX + off, wob = (seed % 3 - 1) * 0.6;
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath();
    if (stage < 2) { c.moveTo(x, 190); c.quadraticCurveTo(x + lean * 20 + wob, 160, x + lean * 34, BY + 44); }
    else if (stage === 2) { c.moveTo(x, 190); c.bezierCurveTo(x + 6, 172, x - 7, 156, x + 2, 140); }
    else if (stage === 3) { c.moveTo(x, 190); c.bezierCurveTo(x + 9, 180, x - 10, 172, x + 6, 160); }
    else if (stage === 4) { c.moveTo(x, 190); c.bezierCurveTo(x + 12, 186, x - 6, 190, x + 14, 196); }
    else { c.moveTo(x, 190); c.bezierCurveTo(x + 4, 201, x + 14, 195, x + 24, 200); }
    c.stroke();
    c.fillStyle = GREY; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x - 6, 190); c.lineTo(x + 6, 190); c.lineTo(x + 10, 202); c.lineTo(x - 10, 202); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = SLATE; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x - 6, 197); c.lineTo(x + 6, 197); c.stroke();
    if (stage < 2) {
      c.translate(x + lean * 34 + wob * 0.6, BY); c.rotate(lean * 0.5); c.strokeStyle = CREAM; c.fillStyle = BLUE; c.lineWidth = 3;
      c.beginPath(); c.moveTo(0, 34); c.lineTo(-6, 44); c.lineTo(6, 44); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); if (stage) c.ellipse(4, 0, 27, 38, 0, 0, TAU); else c.ellipse(0, 0, 31, 37, 0, 0, TAU); c.fill(); c.stroke();
      c.strokeStyle = NAVY; c.lineWidth = 3.2; c.beginPath(); c.arc(1, 3, 21, 0.25, 1.3); c.stroke();
      c.strokeStyle = '#EAF6FF'; c.lineWidth = 4.2; c.beginPath(); c.arc(1, -4, 19, -2.8, -1.95); c.stroke();
      if (stage) { c.strokeStyle = NAVY; c.lineWidth = 2; c.beginPath(); c.moveTo(-17, -10); c.lineTo(-12, -5); c.moveTo(-18, 12); c.lineTo(-12, 8); c.stroke(); }
    } else if (stage === 2) {
      c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath();
      STAR.forEach((r, i) => { const a = i / 16 * TAU + 0.2; c.lineTo(x + Math.cos(a) * r * 46, BY + Math.sin(a) * r * 46); }); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = CREAM; c.beginPath(); STAR.forEach((r, i) => { const a = i / 16 * TAU + 0.6; c.lineTo(x + Math.cos(a) * r * 22, BY + Math.sin(a) * r * 22); }); c.closePath(); c.fill();
    } else if (stage === 3) {
      c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath();
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + 0.4, r = i % 2 ? 50 : 56; c.moveTo(x + Math.cos(a) * 36, BY + Math.sin(a) * 36); c.lineTo(x + Math.cos(a) * r, BY + Math.sin(a) * r); }
      c.stroke();
    }
    if (stage > 1) {
      c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2;
      BITS.forEach(([u, v], i) => {
        const far = [0, 0, 30, 50, 54, 44][stage], bx = x + u * far + (stage === 5 ? i * 3 - 4 : 0), by = stage === 5 ? 199 - i % 2 * 2 : stage === 4 ? Math.min(196, BY + v * 46 + 52 + i * 5) : BY + v * far + (stage - 2) * 5, turn = i * 1.3 + stage * 0.9 + (stage === 5 ? 0 : wob * 0.1);
        c.save(); c.translate(bx, by); c.rotate(stage === 5 ? (i % 2 ? 0.2 : -0.15) : turn);
        c.beginPath(); c.moveTo(-6, 2); c.quadraticCurveTo(-1, -6, 6, -3); c.lineTo(3, 4); c.closePath(); c.fill(); c.stroke(); c.restore();
      });
    }
    c.restore();
  };
  const HOME = { k: 0.84, dx: -30 };
  // one drawing. off: how far off to the right the balloon still is; stage, lean: see balloon; lift: the bunting above its place; hold: [hand x, y from his shoulder, the pin's angle, glint]; tucked: it is still behind his back
  const shot = (o, face, { off = 0, stage = 0, lean = 0, fade = 1, lift = 0, hold, tucked } = {}) => {
    const q = { ...HOME, ...o }; q.dy = 201 - Math.max(...D.N.body.map(p => pt(q, p)[1]));
    const s = pt(q, [164, 138]), h = hold && [s[0] + hold[0], s[1] + hold[1]], a = h && Math.atan2(h[1] - s[1], h[0] - s[0]);
    const held = c => pin(c, h[0] + Math.cos(a) * 4, h[1] + Math.sin(a) * 4, hold[2], hold[3]);
    return xf(D.N, { ...q, face, extra: { ...(h && !tucked && { arm2: [s, h] }),
      back: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        c.strokeStyle = CREAM; c.globalAlpha = 0.35 * fade; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        bunting(c, lift, seed); if (tucked) held(c);
        c.restore();
      },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round'; if (off < 90) balloon(c, off, stage, lean, seed);
        if (h && !tucked) held(c);
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  // he steps aside as the balloon is slid in on its weight and the bunting comes down; all undone at the end
  const WALK = [[0.97, -6], [0.93, -13], [0.89, -21], [0.86, -27], [0.84, -30]], OFF = [86, 52, 24, 6, 0], LEAN = [0.5, 0.45, 0.3, 0.1, -0.12], LIFT = [40, 26, 13, 4, 0];
  WALK.forEach(([k, dx], i) => add('in' + i, i ? 2 : 3, shot({ k, dx, rot: i % 2 ? 0.05 : -0.05 }, eager, { off: OFF[i], lean: LEAN[i], fade: (i + 1) / 5, lift: LIFT[i] })));
  add('sway', 2, shot({}, eager, { lean: 0.06 }));
  add('there', 4, shot({}, eager));
  add('pin0', 2, shot({ rot: -0.03 }, eager, { hold: [9, 2, -1.1], tucked: true }));
  add('pin1', 2, shot({ rot: -0.03 }, atPin, { hold: [16, -6, -1.4] }));
  add('pin2', 6, shot({ rot: -0.04, ky: 1.02 }, atPin, { hold: [11, -25, -1.5, true] }));
  add('near', 4, shot({ rot: 0.03 }, eager, { hold: [-2, -29, -0.75] }));
  add('you0', 2, shot({ rot: 0.02 }, eager, { hold: [-2, -30, -0.75] }));
  add('you1', 6, shot({}, atYou, { hold: [-2, -30, -0.75] }));
  add('you2', 4, shot({ rot: 0.03 }, wink, { hold: [-2, -31, -0.75] }));
  add('you3', 2, shot({}, atYou, { hold: [-2, -30, -0.75] }));
  add('back', 4, shot({ rot: -0.08, ky: 0.96, kx: 1.03 }, aim, { hold: [-7, -24, -0.6] }));
  add('poke', 2, shot({ rot: 0.12, ky: 1.03 }, aim, { hold: [22, -32, -0.5], stage: 1 }));
  add('bang', 2, shot({ rot: -0.1, ky: 0.84, kx: 1.12 }, flinch, { hold: [20, -28, -0.5], stage: 2 }));
  add('burst', 2, shot({ rot: -0.06, ky: 0.92, kx: 1.06 }, flinch, { hold: [21, -30, -0.5], stage: 3 }));
  add('fall', 2, shot({ rot: -0.02, ky: 1.04 }, gasp, { hold: [22, -31, -0.5], stage: 4 }));
  add('oh', 6, shot({ rot: 0.02 }, gasp, { hold: [22, -32, -0.5], stage: 5 }));
  add('turn', 2, shot({ rot: 0.01 }, [...gasp.slice(0, 2), ['dot',120,108,5.3], ['dot',144,106,5.3], ['oval',132,127,8.5,8.5]], { hold: [22, -32, -0.5], stage: 5 }));
  add('who', 18, shot({}, gaspAtYou, { hold: [22, -32, -0.5], stage: 5 }));
  add('away0', 2, shot({ rot: -0.02 }, gaspAtYou, { hold: [16, -6, -1.4], stage: 5 }));
  add('away1', 2, shot({ rot: -0.02 }, gaspAtYou, { hold: [9, 2, -1.1], tucked: true, stage: 5 }));
  [3, 2, 1, 0].forEach((i, n) => add('out' + n, 2, shot({ k: WALK[i][0], dx: WALK[i][1], rot: i % 2 ? 0.05 : -0.05 }, n < 2 ? gaspAtYou : eager, { off: OFF[i] + 8, stage: 5, fade: (i + 1) / 5, lift: LIFT[i] })));
  CLIPS.obvious_outcome = { home: 'idle', seq: [...seq, ...DOZE] };
})();
