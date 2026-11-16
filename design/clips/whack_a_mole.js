// Whack-a-mole: he dives into the floor and pops up from hole after hole, a step ahead of the taps. The third one gets him.
// group: tap
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', HX = [42, 128, 214], HY = 190;
  const cheeky = [['stroke',[[110,110],[116,105],[122,110]],3], ['stroke',[[134,108],[140,103],[146,108]],3], ['mouth',[[118,120],[138,119],[136,130],[128,134],[120,130]],[128,131,6,4]]];
  const hole = (c, x, a0, a1) => { c.beginPath(); c.ellipse(x, HY, 39, 8, 0, a0, a1); c.fill(); c.stroke(); };
  const holes = c => { c.save(); c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 3; HX.forEach(x => hole(c, x, 0, Math.PI * 2)); c.restore(); };
  // hides whatever is below the rims, then redraws the near half of each hole over it
  const rims = c => { c.save(); c.fillStyle = '#000'; c.fillRect(0, HY, 240, 50); c.fillStyle = '#17161A'; c.strokeStyle = CREAM; c.lineWidth = 3; c.lineCap = 'round'; HX.forEach(x => hole(c, x, 0, Math.PI)); c.restore(); };
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // in hole i, `out` pixels of him showing; the tap lands on hole `hit`
  const mole = (i, out, face, hit, r, o = {}) => xf(D.N, { k: 0.62, dx: HX[i] - 128, dy: 70 - out, face, shadowK: 0, ...o,
    extra: { back: holes, front: c => { rims(c); if (hit !== undefined) tap(HX[hit], 150, r)(c); } } });
  const P = 'whack_a_mole_';
  D[P + 'tap'] = xf(D.N, { face: FACE.lookr, extra: { front: tap(206, 110, 8) } });
  D[P + 'open'] = xf(D.K1, { extra: { back: holes, front: tap(206, 110, 15), fxm: 'none' } });
  D[P + 'dive1'] = xf(D.N, { k: 0.8, ky: 1.15, dy: -14, face: FACE.shock, extra: { back: holes } });
  D[P + 'dive2'] = mole(1, 30, FACE.shock);
  D[P + 'gone'] = mole(1, -20, []);
  D[P + 'l1'] = mole(0, 30, FACE.lookr);
  D[P + 'l2'] = mole(0, 64, FACE.lookr, undefined, 0, { ky: 1.08 });
  D[P + 'l3'] = mole(0, 60, FACE.happy);
  D[P + 'r1'] = mole(2, 30, FACE.happy, 0, 8);
  D[P + 'r2'] = mole(2, 64, FACE.happy, 0, 15, { ky: 1.08 });
  D[P + 'r3'] = mole(2, 60, cheeky);
  D[P + 'c1'] = mole(1, 30, cheeky, 2, 8);
  D[P + 'c2'] = mole(1, 64, cheeky, 2, 15, { ky: 1.08 });
  D[P + 'c3'] = mole(1, 60, cheeky);
  D[P + 'hit1'] = mole(1, 44, FACE.shock, 1, 10, { ky: 0.7, kx: 1.15 });
  D[P + 'hit2'] = mole(1, 52, FACE.spiral, 1, 18, { rot: -0.1 });
  D[P + 'dizzy1'] = mole(1, 56, FACE.spiral, undefined, 0, { rot: 0.1 });
  D[P + 'dizzy2'] = mole(1, 56, FACE.spiral, undefined, 0, { rot: -0.1 });
  D[P + 'out1'] = xf(D.N, { k: 0.75, dy: -8, face: FACE.spiral, extra: { back: holes } });
  D[P + 'out2'] = xf(D.N, { face: FACE.spiral, rot: 0.04 });
  D[P + 'out3'] = xf(D.N, { face: FACE.spiral, rot: -0.04 });
  const s = (...a) => a.map(([n, t]) => [P + n, t]);
  CLIPS.whack_a_mole = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['open', 5], ['dive1', 2], ['dive2', 2], ['gone', 6],
    ['l1', 2], ['l2', 2], ['l3', 8], ['l1', 2], ['r1', 2], ['r2', 3], ['r3', 8], ['r1', 2], ['c1', 2], ['c2', 3], ['c3', 9],
    ['hit1', 3], ['hit2', 4], ['dizzy1', 4], ['dizzy2', 4], ['dizzy1', 4], ['dizzy2', 4], ['out1', 3], ['out2', 5], ['out3', 5]), ...DOZE] };
})();
