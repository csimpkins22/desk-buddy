// Wire drop: a hatch opens, a wire clips on and lowers him flat over a floor of light beams. A sweat drop falls from his brow; he catches it just in time.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', STEEL = '#9FB0C4', RED = '#FF5A4D', WEB = '#3F4855', YELLOW = '#FFD23F', BLUE = '#5AB8FF', TAU = Math.PI * 2;
  const PULLEY = [128, 6], RING = [80, 134], KX = 0.62, KY = 1.1;
  // t: 0 standing, 1 stretched out flat with his head to the right
  const pose = t => ({ ox: 128, oy: 136, rot: t * Math.PI / 2, kx: 1 - (1 - KX) * t, ky: 1 + (KY - 1) * t });
  // where a point of D.N ends up after xf(D.N, o)
  const at = (o, [x, y]) => {
    const u = (x - o.ox) * o.kx, v = (y - o.oy) * o.ky, cs = Math.cos(o.rot), sn = Math.sin(o.rot);
    return [o.ox + u * cs - v * sn + (o.dx || 0), o.oy + u * sn + v * cs + (o.dy || 0)];
  };
  // a face for the flat pose, given as offsets from his middle: along him towards his head, then down
  const flat = ([x, y]) => [128 + y / KX, 136 - x / KY];
  const eyes = (dx = 0, dy = 0, r = 3.8) => [['dot', ...flat([23 + dx, 9 + dy]), r], ['dot', ...flat([45 + dx, 8 + dy]), r]];
  const brows = lift => [['stroke', [flat([15, 2 - lift]), flat([27, -1 - lift])], 2.6], ['stroke', [flat([40, -2 - lift]), flat([52, 0 - lift])], 2.6]];
  const steady = [...eyes(0, 2), ['stroke', [[17, 0], [29, 2]].map(flat), 2.6], ['stroke', [[39, 1], [51, -1]].map(flat), 2.6], ['stroke', [[29, 20], [34, 21], [39, 20]].map(flat), 2.6]];
  const uneasy = [...eyes(0, 2), ...brows(1), ['stroke', [[26, 20], [30, 18], [34, 21], [38, 18], [42, 20]].map(flat), 2.4]];
  const gasp = [...eyes(4, 3, 4.6), ...brows(4), ['mouth', [[29, 17], [39, 16], [41, 24], [35, 28], [28, 24]].map(flat)]];
  const held = [...eyes(5, 4, 4.4), ...brows(4), ['stroke', [[30, 21], [35, 19], [40, 21]].map(flat), 2.6]];
  const phew = [['stroke', [[17, 11], [23, 6], [29, 11]].map(flat), 3], ['stroke', [[39, 10], [45, 5], [51, 10]].map(flat), 3], ['mouth', [[31, 18], [38, 18], [39, 23], [35, 25], [30, 23]].map(flat)]];
  const lookLeft = [['dot',110,108,3.8], ['dot',134,106,3.8], ['stroke',[[117,122],[122,124],[127,122]],2.6]];
  const squeezed = [...FACE.chooEyes, ['stroke',[[121,125],[128,123],[135,125]],2.8]];
  const bead = (c, x, y, s) => {
    c.fillStyle = BLUE; c.strokeStyle = CREAM; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(x, y - s * 1.7); c.bezierCurveTo(x + s * 1.3, y - s * 0.2, x + s, y + s, x, y + s); c.bezierCurveTo(x - s, y + s, x - s * 1.3, y - s * 0.2, x, y - s * 1.7); c.fill(); c.stroke();
  };
  const band = (c, pts, seed) => {
    openPath(c, boil(pts, seed, 1.2)); c.strokeStyle = CREAM; c.lineWidth = 9; c.stroke(); c.strokeStyle = WEB; c.lineWidth = 6; c.stroke();
    c.strokeStyle = CREAM; c.globalAlpha = 0.55; c.lineWidth = 1.2; c.setLineDash([3, 4]); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
  };
  // a karabiner hanging from (x, y) on the wire, which runs up to the pulley; slack bows the wire
  const wire = (c, x, y, slack = 0) => {
    const a = Math.atan2(PULLEY[1] - y, PULLEY[0] - x), tx = x + Math.cos(a) * 15, ty = y + Math.sin(a) * 15;
    c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.moveTo(...PULLEY); c.quadraticCurveTo((PULLEY[0] + tx) / 2 + slack, (PULLEY[1] + ty) / 2, tx, ty); c.stroke();
    c.save(); c.translate(x, y); c.rotate(a + Math.PI / 2);
    c.beginPath(); c.roundRect(-4.5, -17, 9, 19, 4.5); c.strokeStyle = CREAM; c.lineWidth = 5.5; c.stroke(); c.strokeStyle = YELLOW; c.lineWidth = 2.8; c.stroke();
    c.restore();
  };
  // ceil: how solid the ceiling is. open: how far its hatch has slid. beams: how bright. posts: how far the emitters have slid in.
  const room = ({ ceil = 1, open = 1, beams = 0, posts = 0 }) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.globalAlpha = ceil;
    c.fillStyle = '#2B3440'; c.fillRect(0, 0, 104, 11); c.fillRect(152, 0, 88, 11);
    c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 11); c.lineTo(104, 11); c.lineTo(104, 0); c.moveTo(152, 0); c.lineTo(152, 11); c.lineTo(240, 11); c.stroke();
    c.fillStyle = STEEL; c.lineWidth = 2; c.beginPath(); c.arc(...PULLEY, 4.5, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.roundRect(103 + open * 50, 10, 50, 6, 2); c.fill(); c.stroke();
    c.globalAlpha = ceil * 0.3; c.beginPath(); c.moveTo(0, 203); c.lineTo(240, 203); c.stroke();
    if (posts) [-1, 1].forEach(side => {
      const x = 120 + side * (114 + (1 - posts) * 16);
      c.globalAlpha = 1; c.fillStyle = STEEL; c.lineWidth = 2.4; c.beginPath(); c.roundRect(x - 6, 166, 12, 38, 4); c.fill(); c.stroke();
      c.fillStyle = beams ? RED : DARK; [176, 186, 196].forEach(y => { c.beginPath(); c.arc(x - side * 2, y, 2.6, 0, TAU); c.fill(); });
    });
    if (beams) {
      const k = beams * [1, 0.8, 0.9][seed % 3];
      c.strokeStyle = RED; c.beginPath(); [[176, 194], [196, 186], [186, 200]].forEach(([y0, y1]) => { c.moveTo(10, y0); c.lineTo(230, y1); });
      c.globalAlpha = k * 0.28; c.lineWidth = 6; c.stroke(); c.globalAlpha = k; c.lineWidth = 1.8; c.stroke();
    }
    c.restore();
  };
  // wrap: how far the straps have gone round him, 0 to 1. hook: where the karabiner is while it isn't on him yet. palm: little lines round the catch, or the splash.
  const rig = (o, { wrap = 1, hook, slack = 0, drop, palm } = {}) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    if (wrap) {
      const cut = pts => pts.slice(0, Math.max(2, Math.round(wrap * pts.length))).map(p => at(o, p));
      c.save(); closedPath(c, d.body); c.clip();
      band(c, [[90, 118], [80, 140], [70, 164], [66, 192]].map(p => at(o, p)), seed + 9);
      band(c, cut([[76, 122], [102, 140], [128, 158], [156, 174], [192, 194]]), seed + 7);
      band(c, cut([[62, 194], [98, 176], [128, 158], [158, 142], [192, 124]]), seed + 8);
      c.restore();
      if (wrap === 1) { c.fillStyle = STEEL; c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.arc(...at(o, [128, 158]), 6.5, 0, TAU); c.fill(); c.stroke(); c.fillStyle = YELLOW; c.beginPath(); c.arc(...at(o, [128, 158]), 2.4, 0, TAU); c.fill(); }
      const [rx, ry] = at(o, RING);
      c.strokeStyle = CREAM; c.lineWidth = 6; c.beginPath(); c.arc(rx, ry, 5, 0, TAU); c.stroke(); c.strokeStyle = STEEL; c.lineWidth = 3; c.stroke();
    }
    const [hx, hy] = hook || at(o, RING);
    wire(c, hx, hy, slack);
    if (drop) bead(c, ...drop);
    if (palm) { c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); [[-12, -9, -17, -14], [0, -15, 0, -22], [12, -9, 17, -14]].forEach(([x0, y0, x1, y1]) => { c.moveTo(palm[0] + x0, palm[1] + y0); c.lineTo(palm[0] + x1, palm[1] + y1); }); c.stroke(); }
    c.restore();
  };
  // t: how far tipped over. ring: where the wire holds him (omit: standing on the floor). swing: hanging off true, in radians.
  const hung = (t, ring, face, scene, gear = {}, more = {}) => {
    const o = pose(t); o.rot += more.swing || 0;
    if (ring) { const r = at(o, RING); o.dx = ring[0] - r[0]; o.dy = ring[1] - r[1]; }
    const [cx, cy] = at(o, [128, 136]), arms = more.arms ? more.arms(cx, cy) : {};
    return xf(D.N, { ...o, ...more.xf, face, extra: { shadow: [cx, ring ? 44 : 60], back: room(scene), front: rig(o, gear), ...arms } });
  };
  const spread = (cx, cy) => ({ arm: [[cx - 36, cy + 28], [cx - 56, cy + 44]], arm2: [[cx + 4, cy + 32], [cx + 20, cy + 50]] });
  const P = 'wire_drop_', LIT = { beams: 1, posts: 1 }, LOW = 80;
  D[P + 'a1'] = hung(0, null, FACE.lookup, { ceil: 0.5, open: 0.3 }, { wrap: 0, hook: [128, 4] });
  D[P + 'a2'] = hung(0, null, FACE.lookup, { open: 1 }, { wrap: 0, hook: [126, 40], slack: 4 });
  D[P + 'a3'] = hung(0, null, FACE.lookup, {}, { wrap: 0, hook: [104, 92], slack: -5 });
  D[P + 'a4'] = hung(0, null, lookLeft, {}, { wrap: 0, hook: [80, 134], slack: 5 });
  D[P + 'a5'] = hung(0, null, FACE.shock, {}, { wrap: 0.5, slack: 5 }, { xf: { ky: 0.95, kx: 1.03 } });
  D[P + 'a6'] = hung(0, null, squeezed, {}, { slack: 3 }, { xf: { ky: 1.04, kx: 0.94 } });
  D[P + 'a7'] = hung(0, null, FACE.puff, {}, {}, { xf: { ky: 0.9, kx: 1.07 } });
  D[P + 'b1'] = hung(0.35, [102, 108], FACE.shock, { posts: 0.4 });
  D[P + 'b2'] = hung(0.75, [122, 70], uneasy, { posts: 0.8 }, {}, { arms: spread });
  D[P + 'b3'] = hung(1, [129, 46], uneasy, { posts: 1, beams: 0.4 }, {}, { arms: spread, swing: -0.07 });
  D[P + 'b4'] = hung(1, [128, 50], steady, LIT, {}, { arms: spread, swing: 0.04 });
  [[60, 0], [72, -0.02], [84, 0], [93, 0]].forEach(([y, swing], i) => { D[P + 'c' + i] = hung(1, [128, y], i === 3 ? uneasy : steady, LIT, {}, { arms: spread, swing, xf: i === 3 ? { kx: KX * 0.93 } : {} }); });
  // hanging there, swaying; then the drop: on his brow, at his chin, falling
  const hang = (name, s, face, gear, arms = spread) => { D[P + name] = hung(1, [128 - s * 60, LOW], face, LIT, gear, { arms, swing: s }); };
  hang('d1', 0.045, steady); hang('d2', -0.045, steady);
  hang('e1', 0.045, uneasy, { drop: [181, 102, 4] }); hang('e2', -0.045, uneasy, { drop: [185, 116, 5] });
  hang('e3', 0, uneasy, { drop: [186, 137, 6] });
  hang('f1', 0, gasp, { drop: [186, 146, 6] });
  hang('f2', 0, gasp, { drop: [186, 155, 6] }, (cx, cy) => ({ arm: [[cx - 36, cy + 26], [cx - 62, cy + 34]], arm2: [[cx + 6, cy + 32], [cx + 32, cy + 50]] }));
  const caught = (cx, cy) => ({ arm: [[cx - 36, cy + 28], [cx - 66, cy + 48]], arm2: [[cx + 8, cy + 32], [cx + 58, cy + 62]] });
  hang('g1', 0, gasp, { drop: [184, 161, 6], palm: [184, 161] }, caught);
  hang('g2', 0, held, { drop: [184, 161, 6] }, caught);
  hang('g3', 0, phew, { drop: [184, 161, 6] }, caught);
  // back up, the beams go out, he lets the drop go, and down onto his feet
  D[P + 'h1'] = hung(1, [128, 62], phew, { posts: 1, beams: 0.5 }, { drop: [182, 143, 6] }, { arms: caught });
  D[P + 'h2'] = hung(0.7, [124, 72], FACE.happy, { posts: 0.6 }, { drop: [196, 158, 6] });
  D[P + 'h3'] = hung(0.3, [104, 110], FACE.happy, { posts: 0.2 }, { drop: [198, 188, 6] });
  D[P + 'h4'] = hung(0, null, FACE.happy, {}, { slack: 4, palm: [198, 208] }, { xf: { ky: 0.9, kx: 1.07 } });
  D[P + 'h5'] = hung(0, null, FACE.happy, {}, { wrap: 0.5, slack: 5 });
  D[P + 'h6'] = hung(0, null, FACE.lookup, { open: 0.7 }, { wrap: 0, hook: [118, 60], slack: -4 });
  D[P + 'h7'] = hung(0, null, FACE.lookup, { ceil: 0.5, open: 0.2 }, { wrap: 0, hook: [128, 4] });
  const s = (id, n) => [P + id, n], sway = n => Array.from({ length: n }, (_, i) => s(i % 2 ? 'd2' : 'd1', 4));
  CLIPS.wire_drop = { home: 'idle', seq: [...WAKE, s('a1', 3), s('a2', 3), s('a3', 3), s('a4', 4), s('a5', 2), s('a6', 4), s('a7', 3), s('b1', 2), s('b2', 2), s('b3', 3), s('b4', 5),
    s('c0', 2), s('c1', 2), s('c2', 2), s('c3', 3), ...sway(3), s('e1', 4), s('e2', 4), s('e3', 3), s('f1', 2), s('f2', 2), s('g1', 3), s('g2', 8), s('g3', 12),
    s('h1', 3), s('h2', 2), s('h3', 2), s('h4', 3), s('h5', 2), s('h6', 2), s('h7', 2), ...DOZE] };
})();
