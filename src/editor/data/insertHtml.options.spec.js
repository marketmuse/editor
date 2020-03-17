import mount from '@utils/test/mount';
import { types } from '@config/common';

describe('insertHtml options', () => {

  // ****
  test('options should default to those provided by plugins', () => {

    const plugins = [
      { htmlDeserializerOptions: { strategies: [{ tag: 'a', strategy: 'text' }] } },
      { htmlDeserializerOptions: { strategies: [{ tag: 'b', strategy: 'skip' }] } },
    ];

    const testHtml = `
      <div>
        <b>test</b>
        <a href='https://marketmuse.com'>marketmuse</a>
      </div>
    `;

    const editor = mount({
      mmsEditorProps: { plugins },
      fn: ({ functions }) => {
        functions.insertHtml(testHtml);
      }
    });

    expect(editor.children).toEqual(
      [{ text: 'marketmuse' }]
    );
  });

  // ****
  test('options should be overriden once provided as a second argument', () => {

    const plugins = [
      { htmlDeserializerOptions: { strategies: [{ tag: 'a', strategy: 'text' }] } },
      { htmlDeserializerOptions: { strategies: [{ tag: 'b', strategy: 'skip' }] } },
    ];

    const optionsOverride = {
      strategies: [{ tag: 'a', strategy: 'skip' }]
    };

    const testHtml = `
      <div>
        <b>test</b>
        <a href='https://marketmuse.com'>marketmuse</a>
      </div>
    `;

    const editor = mount({
      mmsEditorProps: { plugins },
      fn: ({ functions }) => {
        functions.insertHtml(testHtml, optionsOverride);
      }
    });

    expect(editor.children).toEqual(
      [{ text: 'test', [types.b]: true }]
    );
  });

});
