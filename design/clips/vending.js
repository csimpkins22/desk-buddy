// A vending machine drops over him and he is the snack: he taps on the glass, eyes the slot, wriggles down into the tray and pushes out through the flap.
// group: scenes
(() => {
  const { D, xf, kit } = window.__lump, k = kit.clip('vending');
  const { CREAM, GREY, YELLOW, RED, BLUE, GREEN, BROWN, WHITE, TAU } = kit, CASE = '#2B3A55';
  // the machine is drawn in screen pixels whatever the view is doing to him
  const screen = (c, y, fn) => { c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.translate(0, y); c.lineJoin = c.lineCap = 'round'; fn(); c.restore(); };
  const SNACKS = [[0, 34, 62], [1, 68, 62], [3, 142, 62], [2, 174, 62], [2, 38, 116], [3, 36, 169], [0, 172, 169]];
  const snack = (c, kind, x, y) => {
    c.lineWidth = 2; c.strokeStyle = CREAM; c.fillStyle = [YELLOW, BLUE, BROWN, GREEN][kind];
    const [w, h] = [[24, 32], [18, 28], [30, 14], [24, 26]][kind];
    c.beginPath(); c.roundRect(x - w / 2, y - h, w, h, 3); c.fill(); c.stroke();
    if (kind === 0) { c.fillStyle = RED; c.fillRect(x - 11, y - 22, 22, 8); }
    if (kind === 1) { c.fillStyle = WHITE; c.fillRect(x - 8, y - 18, 16, 5); }
    if (kind === 2) { c.fillStyle = RED; c.fillRect(x - 5, y - 13, 10, 12); }
    if (kind === 3) { c.fillStyle = CREAM; c.beginPath(); c.arc(x, y - 13, 6, 0, TAU); c.fill(); }
  };
  // the clear flap over the tray, hinged along its top: up 0 hangs shut, 1 is pushed right open
  const flap = (c, up) => { const b = 224 - up * 34, w = up * 9; c.strokeStyle = GREY; c.lineWidth = 3; c.beginPath(); c.moveTo(40, 187); c.lineTo(170, 187); c.lineTo(170 + w, b); c.lineTo(40 - w, b); c.closePath(); c.stroke(); };
  const cabinet = (c, y, up) => screen(c, y, () => {
    c.fillStyle = CASE; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(4, 3, 232, 234, 10); c.fill(); c.stroke();
    c.fillStyle = '#0D1118'; c.lineWidth = 2.4; c.beginPath(); c.rect(14, 12, 180, 158); c.fill(); c.stroke();
    c.strokeStyle = GREY; c.lineWidth = 3; c.beginPath(); c.moveTo(15, 63); c.lineTo(193, 63); c.moveTo(15, 117); c.lineTo(193, 117); c.stroke();
    SNACKS.forEach(s => snack(c, ...s));
    c.fillStyle = GREEN; c.fillRect(202, 16, 26, 12);
    c.fillStyle = GREY; for (let i = 0; i < 6; i++) c.fillRect(203 + (i % 2) * 14, 36 + (i >> 1) * 12, 10, 8);
    c.fillStyle = CREAM; c.fillRect(213, 84, 4, 16);
    c.fillStyle = '#07090D'; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.roundRect(36, 184, 138, 44, 6); c.fill(); c.stroke();
    if (up !== undefined) flap(c, up);
  });
  // what is in front of him while he is inside: the sill he passes behind on his way down, the glint on the glass and the flap
  const glass = (c, y, up) => screen(c, y, () => {
    c.fillStyle = CASE; c.fillRect(6, 171, 228, 12);
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(14, 170); c.lineTo(194, 170); c.stroke();
    c.strokeStyle = GREY; c.lineWidth = 3; c.beginPath(); c.moveTo(172, 84); c.lineTo(187, 68); c.moveTo(160, 84); c.lineTo(187, 55); c.stroke();
    flap(c, up);
  });
  const view = (z, x, y) => kit.view(z, [128, 201], [x, y]);
  // inside: the cabinet behind him, the glass and the flap in front
  const inside = (y = 0, up = 0, more) => ({ back: c => cabinet(c, y), front: c => { if (more) more(c); glass(c, y, up); } });
  const add = (name, ticks, o, face, extra) => k.add(name, ticks, xf(D.N, { ...o, face, extra }));

  // down it comes
  [[0, -250, {}], [0.4, -160, {}], [0.8, -60, { ky: 0.94 }], [1, 0, { ky: 0.86, kx: 1.06 }]].forEach(([t, y, o], i) =>
    add('drop' + i, 2, o, kit.look(0, -6, 'o'), { view: view(1 - 0.25 * t, 128 - 23 * t, 201 - 33 * t), ...inside(y) }));
  const IN = view(0.75, 105, 168);
  add('in', 4, {}, kit.faces.wide, { view: IN, ...inside() });
  add('lookl', 4, {}, kit.look(-5, 0, 'o', 4.6), { view: IN, ...inside() });
  add('lookr', 4, {}, kit.look(5, 0, 'o', 4.6), { view: IN, ...inside() });
  // tap tap tap on the glass
  const knock = c => { c.save(); c.strokeStyle = CREAM; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); [[-0.9, 0], [-0.2, 0], [0.5, 0]].forEach(([a]) => { c.moveTo(203 + Math.cos(a) * 9, 110 + Math.sin(a) * 9); c.lineTo(203 + Math.cos(a) * 19, 110 + Math.sin(a) * 19); }); c.stroke(); c.restore(); };
  add('tapa', 2, {}, kit.faces.worried, { view: IN, arm2: [[166, 140], [196, 114]], ...inside(0, 0, knock) });
  add('tapb', 2, {}, kit.faces.worried, { view: IN, arm2: [[166, 140], [188, 124]], ...inside() });
  k.add('tapa', 2); k.add('tapb', 2); k.add('tapa', 2); k.add('tapb', 2);
  // he looks down at the slot, and goes for it
  add('down', 8, { ky: 0.92, kx: 1.03 }, kit.look(-1, 9, 'o', 4.6), { view: IN, ...inside() });
  [[176, 0.95, 0.94, 0.1], [186, 0.84, 1.05, -0.1], [198, 0.7, 0.96, 0.1], [210, 0.56, 1.1, -0.08], [224, 0.45, 1.2, 0]].forEach(([y, ky, kx, rot], i) =>
    add('wrig' + i, 2, { ky, kx, rot }, kit.look(0, 5, 'wobble'), { view: view(0.75, 105, y), ...inside() }));
  add('tray', 4, { ky: 0.45, kx: 1.2 }, kit.look(0, 0, 'flat', 4.6), { view: view(0.75, 105, 224), ...inside() });
  // out through the flap, and he is in front of it
  add('push0', 2, { ky: 0.6, kx: 1.12 }, kit.look(0, 0, 'wobble', 4.4), { view: view(0.8, 106, 227), back: c => cabinet(c, 0), front: c => screen(c, 0, () => flap(c, 0.5)) });
  add('push1', 2, { ky: 0.84, kx: 1.04 }, kit.look(0, -2, 'open'), { view: view(0.88, 110, 230), back: c => cabinet(c, 0, 1) });
  add('out', 10, {}, kit.faces.closed, { view: view(0.95, 114, 232), back: c => cabinet(c, 0, 0) });
  // and up it goes
  [[0.4, -90], [0.8, -180], [1, -262]].forEach(([t, y], i) =>
    add('lift' + i, 2, {}, kit.look(0, -5, 'smile'), { view: view(0.95 + 0.05 * t, 114 + 14 * t, 232 - 31 * t), back: c => cabinet(c, y, 0) }));
  k.done();
})();
