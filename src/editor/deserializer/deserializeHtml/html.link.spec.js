import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: a', () => {

  // ****
  test('deserialize works with single paragraph', () => {

    const output = deserializeHtml`
      <a href="https://marketmuse.com">marketmuse</a>
    `;

    expect(output).toEqual([{
      type: types.a,
      href: 'https://marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }]);
  });

});
