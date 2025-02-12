import { component$, NoSerialize } from '@builder.io/qwik';
import { Color } from 'playcanvas';
import { ComponentProps, useComponent } from '../hooks/use-component';
import { useColors } from '../hooks/use-color';

type CameraProps = ComponentProps & {
  clearColor?: NoSerialize<Color> | string;
};

export const Camera = component$<CameraProps>((props) => {
  const colorProps = useColors(props, ['clearColor']);
  if (!props.clearColor || !colorProps?.clearColor) return;

  useComponent('camera', { ...props, ...colorProps });

  return null;
});
