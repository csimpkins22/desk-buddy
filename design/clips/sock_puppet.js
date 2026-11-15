// Sock puppet: he says yes, the sock on his nub says no, and when he insists it bites him on the cowlick.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', SOCK = '#58D68D', RED = '#FF5A4D';
  const talk = [['dot',120,108,4], ['dot',144,106,4], ['mouth',[[122,120],[140,119],[138,129],[131,133],[124,129]],[131,130,5,3]]];
  const insist = [['stroke',[[110,99],[123,104]],3], ['stroke',[[138,102],[151,97]],3], ['dot',121,111,3.6], ['dot',145,109,3.6], ['mouth',[[122,120],[142,119],[140,131],[132,135],[124,131]]]];
  const resigned = [['stroke',[[110,108],[122,108]],3], ['dot',116,112,3], ['stroke',[[134,106],[146,106]],3], ['dot',140,110,3], ['stroke',[[122,126],[134,126]],2.8]];
  // a sleeve from (ax, ay) to its head at (hx, hy). open: how wide its mouth is. turn: which way it faces (0 is left)
  const sock = (ax, ay, hx, hy, open, turn = 0) => c => {
    c.save(); c.lineCap = c.lineJoin = 'round';
    c.beginPath(); c.moveTo(ax, ay); c.lineTo(hx, hy); c.strokeStyle = CREAM; c.lineWidth = 27; c.stroke(); c.strokeStyle = SOCK; c.lineWidth = 22; c.stroke();
    c.translate(hx, hy); c.rotate(turn);
    const part = (a, x, y, w, h, paint) => { c.save(); c.rotate(a); c.beginPath(); c.roundRect(x, y, w, h, h / 2); paint(); c.restore(); };
    const head = paint => { part(0, -13, -13, 27, 27, paint); part(open, -32, -14, 36, 15, paint); part(-open * 0.7, -28, 1, 32, 12, paint); };
    c.strokeStyle = CREAM; c.lineWidth = 5; head(() => c.stroke());
    c.fillStyle = RED; c.beginPath(); c.moveTo(2, 1); c.lineTo(-30 * Math.cos(open), 1 - 30 * Math.sin(open)); c.lineTo(-27 * Math.cos(open * 0.7), 1 + 27 * Math.sin(open * 0.7)); c.fill();
    c.fillStyle = SOCK; head(() => c.fill());
    c.rotate(open);
    c.strokeStyle = DARK; c.lineWidth = 2; c.beginPath(); c.moveTo(-27, 1); c.lineTo(-3, 1); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(-6, -14, 6, 0, Math.PI * 2); c.fill();
    c.fillStyle = DARK; c.beginPath(); c.arc(-8, -14, 2.6, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  // a speech bubble holding a green tick or a red cross, its tail pointing down to the left (-1) or right (1)
  const says = (x, y, r, yes, tail) => c => {
    const on = (a, k = 1) => [x + tail * Math.cos(a) * r * k, y + Math.sin(a) * r * k];
    c.save(); c.lineCap = c.lineJoin = 'round'; c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 2.6;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(...on(0.45)); c.lineTo(...on(0.8, 1.6)); c.lineTo(...on(1.15)); c.fill(); c.stroke();
    c.lineWidth = r * 0.28; c.strokeStyle = yes ? SOCK : RED; c.beginPath();
    if (yes) { c.moveTo(x - r * 0.45, y + r * 0.05); c.lineTo(x - r * 0.12, y + r * 0.4); c.lineTo(x + r * 0.48, y - r * 0.38); }
    else { c.moveTo(x - r * 0.38, y - r * 0.38); c.lineTo(x + r * 0.38, y + r * 0.38); c.moveTo(x + r * 0.38, y - r * 0.38); c.lineTo(x - r * 0.38, y + r * 0.38); }
    c.stroke(); c.restore();
  };
  const ARM = [[144, 138], [170, 120]], UP = [166, 126, 192, 96], BITE = [[146, 130], [140, 94]];
  const pose = (o, arm2, puppet, bubble) => xf(D.N, { dx: -22, ...o, extra: { arm2, front: c => { sock(...puppet)(c); if (bubble) bubble(c); }, ...o.extra } });
  D.sock_puppet_in = xf(D.N, { dx: -11, rot: -0.04, face: FACE.lookr });
  D.sock_puppet_1 = pose({ face: FACE.lookr }, ARM, [...UP, 0.04]);
  D.sock_puppet_2a = pose({ face: talk }, ARM, [...UP, 0.04], says(56, 46, 16, true, 1));
  D.sock_puppet_2b = pose({ face: talk, ky: 1.03 }, ARM, [...UP, 0.04], says(56, 44, 16, true, 1));
  D.sock_puppet_3a = pose({ face: FACE.lookr }, ARM, [166, 126, 188, 96, 0.5, 0.2], says(204, 42, 16, false, -1));
  D.sock_puppet_3b = pose({ face: FACE.lookr }, ARM, [166, 126, 196, 96, 0.5, -0.2], says(204, 42, 16, false, -1));
  D.sock_puppet_4a = pose({ face: insist, rot: 0.05 }, ARM, [...UP, 0.04], says(54, 42, 21, true, 1));
  D.sock_puppet_4b = pose({ face: insist, rot: 0.05, ky: 1.03 }, ARM, [...UP, 0.04], says(54, 40, 21, true, 1));
  D.sock_puppet_5a = pose({ face: FACE.grump }, ARM, [164, 126, 180, 96, 0.8, 0.25], says(204, 38, 21, false, -1));
  D.sock_puppet_5b = pose({ face: FACE.grump }, ARM, [164, 126, 190, 96, 0.8, -0.2], says(204, 38, 21, false, -1));
  D.sock_puppet_6 = pose({ face: FACE.grump, rot: 0.08 }, [[148, 138], [166, 122]], [162, 128, 180, 100, 0.04, 0.1]);
  D.sock_puppet_7 = pose({ face: FACE.shock, extra: { fxm: 'alert', fx: [64, 70] } }, BITE, [140, 100, 120, 56, 0.2, -0.75]);
  D.sock_puppet_8a = pose({ face: resigned }, BITE, [140, 100, 120, 56, 0.4, -0.75]);
  D.sock_puppet_8b = pose({ face: resigned }, BITE, [140, 100, 121, 58, 0.1, -0.7]);
  const twice = (a, b, n) => [[a, n], [b, n], [a, n], [b, n]];
  CLIPS.sock_puppet = { home: 'idle', seq: [...WAKE, ['sock_puppet_in', 3], ['sock_puppet_1', 8], ['sock_puppet_2a', 5], ['sock_puppet_2b', 5],
    ...twice('sock_puppet_3a', 'sock_puppet_3b', 3), ['sock_puppet_4a', 5], ['sock_puppet_4b', 5], ...twice('sock_puppet_5a', 'sock_puppet_5b', 3),
    ['sock_puppet_6', 8], ['sock_puppet_7', 4], ...twice('sock_puppet_8a', 'sock_puppet_8b', 4), ['sock_puppet_8a', 4], ['sock_puppet_in', 3], ...DOZE] };
})();
