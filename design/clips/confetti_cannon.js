// Confetti cannon: he pulls the string and nothing happens. He peers down the barrel, it goes off, and he ends up wearing the lot.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', COLOURS = ['#FFD23F', '#5AB8FF', '#58D68D', CREAM, '#FF5A4D'];
  const eager = [['dot',119,108,4], ['dot',143,106,4], ['stroke',[[121,122],[129,127],[137,121]],2.8]];
  const bracing = [...FACE.chooEyes, ['stroke',[[122,125],[134,124]],2.8]];
  const puzzled = [['dot',121,110,3.8], ['dot',145,108,3.8], ['stroke',[[124,126],[130,124],[136,126]],2.8], ['stroke',[[113,99],[125,96]],2.4]];
  const peering = [['dot',124,111,4.6], ['dot',146,109,4.6], ['stroke',[[118,127],[124,126]],2.6]];
  const stunned = [['dot',116,108,3.4], ['dot',140,106,3.4], ['stroke',[[123,125],[133,125]],2.6]];
  const blink = [['stroke',[[111,109],[121,109]],2.8], ['stroke',[[135,107],[145,107]],2.8], ['stroke',[[123,125],[133,125]],2.6]];
  const bit = (c, x, y, i) => { c.save(); c.translate(x, y); c.rotate(i * 1.3 % 3); c.fillStyle = COLOURS[i % 5]; c.strokeStyle = '#17161A'; c.lineWidth = 1.6; c.beginPath(); c.rect(-6, -3.5, 12, 7); c.fill(); c.stroke(); c.restore(); };
  // a party-popper cone: narrow end at (x, y), opening along `ang`
  const cone = (c, x, y, ang) => {
    c.save(); c.translate(x, y); c.rotate(ang); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(0, -6); c.lineTo(46, -18); c.lineTo(46, 18); c.lineTo(0, 6); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#FF5A4D'; c.beginPath(); c.moveTo(18, -10.7); c.lineTo(30, -13.8); c.lineTo(30, 13.8); c.lineTo(18, 10.7); c.closePath(); c.fill();
    c.restore();
  };
  const WORN = [[104,92],[154,90],[98,132],[164,128],[116,154],[148,162],[172,164],[92,176],[130,184],[160,188],[136,142],
                [112,72],[124,64],[138,66],[130,56],[148,74],[118,58],[50,196],[34,191],[208,196],[224,192]];
  const worn = (c, d, seed) => WORN.forEach(([x, y], i) => bit(c, x, y, i));
  // the blast, from the mouth of the cone at his face: k is how far it has spread
  const blast = k => (c, d, seed) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.3, r0 = 16 * k + (i % 2) * 6; c.moveTo(146 + Math.cos(a) * r0, 110 + Math.sin(a) * r0); c.lineTo(146 + Math.cos(a) * (r0 + 14), 110 + Math.sin(a) * (r0 + 14)); }
    c.stroke(); c.restore();
    for (let i = 0; i < 26; i++) { const a = i * 2.4, r = (14 + (i * 37 % 40)) * k; bit(c, 146 + Math.cos(a) * r, 110 + Math.sin(a) * r * 0.9, i); }
  };
  const falling = (c, d, seed) => WORN.forEach(([x, y], i) => bit(c, x + (i % 3 - 1) * 10, y - 26 - (i * 13 % 30), i + 1));
  const held = (x, y, ang, arm2) => ({ arm2, front: c => cone(c, x, y, ang) });
  D.confetti_cannon_1 = xf(D.N, { face: eager, extra: held(186, 130, -0.85, [[164, 140], [184, 134]]) });
  D.confetti_cannon_2 = xf(D.N, { face: bracing, ky: 0.94, kx: 1.03, extra: held(186, 134, -0.85, [[164, 144], [184, 138]]) });
  D.confetti_cannon_3 = xf(D.N, { face: puzzled, extra: held(186, 130, -0.6, [[164, 140], [184, 134]]) });
  D.confetti_cannon_4 = xf(D.N, { face: peering, rot: 0.05, extra: held(206, 112, Math.PI + 0.06, [[168, 138], [200, 118]]) });
  D.confetti_cannon_5 = xf(D.N, { face: FACE.shock, rot: -0.1, extra: { arm2: [[166, 138], [204, 120]], front: (c, d, s) => { cone(c, 212, 114, Math.PI + 0.06); blast(1)(c, d, s); } } });
  D.confetti_cannon_6 = xf(D.N, { face: FACE.shock, rot: -0.06, extra: { front: (c, d, s) => { cone(c, 214, 150, 2.2); blast(2.2)(c, d, s); } } });
  D.confetti_cannon_7 = xf(D.N, { face: stunned, extra: { front: (c, d, s) => { cone(c, 222, 190, 3.3); falling(c, d, s); } } });
  D.confetti_cannon_8 = xf(D.N, { face: stunned, extra: { front: worn } });
  D.confetti_cannon_9 = xf(D.N, { face: blink, extra: { front: worn } });
  CLIPS.confetti_cannon = { home: 'idle', seq: [...WAKE, ['confetti_cannon_1', 10], ['confetti_cannon_2', 8], ['confetti_cannon_3', 8], ['confetti_cannon_4', 12],
    ['confetti_cannon_5', 2], ['confetti_cannon_6', 3], ['confetti_cannon_7', 4], ['confetti_cannon_8', 10], ['confetti_cannon_9', 3], ['confetti_cannon_8', 8],
    ['confetti_cannon_9', 3], ['confetti_cannon_8', 6], ...DOZE] };
})();
