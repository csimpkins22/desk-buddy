// Mailbox: he opens a mailbox, peers in, and a week of letters blasts out over him. The last one sticks to his face.
// group: meetings
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A';
  const peering = [['dot',125,110,4], ['dot',149,108,4], ['stroke',[[130,123],[135,125],[140,123]],2.6]];
  const braced = [...FACE.chooEyes, ['mouth',[[120,119],[136,118],[137,128],[128,132],[119,128]]]];
  const letter = (c, x, y, rot, k = 1) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = CREAM; c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.rect(-15 * k, -10 * k, 30 * k, 20 * k); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-15 * k, -10 * k); c.lineTo(0, 2 * k); c.lineTo(15 * k, -10 * k); c.stroke();
    c.restore();
  };
  // side-on, on a post, its door at the left end facing him. flag: radians it has dropped
  const box = (open, flag = 0) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.fillStyle = '#6B4A1F'; c.beginPath(); c.rect(193, 136, 11, 65); c.fill(); c.stroke();
    c.fillStyle = '#5AB8FF'; c.beginPath(); c.roundRect(160, 88, 76, 50, 17); c.fill(); c.stroke();
    if (open) {
      c.fillStyle = DARK; c.beginPath(); c.ellipse(171, 113, 8, 19, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      c.fillStyle = '#5AB8FF'; c.beginPath(); c.roundRect(145, 133, 27, 8, 3); c.fill(); c.stroke();
    } else { c.beginPath(); c.moveTo(175, 90); c.lineTo(175, 136); c.stroke(); }
    c.translate(212, 116); c.rotate(-flag); c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -40); c.stroke();
    c.fillStyle = '#FF5A4D'; c.lineWidth = 2; c.beginPath(); c.rect(0, -41, 17, 12); c.fill(); c.stroke();
    c.restore();
  };
  const BLAST = 50;                                              // the tick the letters start flying
  const burst = (c, d, seed, tick) => {
    box(true)(c, d, seed);
    const t = Math.floor((tick - BLAST) / 2) * 2;
    for (let i = 0; i < 11; i++) {
      const u = t - i * 2.5, x = 160 - u * (9 + (i * 37 % 11) * 0.6), y = 113 + u * (-8 + i * 5 % 9) + 0.25 * u * u;
      if (u >= 0 && x > -25 && y < 225) letter(c, x, y, u * 0.3 * (i % 2 ? 1 : -1));
    }
  };
  const after = (fx, fy, frot, flag) => (c, d, seed) => {
    box(true, flag)(c, d, seed);
    [[12, 191, 0.3], [142, 190, -0.25], [106, 193, 0.1], [174, 192, 0.5]].forEach(p => letter(c, ...p));
    letter(c, fx, fy, frot, 1.35);
  };
  const AT = { dx: -48 }, BACK = { dx: -58 };
  D.mailbox_step = xf(D.N, { dx: -20, rot: -0.05, face: FACE.lookr, extra: { front: box(false) } });
  D.mailbox_look = xf(D.N, { ...AT, face: FACE.lookr, extra: { front: box(false) } });
  D.mailbox_reach = xf(D.N, { ...AT, rot: 0.06, face: FACE.lookr, extra: { arm2: [[122, 140], [158, 120]], front: box(false) } });
  D.mailbox_open = xf(D.N, { dx: -40, rot: 0.14, face: peering, extra: { front: box(true) } });
  D.mailbox_hit1 = xf(D.N, { ...AT, rot: -0.1, face: FACE.shock, extra: { front: burst } });
  D.mailbox_hit2 = xf(D.N, { dx: -54, rot: -0.14, face: braced, extra: { arm: [[32, 142], [26, 108]], arm2: [[106, 136], [120, 104]], front: burst } });
  D.mailbox_hit3 = xf(D.N, { ...BACK, rot: -0.08, ky: 0.94, face: braced, extra: { arm: [[30, 146], [20, 116]], arm2: [[104, 142], [116, 112]], front: burst } });
  D.mailbox_stuck = xf(D.N, { ...BACK, ky: 0.94, face: [], extra: { front: after(71, 117, -0.12, 0) } });
  D.mailbox_slip = xf(D.N, { ...BACK, ky: 0.94, face: FACE.grump, extra: { front: after(74, 148, 0.35, 1.5) } });
  const n = s => 'mailbox_' + s;
  CLIPS.mailbox = { home: 'idle', seq: [...WAKE, [n('step'), 2], [n('look'), 8], [n('reach'), 6], [n('open'), 5], [n('hit1'), 6], [n('hit2'), 12], [n('hit3'), 14],
    [n('stuck'), 14], [n('slip'), 16], ...DOZE] };
})();
