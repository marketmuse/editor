/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import insertHtml from '@editor/data/insertHtml';

describe('insertHtml', () => {

  // ****
  test('insertHtml works', () => {

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
          <text bold>test</text>
          <cursor />
        </block>
      </editor>
    );

    insertHtml(editor, '<div><b>test</b></div>', {});
    expect(editor.children).toEqual(expected.children)
  });

});
