/** @jsx deserialize */
import { types } from '@config/common';
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: a', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <a href='test.com'>test</a>
      </editor>
    );

    expect(editor.children).toEqual([{
      type: types.a,
      href: 'test.com',
      children: [{ text: 'test' }]
    }]);
  });

});
