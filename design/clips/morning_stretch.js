// Morning stretch: arms up and a yawn that keeps growing until he is nearly all mouth, then he snaps back.
// group: clock
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const shut = [['stroke',[[106,95],[113,99],[120,95]],3], ['stroke',[[138,93],[145,97],[152,93]],3]];
  const yawn = (w, h) => [...shut, ['mouth', [[132 - w, 110], [132 + w, 109], [132 + w * 1.12, 110 + h * 0.5], [132 + w * 0.7, 110 + h * 0.92], [132, 110 + h], [132 - w * 0.7, 110 + h * 0.92], [132 - w * 1.12, 110 + h * 0.5]],
    [132, 110 + h * 0.84, w * 0.62, h * 0.2]]];
  const dazed = [['dot',114,108,4.4], ['dot',142,106,4.4], ['dot',128,124,2.6]];
  // where a point on him standing ends up once he is stretched, so his arms stay on his shoulders
  const on = (o, [x, y]) => { const u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1), r = o.rot || 0; return [128 + u * Math.cos(r) - v * Math.sin(r), 201 + u * Math.sin(r) + v * Math.cos(r)]; };
  const stretch = (o, w, h, reach) => xf(D.N, { ...o, face: w ? yawn(w, h) : D.Y3.face, extra: {
    arm: [on(o, [90, 124]), on(o, [90 - 26 + reach * 0.25, 124 - reach])], arm2: [on(o, [168, 124]), on(o, [168 + 26 - reach * 0.25, 124 - reach])] } });
  D.morning_stretch_1 = stretch({}, 0, 0, 4);
  D.morning_stretch_2 = stretch({ ky: 1.08, kx: 0.95 }, 9, 14, 22);
  D.morning_stretch_3 = stretch({ ky: 1.16, kx: 0.9 }, 17, 30, 38);
  D.morning_stretch_4 = stretch({ ky: 1.24, kx: 0.87, rot: -0.03 }, 26, 52, 50);
  D.morning_stretch_5 = stretch({ ky: 1.3, kx: 0.85, rot: -0.06 }, 36, 80, 62);
  D.morning_stretch_6 = stretch({ ky: 1.33, kx: 0.84, rot: -0.03 }, 39, 84, 66);
  D.morning_stretch_7 = xf(D.N, { ky: 0.76, kx: 1.2, face: dazed });
  D.morning_stretch_8 = xf(D.N, { ky: 1.06, kx: 0.97, face: dazed });
  D.morning_stretch_9 = xf(D.N, { face: D.Y3.face });
  const quiver = [['morning_stretch_5', 3], ['morning_stretch_6', 3]];
  CLIPS.morning_stretch = { home: 'idle', seq: [...WAKE, ['morning_stretch_1', 6], ['morning_stretch_2', 4], ['morning_stretch_3', 4], ['morning_stretch_4', 5],
    ...quiver, ...quiver, ...quiver, ...quiver, ['morning_stretch_7', 4], ['morning_stretch_8', 3], ['morning_stretch_9', 6], ['C1', 12], ...DOZE] };
})();
