// A text cursor blinks beside him and types him a hat, stroke by stroke. He puts it on, it is a bit small, and the cursor deletes it again.
(() => {
  const { D, xf, FACE, kit } = window.__lump, { CREAM, RED } = kit;
  const k = kit.clip('cursor'), AT = 40, GROUND = [58, 170], HEAD = [166, 75];
  // the hat's strokes, in the order they are typed, about the middle of its brim
  const HAT = [[[-27, 0], [27, 0]], [[-17, -3], [-15, -34]], [[-15, -34], [15, -34]], [[15, -34], [17, -3]], [[-16, -12], [16, -12]]];
  // n strokes of the hat (the last one part drawn) standing on (x, y), and the cursor at the end of the newest stroke
  const typed = (n, [x, y], { tilt = 0, on = true } = {}) => c => {
    c.save(); c.translate(x, y); c.rotate(tilt); c.lineCap = c.lineJoin = 'round'; c.lineWidth = 4.5;
    let end = [-27, 0];
    HAT.forEach(([a, b], i) => {
      const t = Math.min(1, n - i); if (t <= 0) return;
      end = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      c.strokeStyle = i === 4 ? RED : CREAM; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(end[0], end[1]); c.stroke();
    });
    if (on) { c.fillStyle = CREAM; c.fillRect(Math.round(end[0]) + 7, Math.round(end[1]) - 20, 4, 24); }
    c.restore();
  };
  const he = (o, face, front, extra = {}) => xf(D.N, { dx: AT, ...o, face, extra: { front, ...extra } });
  const blink = (name, times, o, face, n, at, opt = {}) => { for (let i = 0; i < times; i++) { k.add(name + 'on', 6, he(o, face, typed(n, at, opt))); k.add(name + 'off', 6, he(o, face, typed(n, at, { ...opt, on: false }))); } };
  const watch = kit.look(-7, 3, 'o'), glad = kit.look(-6, 3, 'smile');

  kit.walk(0, AT, 4, { face: kit.look(0, 0, 'smile') }).forEach((o, i) => k.add('go' + i, 2, xf(D.N, o)));
  blink('wait', 1, {}, kit.look(-7, 3, 'flat'), 0, GROUND);
  for (let i = 0; i < HAT.length; i++) [0.5, 1, 1].forEach((t, j) => k.add('type' + i + j, 2, he({}, i < 3 ? watch : glad, typed(i + t, GROUND))));
  blink('made', 1, {}, glad, 5, GROUND);
  // his left arm goes out to the brim, and the hat rides up to his head with the hand under it
  const sh = [90 + AT, 140], ride = kit.steps(0, 1, 5).map(t => [GROUND[0] + (HEAD[0] - GROUND[0]) * t, GROUND[1] + (HEAD[1] - GROUND[1]) * t - 40 * Math.sin(t * Math.PI)]);
  k.add('grab', 2, he({ rot: -0.05 }, glad, typed(5, GROUND), { arm: [sh, [96, 158]] }));
  ride.slice(1).forEach((p, i) => k.add('lift' + i, 2, he({ rot: -0.05 * (1 - i / 3) }, FACE.happy, typed(5, p, { tilt: -0.1 * (i + 1) / 4 }), { arm: [sh, [Math.max(96, p[0] - 30), Math.min(158, p[1] + 6)]] })));
  const worn = { tilt: -0.1 };
  blink('wear', 1, {}, kit.look(0, -5, 'smile'), 5, HEAD, worn);
  k.add('small', 10, he({}, kit.look(4, -5, 'flat'), typed(5, HEAD, worn)));
  for (let n = 4; n >= 0; n--) k.add('del' + n, 6, he({}, n > 2 ? kit.look(4, -5, 'o') : kit.faces.sad, typed(n, HEAD, worn)));
  k.add('bare', 6, he({}, kit.faces.sad, typed(0, HEAD, { ...worn, on: false })));
  k.add('oh', 12, he({}, kit.look(0, 0, 'flat')));
  kit.walk(AT, 0, 4, { face: kit.look(0, 0, 'flat') }).forEach((o, i) => k.add('back' + i, 2, xf(D.N, o)));
  k.done();
})();
