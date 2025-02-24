import {
  NoSerialize,
  useContext,
  useContextProvider,
  useStore,
  createContextId,
} from '@builder.io/qwik';

export type PointerEventsContextType = {
  value: NoSerialize<Set<string>>;
};

export const PointerEventsContext = createContextId<PointerEventsContextType>(
  'pointer-events-context',
);

export const usePointerEventsProvider = ({
  value,
}: PointerEventsContextType) => {
  useContextProvider(
    PointerEventsContext,
    useStore<PointerEventsContextType>({
      value,
    }),
  );
};

export const usePointerEvents = () => {
  const context = useContext(PointerEventsContext);
  if (context === undefined) {
    throw new Error(
      'usePointerEvents must be used within a PointerEventsContextProvider',
    );
  }
  return context;
};
