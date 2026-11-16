// Midnight snack: he checks the coast is clear, raids the fridge for cheese, and freezes mid-chew in the glow of the open door. Caught.
// group: clock
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC', DARK = '#17161A', COLD = '#CFE9FF';
  const lookl = [['dot',110,110,3.8], ['dot',134,108,3.8], ['stroke',[[119,125],[131,124]],2.6]];
  const chew = [['stroke',[[110,108],[116,112],[122,108]],3], ['stroke',[[134,106],[140,110],[146,106]],3], ['stroke',[[122,124],[128,121],[134,124]],2.8], ...FACE.puff.slice(3)];
  const caught = [['dot',116,108,5], ['dot',140,106,5], ...FACE.puff.slice(2)];
  const whistle = [['dot',120,103,3.8], ['dot',144,101,3.8], ['dot',130,123,3]];
  const wedge = (c, x, y, k = 1) => {
    c.save(); c.translate(x, y); c.scale(k, k); c.lineJoin = 'round';
    c.fillStyle = '#FFD23F'; c.strokeStyle = CREAM; c.lineWidth = 2.4; c.beginPath(); c.moveTo(-14, 9); c.lineTo(14, 9); c.lineTo(14, -11); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#C9971C'; c.beginPath(); c.arc(7, 2, 2.8, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(-2, 5, 1.8, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const spill = (c, alpha) => { c.fillStyle = COLD; c.globalAlpha = alpha; c.beginPath(); c.moveTo(186, 100); c.lineTo(186, 197); c.lineTo(0, 240); c.lineTo(0, 20); c.closePath(); c.fill(); c.globalAlpha = 1; };
  // open: the bottom door is open (it swings off the edge of the screen) and its light spills across him. shelf: the cheese is still in there. held: [x, y, size] of the cheese in his hand.
  const fridge = (open, shelf, held) => ({
    back: (c, d, seed) => {
      c.save(); c.lineJoin = c.lineCap = 'round';
      if (open) spill(c, 0.2);
      c.fillStyle = DARK; c.strokeStyle = CREAM; c.lineWidth = 3; c.beginPath(); c.roundRect(182, 54, 70, 147, 8); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(182, 96); c.lineTo(240, 96); c.moveTo(194, 68); c.lineTo(194, 84); if (!open) { c.moveTo(194, 108); c.lineTo(194, 138); } c.stroke();
      if (open) {
        c.fillStyle = '#EAF6FF'; c.fillRect(188, 102, 52, 95);
        c.strokeStyle = '#9FB0C4'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(188, 136); c.lineTo(240, 136); c.moveTo(188, 168); c.lineTo(240, 168); c.stroke();
        c.fillStyle = '#58D68D'; c.beginPath(); c.roundRect(226, 109, 9, 26, 3); c.fill();
        c.fillStyle = '#FF5A4D'; c.beginPath(); c.arc(212, 159, 8, 0, Math.PI * 2); c.fill();
        if (shelf) wedge(c, 208, 125);
      }
      c.restore();
    },
    front: (c, d, seed) => { c.save(); if (open) spill(c, 0.1); if (held) wedge(c, ...held); c.restore(); },
  });
  const HAND = { arm2: [[166, 134], [190, 100]] };
  D.midnight_snack_1 = xf(D.N, { face: lookl, extra: fridge(false) });
  D.midnight_snack_2 = xf(D.N, { face: FACE.lookr, extra: fridge(false) });
  D.midnight_snack_3 = xf(D.N, { face: FACE.lookr, rot: 0.04, extra: { ...fridge(false), arm2: [[168, 138], [192, 124]] } });
  D.midnight_snack_4 = xf(D.N, { face: FACE.cute, extra: fridge(true, true) });
  D.midnight_snack_5 = xf(D.N, { face: FACE.cute, rot: 0.06, extra: { ...fridge(true, true), arm2: [[170, 136], [198, 128]] } });
  D.midnight_snack_6 = xf(D.N, { face: FACE.happy, extra: { ...fridge(true), ...HAND, front: fridge(true, false, [202, 84]).front } });
  D.midnight_snack_7 = xf(D.N, { face: FACE.choo, extra: { ...fridge(true), arm2: [[166, 140], [162, 132]], front: fridge(true, false, [152, 124]).front } });
  D.midnight_snack_8 = xf(D.N, { face: FACE.puff, extra: { ...fridge(true), ...HAND, front: fridge(true, false, [202, 86, 0.75]).front } });
  D.midnight_snack_9 = xf(D.N, { face: chew, ky: 0.96, kx: 1.03, extra: { ...fridge(true), ...HAND, front: fridge(true, false, [203, 89, 0.75]).front } });
  D.midnight_snack_10 = xf(D.N, { face: caught, ky: 1.05, kx: 0.97, extra: { ...fridge(true), ...HAND, front: fridge(true, false, [202, 82, 0.75]).front, fxm: 'alert', fx: [146, 50] } });
  D.midnight_snack_11 = xf(D.N, { face: FACE.sheep, extra: { ...fridge(true), ...HAND, front: fridge(true, false, [202, 86, 0.75]).front } });
  D.midnight_snack_12 = xf(D.N, { face: chew.slice(0, 3), ky: 1.06, kx: 0.96, extra: fridge(true) });
  D.midnight_snack_13 = xf(D.N, { face: whistle, extra: fridge(false) });
  const munch = [['midnight_snack_8', 4], ['midnight_snack_9', 4]];
  CLIPS.midnight_snack = { home: 'idle', seq: [...WAKE, ['midnight_snack_1', 6], ['midnight_snack_2', 6], ['midnight_snack_3', 4], ['midnight_snack_4', 8], ['midnight_snack_5', 4], ['midnight_snack_6', 5],
    ['midnight_snack_7', 4], ...munch, ...munch, ['midnight_snack_10', 12], ['midnight_snack_11', 9], ['midnight_snack_12', 3], ['midnight_snack_13', 9], ...DOZE] };
})();
