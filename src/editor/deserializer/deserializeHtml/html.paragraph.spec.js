import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

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
    expect(
      deserializeHtml()`
        <div>
          <div>
            <div>
              <p>test</p>
            </div>
          </div>
        </div>
      `
    ).toEqual([{
      type: types.p,
      children: [{ text: 'test' }]
    }]);
  });

  // ****
  test('deserialize works with multiple nested paragraphs', () => {
    expect(
      deserializeHtml()`
        <div>
          <p>test1</p>
          <p>test2</p>
          <p>test3</p>
        </div>
      `
    ).toEqual([
      { type: types.p, children: [{ text: 'test1' }] },
      { type: types.p, children: [{ text: 'test2' }] },
      { type: types.p, children: [{ text: 'test3' }] },
    ]);
  });

});
