// Jelly wobble: a tap on the glass runs up through him like jelly. It settles, then one last aftershock.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const wobbly = [['dot',116,108,4.4], ['dot',140,106,4.4], ['stroke',[[118,125],[123,122],[128,125],[133,122],[138,125]],2.8]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // a sideways wave and a bulge that travel up him from his planted feet: a is how far his head swings, ph where the wave is
  const jelly = (a, ph, face) => {
    const d = xf(D.N, { face, ky: 1 - a / 300 * Math.cos(ph * 2) }), f = ([x, y]) => { const h = (201 - y) / 131, cx = 128 + a * h * Math.sin(ph - h * 4.5); return [cx + (x - 128) * (1 + a / 110 * Math.sin(ph * 1.3 - h * 6)), y]; };
    return { ...d, body: d.body.map(f), curl: d.curl.map(f),
      face: d.face.map(m => Array.isArray(m[1]) ? [m[0], m[1].map(f), m[2]] : [m[0], ...f([m[1], m[2]]), m[3]]) };
  };
  D.jelly_wobble_tap1 = xf(D.N, { face: FACE.lookr, extra: { front: tap(212, 120, 7) } });
  D.jelly_wobble_tap2 = xf(D.NB, { extra: { front: tap(212, 120, 15), fxm: 'none' } });
  const seq = [...WAKE, ['jelly_wobble_tap1', 4], ['jelly_wobble_tap2', 4]];
  for (let i = 0; i < 22; i++) { D['jelly_wobble_a' + i] = jelly(30 * Math.exp(-i / 10), i * 1.15, wobbly); seq.push(['jelly_wobble_a' + i, 2]); }
  D.jelly_wobble_still = xf(D.N, { face: FACE.sheep });
  seq.push(['jelly_wobble_still', 12]);
  for (let i = 0; i < 7; i++) { D['jelly_wobble_b' + i] = jelly(14 * Math.exp(-i / 4), i * 1.15, FACE.ah); seq.push(['jelly_wobble_b' + i, 2]); }
  seq.push(['jelly_wobble_still', 6], ['C1', 8], ...DOZE);
  CLIPS.jelly_wobble = { home: 'idle', seq };
})();
