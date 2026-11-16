// Sleepy wink: fast asleep, he opens one eye, finds you watching, winks, and goes back to sleep.
// group: scenes
(() => {
  const { D, kit } = window.__lump, k = kit.clip('sleepy_wink', { asleep: true });
  const lie = (face, extra = {}) => ({ ...D.S1, face, fxm: 'none', ...extra });
  const shut = ['stroke', [[168, 166], [174, 171], [181, 167]], 3], smile = ['stroke', [[183, 179], [188, 183], [193, 179]], 2.6];
  k.add('stir', 4, lie([['stroke', [[168, 168], [174, 169], [181, 168]], 3], ['dot', 187, 181, 3]]));
  k.add('open', 10, lie([['dot', 174, 168, 4.4], ['dot', 187, 181, 3]]));
  k.add('see', 8, lie([['dot', 175, 169, 4.4], smile]));
  k.add('wink', 12, lie([['stroke', [[168, 170], [174, 165], [181, 169]], 3], smile], { front: c => kit.sparkle(c, 160, 154, 9) }));
  k.add('settle', 6, lie([shut, smile]));
  k.done();
})();
