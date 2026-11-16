// Floor piano: a giant keyboard slides in under him. He hops from key to key, each one lighting as he lands, then belly-slides the whole way back along it.
// group: movies
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, mixHex } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', WHITE = '#E9EEF5', RED = '#FF5A4D', YELLOW = '#FFD23F', GREEN = '#58D68D', BLUE = '#5AB8FF', TAU = Math.PI * 2;
  const K = 0.82, FAR = 180, NEAR = 236, COLOURS = [GREEN, BLUE, RED, YELLOW, GREEN, BLUE, RED, YELLOW, GREEN], SHARPS = [-4, 76, 116, 196, 236, 276];
  const key = i => 16 + 40 * i;                               // where white key i is centred, level with his feet
  const peer = [['dot',116,115,4.4], ['dot',140,113,4.4], ['mouth',[[123,124],[133,123],[134,131],[128,134],[122,131]]]];
  const whee = [['stroke',[[158,162],[164,155],[170,162]],3], ['stroke',[[175,165],[181,158],[187,165]],3], ['mouth',[[168,172],[188,172],[187,184],[178,189],[169,184]],[178,185,6,4]]];
  const note = (c, x, y, colour) => {
    c.fillStyle = c.strokeStyle = colour; c.lineWidth = 2.6;
    c.beginPath(); c.ellipse(x, y, 6.4, 4.8, -0.4, 0, TAU); c.fill();
    c.beginPath(); c.moveTo(x + 5.4, y - 1); c.lineTo(x + 5.4, y - 22); c.quadraticCurveTo(x + 14, y - 18, x + 13, y - 10); c.stroke();
  };
  // off: how far off to the right the keyboard still is. lit: how bright each white key is, by number, 0 to 1.
  const board = ({ off = 0, lit = {} }) => (c, d, seed) => {
    const sx = (u, y) => 120 + (u + off - 120) * (1 + (y - 201) * 0.002);         // wider towards us
    const quad = (u0, u1, y0, y1) => { c.beginPath(); c.moveTo(sx(u0, y0), y0); c.lineTo(sx(u1, y0), y0); c.lineTo(sx(u1, y1), y1); c.lineTo(sx(u0, y1), y1); c.closePath(); };
    const L = -52, R = 340;
    c.save(); c.lineJoin = c.lineCap = 'round';
    quad(L - 5, R, FAR - 7, FAR); c.fillStyle = RED; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 2.4; c.stroke();
    for (let i = -1; i < 9; i++) {
      const a = lit[i] || 0;
      quad(key(i) - 20, key(i) + 20, FAR, NEAR); c.fillStyle = a ? mixHex(WHITE, COLOURS[i + 1], Math.min(1, a)) : WHITE; c.fill(); c.strokeStyle = DARK; c.lineWidth = 2.2; c.stroke();
      if (a >= 0.9) { quad(key(i) - 12, key(i) + 12, 207, 230); c.fillStyle = CREAM; c.globalAlpha = 0.55; c.fill(); c.globalAlpha = 1; }
    }
    quad(L, R, NEAR, NEAR + 5); c.fillStyle = '#9FB0C4'; c.fill();
    quad(L, R, FAR, NEAR); c.strokeStyle = CREAM; c.lineWidth = 3; c.stroke();
    SHARPS.forEach(u => {
      quad(u - 10, u + 10, 203, 208); c.fillStyle = '#3F4855'; c.fill();
      quad(u - 10, u + 10, FAR, 204); c.fillStyle = DARK; c.fill(); c.strokeStyle = CREAM; c.lineWidth = 1.8; c.stroke();
    });
    Object.keys(lit).forEach(i => { if (lit[i] >= 0.9) { quad(key(+i) - 27, key(+i) + 27, FAR - 12, 240); c.fillStyle = COLOURS[+i + 1]; c.globalAlpha = 0.22; c.fill(); c.globalAlpha = 1; } });
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(d.shadow[0] + 3, 204, d.shadow[1], 5, 0, 0, TAU); c.fill();
    c.restore();
  };
  // in front: notes drifting up from the keys ([key, how far up]), and streaks behind him as he slides
  const fore = ({ notes = [], streaks }) => c => {
    c.save(); c.lineCap = 'round';
    notes.forEach(([i, up]) => { c.globalAlpha = 1 - up * 0.2; note(c, key(i) + (i % 2 ? 40 : -48), 150 - up * 20 - (i % 3) * 8, COLOURS[i + 1]); });
    c.globalAlpha = 1;
    if (streaks) { c.strokeStyle = CREAM; c.lineWidth = 2.6; c.globalAlpha = 0.7; c.beginPath(); [[166, 0, 26], [178, -12, 18], [190, 4, 22]].forEach(([y, x, n]) => { c.moveTo(streaks + x, y); c.lineTo(streaks + x - n, y); }); c.stroke(); }
    c.restore();
  };
  const P = 'floor_piano_';
  const put = (name, base, o, scene = {}, front = {}) => { D[P + name] = xf(base, { shadowK: 0.82, ...o, extra: { back: board(scene), front: fore(front), ...o.extra } }); };
  const on = (u, o = {}) => ({ k: K, dx: u - 128, dy: -1, ...o });
  put('in1', D.N, { face: FACE.lookr }, { off: 210 });
  put('in2', D.N, { face: FACE.lookr, ky: 0.86, kx: 1.08 }, { off: 120 });
  put('in3', D.N, { face: FACE.lookr, k: 0.92, dx: 4, dy: -44, ky: 1.08, kx: 0.95, shadowK: 0.6 }, { off: 34 });
  put('in4', D.N, on(key(3), { face: peer, ky: 0.84, kx: 1.1 }), { lit: { 3: 1 } }, { notes: [[3, 0]] });
  put('in5', D.N, on(key(3), { face: peer }), { lit: { 3: 0.8 } }, { notes: [[3, 1]] });
  put('in6', D.N, on(key(3), { face: FACE.happy, ky: 1.03 }), { lit: { 3: 0.5 } });
  // a hop to white key `to`: in the air, landing (the key lights), and settled
  let here = 3, hops = 0;
  const hopTo = (to, face, quick) => {
    const a = key(here), b = key(to), n = ++hops, was = here; here = to;
    put(`h${n}a`, D.N, on((a + b) / 2, { dy: quick ? -44 : -36, ky: 1.08, kx: 0.95, rot: (b > a ? 1 : -1) * 0.1, face, shadowK: 0.5 }), { lit: { [was]: 0.5 } }, { notes: [[was, 2]] });
    put(`h${n}b`, D.N, on(b, { ky: 0.84, kx: 1.1, face }), { lit: { [to]: 1, [was]: 0.25 } }, { notes: [[to, 0]] });
    put(`h${n}c`, D.N, on(b, { face, ky: 1.02 }), { lit: { [to]: 0.8 } }, { notes: [[to, 1]] });
    return quick ? [[P + `h${n}a`, 2], [P + `h${n}b`, 3]] : [[P + `h${n}a`, 2], [P + `h${n}b`, 2], [P + `h${n}c`, 3]];
  };
  const hopping = [...hopTo(2, FACE.happy), ...hopTo(3, FACE.happy), ...hopTo(4, FACE.happy), ...hopTo(3, D.D2.face, true), ...hopTo(2, D.D2.face, true), ...hopTo(1, D.D2.face)];
  // the slide: lying down, head first to the right, the keys lighting behind him as he passes over them
  const lie = (x, o = {}) => ({ k: K, dx: x - 124, dy: -1, face: whee, ...o });
  const trail = upTo => Object.fromEntries([1, 2, 3, 4, 5].filter(i => i <= upTo).map(i => [i, i === upTo ? 1 : 0.75]));
  put('wind', D.N, on(key(1), { face: D.D2.face, rot: -0.1, ky: 0.92, kx: 1.04, extra: { arm: [[32, 150], [12, 166]], arm2: [[90, 148], [114, 136]] } }), { lit: { 1: 0.6 } });
  put('dive', D.A1, on(70, { face: [['stroke',[[122,150],[128,143],[134,150]],3], ['stroke',[[150,148],[156,141],[162,148]],3], ['mouth',[[132,158],[154,157],[152,170],[143,175],[134,170]],[143,171,7,4]]], rot: 0.1 }), { lit: { 1: 1 } });
  put('slide1', D.S1, lie(94, { kx: 1.1, ky: 0.9, extra: { arm: [[80, 176], [50, 164]] } }), { lit: trail(2) }, { streaks: 36, notes: [[1, 0]] });
  put('slide2', D.S1, lie(128, { kx: 1.1, ky: 0.9, extra: { arm: [[114, 176], [84, 164]] } }), { lit: trail(3) }, { streaks: 70, notes: [[1, 1], [2, 0]] });
  put('slide3', D.S1, lie(158, { kx: 1.06, ky: 0.94, extra: { arm: [[144, 176], [116, 166]] } }), { lit: trail(4) }, { streaks: 100, notes: [[2, 1], [3, 0]] });
  put('stop', D.S1, lie(174, { kx: 0.92, ky: 1.08 }), { lit: trail(5) }, { notes: [[3, 1], [4, 0]] });
  const GLOW = { 1: 0.75, 2: 0.75, 3: 0.75, 4: 0.75, 5: 0.75 };
  put('tada1', D.S1, lie(168, { extra: { arm2: [[170, 162], [178, 132]] } }), { lit: { ...GLOW, 1: 1, 3: 1, 5: 1 } }, { notes: [[4, 1], [5, 0]] });
  put('tada2', D.S3, lie(168, { extra: { arm2: [[170, 156], [184, 128]] } }), { lit: { ...GLOW, 2: 1, 4: 1 } }, { notes: [[5, 1], [2, 0]] });
  put('up', D.A1, on(160, { face: [['dot',112,150,3.8], ['dot',150,148,3.8], ['stroke',[[123,166],[130,169],[137,166]],2.8]] }), { lit: { 2: 0.4, 3: 0.4, 4: 0.4 } });
  put('off1', D.N, { face: FACE.happy, k: 0.92, dx: 14, dy: -40, ky: 1.08, kx: 0.95, rot: -0.08, shadowK: 0.6 }, { off: 70, lit: { 3: 0.2 } });
  put('off2', D.N, { face: FACE.happy, ky: 0.86, kx: 1.08, shadowK: 1 }, { off: 180 });
  put('off3', D.N, { face: FACE.happy, shadowK: 1 }, { off: 300 });
  const s = (id, n) => [P + id, n], bow = n => Array.from({ length: n }, (_, i) => s(i % 2 ? 'tada2' : 'tada1', 4));
  CLIPS.floor_piano = { home: 'idle', seq: [...WAKE, s('in1', 2), s('in2', 2), s('in3', 2), s('in4', 3), s('in5', 5), s('in6', 3), ...hopping,
    s('wind', 4), s('dive', 2), s('slide1', 2), s('slide2', 2), s('slide3', 2), s('stop', 2), ...bow(4), s('up', 3), s('off1', 2), s('off2', 2), s('off3', 2), ...DOZE] };
})();
