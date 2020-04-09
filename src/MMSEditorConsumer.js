import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Editable } from 'slate-react';

import Toolbar from '@components/toolbar/Toolbar';

const MMSEditorConsumer = props => {

  const {
    toolbar,
    decorate,
    children,
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
            // NOTE: DO NOT pass an anonymous function
            // ie. decorate={() => /*whatever*/}
            decorate={decorate}
            readOnly={readOnly ? 1 : 0}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
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
            onKeyUp={event => execEvent('onKeyUp', event)}
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
  decorate: PropTypes.func,
  apiArgs: PropTypes.object,
  children: PropTypes.func,
  renderElement: PropTypes.func,
  renderLeaf: PropTypes.func,
  handleHotkeys: PropTypes.func,
  execEvent: PropTypes.func,
};

export default MMSEditorConsumer;
