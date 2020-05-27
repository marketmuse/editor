import { types } from '@config/common';
import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';
import clean from '@utils/test/clean';

describe('serialize html', () => {

  // ****
  test('serialize html works with single paragraph', () => {

    const nodes = [{
      type: types.p,
      children: [{ text: 'marketmuse' }]
    }];

    const serialized = clean(serializeHtml(nodes));
    const expected = '<p>marketmuse</p>';

    expect(serialized).toEqual(expected)
  });

  // ****
  test('serialize html works with multiple paragraphs', () => {

    const nodes = [
      { type: types.p, children: [{ text: 'marketmuse1' }] },
      { type: types.p, children: [{ text: 'marketmuse2' }] },
      { type: types.p, children: [{ text: 'marketmuse3' }] },
    ];

    const serialized = clean(serializeHtml(nodes));
    let expected = '';
    expected += '<p>marketmuse1</p>';
    expected += '<p>marketmuse2</p>';
    expected += '<p>marketmuse3</p>';

    expect(serialized).toEqual(expected)
  });

});
