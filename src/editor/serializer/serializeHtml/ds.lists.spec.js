import { types } from '@config/common';
import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';
import clean from '@utils/test/clean';

describe('serialize html', () => {

  // ****
  test('serialize html works with unordered lists', () => {

    const nodes = [{
      type: types.ul,
      children: [
        { type: types.li, children: [{ text: 'item 1' }] },
        { type: types.li, children: [{ text: 'item 2' }] },
        { type: types.li, children: [{ text: 'item 3' }] },
      ]
    }];

    const serialized = clean(serializeHtml(nodes));
    let expected = '';
    expected += '<ul>';
    expected += '<li>item 1</li>';
    expected += '<li>item 2</li>';
    expected += '<li>item 3</li>';
    expected += '</ul>';

    expect(serialized).toEqual(expected)
  });

  // ****
  test('serialize html works with ordered lists', () => {

    const nodes = [{
      type: types.ol,
      children: [
        { type: types.li, children: [{ text: 'item 1' }] },
        { type: types.li, children: [{ text: 'item 2' }] },
        { type: types.li, children: [{ text: 'item 3' }] },
      ]
    }];

    const serialized = clean(serializeHtml(nodes));
    let expected = '';
    expected += '<ol>';
    expected += '<li>item 1</li>';
    expected += '<li>item 2</li>';
    expected += '<li>item 3</li>';
    expected += '</ol>';

    expect(serialized).toEqual(expected)
  });

});
