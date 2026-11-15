// Dramatic turn: he is gazing off at the horizon. He snaps round to face you as the view punches in close, holds a long hard stare, and lets one eyebrow rise.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil, openPath } = window.__lump;
  const CREAM = '#FFF1DC', GREEN = '#58D68D', MOSS = '#3FAE6E', P = 'dramatic_turn_', FX = 128, FY = 104;
  // his face slid `off` round his head towards the right; brow: how far the eyebrow on our right has risen, 0 to 1
  const stare = (off = 0, brow = 0, r = 4.4) => [
    ['stroke',[[107 + off,101 + brow],[122 + off,104.5 + brow * 1.5]],3], ['stroke',[[134 + off,102 - brow * 7],[141 + off,100.5 - brow * 11.5],[149 + off,98 - brow * 8]],3],
    ['dot',116 + off,110 + brow * 0.5,r - brow * 0.5], ['dot',140 + off,108 - brow,r + brow * 0.6], ['shine',117.6 + off,108.6 + brow * 0.5,1.1], ['shine',141.6 + off,106.6 - brow,1.1],
    ['stroke',[[110 + off,116.5],[116 + off,117.5],[122 + off,116.5]],1.5], ['stroke',[[134 + off,114.5 + brow],[140 + off,115.5 + brow],[146 + off,114.5 + brow]],1.5], ['stroke',[[122 + off + brow,126],[134 + off + brow,125 - brow]],2.8]];
  const away = (r = 3.4, off = 0) => [['dot',164 + off,110,r], ['stroke',[[168 + off,124],[175 + off,123]],2.6]];
  const blink = [['stroke',[[110,110],[122,110]],3], ['stroke',[[134,108],[146,108]],3], ['stroke',[[122,124],[128,126],[134,124]],2.8]];
  const TUFTS = [[26, 202, 1], [50, 204, 0.8], [206, 203, 0.9], [226, 201, 1.1]], HILLS = [[-40, 152], [10, 146], [60, 151], [120, 147], [180, 152], [230, 147], [280, 151]];
  // the plain he is looking out over, as the view sees it: zoomed by k about his face. burst: how strongly the lines fly out behind his head. fade: how much of it is there yet.
  const plain = (k, dx, burst, fade = 1) => (c, d, seed) => {
    const at = ([x, y]) => [FX + (x - FX) * k + dx, FY + (y - FY) * k];
    c.save(); c.lineCap = c.lineJoin = 'round';
    if (k > 1) { c.fillStyle = 'rgba(255,241,220,.10)'; c.beginPath(); c.ellipse(...at([131, 203]), 60 * k, 6 * k, 0, 0, Math.PI * 2); c.fill(); }
    c.strokeStyle = CREAM; c.lineWidth = 2; c.globalAlpha = 0.3 * fade; openPath(c, boil(HILLS.map(at), seed + 2, 1.2)); c.stroke();
    c.globalAlpha = 0.22 * fade; c.beginPath(); c.moveTo(0, at([0, 204])[1]); c.lineTo(240, at([0, 204])[1]); c.stroke();
    c.globalAlpha = fade; c.lineWidth = 2.6;
    TUFTS.forEach(([x, y, s], i) => {
      c.strokeStyle = i % 2 ? MOSS : GREEN; c.beginPath();
      [[-7, -9], [-1, -15], [6, -10]].forEach(([u, v], j) => { const [bx, by] = at([x + j * 2 - 2, y]), [tx, ty] = at([x + u * s + (seed + i + j) % 3 - 1, y + v * s]); c.moveTo(bx, by); c.quadraticCurveTo(bx, (by + ty) / 2, tx, ty); });
      c.stroke();
    });
    if (burst) {
      c.strokeStyle = CREAM; c.globalAlpha = burst; c.lineWidth = 3; c.beginPath();
      for (let i = 0; i < 13; i++) { const a = Math.PI * (0.94 + i / 12 * 1.12), r0 = 104 + (i * 7 + seed * 3) % 5 * 5, r1 = r0 + 26 + i % 3 * 9; c.moveTo(122 + Math.cos(a) * r0, 122 + Math.sin(a) * r0); c.lineTo(122 + Math.cos(a) * r1, 122 + Math.sin(a) * r1); }
      c.stroke();
    }
    c.restore();
  };
  const seq = [...WAKE], show = (name, ticks) => seq.push([P + name, ticks]);
  // him acted by `o` (about his feet), then seen with the view zoomed by k
  const add = (name, ticks, o, k = 1, { dx = 0, burst = 0, fade = 1 } = {}) => {
    const d = xf(D.N, o);
    D[P + name] = k === 1 ? { ...d, back: plain(1, 0, 0, fade) } : xf(d, { k, ox: FX, oy: FY, dx, shadowK: 0, extra: { back: plain(k, dx, burst, fade) } });
    show(name, ticks);
  };
  add('gaze0', 3, { rot: 0.03, face: FACE.lookr }, 1, { fade: 0.4 });
  add('gaze1', 2, { rot: 0.05, face: [['dot',142,110,3.6], ['dot',164,108,3.4], ['stroke',[[150,124],[156,125.5],[162,123]],2.6]] }, 1, { fade: 0.75 });
  add('awayA', 6, { rot: 0.06, face: away() });
  add('awayB', 6, { rot: 0.075, ky: 1.015, face: away() });
  show('awayA', 6); show('awayB', 4);
  add('freeze', 4, { rot: 0.02, ky: 1.04, kx: 0.98, face: away(4.4) });
  add('wind', 2, { rot: 0.1, ky: 0.96, kx: 1.03, face: away(4, 6) });
  add('snap0', 2, { rot: 0.02, kx: 0.9, ky: 1.05, face: stare(16) }, 1.2, { dx: -2 });
  add('snap1', 2, { rot: -0.05, kx: 0.95, ky: 1.02, face: stare(-6) }, 1.6, { dx: -8, burst: 0.5 });
  add('snap2', 2, { rot: -0.01, face: stare(1) }, 2.04, { dx: -5, burst: 1 });
  add('snap3', 2, { face: stare() }, 1.88, { dx: -6, burst: 0.5 });
  [[1.9, 10], [1.95, 8], [2, 8]].forEach(([k, n], i) => add('stare' + i, n, { face: stare() }, k, { dx: -6 }));
  add('brow0', 2, { face: stare(0, 0.5) }, 2.03, { dx: -6 });
  add('brow', 18, { face: stare(0, 1, 4.6), rot: -0.012 }, 2.08, { dx: -6 });
  add('out0', 2, { face: stare(0, 0.4) }, 1.62, { dx: -4 });
  add('out1', 2, { face: blink, ky: 0.98 }, 1.24, { dx: -2, fade: 0.7 });
  add('out2', 2, { face: FACE.happy }, 1.06, { fade: 0.35 });
  CLIPS.dramatic_turn = { home: 'idle', seq: [...seq, ...DOZE] };
})();
