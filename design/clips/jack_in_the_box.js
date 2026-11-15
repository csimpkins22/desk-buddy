// Jack-in-the-box: startled by the tap, he hides in his box. The crank turns on its own and out he springs, boinging.
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', RED = '#FF5A4D', TOP = 146;
  const down = [['dot',118,116,3.8], ['dot',140,115,3.8], ['stroke',[[123,128],[128,126],[133,128]],2.6]];
  const tap = (x, y, r) => c => {
    c.save(); c.strokeStyle = CREAM; c.lineCap = 'round'; c.lineWidth = 3;
    c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 0.5; c.lineWidth = 2; c.beginPath(); c.arc(x, y, r * 1.8, 0, Math.PI * 2); c.stroke(); c.restore();
  };
  // by: how far the box is sunk in the floor. a: how far its two lid flaps are open (0 shut). crank: the handle's angle
  const box = (by, a, crank = 0) => c => {
    c.save(); c.translate(0, by); c.lineCap = c.lineJoin = 'round';
    const kx = 216 + 11 * Math.cos(crank), ky = TOP + 32 + 11 * Math.sin(crank);
    c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.moveTo(204, TOP + 32); c.lineTo(216, TOP + 32); c.lineTo(kx, ky); c.stroke();
    c.fillStyle = CREAM; c.beginPath(); c.arc(kx, ky, 4.5, 0, Math.PI * 2); c.fill();
    c.fillStyle = RED; c.beginPath(); c.roundRect(52, TOP, 152, 64, 4); c.fill(); c.stroke();
    c.fillStyle = '#FFD23F'; c.beginPath(); c.moveTo(128, TOP + 12); c.lineTo(152, TOP + 32); c.lineTo(128, TOP + 52); c.lineTo(104, TOP + 32); c.closePath(); c.fill();
    [[52, 1], [204, -1]].forEach(([hx, s]) => {
      const flap = () => { c.beginPath(); c.moveTo(hx, TOP); c.lineTo(hx + s * 76 * Math.cos(a), TOP - 76 * Math.sin(a)); c.stroke(); };
      c.strokeStyle = CREAM; c.lineWidth = 10; flap(); c.strokeStyle = RED; c.lineWidth = 4.5; flap();
    });
    c.restore();
  };
  const spring = (fx, fy) => c => {
    c.save(); c.strokeStyle = '#9FB0C4'; c.lineWidth = 3.5; c.lineCap = c.lineJoin = 'round'; c.beginPath(); c.moveTo(128, TOP + 8);
    for (let i = 1; i <= 8; i++) c.lineTo(128 + (fx - 128) * i / 8 + (i < 8 ? (i % 2 ? 14 : -14) : 0), TOP + 8 + (fy - TOP - 8) * i / 8);
    c.stroke(); c.restore();
  };
  // sprung: his feet at (128 + dx, fy) on the end of the spring
  const jack = (fy, dx, rot, face, o = {}) => xf(D.N, { k: 0.68, dx, dy: fy - 201, rot, face, shadowK: 0, ...o, extra: { back: spring(128 + dx, fy), front: box(0, 2.2) } });
  const P = 'jack_in_the_box_';
  D[P + 'tap'] = xf(D.N, { face: FACE.lookr, extra: { front: tap(214, 96, 8) } });
  D[P + 'up1'] = xf(D.NB, { extra: { front: c => { box(52, 2.2)(c); tap(214, 96, 15)(c); }, fxm: 'none' } });
  D[P + 'up2'] = xf(D.NB, { extra: { front: box(20, 2.2), fxm: 'none' } });
  D[P + 'in'] = xf(D.N, { face: down, extra: { front: box(0, 2.2) } });
  D[P + 'duck'] = xf(D.N, { face: down, ky: 0.62, extra: { front: box(0, 1.2) } });
  [0, 1, 2, 3].forEach(i => { D[P + 'crank' + i] = xf(D.N, { ky: 0.3, dx: i % 2 ? 1 : -1, extra: { front: box(0, 0, i * Math.PI / 2) } }); });
  D[P + 'pop1'] = jack(70, 0, 0, FACE.shock, { ky: 1.2, kx: 0.9 });
  D[P + 'pop2'] = jack(110, 0, 0, FACE.shock, { ky: 0.85, kx: 1.1 });
  [[80, 12, 0.16], [102, -10, -0.13], [84, 8, 0.1], [100, -6, -0.07], [88, 3, 0.04], [95, -2, -0.02]].forEach(([fy, dx, rot], i) => { D[P + 'boing' + i] = jack(fy, dx, rot, FACE.spiral); });
  D[P + 'rest'] = jack(92, 0, 0, FACE.sheep);
  D[P + 'out1'] = xf(D.N, { k: 0.85, dy: -16, face: FACE.sheep, extra: { front: box(40, 2.2) } });
  D[P + 'out2'] = xf(D.N, { ky: 0.92, face: FACE.sheep, extra: { front: box(78, 2.2) } });
  D[P + 'after'] = xf(D.N, { face: FACE.sheep });
  const s = (...a) => a.map(([n, t]) => [P + n, t]), crank = s(['crank0', 2], ['crank1', 2], ['crank2', 2], ['crank3', 2]);
  CLIPS.jack_in_the_box = { home: 'idle', seq: [...WAKE, ...s(['tap', 4], ['up1', 2], ['up2', 2], ['in', 7], ['duck', 2], ['crank0', 6]), ...crank, ...crank,
    ...s(['pop1', 3], ['pop2', 2], ['boing0', 3], ['boing1', 3], ['boing2', 3], ['boing3', 3], ['boing4', 3], ['boing5', 3], ['rest', 10], ['out1', 2], ['out2', 2], ['after', 8]), ...DOZE] };
})();
