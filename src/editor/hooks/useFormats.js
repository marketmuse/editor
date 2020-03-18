import { createContext, useContext } from 'react';

// create a context for function api's args
export const FormatsApiContext = createContext(null);

export default () => {
  const formatsApi = useContext(FormatsApiContext);

  if (!formatsApi) {
    throw new Error('useFormats can only be use inside <MMSEditor> components context.')
  }

  return formatsApi;
};
