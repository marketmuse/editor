import { createContext, useContext } from 'react';

// create a context for function api's args
export const FunctionsApiContext = createContext(null);

export default () => {
  const functionsApi = useContext(FunctionsApiContext);

  if (!functionsApi) {
    throw new Error('useFunctions can only be use inside <MMSEditor> components context.')
  }

  return functionsApi;
};
