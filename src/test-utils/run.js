import React, { useEffect } from 'react';
import { render, shallow, mount } from 'enzyme';
import { withReact } from 'slate-react';
import isNil from 'lodash/isNil';
import cloneDeep from 'lodash/cloneDeep';
import MMSEditor from '..';
import initApi from '../api';

export default (initial, run) => {

  const api = initApi(cloneDeep(initial));

  // stub window.getSelection as jest won't support it
  window.getSelection = () => {
    return { removeAllRanges: () => {} };
  }

  // mount MMSEditor component, pass initial editor
  // we need to have a full render using `mount`
  mount(
    <MMSEditor _editor={api._getEditor()}>
      {({ component }) => {
        return component; // render the editor
      }}
    </MMSEditor>
  );

  // pass api to op
  run(api)

  return api._getEditor();
}
