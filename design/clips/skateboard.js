// Skateboard: he rolls in on a board, pops a jump, and the board rolls on without him.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('skateboard');
  const board = (c, x) => {
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.6;
    c.fillStyle = kit.GREY; [x - 26, x + 26].forEach(wx => { c.beginPath(); c.arc(wx, 196, 5, 0, kit.TAU); c.fill(); c.stroke(); });
    c.fillStyle = kit.RED; c.beginPath(); c.roundRect(x - 44, 185, 88, 7, 3.5); c.fill(); c.stroke();
    c.restore();
  };
  const S = (o, bx) => xf(D.N, { ...o, extra: { front: c => board(c, bx) } });

  kit.steps(-200, -24, 7).forEach((dx, i) => k.add('in' + i, 2, S({ dx, dy: -14, rot: 0.04, face: FACE.happy }, 128 + dx)));
  k.add('c0', 6, S({ dx: -18, dy: -14, face: FACE.cute }, 110));
  k.add('c1', 6, S({ dx: -10, dy: -14, face: FACE.cute, ky: 1.02 }, 118));
  k.add('crouch', 2, S({ dx: -4, dy: -14, ky: 0.86, kx: 1.06, face: FACE.happy }, 124));
  const jx = [4, 10, 14, 18, 20], jy = [36, 46, 50, 42, 26], bx = [140, 164, 190, 216, 244];
  jx.forEach((dx, i) => k.add('jump' + i, 2, S({ dx, dy: -jy[i], ky: i < 2 ? 1.06 : 1, shadowK: 0.6, face: i < 3 ? FACE.ah : FACE.lookr }, bx[i])));
  k.add('land', 2, S({ dx: 20, ky: 0.86, kx: 1.1, face: FACE.shock }, 270));
  k.add('gone', 2, S({ dx: 20, face: FACE.lookr }, 296));
  k.add('watch', 6, xf(D.N, { dx: 20, face: FACE.lookr }));
  k.add('huh', 14, xf(D.R1, { dx: 20 }));
  k.done();
})();
