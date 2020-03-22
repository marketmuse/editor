import { createContext, useContext } from 'react';

// create a context for function api's args
export const DecoratorContext = createContext(null);

export default () => useContext(DecoratorContext);
