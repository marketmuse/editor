/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from './deserializeJsx';
import withTest from '../../../test-utils/withTest';

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
