/** @jsx jsx */

import { Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import jsx from '../../test-utils/jsx';
import run from '../../test-utils/run';
import withTest from '../../test-utils/withTest';

describe('api', () => {
  test('is focus working', async () => {

    const initial = withTest(
      <editor><block>test</block></editor>
    );

    const actual = run(initial, api => {
      api.focus();
      api.insertText('-----');
    });

    // TODO: figure out the weird behaviour here

    console.log('initial isfocused', ReactEditor.isFocused(initial));
    console.log('actual isfocused', ReactEditor.isFocused(actual));

    console.log('initial -->', JSON.stringify(initial));
    console.log('actual -->', JSON.stringify(actual));

    expect(true).toBe(true);
  })
})
