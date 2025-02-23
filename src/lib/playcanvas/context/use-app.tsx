import { Application } from 'playcanvas';
import {
  component$,
  NoSerialize,
  QRL,
  Slot,
  useContext,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

export const generateAppId = () => {
  return `app-${Math.random().toString(36).substring(7)}`;
};

export type AppContextType = {
  value: NoSerialize<Application>;
  count: number;
};
export type UseApp = QRL<() => AppContextType>;

export const createAppProvider = (scopeId: string) => {
  const AppContext = createContextId<AppContextType>(scopeId);

  const AppProvider = component$<AppContextType>(({ value, count }) => {
    useContextProvider(
      AppContext,
      useStore<AppContextType>({
        value,
        count,
      }),
    );
    return <Slot />;
  });

  const useApp = () => useContext(AppContext);

  return { AppProvider, useApp };
};

export type AppScopeContextType = {
  value: string;
};

export const createAppScopeProvider = () => {
  const AppScopeContext =
    createContextId<AppScopeContextType>('app-scope-context');

  const AppScopeProvider = component$<AppScopeContextType>(({ value }) => {
    useContextProvider(
      AppScopeContext,
      useStore<AppScopeContextType>({
        value,
      }),
    );
    return <Slot />;
  });

  const useAppScope = () => useContext(AppScopeContext);
  return { AppScopeProvider, useAppScope };
};
