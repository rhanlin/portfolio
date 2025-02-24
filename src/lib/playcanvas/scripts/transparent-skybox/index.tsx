import {
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Script } from '../../components/Script';
import { TransparentSkybox as TransparentSkyboxScript } from './transparent-skybox';
import { useParent } from '../../context/use-parent';

export const TransparentSkybox = component$(() => {
  const parent = useParent();
  const hasCamera = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => parent.value);
    track(() => parent.count);

    if (parent.value?.camera) {
      hasCamera.value = true;
    }
  });
  if (!hasCamera.value) return null;

  return <Script script={noSerialize(TransparentSkyboxScript)} />;
});
