/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from './deserializeJsx';
import withTest from '../../../test-utils/withTest';

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
