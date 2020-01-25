/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import initApi from '@editor/api';

describe('api: focus', () => {
  test('is focus working', () => {

    const initial = withTest(<editor />);
    const api = initApi(initial);

    // initially the editor shouldn't have focus
    expect(ReactEditor.isFocused(initial)).toBe(false);

    // mount the editor
    mount(initial);

    // focus
    api.focus();

    // the editor should receive focus
    expect(ReactEditor.isFocused(initial)).toBe(true);
  })
})
