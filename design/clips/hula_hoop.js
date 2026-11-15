// Hula hoop: it spins round his middle, sinks however hard he wiggles, and settles round his feet.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', HOOP = '#FFD23F';
  const down = [['dot',117,114,3.8], ['dot',141,112,3.8], ['mouth',[[124,123],[132,123],[133,129],[128,132],[123,129]]]];
  const trying = [['stroke',[[108,104],[116,109],[108,114]],3], ['stroke',[[148,102],[140,107],[148,112]],3], ['stroke',[[120,126],[124,123],[128,126],[132,123],[136,126]],2.6]];
  const flat = [['dot',117,114,3.6], ['dot',141,112,3.6], ['stroke',[[121,126],[135,125]],2.8]];
  // half a hoop: the far side is drawn behind him and the near side in front
  const half = (near, y, cx, tilt, ry = 15) => (c, d, seed) => {
    c.save(); c.lineCap = 'round';
    c.beginPath(); c.ellipse(cx, y, 74, ry, tilt, near ? 0 : Math.PI, near ? Math.PI : Math.PI * 2);
    c.strokeStyle = CREAM; c.lineWidth = 8; c.stroke(); c.strokeStyle = HOOP; c.lineWidth = 4.5; c.stroke();
    c.restore();
  };
  const hoop = (y, cx, tilt, ry) => ({ back: half(false, y, cx, tilt, ry), front: half(true, y, cx, tilt, ry) });
  const LEVELS = [[138, FACE.happy, 3], [138, FACE.happy, 3], [149, FACE.happy, 3], [161, down, 3], [172, trying, 2], [179, trying, 2], [186, trying, 2], [191, trying, 2], [196]];
  const seq = [...WAKE];
  LEVELS.slice(0, -1).forEach(([y, face, hold], i) => {
    for (let ph = 0; ph < 4; ph++) {
      const a = ph * Math.PI / 2, sway = -Math.cos(a) * (hold === 2 ? 7 : 4), name = `hula_hoop_${i}${ph}`;
      D[name] = xf(D.N, { face, dx: sway, rot: -Math.sin(a) * 0.04, extra: { arm: [[92 + sway, 122], [70 + sway, 106]], arm2: [[166 + sway, 120], [190 + sway, 104]],
        ...hoop(y + ph * (LEVELS[i + 1][0] - y) / 4, 128 + Math.cos(a) * 7, Math.sin(a) * 0.13) } });
      seq.push([name, hold]);
    }
  });
  [0.09, -0.06, 0.03].forEach((tilt, i) => { D['hula_hoop_f' + i] = xf(D.N, { face: down, extra: hoop(196, 128, tilt, 12) }); seq.push(['hula_hoop_f' + i, 3]); });
  D.hula_hoop_g = xf(D.N, { face: flat, extra: hoop(196, 128, 0, 12) });
  D.hula_hoop_h = xf(D.N, { face: FACE.sheep, extra: hoop(196, 128, 0, 12) });
  CLIPS.hula_hoop = { home: 'idle', seq: [...seq, ['hula_hoop_g', 12], ['hula_hoop_h', 10], ...DOZE] };
})();
