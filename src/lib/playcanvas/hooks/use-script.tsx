import { Script, ScriptComponent } from 'playcanvas';
import { useParent } from '../context/use-parent';
import {
  noSerialize,
  NoSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';

const toLowerCamelCase = (str: string): string =>
  str[0].toLowerCase() + str.substring(1);

interface Props {
  [key: string]: unknown;
}

export const useScript = (
  scriptConstructor: new (...args: unknown[]) => NoSerialize<Script>,
  props: Props,
): void => {
  const parent = useParent();

  const scriptName: string = toLowerCamelCase(scriptConstructor.name);
  const scriptRef = useSignal<NoSerialize<Script>>(undefined);
  const scriptComponentRef = useSignal<NoSerialize<ScriptComponent>>(undefined);

  // Create the script synchronously
  useVisibleTask$(({ track }) => {
    track(() => [parent.value, scriptConstructor]);
    if (!parent.value) return;

    // Ensure the parent entity has a script component
    if (!parent.value?.script) {
      parent.value.addComponent('script');
      parent.count++;
    }

    // Check if we've already created the script
    if (!scriptRef.value) {
      // Create the script instance with the provided attributes
      const scriptComponent: ScriptComponent = parent.value
        .script as ScriptComponent;

      const scriptInstance = scriptComponent.create(
        scriptConstructor as unknown as typeof Script,
        {
          properties: { ...props },
          preloading: false,
        },
      );

      scriptRef.value = noSerialize(scriptInstance || undefined);
      scriptComponentRef.value = noSerialize(scriptComponent || undefined);
    }

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      const scriptComponent = scriptComponentRef.value;
      const script = scriptRef.value;
      scriptRef.value = undefined;
      scriptComponentRef.value = undefined;

      if (script && scriptComponent) {
        scriptComponent.destroy(scriptName);
      }
    };
  });

  // Update script props when they change
  useVisibleTask$(({ track }) => {
    track(() => props);

    const script = scriptRef.value;
    // Ensure componentRef.current exists before updating props
    if (!script) return;

    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key in script),
    );

    Object.assign(script, filteredProps);
  });
};
