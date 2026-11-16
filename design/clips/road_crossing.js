// Road crossing: he leaps to the far side and hops home lane by lane between passing boxes, rides a floating log for a moment, and makes it across with a relieved flop.
// group: games
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', YELLOW = '#FFD23F', RED = '#FF5A4D', BLUE = '#5AB8FF', BROWN = '#6B4A1F', TAU = Math.PI * 2, P = 'road_crossing_';
  const down = [['dot',118,114,3.8], ['dot',140,113,3.8], ['stroke',[[123,127],[133,127]],2.6]];
  const lookl = [['dot',108,110,3.8], ['dot',132,108,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]];
  const easy = [...FACE.aahEyes, ['stroke',[[120,122],[128,127],[136,122]],2.8]];
  const mod = (a, n) => ((a % n) + n) % n;
  const box = (c, x, y, colour, dir) => {
    c.fillStyle = colour; c.lineWidth = 3; c.beginPath(); c.roundRect(x - 23, y - 13, 46, 26, 5); c.fill(); c.stroke();
    c.lineWidth = 2.2; c.beginPath(); c.moveTo(x, y - 13); c.lineTo(x, y + 13);
    [-6, 5].forEach(o => { c.moveTo(x - dir * 30, y + o); c.lineTo(x - dir * 40, y + o); });
    c.stroke();
  };
  // the far road (two lanes of boxes going opposite ways), the river and its log, at two-tick frame f. He is in each lane only while its gap goes by.
  const scene = f => c => {
    c.save(); c.lineJoin = c.lineCap = 'round';
    c.fillStyle = '#0E2438'; c.fillRect(0, 116, 240, 48);
    c.strokeStyle = BLUE; c.globalAlpha = 0.6; c.lineWidth = 2.4; c.beginPath();
    [[30, 126], [150, 124], [210, 156], [80, 158]].forEach(([x, y]) => { const wx = mod(x - f * 2, 280) - 20; c.moveTo(wx, y); c.quadraticCurveTo(wx + 8, y - 5, wx + 16, y); });
    c.stroke();
    c.strokeStyle = CREAM; c.globalAlpha = 0.5; c.beginPath(); c.moveTo(0, 12); c.lineTo(240, 12); c.moveTo(0, 112); c.lineTo(240, 112); c.stroke();
    c.setLineDash([12, 12]); c.beginPath(); c.moveTo(4, 62); c.lineTo(240, 62); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
    const lx = 128 + 3 * (14 - Math.min(f, 26));
    c.fillStyle = BROWN; c.lineWidth = 3; c.beginPath(); c.roundRect(lx - 46, 140, 92, 20, 9); c.fill(); c.stroke();
    c.lineWidth = 2; c.beginPath(); c.ellipse(lx + 37, 150, 4, 7, 0, 0, TAU); c.moveTo(lx - 32, 147); c.lineTo(lx - 10, 147); c.moveTo(lx - 16, 154); c.lineTo(lx + 12, 154); c.stroke();
    for (let i = 0; i < 2; i++) {
      box(c, mod(8 * f + 194 + 150 * i, 300) - 30, 43, YELLOW, 1);
      box(c, 270 - mod(6 * f + 152 + 150 * i, 300), 91, RED, -1);
    }
    c.restore();
  };
  const seq = [...WAKE];
  let n = 0;
  const add = (ticks, o, f) => { D[P + n] = xf(D.N, { ...o, extra: { back: scene(f) } }); seq.push([P + n++, ticks]); };
  const at = (feet, o) => ({ k: 0.42, dy: feet - 201, shadowK: 0, ...o }), land = { ky: 0.85, kx: 1.1 }, hop = { ky: 1.14 }, crouch = { ky: 0.9 };
  add(2, { k: 0.7, dy: -70, ky: 1.1, face: FACE.lookup, shadowK: 0.5 }, -2);
  add(2, { k: 0.5, dy: -170, ky: 1.1, face: FACE.lookup, shadowK: 0 }, -1);
  [0, 1, 2].forEach(f => add(2, { dy: -400, shadowK: 0 }, f));
  [[30, hop, down], [58, land, down], [58, {}, lookl], [58, {}, FACE.lookr], [58, crouch, down],
   [78, hop, FACE.shock], [106, land, FACE.shock], [106, {}, FACE.lookr], [106, {}, lookl], [106, crouch, down],
   [124, hop, down]].forEach(([feet, o, face], i) => add(2, at(feet, { ...o, face }), i + 3));
  for (let f = 14; f <= 20; f++) add(2, at(148 + f % 2, { dx: 3 * (14 - f), ...(f === 14 ? land : f === 20 ? crouch : {}), face: f === 14 ? FACE.shock : f === 20 ? down : easy }), f);
  add(2, { k: 0.7, dx: -10, dy: -26, ky: 1.1, face: FACE.shock, shadowK: 0.6 }, 21);
  add(4, { ky: 0.55, kx: 1.3, face: FACE.aah }, 22);
  add(4, { ky: 0.6, kx: 1.27, face: FACE.aah }, 24);
  add(4, { ky: 0.55, kx: 1.3, face: easy }, 26);
  add(3, { ky: 0.85, kx: 1.08, face: easy }, 28);
  add(8, { face: easy }, 30);
  CLIPS.road_crossing = { home: 'idle', seq: [...seq, ...DOZE] };
})();
