// use this when working with DOM specific tests
import React from 'react';
import { mount } from 'enzyme';
import MMSEditor from '@';

export default (initial) => {

  // mount MMSEditor component, pass initial editor
  mount(
    <MMSEditor editor={initial}>
      {({ editor }) => (
        <div>{editor()}</div>
      )}
    </MMSEditor>
  );
}
