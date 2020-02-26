/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
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
      type: 'link',
      href: 'test.com',
      children: [{ text: 'test' }]
    }]);
  });

});
