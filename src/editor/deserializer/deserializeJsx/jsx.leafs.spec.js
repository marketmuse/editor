/** @jsx deserialize */
import * as types from '@config/types';
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
      { text: 'test', [types.BOLD]: true },
      { text: 'test', [types.ITALIC]: true },
      { text: 'test', [types.STRIKETHROUGH]: true },
      { text: 'test', [types.UNDERLINE]: true },
      { text: 'test', [types.BOLD]: true, [types.ITALIC]: true },
      { text: 'test', [types.BOLD]: true, [types.ITALIC]: true, [types.UNDERLINE]: true },
    ]);
  });

});
