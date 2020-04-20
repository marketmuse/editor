/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import insertHtml from '@editor/data/insertHtml';

describe('insertHtml', () => {

  // ****
  test('insertHtml works', () => {

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
          <text bold>test</text>
        </p>
      </editor>
    );

    insertHtml(editor, '<p><b>test</b></p>', {});
    expect(editor.children).toEqual(expected.children)
  });

  // ****
  test('insertHtml works without focus', () => {

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
          <text bold>test</text>
        </p>
      </editor>
    );

    insertHtml(editor, '<p><b>test</b></p>', {});
    expect(editor.children).toEqual(expected.children)
  });

});
