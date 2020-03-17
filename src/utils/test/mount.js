// use this when working with DOM specific tests
import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import MMSEditor from '@';

export default ({
  // props to pass to `MMSEditor` component
  mmsEditorProps = {},
  // set editor children to this value before executing fn
  children,
  // set editor selection to this value before executing fn
  selection,
  // function to run once editor is mounted
  // receives `functions` and `formats`
  fn,
}) => {

  let editorMounted = null;

  // mount MMSEditor component
  mount(
    <MMSEditor {...mmsEditorProps}>
      {({ functions, editor }) => {
        useEffect(() => {

          // get a ref to editor instance
          editorMounted = functions._getEditor();

          // set children or selection to a custom value
          if (children) editorMounted.children = children;
          if (selection) editorMounted.selection = selection;

          // run test functions on mount
          if (typeof fn === 'function') fn({ functions });

        }, []);

        // render editor
        return editor();
      }}
    </MMSEditor>
  );

  return editorMounted;
}
