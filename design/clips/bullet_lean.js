// Bullet lean: three slow dots drift at him, trailing ripples. He bends over backwards, impossibly far, and they sail past above him. Then he can't get back up, until a straggler pings him upright.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', BLUE = '#5AB8FF', TAU = Math.PI * 2, R = 40;
  const spotted = [['dot',123,108,4.6], ['dot',147,106,4.6], ['mouth',[[125,119],[137,118],[138,130],[131,134],[124,130]]]];
  const gritted = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const watching = [['dot',125,110,4.4], ['dot',149,108,4.4], ['stroke',[[127,126],[136,125]],2.8]];
  const worried = [['dot',125,110,3.8], ['dot',149,108,3.8], ['stroke',[[114,99],[126,95]],2.4], ['stroke',[[138,93],[150,97]],2.4], ['stroke',[[121,126],[125,123],[129,126],[133,123],[137,126]],2.6]];
  const relieved = [...FACE.aahEyes, ['stroke',[[120,121],[128,127],[136,121]],2.8]];
  const stuck = [['stroke',[[110,105],[124,105]],3], ['stroke',[[134,103],[148,103]],3], ['dot',115,110,3.2], ['dot',139,108,3.2], ['stroke',[[122,125],[134,124]],2.8]];
  // him, bent over backwards by t (1: as far as he goes; below 0: the other way). His feet slide forward, he stretches long and thin, and
  // everything above his knees follows an arc and then lies back along it. arms: given P, where a point of the standing drawing has gone.
  const bend = (t, face, arms, extra = {}) => {
    const far = Math.max(0, t), phi = t * 1.75, kx = 1 - 0.42 * Math.min(1, Math.abs(t)), ky = 1 + 0.6 * Math.min(1, Math.abs(t)), fx = 128 + 66 * Math.min(1, far), knee = 15 + 15 * Math.min(1, far);
    const len = R * Math.abs(phi) || 1e-6, way = Math.sign(phi) || 1;
    const P = ([x, y]) => {
      const u = (x - 128) * kx, h = (201 - y) * ky, a = phi * Math.min(Math.max(h - knee, 0), len) / len, over = Math.max(0, h - knee - len);
      const cx = -way * R * (1 - Math.cos(a)) - Math.sin(phi) * over, cy = Math.min(h, knee) + R * Math.sin(Math.abs(a)) + Math.cos(phi) * over;
      return [fx + cx + u * Math.cos(a), 201 - cy - u * Math.sin(a)];
    };
    const marks = face.map(mk => mk[0] === 'stroke' ? ['stroke', mk[1].map(P), mk[2]] : mk[0] === 'mouth' ? ['mouth', mk[1].map(P), mk[2] && [...P(mk[2]), mk[2][2], mk[2][3]]] : [mk[0], ...P([mk[1], mk[2]]), ...mk.slice(3)]);
    return { ...D.N, body: D.N.body.map(P), curl: D.N.curl.map(P), face: marks, fx: P([150, 40]), shadow: [fx - 50 * far, 60 + 30 * far], ...(arms ? arms(P) : {}), ...extra };
  };
  // a slow dot at (x, y), flying left, with the rings and the streak it leaves in the air
  const dot = (c, x, y, fade = 1) => {
    c.strokeStyle = c.fillStyle = CREAM; c.globalAlpha = 0.3 * fade; c.beginPath(); c.moveTo(x + 4, y - 3.5); c.lineTo(x + 56, y); c.lineTo(x + 4, y + 3.5); c.fill();
    c.lineWidth = 2; [[13, 7, 0.75], [25, 10, 0.5], [39, 13, 0.28]].forEach(([dx, r, a]) => { c.globalAlpha = a * fade; c.beginPath(); c.arc(x + dx - r, y, r, -1.05, 1.05); c.stroke(); });
    c.globalAlpha = fade; c.fillStyle = YELLOW; c.lineWidth = 2.2; c.beginPath(); c.arc(x, y, 5.4, 0, TAU); c.fill(); c.stroke(); c.globalAlpha = 1;
  };
  const VOLLEY = [[0, 74], [40, 82], [78, 66]];
  // behind him: the rooftops (fade: how much of them is there), the volley after n drawings, and the straggler [x, y, fade]
  const sky = ({ fade = 1, n, stray, ping, sweat } = {}) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (fade) {
      c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.34 * fade; c.beginPath(); c.moveTo(-4, 172);
      [[20, 172], [20, 146], [34, 146], [34, 132], [38, 132], [38, 146], [52, 146], [52, 180], [80, 180], [80, 160], [104, 160], [104, 186], [150, 186], [150, 166], [176, 166], [176, 178], [196, 178], [196, 138], [228, 138], [228, 164], [244, 164]].forEach(([x, y]) => c.lineTo(x, y));
      c.moveTo(-4, 203); c.lineTo(244, 203); c.stroke();
      c.fillStyle = YELLOW; c.globalAlpha = 0.4 * fade; [[26, 154], [42, 166], [86, 168], [202, 148], [216, 148], [202, 162], [158, 174]].forEach(([x, y]) => c.fillRect(x, y, 5, 6));
    }
    c.globalAlpha = 1;
    if (n !== undefined) VOLLEY.forEach(([behind, y]) => { const x = 250 + behind - n * 13; if (x > -56 && x < 250) dot(c, x, y); });
    if (stray) dot(c, ...stray);
    if (ping) { const [x, y, r] = ping; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.3; c.moveTo(x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.45); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } c.stroke(); }
    c.restore();
  };
  const drops = at => (c, d, seed) => {                                 // sweat, flying off him
    c.save(); c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.6;
    at.forEach(([x, y]) => { c.beginPath(); c.moveTo(x, y - 6); c.quadraticCurveTo(x + 5, y + 2, x, y + 4); c.quadraticCurveTo(x - 5, y + 2, x, y - 6); c.fill(); c.stroke(); });
    c.restore();
  };
  // his arms once he is over, flung back past his head. up: the top one waving in the air. reach: the other one feeling for the floor.
  const flail = (up = 0, reach = 0) => P => { const [ax, ay] = P([164, 140]), [bx, by] = P([92, 140]); return { arm2: [[ax, ay], [ax - 30 + up * 10, ay - 9 - up * 24]], arm: [[bx, by], [bx - 28 + reach * 16, Math.min(195, by + 12 + reach * 22)]] }; };
  const windmill = up => P => { const [ax, ay] = P([164, 140]), [bx, by] = P([92, 140]); return { arm2: [[ax, ay], [ax + 30, ay - 16 * up]], arm: [[bx, by], [bx - 30, by + 16 * up]] }; };
  const P = 'bullet_lean_', seq = [], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  let n = 0;
  add('look', 3, xf(D.N, { face: FACE.lookr, extra: { back: sky({ fade: 0.4, n }) } }));
  for (let i = 0; i < 3; i++) add('see' + i, 2, xf(D.N, { face: spotted, ky: i ? 1.03 : 1.06, extra: { back: sky({ fade: i ? 1 : 0.8, n: ++n }), fxm: 'alert', fx: [150, 58] } }));
  add('brace', 2, bend(-0.12, gritted, windmill(-0.6), { back: sky({ n: ++n }) }));
  [0.2, 0.42, 0.64, 0.84, 1.04].forEach((t, i) => add('back' + i, 2, bend(t, i < 4 ? gritted : watching, windmill(i % 2 ? 1 : -1), { back: sky({ n: ++n }) })));
  for (let i = 0; i < 21; i++) {                                        // holding it while they pass, and starting to shake
    const tired = i > 7, t = tired && i % 2 ? 1.03 : 1;
    add('under' + i, 2, bend(t, i < 7 ? watching : i < 15 ? worried : gritted, flail(tired && i % 2 ? 0.3 : 0), { back: sky({ n: ++n }), front: tired ? drops(i % 2 ? [[56, 108], [92, 102]] : [[48, 102], [102, 98]]) : undefined }));
  }
  add('clear', 6, bend(1, relieved, flail(), { back: sky() }));
  add('try1', 4, bend(0.8, gritted, flail(1, 0.5), { back: sky(), front: drops([[64, 70], [100, 62]]) }));
  add('flop1', 3, bend(1.07, spotted, flail(-0.2, 1), { back: sky() }));
  add('try2', 4, bend(0.74, gritted, flail(1.2, 0.3), { back: sky(), front: drops([[74, 62], [110, 54], [50, 78]]) }));
  add('flop2', 3, bend(1.09, worried, flail(0, 1), { back: sky() }));
  D[P + 'stuck0'] = bend(1.02, stuck, flail(0.1, 1), { back: sky() });
  D[P + 'stuck1'] = bend(1.03, stuck, flail(0.1, 0.6), { back: sky() });
  show('stuck0', 4); show('stuck1', 4); show('stuck0', 4);
  [254, 243, 232, 221].forEach((x, i) => add('late' + i, 2, bend(1.02, worried, flail(i % 2 ? 0.4 : 0.1, 1), { back: sky({ stray: [x, 132] }) })));
  add('ping', 2, bend(1.1, spotted, flail(0, 1), { back: sky({ stray: [222, 118, 0.8], ping: [212, 132, 15] }) }));
  add('up0', 2, bend(0.45, spotted, windmill(1), { back: sky({ fade: 0.8, stray: [232, 96, 0.5] }) }));
  add('up1', 2, bend(-0.3, FACE.spiral, windmill(-1), { back: sky({ fade: 0.6, stray: [240, 70, 0.2] }) }));
  add('up2', 2, bend(0.16, FACE.spiral, windmill(0.5), { back: sky({ fade: 0.4 }) }));
  add('up3', 2, bend(-0.07, FACE.spiral, undefined, { back: sky({ fade: 0.2 }) }));
  add('daze0', 4, xf(D.N, { rot: -0.04, face: FACE.spiral }));
  add('daze1', 4, xf(D.N, { rot: 0.04, face: FACE.sheep }));
  CLIPS.bullet_lean = { home: 'idle', seq: [...WAKE, ...seq, ...DOZE] };
})();
