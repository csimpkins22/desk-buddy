// Lunch: a sandwich too big for his mouth bonks off his face, so he unhinges his jaw, posts it in sideways and ends up sandwich-shaped.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC';
  const eager = [['dot',118,110,4], ['dot',142,108,4], ['mouth',[[124,120],[132,120],[133,126],[128,129],[123,126]]]];
  const bonked = [['stroke',[[108,104],[116,109],[108,114]],3], ['stroke',[[148,102],[140,107],[148,112]],3], ['stroke',[[120,125],[124,123],[128,125],[132,123]],2.6]];
  const jaw = [['stroke',[[106,95],[113,99],[120,95]],3], ['stroke',[[138,93],[145,97],[152,93]],3], ['mouth',[[96,108],[170,106],[176,136],[160,164],[132,170],[104,164],[90,136]],[132,160,24,9]]];
  const chew = [['stroke',[[110,108],[116,112],[122,108]],3], ['stroke',[[134,106],[140,110],[146,106]],3], ['stroke',[[122,124],[128,121],[134,124]],2.8], ...FACE.puff.slice(3)];
  // cut: nothing left of this x is drawn (the end that is already in his mouth)
  const sandwich = (cx, cy, cut = 0) => (c, d, seed) => {
    const w = 44, bread = (y, h) => { c.fillStyle = '#E3B062'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); c.roundRect(cx - w, y, w * 2, h, 7); c.fill(); c.stroke(); };
    c.save(); c.lineJoin = c.lineCap = 'round'; c.beginPath(); c.rect(cut, 0, 240, 240); c.clip();
    bread(cy + 8, 14);
    c.fillStyle = '#FF5A4D'; c.fillRect(cx - w + 3, cy + 1, w * 2 - 6, 7);
    c.fillStyle = '#FFD23F'; c.fillRect(cx - w + 1, cy - 4, w * 2 - 2, 5);
    c.strokeStyle = '#58D68D'; c.lineWidth = 5; openPath(c, boil(Array.from({ length: 9 }, (_, i) => [cx - w - 2 + i * (w * 2 + 4) / 8, cy - 6 + (i % 2 ? 3 : -2)]), seed, 1)); c.stroke();
    bread(cy - 26, 18);
    c.restore();
  };
  // him with the sandwich inside: a box w wide either side, his head on top
  const boxed = (w, face, o = {}) => xf({ ...xf(D.N, { ky: 0.87, face }), shadow: [128, w + 4], body: [[134 - w, 198], [128 - w / 2, 201], [128 + w / 2, 201], [122 + w, 198], [128 + w, 186], [128 + w, 158], [120 + w, 146],
    [172, 140], [166, 112], [150, 94], [130, 88], [110, 92], [94, 108], [86, 138], [136 - w, 146], [128 - w, 158], [128 - w, 186]] }, o);
  const HOLD = { arm2: [[166, 146], [190, 150]] };
  D.lunch_1 = xf(D.N, { face: FACE.happy, extra: { ...HOLD, front: sandwich(196, 142) } });
  D.lunch_2 = xf(D.N, { face: eager, rot: 0.04, extra: { arm2: [[166, 140], [184, 138]], front: sandwich(181, 128) } });
  D.lunch_3 = xf(D.N, { face: bonked, rot: -0.06, extra: { arm2: [[160, 140], [178, 138]], front: sandwich(166, 128) } });
  D.lunch_4 = xf(D.N, { face: FACE.lookr, extra: { ...HOLD, front: sandwich(196, 142) } });
  D.lunch_5 = xf(D.N, { face: jaw, ky: 1.06, kx: 1.05, extra: { ...HOLD, front: sandwich(196, 138) } });
  D.lunch_6 = xf(D.N, { face: jaw, ky: 1.06, kx: 1.05, extra: { arm2: [[170, 144], [200, 142]], front: sandwich(168, 136, 128) } });
  D.lunch_7 = xf(D.N, { face: jaw, ky: 1.06, kx: 1.05, extra: { arm2: [[170, 144], [186, 142]], front: sandwich(132, 136, 128) } });
  [84, 74, 64].forEach((w, i) => {
    D['lunch_' + (8 + i * 2)] = boxed(w, FACE.puff);
    D['lunch_' + (9 + i * 2)] = boxed(w, chew, { ky: 0.93, kx: 1.03 });
  });
  D.lunch_14 = xf(D.N, { face: chew.slice(0, 3), ky: 1.08, kx: 0.94 });
  CLIPS.lunch = { home: 'idle', seq: [...WAKE, ['lunch_1', 8], ['lunch_2', 5], ['lunch_3', 5], ['lunch_2', 4], ['lunch_3', 6], ['lunch_4', 10], ['lunch_5', 4], ['lunch_6', 3], ['lunch_7', 3],
    ...[8, 9, 10, 11, 12, 13].map(n => ['lunch_' + n, 4]), ['lunch_14', 3], ['C1', 10], ...DOZE] };
})();
