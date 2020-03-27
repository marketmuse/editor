import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSlate } from 'slate-react';
import { FormatsApiContext } from '@editor/hooks/useFormats';
import { FunctionsApiContext } from '@editor/hooks/useFunctions';
import { DecoratorContext } from '@editor/hooks/useDecors';
import MMSEditorConsumer from '@/MMSEditorConsumer';

import useRenderers from '@components/editor/useRenderers';
import useDecorators from '@editor/decorators/useDecorators';
import useHotkeys from '@editor/hotkeys/useHotkeys';
import useEvents from '@editor/events/useEvents';

import getFormats from '@editor/formats';
import getFunctions from '@editor/functions';

const MMSEditorProvider = props => {
  const editor = useSlate();

  const {
    children,
    value,
    state,
    setValue,
    setState,
    pluginsDict,
  } = props;
  const {
    events,
    callbacks,
    toolbar,
    hotkeys,
    decorators,
    extendCore,
    htmlDeserializerOptionsList,
  } = pluginsDict;

  // extend functions and formats
  const formatsRaw = getFormats(editor, { state });
  const functionsRaw = getFunctions(editor, { setState, setValue, htmlDeserializerOptionsList });
  const { formats, functions } = extendCore({ formatsRaw, functionsRaw });

  // decorators
  const {
    decorate,
    decorStats,
    decorTriggers,
    decorComponents,
  } = useDecorators(decorators, value);

  // api's packed together in a single object.
  // destructure before passing on
  const apiArgs = { formats, functions, decors: decorStats };

  // element / leaf renderers
  const useRendererArgs = { decorTriggers, decorComponents };
  const { renderLeaf, renderElement } = useRenderers(useRendererArgs);

  // hotkeys
  const handleHotkeys = useHotkeys(hotkeys);

  // events
  const { execEvent, execCallback } = useEvents(events, callbacks, apiArgs);
  useEffect(() => { execCallback('onValueChange') }, [value])

  return (
    <FormatsApiContext.Provider value={formats}>
      <FunctionsApiContext.Provider value={functions}>
        <DecoratorContext.Provider value={decorStats}>
          <MMSEditorConsumer
            toolbar={toolbar}
            decorate={decorate}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            handleHotkeys={handleHotkeys}
            execEvent={execEvent}
            execCallback={execCallback}
            apiArgs={apiArgs}
          >
            {children}
          </MMSEditorConsumer>
        </DecoratorContext.Provider>
      </FunctionsApiContext.Provider>
    </FormatsApiContext.Provider>
  )
};

MMSEditorProvider.propTypes = {
  pluginsDict: PropTypes.object,
  children: PropTypes.func,
  value: PropTypes.array,
  state: PropTypes.object,
  setValue: PropTypes.func,
  setState: PropTypes.func,
};

export default MMSEditorProvider;
