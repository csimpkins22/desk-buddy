// Shelf push: a shelf with a mug on it comes down the wall. He hops up beside the mug and, holding your eye, nudges it to the edge in small pushes, pauses, and pushes it off. A crash; he does not look away.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil } = window.__lump;
  const CREAM = '#FFF1DC', WALL = '#171D27', SKIRT = '#2B3440', BOARDS = '#222A35', WOOD = '#8A6230', GRAIN = '#C89B5A', KNOT = '#6B4A1F', STEEL = '#9FB0C4', MUG = '#F4F8FF', SHADE = '#C4CFDD', RED = '#FF5A4D', COFFEE = '#7A4F22', TAU = Math.PI * 2;
  const SHELF = 122, END = 192, K = 0.84, LX = 96, CAM = 14, FLOOR = 201 + CAM, P = 'shelf_push_';
  const stare = [['stroke',[[108,105],[124,105]],3], ['stroke',[[132,103],[148,103]],3], ['dot',116,110,3.8], ['dot',140,108,3.8], ['stroke',[[122,125],[134,124]],2.8]];
  const plot = [['dot',124,109,3.8], ['dot',148,107,3.8], ['stroke',[[126,123],[132,127],[139,122]],2.6]];
  const pt = (o, [x, y]) => { const k = o.k || 1, r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + (u * Math.cos(r) - v * Math.sin(r)) * k + (o.dx || 0), 201 + (u * Math.sin(r) + v * Math.cos(r)) * k + (o.dy || 0)]; };
  const poly = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); c.stroke(); };
  // stood on (x, y) and tipped by rot. steam: it is still hot. slop: the coffee thrown to one side.
  const mug = (c, x, y, rot, seed, steam, slop = 0) => {
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(1.2, 1.2); c.strokeStyle = CREAM;
    c.beginPath(); c.moveTo(11, -19); c.bezierCurveTo(25, -21, 24, -4, 10, -7); c.lineWidth = 8; c.stroke(); c.strokeStyle = MUG; c.lineWidth = 3.4; c.stroke();
    const body = () => { c.beginPath(); c.moveTo(-13, -24); c.lineTo(-11, -3); c.quadraticCurveTo(-10, 0, -7, 0); c.lineTo(7, 0); c.quadraticCurveTo(10, 0, 11, -3); c.lineTo(13, -24); c.closePath(); };
    body(); c.fillStyle = MUG; c.fill(); c.save(); c.clip(); c.fillStyle = SHADE; c.fillRect(5, -26, 10, 28); c.fillStyle = RED; c.fillRect(-14, -16, 28, 5); c.restore();
    c.strokeStyle = CREAM; c.lineWidth = 2.3; body(); c.stroke();
    c.fillStyle = '#8794A6'; c.beginPath(); c.ellipse(0, -24, 13, 4.4, 0, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = COFFEE; c.beginPath(); c.ellipse(slop * 3, -23.4, 9.6, 2.8, slop * 0.12, 0, TAU); c.fill();
    if (steam) {
      c.globalAlpha = 0.55; c.lineWidth = 2; c.beginPath();
      [-4, 5].forEach((sx, i) => { const lift = (seed + i * 2) % 3 * 3; c.moveTo(sx, -32 - lift); c.bezierCurveTo(sx - 4, -37 - lift, sx + 4, -41 - lift, sx, -46 - lift); }); c.stroke(); c.globalAlpha = 1;
    }
    c.restore();
  };
  const shelf = (c, seed) => {
    [34, 150].forEach(x => {
      c.beginPath(); c.moveTo(x + 27, SHELF + 12); c.lineTo(x, SHELF + 12); c.lineTo(x, SHELF + 42); c.moveTo(x, SHELF + 37); c.lineTo(x + 23, SHELF + 13);
      c.strokeStyle = CREAM; c.lineWidth = 7.4; c.stroke(); c.strokeStyle = STEEL; c.lineWidth = 3.6; c.stroke();
      c.fillStyle = SKIRT; c.beginPath(); c.arc(x, SHELF + 20, 1.5, 0, TAU); c.arc(x, SHELF + 33, 1.5, 0, TAU); c.fill();
    });
    c.fillStyle = WOOD; c.strokeStyle = CREAM; c.lineWidth = 2.6; poly(c, boil([[-12, SHELF], [END, SHELF], [END + 1, SHELF + 10], [-12, SHELF + 10]], seed + 4, 1.2));
    c.fillStyle = GRAIN; c.fillRect(-12, SHELF + 1.4, END + 10.6, 3);
    c.strokeStyle = KNOT; c.lineWidth = 1.6; c.beginPath(); c.moveTo(14, SHELF + 7); c.lineTo(66, SHELF + 7); c.moveTo(104, SHELF + 6.6); c.lineTo(172, SHELF + 6.6); c.stroke();
  };
  // the broken mug, u of the way from the smash (0) to lying still (1): shards, the handle, and the coffee
  const SHARDS = [[[[-10, 0], [-13, -17], [0, -21], [8, -12], [4, 0]], -32, 28, -1.3], [[[-7, 0], [-4, -14], [8, -12], [10, 0]], 13, 22, 0.9], [[[-5, 0], [0, -11], [7, -1]], -56, 36, -2.2], [[[-4, 0], [1, -9], [6, 0]], -11, 44, 1.6]];
  const smash = (c, x, u, fade) => {
    const fly = (dx, hop) => [x + dx * u, FLOOR + 6 - hop * Math.sin(Math.PI * Math.min(1, u))];
    c.globalAlpha = fade; c.strokeStyle = CREAM; c.lineWidth = 1.8;
    c.fillStyle = COFFEE; c.beginPath(); c.ellipse(x - 10, FLOOR + 7, 8 + 30 * u, 1.5 + 4 * u, 0, 0, TAU); c.fill(); c.stroke();
    if (u < 0.95) {                                                         // the splash: tongues of coffee going up, and drops flying
      const h = 30 * Math.sin(Math.PI * Math.min(1, u * 1.2));
      c.beginPath(); [[-18, -0.6], [-2, 0.1], [14, 0.7]].forEach(([dx, tilt]) => { const bx = x - 8 + dx, by = FLOOR + 7; c.moveTo(bx - 5, by); c.quadraticCurveTo(bx + tilt * 10 - 3, by - h * 0.7, bx + tilt * 20, by - h); c.quadraticCurveTo(bx + tilt * 10 + 4, by - h * 0.5, bx + 5, by); });
      [[-40, 50], [-20, 62], [8, 56], [24, 40], [-62, 34]].forEach(([dx, hop], i) => { const [px, py] = fly(dx, hop); c.moveTo(px + 3.2, py); c.arc(px, py, 3.2 - i % 2 * 0.8, 0, TAU); }); c.fill(); c.stroke();
    }
    c.fillStyle = MUG; c.lineWidth = 2;
    SHARDS.forEach(([pts, dx, hop, spin], i) => {
      const [px, py] = fly(dx, hop), a = spin * (1 - u), cs = Math.cos(a), sn = Math.sin(a);
      poly(c, pts.map(([qx, qy]) => [px + qx * cs - qy * sn, py + qx * sn + qy * cs]));
      if (!i) { c.strokeStyle = RED; c.lineWidth = 3; c.beginPath(); c.moveTo(px - 10 * cs + 9 * sn, py - 10 * sn - 9 * cs); c.lineTo(px + 5 * cs + 10 * sn, py + 5 * sn - 10 * cs); c.stroke(); c.strokeStyle = CREAM; c.lineWidth = 2; }
    });
    const [hx, hy] = fly(24, 30);                                           // the handle, in one piece
    c.beginPath(); c.arc(hx, hy - 7, 7, Math.PI * 0.75 + u, Math.PI * 2.25 + u); c.lineWidth = 7; c.stroke(); c.strokeStyle = MUG; c.lineWidth = 3; c.stroke();
    if (u < 0.4) {                                                          // the smash itself
      c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath();
      [-2.7, -2.2, -1.57, -0.95, -0.45].forEach((a, i) => { const r = 24 + i % 2 * 7; c.moveTo(x + Math.cos(a) * r, FLOOR + 2 + Math.sin(a) * r); c.lineTo(x + Math.cos(a) * (r + 13), FLOOR + 2 + Math.sin(a) * (r + 13)); }); c.stroke();
    }
    c.globalAlpha = 1;
  };
  // behind him. cam: how far the view has risen. wall: how solid the room is. drop: how far the shelf still has to come down.
  // cup: the mug, [x, height above the shelf, tilt, slop]. drips: coffee in the air. broken: [how far along the smash, how solid].
  const room = ({ cam = CAM, wall = 1, drop = 0, cup, cold, drips, broken }) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.translate(0, cam);
    c.globalAlpha = wall; c.fillStyle = WALL; c.fillRect(0, -cam, 240, 190 + cam); c.fillStyle = BOARDS; c.fillRect(0, 201, 240, 60);
    c.fillStyle = SKIRT; c.fillRect(0, 189, 240, 12); c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = wall * 0.45; c.beginPath(); c.moveTo(0, 189); c.lineTo(240, 189); c.moveTo(0, 201); c.lineTo(240, 201); c.stroke();
    c.globalAlpha = wall;
    if (d.shadow[1]) { c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.ellipse(d.shadow[0] + 4, 204, d.shadow[1], 6, 0, 0, TAU); c.fill(); }
    c.translate(0, -drop); if (drop < 170) shelf(c, seed);
    if (cup) mug(c, cup[0], SHELF - cup[1], cup[2] || 0, seed, !cold, cup[3]);
    c.translate(0, drop - cam); c.globalAlpha = 1;
    if (drips) { c.fillStyle = COFFEE; c.strokeStyle = CREAM; c.lineWidth = 1.4; drips.forEach(([x, y, r]) => { c.beginPath(); c.ellipse(x, y, r * 0.8, r, 0, 0, TAU); c.fill(); c.stroke(); }); }
    if (broken) smash(c, 208, ...broken);
    c.restore();
  };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); };
  const stood = (o, scene) => xf(D.N, { ...o, extra: { back: room(scene) } });
  // sat on the shelf. reach: how far his arm is out towards the mug, 0 to 1, with the mug at mx. lean: tipped towards it.
  const sat = (face, scene, { reach = 0, mx = 164, lean = 0, ...more } = {}) => {
    const o = { k: K, dx: LX - 128 + lean * 40, dy: SHELF - 201 + CAM, rot: lean, shadowK: 0, face, ...more }, s = pt(o, [160, 150]);
    return xf(D.N, { ...o, extra: { back: room(scene), ...(reach && { arm2: [s, [s[0] + (mx - 21 - s[0]) * reach, s[1] + (SHELF + CAM - 13 - s[1]) * reach]] }) } });
  };

  add('in0', 3, stood({ dx: -12, rot: -0.04, face: FACE.lookup }, { cam: 0, wall: 0.3, drop: 150, cup: [164, 0] }));
  add('in1', 2, stood({ dx: -28, rot: -0.04, face: FACE.lookup }, { cam: 0, wall: 0.7, drop: 62, cup: [164, 0] }));
  add('in2', 2, stood({ dx: -36, face: FACE.lookr }, { cam: 0, drop: -6, cup: [164, 5, -0.1, -1] }));
  add('in3', 2, stood({ dx: -36, face: FACE.lookr }, { cam: 0, cup: [164, 0, 0, 1] }));
  add('eye', 4, stood({ dx: -36, rot: 0.05, face: plot }, { cam: 0, cup: [164, 0] }));
  add('crouch', 4, stood({ dx: -36, ky: 0.8, kx: 1.12, face: plot }, { cam: 0, cup: [164, 0] }));
  add('hop0', 2, stood({ dx: -35, dy: -38, k: 0.95, ky: 1.08, kx: 0.94, shadowK: 0.6, face: plot }, { cam: 4, cup: [164, 0] }));
  add('hop1', 2, stood({ dx: LX - 128, dy: -69, k: 0.86, shadowK: 0, face: plot }, { cam: CAM, cup: [164, 0] }));
  add('land', 2, sat(FACE.lookr, { cup: [164, 6, 0.08, 1] }, { ky: 0.84, kx: 1.1 }));
  add('sit', 4, sat(FACE.lookr, { cup: [164, 0, 0, -1] }));
  add('turn', 8, sat(stare, { cup: [164, 0] }));
  [164, 172, 180].forEach((mx, i) => {
    const lean = 0.03 + i * 0.03;
    add('reach' + i, 2, sat(stare, { cup: [mx, 0] }, { reach: 1, mx, lean }));
    add('push' + i, 2, sat(stare, { cup: [mx + 9, 0, 0.1, 1] }, { reach: 1, mx: mx + 9, lean: lean + 0.03 }));
    add('rest' + i, 4, sat(stare, { cup: [mx + 8, 0, 0, -0.6] }, { reach: 0.75, mx: mx + 8, lean }));
  });
  add('pause', 10, sat(stare, { cup: [188, 0] }, { reach: 0.45, mx: 188, lean: 0.04 }));
  add('tap0', 4, sat(stare, { cup: [188, 0] }, { reach: 1, mx: 188, lean: 0.1 }));
  add('tap1', 2, sat(stare, { cup: [194, 0, 0.5, 1], cold: true }, { reach: 1, mx: 197, lean: 0.13 }));
  const OUT = { reach: 1, mx: 199, lean: 0.13 };
  add('fall0', 2, sat(stare, { cup: [203, -12, 1.3, 1], cold: true, drips: [[198, 130, 2.6]] }, OUT));
  add('fall1', 2, sat(stare, { cup: [208, -38, 2.3, 1], cold: true, drips: [[201, 140, 2.8], [206, 156, 2.4]] }, OUT));
  add('fall2', 2, sat(stare, { cup: [211, -70, 3.4, 1], cold: true, drips: [[204, 164, 2.6], [209, 182, 2.8], [200, 148, 2]] }, OUT));
  add('smash0', 2, sat(stare, { broken: [0.2, 1], drips: [[206, 196, 2.4], [202, 176, 2]] }, OUT));
  add('smash1', 2, sat(stare, { broken: [0.55, 1] }, { reach: 0.8, mx: 199, lean: 0.1 }));
  add('smash2', 2, sat(stare, { broken: [0.85, 1] }, { reach: 0.5, mx: 199, lean: 0.06 }));
  add('after', 14, sat(stare, { broken: [1, 1] }));
  add('down0', 2, stood({ dx: -26, dy: -62, k: 0.9, ky: 1.04, kx: 0.97, shadowK: 0.3, face: stare }, { cam: 10, drop: 40, broken: [1, 0.7] }));
  add('down1', 2, stood({ dx: -12, dy: -30, k: 0.96, ky: 1.06, shadowK: 0.7, face: stare }, { cam: 4, wall: 0.7, drop: 110, broken: [1, 0.4] }));
  add('down2', 2, stood({ ky: 0.86, kx: 1.09, face: stare }, { cam: 0, wall: 0.3, drop: 190 }));
  add('out', 2, xf(D.N, {}));
  CLIPS.shelf_push = { home: 'idle', seq: [...seq, ...DOZE] };
})();
