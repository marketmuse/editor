import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { types } from '@config/common';
import MMSEditor from '@';

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

    let editorMounted = null;

    mount(
      <MMSEditor plugins={plugins}>
        {({ functions, editor }) => {

          useEffect(() => {
            functions.insertHtml(testHtml);
            editorMounted = functions._getEditor();
          }, []);

          return (
            <React.Fragment>
              {editor()}
            </React.Fragment>
          );
        }}
      </MMSEditor>
    );

    expect(editorMounted.children).toEqual(
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

    let editorMounted = null;

    mount(
      <MMSEditor plugins={plugins}>
        {({ functions, editor }) => {

          useEffect(() => {
            functions.insertHtml(testHtml, optionsOverride);
            editorMounted = functions._getEditor();
          }, []);

          return (
            <React.Fragment>
              {editor()}
            </React.Fragment>
          );
        }}
      </MMSEditor>
    );

    expect(editorMounted.children).toEqual(
      [{ text: 'test', [types.b]: true }]
    );
  });

});
