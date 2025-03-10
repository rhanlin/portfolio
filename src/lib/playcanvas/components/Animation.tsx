import { component$, NoSerialize, useVisibleTask$ } from '@builder.io/qwik';
import { AnimComponent, AnimTrack, Asset } from 'playcanvas';
import { useParent } from '../context/use-parent';

type AnimationProps = {
  stateName: string;
  asset: NoSerialize<Asset>;
};

export const Animation = component$<AnimationProps>(({ stateName, asset }) => {
  const parent = useParent();

  useVisibleTask$(({ track }) => {
    track(() => [parent.count, asset]);
    const entity = parent.value;

    if (!asset || !entity) return;

    const anim: AnimComponent | undefined = entity.anim;

    if (!anim) {
      console.warn('No anim component found on entity');
      return;
    }

    // Early out if component instantiation fails, or the asset contains no animations
    const assetResurce = (asset.resource as AnimTrack) || undefined;

    if (!assetResurce) {
      console.warn('No animation found in asset');
      return;
    }

    const locomotionLayer = anim.baseLayer;

    if (!locomotionLayer) {
      return;
    }

    locomotionLayer.assignAnimation(stateName, assetResurce);
  });

  return null;
});
