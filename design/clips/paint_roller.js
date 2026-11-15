// Paint roller: he rolls a blue stripe across his belly, likes it, and rolls a second one straight over his eyes.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', SHOULDER = [166, 142], HELD = [204, 96, Math.PI / 2];
  const smile = ['stroke',[[120,125],[128,129],[136,125]],2.8], flat = ['stroke',[[122,127],[134,126]],2.8];
  const plain = [['dot',116,110,3.6], ['dot',140,108,3.6], smile];
  // belly, brow: how far across (x) each stripe has got. at: the roller [x, y, angle of its handle]. eyes: drawn over the paint
  const scene = ({ belly, brow, at, eyes }) => (c, d, seed) => {
    const outline = () => closedPath(c, boil(d.body, seed, 2.2));
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (belly || brow) {
      c.save(); outline(); c.clip(); c.fillStyle = BLUE;
      if (belly) c.fillRect(60, 150, belly - 60, 28);
      if (brow) c.fillRect(60, 94, brow - 60, 26);
      c.restore();
      c.strokeStyle = CREAM; outline(); inkStroke(c, 4);
    }
    c.fillStyle = c.strokeStyle = '#0B0E14'; c.lineWidth = 3;
    if (eyes === 'open') { c.beginPath(); c.arc(116, 109, 4.2, 0, Math.PI * 2); c.arc(140, 107, 4.2, 0, Math.PI * 2); c.fill(); }
    if (eyes === 'blink') { c.beginPath(); c.moveTo(110, 109); c.lineTo(122, 109); c.moveTo(134, 107); c.lineTo(146, 107); c.stroke(); }
    const [x, y, a] = at, hx = x + Math.cos(a) * 34, hy = y + Math.sin(a) * 34, len = Math.hypot(hx - SHOULDER[0], hy - SHOULDER[1]);
    c.save(); c.translate(...SHOULDER); c.rotate(Math.atan2(hy - SHOULDER[1], hx - SHOULDER[0]));          // his arm, over the paint
    closedPath(c, boil([[0, -7], [len * 0.5, -7], [len, -6], [len + 6, 0], [len, 6], [len * 0.5, 7], [0, 7]], seed + 99, 0.8));
    c.fillStyle = tint(); c.fill(); c.strokeStyle = CREAM; inkStroke(c, 3); c.restore();
    c.translate(x, y); c.rotate(a);
    c.beginPath(); c.moveTo(7, 0); c.lineTo(37, 0); c.strokeStyle = CREAM; c.lineWidth = 8; c.stroke(); c.strokeStyle = '#6B4A1F'; c.lineWidth = 4.5; c.stroke();
    c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.roundRect(-7, -18, 14, 36, 6); c.fill(); c.stroke();
    c.restore();
  };
  const draw = (name, face, s, o = {}) => { D['paint_roller_' + name] = xf(D.N, { face, ...o, extra: { front: scene(s), ...o.extra } }); return 'paint_roller_' + name; };
  const seq = [[draw('hold', FACE.happy, { at: HELD }), 8]];
  [86, 112, 138, 164, 192].forEach((x, i) => seq.push([draw('belly' + i, plain, { belly: i && x, at: [x, 164, 0] }), i ? 2 : 4]));
  seq.push([draw('proud', FACE.happy, { belly: 240, at: HELD }, { ky: 1.02, extra: { fxm: 'done', fx: [128, 52] } }), 10]);
  [94, 120, 148, 180].forEach((x, i) => seq.push([draw('brow' + i, plain, { belly: 240, brow: i && x, at: [x, 107, 0] }), i ? 2 : 4]));
  seq.push([draw('blind', [flat], { belly: 240, brow: 240, at: HELD }), 7], [draw('open', [smile], { belly: 240, brow: 240, at: HELD, eyes: 'open' }), 6],
    [draw('blink', [smile], { belly: 240, brow: 240, at: HELD, eyes: 'blink' }), 2], ['paint_roller_open', 9]);
  CLIPS.paint_roller = { home: 'idle', seq: [...WAKE, ...seq, ...DOZE] };
})();
