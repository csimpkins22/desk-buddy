// Dandelion: he blows a dandelion clock, the seeds drift off, and the last one goes the long way round and lands on his cowlick.
// group: pastimes
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, boil } = window.__lump;
  const CREAM = '#FFF1DC', HX = 178, HY = 96;
  const blowing = [['stroke',[[110,108],[116,112],[122,108]],3], ['stroke',[[134,106],[140,110],[146,106]],3], ['mouth',[[133,119],[141,119],[142,125],[137,128],[132,125]]]];
  const crossed = [['dot',121,101,3.8], ['dot',137,100,3.8], ['mouth',[[124,120],[132,120],[133,126],[128,129],[123,126]]]];
  const here = xf(D.N, { dx: -34 }), TIP = [here.curl[2][0], here.curl[2][1] - 10];
  const seed = (c, x, y, a) => {
    c.save(); c.translate(x, y); c.rotate(a);
    c.beginPath(); c.moveTo(0, 10); c.lineTo(0, 0); c.moveTo(-7, -5); c.lineTo(0, 0); c.lineTo(7, -5); c.moveTo(0, -9); c.lineTo(0, 0); c.stroke();
    c.restore();
  };
  const pen = c => { c.lineCap = c.lineJoin = 'round'; c.strokeStyle = c.fillStyle = CREAM; c.lineWidth = 2; };
  // fluff: how much of the clock is left, from 1 to 0. It goes from the side he blows on
  const flower = fluff => (c, d, s) => {
    c.save(); pen(c);
    c.strokeStyle = '#58D68D'; c.lineWidth = 3.2; c.beginPath(); c.moveTo(162, 152); c.quadraticCurveTo(164, 120, HX, HY); c.stroke();
    c.strokeStyle = CREAM; c.lineWidth = 1.8;
    if (fluff === 1) { c.globalAlpha = 0.3; c.beginPath(); c.arc(HX, HY, 20, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1; }
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * Math.PI * 2 + 0.2, [[x, y]] = boil([[HX + Math.cos(a) * 18, HY + Math.sin(a) * 18]], s + i, 2);
      if (Math.cos(a) < 1 - fluff * 2) continue;
      c.beginPath(); c.moveTo(HX + Math.cos(a) * 5, HY + Math.sin(a) * 5); c.lineTo(x, y); c.stroke();
      c.beginPath(); c.arc(x, y, 2.2, 0, Math.PI * 2); c.fill();
    }
    c.fillStyle = '#6B4A1F'; c.beginPath(); c.arc(HX, HY, 4.5, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const EXITS = [[252, 40], [204, -14], [146, -14], [252, 84], [84, -14], [232, -14], [36, -12], [252, 8]];
  const curve = (u, a, b, e) => (1 - u) * (1 - u) * a + 2 * u * (1 - u) * b + u * u * e;
  const drift = start => (c, d, s, tick) => {
    const t = Math.floor((tick - start) / 2) * 2;
    c.save(); pen(c);
    EXITS.forEach(([ex, ey], i) => {
      const u = (t - i * 2.5) / (34 + (i % 3) * 5);
      if (u >= 0 && u <= 1) seed(c, curve(u, HX, 198 + (i % 3) * 18, ex), curve(u, HY, 84 - (i % 4) * 20, ey) + Math.sin(t / 5 + i) * 3, Math.sin(t / 4 + i * 2) * 0.35);
    });
    const u = Math.max(0, Math.min(1, (t - 8) / 50)), sway = Math.sin(t / 4) * (1 - u);          // the last one: up, over, and down onto his cowlick
    if (u < 0.5) seed(c, curve(u * 2, HX, 226, 162), curve(u * 2, HY, 30, 14), sway * 0.4);
    else seed(c, curve(u * 2 - 1, 162, 104, TIP[0]) + sway * 8, curve(u * 2 - 1, 14, 2, TIP[1]), sway * 0.8);
    c.restore();
  };
  const landed = d => { const [x, y] = d.curl[2]; return c => { c.save(); pen(c); seed(c, x, y - 10, 0.1); c.restore(); }; };
  const hold = { arm2: [[132, 142], [156, 150]] }, both = (...fs) => (c, d, s, tick) => fs.forEach(f => f(c, d, s, tick));
  const pre = [...WAKE, ['dandelion_in', 3], ['dandelion_1', 10], ['dandelion_2', 8]], T0 = pre.reduce((n, [, held]) => n + held, 0);
  const at = (o, front, extra = {}) => xf(D.N, { dx: -34, ...o, extra: { ...hold, front, ...extra } });
  D.dandelion_in = xf(D.N, { dx: -17, rot: -0.04, face: FACE.lookr });
  D.dandelion_1 = at({ face: FACE.lookr }, flower(1));
  D.dandelion_2 = at({ face: FACE.puff, rot: -0.08, ky: 1.04 }, flower(1));
  [0.5, 0, 0].forEach((fluff, i) => { D['dandelion_b' + i] = at({ face: blowing, rot: 0.07 }, both(flower(fluff), drift(T0)), { blow: [118, 122, -0.3, 0.85, i] }); });
  D.dandelion_w1 = at({ face: FACE.lookr }, both(flower(0), drift(T0)));
  D.dandelion_w2 = at({ face: FACE.lookup }, both(flower(0), drift(T0)));
  [['l1', crossed, 0], ['l2', FACE.cute, -0.03], ['l3', FACE.cute, 0.03]].forEach(([n, face, rot]) => {
    const d = D['dandelion_' + n] = at({ face, rot }); d.front = both(flower(0), landed(d));
  });
  CLIPS.dandelion = { home: 'idle', seq: [...pre, ['dandelion_b0', 5], ['dandelion_b1', 5], ['dandelion_b2', 6], ['dandelion_w1', 16], ['dandelion_w2', 28], ['dandelion_l1', 8],
    ['dandelion_l2', 5], ['dandelion_l3', 5], ['dandelion_l2', 5], ['dandelion_l3', 5], ['dandelion_in', 3], ...DOZE] };
})();
