/** @jsx deserialize */
import * as types from '@config/types';
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
      type: types.LIST_BULLETED,
      children: [
        { type: types.LIST_ITEM, children: [{ text: 'test' }] },
        { type: types.LIST_ITEM, children: [{ text: 'test' }] },
        { type: types.LIST_ITEM, children: [{ text: 'test' }] },
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
      type: types.LIST_NUMBERED,
      children: [
        { type: types.LIST_ITEM, children: [{ text: 'test' }] },
        { type: types.LIST_ITEM, children: [{ text: 'test' }] },
        { type: types.LIST_ITEM, children: [{ text: 'test' }] },
      ]
    }]);
  });

});
