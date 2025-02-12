import { component$ } from '@builder.io/qwik';
import { ComponentProps, useComponent } from '../hooks/use-component';
import { useColors } from '../hooks/use-color';

type LightProps = ComponentProps & {
  type: 'directional' | 'omni' | 'spot';
};

export const Light = component$<LightProps>((props) => {
  const colorProps = useColors(props, ['color']);

  useComponent('light', { ...props, ...colorProps });
  return null;
});
