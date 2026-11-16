// Ringing phone: a phone taller than he is thuds down and rings. He wrestles it over, stands on it, and stomps on "decline".
// group: meetings
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', GLASS = '#2B3A4A', RED = '#FF5A4D', GREEN = '#58D68D';
  const startled = [['dot',122,108,4.6], ['dot',146,106,4.6], ['mouth',[[127,119],[139,118],[140,130],[133,134],[126,130]]]];
  const effort = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const lookDown = [['stroke',[[110,104],[123,108]],3], ['stroke',[[135,106],[148,102]],3], ['dot',119,115,3.4], ['dot',143,113,3.4], ['stroke',[[123,128],[135,128]],3]];
  const smug = [...FACE.aahEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const blob = (c, x, y, rx, ry, col) => { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fill(); };
  const rings = (c, x, y, a) => { c.strokeStyle = CREAM; c.lineWidth = 3; [13, 23].forEach(r => { c.beginPath(); c.arc(x, y, r, a - 0.55, a + 0.55); c.stroke(); }); };
  // upright, 84 by 160, rocking on whichever bottom corner it leans towards
  const phone = (rot, ring, lift = 0) => (c, d, seed) => {
    const px = rot < 0 ? 146 : 230;
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(px, 199 - lift); c.rotate(rot); c.translate(188 - px, 0);
    c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(-42, -160, 84, 160, 12); c.fill(); c.stroke();
    c.fillStyle = GLASS; c.beginPath(); c.roundRect(-34, -150, 68, 140, 6); c.fill();
    blob(c, 0, -106, 17, 17, '#9FB0C4'); blob(c, -16, -36, 11, 11, RED); blob(c, 16, -36, 11, 11, GREEN);
    if (ring) { rings(c, -34, -160, -2.1); rings(c, 26, -160, -1.2); }
    c.restore();
  };
  // knocked flat on the floor, seen nearly edge-on; he stands on it
  const flat = (ring, live, jog = 0) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(118 + jog, 189);
    c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.beginPath(); c.roundRect(-85, -8, 170, 28, 9); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(-85, -15, 170, 28, 9); c.fill(); c.stroke();
    c.fillStyle = GLASS; c.beginPath(); c.roundRect(-77, -10, 154, 18, 5); c.fill();
    if (live) { blob(c, 47, -1, 9, 4.5, RED); blob(c, 68, -1, 9, 4.5, GREEN); }
    if (ring) { rings(c, -85, -4, Math.PI); rings(c, 85, -4, 0); }
    c.restore();
  };
  const HOME = { dx: -50 }, ON = { dx: -28, dy: -11 };
  D.ringing_phone_in = xf(D.N, { dx: -20, face: FACE.lookup, extra: { front: phone(0, false, 150) } });
  D.ringing_phone_thud = xf(D.K1, { ...HOME, extra: { front: phone(0, false), fx: [64, 70] } });
  D.ringing_phone_ring1 = xf(D.N, { ...HOME, face: startled, extra: { front: phone(0.04, true) } });
  D.ringing_phone_ring2 = xf(D.N, { ...HOME, face: startled, ky: 0.97, extra: { front: phone(-0.05, false) } });
  D.ringing_phone_mad1 = xf(D.N, { ...HOME, face: FACE.grump, extra: { front: phone(0.04, true) } });
  D.ringing_phone_mad2 = xf(D.N, { ...HOME, face: FACE.grump, extra: { front: phone(-0.05, false) } });
  D.ringing_phone_grab1 = xf(D.N, { dx: -26, rot: 0.16, face: effort, extra: { arm: [[72, 140], [48, 152]], arm2: [[148, 144], [176, 102]], back: phone(0.05, true) } });
  D.ringing_phone_grab2 = xf(D.N, { dx: -46, rot: -0.12, ky: 0.95, face: effort, extra: { arm: [[42, 146], [20, 160]], arm2: [[112, 136], [138, 96]], back: phone(-0.2, false) } });
  D.ringing_phone_over = xf(D.N, { dx: -30, dy: -66, shadowK: 0.6, face: effort, extra: { arm: [[62, 78], [42, 60]], arm2: [[136, 78], [156, 60]], back: phone(-1.15, false) } });
  D.ringing_phone_land = xf(D.N, { ...ON, ky: 0.8, kx: 1.1, face: effort, extra: { back: flat(false, true) } });
  D.ringing_phone_win1 = xf(D.N, { ...ON, face: FACE.happy, extra: { arm: [[70, 122], [52, 92]], arm2: [[140, 122], [160, 92]], back: flat(true, true, -2) } });
  D.ringing_phone_win2 = xf(D.N, { ...ON, face: FACE.happy, ky: 1.03, extra: { arm: [[70, 120], [56, 86]], arm2: [[140, 120], [156, 86]], back: flat(false, true, 2) } });
  D.ringing_phone_hmm1 = xf(D.N, { ...ON, face: lookDown, extra: { back: flat(true, true, -2) } });
  D.ringing_phone_hmm2 = xf(D.N, { ...ON, face: lookDown, extra: { back: flat(false, true, 2) } });
  D.ringing_phone_up = xf(D.N, { ...ON, dy: -34, ky: 1.06, kx: 0.96, shadowK: 0.7, face: lookDown, extra: { back: flat(true, true) } });
  D.ringing_phone_stomp = xf(D.N, { ...ON, ky: 0.8, kx: 1.1, face: effort, extra: { back: flat(false, false) } });
  D.ringing_phone_quiet = xf(D.N, { ...ON, face: smug, extra: { back: flat(false, false) } });
  const n = s => 'ringing_phone_' + s, pair = (a, k) => Array.from({ length: k }, (_, i) => [n(a + (i % 2 + 1)), 3]);
  CLIPS.ringing_phone = { home: 'idle', seq: [...WAKE, [n('in'), 2], [n('thud'), 6], ...pair('ring', 4), ...pair('mad', 4), ...pair('grab', 6), [n('over'), 3], [n('land'), 3],
    ...pair('win', 4), ...pair('hmm', 4), [n('up'), 3], [n('stomp'), 4], [n('quiet'), 14], ...DOZE] };
})();
