// Message in a bottle: he corks his note in a bottle and floats it off across the floor. It gets a little way and sinks.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, openPath } = window.__lump;
  const CREAM = '#FFF1DC', X = -44, BX = 164, S = [122, 140], FLOAT = 60;
  const blink = [['stroke',[[117,112],[127,112]],2.8], ['stroke',[[141,110],[151,110]],2.8], ['stroke',[[124,125],[136,124]],2.8]];
  const flat = [['dot',123,112,3.6], ['dot',147,110,3.6], ['stroke',[[124,125],[136,124]],2.8]];
  const shape = c => { c.beginPath(); c.moveTo(-4, -28); c.lineTo(4, -28); c.lineTo(4, -16); c.quadraticCurveTo(10, -14, 10, -6); c.lineTo(10, 16); c.quadraticCurveTo(10, 20, 6, 20);
    c.lineTo(-6, 20); c.quadraticCurveTo(-10, 20, -10, 16); c.lineTo(-10, -6); c.quadraticCurveTo(-10, -14, -4, -16); c.closePath(); };
  const bottle = (c, x, y, rot, note, cork) => {
    c.save(); c.beginPath(); c.rect(0, 0, 240, 202); c.clip();              // anything below the floor is under water
    c.translate(x, y); c.rotate(rot); c.scale(1.3, 1.3); c.lineJoin = c.lineCap = 'round';
    shape(c); c.fillStyle = '#17161A'; c.fill();
    if (note) { c.fillStyle = CREAM; c.beginPath(); c.roundRect(-5, -6, 9, 22, 2); c.fill(); }
    shape(c); c.globalAlpha = 0.6; c.fillStyle = '#58D68D'; c.fill(); c.globalAlpha = 1; c.strokeStyle = CREAM; c.lineWidth = 2; c.stroke();
    if (cork) { c.fillStyle = '#B8834A'; c.beginPath(); c.roundRect(-4.5, cork, 9, 9, 2); c.fill(); c.stroke(); }
    c.restore();
  };
  const scroll = (c, x, y) => { c.save(); c.fillStyle = CREAM; c.strokeStyle = '#B9AE98'; c.lineWidth = 2; c.beginPath(); c.roundRect(x - 6, y - 14, 12, 28, 3); c.fill(); c.beginPath(); c.moveTo(x - 6, y - 2); c.lineTo(x + 6, y - 2); c.stroke(); c.restore(); };
  const waves = (c, x, phase) => {
    c.save(); c.strokeStyle = '#5AB8FF'; c.lineWidth = 2.4; c.lineCap = 'round';
    for (const k of [-1, 0, 1]) { const x0 = x + k * 34 - 12 + (phase ? 5 : 0); openPath(c, [0, 1, 2, 3, 4].map(i => [x0 + i * 6, 199 + (i % 2 ? -3 : 1)])); c.stroke(); }
    c.restore();
  };
  const bubbles = (c, x, n, rise) => { c.save(); c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.8;
    for (let i = 0; i < n; i++) { c.beginPath(); c.arc(x + [-7, 6, -1][i], 190 - rise - i * 13, 3 + i, 0, Math.PI * 2); c.stroke(); } c.restore(); };
  const standing = (note, cork, held) => c => { bottle(c, BX, 174, 0, note, cork); if (held) scroll(c, ...held); };
  // it bobs away, slowly
  const afloat = (c, d, seed, tick) => {
    const t = Math.floor((tick - FLOAT) / 2) * 2, x = BX + 6 + t;
    bottle(c, x, 188 + Math.sin(t / 3) * 2.5, Math.PI / 2 + Math.sin(t / 4) * 0.12, true, -36); waves(c, x, t % 4);
  };
  const sinking = (y, rot, n, rise) => c => { bottle(c, BX + 32, y, rot, true, -36); waves(c, BX + 32, n % 2); bubbles(c, BX + 32, n, rise); };
  const me = (face, o = {}, extra = {}) => xf(D.N, { dx: X, face, ...o, extra });
  const WAVE1 = [S, [146, 106]], WAVE2 = [S, [154, 112]];
  D.bottle_message_in = xf(D.N, { dx: X / 2, extra: { front: standing(false, 0) } });
  D.bottle_message_1 = me(FACE.lookr, {}, { arm2: [S, [150, 114]], front: standing(false, 0, [160, 100]) });
  D.bottle_message_2 = me(FACE.lookr, { rot: 0.04 }, { arm2: [S, [152, 122]], front: standing(false, 0, [BX - 1, 112]) });
  D.bottle_message_3 = me(FACE.happy, {}, { front: standing(true, 0) });
  D.bottle_message_4 = me(FACE.lookr, {}, { arm2: [S, [152, 114]], front: standing(true, -48) });
  D.bottle_message_5 = me(FACE.chooEyes, { rot: 0.06, ky: 0.96 }, { arm2: [S, [156, 124]], front: standing(true, -36) });
  D.bottle_message_6 = me(FACE.lookr, { rot: 0.07 }, { arm2: [[124, 150], [146, 172]], front: c => { bottle(c, BX + 4, 188, Math.PI / 2, true, -36); waves(c, BX + 4, 0); } });
  D.bottle_message_7 = me(FACE.happy, {}, { arm2: WAVE1, front: afloat });
  D.bottle_message_8 = me(FACE.happy, {}, { arm2: WAVE2, front: afloat });
  D.bottle_message_9 = me(FACE.happy, {}, { arm2: WAVE1, front: sinking(184, 0.5, 0, 0) });
  D.bottle_message_10 = me(FACE.shock, {}, { arm2: WAVE1, front: sinking(204, 0.25, 1, 0) });
  D.bottle_message_11 = me(FACE.shock, {}, { arm2: WAVE1, front: sinking(228, 0.1, 2, 4) });
  D.bottle_message_12 = me(FACE.shock, {}, { arm2: WAVE1, front: sinking(260, 0, 3, 10) });
  D.bottle_message_13 = me(flat, { ky: 0.97 }, { arm2: [S, [148, 150]], front: c => bubbles(c, BX + 32, 1, 30) });
  D.bottle_message_14 = me(flat, { ky: 0.97 });
  D.bottle_message_15 = me(blink, { ky: 0.96 });
  D.bottle_message_out = xf(D.N, { dx: X / 2, face: flat });
  const wave = n => Array.from({ length: n }, (_, i) => ['bottle_message_' + (7 + i % 2), 4]);
  CLIPS.bottle_message = { home: 'idle', seq: [...WAKE, ['bottle_message_in', 3], ['bottle_message_1', 8], ['bottle_message_2', 4], ['bottle_message_3', 4], ['bottle_message_4', 4], ['bottle_message_5', 4], ['bottle_message_6', 4],
    ...wave(7), ['bottle_message_9', 3], ['bottle_message_10', 3], ['bottle_message_11', 3], ['bottle_message_12', 5], ['bottle_message_13', 5], ['bottle_message_14', 6], ['bottle_message_15', 3], ['bottle_message_14', 5], ['bottle_message_out', 3], ...DOZE] };
})();
