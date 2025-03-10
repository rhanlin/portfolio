import { Entity as pcEntity, Color, Texture } from 'playcanvas';
import {
  component$,
  noSerialize,
  PropFunction,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import {
  Animation,
  AnimStateGraph,
  Render,
  UpdateMaterial,
} from '~/lib/playcanvas/components';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { EntityProps } from '~/lib/playcanvas/Entity';
import { AnimStateGraphData } from '~/constants/agent';
import { ModelAnimationAssets } from '~/lib/playcanvas/assets/meta-human/animation';
import { PreloadTextures } from '~/lib/playcanvas/assets/meta-human/texture';

type AgentMetaHumanProps = EntityProps & {
  onModelReady$?: PropFunction<(entity: pcEntity) => void>;
};
const AgentMetaHuman = component$<AgentMetaHumanProps>(
  ({ onModelReady$, ...props }) => {
    const app = useApp();
    if (!app.value) return null;

    const entitySig = useSignal<pcEntity | null>(null);

    useVisibleTask$(({ track }) => {
      track(() => entitySig.value);
      if (!entitySig.value) return;

      if (onModelReady$) {
        onModelReady$(entitySig.value);
      }
    });

    const { data: asset, isPending } = useModel('/glb/meta-human/model.glb');

    const hairmatSig = useMaterial({
      name: 'eyemat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyHair.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const eyematSig = useMaterial({
      name: 'eyemat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyEye.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const bodymatSig = useMaterial({
      name: 'bodymat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodySkin.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitBottommatSig = useMaterial({
      name: 'outfitBottommat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureOutfitBottom.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitFootwearmatSig = useMaterial({
      name: 'outfitFootwearmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureOutfitFootwear.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitTopmatSig = useMaterial({
      name: 'outfitTopmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureOutfitTop.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitBodyFacematSig = useMaterial({
      name: 'outfitTopmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyFace.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitTeethmatSig = useMaterial({
      name: 'outfitTopmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyTeeth.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    return (
      <Entity {...props}>
        {asset.value && (
          <>
            <Render
              type="asset"
              asset={asset.value}
              onRenderAssetReady$={(entity) => (entitySig.value = entity)}
            >
              <>
                <AnimStateGraph data={AnimStateGraphData} />
                {ModelAnimationAssets.map((animationAsset) => (
                  <Animation
                    key={animationAsset.stateName}
                    stateName={animationAsset.stateName}
                    asset={noSerialize(animationAsset.asset)}
                  />
                ))}
              </>
            </Render>

            <UpdateMaterial target="Wolf3D_Hair" material={hairmatSig} />
            <UpdateMaterial target="EyeLeft" material={eyematSig} />
            <UpdateMaterial target="EyeRight" material={eyematSig} />
            <UpdateMaterial target="Wolf3D_Body" material={bodymatSig} />
            <UpdateMaterial
              target="Wolf3D_Outfit_Bottom"
              material={outfitBottommatSig}
            />
            <UpdateMaterial
              target="Wolf3D_Outfit_Footwear"
              material={outfitFootwearmatSig}
            />
            <UpdateMaterial
              target="Wolf3D_Outfit_Top"
              material={outfitTopmatSig}
            />
            <UpdateMaterial
              target="Wolf3D_Head"
              material={outfitBodyFacematSig}
            />
            <UpdateMaterial
              target="Wolf3D_Teeth"
              material={outfitTeethmatSig}
            />
          </>
        )}
      </Entity>
    );
  },
);

export default AgentMetaHuman;
