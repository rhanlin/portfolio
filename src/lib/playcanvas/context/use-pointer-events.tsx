import { component$, NoSerialize, Slot, useContext } from '@builder.io/qwik';
import { useContextProvider, createContextId } from '@builder.io/qwik';

export type PointerEventsContextType = {
  value: NoSerialize<Set<string>>;
};

export const PointerEventsContext = createContextId<PointerEventsContextType>(
  'pointer-events-context',
);

export const usePointerEvents = () => {
  const context = useContext(PointerEventsContext);
  if (context === undefined) {
    throw new Error(
      'usePointerEvents must be used within a PointerEventsContextProvider',
    );
  }
  return context;
};

export const PointerEventsContextProvider = component$<{
  value: PointerEventsContextType;
}>(({ value }) => {
  useContextProvider(PointerEventsContext, value);

  return <Slot />;
});
