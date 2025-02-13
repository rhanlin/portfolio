import { Entity as pcEntity } from 'playcanvas';
import { NoSerialize, useContext } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

export type ParentContextType = {
  value: NoSerialize<pcEntity>;
};

export const ParentContext =
  createContextId<ParentContextType>('parent-context');

export const useParent = () => {
  useContext(ParentContext);
  const context = useContext(ParentContext);
  if (context === undefined) {
    throw new Error(
      '`useParent` must be used within an App or Entity via a ParentContextProvider',
    );
  }
  return context;
};
