import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Editable } from 'slate-react';

import Leaf from '@components/editor/Leaf';
import Element from '@components/editor/Element';
import Toolbar from '@components/toolbar/Toolbar';

import getDecorate from '@editor/decorators/getDecorate';
import getDecors from '@editor/decorators/getDecors';
import getDecorTriggers from '@editor/decorators/getDecorTriggers';
import getHandleHotkeys from '@editor/hotkeys/getHandleHotkeys';
import getExecuteEvent from '@utils/getExecuteEvent';

// defaults
import defaultToolbar from '@config/defaultToolbar';

const MMSEditorConsumer = props => {

  const {
    hotkeys,
    decorators,
    events,
    formats,
    functions
  } = props;

  // execute event fn
  const execEventArgs = { functions, formats };
  const execEvent = getExecuteEvent(events, execEventArgs);

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
        placeholder,
        spellCheck = true,
        autoCorrect = false,
        autoCapitalize = false,
        readOnly = false,
        autoFocus = false,
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
        const handleHotkeys = useCallback(getHandleHotkeys(hotkeys), [hotkeys]);

        return (
          <Editable
            id={id}
            className={editorClassName}
            style={style}
            spellCheck={spellCheck ? 1 : 0}
            autoFocus={autoFocus ? 1 : 0}
            autoCorrect={autoCorrect ? 1 : 0}
            autoCapitalize={autoCapitalize ? 1 : 0}
            readOnly={readOnly ? 1 : 0}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            placeholder={placeholder}
            onCut={event => execEvent('onCut', event)}
            onCopy={event => execEvent('onCopy', event)}
            onPaste={event => execEvent('onPaste', event)}
            onBeforeInput={event => execEvent('onBeforeInput', event)}
            onBlur={event => execEvent('onBlur', event)}
            onFocus={event => execEvent('onFocus', event)}
            onClick={event => execEvent('onClick', event)}
            onCompositionStart={event => execEvent('onCompositionStart', event)}
            onCompositionEnd={event => execEvent('onCompositionEnd', event)}
            onDragOver={event => execEvent('onDragOver', event)}
            onDragStart={event => execEvent('onDragStart', event)}
            onDrop={event => execEvent('onDrop', event)}
            onKeyDown={event => {
              execEvent('onKeyDown', event)
              handleHotkeys({ event, formats, functions })
            }}
          />
        )
      },
    })
  )
};

/* eslint-enable */

MMSEditorConsumer.propTypes = {
  children: PropTypes.func,
  hotkeys: PropTypes.array,
  decorators: PropTypes.array,
  formats: PropTypes.object,
  functions: PropTypes.object,
  events: PropTypes.object,
};

export default MMSEditorConsumer;
