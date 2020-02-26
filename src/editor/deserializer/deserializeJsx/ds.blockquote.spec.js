/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx';
import withTest from '@utils/test/withTest';

describe('deserialize jsx: blockquote', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <blockquote>test</blockquote>
      </editor>
    );

    expect(editor.children).toEqual([{
      type: 'blockquote',
      children: [{ text: 'test' }]
    }]);
  });

});