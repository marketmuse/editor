/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from './deserializeJsx';
import withTest from '../../test-utils/withTest';

describe('deserialize jsx', () => {

  // ****
  test('deserialize jsx works for p', () => {

    const editor = withTest(
      <editor><p><text>test</text></p></editor>
    );

    expect(editor.children).toEqual([{
      type: 'paragraph',
      children: [{ text: 'test' }]
    }]);

  });

  // ****
  test('deserialize jsx works for a', () => {

    const editor = withTest(
      <editor><a href='test.com'>test</a></editor>
    );

    expect(editor.children).toEqual([{
      type: 'link',
      href: 'test.com',
      children: [{ text: 'test' }]
    }]);

  });
});
