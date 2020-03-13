/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import insertText from '@editor/data/insertText';

describe('insertText', () => {

  // ****
  test('insertText works', () => {

    const editor = withTest(
      <editor>
        <cursor />
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

    const mockSetValue = val => { editor.children = val; }

    insertText(editor, mockSetValue, 'test', {});
    expect(editor.children).toEqual(expected.children)
  });

  // ****
  test('insertText works without focus', () => {

    const editor = withTest(
      <editor />
    );

    const expected = withTest(
      <editor>
        <p>
          <text>test</text>
        </p>
      </editor>
    );

    const mockSetValue = val => { editor.children = val; }

    insertText(editor, mockSetValue, 'test', {});
    expect(editor.children).toEqual(expected.children)
  });

});
