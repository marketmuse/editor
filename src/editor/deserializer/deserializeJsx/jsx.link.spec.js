/** @jsx deserialize */
import * as types from '@config/types';
import deserialize from '@editor/deserializer/deserializeJsx';
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
      type: types.LINK,
      href: 'test.com',
      children: [{ text: 'test' }]
    }]);
  });

});
