import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: transform', () => {

  // ****
  test('transform function should work', () => {
    expect(
      deserializeHtml({
        transform: el => {
          if (el.nodeName === 'DIV') {
            const newEl = document.createElement('p');
            newEl.innerHTML = el.innerHTML;
            return newEl;
          }

          return el;
        }
      })`
        <div>
          <b>text</b>
        </div>
      `
    ).toEqual([
      {
        type: types.p,
        children: [{
          text: 'text',
          [types.b]: true,
        }]
      },
    ]);
  });

});
