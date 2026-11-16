// Crane pose: a post lifts him up into the sunset. He raises his arms wide, wobbles, goes perfectly still, and one drifting leaf tips him off onto his head.
// group: movies
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', WOOD = '#8A5A2B', BARK = '#6B4A1F', TAU = Math.PI * 2, PX = 88, TOP = 44, HZ = 178, P = 'crane_pose_';
  const down = [['dot',114,116,4], ['dot',138,114,4], ['mouth',[[122,125],[130,124],[131,131],[126,134],[121,131]]]];
  const set = [['stroke',[[108,100],[121,103]],2.6], ['stroke',[[135,101],[148,98]],2.6], ['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[122,125],[134,124]],2.8]];
  const worried = [['dot',116,108,4.2], ['dot',140,106,4.2], ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const serene = [['stroke',[[110,108],[116,112],[122,108]],3], ['stroke',[[134,106],[140,110],[146,106]],3], ['stroke',[[123,123],[128,125],[133,123]],2.6]];
  const peek = [serene[0], ['dot',144,107,4], ['stroke',[[124,124],[133,123]],2.6]];
  const uhoh = [['dot',122,107,4.6], ['dot',146,105,4.6], ['mouth',[[127,120],[136,119],[137,127],[132,130],[126,127]]]];
  const deadpan = [['stroke',[[109,106],[123,106]],2.6], ['dot',116,110,3], ['stroke',[[133,104],[147,104]],2.6], ['dot',140,108,3], ['stroke',[[122,125],[134,125]],2.6]];
  // behind him. glow: how far the sunset has faded in, sink: how far the sun has set, rise: how much of the post is out of the ground
  const scene = (glow, sink, rise) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (glow) {
      c.save(); c.beginPath(); c.rect(0, 0, 240, HZ); c.clip();
      c.globalAlpha = glow * 0.3; c.fillStyle = '#FF5A4D'; c.beginPath(); c.arc(194, HZ + sink, 44, 0, TAU); c.fill();
      c.globalAlpha = glow; c.fillStyle = '#FFD23F'; c.beginPath(); c.arc(194, HZ + sink, 30, 0, TAU); c.fill();
      c.restore();
      const dashes = rows => { c.beginPath(); rows.forEach(([x, y, w]) => { c.moveTo(x, y); c.lineTo(x + w, y); }); c.stroke(); };
      c.globalAlpha = glow * 0.8; c.lineWidth = 3; c.strokeStyle = '#FF5A4D'; dashes([[150, 148, 48], [204, 159, 32], [8, 142, 30]]);
      c.lineWidth = 2.4; c.strokeStyle = '#FFD23F'; dashes([[175, 185, 38], [184, 191, 20], [190, 197, 8]]);
      c.globalAlpha = glow * 0.45; c.lineWidth = 2; c.strokeStyle = CREAM; dashes([[0, HZ, 240]]);
      c.globalAlpha = 1;
    }
    if (rise > 0) {
      const y = 201 - rise;
      c.fillStyle = WOOD; c.strokeStyle = CREAM; c.lineWidth = 3;
      closedPath(c, boil([[PX - 17, y], [PX + 17, y], [PX + 17, 203], [PX - 17, 203]], seed + 7, 1.4), [0, 1, 2, 3]); c.fill(); c.stroke();
      c.fillStyle = BARK; c.fillRect(PX + 7, y + 2, 8, rise - 1);
      c.strokeStyle = BARK; c.lineWidth = 2; c.beginPath();
      [[-9, 22, 12], [-2, 24, 16], [4, 21, 9]].forEach(([x, from, n]) => { if (from + n < rise) { c.moveTo(PX + x, y + from); c.lineTo(PX + x, y + from + n); } });
      c.stroke();
      if (rise > 24) { c.fillStyle = '#C89B5A'; c.fillRect(PX - 16, y + 11, 32, 7); c.beginPath(); c.moveTo(PX - 16, y + 14.5); c.lineTo(PX + 16, y + 14.5); c.stroke(); }    // a rope wound round it
      c.fillStyle = '#C89B5A'; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.ellipse(PX, y, 17, 5, 0, 0, TAU); c.fill(); c.stroke();
      c.strokeStyle = WOOD; c.lineWidth = 1.6; c.beginPath(); c.ellipse(PX, y, 9, 2.4, 0, 0, TAU); c.stroke();
    }
    c.restore();
  };
  const leaf = ([x, y, turn]) => c => {
    c.save(); c.translate(x, y); c.rotate(turn); c.lineCap = c.lineJoin = 'round'; c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-13, 0); c.quadraticCurveTo(-2, -12, 13, 0); c.quadraticCurveTo(-2, 12, -13, 0); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-13, 0); c.lineTo(-19, 1); c.stroke();
    c.strokeStyle = '#C89B5A'; c.beginPath(); c.moveTo(-8, 0); c.lineTo(7, 0); c.stroke();
    c.restore();
  };
  // where a point of the standing drawing ends up after xf(D.N, o)
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  // both arms out at `lift` above level, see-sawing by `tilt`
  const arms = (o, lift, tilt = 0) => lift === undefined ? {} : {
    arm: [[90, 132], [90 - 49 * Math.cos(lift + tilt), 132 - 49 * Math.sin(lift + tilt)]].map(p => pt(o, p)),
    arm2: [[168, 130], [168 + 49 * Math.cos(lift - tilt), 130 - 49 * Math.sin(lift - tilt)]].map(p => pt(o, p)) };
  const pose = (o, face, back, front, lift, tilt) => {
    const d = xf(D.N, { ...o, face, extra: { ...arms(o, lift, tilt), back, front } });
    return { ...d, curl: d.curl.map(([x, y]) => [x, Math.min(y, 199)]) };                // upside down, his cowlick is flat on the floor
  };
  const UP = { dx: PX - 128, dy: -TOP, shadowK: 0.5 }, POSE = { ...UP, ky: 1.03, kx: 0.98 };
  // turned by `rot` and lying on the floor, with his middle at cx
  const rolled = (rot, cx) => { const B = xf(D.N, { rot }).body, X = B.map(p => p[0]); return { rot, dx: cx - (Math.min(...X) + Math.max(...X)) / 2, dy: 201 - Math.max(...B.map(p => p[1])) }; };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };

  [[-12, 0.3], [-26, 0.6]].forEach(([dx, glow], i) => add('step' + i, 3 - i, pose({ dx, rot: -0.05 }, FACE.lookr, scene(glow, 4, 0))));
  add('look', 6, pose({ dx: PX - 128 }, FACE.lookr, scene(1, 4, 0)));
  [[6, 0.94, down], [20, 0.98, down], [34, 1, down], [TOP + 2, 1.04, FACE.shock], [TOP, 0.92, worried], [TOP, 1, worried]].forEach(([rise, ky, face], i) =>
    add('rise' + i, i === 4 ? 4 : 2, pose({ ...UP, dy: -rise, ky, kx: 1.5 - ky / 2 }, face, scene(1, 6, rise))));
  add('set', 4, pose(UP, set, scene(1, 8, TOP)));
  add('dip', 4, pose({ ...UP, ky: 0.9, kx: 1.05 }, set, scene(1, 8, TOP), null, -0.9));
  add('up', 2, pose({ ...UP, ky: 1.04, kx: 0.97 }, set, scene(1, 8, TOP), null, 0.85));
  [-0.08, -0.15, -0.07, 0.08, 0.17, 0.08, -0.05, -0.1, -0.03, 0.04, 0.02].forEach((rot, i) =>
    add('wobble' + i, 2, pose({ ...POSE, rot }, worried, scene(1, 10, TOP), null, 0.6, -3 * rot)));
  add('still', 8, pose(POSE, serene, scene(1, 12, TOP), null, 0.6));
  [[246, -2, -0.5], [220, 8, -0.7], [199, 16, -0.3], [207, 24, 0.5], [190, 31, -0.4], [178, 37, -0.6], [183, 42, 0.3], [175, 46, -0.2]].forEach((at, i) =>
    add('drift' + i, 2, pose(POSE, serene, scene(1, 14, TOP), leaf(at), 0.6)));
  add('touch', 6, pose(POSE, peek, scene(1, 16, TOP), leaf([171, 50, 0.1]), 0.6, 0.07));
  const fall = (o, face, at, ticks = 2, lift = 0.6) => add('fall' + seq.length, ticks, pose(o, face, scene(1, 18, TOP), leaf(at), lift));
  fall({ ...POSE, rot: 0.08 }, uhoh, [173, 48, 0.2], 4);
  fall({ ...POSE, rot: 0.22, dx: -39 }, uhoh, [177, 42, -0.4]);
  fall({ ...POSE, rot: 0.5, dx: -34, dy: -43 }, FACE.shock, [182, 35, -0.8]);
  fall({ rot: 0.95, dx: -18, dy: -38, shadowK: 0.6 }, FACE.shock, [186, 30, -0.3]);
  fall({ rot: 1.7, dx: -38, dy: -80, shadowK: 0.7 }, FACE.shock, [189, 27, 0.3], 2, 0.9);
  fall({ rot: 2.5, dx: -10, dy: -120, shadowK: 0.8 }, FACE.shock, [188, 28, 0.6], 2, 1.1);
  const flipped = ky => ({ rot: Math.PI, dx: 32, dy: -131 * ky, ky, kx: 1.6 - ky * 0.6 });
  fall(flipped(0.8), FACE.shock, [184, 32, -0.3], 4, 0.8);
  fall(flipped(1.06), serene, [187, 38, 0.4], 2, 1.2);
  [[182, 44, -0.4], [185, 50, 0.3], [174, 57, -0.3], [168, 62, 0.1]].forEach(at => fall(flipped(1), serene, at, 2, 1));
  add('held', 10, pose(flipped(1), deadpan, scene(1, 22, TOP), leaf([165, 65, 0]), 1));
  [[2.3, 153, 138, 120, -0.6], [1.4, 144, 102, 168, -1.2], [0.6, 135, 54, 190, -0.4], [0.15, 130, 4, 196, 0.2]].forEach(([rot, cx, lx, ly, turn], i) =>
    add('roll' + i, 2, pose(rolled(rot, cx), i < 2 ? deadpan : FACE.sheep, scene(0.8 - i * 0.22, 24, 33 - i * 11), leaf([lx, ly, turn]))));
  CLIPS.crane_pose = { home: 'idle', seq: [...seq, ...DOZE] };
})();
