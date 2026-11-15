// Cape: he ties on a cape and strikes a hero pose; the wind catches the cape and wraps it over his face.
(() => {
  const { D, xf, FACE, boil, closedPath, kit } = window.__lump, k = kit.clip('cape'), { CREAM, RED, YELLOW } = kit;
  const cape = (c, pts, seed, dx = 0, dy = 0) => {
    c.save(); c.translate(dx, dy); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8; c.fillStyle = RED;
    closedPath(c, boil(pts, seed, 1.5)); c.fill(); c.stroke(); c.restore();
  };
  const knot = (c, dy = 0) => {
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.lineJoin = 'round'; c.fillStyle = YELLOW;
    c.beginPath(); c.arc(128, 142 + dy, 6, 0, kit.TAU); c.fill(); c.stroke(); c.restore();
  };
  const HANG = [[84, 130], [172, 130], [204, 196], [128, 186], [52, 196]];
  const FLY1 = [[84, 130], [172, 130], [150, 188], [70, 184], [26, 156], [50, 138]];
  const FLY2 = [[84, 130], [172, 130], [146, 180], [72, 172], [24, 174], [46, 146]];
  const LIFT = [[84, 130], [172, 130], [196, 92], [152, 50], [92, 44], [48, 84]];
  const WRAP = [[72, 100], [90, 74], [128, 66], [166, 74], [186, 100], [182, 140], [150, 152], [128, 146], [100, 154], [60, 162], [34, 150], [52, 126]];
  const worn = (o, pts, tied = true) => xf(D.N, { ...o, extra: { ...o.extra, back: (c, d, seed) => cape(c, pts, seed), front: c => tied && knot(c) } });
  kit.steps(-150, 0, 3).forEach((dy, i) => k.add('on' + i, 2, xf(D.N, { face: FACE.lookup, extra: { back: (c, d, seed) => cape(c, HANG, seed, 0, dy), front: c => knot(c, dy) } })));
  k.add('tied', 4, worn({ face: FACE.happy, ky: 0.96, kx: 1.03 }, HANG));
  const HERO = { arm: [[90, 140], [70, 162]], arm2: [[166, 140], [196, 100]] };
  k.add('hero1', 4, worn({ face: FACE.happy, ky: 1.05, extra: HERO }, FLY1));
  k.add('hero2', 4, worn({ face: FACE.happy, ky: 1.05, extra: HERO }, FLY2));
  k.add('hero1', 4); k.add('hero2', 4);
  k.add('lift', 2, worn({ face: FACE.shock, extra: HERO }, LIFT));
  const wrapped = (n, a, a2, o = {}) => k.add(n, 4, xf(D.N, { ...o, face: [], extra: { arm: [[90, 140], a], arm2: [[166, 140], a2], front: (c, d, seed) => cape(c, WRAP, seed) } }));
  wrapped('wrap1', [62, 120], [196, 126], { ky: 0.97 });
  wrapped('wrap2', [60, 150], [198, 110]);
  k.add('wrap1', 4); k.add('wrap2', 4);
  [-70, -150, -240].forEach((dx, i) => k.add('off' + i, 2, xf(D.N, { face: FACE.grump, extra: { front: (c, d, seed) => cape(c, WRAP, seed, dx, -i * 14) } })));
  k.add('end', 6, xf(D.N, { face: FACE.grump }));
  k.done();
})();
