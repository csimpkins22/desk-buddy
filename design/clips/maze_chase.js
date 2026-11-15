// Maze chase: he gobbles a line of dots down a corridor with a wind-up toy rattling after him, eats the big dot, and the toy turns and flees.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', STONE = '#9FB0C4', DARK = '#17161A', TAU = Math.PI * 2, P = 'maze_chase_', DOTS = [104, 128, 152, 176], BIG = 206;
  const open = [['dot',124,106,4.2], ['dot',148,104,4.2], ['mouth',[[126,116],[144,115],[146,131],[135,137],[124,131]]]];
  const shut = [['dot',124,106,4.2], ['dot',148,104,4.2], ['stroke',[[126,124],[134,127],[142,123]],2.8]];
  const gulp = [...FACE.aahEyes, ['stroke',[[120,123],[128,127],[136,123]],2.8], ['blush',104,120,8,5], ['blush',152,118,8,5]];
  const fierce = [['stroke',[[104,97],[122,104]],3.4], ['stroke',[[152,95],[134,102]],3.4], ['dot',116,110,4.4], ['dot',140,108,4.4],
                  ['mouth',[[112,120],[144,118],[140,134],[128,138],[116,134]],[128,134,7,3]]];
  const rays = (c, x, y, r0, r1, n) => { for (let k = 0; k < n; k++) { const a = k * TAU / n + 0.3; c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); } };
  // the toy: a box on wheels with a key in its back. dir: 1 facing right; turn: the key seen edge on; scared: wide-eyed; hop: off the floor; dust: fleeing
  const toy = (c, x, dir, { turn, scared, hop = 0, dust } = {}) => {
    const X = u => u * dir, y = 0;
    c.save(); c.translate(x, 201 - hop); c.scale(1.25, 1.25); c.strokeStyle = YELLOW; c.lineWidth = 3; c.beginPath(); c.moveTo(X(-20), y - 27); c.lineTo(X(-29), y - 27);
    if (turn) { c.moveTo(X(-31), y - 39); c.lineTo(X(-31), y - 15); }
    c.stroke();
    if (!turn) [-7, 7].forEach(o => { c.beginPath(); c.arc(X(-34), y - 27 + o, 6, 0, TAU); c.stroke(); });
    c.strokeStyle = CREAM; c.fillStyle = STONE; c.beginPath(); c.roundRect(-20, y - 43, 40, 32, 7); c.fill(); c.stroke();
    c.fillStyle = DARK; c.lineWidth = 2.6; [-11, 11].forEach(u => { c.beginPath(); c.arc(X(u), y - 7, 6, 0, TAU); c.fill(); c.stroke(); });
    [3, 13].forEach(u => { c.beginPath(); c.arc(X(u), y - 30, scared ? 4 : 3, 0, TAU); c.fill(); });
    c.strokeStyle = DARK; c.beginPath();
    if (scared) c.arc(X(8), y - 19, 2.6, 0, TAU); else { c.moveTo(X(-3), y - 39); c.lineTo(X(16), y - 35); }
    c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath();
    if (scared && !dust) rays(c, 0, y - 46, 14, 22, 9);
    if (dust) [0, 9, 18].forEach(o => { c.moveTo(X(-44) - o * dir, y - 12 - o); c.lineTo(X(-56) - o * dir, y - 12 - o); });
    c.stroke(); c.restore();
  };
  // eaten: small dots gone; big: the big dot is still there; toy: [x, dir, options]; walls: the corridor; glow: where he has just powered up
  const scene = ({ eaten = 0, big = true, toy: t, walls = true, glow }) => ({
    back: (c, d, seed) => {
      c.save(); c.lineCap = c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
      if (walls) { c.globalAlpha = 0.7; [76, 207].forEach((y, i) => { openPath(c, boil([[-4, y], [60, y - 1], [124, y + 1], [184, y - 1], [244, y]], seed + i * 5, 1.6)); c.stroke(); }); c.globalAlpha = 1; }
      c.fillStyle = YELLOW;
      DOTS.slice(eaten).forEach(x => { c.beginPath(); c.arc(x, 154, 4.5, 0, TAU); c.fill(); });
      if (big) { c.lineWidth = 2.4; c.beginPath(); c.arc(BIG, 154, 10, 0, TAU); c.fill(); c.stroke(); }
      if (glow) { c.lineWidth = 3; c.strokeStyle = YELLOW; c.beginPath(); rays(c, glow, 152, 58, 72, 10); c.stroke(); }
      if (t) toy(c, ...t);
      c.restore();
    },
  });
  const seq = [...WAKE];
  let n = 0;
  const add = (ticks, o, s) => { D[P + n] = xf(D.N, { ...o, extra: scene(s) }); seq.push([P + n++, ticks]); };
  const head = (x, o) => ({ k: 0.62, dx: x - 128, ...o });
  add(2, { k: 0.8, dx: -44, face: FACE.lookr }, {});
  add(4, head(42, { face: FACE.lookr }), {});
  [66, 90, 114, 138, 162].forEach((x, i) => add(4, head(x, { face: i % 2 ? shut : open }), { eaten: DOTS.filter(dot => dot <= x + 18).length, toy: [i * 26 - 6, 1, { turn: i % 2 }] }));
  add(3, head(186, { face: gulp, kx: 1.1, ky: 0.92 }), { eaten: 4, big: false, toy: [122, 1, { turn: true }] });
  const big = { k: 0.82, kx: -1, face: fierce }, after = { eaten: 4, big: false };
  add(5, { ...big, dx: 52 }, { ...after, glow: 180, toy: [106, 1, { scared: true }] });
  add(5, { ...big, dx: 52 }, { ...after, toy: [100, 1, { scared: true, hop: 9 }] });
  [[80, 40], [46, 28], [4, 14], [-60, 4]].forEach(([x, dx], i) => add(2, { ...big, dx }, { ...after, toy: [x, -1, { scared: true, dust: true, turn: i % 2 }] }));
  add(2, { k: 0.92, face: FACE.happy }, after);
  add(4, { face: FACE.happy, ky: 1.03 }, after);
  add(8, { face: FACE.happy }, { ...after, walls: false });
  CLIPS.maze_chase = { home: 'idle', seq: [...seq, ...DOZE] };
})();
