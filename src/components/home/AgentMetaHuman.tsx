import { type Entity as pcEntity, Color, type Texture } from 'playcanvas';
import {
  component$,
  noSerialize,
  type PropFunction,
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
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { type EntityProps } from '~/lib/playcanvas/Entity';
import { AnimStateGraphData } from '~/constants/agent';
import { ModelAnimationAssets } from '~/lib/playcanvas/assets/meta-human/animation';
import { PreloadTextures } from '~/lib/playcanvas/assets/meta-human/texture';

type AgentMetaHumanProps = EntityProps & {
  onModelReady$?: PropFunction<(entity: pcEntity) => void>;
};
const AgentMetaHuman = component$<AgentMetaHumanProps>(
  ({ onModelReady$, ...props }) => {
    const entitySig = useSignal<pcEntity | null>(null);

    useVisibleTask$(({ track }) => {
      track(() => entitySig.value);
      if (!entitySig.value) return;

      if (onModelReady$) {
        onModelReady$(entitySig.value);
      }
    });

    const { data: asset } = useModel('/glb/meta-human/model.glb');

    const hairMat = useMaterial({
      name: 'eyemat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyHair.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const eyeMat = useMaterial({
      name: 'eyemat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyEye.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const bodyMat = useMaterial({
      name: 'bodymat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodySkin.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitBottomMat = useMaterial({
      name: 'outfitBottommat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureOutfitBottom.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitFootwearMat = useMaterial({
      name: 'outfitFootwearmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureOutfitFootwear.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitTopMat = useMaterial({
      name: 'outfitTopmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureOutfitTop.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitBodyFaceMat = useMaterial({
      name: 'outfitTopmat',
      diffuseMap: noSerialize(
        PreloadTextures.TextureBodyFace.resource as Texture,
      ),
      diffuse: noSerialize(new Color().fromString('#ffffff')),
      diffuseMapChannel: 'rgb',
    });
    const outfitTeethMat = useMaterial({
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
                    key={animationAsset.asset.name}
                    stateName={animationAsset.stateName}
                    asset={noSerialize(animationAsset.asset)}
                  />
                ))}
              </>
            </Render>

            {hairMat && (
              <UpdateMaterial target="Wolf3D_Hair" material={hairMat} />
            )}
            {eyeMat && <UpdateMaterial target="EyeLeft" material={eyeMat} />}
            {eyeMat && <UpdateMaterial target="EyeRight" material={eyeMat} />}
            {bodyMat && (
              <UpdateMaterial target="Wolf3D_Body" material={bodyMat} />
            )}
            {outfitBottomMat && (
              <UpdateMaterial
                target="Wolf3D_Outfit_Bottom"
                material={outfitBottomMat}
              />
            )}
            {outfitFootwearMat && (
              <UpdateMaterial
                target="Wolf3D_Outfit_Footwear"
                material={outfitFootwearMat}
              />
            )}
            {outfitTopMat && (
              <UpdateMaterial
                target="Wolf3D_Outfit_Top"
                material={outfitTopMat}
              />
            )}
            {outfitBodyFaceMat && (
              <UpdateMaterial
                target="Wolf3D_Head"
                material={outfitBodyFaceMat}
              />
            )}
            {outfitTeethMat && (
              <UpdateMaterial target="Wolf3D_Teeth" material={outfitTeethMat} />
            )}
          </>
        )}
      </Entity>
    );
  },
);

export default AgentMetaHuman;
