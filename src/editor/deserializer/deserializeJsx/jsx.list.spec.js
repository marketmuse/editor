/** @jsx deserialize */
import { types } from '@config/common';
import deserialize from '@editor/deserializer/deserializeJsx';
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
      type: types.ul,
      children: [
        { type: types.li, children: [{ text: 'test' }] },
        { type: types.li, children: [{ text: 'test' }] },
        { type: types.li, children: [{ text: 'test' }] },
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
      type: types.ol,
      children: [
        { type: types.li, children: [{ text: 'test' }] },
        { type: types.li, children: [{ text: 'test' }] },
        { type: types.li, children: [{ text: 'test' }] },
      ]
    }]);
  });

});
