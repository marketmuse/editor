import { types } from '@config/common';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

describe('deserialize html: headings', () => {

  // ****
  test('deserialize works for headings', () => {
    expect(
      deserializeHtml()`
        <div>
          <h1>heading 1</h1>
          <h2>heading 2</h2>
          <h3>heading 3</h3>
          <h4>heading 4</h4>
          <h5>heading 5</h5>
          <h6>heading 6</h6>
        </div>
      `
    ).toEqual([
      { type: types.h1, children: [{ text: 'heading 1' }] },
      { type: types.h2, children: [{ text: 'heading 2' }] },
      { type: types.h3, children: [{ text: 'heading 3' }] },
      // h4, h5 and h6 are not supported and deserialized as h3
      { type: types.h3, children: [{ text: 'heading 4' }] },
      { type: types.h3, children: [{ text: 'heading 5' }] },
      { type: types.h3, children: [{ text: 'heading 6' }] },
    ]);
  });

});
