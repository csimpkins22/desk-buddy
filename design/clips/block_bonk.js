// Block bonk: he jumps and headbutts a floating block, and a coin pops out. He does it again. The third time the block is empty and he just hurts his head.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', BLUE = '#5AB8FF', STONE = '#9FB0C4', TAU = Math.PI * 2, P = 'block_bonk_', REST = [[204, 190], [228, 190]];
  const pleased = [['dot',124,108,4.2], ['dot',148,106,4.2], ['mouth',[[122,120],[140,119],[138,129],[131,132],[124,129]]]];
  // these two go on the jumping drawings A3 and A4, whose faces sit higher than the standing one
  const ouch = [['stroke',[[106,89],[114,94],[106,99]],3], ['stroke',[[146,87],[138,92],[146,97]],3], ['mouth',[[121,106],[135,105],[137,119],[128,124],[119,119]]]];
  const seeing = [['spiral',116,106,5], ['spiral',138,104,5], ['stroke',[[120,122],[124,120],[128,122],[132,120],[136,122]],2.6]];
  const coin = (c, x, y) => {
    c.fillStyle = YELLOW; c.lineWidth = 2.6; c.beginPath(); c.arc(x, y, 11, 0, TAU); c.fill(); c.stroke();
    c.lineWidth = 2.2; c.beginPath(); c.moveTo(x, y - 5); c.lineTo(x, y + 5); c.stroke();
  };
  // up: how far the block is knocked upwards; spent: empty and dull; coins: where each one is; clink: a coin landing there; thunk: nothing came out
  const scene = ({ up = 0, spent, coins = [], clink, thunk }) => c => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM;
    c.fillStyle = spent ? STONE : BLUE; c.lineWidth = 3; c.beginPath(); c.roundRect(110, 6 - up, 36, 36, 7); c.fill(); c.stroke();
    c.globalAlpha = 0.7; c.lineWidth = 2.4; c.beginPath(); c.moveTo(119, 15 - up); c.lineTo(119, 25 - up); c.stroke(); c.globalAlpha = 1;
    coins.forEach(([x, y]) => coin(c, x, y));
    c.lineWidth = 2.6; c.beginPath();
    if (clink) { const [x, y] = clink; c.moveTo(x - 13, y - 7); c.lineTo(x - 19, y - 15); c.moveTo(x + 13, y - 7); c.lineTo(x + 19, y - 15); }
    if (thunk) [[98, 48, 86, 56], [158, 48, 170, 56], [100, 30, 86, 30], [156, 30, 170, 30]].forEach(([x0, y0, x1, y1]) => { c.moveTo(x0, y0); c.lineTo(x1, y1); });
    c.stroke(); c.restore();
  };
  const seq = [...WAKE];
  let n = 0;
  const add = (ticks, base, o, s) => { D[P + n] = xf(base, { ...o, extra: { front: scene(s), ...o.extra } }); seq.push([P + n++, ticks]); };
  add(3, D.N, { face: FACE.lookup }, { up: 26 });
  add(6, D.N, { face: FACE.lookup }, {});
  REST.forEach(([x, y], j) => {
    const had = REST.slice(0, j), spent = j === 1;
    add(3, D.A1, {}, { coins: had });
    add(2, D.A2, {}, { coins: had });
    add(3, D.A3, { dy: -8 }, { up: 6, coins: [...had, [162, 12]] });
    add(2, D.A4, {}, { spent, coins: [...had, [190, 28]] });
    add(3, D.A5, {}, { spent, coins: [...had, [x - 4, 104]] });
    add(4, D.N, { face: pleased }, { spent, coins: [...had, [x, y]], clink: [x, y] });
  });
  const empty = { spent: true, coins: REST };
  add(3, D.A1, {}, empty);
  add(2, D.A2, {}, empty);
  add(4, D.A3, { dy: -8, ky: 0.88, oy: 50, face: ouch }, { ...empty, thunk: true });
  add(2, D.A4, { face: seeing }, empty);
  add(4, D.N, { ky: 0.6, kx: 1.25, face: FACE.spiral }, empty);
  [0.05, -0.05, 0.05, -0.05].forEach(rot => add(4, D.N, { rot, face: FACE.spiral }, empty));
  add(8, D.N, { face: FACE.grump }, empty);
  CLIPS.block_bonk = { home: 'idle', seq: [...seq, ...DOZE] };
})();
