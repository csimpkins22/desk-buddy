// He sleeps through it: a toaster off to the left pops, and the toast arcs over and lands flat on his back.
(() => {
  const { D, xf } = window.__lump, kit = window.__lump.kit, { CREAM, GREY, DARK, YELLOW, RED, TAU } = kit;
  const k = kit.clip('toaster', { asleep: true });
  const cam = t => kit.view(1 - 0.2 * t, [120 - 42 * t, 201], [120, 201 - 5 * t]), TX = -34, STEEL = '#5E6B7C';
  // the toaster stands just off the left of the screen until the view pulls back; lever 1 is down, 0 is up
  const toaster = (c, hop, lever, glow) => {
    c.save(); c.translate(TX, 201 - hop); c.scale(1.3, 1.3); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.fillStyle = STEEL; c.fillRect(-22, -5, 10, 5); c.fillRect(12, -5, 10, 5);
    c.fillStyle = GREY; c.beginPath(); c.roundRect(-28, -47, 56, 43, 9); c.fill(); c.stroke();
    c.fillStyle = glow ? YELLOW : DARK; c.beginPath(); c.roundRect(-18, -43, 36, 6, 2); c.fill();
    c.fillStyle = STEEL; c.fillRect(-20, -16, 40, 4);
    c.fillStyle = RED; c.lineWidth = 1.8; c.beginPath(); c.roundRect(26, -36 + lever * 16, 11, 7, 2); c.fill(); c.stroke();
    c.restore();
  };
  // a slice h tall before it is drawn 1.4 times over: 26 is face on, 10 is lying flat
  const toast = (c, x, y, rot, h = 26) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(1.4, 1.4); c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.1;
    c.fillStyle = '#C98A3C'; c.beginPath(); c.roundRect(-13, -h / 2, 26, h, Math.min(5, h / 3)); c.fill(); c.stroke();
    c.fillStyle = '#F2D08A'; c.beginPath(); c.roundRect(-8, -h / 2 + 3, 16, h - 6, 2); c.fill();
    c.restore();
  };
  const shot = (t, { hop = 0, lever = 1, glow = true, bread, a = 1 } = {}) => xf(D.S1, { extra: { fxm: 'idle', view: cam(t), back: c => toaster(c, hop, lever, glow),
    front: c => { if (bread) kit.fade(c, a, () => toast(c, ...bread)); } } });

  [0.35, 0.75, 1].forEach((t, i) => k.add('back' + i, 2, shot(t)));
  for (let n = 0; n < 2; n++) { k.add('hum0', 2, shot(1, { hop: 1.5 })); k.add('hum1', 2, shot(1)); }
  k.add('pop', 2, shot(1, { hop: 7, lever: 0, glow: false, bread: [TX, 136, 0] }));
  const LAND = [124, 133];
  for (let j = 1; j < 9; j++) {
    const t = j / 9, h = t < 0.7 ? 26 : 26 - 16 * (t - 0.7) / 0.3;
    k.add('fly' + j, 2, shot(1, { hop: j === 1 ? 3 : 0, lever: 0, glow: false, bread: [TX + (LAND[0] - TX) * t, 140 + (LAND[1] - 140) * t - 512 * t * (1 - t), t * TAU * 1.5, h] }));
  }
  const lain = [...LAND, -0.04, 10];
  k.add('hit', 2, shot(1, { lever: 0, glow: false, bread: lain }));
  k.add('hop', 2, shot(1, { lever: 0, glow: false, bread: [LAND[0] + 2, LAND[1] - 7, 0.12, 10] }));
  k.add('hit', 16);
  [0.65, 0.3, 0].forEach((t, i) => k.add('in' + i, 2, shot(t, { lever: 0, glow: false, bread: lain })));
  k.add('fade0', 2, shot(0, { lever: 0, glow: false, bread: lain, a: 0.6 }));
  k.add('fade1', 2, shot(0, { lever: 0, glow: false, bread: lain, a: 0.3 }));
  k.done();
})();
