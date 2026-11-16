// Invisible box: a mime act, palms flat on walls that aren't there. He takes his bow, strolls off, and walks straight into the glass. It's real, all round.
// group: nonsense
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, tint } = window.__lump;
  const CREAM = '#FFF1DC', L = 40, R = 216, TOP = 42;
  const lookl = [['dot',109,110,3.8], ['dot',133,108,3.8], ['stroke',[[119,124],[124,126],[129,124]],2.6]];
  const smug = [...FACE.aahEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const ouch = [...FACE.chooEyes, ['stroke',[[120,126],[124,123],[128,126],[132,123],[136,126]],2.8]];
  const worry = [['dot',116,109,4.4], ['dot',140,107,4.4], ['stroke',[[106,98],[119,94]],2.4], ['stroke',[[137,92],[150,95]],2.4], ['mouth',[[122,121],[134,120],[135,128],[128,131],[121,128]]]];
  // palms: [x, y, flat against a wall (0) or the ceiling (1)]. glass: how clearly the box shows. hit: where he has just struck it
  const scene = ({ palms = [], glass = 0, hit, knock }) => c => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (glass) {
      c.strokeStyle = CREAM; c.globalAlpha = glass; c.lineWidth = 2.4;
      c.setLineDash([10, 9]); c.beginPath(); c.moveTo(L - 3, 203); c.lineTo(L - 3, TOP - 3); c.lineTo(R + 3, TOP - 3); c.lineTo(R + 3, 203); c.stroke();
      c.setLineDash([]); c.beginPath(); c.moveTo(50, 74); c.lineTo(68, 54); c.moveTo(50, 90); c.lineTo(78, 58); c.moveTo(190, 190); c.lineTo(208, 170); c.stroke();
      c.globalAlpha = 1;
    }
    c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 3;
    palms.forEach(([x, y, up]) => { c.beginPath(); c.ellipse(x, y, up ? 11 : 4.5, up ? 4.5 : 11, 0, 0, Math.PI * 2); c.fill(); c.stroke(); });
    if (hit) { c.beginPath(); [-1.1, -0.4, 0.4, 1.1].forEach(a => { c.moveTo(hit[0] - hit[2] * Math.cos(a) * 10, hit[1] + Math.sin(a) * 12); c.lineTo(hit[0] - hit[2] * Math.cos(a) * 24, hit[1] + Math.sin(a) * 28); }); c.stroke(); }
    if (knock) { c.lineWidth = 2.4; c.beginPath(); c.arc(R + 2, 128, 10, -0.9, 0.9); c.stroke(); c.beginPath(); c.arc(R + 2, 128, 18, -0.7, 0.7); c.stroke(); }
    c.restore();
  };
  const pose = (o, face, s = {}, arms = {}) => xf(D.N, { ...o, face, extra: { ...arms, front: scene(s), ...o.extra } });
  const left = y => [{ palms: [[L + 4, y]] }, { arm: [[90, 142], [L + 10, y + 2]] }];
  const right = y => [{ palms: [[R - 4, y]] }, { arm2: [[166, 142], [R - 10, y + 2]] }];
  const both = g => [{ palms: [[L + 4, 136], [R - 4, 134]], glass: g }, { arm: [[90, 142], [L + 10, 138]], arm2: [[166, 142], [R - 10, 136]] }];
  const roof = g => [{ palms: [[88, TOP + 5, 1], [168, TOP + 5, 1]], glass: g }, { arm: [[98, 112], [88, TOP + 12]], arm2: [[158, 112], [168, TOP + 12]] }];
  D.invisible_box_1 = pose({}, lookl, ...left(112));
  D.invisible_box_2 = pose({}, lookl, ...left(152));
  D.invisible_box_3 = pose({}, FACE.lookr, ...right(110));
  D.invisible_box_4 = pose({}, FACE.lookr, ...right(150));
  D.invisible_box_5 = pose({}, FACE.lookup, ...roof(0));
  D.invisible_box_6 = pose({ extra: { fxm: 'done', fx: [128, 50] } }, FACE.happy, {}, { arm: [[90, 140], [62, 152]], arm2: [[166, 140], [194, 152]] });
  D.invisible_box_7 = pose({ dx: 14, rot: 0.05 }, smug);
  D.invisible_box_8 = pose({ dx: 33, kx: 0.88, ky: 1.04 }, ouch, { glass: 0.7, hit: [R, 118, 1] });
  D.invisible_box_9 = pose({ dx: 6, rot: -0.09 }, FACE.spiral, { glass: 0.3 });
  D.invisible_box_10 = pose({}, FACE.lookr, { glass: 0.2 });
  D.invisible_box_11 = pose({}, FACE.lookr, { glass: 0.2 }, { arm2: [[166, 140], [196, 134]] });
  D.invisible_box_12 = pose({}, worry, { glass: 0.5, knock: true }, { arm2: [[166, 140], [R - 8, 128]] });
  D.invisible_box_13 = pose({ dx: -33, kx: 0.88, ky: 1.04 }, ouch, { glass: 0.7, hit: [L, 118, -1] });
  D.invisible_box_14 = pose({}, worry, ...both(0.6));
  D.invisible_box_15 = pose({}, worry, ...roof(0.6));
  D.invisible_box_16 = pose({}, FACE.grump, { glass: 0.6 });
  D.invisible_box_17 = pose({ ky: 0.94, kx: 1.03 }, FACE.sheep, { glass: 0.35 });
  CLIPS.invisible_box = { home: 'idle', seq: [...WAKE, ['invisible_box_1', 5], ['invisible_box_2', 5], ['invisible_box_3', 5], ['invisible_box_4', 5], ['invisible_box_5', 7], ['invisible_box_6', 9],
    ['invisible_box_7', 3], ['invisible_box_8', 4], ['invisible_box_9', 5], ['invisible_box_10', 5], ['invisible_box_11', 3], ['invisible_box_12', 3], ['invisible_box_11', 3], ['invisible_box_12', 3],
    ['invisible_box_13', 4], ['invisible_box_14', 3], ['invisible_box_15', 3], ['invisible_box_14', 3], ['invisible_box_15', 3], ['invisible_box_16', 9], ['invisible_box_17', 4], ...DOZE] };
})();
