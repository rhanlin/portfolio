import {
  component$,
  useSignal,
  useVisibleTask$,
  Slot,
  noSerialize,
  NoSerialize,
} from '@builder.io/qwik';
import { Asset, Entity as PcEntity } from 'playcanvas';
import { Entity } from './Entity';
import { GlbContainerResource } from 'playcanvas/build/playcanvas/src/framework/parsers/glb-container-resource.js';
import { useParent } from './context/use-parent';

type ContainerProps = {
  asset: Asset;
  [key: string]: unknown;
};

export const Container = component$<ContainerProps>(({ asset, ...props }) => {
  const entitySig = useSignal<NoSerialize<PcEntity>>(undefined);
  const assetEntitySig = useSignal<NoSerialize<PcEntity>>(undefined);
  const parent = useParent();

  useVisibleTask$(({ track }) => {
    track(() => [asset, entitySig.value]);

    if (asset?.resource && entitySig.value) {
      const assetEntity = (
        asset.resource as GlbContainerResource
      ).instantiateRenderEntity({});
      entitySig.value.addChild(assetEntity);
      assetEntitySig.value = noSerialize(assetEntity);
      console.log('xx spl assetEntity', assetEntity);
      parent.count += 1;
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
