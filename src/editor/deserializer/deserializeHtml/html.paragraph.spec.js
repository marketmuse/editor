import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml/deserializeHtml';

describe('deserialize html: p', () => {

  // ****
  test('deserialize works with single paragraph', () => {
    expect(
      deserializeHtml()`
        <p>test</p>
      `
    ).toEqual([{
      type: types.p,
      children: [{ text: 'test' }]
    }]);
  });

  // ****
  test('deserialize works with nested paragraph', () => {

    let html = '';
    html += '<div>';
    html += '<div>';
    html += '<div>';
    html += '<p>test</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    expect(deserializeHtml()(html)).toEqual([{
      type: types.p,
      children: [{ text: 'test' }]
    }]);
  });

  // ****
  test('deserialize works with multiple nested paragraphs', () => {

    let html = '';
    html += '<div>';
    html += '<p>test1</p>';
    html += '<p>test2</p>';
    html += '<p>test3</p>';
    html += '</div>';

    expect(deserializeHtml()(html)).toEqual([
      { type: types.p, children: [{ text: 'test1' }] },
      { type: types.p, children: [{ text: 'test2' }] },
      { type: types.p, children: [{ text: 'test3' }] },
    ]);
  });

});
