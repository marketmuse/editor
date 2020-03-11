import versions from '@config/versions';
import { types } from '@config/common';
import exportFn from '@editor/data/export';

describe('export', () => {

  // ****
  test('export works', () => {

    const editor = {
      children: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    };

    const expected = {
      ...versions,
      data: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    };

    const exported = exportFn(editor);
    expect(exported).toEqual(expected)
  });

  // ****
  test('export works with history', () => {

    const editor = {
      children: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }],
      history: {
        undos: [42],
        redos: [42, 42],
      }
    };

    const expected = {
      ...versions,
      data: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }],
      history: {
        undos: [42],
        redos: [42, 42],
      }
    };

    const exported = exportFn(editor, { history: true });
    expect(exported).toEqual(expected)
  });

});
