/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '../../test-utils/jsx';
import mount from '../../test-utils/mount';
import withTest from '../../test-utils/withTest';
import initApi from '..';

describe('api', () => {
  test('hasFocus working', () => {

    const input = withTest(<editor />);
    const api = initApi(input);

    // initially it shouldn't have focus
    expect(api.hasFocus()).toBe(false);

    // mount the editor
    mount(input);

    // focus
    api.focus();

    // it should have received focus now
    expect(api.hasFocus()).toBe(true);
  })
})
