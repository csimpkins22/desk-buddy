// Elevator: lift doors open, he steps in, the floor dial sweeps round, and he steps out under the stars.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('elevator'), { CREAM, GREY, DARK, YELLOW, RED, TAU } = kit;
  const shell = (c, a, dial, sky) => kit.fade(c, a, () => {
    c.lineJoin = c.lineCap = 'round'; c.strokeStyle = CREAM; c.lineWidth = 3;
    c.fillStyle = sky ? '#1B2A4A' : DARK; c.beginPath(); c.rect(64, 52, 128, 149); c.fill(); c.stroke();
    if (sky) [[84, 80], [172, 72], [80, 140], [176, 150], [128, 66]].forEach(([x, y], i) => kit.sparkle(c, x, y, 6 + (i % 2) * 3, YELLOW));
    c.fillStyle = GREY; c.beginPath(); c.arc(128, 50, 16, Math.PI, TAU); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = RED; c.lineWidth = 3.4; c.beginPath(); c.moveTo(128, 48); c.lineTo(128 - 12 * Math.cos(dial), 48 - 12 * Math.sin(dial)); c.stroke();
  });
  const doors = (c, a, open) => kit.fade(c, a, () => {
    const w = 62 * (1 - open) + 2;
    c.lineJoin = 'round'; c.strokeStyle = CREAM; c.lineWidth = 2.6; c.fillStyle = GREY;
    c.beginPath(); c.rect(66, 54, w, 145); c.rect(190 - w, 54, w, 145); c.fill(); c.stroke();
  });
  const wide = (c, a) => kit.fade(c, a, () => [[30, 40], [70, 28], [200, 36], [214, 96], [24, 112], [150, 22]].forEach(([x, y], i) => kit.sparkle(c, x, y, 7 + (i % 2) * 3, YELLOW)));
  const sc = (o, face, { a = 1, dial = 0.3, sky = false, open = 0, inside = false, stars = 0 } = {}) => xf(D.N, { ...o, face, extra: {
    back: c => { if (stars) wide(c, stars); if (a) { shell(c, a, dial, sky); if (!inside) doors(c, a, open); } },
    ...(inside ? { front: c => doors(c, a, open) } : {}),
  } });
  const DONE = 2.84;

  k.add('in0', 2, sc({}, FACE.happy, { a: 0.3 }));
  k.add('in1', 2, sc({}, FACE.happy, { a: 0.65 }));
  k.add('wait', 6, sc({}, FACE.happy));
  [0.35, 0.7, 1].forEach((o, i) => k.add('open' + i, 2, sc({}, FACE.happy, { open: o })));
  k.add('step0', 2, sc({ k: 0.93 }, FACE.happy, { open: 1 }));
  k.add('step1', 2, sc({ k: 0.85 }, FACE.happy, { open: 1 }));
  [0.65, 0.3, 0].forEach((o, i) => k.add('shut' + i, 2, sc({ k: 0.85 }, FACE.happy, { open: o, inside: true })));
  kit.steps(0.3, DONE, 5).forEach((d, i) => k.add('dial' + i, 2, sc({ k: 0.85 }, FACE.happy, { dial: d, inside: true })));
  k.add('ding', 2, sc({ k: 0.85, dy: -3 }, FACE.happy, { dial: DONE, inside: true }));
  [0.35, 0.7, 1].forEach((o, i) => k.add('reopen' + i, 2, sc({ k: 0.85 }, FACE.shock, { dial: DONE, sky: true, open: o, inside: true })));
  k.add('out0', 2, sc({ k: 0.93 }, FACE.lookup, { dial: DONE, sky: true, open: 1, a: 0.6, stars: 0.4 }));
  k.add('out1', 2, sc({}, FACE.lookup, { dial: DONE, sky: true, open: 1, a: 0.3, stars: 0.7 }));
  k.add('stars', 14, sc({ ky: 1.03 }, FACE.lookup, { a: 0, stars: 1 }));
  k.add('fade0', 2, sc({}, FACE.happy, { a: 0, stars: 0.6 }));
  k.add('fade1', 2, sc({}, FACE.happy, { a: 0, stars: 0.3 }));
  k.done();
})();
