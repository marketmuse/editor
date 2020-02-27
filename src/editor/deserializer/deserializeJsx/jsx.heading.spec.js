/** @jsx deserialize */
import * as types from '@config/types';
import deserialize from '@editor/deserializer/deserializeJsx';
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
      { type: types.HEADING_ONE, children: [{ text: 'test' }] },
      { type: types.HEADING_TWO, children: [{ text: 'test' }] },
      { type: types.HEADING_THREE, children: [{ text: 'test' }] },
    ]);
  });

});
