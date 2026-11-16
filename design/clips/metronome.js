// The screen sways: a metronome ticks on the left and the whole view swings further each tick; it stops, he does not, and he dozes off still swaying.
// group: scenes
(() => {
  const { D, xf, FACE, kit } = window.__lump;
  const { CREAM, BROWN, YELLOW, steps, pt, look } = kit;
  const k = kit.clip('metronome');
  const HOME = 38, MX = 30, SWING = 0.55;
  const DIZZY = [['spiral', 116, 110, 7], ['spiral', 140, 108, 7], ['stroke', [[119, 127], [123, 124], [128, 127], [133, 124], [137, 127]], 2.6]];
  const pan = s => kit.view(1, [120, 120], [120 + s, 120]);

  const stage = ({ mx = MX, ang = 0, a = 1, lamp = 0, lampDy = 0 }) => (c, d, seed) => {
    c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM;
    kit.fade(c, a * 0.6, () => { c.lineWidth = 2.4; c.beginPath(); c.moveTo(-90, 204); c.lineTo(330, 204); c.stroke(); });
    // a lamp on a cord, which swings as the room does
    c.save(); c.translate(96, -8 + lampDy); c.rotate(lamp); c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 46); c.stroke();
    c.fillStyle = YELLOW; c.beginPath(); c.moveTo(-8, 46); c.lineTo(8, 46); c.lineTo(17, 64); c.lineTo(-17, 64); c.closePath(); c.fill(); c.stroke();
    c.restore();
    // the metronome: a wooden pyramid and its arm
    c.lineWidth = 2.8; c.fillStyle = BROWN;
    c.beginPath(); c.moveTo(mx - 25, 200); c.lineTo(mx - 9, 138); c.lineTo(mx + 9, 138); c.lineTo(mx + 25, 200); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#8A6230'; c.beginPath(); c.moveTo(mx - 14, 192); c.lineTo(mx - 5, 148); c.lineTo(mx + 5, 148); c.lineTo(mx + 14, 192); c.closePath(); c.fill();
    c.translate(mx, 188); c.rotate(ang);
    c.lineWidth = 3.6; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -88); c.stroke();
    c.fillStyle = YELLOW; c.lineWidth = 2.4; c.beginPath(); c.rect(-7, -64, 14, 13); c.fill(); c.stroke();
    c.restore();
  };

  // him at dx, leaning by rot, with his arms out for balance (f swings them)
  const him = (dx, rot, face, f, extra, reach = 1) => {
    const o = { dx, rot };
    return xf(D.N, { ...o, face, extra: { arm: [pt(o, [90, 140]), pt(o, [90 - 26 * reach, 140 - (2 + 30 * f) * reach])], arm2: [pt(o, [166, 140]), pt(o, [166 + 26 * reach, 140 + (30 * f - 2) * reach])], ...extra } });
  };

  steps(0, 1, 4).slice(1).forEach((t, i) => k.add('in' + i, 2, xf(D.N, { dx: HOME * t, rot: i % 2 ? 0.04 : -0.04, face: look(-5, 2, 'flat'), extra: { back: stage({ mx: -40 + (MX + 40) * t, a: t, lampDy: -70 * (1 - t) }) } })));

  const AMP = [4, 8, 12, 17, 22, 28, 34, 40, 46];
  let s0 = 0, a0 = 0, r0 = 0;
  AMP.forEach((amp, i) => {
    const dir = i % 2 ? -1 : 1, s1 = dir * amp, a1 = dir * SWING, r1 = -dir * Math.min(0.36, amp / 120);
    const face = i < 2 ? look(dir * 4, 0, 'flat') : i < 4 ? kit.faces.worried : i < 7 ? kit.faces.wide : FACE.shock;
    [0.35, 0.75, 1].forEach((t, j) => {
      const s = s0 + (s1 - s0) * t, f = (j === 1 ? -1 : 1) * dir * Math.min(1, amp / 30);
      k.add(`t${i}_${j}`, j === 2 ? 4 : 2, him(HOME - s * 0.25, r0 + (r1 - r0) * t, face, f, { view: pan(s), back: stage({ ang: a0 + (a1 - a0) * t, lamp: -s / 55 }) }));
    });
    s0 = s1; a0 = a1; r0 = r1;
  });

  // it stops; the view settles; he does not
  [[18, 0.35, -0.2, 2], [-10, 0.15, 0.06, 2], [5, 0, -0.14, 2], [0, 0, 0.1, 2], [0, 0, -0.16, 4]].forEach(([s, ang, rot, ticks], i) =>
    k.add('stop' + i, ticks, him(HOME - 4, rot, DIZZY, i % 2 ? 0.5 : -0.5, { view: pan(s), back: stage({ ang, lamp: -s / 55 }) })));
  const SWAY = [[0, 2], [0.16, 4], [0, 2], [-0.15, 4], [0, 2], [0.14, 4], [0, 2]];
  SWAY.forEach(([rot, ticks], i) => {
    const t = i / (SWAY.length - 1), out = Math.min(1, i / 3);
    k.add('sway' + i, ticks, him(HOME * (1 - t) - (t < 1 ? 4 : 0), rot, DIZZY, rot * 3, out < 1 ? { back: stage({ mx: MX - 90 * out, a: 1 - out, lampDy: -70 * out }) } : {}, 1 - 0.65 * t));
  });
  const T1 = [['spiral', 116, 117, 7], ['spiral', 140, 115, 7], ['dot', 128, 132, 2.6]], T2 = [['spiral', 166, 150, 7], ['dot', 180, 162, 2.8]], S1 = [['spiral', 174, 168, 7], ['dot', 187, 181, 3]];
  k.add('t1a', 4, xf(D.T1, { rot: -0.12, face: T1 }));
  k.add('t1b', 4, xf(D.T1, { rot: 0.1, face: T1 }));
  k.add('t2a', 4, xf(D.T2, { rot: -0.07, face: T2 }));
  k.add('t2b', 4, xf(D.T2, { rot: 0.06, face: T2 }));
  k.add('s1a', 4, xf(D.S1, { rot: -0.04, face: S1, extra: { fxm: 'idle' } }));
  k.add('s1b', 4, xf(D.S1, { rot: 0.03, face: S1, extra: { fxm: 'idle' } }));
  k.add('s1c', 4, xf(D.S1, { face: S1, extra: { fxm: 'idle' } }));
  k.done({ doze: false });
})();
