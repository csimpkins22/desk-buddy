// Shadow puppets: in a patch of light he makes a bird, then a rabbit, then a monster that frightens its own maker.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const LAMP = '#FFD23F', DARK = '#17161A', LX = 194, LY = 94, LR = 43;
  const pleased = [['dot',122,110,3.8], ['dot',146,108,3.8], ['stroke',[[124,122],[131,127],[139,122]],2.8]];
  const rawr = [['stroke',[[110,100],[122,104]],3], ['stroke',[[138,102],[150,98]],3], ['dot',121,111,3.6], ['dot',145,109,3.6], ['mouth',[[122,120],[140,119],[139,130],[131,134],[123,130]]]];
  const tri = (c, pts) => { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); };
  const blob = (c, x, y, rx, ry, rot = 0) => { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); c.fill(); };
  const eye = (c, x, y, r) => { c.fillStyle = LAMP; blob(c, x, y, r, r); c.fillStyle = DARK; };
  const bird = up => c => {
    blob(c, 2, 4, 18, 9); blob(c, -17, -3, 8, 8);
    tri(c, [[-23, -6], [-35, -1], [-23, 2]]); tri(c, [[14, 0], [33, -8], [31, 10]]);
    tri(c, up ? [[-8, 2], [8, -32], [14, 2]] : [[-8, 6], [10, 32], [14, 6]]);
    eye(c, -19, -5, 2.2);
  };
  const rabbit = flop => c => {
    blob(c, 0, 12, 17, 15); blob(c, 2, 44, 26, 20);
    blob(c, -8, -17, 6.5, 19, -0.15); flop ? blob(c, 17, -9, 6.5, 18, 1) : blob(c, 9, -17, 6.5, 19, 0.2);
    eye(c, -7, 9, 2.6);
  };
  const monster = k => c => {
    c.scale(k, k);
    blob(c, 0, 8, 34, 32); tri(c, [[-30, -4], [-36, -40], [-10, -20]]); tri(c, [[30, -4], [36, -40], [10, -20]]);
    c.fillStyle = LAMP;
    tri(c, [[-22, -8], [-6, 0], [-20, 4]]); tri(c, [[22, -8], [6, 0], [20, 4]]);
    tri(c, [[-22, 14], [-15, 22], [-8, 14], [-1, 22], [6, 14], [13, 22], [22, 14], [16, 30], [0, 34], [-16, 30]]);
  };
  const light = (shape, r = LR) => (c, d, seed) => {
    c.save(); c.fillStyle = LAMP; c.beginPath(); c.arc(LX, LY, r, 0, Math.PI * 2); c.fill();
    if (shape) { c.clip(); c.fillStyle = DARK; c.translate(LX, LY); shape(c); }
    c.restore();
  };
  const HANDS = { arm: [[138, 152], [162, 140]], arm2: [[142, 136], [164, 116]] }, CLAWS = { arm: [[138, 148], [164, 128]], arm2: [[140, 132], [160, 102]] };
  const at = (shape, face, hands = HANDS, o = {}) => xf(D.N, { dx: -24, face, ...o, extra: { ...hands, back: light(shape), ...o.extra } });
  D.shadow_puppets_in = xf(D.N, { dx: -12, rot: -0.04, face: FACE.lookr, extra: { back: light(null, 22) } });
  D.shadow_puppets_0 = at(null, FACE.lookr, {});
  D.shadow_puppets_b1 = at(bird(true), pleased);
  D.shadow_puppets_b2 = at(bird(false), pleased, { arm: [[138, 152], [162, 144]], arm2: [[142, 136], [164, 122]] });
  D.shadow_puppets_r1 = at(rabbit(false), FACE.happy, { arm2: [[142, 136], [162, 108]] });
  D.shadow_puppets_r2 = at(rabbit(true), FACE.happy, { arm2: [[142, 136], [165, 112]] });
  D.shadow_puppets_m1 = at(monster(0.6), rawr, CLAWS);
  D.shadow_puppets_m2 = at(monster(1.02), rawr, CLAWS, { rot: 0.04 });
  D.shadow_puppets_m3 = at(monster(1.02), FACE.shock, CLAWS, { dx: -34, ky: 0.86, kx: 1.08, extra: { fxm: 'alert', fx: [86, 64] } });
  D.shadow_puppets_m4 = at(monster(1.02), FACE.shock, CLAWS, { dx: -38, rot: -0.05 });
  D.shadow_puppets_m5 = at(monster(1.02), FACE.shock, CLAWS, { dx: -34, rot: -0.02 });
  D.shadow_puppets_e = at(null, FACE.sheep, {});
  const flap = [['shadow_puppets_b1', 4], ['shadow_puppets_b2', 4]], ears = [['shadow_puppets_r1', 5], ['shadow_puppets_r2', 5]], shake = [['shadow_puppets_m4', 2], ['shadow_puppets_m5', 2]];
  CLIPS.shadow_puppets = { home: 'idle', seq: [...WAKE, ['shadow_puppets_in', 3], ['shadow_puppets_0', 6], ...flap, ...flap, ...flap, ...ears, ...ears,
    ['shadow_puppets_m1', 5], ['shadow_puppets_m2', 7], ['shadow_puppets_m3', 3], ...shake, ...shake, ...shake, ['shadow_puppets_e', 12], ['shadow_puppets_in', 3], ...DOZE] };
})();
