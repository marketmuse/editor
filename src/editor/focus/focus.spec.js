/** @jsx deserialize */
import { ReactEditor } from 'slate-react'
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import focus from '@editor/focus/focus';

describe('api: focus', () => {
  test('is focus working', () => {

    const initial = withTest(<editor />);

    // initially the editor shouldn't have focus
    expect(ReactEditor.isFocused(initial)).toBe(false);

    // mount the editor
    mount(initial);

    // focus
    focus(initial);

    // the editor should receive focus
    expect(ReactEditor.isFocused(initial)).toBe(true);
  })
})
