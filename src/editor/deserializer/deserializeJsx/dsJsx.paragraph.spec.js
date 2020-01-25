/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
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
      type: 'paragraph',
      children: [{ text: 'test' }]
    }]);
  });

});
