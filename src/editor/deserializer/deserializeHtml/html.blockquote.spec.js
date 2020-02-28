import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: blockquote', () => {

  // ****
  test('deserialize works for blockquote', () => {

    const output = deserializeHtml()`
      <blockquote>marketmuse</blockquote>
    `;

    expect(output).toEqual([{
      type: types.q,
      children: [{ text: 'marketmuse' }]
    }]);
  });

  // ****
  test('empty blockquotes should be ignored', () => {

    const output = deserializeHtml()`
      <blockquote></blockquote>
    `;

    expect(output).toEqual([]);
  });

  // ****
  test('parse as text should work for blockquote', () => {

    const output = deserializeHtml({
      tagSettings: [
        { tag: 'blockquote', parse: { text: true } }
      ]
    })`
      <blockquote>marketmuse</blockquote>
    `;

    expect(output).toEqual([
      { text: 'marketmuse' }
    ]);
  });

});
