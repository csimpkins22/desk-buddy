// While he sleeps, specks of dust drift down and settle on him a few at a time until he wears a grey cap of it. His nose twitches, and one enormous sneeze clears the lot.
// group: odd
// Staging: asleep in his usual place and never wakes; dust from above; normal view; 11 seconds; a long quiet stretch then one hit; ends asleep and clean.
(() => {
  const { D, xf, hash, closedPath } = window.__lump, kit = window.__lump.kit, k = kit.clip('dust', { asleep: true });
  const S = 104, TOP = [[50, 190], [56, 176], [72, 160], [94, 148], [118, 142], [146, 140], [172, 144], [190, 154], [198, 170]];
  const topY = x => { if (x < 52 || x > 196) return 202; const i = TOP.findIndex(p => p[0] > x), a = TOP[i - 1], b = TOP[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); };
  const SPECKS = [2, 2, 3, 3, 3, 4, 4, 4, 3, 2].flatMap((n, g) => Array.from({ length: n }, (_, j) => {
    const i = g * 7 + j, x = Math.round(16 + hash(i * 3.71 + 0.5) * 208);
    return { x, t0: g * 5 + j, v: 3.6 + hash(i * 1.93 + 4) * 1.4, r: 3.2 + hash(i * 5.3) * 1.3, ph: i, on: x >= 52 && x <= 196, land: topY(x) - 2 };
  }));
  const dot = (c, x, y, r) => { c.beginPath(); c.arc(x, y, r, 0, kit.TAU); c.fill(); };
  // everything at step s of the fall, on a body stretched by ky; blast > 0 throws it all outward
  const dust = (s, ky = 1, blast = 0) => (c, d, seed) => {
    const lift = y => 201 + (y - 201) * ky, landed = SPECKS.filter(p => p.on && -6 + (s - p.t0) * p.v >= p.land).length, h = Math.min(10, landed * 0.55);
    c.save(); c.fillStyle = c.strokeStyle = kit.GREY; c.lineCap = 'round'; c.lineWidth = 3;
    if (h > 1 && !blast) {
      closedPath(c, [...TOP.slice(1).map(([x, y], i) => [x, lift(y) - h * (0.7 + 0.3 * hash(i * 2.3))]), ...TOP.slice(1).reverse().map(([x, y]) => [x, lift(y) + 3])]);
      c.fill();
    }
    SPECKS.forEach(p => {
      const t = s - p.t0, y = -6 + t * p.v;
      if (t < 0) return;
      let px = p.x, py = y >= p.land ? (p.on ? lift(p.land) - h * 0.8 : 199) : Math.round(y);
      if (y < p.land) px += Math.round(Math.sin(t * 0.3 + p.ph) * 4);
      if (blast) {
        const dx = px - 124, dy = py - 185, n = Math.hypot(dx, dy) || 1;
        px += dx / n * blast; py += dy / n * blast * 0.8 - blast * 0.25;
        c.beginPath(); c.moveTo(px - dx / n * 14, py - dy / n * 11); c.lineTo(px, py); c.stroke();
      }
      dot(c, px, py, p.r);
    });
    c.restore();
    if (blast) kit.fade(c, blast > 100 ? 0.4 : blast > 50 ? 0.7 : 1, () => {
      kit.puff(c, 44 - blast * 0.4, 150 - blast * 0.2, seed, 13 + blast * 0.08); kit.puff(c, 126, 118 - blast * 0.5, seed + 1, 15 + blast * 0.08); kit.puff(c, 206 + blast * 0.3, 136 - blast * 0.25, seed + 2, 12 + blast * 0.08);
    });
  };
  const lines = P => c => { c.save(); c.strokeStyle = kit.CREAM; c.lineCap = 'round'; c.lineWidth = 3; P.forEach(([a, b]) => { c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); }); c.restore(); };
  const both = (...fs) => (c, d, seed, tick) => fs.forEach(f => f(c, d, seed, tick));
  const TWITCH = [['stroke', [[167, 169], [174, 165], [181, 169]], 3], ['dot', 190, 177, 3.8]];
  const sniff = lines([[[198, 172], [205, 168]], [[200, 181], [208, 182]]]);
  const asleep = (o, front) => xf(D.S1, { ...o, extra: { fxm: 'none', front, ...o.extra } });

  for (let s = 0; s < S; s++) { const ky = 1 + 0.035 * (0.5 - 0.5 * Math.cos(s * kit.TAU / 24)); k.add('d' + s, 2, asleep({ ky }, dust(s, ky))); }
  k.add('tw', 2, asleep({ face: TWITCH }, both(dust(S), sniff)));
  k.add('calm', 4, asleep({}, dust(S)));
  k.add('tw', 2);
  k.add('calm', 2);
  k.add('tw', 4);
  k.add('ah1', 4, asleep({ ky: 1.12, kx: 0.98, face: [['stroke', [[166, 163], [174, 159], [182, 164]], 3], ['oval', 187, 180, 4, 5]] }, dust(S, 1.12)));
  k.add('ah2', 8, asleep({ ky: 1.3, kx: 0.95, face: [['stroke', [[166, 161], [174, 156], [182, 162]], 3], ['oval', 187, 180, 5, 7]] }, dust(S, 1.3)));
  const CHOO = [['stroke', [[166, 160], [176, 166], [166, 172]], 3.4], ['oval', 189, 181, 7, 8]];
  const gust = lines([[[202, 176], [232, 162]], [[204, 184], [236, 184]], [[202, 192], [230, 200]]]);
  k.add('choo1', 4, asleep({ ky: 0.7, kx: 1.1, face: CHOO, extra: { view: kit.view(1, [120, 120], [114, 123]) } }, both(dust(S, 0.7, 34), gust)));
  k.add('choo2', 2, asleep({ ky: 0.8, kx: 1.06, face: CHOO }, dust(S, 0.8, 80)));
  k.add('choo3', 2, asleep({ ky: 0.92, kx: 1.02, face: TWITCH }, dust(S, 0.92, 140)));
  k.add('snf', 4, asleep({ ky: 1.04, face: TWITCH }, sniff));
  k.add('rest', 8, asleep({}));
  k.done();
})();
