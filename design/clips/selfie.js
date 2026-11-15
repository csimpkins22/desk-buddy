// Selfie: he holds a phone out at arm's length, tries two poses, and the flash leaves him seeing stars.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('selfie');
  const phone = (c, x, y, a = 1) => kit.fade(c, a, () => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.translate(x + 4, y - 8); c.rotate(0.2);
    c.fillStyle = kit.GREY; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.roundRect(-9, -15, 18, 30, 4); c.fill(); c.stroke();
    c.fillStyle = kit.DARK; c.beginPath(); c.arc(-3, -8, 3.2, 0, kit.TAU); c.fill();
    c.restore();
  });
  const flash = (c, a) => { c.save(); c.globalAlpha = a; c.fillStyle = kit.WHITE; c.fillRect(0, 0, 240, 240); c.restore(); };
  const stars = (c, a) => [0, 1, 2].forEach(i => kit.sparkle(c, 128 + Math.cos(a + i * kit.TAU / 3) * 54, 62 + Math.sin(a + i * kit.TAU / 3) * 12, 9, kit.YELLOW));
  const held = (o, hand, extra = {}, fl = 0) => xf(D.N, { ...o, extra: { ...extra, arm2: [kit.pt(o, [166, 140]), hand], front: c => { phone(c, ...hand); if (fl) flash(c, fl); } } });

  k.add('see', 6, xf(D.N, { face: FACE.lookr }));
  const hx = kit.steps(186, 204, 3), hy = kit.steps(166, 100, 3);
  [0.35, 0.7, 1].forEach((a, i) => k.add('raise' + i, 2, xf(D.N, { face: FACE.lookr, extra: { arm2: [[166, 140], [hx[i], hy[i]]], front: c => phone(c, hx[i], hy[i], a) } })));
  const p1 = { face: FACE.happy, rot: -0.08 }, p2 = { face: FACE.cute, rot: 0.06, ky: 1.03 };
  k.add('pose1', 12, held(p1, [204, 100]));
  k.add('pose2', 12, held(p2, [204, 100], { arm: [kit.pt(p2, [90, 140]), [62, 106]] }));
  k.add('flash1', 2, held(p2, [204, 100], { arm: [kit.pt(p2, [90, 140]), [62, 106]] }, 0.8));
  k.add('flash2', 2, held({ face: FACE.shock }, [204, 104], {}, 0.65));
  for (let i = 0; i < 10; i++) {
    const a = [1, 0.6, 0.3][i], hand = [198, 120 + i * 18];
    k.add('daze' + i, 2, xf(D.N, { face: FACE.spiral, rot: i % 2 ? 0.04 : -0.04, extra: { ...(a ? { arm2: [[166, 140], hand] } : {}), front: c => { if (a) phone(c, ...hand, a); stars(c, i * 0.7); } } }));
  }
  k.add('after', 6, xf(D.N, { face: FACE.shock }));
  k.done();
})();
