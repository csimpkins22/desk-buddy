// Night light: it is dark and he is not keen on it. He pulls the chain on a tiny lamp and settles down in its pool of light.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', GLOW = '#FFD23F';
  const uneasy = dx => [['dot',116 + dx,110,3.6], ['dot',140 + dx,108,3.6], ['stroke',[[120,126],[124,124],[128,126],[132,124],[136,126]],2.6]];
  const snug = [...D.C1.face, ['blush',100,121,8,4.5], ['blush',156,119,8,4.5]];
  // on: 0 dark to 1 lit. pull: how far the chain is tugged. The pool is flat colour: a circle round the lamp, an ellipse on the floor.
  const lamp = (on, pull = 0) => ({
    fxm: 'nightsky',
    back: (c, d, seed) => {
      if (!on) return;
      c.save(); c.fillStyle = GLOW;
      c.globalAlpha = 0.17 * on; c.beginPath(); c.arc(210, 162, 146, 0, Math.PI * 2); c.fill();
      c.globalAlpha = 0.2 * on; c.beginPath(); c.ellipse(150, 205, 104, 12, 0, 0, Math.PI * 2); c.fill();
      c.restore();
    },
    front: (c, d, seed) => {
      c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6;
      c.beginPath(); c.moveTo(198, 200); c.lineTo(222, 200); c.moveTo(210, 200); c.lineTo(210, 172); c.moveTo(218, 172); c.lineTo(218, 181 + pull); c.stroke();
      c.fillStyle = CREAM; c.beginPath(); c.arc(218, 183 + pull, 2.4, 0, Math.PI * 2); c.fill();
      c.fillStyle = on > 0.6 ? GLOW : '#17161A'; c.beginPath(); c.moveTo(195, 172); c.lineTo(225, 172); c.lineTo(219, 148); c.lineTo(201, 148); c.closePath(); c.fill(); c.stroke();
      if (on) { c.fillStyle = GLOW; c.globalAlpha = 0.1 * on; c.beginPath(); c.arc(210, 162, 146, 0, Math.PI * 2); c.fill(); }
      c.restore();
    },
  });
  D.night_light_1 = xf(D.N, { face: uneasy(-5), extra: lamp(0) });
  D.night_light_2 = xf(D.N, { face: uneasy(5), ky: 0.97, extra: lamp(0) });
  D.night_light_3 = xf(D.N, { face: FACE.lookr, extra: lamp(0) });
  D.night_light_4 = xf(D.N, { face: FACE.lookr, rot: 0.05, extra: { ...lamp(0), arm2: [[170, 148], [206, 174]] } });
  D.night_light_5 = xf(D.N, { face: FACE.chooEyes, rot: 0.05, extra: { ...lamp(1, 8), arm2: [[170, 150], [206, 184]] } });
  D.night_light_6 = xf(D.N, { face: FACE.cute, extra: lamp(1) });
  D.night_light_7 = xf(D.N, { face: D.C1.face, rot: 0.04, extra: lamp(1) });
  D.night_light_8 = xf(D.N, { face: D.C1.face, ky: 0.9, kx: 1.06, extra: lamp(1) });
  D.night_light_9 = xf(D.N, { face: snug, ky: 0.8, kx: 1.12, extra: lamp(1) });
  D.night_light_10 = xf(D.N, { face: snug, ky: 0.83, kx: 1.1, extra: lamp(1) });
  D.night_light_11 = xf(D.N, { face: snug, ky: 0.8, kx: 1.12, extra: lamp(0.5) });
  const breathe = [['night_light_9', 8], ['night_light_10', 8]];
  CLIPS.night_light = { home: 'idle', seq: [...WAKE, ['night_light_1', 6], ['night_light_2', 6], ['night_light_3', 5], ['night_light_4', 4], ['night_light_5', 3], ['night_light_6', 8],
    ['night_light_7', 4], ['night_light_8', 5], ...breathe, ...breathe, ['night_light_11', 4], ...DOZE] };
})();
