import { ReactEditor } from 'slate-react'
import mount from '@utils/test/mount';

describe('api: focus', () => {
  test('is focus working', () => {

    const editor = mount({
      fn: ({ functions }) => functions.focus()
    })

    // the editor should receive focus
    expect(ReactEditor.isFocused(editor)).toBe(true);
  })
})
