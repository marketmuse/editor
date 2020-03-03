import { types } from '@config/common';
import deserializeHtml, { TEXT } from '@editor/deserializer/deserializeHtml';

describe('deserialize html: blockquote', () => {

  // ****
  test('deserialize works for blockquote', () => {
    expect(
      deserializeHtml()`
        <blockquote>marketmuse</blockquote>
      `
    ).toEqual([{
      type: types.q,
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('empty blockquotes should be ignored', () => {
    expect(
      deserializeHtml()`
        <blockquote></blockquote>
      `
    ).toEqual([]);
  });

  // ****
  test('parse as text should work for blockquote', () => {
    expect(
      deserializeHtml({
        strategies: [
          { tag: 'blockquote', strategy: TEXT }
        ]
      })`
        <blockquote>marketmuse</blockquote>
      `
    ).toEqual([
      { text: 'marketmuse' }
    ]);
  });

});
