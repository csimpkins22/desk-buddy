// Portal: a hole opens under him and another overhead. He falls through the floor and drops in from the top, round and round, until the floor closes.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', BLUE = '#5AB8FF', YELLOW = '#FFD23F', FY = 203;
  const down = [['dot',116,116,4.2], ['dot',140,114,4.2], ['stroke',[[122,127],[128,125],[134,127]],2.8]];
  const bored = [['stroke',[[109,108],[123,108]],3], ['stroke',[[133,106],[147,106]],3], ['dot',116,112,3], ['dot',140,110,3], ['stroke',[[121,126],[135,125]],2.8]];
  const ouch = [...FACE.chooEyes, ['stroke',[[120,126],[124,123],[128,126],[132,123],[136,126]],2.8]];
  // r: the floor hole's size, r2: the ceiling one's; streaks: speed lines beside him at this height
  const holes = (r, r2 = r, streaks) => ({
    back: c => {
      c.save(); c.lineWidth = 3; c.lineCap = 'round';
      if (r2) { c.fillStyle = '#3A2E0A'; c.strokeStyle = YELLOW; c.beginPath(); c.ellipse(128, 5, r2, r2 * 0.13, 0, 0, Math.PI * 2); c.fill(); c.stroke(); }
      if (r) { c.fillStyle = '#0E2438'; c.strokeStyle = BLUE; c.beginPath(); c.ellipse(128, FY, r, r * 0.13, 0, 0, Math.PI * 2); c.fill(); c.stroke(); }
      if (streaks !== undefined) {
        c.strokeStyle = CREAM; c.globalAlpha = 0.6; c.lineWidth = 2.4; c.beginPath();
        [[-74, 0, 30], [-84, 26, 20], [72, 10, 30], [82, -14, 22]].forEach(([x, y, n]) => { c.moveTo(128 + x, streaks + y); c.lineTo(128 + x, streaks + y - n); });
        c.stroke();
      }
      c.restore();
    },
    front: c => {                                       // the near rims, and the floor in front of its hole hides what has gone through
      c.save(); c.lineWidth = 3; c.lineCap = 'round';
      if (r2) { c.strokeStyle = YELLOW; c.beginPath(); c.ellipse(128, 5, r2, r2 * 0.13, 0, 0, Math.PI); c.stroke(); }
      if (!r) return c.restore();
      c.fillStyle = '#000'; c.beginPath(); c.moveTo(0, FY); c.lineTo(128 - r, FY); c.ellipse(128, FY, r, r * 0.13, 0, Math.PI, 0, true);
      c.lineTo(240, FY); c.lineTo(240, 240); c.lineTo(0, 240); c.closePath(); c.fill();
      c.strokeStyle = BLUE; c.beginPath(); c.ellipse(128, FY, r, r * 0.13, 0, Math.PI, 0, true); c.stroke();
      c.restore();
    },
  });
  const fall = (dy, face, r = 72) => xf(D.N, { dy, ky: 1.06, kx: 0.96, face, shadowK: 0, extra: holes(r, 72, 96 + dy) });
  D.portal_1 = xf(D.N, { face: down, extra: holes(24) });
  D.portal_2 = xf(D.N, { face: down, shadowK: 0, extra: holes(50) });
  D.portal_3 = xf(D.N, { face: down, shadowK: 0, extra: holes(72) });
  D.portal_4 = xf(D.N, { face: FACE.shock, shadowK: 0, extra: { ...holes(72), fxm: 'alert', fx: [150, 56] } });
  const drop = (name, steps, face, close) => steps.map((dy, i) => { D[`portal_${name}${i}`] = fall(dy, face, close ? close[i] : 72); return [`portal_${name}${i}`, 2]; });
  const first = drop('a', [35, 90, 145], FACE.shock);
  const again = drop('b', [-185, -130, -75, -20, 35, 90, 145], FACE.shock);
  const dizzy = drop('c', [-180, -105, -30, 45, 120], FACE.spiral);
  const fed = drop('d', [-180, -105, -30, 45, 120], bored);
  const last = drop('e', [-180, -110, -40], down, [44, 16, 0]);
  D.portal_5 = xf(D.N, { ky: 0.6, kx: 1.3, face: ouch, extra: { ...holes(0, 40), fxm: 'alert', fx: [150, 96] } });
  D.portal_6 = xf(D.N, { ky: 1.06, kx: 0.97, face: FACE.spiral, extra: holes(0, 14) });
  D.portal_7 = xf(D.N, { face: FACE.spiral, rot: -0.04 });
  D.portal_8 = xf(D.N, { face: FACE.spiral, rot: 0.04 });
  D.portal_9 = xf(D.N, { face: down });
  CLIPS.portal = { home: 'idle', seq: [...WAKE, ['portal_1', 2], ['portal_2', 2], ['portal_3', 5], ['portal_4', 6], ...first, ...again, ...dizzy, ...fed, ...last,
    ['portal_5', 4], ['portal_6', 2], ['portal_7', 4], ['portal_8', 4], ['portal_7', 4], ['portal_9', 7], ...DOZE] };
})();
