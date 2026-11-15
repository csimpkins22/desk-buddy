// Typewriter: he types a line, the bell dings, and the carriage return takes him with it, flat against the side of the frame.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', HOME = 156, STEP = 7;
  const busy = [['dot',117,113,3.6], ['dot',141,111,3.6], ['stroke',[[123,125],[128,126],[133,125]],2.6]];
  // in front of him: the carriage (with its paper and return lever) centred on cx, n letters typed; zip: streaks as it flies home
  const typewriter = (cx, n, zip) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (zip) { c.strokeStyle = CREAM; c.globalAlpha = 0.7; c.lineWidth = 2.4; c.beginPath(); [136, 148, 162].forEach((y, i) => { c.moveTo(cx - 74 - i * 8, y); c.lineTo(cx - 108 - i * 6, y); }); c.stroke(); c.globalAlpha = 1; }
    c.fillStyle = CREAM; c.beginPath(); c.rect(cx - 18, 130, 36, 28); c.fill();
    c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.moveTo(cx - 13, 138); c.lineTo(cx + 13, 138); if (n) { c.moveTo(cx - 13, 146); c.lineTo(cx - 13 + n * 3.2, 146); } c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(cx - 50, 160); c.lineTo(cx - 60, 144); c.stroke();
    c.beginPath(); c.arc(cx - 60, 144, 3.6, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#9FB0C4'; c.lineWidth = 2.4; c.beginPath(); c.roundRect(cx - 52, 155, 104, 13, 5); c.fill(); c.stroke();
    c.fillStyle = DARK; c.lineWidth = 3; c.beginPath(); c.roundRect(72, 168, 112, 34, 8); c.fill(); c.stroke();
    c.fillStyle = CREAM; c.beginPath();
    for (let i = 0; i < 11; i++) { const x = i < 6 ? 88 + i * 16 : 96 + (i - 6) * 16, y = i < 6 ? 179 : 191; c.moveTo(x + 3.4, y); c.arc(x, y, 3.4, 0, Math.PI * 2); }
    c.fill(); c.restore();
  };
  const TAP = [{ arm: [[92, 150], [99, 172]], arm2: [[164, 150], [158, 158]] }, { arm: [[92, 150], [98, 158]], arm2: [[164, 150], [157, 172]] }];
  const END = HOME - 8 * STEP, seq = [['typewriter_0', 6]];
  D.typewriter_0 = xf(D.N, { face: FACE.happy, extra: { front: typewriter(HOME, 0) } });
  for (let n = 1; n <= 8; n++) {
    D['typewriter_' + n] = xf(D.N, { face: busy, rot: n % 2 ? -0.02 : 0.02, extra: { ...TAP[n % 2], front: typewriter(HOME - n * STEP, n) } });
    seq.push(['typewriter_' + n, 3]);
  }
  D.typewriter_ding = xf(D.N, { face: FACE.happy, ky: 1.03, extra: { front: typewriter(END, 8), fxm: 'alert', fx: [150, 58] } });
  D.typewriter_reach = xf(D.N, { face: FACE.happy, rot: -0.05, extra: { arm: [[90, 146], [52, 146]], front: typewriter(END, 8) } });
  D.typewriter_zip1 = xf(D.N, { face: FACE.shock, rot: 0.22, dx: 16, extra: { front: typewriter(132, 8, true) } });
  D.typewriter_zip2 = xf(D.N, { face: FACE.shock, rot: 0.6, dx: 56, dy: -34, shadowK: 0.7, extra: { front: typewriter(HOME + 6, 8, true) } });
  D.typewriter_splat = xf(D.N, { face: FACE.spiral, kx: 0.58, dx: 80, dy: -8, shadowK: 0.6, extra: { front: typewriter(HOME, 8) } });
  D.typewriter_peel = xf(D.N, { face: FACE.spiral, kx: 0.8, dx: 66, rot: -0.08, extra: { front: typewriter(HOME, 8) } });
  D.typewriter_back = xf(D.N, { face: FACE.spiral, dx: 36, rot: 0.06, extra: { front: typewriter(HOME, 8) } });
  D.typewriter_end = xf(D.N, { face: FACE.sheep, dx: 12, extra: { front: typewriter(HOME, 8) } });
  CLIPS.typewriter = { home: 'idle', seq: [...WAKE, ...seq, ['typewriter_ding', 5], ['typewriter_reach', 3], ['typewriter_zip1', 2], ['typewriter_zip2', 2],
    ['typewriter_splat', 7], ['typewriter_peel', 4], ['typewriter_back', 4], ['typewriter_end', 5], ...DOZE] };
})();
