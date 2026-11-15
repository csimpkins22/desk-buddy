// Foam rises from the bottom of the screen and floats him up; he pops bubbles, ducks under, and it drains away leaving a tall foam hat he dozes off in.
(() => {
  const { D, xf, FACE, kit } = window.__lump, { TAU } = kit;
  const k = kit.clip('bubble_bath_b');
  const TOP = 92, B = [[50, 46, 11], [198, 44, 12], [174, 28, 10]];

  // foam filling the screen below `level`; its scalloped top shifts with `ph` so it seems to fizz
  const foam = (c, level, ph) => {
    if (level > 238) return;
    c.save(); c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-40, 250); c.lineTo(-40, level);
    for (let x = -36 + (ph % 2) * 12; x < 250; x += 24) c.arc(x + 12, level, 12, Math.PI, TAU);
    c.lineTo(270, 250); c.closePath();
    c.fillStyle = kit.WHITE; c.fill(); c.strokeStyle = kit.GREY; c.lineWidth = 2.6; c.stroke();
    c.strokeStyle = '#C9DDF0'; c.lineWidth = 2.4;
    [[30, 30, 9], [92, 52, 7], [150, 28, 10], [208, 56, 8], [120, 84, 7], [54, 96, 9], [186, 102, 8]].forEach(([x, dy, r]) => {
      if (level + dy < 232) { c.beginPath(); c.arc(x + (ph % 2) * 4, level + dy, r, 0, TAU); c.stroke(); }
    });
    c.restore();
  };
  const bubble = (c, x, y, r) => {
    c.save(); c.fillStyle = '#1F3550'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.stroke();
    c.strokeStyle = kit.WHITE; c.lineWidth = 2.4; c.lineCap = 'round'; c.beginPath(); c.arc(x, y, r * 0.55, -2.4, -1.5); c.stroke(); c.restore();
  };
  const burst = (c, x, y, r) => {
    c.save(); c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath();
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + 0.3; c.moveTo(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7); c.lineTo(x + Math.cos(a) * r * 1.5, y + Math.sin(a) * r * 1.5); }
    c.stroke(); c.restore();
  };
  // three blobs of foam stacked on his head, standing on the root of his cowlick
  const hat = (c, d, seed, rot = 0) => {
    const [x, y] = d.curl[0];
    c.save(); c.translate(x, y); c.rotate(rot); c.fillStyle = kit.WHITE; c.strokeStyle = kit.GREY; c.lineWidth = 2.6;
    [[0, -6, 19], [3, -27, 14], [-1, -44, 10], [1, -57, 6]].forEach(([bx, by, r], i) => { c.beginPath(); c.arc(bx + (seed + i) % 2, by, r, 0, TAU); c.fill(); c.stroke(); });
    c.restore();
  };
  // he stands until the foam is past his middle, then floats on it, a little smaller so his head stays on screen
  const pose = level => { const f = Math.min(201, level + 50); return { k: 1 - 0.1 * Math.min(1, (201 - f) / 59), dy: f - 201, shadowK: f < 201 ? 0 : 1 }; };

  kit.steps(232, TOP, 10).forEach((lv, i) => k.add('rise' + i, 2, xf(D.N, { ...pose(lv), face: i < 5 ? kit.look(0, 5, 'o') : kit.faces.wide, extra: { front: c => foam(c, lv, i) } })));

  const float = (n, { face = FACE.happy, alive = [0, 1, 2], pop, arm, arm2 } = {}) => {
    const lv = TOP + (n % 2) * 3, o = pose(lv);
    return xf(D.N, { ...o, face, extra: { ...(arm && { arm: [kit.pt(o, [90, 140]), arm] }), ...(arm2 && { arm2: [kit.pt(o, [166, 140]), arm2] }),
      front: c => { foam(c, lv, n); alive.forEach(j => bubble(c, ...B[j])); if (pop !== undefined) burst(c, ...B[pop]); } } });
  };
  kit.steps(0, 1, 3).forEach((t, i) => k.add('up' + i, 2, xf(D.N, { ...pose(TOP), face: FACE.happy,
    extra: { front: c => { foam(c, TOP, i); B.forEach(([x, y, r]) => bubble(c, x, 84 + (y - 84) * t, r * (0.4 + 0.6 * t))); } } })));

  const hand = (j, f = 1) => {
    const sh = kit.pt(pose(TOP), j ? [166, 140] : [90, 140]), [x, y, r] = B[j], len = Math.hypot(x - sh[0], y - sh[1]), u = f * (len - r + 2) / len;
    return [sh[0] + (x - sh[0]) * u, sh[1] + (y - sh[1]) * u];
  };
  [0, 1, 2].forEach(j => {
    const alive = [0, 1, 2].filter(i => i >= j), side = j ? 'arm2' : 'arm', eyes = kit.look(j ? 5 : -5, -4, 'smile');
    k.add('reach' + j, 2, float(0, { face: eyes, alive, [side]: hand(j, 0.6) }));
    k.add('touch' + j, 2, float(1, { face: eyes, alive, [side]: hand(j) }));
    k.add('pop' + j, 4, float(0, { alive: alive.slice(1), pop: j, [side]: hand(j) }));
    k.add('after' + j, 2, float(1, { alive: alive.slice(1), [side]: hand(j, 0.6) }));
  });

  [172, 208, 244].forEach((f, i) => k.add('duck' + i, i === 2 ? 6 : 2, xf(D.N, { k: 0.9, dy: f - 201, shadowK: 0, face: kit.faces.closed, extra: { front: c => foam(c, TOP, i) } })));

  // the foam drains: he comes up through it wearing some, rides it down and lands
  [[102, 244, 0.9, kit.faces.closed], [116, 205, 0.93, kit.faces.closed], [134, 188, 0.96, kit.faces.wide], [152, 201, 1, kit.look(0, -5, 'o'), 0.88, 1.07],
   [174, 201, 1, kit.look(0, -5, 'o'), 1.03, 0.98], [197, 201, 1, kit.look(0, -5, 'o')], [220, 201, 1, kit.look(0, -5, 'flat')]].forEach(([lv, f, s, face, ky = 1, kx = 1], i) =>
    k.add('drain' + i, 2, xf(D.N, { k: s, ky, kx, dy: f - 201, shadowK: f < 201 ? 0 : 1, face, extra: { front: (c, d, seed) => { hat(c, d, seed); foam(c, lv, i); } } })));
  k.add('hatlook', 8, xf(D.N, { face: kit.look(0, -5, 'flat'), extra: { front: (c, d, seed) => hat(c, d, seed) } }));
  k.add('proud', 8, xf(D.N, { face: kit.faces.closed, extra: { front: (c, d, seed) => hat(c, d, seed) } }));
  k.add('nod', 8, xf(D.T1, { extra: { front: (c, d, seed) => hat(c, d, seed) } }));
  k.add('tip', 6, xf(D.T2, { extra: { front: (c, d, seed) => hat(c, d, seed, 0.45) } }));
  k.add('asleep', 16, xf(D.S1, { extra: { fxm: 'idle', front: (c, d, seed) => hat(c, d, seed, 0.8) } }));
  k.done({ doze: false });
})();
