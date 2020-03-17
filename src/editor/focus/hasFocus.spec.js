import mount from '@utils/test/mount';

describe('api: hasFocus', () => {

  test('hasFocus working', () => {

    let isFocused = false;

    mount({
      fn: ({ functions }) => {
        functions.focus();
        isFocused = functions.hasFocus();
      },
    });

    // it should have received focus now
    expect(isFocused).toBe(true);
  })
})
