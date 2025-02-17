import { Component } from 'playcanvas';
import {
  noSerialize,
  NoSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useParent } from '../context/use-parent';
import { useApp } from '../context/use-app';

export type ComponentProps = {
  [key: string]: unknown;
};

export const useComponent = (ctype: string, props: ComponentProps) => {
  const componentSig = useSignal<NoSerialize<Component>>(undefined);
  const parent = useParent();
  const app = useApp();

  useVisibleTask$(({ track }) => {
    track(() => ctype);
    track(() => parent.value);

    if (parent.value && props) {
      if (!componentSig.value) {
        const clonedOpts = { ...props };

        const component =
          parent.value?.addComponent(ctype, clonedOpts) || undefined;

        parent.count++;
        componentSig.value = noSerialize(component);
      }
      // Only add the component if it hasn't been added yet
      // Do not throw an error if the component already exists
    }

    return () => {
      const comp = componentSig.value;
      componentSig.value = undefined;

      if (!app.value || !app.value.root) return;

      if (comp) {
        type SystemKeys = keyof typeof app.value.systems;
        if (app.value.systems[ctype as SystemKeys] && parent.value)
          parent.value.removeComponent(ctype);
      }
    };
  });

  useVisibleTask$(({ track }) => {
    track(() => props);
    track(() => componentSig.value);

    if (!props) return;

    const comp = componentSig.value;
    // Ensure componentSig.current exists before updating props
    if (!comp) return;

    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key in comp),
    );
    Object.entries(filteredProps).forEach(([key, value]) => {
      const compKey = key as keyof Component;
      (comp as any)[compKey] = value;
    });
  });
};
