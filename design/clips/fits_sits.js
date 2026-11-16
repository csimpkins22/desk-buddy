// Fits, sits: a cardboard box far too small for him slides in. He weighs it up, hops on, and squeezes down until he bulges over every side, entirely content.
// group: memes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, inkStroke, tint } = window.__lump;
  const CREAM = '#FFF1DC', KRAFT = '#C89B5A', SIDE = '#9C7438', INSIDE = '#5A3D18', FLAP = '#DDB67A', TAPE = '#F0DFB8', MARK = '#6B4A1F', FLOOR = '#2B3440', TAU = Math.PI * 2;
  const BX = 168, RIM = 159, P = 'fits_sits_';
  const atBox = [['dot',125,113,3.8], ['dot',149,111,3.8], ['stroke',[[127,126],[132,127],[137,126]],2.6]];
  const hmm = [['dot',125,113,3.8], ['dot',149,111,3.8], ['stroke',[[116,102],[128,100]],2.4], ['stroke',[[142,94],[154,97]],2.4], ['stroke',[[127,127],[137,125]],2.6]];
  const decided = [['dot',125,112,3.8], ['dot',149,110,3.8], ['stroke',[[115,100],[129,104]],2.6], ['stroke',[[141,102],[155,98]],2.6], ['stroke',[[125,124],[132,128],[140,123]],2.8]];
  const down = [['dot',117,115,3.8], ['dot',141,113,3.8], ['stroke',[[113,103],[123,102]],2.4], ['stroke',[[135,100],[145,101]],2.4], ['stroke',[[123,128],[133,127]],2.6]];
  const effort = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const content = [...FACE.aahEyes, ['stroke',[[119,121],[128,127],[137,121]],2.8], ['blush',101,122,8,4.5], ['blush',155,120,8,4.5]];
  const mix = (a, b, t) => a.map((p, i) => [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t]);
  const poly = (c, pts, colour) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fillStyle = colour; c.fill(); c.stroke(); };
  // each flap as it stands open, and as his bulk splays it (the front one just hangs)
  const FLAPS = { back: [[[-29,-49],[49,-49],[53,-71],[-25,-71]], [[-29,-49],[49,-49],[60,-59],[-18,-59]]], left: [[[-39,-42],[-29,-49],[-36,-67],[-46,-60]], [[-39,-42],[-29,-49],[-66,-24],[-72,-16]]],
    right: [[[39,-42],[49,-49],[62,-65],[52,-58]], [[39,-42],[49,-49],[70,-21],[63,-13]]], front: [[[-39,-42],[39,-42],[43,-27],[-43,-27]]] };
  // the box, stood on the floor at x: the far half (inside, back and side flaps) or the near half (walls and front flap).
  // open: how far its flaps are splayed. bow: how far its front has bellied out. split: how far its corners have torn. jog: its flaps flung to one side.
  const box = (c, { x = BX, tilt = 0, open = 0, bow = 0, split = 0, jog = 0 }, seed, near) => {
    const flap = (name, k) => poly(c, boil(mix(FLAPS[name][0], FLAPS[name][1] || FLAPS[name][0], open).map(([px, py], i) => i > 1 ? [px + jog, py - Math.abs(jog) * 0.3] : [px, py]), seed + k, 1.2), FLAP);
    if (!near) { c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(x + 8, 203, 52, 5, 0, 0, TAU); c.fill(); }
    c.save(); c.translate(x, 201); c.rotate(tilt); c.strokeStyle = CREAM; c.lineWidth = 2.6;
    if (!near) { poly(c, [[-39, -42], [39, -42], [49, -49], [-29, -49]], INSIDE); flap('back', 1); flap('left', 2); flap('right', 3); c.restore(); return; }
    poly(c, boil([[39, 0], [49, -7], [49, -49], [39, -42]], seed + 4, 1), SIDE);
    c.beginPath(); c.moveTo(-39, -42); c.lineTo(39, -42); c.quadraticCurveTo(39 + bow * 10, -20, 39, 0); c.lineTo(-39, 0); c.quadraticCurveTo(-39 - bow * 10, -20, -39, -42); c.closePath(); c.fillStyle = KRAFT; c.fill(); c.stroke();
    c.fillStyle = TAPE; c.fillRect(-5, -41, 10, 27);
    c.strokeStyle = MARK; c.lineWidth = 2; c.beginPath(); [-29, -19].forEach(ax => { c.moveTo(ax, -6); c.lineTo(ax, -19); c.moveTo(ax - 4, -15); c.lineTo(ax, -19.5); c.lineTo(ax + 4, -15); }); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.2;
    if (split) [-1, 1].forEach(side => {                                    // a tear down each front corner
      poly(c, [[side * 42, -43], [side * 29, -43], [side * (39 + bow * 4), -42 + 33 * split]], INSIDE);
      c.beginPath(); c.moveTo(side * 33, -42 + 33 * split); c.lineTo(side * 27, -38 + 35 * split); c.moveTo(side * 46, -40 + 30 * split); c.lineTo(side * 52, -37 + 33 * split); c.stroke();
    });
    c.lineWidth = 2.6; flap('front', 5);
    c.restore();
  };
  const query = (c, x, y) => {
    c.strokeStyle = c.fillStyle = CREAM; c.lineWidth = 3.4; c.beginPath(); c.arc(x, y, 6.5, Math.PI, Math.PI * 0.35); c.quadraticCurveTo(x, y + 8, x, y + 13); c.stroke();
    c.beginPath(); c.arc(x, y + 20, 2.4, 0, TAU); c.fill();
  };
  // behind him: the floor, his shadow on it and the far half of the box. floor: how solid the floor is.
  const set = ({ floor = 1, ...crate }) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.globalAlpha = floor; c.fillStyle = FLOOR; c.fillRect(0, 201, 240, 39);
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = floor * 0.4; c.beginPath(); c.moveTo(0, 201); c.lineTo(240, 201); c.stroke(); c.globalAlpha = 1;
    if (d.shadow[1]) { c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, d.shadow[1], 6, 0, 0, TAU); c.fill(); }
    if (crate.x !== null) box(c, crate, seed);
    c.restore();
  };
  // in front of him: the near half of the box. mark: where a "?" hangs. belly: how far he sags over its front, and to which side. pop: its corners have just given.
  const fore = ({ mark, belly, pop, ...crate }) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (crate.x !== null) box(c, crate, seed, true);
    if (belly) {
      const [sag, lean] = belly, roll = y => { c.beginPath(); c.moveTo(BX - 27 + lean, y); c.bezierCurveTo(BX - 22 + lean, RIM + sag * 1.35, BX + 24 + lean, RIM + sag * 1.35, BX + 29 + lean, y); };
      roll(RIM - 8); c.fillStyle = tint(); c.fill(); roll(RIM - 2); c.strokeStyle = CREAM; inkStroke(c, 4);
      c.strokeStyle = '#0B0E14'; c.lineWidth = 2.4; c.beginPath();              // and the creases where he folds over its sides
      [-1, 1].forEach(side => { c.moveTo(BX + side * 56 + 2, 150); c.quadraticCurveTo(BX + side * 51 + 2, 157, BX + side * 44 + 2, 156); }); c.stroke();
    }
    if (pop) { c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); [-1, 1].forEach(side => [[50, -24, 60, -30], [53, -14, 65, -14], [50, -4, 60, 2]].forEach(([x0, y0, x1, y1]) => { c.moveTo(BX + side * x0 + 4, 201 + y0); c.lineTo(BX + side * x1 + 4, 201 + y1); })); c.stroke(); }
    if (mark) query(c, ...mark);
    c.restore();
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); }, show = (name, ticks) => seq.push([P + name, ticks]);
  const stood = (o, scene) => xf(D.N, { ...o, extra: { back: set(scene), front: fore(scene) } }), SIDE_ON = { dx: -63 };
  // his outline stood on the rim, and the same points once he is squeezed in
  const TOP = xf(D.N, { dx: BX - 128, dy: RIM - 201 }).body;
  const IN = [[-54,182],[-23,166],[18,167],[55,182],[67,167],[66,147],[58,124],[46,101],[26,85],[2,78],[-22,80],[-39,92],[-46,108],[-49,128],[-59,146],[-66,168]].map(([x, y]) => [BX + x, y]);
  // sat on the box, s of the way squeezed down into it. sway: his wriggle from side to side
  const sat = (s, face, sway = 0, scene = {}) => {
    const d = xf(D.N, { dx: BX - 128 + sway * 0.6, dy: (RIM - 201) * (1 - s), ky: 1 - 0.06 * s, kx: 1 + 0.06 * s, face, shadowK: 0 });
    d.body = mix(TOP, IN, s).map(([x, y]) => [x + sway * (RIM + 12 - y) / 90, y]);
    const crate = { open: 0.5 + s * 0.5, bow: Math.min(1, s), split: Math.max(0, Math.min(1, (s - 0.55) / 0.4)), belly: s > 0.5 && [Math.min(12, (s - 0.5) * 24), sway * 0.3], ...scene };
    d.back = set(crate); d.front = fore(crate);
    return d;
  };

  add('in0', 3, stood({ dx: -14, rot: -0.04, face: FACE.lookr }, { floor: 0.4, x: 300, tilt: -0.1 }));
  add('in1', 2, stood({ dx: -36, rot: -0.05, face: FACE.lookr }, { floor: 0.8, x: 244, tilt: -0.1, jog: 3 }));
  add('in2', 2, stood({ dx: -54, rot: -0.03, face: FACE.lookr }, { x: 198, tilt: -0.07, jog: 3 }));
  add('in3', 2, stood({ ...SIDE_ON, face: atBox }, { x: 172, tilt: 0.06, jog: -4 }));
  add('in4', 2, stood({ ...SIDE_ON, face: atBox }, { jog: 2 }));
  add('look', 4, stood({ ...SIDE_ON, face: atBox }, {}));
  add('hmm', 8, stood({ ...SIDE_ON, rot: -0.07, face: hmm }, { mark: [112, 44] }));
  add('yes', 4, stood({ ...SIDE_ON, rot: 0.05, face: decided }, {}));
  add('crouch', 4, stood({ ...SIDE_ON, ky: 0.8, kx: 1.12, face: decided }, {}));
  add('hop0', 2, stood({ dx: -40, dy: -34, rot: 0.22, ky: 1.08, kx: 0.94, shadowK: 0.7, face: decided }, {}));
  add('hop1', 2, stood({ dx: 0, dy: -50, rot: 0.1, shadowK: 0.45, face: down }, {}));
  add('hop2', 2, stood({ dx: 32, dy: -50, rot: -0.04, ky: 1.03, kx: 0.98, shadowK: 0, face: down }, {}));
  add('land', 2, stood({ dx: BX - 128, dy: RIM - 201, ky: 0.82, kx: 1.12, shadowK: 0, face: down }, { open: 0.5, bow: 0.3, jog: 0 }));
  add('on', 4, sat(0, down));
  [[0.24, 5], [0.46, -5], [0.66, 5], [0.84, -4]].forEach(([s, sway], i) => add('push' + i, i % 2 ? 2 : 4, sat(s, effort, sway)));
  add('over', 2, sat(1.07, effort, 0, { pop: true }));
  D[P + 'fits0'] = sat(1, content);
  D[P + 'fits1'] = sat(0.96, content);
  show('fits0', 8); show('fits1', 6); show('fits0', 6);
  const LEFT = { open: 0.8, bow: 0.35, split: 1 };
  add('up', 2, sat(0.3, FACE.happy, 0, LEFT));
  add('off0', 2, stood({ dx: 24, dy: -50, rot: -0.12, ky: 1.03, kx: 0.98, shadowK: 0.5, face: FACE.happy }, { ...LEFT, jog: -3 }));
  add('off1', 2, stood({ dx: 6, dy: -30, rot: -0.06, ky: 1.05, shadowK: 0.8, face: FACE.happy }, { ...LEFT, x: BX + 40, tilt: 0.1, jog: -4 }));
  add('off2', 2, stood({ ky: 0.86, kx: 1.09, face: FACE.happy }, { ...LEFT, floor: 0.7, x: BX + 104, tilt: 0.1, jog: -4 }));
  add('off3', 2, stood({ face: FACE.happy }, { floor: 0.3, x: null }));
  CLIPS.fits_sits = { home: 'idle', seq: [...seq, ...DOZE] };
})();
