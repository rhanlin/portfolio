import { Application } from 'playcanvas';
import {
  NoSerialize,
  useContext,
  useContextProvider,
  useStore,
  createContextId,
} from '@builder.io/qwik';

export type AppContextType = {
  value: NoSerialize<Application>;
  count: number;
};

const AppContext = createContextId<AppContextType>('app-context');

export const useAppProvider = ({ value, count }: AppContextType) => {
  useContextProvider(
    AppContext,
    useStore<AppContextType>({
      value,
      count,
    }),
  );
};

export const useApp = () => useContext(AppContext);

export const generateAppId = () => {
  return `app-${Math.random().toString(36).substring(7)}`;
};
