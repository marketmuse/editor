import versions from '@config/versions';
import { types } from '@config/common';
import importFn from '@editor/data/import';

describe('import', () => {

  // ****
  test('import works', () => {

    const editor = {
      children: []
    };

    const mockSetValue = data => {
      editor.children = data;
    }

    const raw = {
      ...versions,
      data: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    };

    const expected = {
      children: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }]
    };

    importFn(editor, mockSetValue, raw);
    expect(editor).toEqual(expected)
  });

  // ****
  test('import works with history', () => {

    const editor = {
      children: []
    };

    const mockSetValue = data => {
      editor.children = data;
    }

    const raw = {
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

    const expected = {
      children: [{
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }],
      history: {
        undos: [42],
        redos: [42, 42],
      }
    };

    importFn(editor, mockSetValue, raw);
    expect(editor).toEqual(expected)
  });

});
