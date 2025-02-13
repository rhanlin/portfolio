import { Application } from 'playcanvas';
import { NoSerialize, useContext } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

export type AppContextType = {
  value: NoSerialize<Application>;
  appSig: NoSerialize<Application>;
};

export const AppContext = createContextId<AppContextType>('app-context');
export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('`useApp` must be used within a AppContextProvider');
  }
  return context;
};
