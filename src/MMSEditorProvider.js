import React from 'react';
import PropTypes from 'prop-types';
import { useSlate } from 'slate-react';

import { FormatsApiContext } from '@editor/hooks/useFormats';
import { FunctionsApiContext } from '@editor/hooks/useFunctions';
import MMSEditorConsumer from '@/MMSEditorConsumer';

import getFormats from '@editor/formats';
import getFunctions from '@editor/functions';

const MMSEditorProvider = props => {
  const editor = useSlate();

  const { children, setValue, pluginsDict } = props;
  const { extendCore, htmlDeserializerOptionsList } = pluginsDict;

  // extend functions and formats
  const { formats, functions } = extendCore({
    formats: getFormats(editor, {}),
    functions: getFunctions(editor, { setValue, htmlDeserializerOptionsList }),
  });

  return (
    <FormatsApiContext.Provider value={formats}>
      <FunctionsApiContext.Provider value={functions}>
        <MMSEditorConsumer {...pluginsDict} formats={formats} functions={functions}>
          {children}
        </MMSEditorConsumer>
      </FunctionsApiContext.Provider>
    </FormatsApiContext.Provider>
  )
};

MMSEditorProvider.propTypes = {
  pluginsDict: PropTypes.object,
  children: PropTypes.func,
  setValue: PropTypes.func,
};

export default MMSEditorProvider;
