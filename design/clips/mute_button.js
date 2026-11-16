// Mute button: he chats away under a crossed-out microphone, spots it, goes sheepish, then taps it and is finally heard.
// group: meetings
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A';
  const yak = [...FACE.aahEyes, ['mouth',[[118,119],[138,118],[136,131],[128,135],[120,131]],[128,132,5,3]]];
  const yakO = [...FACE.aahEyes, ['mouth',[[123,120],[133,119],[134,128],[128,131],[122,128]]]];
  const yakShut = [...FACE.aahEyes, ['stroke',[[121,123],[128,126],[135,123]],2.8]];
  const spots = [['dot',123,104,4], ['dot',147,102,4], ['mouth',[[123,120],[133,119],[134,128],[128,131],[122,128]]]];
  const sheepish = [['dot',121,108,3.6], ['dot',145,106,3.6], ['stroke',[[119,124],[124,122],[129,124],[134,122]],2.6], ['blush',104,121,9,5], ['blush',158,119,9,5]];
  const X = 197, Y = 46;
  const mic = live => (c, d, seed) => {
    c.save(); c.translate(X, Y); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = live ? '#58D68D' : DARK; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 27, 0, Math.PI * 2); c.fill(); c.stroke();
    const ink = live ? DARK : CREAM;
    c.fillStyle = ink; c.beginPath(); c.roundRect(-6, -17, 12, 21, 6); c.fill();
    c.strokeStyle = ink; c.lineWidth = 2.8; c.beginPath(); c.arc(0, -3, 11, 0.1, Math.PI - 0.1); c.stroke();
    c.beginPath(); c.moveTo(0, 8); c.lineTo(0, 15); c.moveTo(-7, 15); c.lineTo(7, 15); c.stroke();
    if (!live) {
      const [a, b] = boil([[-17, -17], [17, 17]], seed, 1.5);
      c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.strokeStyle = DARK; c.lineWidth = 10; c.stroke(); c.strokeStyle = '#FF5A4D'; c.lineWidth = 5.5; c.stroke();
    }
    c.restore();
  };
  const heard = n => (c, d, seed) => {                          // his voice, at last
    mic(true)(c, d, seed);
    c.save(); c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round';
    for (let i = 0; i < n; i++) { c.beginPath(); c.arc(92, 124, 34 + i * 13, Math.PI - 0.5, Math.PI + 0.5); c.stroke(); }
    c.restore();
  };
  const wave = h => ({ arm2: [[166, 142], [198, 142 - h]] });
  D.mute_a = xf(D.N, { face: yak, extra: { ...wave(18), front: mic(false) } });
  D.mute_b = xf(D.N, { face: yakShut, extra: { ...wave(4), front: mic(false) } });
  D.mute_c = xf(D.N, { face: yakO, rot: 0.03, extra: { ...wave(-8), front: mic(false) } });
  D.mute_see = xf(D.N, { face: spots, extra: { ...wave(4), front: mic(false) } });
  D.mute_gasp = xf(D.K1, { extra: { front: mic(false), fx: [112, 70] } });
  D.mute_oops = xf(D.N, { face: sheepish, ky: 0.96, extra: { front: mic(false) } });
  D.mute_tap = xf(D.N, { face: sheepish, rot: 0.05, extra: { arm2: [[166, 132], [184, 84]], front: mic(false) } });
  D.mute_on = xf(D.N, { face: spots, rot: 0.05, extra: { arm2: [[166, 132], [184, 84]], front: mic(true) } });
  D.mute_hi1 = xf(D.N, { face: FACE.happy, extra: { ...wave(18), front: heard(2) } });
  D.mute_hi2 = xf(D.N, { face: FACE.happy, ky: 1.03, extra: { ...wave(26), front: heard(3) } });
  const chat = [['mute_a', 4], ['mute_b', 3], ['mute_c', 4], ['mute_b', 3]];
  CLIPS.mute_button = { home: 'idle', seq: [...WAKE, ...chat, ...chat, ...chat, ['mute_a', 4], ['mute_see', 9], ['mute_gasp', 8], ['mute_oops', 14],
    ['mute_tap', 5], ['mute_on', 5], ['mute_hi1', 4], ['mute_hi2', 4], ['mute_hi1', 4], ['mute_hi2', 4], ['mute_hi1', 6], ...DOZE] };
})();
