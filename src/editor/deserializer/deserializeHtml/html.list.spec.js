import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: list', () => {

  // ****
  test('deserialize works for lists', () => {

    let html = '';
    html += '<ul>';
    html += '<li>test1</li>';
    html += '<li>test2</li>';
    html += '<li>test3</li>';
    html += '</ul>';
    html += '<ol>';
    html += '<li>test1</li>';
    html += '<li>test2</li>';
    html += '<li>test3</li>';
    html += '</ol>';

    expect(deserializeHtml()(html)).toEqual([
      {
        type: types.ul,
        children: [
          { type: types.li, children: [{ text: 'test1' }] },
          { type: types.li, children: [{ text: 'test2' }] },
          { type: types.li, children: [{ text: 'test3' }] },
        ]
      },
      {
        type: types.ol,
        children: [
          { type: types.li, children: [{ text: 'test1' }] },
          { type: types.li, children: [{ text: 'test2' }] },
          { type: types.li, children: [{ text: 'test3' }] },
        ]
      }
    ]);
  });

});
