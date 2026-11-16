// Flare gun: he braces for a mighty flare. It wobbles up a little way and goes off with one tiny sad pop.
// group: waiting
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', MUZZLE = [214, 70], TOP = [219, 30], RISE = 47, FALL = 69;
  const set = [['dot',118,106,3.8], ['dot',142,104,3.8], ['stroke',[[108,97],[121,100]],2.6], ['stroke',[[136,98],[149,94]],2.6], ['stroke',[[122,123],[134,122]],2.8]];
  const braced = [...FACE.chooEyes, ['stroke',[[119,126],[123,123],[127,126],[131,123],[135,126]],2.6]];
  const hopeful = [['dot',121,102,4.2], ['dot',145,100,4.2], ['stroke',[[122,119],[129,124],[136,119]],2.8]];
  const flat = [['dot',121,104,3.6], ['dot',145,102,3.6], ['stroke',[[123,123],[135,122]],2.8]];
  const blink = [['stroke',[[111,110],[121,110]],2.8], ['stroke',[[135,108],[145,108]],2.8], ['stroke',[[122,124],[134,123]],2.8]];
  // a stubby pistol: barrel along +x from the hand, grip on the side nearer him
  const gun = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a); c.lineJoin = c.lineCap = 'round'; c.fillStyle = '#FF5A4D'; c.strokeStyle = CREAM; c.lineWidth = 2.4;
    c.beginPath(); c.arc(13, -11, 6, Math.PI, Math.PI * 2); c.stroke();
    c.save(); c.rotate(-0.25); c.beginPath(); c.roundRect(-7, -26, 13, 26, 4); c.fill(); c.stroke(); c.restore();
    c.beginPath(); c.roundRect(-6, -10, 40, 20, 5); c.fill(); c.stroke();
    c.fillStyle = '#FFD23F'; c.beginPath(); c.roundRect(28, -12, 10, 24, 3); c.fill(); c.stroke();
    c.restore();
  };
  const rays = (c, [x, y], r0, r1, n, colour) => {
    c.save(); c.strokeStyle = colour; c.lineWidth = 2.4; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + 0.3; c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); }
    c.stroke(); c.restore();
  };
  const flare = (c, x, y, alpha = 1) => { c.save(); c.globalAlpha = alpha; c.fillStyle = '#FFD23F'; c.strokeStyle = '#FF5A4D'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 4.5, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore(); };
  const aimed = c => gun(c, 202, 112, -1.25);
  const bang = c => { gun(c, 203, 119, -1.05); rays(c, [224, 80], 8, 17, 7, CREAM); };
  // the flare labours upward on a dotted trail
  const rising = (c, d, seed, tick) => {
    const p = Math.min(1, Math.floor((tick - RISE) / 2) / 8), x = MUZZLE[0] + (TOP[0] - MUZZLE[0]) * p + Math.sin(p * 9) * 3, y = MUZZLE[1] + (TOP[1] - MUZZLE[1]) * p;
    aimed(c);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2; c.lineCap = 'round'; c.globalAlpha = 0.6; c.setLineDash([2, 5]); c.beginPath(); c.moveTo(MUZZLE[0], MUZZLE[1] - 4); c.lineTo(x, y + 6); c.stroke(); c.restore();
    flare(c, x, y);
  };
  const pop = big => c => { aimed(c); rays(c, TOP, big ? 7 : 3, big ? 14 : 7, 6, '#FFD23F'); };
  // one spark drops out of the sky and fades
  const falling = (c, d, seed, tick) => {
    const p = Math.min(1, Math.floor((tick - FALL) / 2) / 7);
    aimed(c); flare(c, TOP[0] + p * 10, TOP[1] + p * p * 150, 1 - p * 0.8);
  };
  const smoke = (c, d, seed) => {
    gun(c, 198, 152, 0.2);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.2; c.lineCap = 'round'; c.globalAlpha = 0.5;
    c.beginPath(); c.moveTo(234, 144); c.bezierCurveTo(228 + (seed % 2 ? 7 : -7), 134, 236 + (seed % 2 ? -7 : 7), 124, 230, 112); c.stroke(); c.restore();
  };
  const UP = { arm2: [[166, 140], [194, 122]] };
  D.flare_gun_1 = xf(D.N, { face: set, extra: { ...UP, front: aimed } });
  D.flare_gun_2 = xf(D.N, { face: braced, ky: 0.93, kx: 1.03, dx: -1.5, extra: { ...UP, arm: [[90, 140], [102, 114]], front: aimed } });
  D.flare_gun_3 = xf(D.N, { face: braced, ky: 0.92, kx: 1.04, dx: 1.5, extra: { ...UP, arm: [[90, 140], [102, 114]], front: aimed } });
  D.flare_gun_4 = xf(D.N, { face: braced, ky: 0.88, kx: 1.06, extra: { arm2: [[166, 142], [195, 128]], arm: [[90, 140], [102, 114]], front: bang } });
  D.flare_gun_5 = xf(D.N, { face: hopeful, extra: { ...UP, front: rising } });
  D.flare_gun_6 = xf(D.N, { face: hopeful, extra: { ...UP, front: pop(false) } });
  D.flare_gun_7 = xf(D.N, { face: hopeful, extra: { ...UP, front: pop(true) } });
  D.flare_gun_8 = xf(D.N, { face: flat, extra: { ...UP, front: falling } });
  D.flare_gun_9 = xf(D.N, { face: FACE.lookr, ky: 0.97, extra: { ...UP, front: falling } });
  D.flare_gun_10 = xf(D.N, { face: FACE.sheep, ky: 0.96, extra: { arm2: [[166, 142], [190, 152]], front: smoke } });
  D.flare_gun_11 = xf(D.N, { face: blink, ky: 0.96, extra: { arm2: [[166, 142], [190, 152]], front: smoke } });
  CLIPS.flare_gun = { home: 'idle', seq: [...WAKE, ['flare_gun_1', 8], ['flare_gun_2', 2], ['flare_gun_3', 2], ['flare_gun_2', 2], ['flare_gun_3', 2], ['flare_gun_4', 2],
    ['flare_gun_5', 16], ['flare_gun_6', 2], ['flare_gun_7', 4], ['flare_gun_8', 8], ['flare_gun_9', 8], ['flare_gun_10', 10], ['flare_gun_11', 3], ['flare_gun_10', 8], ...DOZE] };
})();
