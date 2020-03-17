// use this when working with DOM specific tests
import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import MMSEditor from '@';

export default ({
  fn,
  mmsEditorProps = {},
}) => {

  let editorMounted = null;

  // mount MMSEditor component
  mount(
    <MMSEditor {...mmsEditorProps}>
      {({ functions, editor }) => {
        useEffect(() => {

          // run test functions on mount
          if (typeof fn === 'function') {
            fn({ functions });
          }

          // fetch editor instance after test functions
          editorMounted = functions._getEditor();

        }, []);

        // render editor
        return editor();
      }}
    </MMSEditor>
  );

  return editorMounted;
}
