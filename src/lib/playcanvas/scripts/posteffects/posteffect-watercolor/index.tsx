import {
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Script } from '~/lib/playcanvas/components';
import { useAsset } from '~/lib/playcanvas/hooks/use-asset';
import { Watercolor as WatercolorScript } from './posteffect-watercolor';
import { Asset } from 'playcanvas';
import { useApp } from '~/lib/playcanvas/context/use-app';

export const PosteffectWatercolor = component$(() => {
  const isReady = useSignal(false);
  const app = useApp();
  const { data: fragData } = useAsset('/graphic/watercolor.frag', 'shader');
  const { data: vertData } = useAsset('/graphic/watercolor.vert', 'shader');
  const fragAsset = fragData.value as Asset;
  const vertAsset = vertData.value as Asset;

  useVisibleTask$(({ track }) => {
    track(() => [app.id, fragAsset?.resource, vertAsset?.resource]);
    if (!app.value) return;
    if (!fragAsset?.resource || !vertAsset?.resource) return;

    isReady.value = true;
  });

  if (isReady.value) {
    return (
      <Script
        script={noSerialize(WatercolorScript)}
        vs={vertAsset}
        fs={fragAsset}
      />
    );
  }
});
