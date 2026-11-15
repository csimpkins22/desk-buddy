// Panic, calm, panic: a small spider comes down on its thread and he panics. It stops and hangs there, and he calms down. Then it gives a little wave, and he panics harder.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', FLOOR = '#2B3440', BLUE = '#5AB8FF', SLATE = '#3A4656', TAU = Math.PI * 2, SX = 196, HANG = 100, P = 'panic_calm_';
  const upAtIt = [['dot',123,104,3.8], ['dot',147,102,3.8], ['stroke',[[125,122],[130,123],[135,122]],2.6]];
  const fear = [['oval',119,108,5.4,6.2], ['oval',143,106,5.4,6.2], ['shine',121,105,1.8], ['shine',145,103,1.8], ['stroke',[[107,96],[119,92]],2.4], ['stroke',[[140,90],[152,94]],2.4], ['teeth',130,126,22,9]];
  const peek = [['stroke',[[110,104],[118,108],[110,112]],3], ['dot',144,107,4.2], ['stroke',[[138,95],[150,97]],2.4], ['stroke',[[123,125],[127,123],[131,125],[135,123]],2.6]];
  const phew = [...FACE.aahEyes, ['mouth',[[123,120],[132,120],[133,127],[128,130],[122,127]]]];
  const calm = [...FACE.aahEyes, ['stroke',[[119,121],[128,127],[137,121]],2.8], ['blush',100,121,8,4.5], ['blush',156,119,8,4.5]];
  const oh = [['dot',122,108,4], ['dot',146,106,4], ['stroke',[[119,121],[128,127],[137,121]],2.8]];
  const scream = [['oval',117,104,6.4,7.4], ['oval',143,102,6.4,7.4], ['shine',119,100.5,2.1], ['shine',145,98.5,2.1], ['stroke',[[104,91],[117,86]],2.6], ['stroke',[[141,84],[154,88]],2.6], ['mouth',[[115,116],[143,114],[145,133],[129,141],[113,133]],[129,136,8,5]]];
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const dot = (c, x, y, r) => { c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU); };
  // hanging head down from its thread with its middle at (x, y). legs: 0 or 1 as they paddle, 'still', or 'hi0' and 'hi1' with the nearest one waving.
  const spider = (c, x, y, legs) => {
    const j = legs === 1 ? 2.6 : legs === 0 ? -1 : 0, hi = legs === 'hi0' ? 1 : legs === 'hi1' ? 2 : 0;
    c.save(); c.translate(x, y); c.scale(1.2, 1.2); c.strokeStyle = CREAM; c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(0, -12); c.lineTo(0, -y / 1.2 - 4); c.stroke();
    c.lineWidth = 2.1; c.beginPath();
    [-1, 1].forEach(side => [-4, 1, 6, 11].forEach((ly, i) => {
      if (hi && side < 0 && !i) { c.moveTo(-7, -4); c.lineTo(-17, -13); c.lineTo(hi > 1 ? -28 : -21, hi > 1 ? -22 : -26); return; }
      const k = (i + (side > 0 ? 1 : 0)) % 2 ? j : -j;
      c.moveTo(side * 7, ly); c.lineTo(side * 17, ly - 7 + k); c.lineTo(side * (24 - i * 1.5), ly + 6 + i * 2 + k);
    }));
    c.stroke();
    c.fillStyle = SLATE; c.beginPath(); c.arc(0, 10, 6.5, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(0, -3, 10.5, 9.5, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); dot(c, -2.7, 9.5, 1.8); dot(c, 2.7, 9.5, 1.8); c.fill();
    if (hi) {
      c.lineWidth = 1.6; c.beginPath(); c.arc(0, 11.5, 2.8, 0.35, Math.PI - 0.35); c.stroke();
      c.lineWidth = 2; c.beginPath(); c.arc(-24, -24, 8, Math.PI * 0.95, Math.PI * 1.45); c.moveTo(-17, -33); c.arc(-24, -24, 12, Math.PI * 1.3, Math.PI * 1.68); c.stroke();
    }
    c.restore();
  };
  const bead = (c, x, y, lean) => {
    c.save(); c.translate(x, y); c.rotate(lean); c.beginPath(); c.moveTo(0, -7); c.bezierCurveTo(5, 0, 4, 4.5, 0, 4.5); c.bezierCurveTo(-4, 4.5, -5, 0, 0, -7); c.fill(); c.stroke(); c.restore();
  };
  // behind him: the corner's cobweb, the floor and the spider. room: how solid the room is. bug: the spider, [height, legs, sway].
  const scene = ({ room = 1, bug }) => (c, d) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.globalAlpha = room; c.fillStyle = FLOOR; c.fillRect(0, 201, 240, 39);
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = room * 0.4; c.beginPath(); c.moveTo(0, 201); c.lineTo(240, 201); c.stroke();
    c.lineWidth = 1.6; c.globalAlpha = room * 0.6; c.beginPath();
    const RAYS = [[168, 0], [190, 26], [210, 46], [228, 60], [240, 70]];
    RAYS.forEach(([x, y]) => { c.moveTo(240, 0); c.lineTo(x, y); });
    [0.5, 0.86].forEach(f => RAYS.forEach(([x, y], i) => { const px = 240 + (x - 240) * f, py = y * f; if (!i) c.moveTo(px, py); else { const [qx, qy] = RAYS[i - 1], ox = 240 + (qx - 240) * f, oy = qy * f; c.quadraticCurveTo((px + ox) / 2 + 3 * f, (py + oy) / 2 - 3 * f, px, py); } }));
    c.stroke(); c.globalAlpha = room;
    if (d.shadow[1]) { c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, d.shadow[1], 6, 0, 0, TAU); c.fill(); }
    c.globalAlpha = 1;
    if (bug) spider(c, SX + (bug[2] || 0), bug[0], bug[1]);
    c.restore();
  };
  // in front of him. sweat: [x, y, lean] of each bead flying off him. shake: [x, y, size] of the judder marks round him. puff: where his sigh has got to.
  const marks = ({ sweat, shake, puff }) => c => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    if (sweat) { c.fillStyle = BLUE; c.lineWidth = 1.6; sweat.forEach(s => bead(c, ...s)); }
    if (shake) { c.lineWidth = 2.4; c.beginPath(); shake.forEach(([x, y, r, side]) => { c.moveTo(x, y - r); c.quadraticCurveTo(x + side * r * 0.5, y, x, y + r); }); c.stroke(); }
    if (puff) { const [x, y, s] = puff; c.fillStyle = CREAM; c.globalAlpha = 0.75 / s; c.beginPath(); dot(c, x, y, 6.5 * s); dot(c, x - 8 * s, y - 4 * s, 5 * s); dot(c, x + 9 * s, y + 5 * s, 3.4); dot(c, x + 15 * s, y + 10 * s, 2.2); c.fill(); c.globalAlpha = 1; }
    c.restore();
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  const shot = (o, face, set, fore = {}, extra = {}) => xf(D.N, { ...o, face, extra: { back: scene(set), front: marks(fore), ...extra } });
  const BACK = { dx: -36, rot: -0.13 }, HERE = { dx: -32 };

  add('down0', 3, shot({}, FACE.lookup, { room: 0.4, bug: [-2, 0] }));
  add('down1', 2, shot({}, upAtIt, { room: 0.8, bug: [30, 1] }));
  add('down2', 2, shot({ dx: -8, rot: -0.03 }, upAtIt, { bug: [58, 0] }));
  add('down3', 2, shot({ dx: -22, rot: -0.1, ky: 0.92, kx: 1.05 }, FACE.shock, { bug: [82, 1] }, {}, { fxm: 'alert', fx: [128, 62] }));
  add('down4', 2, shot({ ...BACK, ky: 1.03 }, fear, { bug: [HANG + 5, 0] }, { sweat: [[52, 84, -0.7]] }));
  // panic: cowering away from it, juddering, as it paddles its legs
  [0, 1].forEach(i => { D[P + 'panic' + i] = shot({ ...BACK, dx: -36 + (i ? 3 : -3), ky: i ? 0.98 : 1.01 }, fear, { bug: [HANG, i] },
    { sweat: i ? [[44, 96, -0.9], [122, 58, 0.3]] : [[50, 78, -0.7], [128, 66, 0.4], [34, 118, -1.1]], shake: [[22 + i * 3, 150, 9, -1], [158 - i * 3, 136, 9, 1]] }); });
  for (let i = 0; i < 8; i++) show('panic' + i % 2, 2);
  add('stop', 4, shot(BACK, peek, { bug: [HANG, 'still'] }, { sweat: [[46, 100, -0.9]] }));
  add('phew', 6, shot({ ...HERE, ky: 0.95, kx: 1.04 }, phew, { bug: [HANG, 'still', 1] }, { puff: [26, 132, 1] }, { arm: [pt(HERE, [92, 142]), pt(HERE, [104, 98])] }));
  D[P + 'calm0'] = shot({ ...HERE, ky: 0.98 }, calm, { bug: [HANG, 'still', -1] }, { puff: [17, 112, 1.35] });
  D[P + 'calm1'] = shot({ ...HERE, ky: 1.01 }, calm, { bug: [HANG, 'still', 1] });
  show('calm0', 6); show('calm1', 6);
  add('hi0', 2, shot({ ...HERE, ky: 0.99 }, calm, { bug: [HANG, 'hi0'] }));
  add('hi1', 2, shot({ ...HERE, ky: 0.99 }, calm, { bug: [HANG, 'hi1'] }));
  add('see0', 4, shot(HERE, oh, { bug: [HANG, 'hi0'] }));
  add('see1', 2, shot(HERE, oh, { bug: [HANG, 'hi1'] }));
  add('jolt', 2, shot({ dx: -38, dy: -18, ky: 1.14, kx: 0.92, shadowK: 0.7 }, scream, { bug: [HANG, 'hi0'] }, { sweat: [[44, 44, -0.8], [122, 26, 0.5]] }, { frizz: 15, fxm: 'alert', fx: [150, 40] }));
  // panic, harder: off the floor, arms flailing, hair on end, while it goes on waving
  const FLAIL = [[[-34, -30], [20, -46]], [[-30, -46], [28, -30]], [[-36, -38], [24, -40]]];
  [0, 1, 2].forEach(i => {
    const o = { dx: -46 + [5, -5, 0][i], dy: [0, -9, -3][i], rot: [-0.1, -0.04, -0.14][i], ky: [0.96, 1.05, 1][i], shadowK: i === 1 ? 0.8 : 1 }, l = pt(o, [92, 132]), r = pt(o, [164, 130]);
    D[P + 'worse' + i] = shot(o, scream, { bug: [HANG, i % 2 ? 'hi1' : 'hi0'] },
      { sweat: [[[52, 50, -0.6], [112, 34, 0.4], [12, 132, -1.2]], [[44, 40, -0.7], [118, 26, 0.5], [8, 120, -1.2]], [[58, 56, -0.5], [106, 40, 0.3], [14, 144, -1.2]]][i], shake: [[10 + i * 3, 160, 12, -1], [154 - i * 2, 152, 12, 1], [22, 184, 8, -1]] },
      { frizz: 15, arm: [l, [l[0] + FLAIL[i][0][0], l[1] + FLAIL[i][0][1]]], arm2: [r, [r[0] + FLAIL[i][1][0], r[1] + FLAIL[i][1][1]]] });
  });
  [0, 1, 2, 1, 0, 2, 1, 0, 1].forEach(i => show('worse' + i, 2));
  add('up0', 2, shot({ dx: -40, rot: -0.12, ky: 0.97 }, scream, { bug: [HANG - 6, 'still'] }, { sweat: [[40, 70, -0.8], [124, 44, 0.5]] }, { frizz: 12 }));
  add('up1', 2, shot({ dx: -38, rot: -0.1 }, fear, { bug: [52, 0] }, { sweat: [[36, 96, -1]] }, { frizz: 8 }));
  add('up2', 2, shot({ dx: -34, rot: -0.06 }, peek, { room: 0.8, bug: [4, 1] }));
  add('gone', 4, shot({ dx: -22, ky: 0.94, kx: 1.05 }, FACE.puff, { room: 0.5 }, { puff: [34, 138, 1] }));
  add('out', 2, shot({ dx: -8 }, FACE.sheep, { room: 0.2 }));
  CLIPS.panic_calm = { home: 'idle', seq: [...seq, ...DOZE] };
})();
