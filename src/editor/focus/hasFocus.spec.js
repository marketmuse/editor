/** @jsx deserialize */
import deserialize from '@editor/deserializer/deserializeJsx/deserializeJsx';
import mount from '@utils/test/mount';
import withTest from '@utils/test/withTest';
import focus from '@editor/focus/focus';
import hasFocus from '@editor/focus/hasFocus';

describe('api: hasFocus', () => {
  test('hasFocus working', () => {

    const input = withTest(<editor />);

    // initially it shouldn't have focus
    expect(hasFocus(input)).toBe(false);

    // mount the editor
    mount(input);

    // focus
    focus(input);

    // it should have received focus now
    expect(hasFocus(input)).toBe(true);
  })
})
