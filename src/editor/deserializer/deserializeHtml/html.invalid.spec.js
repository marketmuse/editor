import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: invalid', () => {

  // ****
  test('deserialize wraps unwrapped text nodes in correct order', () => {

    let html = '';
    html += '<p>test1</p>';
    html += '<p>test2</p>';
    html += 'test3';
    html += '<p>test4</p>';

    expect(deserializeHtml()(html)).toEqual([
      { type: types.p, children: [{ text: 'test1' }] },
      { type: types.p, children: [{ text: 'test2' }] },
      { type: types.p, children: [{ text: 'test3' }] },
      { type: types.p, children: [{ text: 'test4' }] },
    ]);
  });

});
