import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: headings', () => {

  // ****
  test('deserialize works for headings', () => {

    let html = '';
    html += '<div>';
    html += '<h1>heading 1</h1>';
    html += '<h2>heading 2</h2>';
    html += '<h3>heading 3</h3>';
    html += '<h4>heading 4</h4>';
    html += '<h5>heading 5</h5>';
    html += '<h6>heading 6</h6>';
    html += '</div>';

    expect(deserializeHtml()(html)).toEqual([{
      children: [
        { children: [{ text: 'heading 1' }], type: types.h1 },
        { children: [{ text: 'heading 2' }], type: types.h2 },
        { children: [{ text: 'heading 3' }], type: types.h3 },
        { children: [{ text: 'heading 4' }], type: types.h3 },
        { children: [{ text: 'heading 5' }], type: types.h3 },
        { children: [{ text: 'heading 6' }], type: types.h3 }
      ]
    }]);
  });

});
