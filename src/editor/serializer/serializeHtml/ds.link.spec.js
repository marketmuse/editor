import { types } from '@config/common';
import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';
import clean from '@utils/test/clean';

describe('serialize html', () => {

  // ****
  test('serialize html works with links', () => {

    const nodes = [{
      type: types.a,
      href: 'https://marketmuse.com',
      children: [{ text: 'marketmuse' }]
    }];

    const serialized = clean(serializeHtml(nodes));
    const expected = '<a href="https://marketmuse.com">marketmuse</a>';

    expect(serialized).toEqual(expected)
  });

});
