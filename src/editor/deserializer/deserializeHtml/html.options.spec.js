import { types } from '@config/common';
import deserializeHtml, { TEXT } from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: options', () => {

  // ****
  test('multiple options should be merged properly', () => {

    const turnIntoParagraph = name => el => {
      if (el.nodeName === name) {
        const newEl = document.createElement('p');
        newEl.innerHTML = el.innerHTML;
        return newEl;
      }
      return el;
    };

    let html = '';
    html += '<div>';
    html += '<b>text</b>';
    html += '</div>';
    html += '<span>';
    html += '<a href="marketmuse.com">marketmuse</a>';
    html += '</span>';

    expect(
      deserializeHtml([
        { transforms: [turnIntoParagraph('DIV')] },
        { transforms: [turnIntoParagraph('SPAN')] },
        { strategies: [{ tag: 'b', strategy: TEXT }] },
        { strategies: [{ tag: 'a', strategy: TEXT }] },
      ])(html)
    ).toEqual([
      {
        type: types.p,
        children: [{ text: 'text' }]
      },
      {
        type: types.p,
        children: [{ text: 'marketmuse' }]
      }
    ]);
  });

});
