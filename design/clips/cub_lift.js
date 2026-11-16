// Cub lift: a jutting rock slides in with a tiny Lump waiting at its tip. He climbs up and holds the little one high in a shaft of light as the sun rises. It sneezes on him.
// group: movies
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', INK = '#0B0E14', ROCK = '#6B4A1F', YELLOW = '#FFD23F', BLUE = '#5AB8FF', TAU = Math.PI * 2;
  const K = 0.74, TOP = [118, 138], TIP = [53, 134], HIGH = [68, 42];
  const proud = [...FACE.aahEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const lookTip = [['dot',108,112,3.8], ['dot',132,111,3.8], ['stroke',[[116,125],[122,127],[128,125]],2.6]];
  const peer = [['dot',120,103,4.2], ['dot',144,101,4.2], ['mouth',[[123,118],[133,117],[134,125],[128,128],[122,125]]]];
  const flinch = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const deadpan = [['stroke',[[109,108],[123,108]],3], ['stroke',[[133,106],[147,106]],3], ['dot',116,112,3], ['dot',140,110,3], ['stroke',[[121,126],[135,125]],2.8]];
  // the little one, standing on (x, y). mood: 'calm', 'ah' (winding up), 'choo', 'sniff'. lean: tipped back, in radians.
  const tiny = (c, [x, y], mood = 'calm', lean = 0, squash = 1) => {
    const h = 28 * squash, w = 14 / squash;
    c.save(); c.translate(x, y); c.rotate(lean); c.lineJoin = c.lineCap = 'round'; c.fillStyle = tint(); c.strokeStyle = CREAM;
    c.beginPath(); c.moveTo(-w, 0); c.bezierCurveTo(-w - 2, -h * 0.6, -w * 0.6, -h, 1, -h); c.bezierCurveTo(w * 0.8, -h, w + 1, -h * 0.5, w, 0); c.closePath(); c.fill(); inkStroke(c, 2.6);
    c.beginPath(); c.moveTo(1, -h); c.quadraticCurveTo(-4, -h - 9, 4, -h - 8); c.lineWidth = 2; c.stroke();
    c.fillStyle = c.strokeStyle = INK; c.lineWidth = 1.8; c.beginPath();
    if (mood === 'calm') { c.arc(-4, -h * 0.58, 2, 0, TAU); c.moveTo(7.6, -h * 0.6); c.arc(5.6, -h * 0.6, 2, 0, TAU); c.fill(); c.beginPath(); c.moveTo(-2, -h * 0.4); c.quadraticCurveTo(1, -h * 0.33, 4, -h * 0.41); c.stroke(); }
    else if (mood === 'sniff') { c.moveTo(-7, -h * 0.55); c.quadraticCurveTo(-4, -h * 0.68, -1, -h * 0.55); c.moveTo(3, -h * 0.57); c.quadraticCurveTo(6, -h * 0.7, 9, -h * 0.57); c.moveTo(-2, -h * 0.4); c.quadraticCurveTo(1, -h * 0.3, 4, -h * 0.41); c.stroke(); }
    else {
      const shut = mood === 'choo' ? 3 : 0;      // 'ah': eyes closing; 'choo': screwed up tight
      c.moveTo(-7, -h * 0.6 - shut); c.lineTo(-2, -h * 0.57); c.lineTo(-7, -h * 0.54 + shut); c.moveTo(9, -h * 0.62 - shut); c.lineTo(4, -h * 0.59); c.lineTo(9, -h * 0.56 + shut); c.stroke();
      c.beginPath(); c.ellipse(1, -h * 0.34, mood === 'choo' ? 4.6 : 2.6, mood === 'choo' ? 3.6 : 3, 0, 0, TAU); c.fill();
    }
    c.restore();
  };
  // slide: how far off to the right the rock still is. sun: how far below the horizon. shaft: how bright the light from above. sitter: the little one on the tip.
  const land = ({ slide = 0, sun = 0, shaft = 0, sitter, rays = sun < 6 }) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    const sy = 203 + sun;
    c.save(); c.beginPath(); c.rect(0, 0, 240, 203); c.clip();
    c.fillStyle = YELLOW; c.globalAlpha = 0.16; c.beginPath(); c.arc(56, sy, 54, 0, TAU); c.fill(); c.globalAlpha = 1;
    c.beginPath(); c.arc(56, sy, 36, 0, TAU); c.fill(); c.strokeStyle = CREAM; c.lineWidth = 3; c.stroke();
    c.fillStyle = '#FFE98A'; c.beginPath(); c.arc(56, sy, 24, 0, TAU); c.fill();
    if (rays) {
      c.strokeStyle = YELLOW; c.lineWidth = 2.6; c.beginPath();
      for (let i = 0; i < 7; i++) { const a = Math.PI * (1.02 + i * 0.16), r0 = 43 + (i + seed) % 2 * 3; c.moveTo(56 + Math.cos(a) * r0, sy + Math.sin(a) * r0); c.lineTo(56 + Math.cos(a) * (r0 + 9), sy + Math.sin(a) * (r0 + 9)); }
      c.stroke();
    }
    c.restore();
    c.strokeStyle = CREAM; c.globalAlpha = 0.4; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 203); c.lineTo(240, 203); c.stroke(); c.globalAlpha = 1;
    if (shaft) {
      c.fillStyle = '#FFE98A'; c.globalAlpha = shaft * 0.2; c.beginPath(); c.moveTo(54, 0); c.lineTo(94, 0); c.lineTo(128, 140); c.lineTo(34, 136); c.closePath(); c.fill();
      c.globalAlpha = shaft * 0.16; c.beginPath(); c.moveTo(64, 0); c.lineTo(84, 0); c.lineTo(102, 138); c.lineTo(50, 134); c.closePath(); c.fill(); c.globalAlpha = 1;
    }
    c.translate(slide, 0);
    const ALL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const edge = boil([[252, 150], [212, 146], [172, 141], [130, 140], [88, 136], [52, 133], [39, 138], [58, 149], [84, 156], [108, 170], [124, 186], [134, 204], [252, 204]], seed + 5, 1.6);
    closedPath(c, edge, ALL); c.fillStyle = ROCK; c.fill();
    c.save(); c.clip();
    c.fillStyle = '#8C6A34'; closedPath(c, [[252, 150], [212, 146], [172, 141], [130, 140], [88, 136], [52, 133], [39, 138], [56, 143], [90, 146], [130, 150], [172, 152], [212, 157], [252, 162]], ALL); c.fill();
    c.fillStyle = '#4A3214'; closedPath(c, [[39, 138], [58, 149], [84, 156], [108, 170], [124, 186], [134, 204], [172, 204], [156, 184], [136, 168], [106, 156], [72, 149]], ALL); c.fill();
    c.restore();
    closedPath(c, edge, ALL); c.strokeStyle = CREAM; inkStroke(c, 3.4);
    c.lineWidth = 2; c.globalAlpha = 0.55; c.beginPath(); c.moveTo(178, 160); c.lineTo(190, 172); c.lineTo(184, 186); c.moveTo(190, 172); c.lineTo(202, 176); c.moveTo(222, 166); c.lineTo(230, 182); c.stroke(); c.globalAlpha = 1;
    c.strokeStyle = '#58D68D'; c.lineWidth = 2.4; c.beginPath(); [[206, 146, -3], [211, 146, 1], [216, 147, 5], [162, 141, -3], [167, 141, 2]].forEach(([x, y, lean]) => { c.moveTo(x, y); c.lineTo(x + lean, y - 8); }); c.stroke();
    if (sitter) tiny(c, TIP, ...sitter);
    c.restore();
  };
  const nub = (c, [x0, y0], [x1, y1], seed) => {
    const len = Math.hypot(x1 - x0, y1 - y0), w = 5;
    c.save(); c.translate(x0, y0); c.rotate(Math.atan2(y1 - y0, x1 - x0));
    closedPath(c, boil([[0, -w], [len * 0.5, -w], [len, -w + 0.6], [len + 4.5, 0], [len, w - 0.6], [len * 0.5, w], [0, w]], seed, 0.7));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 2.6); c.restore();
  };
  // in front of him: the little one in his hands at `held`, his arms (each from a point on him to a hand), dust where he lands, and what the sneeze leaves
  const hands = ({ held, mood, lean, squash, spot = TOP, k = K, arms, dust, spray, drips }) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    const on = ([x, y]) => [spot[0] + (x - 128) * k, spot[1] + (y - 201) * k];
    if (held && !arms) arms = [[[90, 112], [held[0] - 7, held[1] + 1]], [[108, 86], [held[0] + 9, held[1] + 1]]];
    if (arms) arms.forEach(([from, to], i) => nub(c, on(from), to, seed + 98 + i));
    if (held) tiny(c, held, mood, lean, squash);
    if (dust) {
      c.fillStyle = CREAM; c.globalAlpha = 0.5;
      [[-44, -3, 5], [-54, -9, 3.5], [44, -3, 5], [54, -8, 3.5]].forEach(([x, y, r]) => { c.beginPath(); c.arc(spot[0] + x * k, spot[1] + y, r, 0, TAU); c.fill(); });
      c.globalAlpha = 1;
    }
    if (spray) {
      c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath();
      [[14, -14, 28, -13], [16, -7, 30, -1], [13, 0, 24, 11]].forEach(([x0, y0, x1, y1]) => { c.moveTo(held[0] + x0, held[1] + y0); c.lineTo(held[0] + x1, held[1] + y1); });
      c.stroke(); c.fillStyle = BLUE; [[36, -8], [31, 10], [40, 5]].forEach(([x, y]) => { c.beginPath(); c.arc(held[0] + x, held[1] + y, 2.4, 0, TAU); c.fill(); });
    }
    if (drips !== undefined) {
      c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.4;
      [[100, 94, 0], [128, 90, 0.4], [106, 122, 1]].forEach(([x, y, run]) => { const [px, py] = on([x, y]); c.beginPath(); c.ellipse(px, py + drips * run * 8, 2.8, 3.8, 0, 0, TAU); c.fill(); c.stroke(); });
    }
    c.restore();
  };
  const P = 'cub_lift_';
  const stand = (spot, k, o, scene, fore = {}) => xf(D.N, { k, dx: spot[0] - 128, dy: spot[1] - 201, shadowK: spot[1] < 190 ? 0 : 1, ...o, extra: { back: land(scene), front: hands({ spot, k, ...fore }) } });
  const up = (o, scene, fore) => stand(TOP, K, o, scene, fore);
  D[P + 'in1'] = stand([128, 201], 1, { face: FACE.lookr }, { slide: 150, sun: 34, sitter: [] });
  D[P + 'in2'] = stand([128, 201], 1, { face: FACE.lookr }, { slide: 70, sun: 30, sitter: [] });
  D[P + 'in3'] = stand([128, 201], 1, { face: FACE.lookr }, { slide: 16, sun: 26, sitter: ['calm', 0, 0.85] });
  D[P + 'in4'] = stand([128, 201], 1, { face: FACE.lookup }, { sun: 22, sitter: [] });
  D[P + 'hop1'] = stand([128, 201], 1, { face: FACE.lookup, ky: 0.86, kx: 1.08 }, { sun: 19, sitter: [] });
  D[P + 'hop2'] = stand([140, 158], 0.93, { face: FACE.happy, ky: 1.08, kx: 0.95 }, { sun: 16, sitter: [] });
  D[P + 'hop3'] = stand([158, 141], 0.84, { face: FACE.happy, ky: 0.86, kx: 1.08 }, { sun: 13, sitter: [] }, { dust: true });
  D[P + 'hop4'] = stand([138, 120], 0.78, { face: lookTip, ky: 1.08, kx: 0.95 }, { sun: 10, sitter: [] });
  D[P + 'hop5'] = up({ face: lookTip, ky: 0.86, kx: 1.08 }, { sun: 7, sitter: ['calm', 0, 0.9] }, { dust: true });
  D[P + 'see'] = up({ face: lookTip }, { sun: 5, sitter: [] });
  D[P + 'reach'] = up({ face: lookTip, rot: -0.08, ky: 0.96 }, { sun: 3, sitter: [] }, { arms: [[[78, 140], [58, 112]], [[76, 172], [66, 128]]] });
  D[P + 'lift1'] = up({ face: FACE.lookup, rot: -0.03 }, { sun: 0, shaft: 0.4 }, { held: [60, 92], arms: [[[82, 128], [54, 94]], [[86, 150], [68, 96]]] });
  D[P + 'lift2'] = up({ face: proud, rot: 0.08, ky: 1.04 }, { sun: -4, shaft: 0.8 }, { held: [69, 39] });
  const DAWN = { sun: -8, shaft: 1 }, BACK = { rot: 0.05 };
  D[P + 'high1'] = up({ face: proud, ...BACK }, DAWN, { held: HIGH });
  D[P + 'high2'] = up({ face: proud, ...BACK, ky: 1.02 }, DAWN, { held: [68, 40], mood: 'sniff' });
  D[P + 'ah1'] = up({ face: proud, ...BACK }, DAWN, { held: HIGH, mood: 'ah', lean: -0.16 });
  D[P + 'ah2'] = up({ face: peer, ...BACK }, DAWN, { held: [67, 41], mood: 'ah', lean: -0.34, squash: 1.1 });
  D[P + 'choo'] = up({ face: flinch, rot: 0.12, ky: 0.94, kx: 1.04 }, DAWN, { held: [72, 46], mood: 'choo', lean: 0.34, squash: 0.8, spray: true });
  D[P + 'wet1'] = up({ face: deadpan, ...BACK }, DAWN, { held: HIGH, mood: 'sniff', drips: 0 });
  D[P + 'wet2'] = up({ face: deadpan, ...BACK }, DAWN, { held: HIGH, mood: 'calm', drips: 1 });
  D[P + 'down1'] = up({ face: deadpan, rot: -0.03 }, { sun: -4, shaft: 0.5 }, { held: [60, 92], arms: [[[82, 128], [54, 94]], [[86, 150], [68, 96]]] });
  D[P + 'down2'] = up({ face: FACE.lookr, ky: 0.88, kx: 1.07 }, { sun: 4, shaft: 0.2, sitter: ['calm', 0, 0.9] });
  D[P + 'off1'] = stand([124, 166], 0.86, { face: FACE.lookr, ky: 1.08, kx: 0.95 }, { sun: 12, slide: 12, sitter: [] });
  D[P + 'off2'] = stand([128, 201], 1, { face: FACE.happy, ky: 0.86, kx: 1.08 }, { sun: 20, slide: 50, sitter: [] });
  D[P + 'off3'] = stand([128, 201], 1, { face: FACE.happy }, { sun: 28, slide: 120, sitter: [] });
  D[P + 'off4'] = stand([128, 201], 1, { face: FACE.happy }, { sun: 36, slide: 200, sitter: [] });
  const s = (id, n) => [P + id, n];
  CLIPS.cub_lift = { home: 'idle', seq: [...WAKE, s('in1', 2), s('in2', 2), s('in3', 2), s('in4', 5), s('hop1', 3), s('hop2', 2), s('hop3', 3), s('hop4', 2), s('hop5', 3), s('see', 4),
    s('reach', 4), s('lift1', 2), s('lift2', 2), s('high1', 6), s('high2', 6), s('high1', 4), s('ah1', 5), s('ah2', 5), s('choo', 3), s('wet1', 8), s('wet2', 10),
    s('down1', 2), s('down2', 3), s('off1', 2), s('off2', 3), s('off3', 2), s('off4', 2), ...DOZE] };
})();
