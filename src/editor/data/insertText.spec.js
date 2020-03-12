/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import insertText from '@editor/data/insertText';

describe('insertText', () => {

  // ****
  test('insertText works', () => {

    const editor = withTest(
      <editor>
        <block>
          <cursor />
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>test</text>
          <cursor />
        </block>
      </editor>
    );

    insertText(editor, 'test', {});
    expect(editor.children).toEqual(expected.children)
  });

});
