import mapReduceFlatten from '@utils/mapReduceFlatten';

export default (editor, normalizerOptions = []) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([ node, path ]) => {

    const normalizeFns = mapReduceFlatten(normalizerOptions, 'normalize');
    const changed = normalizeFns.reduce((acc, normalize) => (
      (typeof normalize === 'function')
        ? acc || normalize(editor, [ node, path ])
        : acc
    ), false);

    // if given normalizers cause a change, we should return
    // due to the "multi-pass" nature of the normalizers
    // https://docs.slatejs.org/concepts/10-normalizing#multi-pass-normalizing
    if (changed) return;

    // fall back
    normalizeNode([ node, path ]);
  }

  return editor;
}
