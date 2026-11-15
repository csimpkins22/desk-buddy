// Mirror: he waves into a standing mirror; his reflection waves late, then pulls a face he didn't make.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('mirror'), { CREAM, BROWN, WHITE } = kit;
  const tongue = [...FACE.chooEyes, ['mouth', [[118, 119], [128, 131], [138, 119]], [128, 129, 6, 5]]];
  const o = { k: 0.9, dx: -56 }, S = kit.pt(o, [166, 140]), RS = kit.pt({ k: 0.6 }, [166, 140]);
  const refl = (face, hand) => kit.flip(xf(D.N, { k: 0.6, face, extra: hand ? { arm2: [RS, hand] } : {} }));
  const R = { still: refl(FACE.lookr), a: refl(FACE.happy, [163, 138]), b: refl(FACE.happy, [168, 150]), face: refl(tongue) };
  const glass = c => { c.beginPath(); c.roundRect(148, 98, 78, 100, 10); };
  const mirror = (r, a) => (c, d, seed) => kit.fade(c, a, () => {
    c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#22303C'; glass(c); c.fill();
    c.save(); glass(c); c.clip(); kit.twin(c, r, seed, 60, -6); c.restore();
    c.strokeStyle = CREAM; c.lineWidth = 7; glass(c); c.stroke();
    c.strokeStyle = BROWN; c.lineWidth = 3; glass(c); c.stroke();
    c.strokeStyle = WHITE; c.lineWidth = 3; c.globalAlpha *= 0.5; c.beginPath(); c.moveTo(158, 116); c.lineTo(168, 106); c.stroke();
  });
  const sc = (face, r, { hand, a = 1, ky = 1, dx = -56 } = {}) => xf(D.N, { k: 0.9, dx, ky, face, extra: { ...(hand ? { arm2: [S, hand] } : {}), back: mirror(r, a) } });

  k.add('in0', 2, sc(FACE.lookr, R.still, { a: 0.4 }));
  k.add('in1', 2, sc(FACE.lookr, R.still, { a: 0.8 }));
  k.add('look', 6, sc(FACE.lookr, R.still));
  k.add('wa', 4, sc(FACE.happy, R.still, { hand: [128, 110] }));
  k.add('wb', 4, sc(FACE.happy, R.still, { hand: [136, 124] }));
  k.add('wa', 4); k.add('wb', 4);
  k.add('huh', 8, sc(FACE.lookr, R.still));
  k.add('ra', 4, sc(FACE.lookr, R.a));
  k.add('rb', 4, sc(FACE.lookr, R.b));
  k.add('ra', 4);
  k.add('face', 6, sc(FACE.lookr, R.face));
  k.add('shock', 14, sc(FACE.shock, R.face, { ky: 1.04 }));
  k.add('out0', 2, sc(FACE.shock, R.face, { a: 0.6, dx: -38 }));
  k.add('out1', 2, sc(FACE.shock, R.face, { a: 0.3, dx: -18 }));
  k.done();
})();
