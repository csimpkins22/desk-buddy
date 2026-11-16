// Boombox: he hoists a portable stereo over his head and plays it at a lit window, steadfast, while his arms slowly give way and it settles on his head.
// group: movies
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', GREY = '#9FB0C4', SLATE = '#6F7C8C', YELLOW = '#FFD23F', RED = '#FF5A4D', TAU = Math.PI * 2, CX = 110, P = 'boombox_';
  const set = [['stroke',[[108,100],[121,103]],2.6], ['stroke',[[135,101],[148,98]],2.6], ['dot',116,110,3.6], ['dot',140,108,3.6], ['stroke',[[122,125],[134,124]],2.8]];
  const strain = [['stroke',[[107,99],[121,104]],2.8], ['stroke',[[135,102],[149,97]],2.8], ['dot',116,111,3.6], ['dot',140,109,3.6], ['stroke',[[119,126],[123,123],[127,126],[131,123],[135,126]],2.6]];
  const grit = [...FACE.chooEyes, ['teeth',128,125,20,9]];
  const heave = [...FACE.chooEyes, ['stroke',[[121,126],[135,125]],2.8]];
  const dot = (c, x, y, r, colour) => { c.fillStyle = colour; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); };
  // standing on (x, y) and tipped by rot. beat: undefined when switched off, else 0 or 1 as the speakers thump
  const stereo = (c, x, y, rot, beat, seed) => {
    c.save(); c.translate(x + (seed % 3 - 1) * 0.5, y); c.rotate(rot + (seed % 3 - 1) * 0.008); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.roundRect(-30, -62, 60, 26, 8); c.strokeStyle = CREAM; c.lineWidth = 8; c.stroke(); c.strokeStyle = SLATE; c.lineWidth = 3; c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(39, -46); c.lineTo(61, -68); c.stroke(); dot(c, 61, -68, 2.8, CREAM);
    c.fillStyle = GREY; c.lineWidth = 3; c.beginPath(); c.roundRect(-50, -46, 100, 46, 7); c.fill(); c.stroke();
    c.fillStyle = '#7E8FA6'; c.fillRect(-47, -11, 94, 8);
    [-31, 31].forEach(sx => {
      c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.arc(sx, -24, 15.5, 0, TAU); c.fill(); c.stroke();
      c.strokeStyle = SLATE; c.lineWidth = 2.2; c.beginPath(); c.arc(sx, -24, beat ? 11.5 : 9, 0, TAU); c.stroke();
      dot(c, sx, -24, beat ? 5 : 3.6, CREAM);
    });
    c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 2; c.beginPath(); c.roundRect(-12, -28, 24, 17, 3); c.fill(); c.stroke();
    dot(c, -5, -19, 2.8, CREAM); dot(c, 5, -19, 2.8, CREAM);
    c.fillStyle = YELLOW; c.fillRect(-12, -41, 24, 7); c.fillStyle = RED; c.fillRect(beat === undefined ? -8 : 4, -42, 2.4, 9);
    c.fillStyle = CREAM; [-11, -5, 1, 7].forEach(bx => c.fillRect(bx, -51, 4, 4));
    c.restore();
  };
  const note = (c, x, y, s, two) => {
    c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = c.strokeStyle = two ? YELLOW : CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.ellipse(0, 0, 6, 4.5, -0.4, 0, TAU); c.fill();
    c.beginPath(); c.moveTo(5, -1); c.lineTo(5, -22);
    if (two) { c.lineTo(23, -26); c.lineTo(23, -5); } else c.quadraticCurveTo(14, -18, 13, -10);
    c.stroke();
    if (two) { c.beginPath(); c.ellipse(18, -4, 6, 4.5, -0.4, 0, TAU); c.fill(); }
    c.restore();
  };
  let now = 29, playFrom, playTo = 1e9;
  // notes leave the two speakers in turn and drift up and outwards, on twos; from playTo they fade away
  const notes = (c, tick, y) => {
    const t = Math.floor((tick - playFrom) / 2) * 2, fade = Math.max(0, 1 - (tick - playTo) / 8);
    for (let i = 0; i < 4; i++) {
      const age = t - i * 9, p = (age % 36) / 36, side = i % 2 ? 1 : -1;
      if (age < 0 || !fade) continue;
      c.globalAlpha = Math.min(1, p * 5, 2.5 * (1 - p)) * Math.min(1, fade);
      note(c, CX + side * (34 + p * 52) + Math.sin(p * 7 + i) * 5 - 6, y - p * (40 + i * 4), 0.7 + p * 0.4, i % 2 === 1);
    }
    c.globalAlpha = 1;
  };
  const sweat = (c, x, y) => {
    c.save(); c.fillStyle = '#5AB8FF'; c.strokeStyle = CREAM; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(x, y - 6); c.quadraticCurveTo(x + 6, y + 3, x, y + 4); c.quadraticCurveTo(x - 6, y + 3, x, y - 6); c.fill(); c.stroke(); c.restore();
  };
  // the lit window he is playing to, behind him
  const win = glow => (c, d, seed) => {
    c.save(); c.translate((seed % 3 - 1) * 0.5, (seed % 2) * 0.5); c.globalAlpha = glow; c.lineCap = c.lineJoin = 'round';
    c.fillStyle = YELLOW; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.roundRect(198, 28, 32, 42, 3); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(214, 28); c.lineTo(214, 70); c.moveTo(198, 47); c.lineTo(230, 47); c.stroke();
    c.lineWidth = 3.4; c.beginPath(); c.moveTo(194, 72); c.lineTo(234, 72); c.stroke();
    c.restore();
  };
  const pt = (o, [x, y]) => { const r = o.rot || 0, u = (x - 128) * (o.kx || 1), v = (y - 201) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), 201 + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
  const seq = [...WAKE], add = (name, ticks, d) => { D[P + name] = d; seq.push([P + name, ticks]); now += ticks; };
  // him with the stereo at (x, y). hands: which arms hold its underside (0 none, 1 the right, 2 both), or where the right one reaches; drop: where a bead of sweat is; shake: it judders
  const carry = (o, face, [x, y, rot = 0], hands, { play, limp, drop, shake, glow = 1 } = {}) => {
    const q = { dx: CX - 128, ...o }, grip = side => [x + side * 36 * Math.cos(rot) - 4 * Math.sin(rot), y + side * 36 * Math.sin(rot) + 4 * Math.cos(rot)];
    const L = pt(q, [97, 104]), R = pt(q, [159, 102]);
    return xf(D.N, { ...q, face, extra: {
      arm: limp ? [L, [L[0] - 40, L[1] + 26]] : hands > 1 ? [L, grip(-1)] : undefined, arm2: limp ? [R, [R[0] + 40, R[1] + 26]] : hands ? [R, hands.length ? hands : grip(hands > 1 ? 1 : -1)] : undefined,
      back: win(glow), front: (c, d, seed, tick) => {
        stereo(c, x, y, rot, play ? Math.floor((tick - playFrom) / 6) % 2 : undefined, seed);
        if (play) notes(c, tick, y - 24);
        if (drop) sweat(c, ...drop);
        if (shake) { c.strokeStyle = CREAM; c.lineWidth = 2.2; c.beginPath(); [-1, 1].forEach(side => { c.moveTo(x + side * 58, y - 36); c.quadraticCurveTo(x + side * 63, y - 25, x + side * 58, y - 14); }); c.stroke(); }
      } } });
  };
  const squash = ky => ({ ky, kx: 1 + (1 - ky) * 0.6 });

  add('step', 3, xf(D.N, { dx: -9, rot: -0.05, face: FACE.lookr, extra: { back: win(0.4) } }));
  [300, 236, 200].forEach((x, i) => add('in' + i, 2, carry({}, FACE.lookr, [x, 201], 0, { glow: 0.7 + i * 0.15 })));
  add('there', 4, carry({}, FACE.lookr, [188, 201], 0));
  add('grab', 4, carry({ rot: 0.12, ...squash(0.93) }, FACE.lookr, [188, 201], [164, 150]));
  add('lift0', 2, carry({ rot: 0.1 }, heave, [186, 174, -0.12], 1));
  add('lift1', 2, carry({ rot: 0.05 }, heave, [188, 122, -0.25], 1));
  add('lift2', 2, carry({}, heave, [152, 80, -0.14], 2));
  add('lift3', 2, carry(squash(1.04), heave, [CX, 66], 2));
  add('lift4', 2, carry(squash(0.83), heave, [CX, 77], 2));
  add('ready', 4, carry(squash(0.86), set, [CX, 72], 2));
  playFrom = now;
  add('high', 20, carry(squash(0.86), set, [CX, 72], 2, { play: true }));
  // the same pose trembling: the stereo jogs from side to side a little lower each time
  const sag = (name, n, y, ky, face, jog, drop) => { for (let i = 0; i < n; i++) add(name + i, 2, carry(squash(ky), face, [CX + (i % 2 ? jog : -jog), y + i * 0.6, i % 2 ? 0.02 : -0.02], 2, { play: true, shake: jog > 1 && i % 2, drop: drop && [drop[0], drop[1] + i * 3] })); };
  sag('sag', 6, 78, 0.85, strain, 1);
  sag('sink', 6, 86, 0.82, strain, 1.6, [152, 118]);
  sag('fail', 4, 94, 0.79, grit, 2.4, [70, 124]);
  add('buckle', 2, carry(squash(0.74), grit, [CX, 102], 0, { play: true, limp: true }));
  add('bonk', 4, carry(squash(0.58), FACE.shock, [CX, 124], 0, { play: true, limp: true }));
  add('bounce', 2, carry(squash(0.74), set, [CX, 102], 0, { play: true, limp: true }));
  add('flat', 16, carry(squash(0.7), set, [CX, 108], 0, { play: true, limp: true }));
  playTo = now - 6;
  add('tip', 2, carry({ rot: 0.08, ...squash(0.72) }, FACE.lookr, [CX + 26, 112, 0.2], 0));
  add('slide', 2, carry({ rot: 0.1, ...squash(0.9) }, FACE.lookr, [CX + 84, 156, 0.45], 0));
  add('thud', 2, carry(squash(1.07), FACE.lookr, [190, 201, 0.07], 0));
  add('off0', 2, carry({ dx: -12, ...squash(0.97) }, FACE.lookr, [238, 201], 0, { glow: 0.7 }));
  add('off1', 2, carry({ dx: -6 }, FACE.sheep, [296, 201], 0, { glow: 0.35 }));
  CLIPS.boombox = { home: 'idle', seq: [...seq, ...DOZE] };
})();
