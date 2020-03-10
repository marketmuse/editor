import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: list', () => {

  // ****
  test('deserialize works for lists', () => {
    expect(
      deserializeHtml()`
        <ul>
          <li>test1</li>
          <li>test2</li>
          <li>test3</li>
        </ul>
        <ol>
          <li>test1</li>
          <li>test2</li>
          <li>test3</li>
        </ol>
      `
    ).toEqual([
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
