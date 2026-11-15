// He runs off, then skates across three times: far off and small, mid-size, then huge and close. An empty beat, and he strolls back in with the board under his arm.
(() => {
  const { xf, D, FACE, kit } = window.__lump, { CREAM, RED, GREY, TAU } = kit;
  const k = kit.clip('skateboard');
  const size = s => ({ len: 116 * s, th: Math.max(5, 9 * s), wr: Math.max(3.5, 8 * s) });
  // a board with its deck centred on (x, y), s times life size, turned by rot: side on, or (as face goes to 1) seen from underneath
  const board = (c, x, y, s = 1, rot = 0, face = 0) => {
    const { len, wr } = size(s), th = size(s).th + (24 - size(s).th) * face;
    c.save(); c.translate(x, y); c.rotate(rot); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = s < 0.5 ? 1.6 : 2.6;
    c.fillStyle = GREY; [-0.32, 0.32].forEach(u => (face > 0.5 ? [-th / 2, th / 2] : [th / 2 + wr]).forEach(v => { c.beginPath(); c.arc(u * len, v, wr, 0, TAU); c.fill(); c.stroke(); }));
    c.fillStyle = RED; c.beginPath(); c.roundRect(-len / 2, -th / 2, len, th, th / 2); c.fill(); c.stroke();
    c.restore();
  };
  const streaks = (c, x, ys, len, dir, w = 3) => {
    c.save(); c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = w;
    c.beginPath(); ys.forEach((y, i) => { c.moveTo(x, y); c.lineTo(x - dir * len * (i % 2 ? 0.7 : 1), y); }); c.stroke(); c.restore();
  };
  const ground = (c, y) => { c.save(); c.strokeStyle = GREY; c.lineWidth = 3; c.beginPath(); c.moveTo(0, y); c.lineTo(240, y); c.stroke(); c.restore(); };
  // him riding along ground height gy at x, s times life size, heading dir (-1 left, 1 right)
  const ride = (x, gy, s, dir, line) => {
    const { th, wr } = size(s), deck = gy - 2 * wr - th / 2;
    return xf(D.N, { k: s, dx: x - 128, dy: deck - th / 2 + 3 * s - 201, rot: 0.1 * dir, shadowK: 0, face: FACE.happy,
      extra: { back: c => line && ground(c, gy), front: c => { board(c, x, deck, s); streaks(c, x - dir * (64 * s + 6), [deck - 90 * s, deck - 50 * s, deck - 14 * s], 14 + 30 * s, dir, s > 1 ? 5 : 3); } } });
  };

  k.add('lean', 2, xf(D.N, { rot: -0.14, kx: 1.04, ky: 0.95, face: kit.look(5, 0, 'smile') }));
  [45, 135].forEach((dx, i) => k.add('dash' + i, 2, xf(D.N, { dx, rot: 0.2, shadowK: 0.8, face: kit.look(5, 0, 'open'), extra: { front: c => streaks(c, 128 + dx - 70, [110, 140, 172], 34, 1) } })));
  for (let i = 0; i < 8; i++) k.add('far' + i, 2, ride(252 - i * 37.7, 80, 0.3, -1, true));
  for (let i = 0; i < 6; i++) k.add('mid' + i, 2, ride(-30 + i * 60, 158, 0.62, 1, true));
  [215, 75, -65, -205].forEach((dx, i) => k.add('near' + i, 2, ride(128 + dx, 273, 1.9, -1, false)));
  k.add('empty', 6, kit.gone());
  // under his arm: the board up on end at his side, his arm over it
  const carry = (dx, bx = 184, by = 150, rot = -1.25, hand = [180, 168], face = 1) => (c, d, seed) => { board(c, bx + dx, by, 0.8, rot, face); if (hand) kit.arm(c, [[166 + dx, 140], [hand[0] + dx, hand[1]]], seed + 99); };
  kit.walk(-205, 0, 7).forEach((o, i) => k.add('in' + i, 2, xf(D.N, { ...o, face: kit.look(4, 0, 'smile'), extra: { front: carry(o.dx) } })));
  k.add('here', 6, xf(D.N, { face: FACE.happy, extra: { front: carry(0) } }));
  // he sets it down and it rolls away
  k.add('down0', 2, xf(D.N, { face: kit.look(5, 3, 'smile'), extra: { front: carry(0, 198, 172, -0.6, [188, 164], 0.4) } }));
  k.add('down1', 2, xf(D.N, { face: kit.look(6, 4, 'smile'), extra: { front: carry(0, 214, 190, 0, null, 0) } }));
  k.add('down2', 2, xf(D.N, { face: kit.look(6, 3, 'smile'), extra: { front: carry(0, 246, 190, 0, null, 0) } }));
  k.add('down3', 2, xf(D.N, { face: kit.look(6, 2, 'smile'), extra: { front: carry(0, 300, 190, 0, null, 0) } }));
  k.done();
})();
