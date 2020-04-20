/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import insertText from '@editor/data/insertText';

describe('insertText', () => {

  // ****
  test('insertText works', () => {

    const editor = withTest(
      <editor>
        <p>
          <cursor />
          <text />
        </p>
      </editor>
    );

    const expected = withTest(
      <editor>
        <p>
          <text>test</text>
          <cursor />
        </p>
      </editor>
    );

    insertText(editor, 'test');
    expect(editor.children).toEqual(expected.children)
  });

  // ****
  test('insertText works without focus', () => {

    const editor = withTest(
      <editor>
        <p>
          <text />
        </p>
      </editor>
    );

    const expected = withTest(
      <editor>
        <p>
          <text>test</text>
        </p>
      </editor>
    );

    insertText(editor, 'test');
    expect(editor.children).toEqual(expected.children)
  });

});
