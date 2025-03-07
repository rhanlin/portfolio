import { component$, NoSerialize, useVisibleTask$ } from '@builder.io/qwik';
import { AnimComponent, AnimTrack, Asset } from 'playcanvas';
import { ComponentProps, useComponent } from '../hooks/use-component';
import { useParent } from '../context/use-parent';
import { GlbContainerResource } from 'playcanvas/build/playcanvas/src/framework/parsers/glb-container-resource.js';

type AnimationProps = ComponentProps & {
  asset: NoSerialize<Asset>;
};

export const Animation = component$<AnimationProps>(({ asset, ...props }) => {
  useComponent('anim', props);
  const parent = useParent();

  useVisibleTask$(({ track }) => {
    track(() => [parent.count, asset]);
    const entity = parent.value;

    if (!entity) return;

    const anim: AnimComponent | undefined = entity.anim;

    if (asset?.resource) console.log('anim', asset.resource);

    // Early out if component instantiation fails, or the asset contains no animations
    const assetResurce = (asset?.resource as GlbContainerResource) || undefined;
    if (
      !anim ||
      !assetResurce?.animations ||
      assetResurce.animations.length === 0
    )
      return;

    console.log('animations', assetResurce.animations);

    // Filter out non animations, and assign animations to component
    assetResurce.animations
      .filter((animation) => animation.type === 'animation')
      .forEach((animation) => {
        anim.assignAnimation('animation', animation.resource as AnimTrack);
        // anim.baseLayer?.play(animation.name);
      });

    console.log('entity.anim', anim);
  });

  return null;
});
