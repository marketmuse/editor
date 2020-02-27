/** @jsx deserialize */
import { types } from '@config/common';
import deserialize from '@editor/deserializer/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: blockquote', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <blockquote>test</blockquote>
      </editor>
    );

    expect(editor.children).toEqual([{
      type: types.q,
      children: [{ text: 'test' }]
    }]);
  });

});
