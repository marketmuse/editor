/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: h', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <h1>test</h1>
        <h2>test</h2>
        <h3>test</h3>
      </editor>
    );

    expect(editor.children).toEqual([
      { type: 'heading-one', children: [{ text: 'test' }] },
      { type: 'heading-two', children: [{ text: 'test' }] },
      { type: 'heading-three', children: [{ text: 'test' }] },
    ]);
  });

});
