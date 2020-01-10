/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../test-utils/jsx';
import mount from '../../test-utils/mount';
import withTest from '../../test-utils/withTest';
import initApi from '..';

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
