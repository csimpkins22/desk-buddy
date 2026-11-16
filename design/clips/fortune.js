// Fortune: the tap shakes loose a fortune cookie. He cracks it open, reads the slip, turns it over, and is none the wiser.
// group: tap
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', TAN = '#E0A84E', DARK = '#17161A';
  const keen = [['dot',118,116,3.8], ['dot',140,115,3.8], ['stroke',[[121,126],[128,130],[135,126]],2.8]];
  const pulling = [['stroke',[[108,104],[116,109],[108,114]],3], ['stroke',[[148,102],[140,107],[148,112]],3], ['stroke',[[120,126],[136,125]],2.8]];
  const reading = dx => [['dot',118 + dx,102,3.8], ['dot',142 + dx,100,3.8], ['stroke',[[123,121],[128,123],[133,121]],2.6]];
  const puzzled = [['dot',120,103,3.8], ['dot',144,101,3.8], ['stroke',[[120,124],[125,121],[130,124],[135,121]],2.6], ['stroke',[[108,95],[120,90]],2.4], ['stroke',[[138,93],[150,95]],2.4]];
  const blank = [['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[121,125],[135,124]],2.8], ['stroke',[[108,100],[120,95]],2.4]];
  const all = (...fns) => (c, d, seed) => fns.forEach(f => f(c, d, seed));
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  const WHOLE = [[-22, 3], [-17, -11], [0, -17], [17, -11], [22, 3], [12, 10], [4, 2], [-4, 2], [-12, 10]];
  const HALF = [[-22, 3], [-17, -11], [-3, -17], [-7, -8], [-2, -2], [-6, 4], [-12, 10]];              // the left half; flip -1 for the right
  const cookie = (x, y, tilt = 0, pts = WHOLE, flip = 1) => c => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.scale(1.3 * flip, 1.3); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = TAN; c.strokeStyle = CREAM; c.lineWidth = 2.2; closedPath(c, pts); c.fill(); c.stroke();
    if (pts === WHOLE) { c.strokeStyle = '#6B4A1F'; c.beginPath(); c.moveTo(0, 2); c.lineTo(0, -9); c.stroke(); }
    c.restore();
  };
  const crumbs = c => { c.save(); c.fillStyle = TAN; [[116, 138], [141, 136], [128, 168], [108, 166], [149, 167]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 2.2, 0, Math.PI * 2); c.fill(); }); c.restore(); };
  const halves = (lx, ly, rx, ry, tilt) => all(cookie(lx, ly, -tilt, HALF), cookie(rx, ry, tilt, HALF, -1));
  // the slip: w by h, with its writing on the front only
  const slip = (x, y, w, h, written = true) => c => {
    c.save(); c.fillStyle = CREAM; c.strokeStyle = DARK; c.lineCap = 'round'; c.beginPath(); c.roundRect(x - w / 2, y - h / 2, w, h, 2); c.fill();
    if (written && h > 12) { c.lineWidth = 2.6; c.beginPath(); c.moveTo(x - w / 2 + 8, y - 5); c.lineTo(x + w / 2 - 8, y - 5); c.moveTo(x - w / 2 + 8, y + 5); c.lineTo(x + w / 2 - 26, y + 5); c.stroke(); }
    c.restore();
  };
  const what = (x, y, k) => c => {
    c.save(); c.translate(x, y); c.scale(k, k); c.strokeStyle = c.fillStyle = '#FFD23F'; c.lineWidth = 3.4; c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.arc(0, 0, 9, Math.PI, Math.PI / 2); c.lineTo(0, 16); c.stroke(); c.beginPath(); c.arc(0, 25, 2.4, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const P = 'fortune_', FLOOR = halves(40, 192, 216, 192, 1.2), UP = { arm: [[96, 118], [92, 64]], arm2: [[160, 118], [164, 64]] };
  const HOLD = { arm: [[92, 146], [110, 158]], arm2: [[164, 146], [146, 158]] }, PULL = { arm: [[92, 146], [98, 158]], arm2: [[164, 146], [158, 158]] };
  D[P + 'tap'] = xf(D.N, { face: FACE.lookup, extra: { front: tap(200, 44, 8) } });
  D[P + 'fall1'] = xf(D.N, { face: FACE.lookup, extra: { front: all(tap(200, 44, 16), cookie(200, 54, 0.4)) } });
  D[P + 'fall2'] = xf(D.N, { face: FACE.lookr, extra: { front: cookie(204, 124, 1.6) } });
  D[P + 'fall3'] = xf(D.N, { face: FACE.lookr, extra: { front: cookie(206, 176, 2.9) } });
  D[P + 'there'] = xf(D.N, { face: FACE.lookr, extra: { front: cookie(206, 188, 0) } });
  D[P + 'pick'] = xf(D.N, { face: FACE.lookr, rot: 0.07, extra: { arm2: [[168, 146], [194, 172]], front: cookie(204, 182, -0.2) } });
  D[P + 'hold'] = xf(D.N, { face: keen, extra: { ...HOLD, front: cookie(128, 154) } });
  D[P + 'strain'] = xf(D.N, { face: pulling, kx: 1.03, extra: { ...PULL, front: cookie(128, 154) } });
  D[P + 'crack'] = xf(D.N, { face: FACE.shock, extra: { arm: [[90, 146], [82, 156]], arm2: [[166, 146], [174, 156]], front: all(slip(128, 152, 30, 9), halves(84, 150, 172, 150, 0.5), crumbs) } });
  D[P + 'drop'] = xf(D.N, { face: keen, extra: { ...HOLD, front: all(halves(52, 176, 204, 176, 0.9), slip(128, 154, 40, 12)) } });
  [-4, 3].forEach((dx, i) => { D[P + 'read' + i] = xf(D.N, { face: reading(dx), extra: { ...UP, front: all(FLOOR, slip(128, 46, 84, 28)) } }); });
  D[P + 'hmm'] = xf(D.N, { face: puzzled, rot: -0.04, extra: { ...UP, front: all(FLOOR, slip(124, 46, 84, 28), what(206, 84, 1)) } });
  D[P + 'turn'] = xf(D.N, { face: puzzled, extra: { ...UP, front: all(FLOOR, slip(128, 46, 84, 5)) } });
  D[P + 'back'] = xf(D.N, { face: reading(0), extra: { ...UP, front: all(FLOOR, slip(128, 46, 84, 28, false)) } });
  D[P + 'none'] = xf(D.N, { face: blank, rot: 0.04, extra: { ...UP, front: all(FLOOR, slip(132, 46, 84, 28, false), what(30, 84, 1.3)) } });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.fortune = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['fall1', 2], ['fall2', 2], ['fall3', 2], ['there', 5], ['pick', 3], ['hold', 8], ['strain', 4], ['crack', 4], ['drop', 3],
    ['read0', 6], ['read1', 6], ['read0', 5], ['read1', 5], ['hmm', 10], ['turn', 2], ['back', 6], ['none', 14]), ...DOZE] };
})();
