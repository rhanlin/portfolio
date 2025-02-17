import {
  component$,
  useSignal,
  useVisibleTask$,
  Slot,
  noSerialize,
  NoSerialize,
} from '@builder.io/qwik';
import { Asset, Entity as PcEntity } from 'playcanvas';
import { useApp } from './context/use-app';
import { Entity } from './Entity';
import { GlbContainerResource } from 'playcanvas/build/playcanvas/src/framework/parsers/glb-container-resource.js';

type ContainerProps = {
  asset: Asset;
  [key: string]: unknown;
};

export const Container = component$<ContainerProps>(({ asset, ...props }) => {
  const entitySig = useSignal<NoSerialize<PcEntity>>(undefined);
  const assetEntitySig = useSignal<NoSerialize<PcEntity>>(undefined);

  const app = useApp();

  useVisibleTask$(({ track }) => {
    track(() => entitySig.value);
    track(() => app.value);
    track(() => asset);

    if (app.value && asset?.resource && entitySig.value) {
      const assetEntity = (
        asset.resource as GlbContainerResource
      ).instantiateRenderEntity({});
      entitySig.value.addChild(assetEntity);
      assetEntitySig.value = noSerialize(assetEntity);
    }

    return () => {
      if (!entitySig.value || !assetEntitySig.value) return;

      // Don't destroy the underlying resource as it may be used by other components
      assetEntitySig.value.destroy();
      entitySig.value.removeChild(assetEntitySig.value);

      entitySig.value = undefined;
      assetEntitySig.value = undefined;
    };
  });

  if (!asset?.resource) return null;

  return (
    <Entity
      onEntityReady$={(entity) => (entitySig.value = noSerialize(entity))}
      {...props}
    >
      <Slot />
    </Entity>
  );
});
