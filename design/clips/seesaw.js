// A seesaw scoops him up; a twin drops on the far end and the view follows him up into the sky, over, and down onto the other end, which sends the twin up instead.
// group: scenes
(() => {
  const { D, xf, kit } = window.__lump, k = kit.clip('seesaw');
  // the seats at each end of the plank; s 0.2 has the left end down, -0.2 the right
  const ends = s => [[128, 167 + 122 * s], [372, 167 - 122 * s]], seat = (s, right) => ends(s)[right ? 1 : 0][1] - 10;
  const seesaw = (c, s, off) => {
    const [a, b] = ends(s);
    c.save(); c.translate(off, 0); c.lineCap = c.lineJoin = 'round';
    c.fillStyle = kit.GREY; c.strokeStyle = kit.CREAM; c.lineWidth = 5; c.beginPath(); c.moveTo(220, 203); c.lineTo(250, 164); c.lineTo(280, 203); c.closePath(); c.fill(); c.stroke();
    [[kit.CREAM, 22], [kit.BROWN, 13]].forEach(([col, w]) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(a[0] - 18, a[1] + 18 * s); c.lineTo(b[0] + 18, b[1] - 18 * s); c.stroke(); });
    c.restore();
  };
  const CLOUDS = [[130, -140, 26], [345, -230, 32], [70, -330, 22], [410, -60, 24]];
  const cloud = (c, x, y, r) => { c.fillStyle = '#C9D6E8'; c.beginPath(); c.arc(x, y, r, 0, kit.TAU); c.arc(x - r, y + r * 0.3, r * 0.7, 0, kit.TAU); c.arc(x + r * 1.1, y + r * 0.35, r * 0.65, 0, kit.TAU); c.fill(); };
  const twin = (x, y, face, o = {}) => xf(D.N, { k: 0.75, dx: x - 128, dy: y - 201, face, ...o });
  // the view when he is dy off the floor: it climbs with him
  const cam = (z, dy = 0) => kit.view(z, [250, 150 + Math.min(0, dy + 20) * 1.1], [120, 130]);
  const scene = (s, it, off = 0, sky) => ({ back: (c, d, seed) => { if (sky) CLOUDS.forEach(q => cloud(c, ...q)); seesaw(c, s, off); if (it) kit.twin(c, it, seed); } });
  const add = (name, ticks, o, face, extra) => k.add(name, ticks, xf(D.N, { ...o, face, extra }));
  const SIT = { dy: seat(0.2) - 201, rot: -0.1 };

  // the view pulls back as the seesaw slides in under him
  [[0, 330, {}], [0.4, 190, {}], [0.8, 70, { dy: -26, ky: 1.04 }], [1, 0, { ...SIT, ky: 0.94 }]].forEach(([t, off, o], i) =>
    add('in' + i, 2, o, kit.look(5, 1, 'o'), { view: kit.view(1 - 0.4 * t, [128 + 122 * t, 201 - 51 * t], [128 - 8 * t, 201 - 71 * t]), ...scene(0.2, null, off) }));
  add('sit', 8, SIT, kit.look(4, -2, 'smile'), { view: cam(0.6), ...scene(0.2) });
  // a twin drops on the high end
  add('fall0', 2, SIT, kit.look(5, -6, 'o'), { view: cam(0.6), ...scene(0.2, twin(372, -40, kit.faces.wide, { ky: 1.08 })) });
  add('fall1', 2, SIT, kit.look(5, -5, 'o'), { view: cam(0.6), ...scene(0.2, twin(372, 60, kit.faces.wide, { ky: 1.08 })) });
  add('thud', 2, { dy: seat(0) - 201, ky: 1.05 }, kit.faces.wide, { view: cam(0.6), ...scene(0, twin(372, seat(0), kit.faces.closed, { ky: 0.8, kx: 1.1 })) });
  // up he goes, turning over as he does, and the view goes with him
  const there = twin(372, seat(-0.2, true), kit.faces.closed), here = twin(128, seat(0.2), kit.look(4, -6, 'o', 5));
  const AIR = [[6, -95, 0, 0.57], [22, -170, 0.3, 0.52], [48, -240, 0.9, 0.48], [80, -292, 1.6, 0.46], [108, -322, 2.5, 0.45], [136, -330, 3.6, 0.45], [166, -300, 4.6, 0.46], [198, -228, 5.5, 0.5], [226, -142, 6.283, 0.55]];
  AIR.forEach(([dx, dy, rot, z], i) => add('air' + i, i === 4 || i === 5 ? 8 : 2, i ? { dx, dy, rot, ox: 128, oy: 136, shadowK: 0 } : { dx, dy, ky: 1.15, shadowK: 0 },
    i === 4 || i === 5 ? kit.faces.closed : kit.faces.wide, { view: cam(z, dy), ...scene(i < 5 ? -0.2 : 0.2, i < 5 ? there : here, 0, true) }));
  // down on the other end, and the twin is the one in the air
  const LAND = 244, DOWN = { dx: LAND, dy: seat(-0.2, true) - 201, rot: 0.1 };
  add('land0', 2, { dx: LAND, dy: seat(0, true) - 201, ky: 0.8, kx: 1.1 }, kit.faces.closed, { view: cam(0.6), ...scene(0, twin(128, seat(0) - 8, kit.faces.wide, { ky: 1.1 })) });
  add('land1', 2, { ...DOWN, ky: 0.95 }, kit.look(-5, -5, 'o'), { view: cam(0.6), ...scene(-0.2, twin(128, 40, kit.faces.wide, { ky: 1.12 })) });
  add('land2', 2, DOWN, kit.look(-5, -6, 'o'), { view: cam(0.6), ...scene(-0.2, twin(128, -80, kit.faces.wide, { ky: 1.12 })) });
  add('swapped', 14, DOWN, kit.look(-5, -6, 'smile'), { view: cam(0.6), ...scene(-0.2) });
  // the seesaw slides out from under him and the view comes back in
  [[0.25, -70, -24], [0.55, -190, -12], [0.85, -320, -4], [1, -430, 0]].forEach(([t, off, dy], i) =>
    add('out' + i, 2, { dx: LAND, dy }, kit.look(-4, 0, 'smile'), { view: kit.view(0.6 + 0.4 * t, [250 + 122 * t, 150 + 51 * t], [120 + 8 * t, 130 + 71 * t]), ...scene(-0.2, null, off) }));
  k.done();
})();
