// Deploy: he hauls a giant lever over, braces for the worst, peeks, and all that happens is a little green light.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', TAU = Math.PI * 2, PIVOT = [196, 184], LEN = 96;
  const knob = lean => [PIVOT[0] + Math.sin(lean) * LEN, PIVOT[1] - Math.cos(lean) * LEN];
  const set = [['dot',122,110,3.8], ['dot',146,108,3.8], ['stroke',[[124,125],[138,124]],2.8], ['stroke',[[112,99],[124,102]],2.4], ['stroke',[[140,100],[152,97]],2.4]];
  const heave = [...FACE.chooEyes, ['stroke',[[120,126],[136,125]],2.8]];
  const braced = [...FACE.chooEyes, ['stroke',[[118,125],[122,122],[126,125],[130,122],[134,125],[138,122]],2.6]];
  const peeking = [['stroke',[[108,104],[116,109],[108,114]],3], ['dot',142,107,4.2], ['stroke',[[122,125],[126,123],[130,125],[134,123]],2.6]];
  // lean: the lever's angle from upright. lamp: 0 off, 1 green, 2 green and twinkling.
  const lever = (lean, lamp = 0) => (c, d, seed) => {
    const [kx, ky] = knob(lean);
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.strokeStyle = CREAM; c.lineWidth = 8; c.beginPath(); c.moveTo(PIVOT[0], PIVOT[1]); c.lineTo(kx, ky); c.stroke();
    c.lineWidth = 3; c.fillStyle = '#FF5A4D'; c.beginPath(); c.arc(kx, ky, 13, 0, TAU); c.fill(); c.stroke();
    c.fillStyle = '#17161A'; c.beginPath(); c.roundRect(166, 172, 62, 29, 6); c.fill(); c.stroke();
    c.fillStyle = lamp ? '#58D68D' : '#9FB0C4'; c.lineWidth = 2; c.beginPath(); c.arc(212, 187, 8, 0, TAU); c.fill(); c.stroke();
    if (lamp > 1) {
      c.strokeStyle = '#58D68D'; c.lineWidth = 2.6; c.beginPath();
      for (let i = 0; i < 5; i++) { const a = Math.PI * (1.05 + i * 0.225); c.moveTo(212 + Math.cos(a) * 14, 187 + Math.sin(a) * 14); c.lineTo(212 + Math.cos(a) * 23, 187 + Math.sin(a) * 23); }
      c.stroke();
    }
    c.restore();
  };
  // his right arm reaches from his shoulder (which moves as he leans) to the knob
  const at = (o, lean, grip, lamp) => {
    const r = o.rot || 0, sx = 128 + 36 * Math.cos(r) + 61 * Math.sin(r) + o.dx, sy = 201 + 36 * Math.sin(r) - 61 * Math.cos(r), [kx, ky] = knob(lean);
    return xf(D.N, { ...o, extra: { ...(grip && { arm2: [[sx, sy], [kx - 6, ky + 5]] }), ...o.extra, front: lever(lean, lamp) } });
  };
  D.deploy_lever_step = xf(D.N, { dx: -13, rot: -0.05, face: FACE.lookr });
  D.deploy_lever_eye = at({ dx: -26, face: FACE.lookr }, 0.15);
  D.deploy_lever_grab = at({ dx: -12, rot: 0.16, face: set }, 0.15, true);
  D.deploy_lever_pull0 = at({ dx: -20, rot: 0.02, face: heave }, -0.12, true);
  D.deploy_lever_pull1 = at({ dx: -30, rot: -0.1, face: heave, extra: { fxm: 'alert', fx: [110, 52] } }, -0.5, true);
  D.deploy_lever_brace0 = at({ dx: -31.5, ky: 0.78, kx: 1.1, face: braced }, -0.5);
  D.deploy_lever_brace1 = at({ dx: -28.5, ky: 0.78, kx: 1.1, face: braced }, -0.5);
  D.deploy_lever_peek = at({ dx: -30, ky: 0.84, kx: 1.07, face: peeking }, -0.5);
  D.deploy_lever_ding = at({ dx: -30, ky: 0.84, kx: 1.07, face: peeking }, -0.5, false, 2);
  D.deploy_lever_oh = at({ dx: -28, face: FACE.lookr }, -0.5, false, 2);
  D.deploy_lever_phew = at({ dx: -28, face: FACE.aah, ky: 0.97 }, -0.5, false, 1);
  const s = (id, n) => ['deploy_lever_' + id, n], shake = [s('brace0', 3), s('brace1', 3)];
  CLIPS.deploy_lever = { home: 'idle', seq: [...WAKE, s('step', 3), s('eye', 8), s('grab', 6), s('pull0', 3), s('pull1', 6), ...shake, ...shake, ...shake, ...shake,
    s('peek', 10), s('ding', 6), s('oh', 8), s('phew', 10), s('step', 3), ...DOZE] };
})();
