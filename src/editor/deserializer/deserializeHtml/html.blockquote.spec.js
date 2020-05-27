import { types } from '@config/common';
import deserializeHtml, { TEXT } from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: blockquote', () => {

  // ****
  test('deserialize works for blockquote', () => {
    const html = '<blockquote>marketmuse</blockquote>';
    expect(deserializeHtml()(html)).toEqual([{
      type: types.q,
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('empty blockquotes should be ignored', () => {
    const html = '<blockquote></blockquote>';
    expect(deserializeHtml()(html)).toEqual([]);
  });

  // ****
  test('parse as text should work for blockquote', () => {
    const html = '<blockquote>marketmuse</blockquote>';
    expect(
      deserializeHtml([{
        strategies: [
          { tag: 'blockquote', strategy: TEXT }
        ]
      }])(html)
    ).toEqual([{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }]);
  });

});
