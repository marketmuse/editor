import { types } from '@config/common';
import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';
import clean from '@utils/test/clean';

describe('serialize html', () => {

  // ****
  test('serialize html works with blockquote', () => {

    const nodes = [{
      type: types.q,
      children: [{ text: 'marketmuse' }]
    }];

    const serialized = clean(serializeHtml(nodes));
    const expected = '<blockquote>marketmuse</blockquote>';

    expect(serialized).toEqual(expected)
  });

});
