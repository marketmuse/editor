/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: h', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <text bold>test</text>
        <text italic>test</text>
        <text strikethrough>test</text>
        <text underline>test</text>
        <text bold italic>test</text>
        <text bold italic underline>test</text>
      </editor>
    );

    expect(editor.children).toEqual([
      { text: 'test', bold: true },
      { text: 'test', italic: true },
      { text: 'test', strikethrough: true },
      { text: 'test', underline: true },
      { text: 'test', bold: true, italic: true },
      { text: 'test', bold: true, italic: true, underline: true },
    ]);
  });

});
