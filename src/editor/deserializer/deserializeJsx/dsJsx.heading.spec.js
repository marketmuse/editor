/** @jsx jsx */
import { ReactEditor } from 'slate-react'
import jsx from './deserializeJsx';
import withTest from '../../../test-utils/withTest';

describe('deserialize jsx: h', () => {

  // ****
  test('deserialize works', () => {

    const editor = withTest(
      <editor>
        <h1>test</h1>
        <h2>test</h2>
        <h3>test</h3>
        <h4>test</h4>
        <h5>test</h5>
        <h6>test</h6>
      </editor>
    );

    expect(editor.children).toEqual([
      { type: 'heading', level: 1, children: [{ text: 'test' }] },
      { type: 'heading', level: 2, children: [{ text: 'test' }] },
      { type: 'heading', level: 3, children: [{ text: 'test' }] },
      { type: 'heading', level: 4, children: [{ text: 'test' }] },
      { type: 'heading', level: 5, children: [{ text: 'test' }] },
      { type: 'heading', level: 6, children: [{ text: 'test' }] },
    ]);
  });

});
