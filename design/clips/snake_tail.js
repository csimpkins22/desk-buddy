// Snake tail: he eats a dot and grows a segment behind him, eats another and grows again, then turns round and bumps into his own tail.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, tint } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', TAU = Math.PI * 2, P = 'snake_tail_', DOTS = [112, 184];
  const open = [['dot',124,106,4.2], ['dot',148,104,4.2], ['mouth',[[126,116],[144,115],[146,131],[135,137],[124,131]]]];
  const chomp = [...FACE.aahEyes, ['stroke',[[120,123],[128,127],[136,123]],2.8], ['blush',104,120,8,5], ['blush',152,118,8,5]];
  const oof = [...FACE.chooEyes, ['mouth',[[121,118],[135,117],[137,131],[128,136],[119,131]]]];
  const rays = (c, x, y, r0, r1, n) => { for (let k = 0; k < n; k++) { const a = k * TAU / n + 0.4; c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); } };
  // eaten: how many dots are gone; segs: each piece of tail as [x, radius]; star: where he bumps it; puffs: where pieces have just popped
  const scene = (eaten, segs = [], { star, puffs = [] } = {}) => ({
    back: c => {
      c.save(); c.strokeStyle = CREAM; c.lineCap = 'round';
      DOTS.slice(eaten).forEach(x => { c.fillStyle = YELLOW; c.lineWidth = 2.4; c.beginPath(); c.arc(x, 155, 8, 0, TAU); c.fill(); c.stroke(); });
      segs.forEach(([x, r]) => { c.fillStyle = tint(); c.lineWidth = 3.4; c.beginPath(); c.arc(x, 200 - r, r, 0, TAU); c.fill(); c.stroke(); });
      c.lineWidth = 2.6; c.beginPath(); puffs.forEach(x => rays(c, x, 178, 10, 22, 6)); c.stroke();
      c.restore();
    },
    front: c => {
      if (!star) return;
      c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3; c.beginPath(); rays(c, star[0], star[1], 6, 17, 7); c.stroke(); c.restore();
    },
  });
  const seq = [...WAKE];
  let n = 0;
  const add = (ticks, o, s) => { D[P + n] = xf(D.N, { ...o, extra: s }); seq.push([P + n++, ticks]); };
  const head = (x, o) => ({ k: 0.62, dx: x - 128, ...o });
  const gulp = { face: chomp, kx: 1.1, ky: 0.92 }, one = x => [[x - 56, 25]], two = x => [[x - 56, 25], [x - 102, 20]];
  add(2, { k: 0.8, dx: -40, face: FACE.lookr }, scene(0));
  add(4, head(46, { face: FACE.lookr }), scene(0));
  add(2, head(70, { face: open }), scene(0));
  add(3, head(94, gulp), scene(1));
  add(2, head(94, { face: chomp }), scene(1, [[44, 12]], { puffs: [44] }));
  add(3, head(94, { face: FACE.lookr }), scene(1, one(94)));
  add(2, head(118, { face: FACE.lookr }), scene(1, one(118)));
  add(2, head(142, { face: open }), scene(1, one(142)));
  add(3, head(166, gulp), scene(2, one(166)));
  add(2, head(166, { face: chomp }), scene(2, [[110, 25], [68, 10]], { puffs: [68] }));
  add(3, head(166, { face: FACE.lookr }), scene(2, two(166)));
  add(2, head(181, { face: FACE.lookr }), scene(2, two(181)));
  add(6, head(196, { face: FACE.happy }), scene(2, two(196)));
  // a negative kx turns him to face the other way
  add(6, head(196, { face: FACE.happy, kx: -1 }), scene(2, two(196)));
  add(5, head(182, { face: oof, kx: -0.8 }), scene(2, [[136, 25], [90, 20]], { star: [160, 158] }));
  add(2, head(190, { face: FACE.spiral, kx: -1, rot: 0.1 }), scene(2, [[136, 25], [90, 20]]));
  add(3, head(190, { face: FACE.spiral, kx: -1, rot: -0.08 }), scene(2, [], { puffs: [136, 90] }));
  add(4, head(190, { face: FACE.spiral, kx: -1, rot: 0.08 }), scene(2));
  add(4, head(190, { face: FACE.spiral, kx: -1, rot: -0.08 }), scene(2));
  add(2, { k: 0.8, dx: 36, face: FACE.spiral }, scene(2));
  add(4, { face: FACE.spiral, rot: 0.04 }, scene(2));
  add(7, { face: FACE.sheep }, scene(2));
  CLIPS.snake_tail = { home: 'idle', seq: [...seq, ...DOZE] };
})();
