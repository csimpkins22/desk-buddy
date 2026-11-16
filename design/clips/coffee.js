// Coffee: he wakes up groggy, sips from a mug twice, and the caffeine hits.
// group: clock
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath, mixHex, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const groggy = [['stroke',[[110,110],[122,110]],3], ['stroke',[[134,108],[146,108]],3], ['stroke',[[122,124],[128,125],[134,124]],2.6]];
  const sipping = [['stroke',[[110,108],[116,112],[122,108]],3], ['stroke',[[134,106],[140,110],[146,106]],3]];
  const hmm = [['dot',116,108,4.2], ['dot',140,106,4.2], ['mouth',[[124,120],[132,120],[133,126],[128,129],[123,126]]]];
  const wired = [['oval',112,104,11,12.5], ['oval',144,102,11,12.5], ['shine',116,99,3.4], ['shine',148,97,3.4],
                 ['stroke',[[120,129],[124,126],[128,129],[132,126],[136,129]],2.6]];
  const buzzing = [...wired.slice(0, 4), ['mouth',[[114,124],[144,122],[140,134],[129,138],[118,134]],[129,134,8,3.5]]];
  const mug = (x, y, tilt, steam) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.lineJoin = c.lineCap = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.arc(13, 2, 8, -1.2, 1.2); c.stroke();
    c.fillStyle = '#17161A'; c.beginPath(); c.roundRect(-13, -14, 26, 28, 5); c.fill(); c.stroke();
    c.fillStyle = '#6B4A1F'; c.beginPath(); c.ellipse(0, -10, 9, 2.6, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    if (!steam) return;
    c.save(); c.globalAlpha = 0.55; c.strokeStyle = CREAM; c.lineWidth = 2.2; c.lineCap = 'round';
    for (let k = 0; k < 2; k++) {
      const flip = (seed + k) % 2 ? 1 : -1;
      openPath(c, boil([0, 1, 2, 3].map(i => [x - 5 + k * 10 + (i % 2 ? 4 : -4) * flip, y - 22 - i * 8]), seed + k * 7, 1.5)); c.stroke();
    }
    c.restore();
  };
  const held = { arm2: [[166, 140], [196, 136]], front: mug(207, 128, 0, true) };
  D.coffee1 = xf(D.N, { face: groggy });
  D.coffee2 = xf(D.N, { face: groggy, extra: held });
  D.coffee3 = xf(D.N, { face: sipping, extra: { arm2: [[166, 140], [156, 132]], front: mug(141, 124, -0.55, false) } });
  D.coffee4 = xf(D.N, { face: hmm, extra: held });
  D.coffee5 = xf(D.N, { face: wired, dx: -3, k: 1.04, extra: { fxm: 'alert', fx: [150, 58] } });
  D.coffee6 = xf(D.N, { face: wired, dx: 3, k: 1.04, extra: { fxm: 'alert', fx: [150, 58] } });
  D.coffee7 = xf(D.N, { face: buzzing, dx: -2, k: 1.02 });
  D.coffee8 = xf(D.N, { face: buzzing, dx: 2, k: 1.02 });
  const jitter = n => Array.from({ length: n }, (_, i) => [i % 2 ? 'coffee6' : 'coffee5', 2]);
  CLIPS.coffee = { home: 'idle', seq: [...WAKE, ['coffee1', 8], ['coffee2', 10], ['coffee3', 8], ['coffee2', 5], ['coffee3', 8], ['coffee4', 12],
    ...jitter(8), ['coffee7', 3], ['coffee8', 3], ['coffee7', 3], ['coffee8', 3], ['coffee7', 3], ['coffee8', 3], ...DOZE] };
})();
