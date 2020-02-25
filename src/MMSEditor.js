import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Editable, useSlate } from 'slate-react';

import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';
import Toolbar from '@components/toolbar/Toolbar';

import getFormats from '@editor/formats';
import getFunctions from '@editor/functions';
import getDecorate from '@editor/decorators/getDecorate';
import getDecors from '@editor/decorators/getDecors';
import getDecorTriggers from '@editor/decorators/getDecorTriggers';
import getHandleHotkeys from '@editor/hotkeys/getHandleHotkeys';

// defaults
import defaultToolbar from '@config/defaultToolbar';
import defaultHotkeys from '@config/defaultHotkeys';

const MMSEditor = props => {

  const editor = useSlate();

  // functions and formats
  const functions = getFunctions(editor);
  const formats = getFormats(editor);

  /* eslint-disable react/prop-types */

  return (
    props.children({

      // pass active state of formats
      formats,

      // pass api functions with editor instance in closure
      functions,

      // pass down toolbar component
      toolbar: (options = {}) => (
        <Toolbar
          {...defaultToolbar}
          {...options}
          functions={functions}
          formats={formats}
        />
      ),

      // pass down editor component
      editor: ({
        id,
        style,
        className,
        readOnly = false,
        autoFocus = false,
        onKeyDown,
        hotkeys,
        decorators,
      } = {}) => {

        // construct class name
        let editorClassName = 'mms--editor';
        if (className) editorClassName += ` ${className || ''}`;
        if (readOnly) editorClassName += ' mms--disabled';

        // decorators
        const decors = getDecors(decorators);
        const decorTriggers = getDecorTriggers(decorators);
        const decorate = useCallback(getDecorate(decorators), [decorTriggers]);

        // element / leaf renderers
        const renderElement = useCallback(props => <Element {...props} />, []);
        const renderLeaf = useCallback(props => <Leaf decors={decors} {...props} />, [decorTriggers]);

        // hotkeys
        const useHotkeys = Array.isArray(hotkeys) ? hotkeys : defaultHotkeys;
        const handleHotkeys = useCallback(getHandleHotkeys(useHotkeys), [hotkeys]);

        return (
          <Editable
            id={id}
            className={editorClassName}
            style={style}
            autoFocus={autoFocus}
            readOnly={readOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            onKeyDown={event => {

              // custom keydown function
              if (typeof onKeyDown === 'function') onKeyDown(event);

              // handle hotkeys
              handleHotkeys({ event, formats, functions })
            }}
          />
        )
      },
    })
  )
};

/* eslint-enable */

MMSEditor.propTypes = {
  children: PropTypes.func,
};

export default MMSEditor;
