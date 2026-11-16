// Mic drop: he says his piece, holds the mic out and lets go, eyes shut and smug. It bounces off the floor and bonks him.
// group: celebrations
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const quiet = [['dot',118,108,4], ['dot',142,106,4], ['stroke',[[122,123],[129,126],[136,122]],2.8]];
  const smug = [...FACE.aahEyes, ['stroke',[[119,123],[128,127],[138,120]],2.8]];
  // (x, y) is where the head meets the handle; rot 0 is head up
  const mic = (c, x, y, rot) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = '#17161A'; c.beginPath(); c.roundRect(-5.5, 0, 11, 30, 4); c.fill(); c.stroke();
    c.fillStyle = '#9FB0C4'; c.beginPath(); c.arc(0, -7, 11, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-10, -5); c.lineTo(10, -5); c.stroke();
    c.restore();
  };
  const bang = (c, x, y, r) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2, r0 = r + (i % 2) * 4; c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * (r0 + 10), y + Math.sin(a) * (r0 + 10)); }
    c.stroke(); c.restore();
  };
  const bump = (c, x, y) => { c.save(); c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.ellipse(x, y, 10, 11, 0.5, Math.PI, Math.PI * 2); c.fill(); c.stroke(); c.restore(); };
  const OUT = { arm2: [[166, 138], [202, 126]] }, DOWN = { arm2: [[166, 142], [192, 152]] };
  D.mic_drop_1 = xf(D.N, { face: FACE.happy, extra: { arm2: [[166, 142], [160, 138]], front: c => mic(c, 152, 132, -0.5) } });
  D.mic_drop_2 = xf(D.N, { face: quiet, extra: { arm2: [[166, 142], [160, 138]], front: c => mic(c, 153, 133, -0.4) } });
  D.mic_drop_3 = xf(D.N, { face: smug, rot: -0.04, extra: { ...OUT, front: c => mic(c, 208, 106, 0) } });
  D.mic_drop_4 = xf(D.N, { face: smug, rot: -0.04, extra: { ...OUT, front: c => mic(c, 208, 138, 0.3) } });
  D.mic_drop_5 = xf(D.N, { face: smug, rot: -0.04, extra: { ...OUT, front: c => { bang(c, 210, 196, 8); mic(c, 210, 178, 0.9); } } });
  D.mic_drop_6 = xf(D.N, { face: smug, rot: -0.04, extra: { ...DOWN, front: c => mic(c, 200, 122, 2.6) } });
  D.mic_drop_7 = xf(D.N, { face: smug, rot: -0.04, extra: { ...DOWN, front: c => mic(c, 178, 66, 4.4) } });
  D.mic_drop_8 = xf(D.N, { face: FACE.shock, ky: 0.84, kx: 1.08, extra: { front: c => { bang(c, 148, 84, 9); mic(c, 152, 76, 5.6); } } });
  D.mic_drop_9 = xf(D.N, { face: FACE.spiral, ky: 0.92, kx: 1.04, extra: { front: c => { bump(c, 150, 86); mic(c, 100, 40, 0.9); } } });
  D.mic_drop_10 = xf(D.N, { face: FACE.spiral, rot: -0.05, extra: { front: c => { bump(c, 146, 79); mic(c, 56, 110, 2.6); } } });
  D.mic_drop_11 = xf(D.N, { face: FACE.spiral, rot: 0.05, extra: { front: c => { bump(c, 156, 81); mic(c, 44, 192, 1.45); } } });
  D.mic_drop_12 = xf(D.N, { face: FACE.spiral, rot: -0.05, extra: { front: c => { bump(c, 146, 79); mic(c, 44, 192, 1.45); } } });
  D.mic_drop_13 = xf(D.N, { face: FACE.sheep, extra: { front: c => { bump(c, 151, 80); mic(c, 44, 192, 1.45); } } });
  CLIPS.mic_drop = { home: 'idle', seq: [...WAKE, ['mic_drop_1', 4], ['mic_drop_2', 4], ['mic_drop_1', 4], ['mic_drop_2', 4], ['mic_drop_3', 12], ['mic_drop_4', 2], ['mic_drop_5', 2],
    ['mic_drop_6', 2], ['mic_drop_7', 2], ['mic_drop_8', 4], ['mic_drop_9', 2], ['mic_drop_10', 3], ['mic_drop_11', 5], ['mic_drop_12', 5], ['mic_drop_11', 5], ['mic_drop_13', 12], ...DOZE] };
})();
