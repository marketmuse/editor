/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '@utils/test/withTest';
import isEmpty from '@editor/contents/isEmpty';

describe('isEmpty', () => {

  // ****
  test('isEmpty works when empty', () => {

    const editor = withTest(
      <editor>
        <block />
      </editor>
    );

    const result = isEmpty(editor);
    expect(result).toEqual(true)
  });

  // ****
  test('isEmpty works when not empty', () => {

    const editor = withTest(
      <editor>
        <block>
          <text>Hey!</text>
        </block>
      </editor>
    );

    const result = isEmpty(editor);
    expect(result).toEqual(false)
  });

});
