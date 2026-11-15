// Metronome: a metronome ticks beside him; he sways in time, his eyes follow it, and he ends up hypnotised.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('metronome'), { CREAM, BROWN, YELLOW, GREY, TAU } = kit;
  const o = { k: 0.9, dx: -34 };
  const metro = (c, a, dx = 0) => {
    c.save(); c.translate(196 + dx, 0); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.8;
    c.fillStyle = BROWN; c.beginPath(); c.moveTo(-20, 200); c.lineTo(20, 200); c.lineTo(9, 132); c.lineTo(-9, 132); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = GREY; c.beginPath(); c.roundRect(-22, 192, 44, 9, 3); c.fill(); c.stroke();
    c.translate(0, 186); c.rotate(a);
    c.lineWidth = 3.4; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -66); c.stroke();
    c.lineWidth = 2.4; c.fillStyle = YELLOW; c.beginPath(); c.roundRect(-7, -50, 14, 12, 3); c.fill(); c.stroke();
    c.restore();
  };
  const eyes = e => [['dot', 118 + e, 110, 3.8], ['dot', 142 + e, 108, 3.8], ['stroke', [[123, 124], [128, 126], [133, 124]], 2.6]];
  const beat = (face, s, sway, dx = 0) => xf(D.N, { ...o, rot: sway * s * 0.07, face, extra: { front: c => metro(c, s * 0.4, dx) } });
  [60, 28].forEach((dx, i) => k.add('in' + i, 2, beat(FACE.lookr, 0, 0, dx)));
  const cycle = (tag, face, sway) => [[-1, 4], [0, 2], [1, 4], [0, 2]].forEach(([s, t], i) => {
    const id = tag + (i === 3 ? 1 : i);
    k.add(id, t, i === 3 || !face ? undefined : beat(typeof face === 'function' ? face(s) : face, s, sway));
  });
  cycle('tick', FACE.lookr, 0);
  cycle('sway', FACE.happy, 1);
  cycle('eye', s => eyes(s * 7), 1); cycle('eye');
  cycle('hyp', FACE.spiral, 1.4); cycle('hyp');
  [28, 60].forEach((dx, i) => k.add('out' + i, 2, beat(FACE.spiral, 0, 0, dx)));
  k.add('end', 4, xf(D.N, { ...o, face: FACE.spiral }));
  k.done();
})();
