// use this when working with DOM specific tests
import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { withReact } from 'slate-react';
import isNil from 'lodash/isNil';
import MMSEditor from '@';
import initApi from '@editor/api';

export default (initial) => {

  // mount MMSEditor component, pass initial editor
  mount(
    <MMSEditor editor={initial}>
      {({ component }) => {
        return component; // render the editor
      }}
    </MMSEditor>
  );
}
