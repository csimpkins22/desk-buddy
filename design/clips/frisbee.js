// A frisbee whips over him there and back and he chases it both ways; on the third pass he leaps back at it, catches it in his mouth and skids to a stop.
// group: scenes
(() => {
  const { D, xf, kit } = window.__lump, k = kit.clip('frisbee');
  // dir 1 or -1 draws speed lines trailing behind it
  const disc = (c, x, y, tilt = 0, dir = 0) => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM;
    if (dir) { c.lineWidth = 2.4; c.beginPath(); [-4, 4].forEach(dy => { c.moveTo(x - dir * 30, y + dy); c.lineTo(x - dir * 50, y + dy); }); c.stroke(); }
    c.fillStyle = kit.RED; c.lineWidth = 2.6; c.beginPath(); c.ellipse(x, y, 22, 8, tilt, 0, kit.TAU); c.fill(); c.stroke();
    c.strokeStyle = kit.YELLOW; c.lineWidth = 2.4; c.beginPath(); c.ellipse(x, y - 1, 12, 3.2, tilt, 0, kit.TAU); c.stroke();
    c.restore();
  };
  const fly = (x, y, dir) => ({ front: c => disc(c, x, y, dir * 0.12, dir) });
  // held in his mouth, wherever that has got to
  const held = o => ({ front: c => { const [x, y] = kit.pt(o, [128, 124]); disc(c, x - 5, y + 2, (o.rot || 0) - 0.06); } });
  const add = (name, ticks, o, face, extra) => k.add(name, ticks, xf(D.N, { ...o, face, extra }));

  // over him left to right, high up: he sees it and gives chase
  add('a0', 2, {}, kit.look(-6, -4, 'o'), fly(8, 40, 1));
  add('a1', 2, {}, kit.look(-3, -6, 'o'), fly(66, 32, 1));
  add('a2', 2, { dx: 14, rot: 0.1 }, kit.look(3, -6, 'smile'), fly(124, 28, 1));
  add('a3', 2, { dx: 40, rot: 0.14, ky: 0.97 }, kit.look(5, -5, 'open'), fly(182, 32, 1));
  add('a4', 2, { dx: 62, rot: 0.12, ky: 1.02 }, kit.look(5, -4, 'open'), fly(240, 40, 1));
  // it curves back the other way: he skids, turns and runs back
  add('b0', 2, { dx: 68, rot: -0.08, kx: 1.06, ky: 0.92 }, kit.look(4, -5, 'o'), fly(236, 50, -1));
  add('b1', 2, { dx: 60 }, kit.look(-4, -6, 'o'), fly(178, 42, -1));
  add('b2', 2, { dx: 38, rot: -0.12, ky: 1.02 }, kit.look(-5, -5, 'open'), fly(120, 38, -1));
  add('b3', 2, { dx: 14, rot: -0.14, ky: 0.97 }, kit.look(-5, -5, 'open'), fly(62, 42, -1));
  add('b4', 2, { dx: -8, rot: -0.12, ky: 1.02 }, kit.look(-5, -4, 'open'), fly(4, 50, -1));
  // and back again, lower: he crouches, leaps and has it
  add('c0', 2, { dx: -16, kx: 1.08, ky: 0.84 }, kit.look(-6, 0, 'o'), fly(2, 98, 1));
  add('c1', 2, { dx: -24, dy: -24, ky: 1.08, rot: -0.08 }, kit.look(-5, -1, 'open'), fly(36, 92, 1));
  const CATCH = { dx: -38, dy: -38, ky: 1.04, rot: -0.1 }, DOWN = { dx: -44, dy: -14, rot: -0.06 }, LAND = { dx: -48, kx: 1.1, ky: 0.86 }, SKID = { dx: -54, rot: 0.1 }, STOP = { dx: -56 };
  add('c2', 4, CATCH, kit.look(0, 0, 'smile', 4.6), held(CATCH));
  add('c3', 2, DOWN, kit.look(0, 2, 'smile'), held(DOWN));
  add('c4', 2, LAND, kit.faces.closed, { front: c => { held(LAND).front(c); kit.puff(c, 136, 196, 0, 7); } });
  add('c5', 2, SKID, kit.faces.closed, { front: c => { held(SKID).front(c); kit.puff(c, 142, 194, 1, 9); } });
  add('c6', 10, STOP, kit.faces.closed, held(STOP));
  // a flick of the head sends it off the way it came, and he strolls home
  add('e0', 2, { dx: -40, rot: -0.08 }, kit.look(-4, -3, 'smile'), fly(34, 92, -1));
  add('e1', 2, { dx: -22, rot: 0.04 }, kit.look(-4, -4, 'smile'), fly(-4, 74, -1));
  add('e2', 2, { dx: -8, rot: -0.04 }, kit.look(0, 0, 'smile'));
  k.done();
})();
