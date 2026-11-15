// Falling blocks: plain blocks drop and stack beside him until one gap is left. He squeezes into it, the full row flashes and vanishes with him in it, and he pops back.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, closedPath } = window.__lump;
  const CREAM = '#FFF1DC', COLOURS = ['#FFD23F', '#5AB8FF', '#58D68D', '#FF5A4D'], P = 'falling_blocks_', S = 40, ROW = 161;
  const lookl = [['dot',108,110,3.8], ['dot',132,108,3.8], ['stroke',[[118,124],[123,126],[128,124]],2.6]];
  const upr = [['dot',124,102,4.2], ['dot',148,100,4.2], ['mouth',[[128,118],[138,117],[139,126],[133,129],[127,126]]]];
  const squeezed = [...FACE.chooEyes, ['stroke',[[120,125],[124,122],[128,125],[132,122],[136,125]],2.6]];
  // blocks are [column, top, colour, slide]. flash: the floor row goes white; thud: the block that has just landed; poof: where the row was
  const blocks = (list, { flash, thud, poof } = {}) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineJoin = c.lineCap = 'round';
    list.forEach(([col, y, colour, slide = 0]) => {
      const x = col * S + slide;
      c.lineWidth = 3; c.fillStyle = flash && y === ROW ? CREAM : COLOURS[colour];
      c.beginPath(); c.roundRect(x + 3, y + 3, S - 6, S - 6, 6); c.fill(); c.stroke();
      c.globalAlpha = 0.6; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x + 11, y + 11); c.lineTo(x + 11, y + 21); c.stroke(); c.globalAlpha = 1;
    });
    c.lineWidth = 2.4; c.beginPath();
    if (thud) { const [col, y] = thud, x = col * S; [[2, -8], [S - 2, 8]].forEach(([ex, away]) => { c.moveTo(x + ex, y + S - 10); c.lineTo(x + ex + away, y + S - 16); }); }
    if (poof) for (let col = 1; col < 6; col++) { const x = col * S + 20, r = col % 2 ? 7 : 4; c.moveTo(x - r, 181); c.lineTo(x + r, 181); c.moveTo(x, 181 - r); c.lineTo(x, 181 + r); }
    c.stroke(); c.restore();
  };
  const white = (c, d) => { c.save(); c.fillStyle = CREAM; closedPath(c, d.body); c.fill(); c.restore(); };
  const pop = c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3; c.beginPath();
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + 0.3; c.moveTo(128 + Math.cos(a) * 40, 140 + Math.sin(a) * 40); c.lineTo(128 + Math.cos(a) * 56, 140 + Math.sin(a) * 56); }
    c.stroke(); c.restore();
  };
  const seq = [...WAKE], landed = [];
  let n = 0;
  const add = (ticks, o, list, opts) => { D[P + n] = xf(D.N, { ...o, extra: { back: blocks(list, opts), ...o.extra } }); seq.push([P + n++, ticks]); };
  // a block drops into a column in three drawings; o is how he watches it, landO how he takes the landing
  const fall = (col, colour, top, o, landO = o) => {
    add(2, o, [...landed, [col, top - 170, colour]]);
    add(2, o, [...landed, [col, top - 70, colour]]);
    landed.push([col, top, colour]);
    add(3, landO, landed, { thud: [col, top] });
  };
  const here = { dx: 6 }, thin = { dx: -8, kx: 0.64, ky: 1.25, face: squeezed }, away = { dx: 400, shadowK: 0 };
  fall(0, 0, ROW, { ...here, face: lookl });
  fall(5, 1, ROW, { ...here, face: FACE.lookr });
  fall(1, 2, ROW, { ...here, face: lookl }, { ...here, face: FACE.shock, rot: 0.05 });
  fall(0, 3, ROW - S, { ...here, face: lookl });
  // the last block hangs over the gap he is standing in
  add(3, { ...here, face: upr, extra: { fxm: 'alert', fx: [112, 56] } }, [...landed, [4, 10, 0]]);
  add(3, { ...here, face: upr, extra: { fxm: 'alert', fx: [112, 56] } }, [...landed, [4, 16, 0]]);
  add(4, thin, [...landed, [4, 16, 0]]);
  add(2, thin, [...landed, [4, 90, 0]]);
  landed.push([4, ROW, 0]);
  add(3, thin, landed, { thud: [4, ROW] });
  for (let i = 0; i < 2; i++) { add(2, { ...thin, extra: { front: white } }, landed, { flash: true }); add(2, thin, landed); }
  // only the block that was stacked on the row is left, and it drops into the space
  add(3, away, [[0, ROW - S, 3]], { poof: true });
  add(2, away, [[0, ROW - 16, 3]]);
  add(6, away, [[0, ROW, 3]], { thud: [0, ROW] });
  add(2, { k: 0.3, ox: 128, oy: 140, face: FACE.shock, shadowK: 0.3, extra: { front: pop } }, [[0, ROW, 3]]);
  add(2, { k: 1.1, face: FACE.shock }, [[0, ROW, 3, -26]]);
  add(5, { face: FACE.shock }, []);
  add(4, { face: lookl }, []);
  add(6, { face: FACE.sheep }, []);
  CLIPS.falling_blocks = { home: 'idle', seq: [...seq, ...DOZE] };
})();
