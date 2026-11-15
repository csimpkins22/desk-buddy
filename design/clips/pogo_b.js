// He pogos in from the right, each bounce higher, until the last takes him off the top; the stick falls back alone, and then so does he.
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const { CREAM, RED, GREY, YELLOW } = kit, k = kit.clip('pogo_b');
  const Z = 0.7, cam = e => kit.view(1 + (Z - 1) * e, [128, 201], [128 - 8 * e, 201 + 21 * e]);
  // the stick with its tip at [x, y], leaning by rot, its spring squeezed by `squeeze`; w narrows the handle and pegs as it falls flat
  const stick = (c, [x, y], rot, squeeze = 0, w = 1) => {
    const s = 20 - squeeze, bar = (x0, y0, x1, y1, width, colour) => { c.strokeStyle = colour; c.lineWidth = width; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); };
    c.save(); c.translate(x, y); c.rotate(rot); c.lineCap = c.lineJoin = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 4.5; c.beginPath(); c.moveTo(0, 0); [1, 2, 3, 4].forEach(i => c.lineTo(i % 2 ? 9 : -9, -s * i / 5)); c.lineTo(0, -s); c.stroke();
    bar(0, -s, 0, -s - 52, 12, CREAM); bar(-24 * w, -s, 24 * w, -s, 11, CREAM); bar(-66 * w, -s - 52, 66 * w, -s - 52, 12, CREAM);
    bar(0, -s, 0, -s - 52, 7, RED); bar(-24 * w, -s, 24 * w, -s, 6, GREY); bar(-66 * w, -s - 52, 66 * w, -s - 52, 7, GREY);
    bar(-66 * w, -s - 52, -52 * w, -s - 52, 8, YELLOW); bar(52 * w, -s - 52, 66 * w, -s - 52, 8, YELLOW);
    c.restore();
  };
  // him on the stick: feet centre X, h above a standing bounce, leaning by rot
  const rider = (X, h, rot, squeeze, face, ky = 1, kx = 1) => {
    const s = 20 - squeeze;
    return xf(D.N, { dx: X - 128, dy: -s - h, rot, ky, kx, shadowK: Math.max(0.3, 1 - h / 200), face,
      extra: { view: cam(1), front: c => stick(c, [X - s * Math.sin(rot), 201 - s - h + s * Math.cos(rot)], rot, squeeze) } });
  };
  const air = (X, h, ky = 1.04) => rider(X, h, -0.12, 0, FACE.happy, ky, 0.98), land = (X, deep) => rider(X, 0, 0, deep ? 13 : 9, FACE.puff, deep ? 0.8 : 0.88, deep ? 1.13 : 1.08);

  [-8, 30, 80, 135, 190].forEach((dx, i) => k.add('off' + i, 2, xf(D.N, { dx, rot: i ? 0.14 : -0.08, face: kit.look(5, 0, 'smile'), extra: { view: cam(i / 4) } })));
  k.add('beat', 2, kit.gone({ view: cam(1) }));

  k.add('in', 2, air(290, 40));
  k.add('c1', 2, land(250));
  k.add('a1', 2, air(232, 36)); k.add('a2', 2, air(214, 36));
  k.add('c2', 2, land(196));
  k.add('b1', 2, air(172, 76)); k.add('b2', 2, air(150, 76));
  k.add('c3', 2, land(128));
  k.add('d1', 2, air(112, 100)); k.add('d2', 2, air(98, 135)); k.add('d3', 2, air(84, 100));
  k.add('c4', 4, land(70, true));
  k.add('up1', 2, rider(66, 90, 0.04, 0, FACE.happy, 1.12, 0.94)); k.add('up2', 2, rider(63, 200, 0.04, 0, FACE.shock, 1.12, 0.94)); k.add('up3', 2, rider(61, 330, 0.04, 0, FACE.shock, 1.12, 0.94));

  const lying = [[110, 195], 1.52, 0, 0.35];
  [[[96, -60], 2.6, 0, 1], [[104, 60], 4.4, 0, 1], [[110, 201], 6.5, 9, 1], [[110, 200], 0.9, 0, 0.6], lying].forEach((s, i) => k.add('fall' + i, i === 4 ? 4 : 2, kit.gone({ view: cam(1), back: c => stick(c, ...s) })));

  const X = -105, dropped = (o, face) => xf(D.N, { dx: X, ...o, face, extra: { view: cam(1), back: c => stick(c, ...lying) } });
  k.add('drop0', 2, dropped({ dy: -200, ky: 1.12, kx: 0.92, shadowK: 0.3 }, FACE.shock));
  k.add('drop1', 2, dropped({ dy: -70, ky: 1.1, kx: 0.94, shadowK: 0.7 }, FACE.shock));
  k.add('drop2', 2, dropped({ ky: 0.72, kx: 1.2 }, FACE.aah));
  k.add('drop3', 2, dropped({ ky: 1.05, kx: 0.97 }, FACE.spiral));
  k.add('drop4', 6, dropped({}, FACE.sheep));
  const back = kit.steps(1, 0, 5).slice(1);
  kit.walk(X, 0, 5, { face: kit.look(4, 0, 'smile') }).slice(1).forEach((o, i) => k.add('home' + i, 2, xf(D.N, { ...o, extra: { view: cam(back[i]), back: c => kit.fade(c, [0.7, 0.4, 0.15, 0][i], () => stick(c, ...lying)) } })));
  k.done();
})();
