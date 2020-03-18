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

  const executeEvent = getExecuteEvent(events);

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
            spellCheck={spellCheck}
            autoFocus={autoFocus}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            readOnly={readOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            placeholder={placeholder}
            onCut={event => executeEvent('onCut', event, { formats, functions })}
            onCopy={event => executeEvent('onCopy', event, { formats, functions })}
            onPaste={event => executeEvent('onPaste', event, { formats, functions })}
            onBeforeInput={event => executeEvent('onBeforeInput', event, { formats, functions })}
            onBlur={event => executeEvent('onBlur', event, { formats, functions })}
            onFocus={event => executeEvent('onFocus', event, { formats, functions })}
            onClick={event => executeEvent('onClick', event, { formats, functions })}
            onCompositionStart={event => executeEvent('onCompositionStart', event, { formats, functions })}
            onCompositionEnd={event => executeEvent('onCompositionEnd', event, { formats, functions })}
            onDragOver={event => executeEvent('onDragOver', event, { formats, functions })}
            onDragStart={event => executeEvent('onDragStart', event, { formats, functions })}
            onDrop={event => executeEvent('onDrop', event, { formats, functions })}
            onKeyDown={event => {
              executeEvent('onKeyDown', event, { formats, functions })
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
