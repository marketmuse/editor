import mount from '@utils/test/mount';

describe('api: hasFocus', () => {

  test('hasFocus working', () => {

    let isFocused = false;

    mount({
      fn: ({ functions }) => {
        functions.focus();
        const e = functions._getEditor();
        isFocused = functions.hasFocus(e);
      },
    });

    // it should have received focus now
    expect(isFocused).toBe(true);
  })
})
