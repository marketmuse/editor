/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
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
      type: 'block-quote',
      children: [{ text: 'test' }]
    }]);
  });

});
