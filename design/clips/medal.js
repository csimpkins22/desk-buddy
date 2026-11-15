// Medal: he wears it proudly, but the ribbon reaches the floor. He steps on it, goes over, and the medal lands on him.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE, openPath } = window.__lump;
  const CREAM = '#FFF1DC';
  const proud = [...FACE.aahEyes, ['stroke',[[118,121],[128,127],[138,121]],2.8]];
  const lookdown = [['dot',121,114,3.8], ['dot',145,112,3.8], ['stroke',[[125,127],[130,125],[135,127]],2.6], ['stroke',[[112,102],[124,99]],2.4]];
  // o is how he's posed (as for xf); the ribbon runs from both sides of his neck, by way of `via`, to the medal at m
  const pose = (o, face, m, viaL, viaR, extra = {}) => {
    const r = o.rot || 0, oy = o.oy ?? 201;
    const P = ([x, y]) => { const u = x - 128, v = (y - oy) * (o.ky || 1); return [128 + u * Math.cos(r) - v * Math.sin(r) + (o.dx || 0), oy + u * Math.sin(r) + v * Math.cos(r) + (o.dy || 0)]; };
    const front = c => {
      c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = '#5AB8FF'; c.lineWidth = 5;
      openPath(c, [P([95, 100]), ...viaL, m]); c.stroke(); openPath(c, [P([162, 98]), ...viaR, m]); c.stroke();
      c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.beginPath(); c.arc(m[0], m[1], 14, 0, Math.PI * 2); c.fill(); c.stroke();
      c.lineWidth = 2; c.beginPath(); c.arc(m[0], m[1], 7, 0, Math.PI * 2); c.stroke();
      c.restore();
    };
    return xf(D.N, { ...o, face, extra: { front, ...extra } });
  };
  const DOWN = { rot: 1.5, oy: 135, dx: 14, dy: 7 };
  D.medal_1 = pose({ ky: 1.03 }, proud, [200, 190], [[106, 150], [150, 193]], [[172, 150], [186, 184]], { fxm: 'done', fx: [128, 50] });
  D.medal_2 = pose({}, lookdown, [200, 190], [[106, 150], [150, 193]], [[172, 150], [186, 184]]);
  D.medal_3 = pose({ dx: 12, rot: 0.06 }, proud, [208, 190], [[128, 160], [170, 198]], [[186, 156], [190, 196]]);
  D.medal_4 = pose({ dx: 26, rot: 0.24 }, FACE.shock, [214, 188], [[192, 199]], [[192, 199]], { fxm: 'alert', fx: [120, 60] });
  D.medal_5 = pose({ dx: 30, rot: 0.8 }, FACE.shock, [200, 110], [], []);
  D.medal_6 = pose(DOWN, FACE.chooEyes, [128, 30], [[164, 70]], [[202, 110]]);
  D.medal_7 = pose(DOWN, FACE.spiral, [134, 64], [[164, 84]], [[210, 130], [178, 84]]);
  D.medal_8 = pose({ ...DOWN, rot: 1.46 }, FACE.spiral, [134, 70], [[164, 90]], [[210, 134], [178, 90]]);
  CLIPS.medal = { home: 'idle', seq: [...WAKE, ['medal_1', 12], ['medal_2', 8], ['medal_1', 6], ['medal_3', 5], ['medal_4', 4], ['medal_5', 2], ['medal_6', 3],
    ['medal_7', 5], ['medal_8', 5], ['medal_7', 5], ['medal_8', 5], ['medal_7', 5], ...DOZE] };
})();
