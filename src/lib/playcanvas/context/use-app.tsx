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
  id: string;
};

const AppContext = createContextId<AppContextType>('app-context');

export const useAppProvider = ({ value, id }: AppContextType) => {
  useContextProvider(
    AppContext,
    useStore<AppContextType>({
      value,
      id,
    }),
  );
};

export const useApp = () => useContext(AppContext);

export const generateAppId = () => {
  return `app-${Math.random().toString(36).substring(7)}`;
};
