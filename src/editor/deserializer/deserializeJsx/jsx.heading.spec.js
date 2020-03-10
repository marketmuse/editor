/** @jsx deserialize */
import { types } from '@config/common';
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: h', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <h1>test</h1>
        <h2>test</h2>
        <h3>test</h3>
      </editor>
    );

    expect(editor.children).toEqual([
      { type: types.h1, children: [{ text: 'test' }] },
      { type: types.h2, children: [{ text: 'test' }] },
      { type: types.h3, children: [{ text: 'test' }] },
    ]);
  });

});
