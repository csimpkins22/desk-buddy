// Hot potato: a steaming potato drops into his hands; he juggles it nub to nub, blows on it, and takes a pleased bite.
(() => {
  const { D, xf, FACE, tint, kit } = window.__lump, k = kit.clip('hot_potato');
  const potato = (c, x, y, seed, { steam = true, bite = false, a = 1 } = {}) => kit.fade(c, a, () => {
    c.save(); c.translate(x, y); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.fillStyle = kit.BROWN; c.beginPath(); c.ellipse(0, 0, 15, 11, 0.3, 0, kit.TAU); c.fill(); c.stroke();
    c.fillStyle = '#9A7434'; [[-4, -3], [5, 2]].forEach(([px, py]) => { c.beginPath(); c.arc(px, py, 2.4, 0, kit.TAU); c.fill(); });
    if (bite) { c.fillStyle = tint(); c.beginPath(); c.arc(-14, -3, 7, 0, kit.TAU); c.fill(); c.beginPath(); c.arc(-14, -3, 7, -1.2, 1.4); c.stroke(); }
    c.restore();
    if (steam) kit.steam(c, x, y - 16, seed);
  });
  const blow = (c, off) => { c.save(); c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 3; c.globalAlpha = 0.7;
    [[-6, 0], [5, 3]].forEach(([dy, dx]) => { c.beginPath(); c.moveTo(150 + off + dx, 118 + dy); c.lineTo(162 + off + dx, 115 + dy); c.stroke(); }); c.restore(); };
  const H = (o, [lh, rh], p, opt, puffOff) => xf(D.N, { ...o, extra: { arm: [[90, 140], [68, lh]], arm2: [[166, 140], rh.length ? rh : [188, rh]],
    front: (c, d, seed) => { if (puffOff !== undefined) blow(c, puffOff); potato(c, p[0], p[1], seed, opt); } } });

  k.add('ready', 4, H({ face: FACE.lookup }, [124, 124], [190, -14], { steam: false }));
  kit.steps(-14, 106, 6).slice(1).forEach((y, i) => k.add('drop' + i, 2, H({ face: FACE.lookup }, [124, 124], [190, y], { steam: false })));
  k.add('catch', 2, H({ face: FACE.shock, ky: 0.93, kx: 1.04 }, [128, 130], [190, 114]));
  [1, -1].forEach((dir, n) => [0.2, 0.4, 0.6, 0.8, 1].forEach((t, i) => {
    const u = dir > 0 ? t : 1 - t, x = 190 - 124 * u, y = 108 - 200 * t * (1 - t), end = t === 1;
    const hands = dir > 0 ? [end ? 126 : 118, i ? 124 : 112] : [i ? 124 : 112, end ? 126 : 118];
    k.add('jug' + n + i, 2, H({ face: end ? FACE.shock : FACE.ah, rot: dir * (end ? -0.05 : 0.03), ky: end ? 0.97 : 1 }, hands, [x, y]));
  }));
  k.add('bl0', 2, H({ face: FACE.puff, rot: 0.06 }, [130, 118], [190, 108], {}, 0));
  k.add('bl1', 2, H({ face: FACE.puff, rot: 0.06, kx: 1.02 }, [130, 118], [190, 108], {}, 8));
  k.add('bl0', 2); k.add('bl1', 2);
  k.add('cool', 4, H({ face: FACE.lookr }, [130, 118], [190, 108], { steam: false }));
  k.add('tomouth', 2, H({ face: FACE.aah }, [130, [178, 128]], [164, 122], { steam: false }));
  k.add('chomp', 4, H({ face: FACE.puff, ky: 0.97 }, [130, [180, 130]], [168, 124], { steam: false, bite: true }));
  k.add('yum', 14, H({ face: FACE.happy, ky: 1.02 }, [130, [182, 134]], [172, 128], { steam: false, bite: true }));
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, H({ face: FACE.happy }, [130 + i * 6, [182, 134 + i * 6]], [172, 128 + i * 6], { steam: false, bite: true, a })));
  k.done();
})();
