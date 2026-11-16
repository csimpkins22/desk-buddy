// Stand-up: called to the stand-up, he strains and rises on a pair of brand-new legs, looks down, and is alarmed to find them there.
// group: meetings
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath, tint } = window.__lump;
  const CREAM = '#FFF1DC';
  const strain = [...FACE.chooEyes, ['stroke',[[119,125],[123,122],[127,125],[131,122],[135,125]],2.6]];
  const proud = [...FACE.aahEyes, ['stroke',[[119,121],[128,127],[137,121]],2.8]];
  const lookDown = [['dot',117,118,3.6], ['dot',141,116,3.6], ['stroke',[[109,106],[121,104]],2.4], ['stroke',[[136,102],[148,104]],2.4], ['dot',129,130,2.6]];
  const aghast = [['oval',116,116,5,6], ['oval',141,114,5,6], ['stroke',[[108,103],[121,100]],2.6], ['stroke',[[136,98],[149,101]],2.6], ['mouth',[[122,126],[134,125],[136,137],[128,141],[120,137]]]];
  // rise: how far he's off the floor. knee: how far each knee bows out (negative knocks them together)
  const legs = (rise, knee = 0, lean = 0) => (c, d, seed) => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    [-1, 1].forEach((side, i) => {
      const hip = [128 + side * 20 + lean, 196 - rise], foot = [128 + side * 24, 196];
      const leg = boil([hip, [(hip[0] + foot[0]) / 2 + side * knee, 196 - rise / 2], foot], seed + i, 1);
      openPath(c, leg); c.strokeStyle = CREAM; c.lineWidth = 12; c.stroke(); c.strokeStyle = tint(); c.lineWidth = 6.5; c.stroke();
      c.fillStyle = tint(); c.strokeStyle = CREAM; c.lineWidth = 2.8; c.beginPath(); c.ellipse(foot[0] + side * 6, 197, 12, 6, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    });
    c.restore();
  };
  const up = (rise, o, knee, lean) => xf(D.N, { dy: -rise, shadowK: 1 - rise / 150, ...o, extra: { back: legs(rise, knee, lean), ...(o.extra || {}) } });
  D.stand_up_strain1 = xf(D.N, { face: strain, ky: 0.86, kx: 1.08 });
  D.stand_up_strain2 = xf(D.N, { face: strain, ky: 0.82, kx: 1.1, dx: 2 });
  D.stand_up_rise1 = up(16, { face: strain });
  D.stand_up_rise2 = up(32, { face: strain, ky: 1.03, kx: 0.97 });
  D.stand_up_rise3 = up(47, { face: proud, ky: 1.03, kx: 0.97 });
  D.stand_up_tall = up(42, { face: proud });
  D.stand_up_look = up(42, { face: lookDown });
  D.stand_up_gasp1 = up(42, { face: aghast, extra: { fxm: 'alert', fx: [190, 48] } }, -7);
  D.stand_up_gasp2 = up(40, { face: aghast, rot: 0.04, extra: { fxm: 'alert', fx: [190, 48] } }, 6, 3);
  D.stand_up_gasp3 = up(40, { face: aghast, rot: -0.04, extra: { fxm: 'alert', fx: [190, 48] } }, 6, -3);
  D.stand_up_drop = up(18, { face: aghast }, 12);
  D.stand_up_plop = xf(D.N, { face: FACE.shock, ky: 0.78, kx: 1.14 });
  D.stand_up_phew = xf(D.N, { face: FACE.sheep });
  const n = s => 'stand_up_' + s;
  CLIPS.stand_up = { home: 'idle', seq: [...WAKE, ['NB', 8], [n('strain1'), 3], [n('strain2'), 3], [n('strain1'), 3], [n('strain2'), 3], [n('rise1'), 2], [n('rise2'), 2], [n('rise3'), 3],
    [n('tall'), 12], [n('look'), 10], [n('gasp1'), 5], [n('gasp2'), 3], [n('gasp3'), 3], [n('gasp2'), 3], [n('gasp3'), 3], [n('gasp1'), 4], [n('drop'), 2], [n('plop'), 4], [n('phew'), 12], ...DOZE] };
})();
