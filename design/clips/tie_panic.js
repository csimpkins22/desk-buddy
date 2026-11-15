// Tie panic: he knots a tie three times and every time it comes out as a bow, each bigger than the last.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF';
  const hopeful = [['dot',120,110,3.8], ['dot',144,108,3.8], ['stroke',[[122,123],[129,127],[136,123]],2.8]];
  const lookDown = [['dot',117,114,3.6], ['dot',141,112,3.6], ['stroke',[[108,101],[120,99]],2.4], ['stroke',[[123,127],[128,125],[133,127]],2.6]];
  const dismay = [['dot',117,112,4.4], ['dot',141,110,4.4], ['mouth',[[123,121],[133,120],[134,128],[128,131],[122,128]]]];
  const poly = (c, pts, seed) => { c.beginPath(); boil(pts, seed, 1.2).forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  const ink = c => { c.lineJoin = c.lineCap = 'round'; c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2.6; };
  const tie = (x, y) => (c, d, seed) => {                       // a proper long tie, hanging from (x, y)
    c.save(); ink(c);
    poly(c, [[x - 4, y + 8], [x + 4, y + 8], [x + 10, y + 50], [x, y + 62], [x - 10, y + 50]], seed);
    poly(c, [[x - 7, y - 2], [x + 7, y - 2], [x + 4, y + 9], [x - 4, y + 9]], seed + 3);
    c.restore();
  };
  const ribbon = flip => (c, d, seed) => {                      // loose ends flapping while he fumbles at his neck
    c.save(); c.lineJoin = c.lineCap = 'round';
    [[[118, 150], [100, 150 - flip * 16], [84, 138 + flip * 22]], [[138, 150], [156, 150 + flip * 16], [172, 140 - flip * 22]]].forEach((p, i) => {
      openPath(c, boil(p, seed + i, 1.5)); c.strokeStyle = CREAM; c.lineWidth = 11; c.stroke(); c.strokeStyle = BLUE; c.lineWidth = 6; c.stroke();
    });
    c.restore();
  };
  const bow = (s, y = 146) => (c, d, seed) => {
    const w = 22 * s, h = 13 * s;
    c.save(); ink(c);
    poly(c, [[128, y], [128 - w, y - h], [128 - w * 0.9, y + h]], seed);
    poly(c, [[128, y], [128 + w, y - h], [128 + w * 0.9, y + h]], seed + 3);
    c.beginPath(); c.roundRect(128 - 4 * s, y - 5 * s, 8 * s, 10 * s, 3 * s); c.fill(); c.stroke();
    c.restore();
  };
  const NECK = flip => ({ arm: [[90, 146], [114, 150 - flip * 5]], arm2: [[166, 146], [142, 150 + flip * 5]] });
  D.tie_show = xf(D.N, { face: hopeful, extra: { arm2: [[166, 140], [198, 110]], front: tie(204, 104) } });
  D.tie_on = xf(D.N, { face: lookDown, extra: { front: tie(128, 136) } });
  D.tie_fa = xf(D.N, { face: FACE.chooEyes, rot: -0.03, extra: { ...NECK(1), front: ribbon(1) } });
  D.tie_fb = xf(D.N, { face: FACE.chooEyes, rot: 0.03, extra: { ...NECK(-1), front: ribbon(-1) } });
  D.tie_bow1 = xf(D.N, { face: lookDown, extra: { front: bow(1) } });
  D.tie_bow2 = xf(D.N, { face: dismay, extra: { front: bow(1.7, 150) } });
  D.tie_bow3 = xf(D.N, { face: FACE.grump, ky: 0.95, kx: 1.03, extra: { front: bow(2.5, 158) } });
  D.tie_bow3b = xf(D.N, { face: FACE.grump, ky: 0.97, extra: { front: bow(2.5, 159) } });
  const fumble = n => Array.from({ length: n }, (_, i) => [i % 2 ? 'tie_fb' : 'tie_fa', 3]);
  CLIPS.tie_panic = { home: 'idle', seq: [...WAKE, ['tie_show', 12], ['tie_on', 8], ...fumble(4), ['tie_bow1', 14], ...fumble(4), ['tie_bow2', 12],
    ...fumble(6), ['tie_bow3', 4], ['tie_bow3b', 18], ...DOZE] };
})();
