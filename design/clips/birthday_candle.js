// Birthday candle: a cake with one candle slides in; he blows it out, it relights, he blows harder and gets icing on his face.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('birthday_candle'), { CREAM, BROWN, WHITE, BLUE, YELLOW, RED, GREY, TAU } = kit;
  const o = { k: 0.9, dx: -42 };
  const ink = (c, w = 2.8) => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = w; };
  // flame: 0 out, 1 small, 2 full, 3 blown sideways; smoke rises from a dead wick; iced false once the icing has gone
  const cake = (c, seed, x, flame, smoke = false, iced = true) => {
    kit.table(c, x, seed, { y: 172, w: 70 });
    ink(c); c.fillStyle = BROWN; c.beginPath(); c.roundRect(x - 24, 142, 48, 25, 4); c.fill(); c.stroke();
    if (iced) { c.fillStyle = WHITE; c.beginPath(); c.roundRect(x - 26, 136, 52, 12, 6); c.fill(); c.stroke(); }
    c.fillStyle = BLUE; c.beginPath(); c.roundRect(x - 4, 114, 8, 23, 2); c.fill(); c.stroke();
    if (flame) {
      const h = [0, 8, 15, 9][flame], lean = flame === 3 ? 12 : 0;
      c.fillStyle = flame === 1 ? RED : YELLOW; c.lineWidth = 2.2; c.beginPath(); c.moveTo(x - 5, 110); c.quadraticCurveTo(x - 5 + lean, 110 - h * 0.6, x + lean, 110 - h); c.quadraticCurveTo(x + 6 + lean, 110 - h * 0.5, x + 5, 110); c.closePath(); c.fill(); c.stroke();
    }
    if (smoke) kit.fade(c, 0.6, () => kit.puff(c, x + 3, 98, seed, 6, GREY));
  };
  const gust = (c, [x, y], n, len) => { ink(c, 3.2); for (let i = 0; i < n; i++) { c.beginPath(); c.moveTo(x + 14, y - 8 + i * 9 - n * 2); c.lineTo(x + 14 + len - i % 2 * 10, y - 12 + i * 7 - n * 3); c.stroke(); } };
  const shot = (face, more, fn) => { const p = { ...o, ...more }; return xf(D.N, { ...p, face, extra: { front: (c, d, seed) => fn(c, seed, kit.pt(p, [130, 124]), p) } }); };
  const X = 190;
  [262, 222].forEach((x, i) => k.add('in' + i, 2, shot(FACE.lookr, {}, (c, s) => cake(c, s, x, 2))));
  k.add('see', 6, shot(FACE.happy, { ky: 1.03 }, (c, s) => cake(c, s, X, 2)));
  k.add('breath', 4, shot(FACE.puff, { rot: -0.06, ky: 1.05 }, (c, s) => cake(c, s, X, 2)));
  k.add('blow', 4, shot(FACE.choo, { rot: 0.07 }, (c, s, m) => { cake(c, s, X, 3); gust(c, m, 2, 34); }));
  k.add('dark', 6, shot(FACE.happy, {}, (c, s) => cake(c, s, X, 0, true)));
  k.add('spark', 2, shot(FACE.happy, {}, (c, s) => cake(c, s, X, 1)));
  k.add('relit', 6, shot(FACE.shock, { ky: 0.97 }, (c, s) => { cake(c, s, X, 2); kit.mark(c, '!', 60, 62, 1); }));
  k.add('breath2', 4, shot(FACE.puff, { rot: -0.12, ky: 1.1, kx: 1.05 }, (c, s) => cake(c, s, X, 2)));
  k.add('blast', 2, shot(FACE.choo, { rot: 0.14 }, (c, s, m) => { cake(c, s, X, 3); gust(c, m, 4, 46); }));
  const face1 = p => kit.pt(p, [110, 102]), face2 = p => kit.pt(p, [146, 124]);
  k.add('splash', 2, shot(FACE.choo, { rot: 0.08 }, (c, s, m, p) => { cake(c, s, X, 0, true, false); kit.puff(c, 166, 124, s, 9, WHITE); kit.puff(c, 150, 144, s + 1, 7, WHITE); }));
  const iced = (n, t, more, x, a = 1) => k.add(n, t, shot(FACE.grump, more, (c, s, m, p) => { cake(c, s, x, 0, x === X, false); kit.fade(c, a, () => { kit.puff(c, ...face1(p), s, 11, WHITE); kit.puff(c, ...face2(p), s + 1, 9, WHITE); }); }));
  iced('hit', 2, { rot: -0.06, ky: 0.95, kx: 1.04 }, X);
  iced('iced', 12, {}, X);
  iced('out0', 2, {}, 222, 0.65); iced('out1', 2, {}, 262, 0.3);
  k.add('end', 4, xf(D.N, { ...o, face: FACE.grump }));
  k.done();
})();
