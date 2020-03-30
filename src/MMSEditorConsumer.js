import React from 'react';
import PropTypes from 'prop-types';
import { Editable } from 'slate-react';

import Toolbar from '@components/toolbar/Toolbar';

const MMSEditorConsumer = props => {

  const {
    toolbar,
    children,
    decorate,
    renderElement,
    renderLeaf,
    handleHotkeys,
    execEvent,
    apiArgs,
  } = props;

  /* eslint-disable react/prop-types */

  return (
    children({

      // functions, formats and other apis
      ...apiArgs,

      // pass down toolbar component
      toolbar: (options = {}) => (
        <Toolbar
          {...(toolbar || {})}
          {...options}
          {...apiArgs}
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
            // decorate={decorate}
            decorate={() => [

              // TODO:
              // 1. postMessage to web worker on change
              // 2. web worker picks up children, does the computation, sends back ranges
              // 3. onmessage callback saves the ranges returned from the web worker in a mutable ref (no re-renders!)
              // 4. decorate function returns to saved range array as if it computed

              // TODO2: is there way to apply range array as decorations without
              // using the decorate function at all ?

              /*
                {
                  anchor: { path: [0, 0], offset: 0 },
                  focus: { path: [0, 0], offset: 3 },
                  bold: true,
                }
              */
            ]}
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
            onMouseDown={event => execEvent('onMouseDown', event)}
            onKeyDown={event => {
              execEvent('onKeyDown', event)
              handleHotkeys({ event, ...apiArgs })
            }}
          />
        )
      },
    })
  )
};

/* eslint-enable */

MMSEditorConsumer.propTypes = {
  toolbar: PropTypes.object,
  apiArgs: PropTypes.object,
  children: PropTypes.func,
  decorate: PropTypes.func,
  renderElement: PropTypes.func,
  renderLeaf: PropTypes.func,
  handleHotkeys: PropTypes.func,
  execEvent: PropTypes.func,
};

export default MMSEditorConsumer;
