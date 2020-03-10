/** @jsx deserialize */
import { types } from '@config/common';
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
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
      type: types.p,
      children: [{ text: 'test' }]
    }]);
  });

});
