import { Application } from 'playcanvas';
import { component$, NoSerialize, Slot, useContext } from '@builder.io/qwik';
import { useContextProvider, createContextId } from '@builder.io/qwik';

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

export const AppContextProvider = component$<{
  value: AppContextType;
}>(({ value }) => {
  useContextProvider(AppContext, value);

  return <Slot />;
});
