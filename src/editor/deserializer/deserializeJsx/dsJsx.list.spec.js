/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: list', () => {

  // ****
  test('deserialize works for ul', () => {

    const editor = withTest(
      <editor>
        <ul>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
      </editor>
    );

    expect(editor.children).toEqual([{
      type: 'bulleted-list',
      children: [
        { type: 'list-item', children: [{ text: 'test' }] },
        { type: 'list-item', children: [{ text: 'test' }] },
        { type: 'list-item', children: [{ text: 'test' }] },
      ]
    }]);
  });

  // ****
  test('deserialize works for ol', () => {

    const editor = withTest(
      <editor>
        <ol>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ol>
      </editor>
    );

    expect(editor.children).toEqual([{
      type: 'numbered-list',
      children: [
        { type: 'list-item', children: [{ text: 'test' }] },
        { type: 'list-item', children: [{ text: 'test' }] },
        { type: 'list-item', children: [{ text: 'test' }] },
      ]
    }]);
  });

});
