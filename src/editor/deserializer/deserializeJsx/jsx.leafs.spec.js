/** @jsx deserialize */
import { types } from '@config/common';
import deserialize from '@editor/deserializer/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: leafs', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <text bold>test</text>
        <text italic>test</text>
        <text strikethrough>test</text>
        <text underline>test</text>
        <text bold italic>test</text>
        <text bold italic underline>test</text>
      </editor>
    );

    expect(editor.children).toEqual([
      { text: 'test', [types.b]: true },
      { text: 'test', [types.i]: true },
      { text: 'test', [types.s]: true },
      { text: 'test', [types.u]: true },
      { text: 'test', [types.b]: true, [types.i]: true },
      { text: 'test', [types.b]: true, [types.i]: true, [types.u]: true },
    ]);
  });

});
