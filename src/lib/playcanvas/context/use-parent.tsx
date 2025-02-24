import { Entity as pcEntity } from 'playcanvas';
import {
  NoSerialize,
  useContext,
  useContextProvider,
  useStore,
  createContextId,
} from '@builder.io/qwik';

export type ParentContextType = {
  value: NoSerialize<pcEntity>;
  count: number;
};

export const ParentContext =
  createContextId<ParentContextType>('parent-context');

export const useParentProvider = ({ value, count }: ParentContextType) => {
  useContextProvider(
    ParentContext,
    useStore<ParentContextType>({
      value,
      count,
    }),
  );
};

export const useParent = () => {
  const context = useContext(ParentContext);
  if (context === undefined) {
    throw new Error(
      '`useParent` must be used within an App or Entity via a ParentContextProvider',
    );
  }
  return context;
};
