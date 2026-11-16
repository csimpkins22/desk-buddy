// Tests fail: he waits for the result, one red cross drops on his head, bounces off and lands beside him.
// group: work
(() => {
  const { D, CLIPS, xf, FACE, WAKE, DOZE } = window.__lump;
  const CREAM = '#FFF1DC';
  const hopeful = [['dot',118,104,4], ['dot',142,102,4], ['stroke',[[122,121],[128,124],[134,121]],2.8]];
  const glare = [['stroke',[[114,101],[127,106]],3], ['stroke',[[142,104],[155,99]],3], ['dot',125,112,3.4], ['dot',151,110,3.4], ['stroke',[[127,127],[141,127]],3]];
  const cross = (x, y, turn) => (c, d, seed) => {
    c.save(); c.translate(x, y); c.rotate(turn); c.lineCap = 'round';
    for (const [colour, w] of [[CREAM, 15], ['#FF5A4D', 9]]) {
      c.strokeStyle = colour; c.lineWidth = w; c.beginPath(); c.moveTo(-13, -13); c.lineTo(13, 13); c.moveTo(13, -13); c.lineTo(-13, 13); c.stroke();
    }
    c.restore();
  };
  const F = (name, o, at) => { D['tests_fail_' + name] = xf(D.N, { ...o, extra: { ...o.extra, front: cross(...at) } }); };
  D.tests_fail_look = xf(D.N, { face: hopeful });
  F('a', { face: hopeful }, [128, -4, 0.2]);
  F('b', { face: hopeful }, [128, 24, 0.1]);
  F('c', { face: FACE.shock }, [128, 50, 0]);
  F('d', { face: FACE.spiral, ky: 0.8, kx: 1.12, extra: { fxm: 'alert', fx: [176, 96] } }, [130, 80, 0]);
  F('e', { face: FACE.spiral, ky: 1.05, kx: 0.97 }, [152, 44, 0.5]);
  F('f', { face: FACE.spiral }, [178, 28, 1.1]);
  F('g', { face: FACE.spiral, rot: -0.04 }, [196, 52, 1.7]);
  F('h', { face: FACE.spiral, rot: 0.04 }, [206, 112, 2.3]);
  F('i', { face: FACE.spiral, rot: -0.04 }, [208, 180, 2.9]);
  F('j', { face: FACE.spiral, rot: 0.04 }, [212, 160, 3.3]);
  F('k', { face: FACE.lookr }, [210, 183, 3.6]);
  F('l', { face: glare }, [210, 183, 3.6]);
  F('m', { face: glare, ky: 0.96 }, [210, 183, 3.6]);
  const s = (id, n) => ['tests_fail_' + id, n];
  CLIPS.tests_fail = { home: 'idle', seq: [...WAKE, ['tests_fail_look', 10], s('a', 2), s('b', 2), s('c', 2), s('d', 6), s('e', 2), s('f', 2), s('g', 3), s('h', 2), s('i', 2), s('j', 3),
    s('k', 10), s('l', 12), s('m', 6), s('l', 8), ...DOZE] };
})();
