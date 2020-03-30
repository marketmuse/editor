import { Editor, Transforms } from 'slate';
import mount from '@utils/test/mount';
import { types } from '@config/common';

describe('normalizer options', () => {

  // ****
  test('editor should accept multiple normalizer and work', () => {

    const plugins = [
      {
        normalizerOptions: {
          normalize: (editor, [ node, path ]) => {
            const isTopLevel = path.length === 1;
            const isFirst = path[0] === 0;
            const isHeading = node.type === types.h1;

            // make first block heading
            if (isTopLevel && isFirst && !isHeading) {
              Transforms.unwrapNodes(editor, { at: path });
              Transforms.wrapNodes(editor, { children: [], type: types.h1 }, { at: path })
              return true;
            }

            return false;
          }
        },
      },
      {
        normalizerOptions: {
          normalize: (editor, [ node, path ]) => {
            const isTopLevel = path.length === 1;
            const isSecond = path[0] === 1;
            const isParagraph = node.type === types.p;

            // make second block paragraph
            if (isTopLevel && isSecond && !isParagraph) {
              Transforms.unwrapNodes(editor, { at: path });
              Transforms.wrapNodes(editor, { children: [], type: types.p }, { at: path })
              return true;
            }

            return false;
          }
        }
      },
    ];

    // create the editor
    const editor = mount({
      mmsEditorProps: { plugins },
      children: [
        { type: types.h2, children: [{ text: 'test1' }] },
        { type: types.h2, children: [{ text: 'test2' }] },
        { type: types.h2, children: [{ text: 'test3' }] },
      ]
    });

    // trigger normalization
    Editor.normalize(editor, { force: true })

    // normalizer should work and enforce layout
    expect(editor.children).toEqual([
      { type: types.h1, children: [{ text: 'test1' }] },
      { type: types.p, children: [{ text: 'test2' }] },
      { type: types.h2, children: [{ text: 'test3' }] },
    ]);
  });

});
