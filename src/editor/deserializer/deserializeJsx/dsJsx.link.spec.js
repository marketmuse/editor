/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
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
