// Sip tea: a fuss kicks off just out of sight. He gives it a long side-eye, brings out a cup and saucer, and takes a slow sip without once looking away.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, tint } = window.__lump;
  const CREAM = '#FFF1DC', INK = '#0B0E14', WHITE = '#F4F8FF', SHADE = '#C9D4E0', BLUE = '#5AB8FF', TEA = '#C47A2C', GLINT = '#E9B872', GREY = '#9FB0C4', TAU = Math.PI * 2, P = 'sip_tea_', DX = -12, S = 1.35;
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const flatMouth = [['stroke',[[122,125],[133,124]],2.6]], smirk = [['stroke',[[121,124],[128,126],[135,122]],2.6]];
  // his eyes, drawn over his face: turned as far right as they go under lids that come `drop` of the way down
  const sideEye = (c, q, drop) => [[115, 109], [141, 107]].forEach(at => {
    const [x, y] = pt(q, at), r = 7.6, lid = y - r + 2 * r * drop;
    c.fillStyle = CREAM; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    c.fillStyle = INK; c.beginPath(); c.arc(x + 3.8, y + 1.4, 3.7, 0, TAU); c.fill();
    c.save(); c.beginPath(); c.arc(x, y, r + 1.5, 0, TAU); c.clip(); c.fillStyle = tint(); c.fillRect(x - 10, y - 10, 20, lid - y + 10); c.restore();
    c.strokeStyle = INK; c.lineWidth = 2.8; c.beginPath(); c.moveTo(x - r - 1, lid - 0.6); c.lineTo(x + r + 1, lid + 0.6); c.stroke();
  });
  const saucer = (c, x, y, seed) => {
    c.save(); c.translate(x + (seed % 3 - 1) * 0.4, y); c.scale(S, S);
    c.fillStyle = WHITE; c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.ellipse(0, 0, 21, 5, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = BLUE; c.lineWidth = 1.5; c.beginPath(); c.ellipse(0, 0, 17, 3.6, 0, 0.2, Math.PI - 0.2); c.stroke();
    c.strokeStyle = SHADE; c.lineWidth = 1.6; c.beginPath(); c.ellipse(0, 0.4, 9, 1.9, 0, 0, TAU); c.stroke();
    c.restore();
  };
  // the cup with the middle of its foot on (x, y), tipped by a. swirl: where the ripple on the tea has got to. steam: how much
  const cup = (c, x, y, a, seed, swirl, steam) => {
    c.save(); c.translate(x + (seed % 3 - 1) * 0.4, y); c.rotate(a + (seed % 2) * 0.012); c.scale(S, S);
    c.beginPath(); c.moveTo(13, -19); c.bezierCurveTo(27, -22, 26, -5, 10, -7); c.strokeStyle = CREAM; c.lineWidth = 5.4; c.stroke(); c.strokeStyle = WHITE; c.lineWidth = 2.2; c.stroke();
    const bowl = () => { c.beginPath(); c.moveTo(-16, -22); c.bezierCurveTo(-16, -9, -11, -3.5, -7, -2.5); c.lineTo(-7.5, 0); c.lineTo(7.5, 0); c.lineTo(7, -2.5); c.bezierCurveTo(11, -3.5, 16, -9, 16, -22); c.closePath(); };
    bowl(); c.fillStyle = WHITE; c.fill();
    c.save(); bowl(); c.clip(); c.fillStyle = SHADE; c.beginPath(); c.ellipse(19, -10, 11, 16, 0, 0, TAU); c.fill(); c.fillRect(-8, -2.6, 16, 3);
    c.strokeStyle = BLUE; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-17, -15.5); c.quadraticCurveTo(0, -12, 17, -15.5); c.stroke(); c.restore();
    bowl(); c.strokeStyle = CREAM; c.lineWidth = 2; c.stroke();
    c.fillStyle = TEA; c.beginPath(); c.ellipse(0, -22, 16, 3.8, 0, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = GLINT; c.lineWidth = 1.3; c.beginPath(); c.ellipse(swirl * 3 - 2, -22 + swirl * 0.4, 6 + swirl * 2.5, 1.4 + swirl * 0.4, 0, 0, TAU); c.stroke();
    c.restore();
    if (!steam) return;
    c.save(); c.globalAlpha = 0.55 * steam; c.strokeStyle = CREAM; c.lineWidth = 2.2;
    const tx = x + Math.sin(a) * 22 * S, ty = y - Math.cos(a) * 22 * S, lean = seed % 2 ? 1 : -1;
    for (let k = 0; k < 2; k++) { openPath(c, boil([0, 1, 2, 3].map(i => [tx - 5 + k * 10 + (i % 2 ? 3 : -3) * lean, ty - 9 - k * 3 - i * 7]), seed + k * 7, 1.4)); c.stroke(); }
    c.restore();
  };
  // the row going on just past the right-hand edge: a scuffle's dust cloud churning, with bits flying out of it. loud: 0 not there to 1
  const fuss = (c, tick, loud) => {
    if (!loud) return;
    const beat = Math.floor(tick / 4) % 3;
    c.save(); c.translate((1 - loud) * 40, 0); c.strokeStyle = CREAM; c.fillStyle = GREY; c.globalAlpha = 0.9;
    c.beginPath(); [[239, 148, 15], [229, 168, 13], [241, 186, 17], [234, 128, 11], [246, 110, 13]].forEach(([x, y, r], i) => {
      const px = x + ((i + beat) % 3 - 1) * 3, py = y + ((i * 2 + beat) % 3 - 1) * 2.5, pr = r + ((i + beat * 2) % 3 - 1) * 1.5; c.moveTo(px + pr, py); c.arc(px, py, pr, 0, TAU); });
    c.lineWidth = 5; c.stroke(); c.fill();
    c.lineWidth = 2.2; c.beginPath(); [[213, 152 - beat * 6, 204, 147 - beat * 8], [211, 180 + beat * 3, 201, 184 + beat * 4]].forEach(([x0, y0, x1, y1]) => { c.moveTo(x0, y0); c.lineTo(x1, y1); });
    if (beat !== 2) [[0, -5], [1.3, -1.3], [5, 0], [1.3, 1.3], [0, 5], [-1.3, 1.3], [-5, 0], [-1.3, -1.3], [0, -5]].forEach(([px, py], i) => i ? c.lineTo(207 - beat * 5 + px, 116 - beat * 9 + py) : c.moveTo(207 - beat * 5, 111 - beat * 9));
    c.stroke();
    if (beat !== 1) { c.lineWidth = 3.6; c.beginPath(); c.moveTo(221, 70); c.lineTo(220, 83); c.stroke(); c.fillStyle = CREAM; c.beginPath(); c.arc(219.6, 90.5, 2.4, 0, TAU); c.fill(); }
    c.restore();
  };
  // lids: how far his lids are down (omit: the face he is given). tea: [cup x, cup y, tip, swirl]; his right nub holds it by the handle.
  // plate: where the saucer is (omit: still under the cup). tuck: the tea is still round behind him. left: where his left nub reaches.
  // clink: the cup landing. loud: the fuss. show: the floor.
  const shot = (o, face, { lids, tea, plate, tuck, left, clink, steam = 1, loud = 1, show = 1 } = {}) => {
    const q = { dx: DX, ...o }, china = (c, seed) => { if (!tea) return; const at = plate || [tea[0], tea[1] + 3]; saucer(c, at[0], at[1], seed); cup(c, tea[0], tea[1], tea[2], seed, tea[3] || 0, steam); };
    const grip = tea && !tuck && [tea[0] + (22 * Math.cos(tea[2]) + 13 * Math.sin(tea[2])) * S + 3, tea[1] + (22 * Math.sin(tea[2]) - 13 * Math.cos(tea[2])) * S + 6];
    return xf(D.N, { ...q, face, extra: { ...(left && { arm: [pt(q, [92, 142]), left] }), ...(grip && { arm2: [pt(q, [174, 156]), grip] }),
      back: (c, d, seed, tick) => {
        c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.globalAlpha = 0.35 * show; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 204); c.lineTo(240, 204); c.stroke(); c.globalAlpha = 1;
        fuss(c, tick, loud); if (tuck) china(c, seed); c.restore();
      },
      front: (c, d, seed) => {
        c.save(); c.lineCap = c.lineJoin = 'round';
        if (lids !== undefined) sideEye(c, q, lids);
        if (!tuck) china(c, seed);
        if (clink) { c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); [[-32, -14, -40, -21], [34, -6, 43, -10], [-35, -3, -45, -3]].forEach(([x0, y0, x1, y1]) => { c.moveTo(tea[0] + x0, tea[1] + y0); c.lineTo(tea[0] + x1, tea[1] + y1); }); c.stroke(); }
        c.restore();
      } } });
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  const X = 128 + DX, LAP = [X + 2, 176], PLATE = [X, 180], UNDER = [X - 24, 178];
  add('hear', 3, shot({ dx: -4 }, FACE.lookr, { loud: 0.4, show: 0.5 }));
  add('turn', 2, shot({ dx: -8, rot: -0.02 }, FACE.lookr, { loud: 0.7 }));
  add('narrow', 2, shot({ rot: -0.03 }, flatMouth, { lids: 0.22 }));
  add('side', 18, shot({ rot: -0.03 }, flatMouth, { lids: 0.4 }));
  add('reach', 2, shot({ rot: -0.03, ky: 0.96, kx: 1.02 }, flatMouth, { lids: 0.4 }));
  add('out0', 2, shot({ rot: -0.02 }, flatMouth, { lids: 0.4, tea: [X + 57, 180, 0.12], tuck: true }));
  add('out1', 2, shot({}, flatMouth, { lids: 0.4, tea: [X + 32, 179, 0.06], left: [X - 14, 174] }));
  add('held', 6, shot({ ky: 0.99 }, flatMouth, { lids: 0.4, tea: [...LAP, 0, 0.3], left: UNDER }));
  // the cup comes up off the saucer to his mouth, slowly, and tips
  [[4, 172, -0.03], [6, 167, -0.09], [8, 162, -0.17], [10, 157.5, -0.26], [11, 154.5, -0.32]].forEach(([dx, y, tip], i) =>
    add('lift' + i, 2, shot({ ky: 0.99 + i * 0.004 }, flatMouth, { lids: 0.4, tea: [X + dx, y, tip, i * 0.25], plate: PLATE, left: UNDER })));
  add('sip0', 6, shot({ ky: 1.01 }, flatMouth, { lids: 0.4, tea: [X + 11.5, 153, -0.36, 0.8], plate: PLATE, left: UNDER, steam: 0.7 }));
  add('sip1', 12, shot({ ky: 1.02, rot: -0.02 }, flatMouth, { lids: 0.52, tea: [X + 14.5, 151.5, -0.46, 1], plate: PLATE, left: UNDER, steam: 0.5 }));
  [[10, 158, -0.24], [6, 168, -0.08]].forEach(([dx, y, tip], i) => add('down' + i, 2, shot({}, smirk, { lids: 0.46, tea: [X + dx, y, tip, 0.6], plate: PLATE, left: UNDER, steam: 0.6 })));
  add('clink', 2, shot({ ky: 0.98 }, smirk, { lids: 0.44, tea: [LAP[0], LAP[1] + 1, 0, 1], left: UNDER, clink: true, steam: 0.6 }));
  add('after', 10, shot({}, smirk, { lids: 0.44, tea: [...LAP, 0, 0.4], left: UNDER, steam: 0.6 }));
  add('away0', 2, shot({}, smirk, { lids: 0.4, tea: [X + 32, 179, 0.06], left: [X - 14, 174], steam: 0.4, loud: 0.7 }));
  add('away1', 2, shot({ dx: -8, rot: -0.02 }, smirk, { lids: 0.3, tea: [X + 57, 180, 0.12], tuck: true, steam: 0.2, loud: 0.4 }));
  add('done', 2, shot({ dx: -4 }, FACE.happy, { loud: 0, show: 0.4 }));
  CLIPS.sip_tea = { home: 'idle', seq: [...seq, ...DOZE] };
})();
