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

    expect(
      deserializeHtml([
        { transforms: [turnIntoParagraph('DIV')] },
        { transforms: [turnIntoParagraph('SPAN')] },
        { strategies: [{ tag: 'b', strategy: TEXT }] },
        { strategies: [{ tag: 'a', strategy: TEXT }] },
      ])`
        <div>
          <b>text</b>
        </div>
        <span>
          <a href="marketmuse.com">marketmuse</a>
        </span>
      `
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
