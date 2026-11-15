// We are the phone: he leans in until his face fills the screen, pulls four quick faces, the flash goes off, and he drifts back dazzled.
(() => {
  const { D, xf, FACE } = window.__lump, kit = window.__lump.kit;
  const k = kit.clip('selfie'), cam = z => kit.zoom(z, [128, 116], [120, 120]), Z = 2.8;
  const dizzy = [['spiral', 116, 109, 7], ['spiral', 140, 107, 7], ['stroke', [[119, 126], [123, 123], [128, 126], [133, 123], [137, 126]], 2.6]];
  // the flash, drawn on the glass itself: wedges of light in from every edge, or the whole screen white
  const flash = len => c => {
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
    if (!len) { c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, 240, 240); }
    else for (let i = 0; i < 12; i++) {
      const a = i / 12 * kit.TAU + 0.26, tip = 175 - len * (i % 2 ? 0.7 : 1), p = (b, r) => [120 + Math.cos(b) * r, 120 + Math.sin(b) * r];
      c.fillStyle = i % 2 ? kit.YELLOW : '#FFFFFF'; c.beginPath(); c.moveTo(...p(a - 0.15, 190)); c.lineTo(...p(a, tip)); c.lineTo(...p(a + 0.15, 190)); c.closePath(); c.fill();
    }
    c.restore();
  };
  const head = (rot, o = {}) => ({ rot, ox: 128, oy: 126, ...o });

  kit.steps(1, Z, 5).slice(1).forEach((z, i) => k.add('in' + i, 2, xf(D.N, { face: kit.look(0, 0, 'smile'), extra: { view: cam(z) } })));
  k.add('f1', 4, xf(D.N, { ...head(-0.1), face: FACE.happy, extra: { view: cam(Z) } }));
  k.add('f2', 4, xf(D.N, { ...head(0.12), face: kit.faces.wink, extra: { view: cam(Z) } }));
  k.add('f3', 4, xf(D.N, { ...head(-0.07, { ky: 0.96 }), face: kit.faces.smug, extra: { view: cam(Z) } }));
  k.add('f4', 4, xf(D.N, { ...head(0.08), face: FACE.cute, extra: { view: cam(Z) } }));
  k.add('fl0', 2, xf(D.N, { ...head(0.08), face: FACE.cute, extra: { view: cam(Z), front: flash(70) } }));
  k.add('fl1', 2, xf(D.N, { face: FACE.shock, extra: { view: cam(Z), front: flash(0) } }));
  k.add('fl2', 2, xf(D.N, { face: dizzy, extra: { view: cam(Z), front: flash(115) } }));
  k.add('fl3', 2, xf(D.N, { face: dizzy, extra: { view: cam(Z), front: flash(55) } }));
  k.add('dz0', 4, xf(D.N, { ...head(0.09), face: dizzy, extra: { view: cam(Z) } }));
  k.add('dz1', 4, xf(D.N, { ...head(-0.09), face: dizzy, extra: { view: cam(Z) } }));
  kit.steps(Z, 1, 5).slice(1).forEach((z, i) => k.add('out' + i, i === 3 ? 4 : 2, xf(D.N, { rot: i % 2 ? -0.07 : 0.07, face: dizzy, extra: { view: cam(z) } })));
  k.add('t1', 4, xf(D.T1, { face: [['spiral', 116, 117, 7], ['spiral', 140, 115, 7], ['stroke', [[121, 131], [125, 129], [129, 132], [133, 129], [137, 131]], 2.6]] }));
  k.add('t2', 4, xf(D.T2, { face: [['spiral', 166, 150, 7], ['dot', 180, 162, 2.8]] }));
  k.add('s1', 8, xf(D.S1, { face: [['spiral', 175, 168, 7], ['dot', 187, 181, 3]], extra: { fxm: 'idle' } }));
  k.done({ doze: false });
})();
