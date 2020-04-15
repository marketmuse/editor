import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: transform', () => {

  // ****
  test('transform function should work', () => {

    let html = '';
    html += '<div>';
    html += '<b>text</b>';
    html += '</div>';

    expect(
      deserializeHtml([{
        transforms: [
          el => {
            if (el.nodeName === 'DIV') {
              const newEl = document.createElement('p');
              newEl.innerHTML = el.innerHTML;
              return newEl;
            }

            return el;
          }
        ]
      }])(html)
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
