import {
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Script } from '../../components/Script';
import { UpdateMaterial as UpdateMaterialScript } from './update-material';
import { useParent } from '../../context/use-parent';

export const UpdateMaterial = component$<Record<string, unknown>>((props) => {
  const parent = useParent();
  const hasParent = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => parent.value);
    track(() => parent.count);

    if (parent.value) {
      const renders = parent.value.findComponents('render');

      if (!renders.length) return;

      hasParent.value = true;
    }
  });
  if (!hasParent.value) return null;

  return <Script script={noSerialize(UpdateMaterialScript)} {...props} />;
});
