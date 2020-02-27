/** @jsx deserialize */
import * as types from '@config/types';
import deserialize from '@editor/deserializer/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: p', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <p>test</p>
      </editor>
    );

    expect(editor.children).toEqual([{
      type: types.PARAGRAPH,
      children: [{ text: 'test' }]
    }]);
  });

});
