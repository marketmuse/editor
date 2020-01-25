/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import initApi from '@editor/api';

describe('api: hasFocus', () => {
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
