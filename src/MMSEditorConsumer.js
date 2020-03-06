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
import getApplyPlugins from '@editor/plugins/getApplyPlugins';

// defaults
import defaultToolbar from '@config/defaultToolbar';
import defaultHotkeys from '@config/defaultHotkeys';

const MMSEditor = props => {

  const editor = useSlate();

  // plugin applier function
  const applyPlugins = useCallback(
    getApplyPlugins(props.plugins || []), [props.plugins])

  // extend functions and formats
  const {
    formats,
    functions,
    hotkeys: pluginHotkeys,
    decorators: pluginDecorators,
  } = applyPlugins({
    functions: getFunctions(editor),
    formats: getFormats(editor),
  });

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
        const useDecorators = [].concat(pluginDecorators || []).concat(decorators || []);
        const decors = getDecors(useDecorators);
        const decorTriggers = getDecorTriggers(useDecorators);
        const decorate = useCallback(getDecorate(useDecorators), [decorTriggers]);

        // element / leaf renderers
        const renderElement = useCallback(props => <Element {...props} />, []);
        const renderLeaf = useCallback(props => <Leaf decors={decors} {...props} />, [decorTriggers]);

        // hotkeys
        const useHotkeys = (pluginHotkeys || []).concat(Array.isArray(hotkeys) ? hotkeys : defaultHotkeys);
        const handleHotkeys = useCallback(getHandleHotkeys(useHotkeys), [hotkeys, pluginHotkeys]);

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
              if (typeof onKeyDown === 'function') {
                onKeyDown({ event, formats, functions });
              }
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

  // an object containing extension functions
  plugins: PropTypes.arrayOf(
    PropTypes.shape({
      formats: PropTypes.function,
      functions: PropTypes.function,
      hotkeys: PropTypes.array,
      decorators: PropTypes.array,
      htmlDeserializerOptions: PropTypes.object,
    })
  )
};

export default MMSEditor;
