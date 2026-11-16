// Origami: he folds himself up, square, triangle, kite, into a paper crane, and flaps off the floor. Then he springs open, still creased.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const set = [['dot',117,107,3.8], ['dot',141,105,3.8], ['stroke',[[122,124],[128,125],[134,124]],2.8], ['stroke',[[108,97],[121,100]],2.4], ['stroke',[[136,98],[149,95]],2.4]];
  const eyes = (x, y) => [['dot',x - 12,y,3.6], ['dot',x + 12,y - 1,3.6], ['stroke',[[x - 5,y + 13],[x + 5,y + 13]],2.6]];
  const creases = (lines, wing) => (c, _, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (wing) {
      const P = boil(wing, seed + 7, 1.6);
      c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 4; c.beginPath(); c.moveTo(...P[0]); c.lineTo(...P[1]); c.lineTo(...P[2]); c.closePath(); c.fill(); c.stroke();
    }
    c.strokeStyle = CREAM; c.globalAlpha = 0.6; c.lineWidth = 2.2; c.beginPath();
    lines.forEach(([a, b]) => { c.moveTo(...a); c.lineTo(...b); }); c.stroke(); c.restore();
  };
  // a folded shape: straight edges, every corner sharp
  const shape = (body, face, folds, more = {}) => ({ body, corners: body.map((_, i) => i), curl: [[128, body.reduce((m, p) => Math.min(m, p[1]), 240)]].flatMap(([x, y]) => [[x, y], [x - 5, y - 10], [x - 1, y - 17], [x + 6, y - 14], [x + 3, y - 8]]),
    face, shadow: [128, 52], fx: [128, 60], fxm: 'none', front: creases(folds), ...more });
  const crane = (dy, up) => {
    const m = P => P.map(([x, y]) => [x, y + dy]);
    const wing = m(up ? [[106, 152], [156, 152], [136, 52]] : [[106, 150], [156, 150], [150, 214]]);
    return shape(m([[30, 114], [56, 90], [112, 148], [132, 143], [150, 148], [216, 86], [162, 176], [130, 198], [100, 172], [60, 110]]), [['dot', 54, 104 + dy, 2.8]], [],
      { curl: m([[56, 90], [49, 80], [53, 72], [60, 75], [57, 81]]), shadow: [128, 46 + dy * 0.4], front: creases([m([[112, 150], [130, 196]]), m([[150, 150], [130, 196]])], wing) });
  };
  D.origami_1 = xf(D.N, { face: set });
  D.origami_2 = xf(D.N, { ky: 0.84, kx: 1.08, face: [...FACE.chooEyes, ['stroke',[[121,125],[135,124]],2.8]] });
  D.origami_3 = shape([[78, 201], [178, 201], [178, 103], [78, 103]], eyes(128, 140), [[[78, 103], [178, 201]]]);
  D.origami_4 = shape([[60, 201], [196, 201], [128, 104]], eyes(128, 160), [[[128, 104], [128, 201]]]);
  D.origami_5 = shape([[128, 201], [172, 146], [128, 78], [84, 146]], eyes(128, 132), [[[128, 78], [128, 201]], [[84, 146], [172, 146]]]);
  D.origami_6 = { ...crane(0, true), fxm: 'done', fx: [128, 44] };
  [[0, 1], [-14, 0], [-20, 1], [-34, 0], [-38, 1], [-50, 0], [-50, 1], [-58, 0]].forEach(([dy, up], i) => { D['origami_f' + i] = crane(dy, up); });
  D.origami_7 = xf(D.N, { dy: -52, k: 1.06, shadowK: 0.5, face: FACE.shock, extra: { fxm: 'alert', fx: [150, 6] } });
  D.origami_8 = xf(D.N, { dy: -22, ky: 1.1, kx: 0.93, shadowK: 0.8, face: FACE.shock });
  const lines = k => creases([[[94, 201 - 16 * k], [168, 201 - 88 * k]], [[100, 201 - 92 * k], [174, 201 - 22 * k]], [[128, 201 - 120 * k], [128, 201 - 6 * k]]]);
  D.origami_9 = xf(D.N, { ky: 0.72, kx: 1.2, face: FACE.spiral, extra: { front: lines(0.72) } });
  D.origami_10 = xf(D.N, { face: FACE.sheep, extra: { front: lines(1) } });
  D.origami_11 = xf(D.N, { face: [['stroke',[[107,110],[117,110]],2.8], ['stroke',[[131,108],[141,108]],2.8], ['stroke',[[118,124],[123,122],[128,124],[133,122]],2.6]], extra: { front: lines(1) } });
  D.origami_12 = xf(D.N, { rot: -0.06, face: FACE.chooEyes, extra: { front: lines(1) } });
  D.origami_13 = xf(D.N, { rot: 0.06, face: FACE.chooEyes });
  const flap = Array.from({ length: 8 }, (_, i) => ['origami_f' + i, 3]);
  CLIPS.origami = { home: 'idle', seq: [...WAKE, ['origami_1', 6], ['origami_2', 3], ['origami_3', 5], ['origami_4', 5], ['origami_5', 5], ['origami_6', 8], ...flap, ['origami_f6', 3], ['origami_f7', 3],
    ['origami_7', 3], ['origami_8', 2], ['origami_9', 3], ['origami_10', 6], ['origami_11', 3], ['origami_10', 5], ['origami_12', 2], ['origami_13', 2], ['origami_12', 2], ['origami_13', 2], ['N', 3], ...DOZE] };
})();
