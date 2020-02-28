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
  test('deserialize works ignores empty blockquotes', () => {

    const output = deserializeHtml()`
      <blockquote></blockquote>
    `;

    expect(output).toEqual([]);
  });

});
