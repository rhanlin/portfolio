import {
  component$,
  NoSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { RenderComponent, StandardMaterial } from 'playcanvas';
import { useParent } from '../context/use-parent';
import { useApp } from '../context/use-app';

type UpdateMaterialProps = {
  target: string;
  material: NoSerialize<StandardMaterial>;
} & Record<string, unknown>;

export const UpdateMaterial = component$<UpdateMaterialProps>((props) => {
  const parent = useParent();

  useVisibleTask$(({ track }) => {
    track(() => parent.count);
    if (!parent.value) return;

    const entity = parent.value;
    const foundTarget = entity?.findByName(props.target);
    if (entity && foundTarget) {
      const renders = entity.findComponents('render') as RenderComponent[];

      if (!renders.length) return;

      renders.forEach((render) => {
        if (render.entity.name === props.target) {
          render.meshInstances.forEach((meshInstance) => {
            meshInstance.material = props.material as StandardMaterial;
            meshInstance.material.update();
          });
        }
      });
    }
  });
  return null;
});
