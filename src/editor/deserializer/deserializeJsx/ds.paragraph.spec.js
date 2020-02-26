/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
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
      type: 'paragraph',
      children: [{ text: 'test' }]
    }]);
  });

});
