// Lightbulb idea: he thinks hard, an unlit bulb flickers over his head, he taps it, and it lights with rays.
(() => {
  const { D, xf, FACE, kit } = window.__lump, k = kit.clip('lightbulb_idea');
  const bulb = (c, state, { a = 1, nudge = 0, phase = 0 } = {}) => kit.fade(c, a, () => {
    const x = 128 + nudge;
    c.save(); c.lineJoin = c.lineCap = 'round'; c.strokeStyle = kit.CREAM; c.lineWidth = 2.8;
    c.fillStyle = kit.GREY; c.beginPath(); c.roundRect(x - 6, 54, 12, 11, 2); c.fill(); c.stroke();
    c.fillStyle = ['#3A4048', '#8A7430', kit.YELLOW][state]; c.beginPath(); c.arc(x, 42, 14, 0, kit.TAU); c.fill(); c.stroke();
    if (state === 2) {
      c.strokeStyle = kit.YELLOW; c.lineWidth = 3.5;
      for (let i = 0; i < 8; i++) { const t = i * kit.TAU / 8 + phase; if (Math.sin(t) > 0.6) continue;
        c.beginPath(); c.moveTo(x + Math.cos(t) * 20, 42 + Math.sin(t) * 20); c.lineTo(x + Math.cos(t) * 29, 42 + Math.sin(t) * 29); c.stroke(); }
    }
    c.restore();
  });
  const B = (o, state, opt, hand) => { const p = { k: 0.88, ...o }; return xf(D.N, { ...p, extra: { ...(hand ? { arm2: [kit.pt(p, [166, 140]), hand] } : {}), front: c => bulb(c, state, opt) } }); };

  k.add('t0', 6, xf(D.N, { k: 0.96, rot: -0.05, face: FACE.lookup }));
  k.add('t1', 6, xf(D.N, { k: 0.92, rot: 0.05, face: FACE.lookup }));
  k.add('t2', 8, xf(D.N, { k: 0.88, ky: 0.95, face: FACE.puff, extra: { front: (c, d, seed) => kit.sweat(c, 178, 100, seed, 1) } }));
  k.add('in0', 2, B({ face: FACE.puff, ky: 0.97 }, 0, { a: 0.35 }));
  k.add('in1', 2, B({ face: FACE.lookup }, 0, { a: 0.7 }));
  k.add('f0', 2, B({ face: FACE.lookup }, 0));
  k.add('f1', 2, B({ face: FACE.lookup }, 1));
  k.add('f0', 2); k.add('f1', 2); k.add('f0', 4); k.add('f1', 2); k.add('f0', 2);
  k.add('reach', 2, B({ face: FACE.lookup }, 0, {}, [158, 84]));
  k.add('tap', 2, B({ face: FACE.lookup, ky: 1.03 }, 0, { nudge: -3 }, [150, 66]));
  k.add('lit0', 4, B({ face: FACE.happy, ky: 1.04 }, 2, {}));
  k.add('lit1', 4, B({ face: FACE.happy }, 2, { phase: kit.TAU / 16 }));
  k.add('lit0', 4); k.add('lit1', 4);
  [0.7, 0.4, 0.15].forEach((a, i) => k.add('out' + i, 2, B({ face: FACE.happy }, 2, { a })));
  k.done();
})();
