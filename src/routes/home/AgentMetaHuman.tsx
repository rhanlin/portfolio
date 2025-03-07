import * as pc from 'playcanvas';
import {
  component$,
  NoSerialize,
  noSerialize,
  PropFunction,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import { Render, UpdateMaterial } from '~/lib/playcanvas/components';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { useAsset } from '~/lib/playcanvas/hooks/use-asset';
import { EntityProps } from '~/lib/playcanvas/Entity';

type AgentMetaHumanProps = EntityProps & {
  onModelReady$?: PropFunction<(entity: pc.Entity) => void>;
};
const AgentMetaHuman = component$<AgentMetaHumanProps>(
  ({ onModelReady$, ...props }) => {
    const app = useApp();
    if (!app.value) return null;

    const entitySig = useSignal<pc.Entity | null>(null);
    const bodymatSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const eyematSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const hairmatSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const outfitBottommatSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const outfitFootwearmatSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const outfitTopmatSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const outfitBodyFacematSig = useSignal<NoSerialize<pc.StandardMaterial>>();
    const outfitTeethmatSig = useSignal<NoSerialize<pc.StandardMaterial>>();

    useVisibleTask$(({ track }) => {
      track(() => entitySig.value);
      if (!entitySig.value) return;

      if (onModelReady$) {
        onModelReady$(entitySig.value);
      }
    });

    const { data: asset, isPending } = useModel('/glb/meta-human/model.glb');

    const textureHairmat = useAsset(
      '/glb//meta-human/texture/Body_hair.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureEyemat = useAsset(
      '/glb//meta-human/texture/Body_eye.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureBodySkinmat = useAsset(
      '/glb//meta-human/texture/Body_skin.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureOutfitBottommat = useAsset(
      '/glb//meta-human/texture/Outfit_bottom.png',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureOutfitFootwearmat = useAsset(
      '/glb//meta-human/texture/Outfit_footwear.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureOutfitTopmat = useAsset(
      '/glb//meta-human/texture/Outfit_top.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureFacemat = useAsset(
      '/glb//meta-human/texture/Body_face.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    const textureTeethmat = useAsset(
      '/glb//meta-human/texture/Body_teeth.jpeg',
      'texture',
      {
        app: app.value,
        type: pc.TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    if (
      textureHairmat.data.value &&
      textureEyemat.data.value &&
      textureBodySkinmat.data.value &&
      textureOutfitBottommat.data.value &&
      textureOutfitFootwearmat.data.value &&
      textureOutfitTopmat.data.value &&
      textureFacemat.data.value &&
      textureTeethmat.data.value
    ) {
      hairmatSig.value = useMaterial({
        name: 'eyemat',
        diffuseMap: noSerialize(textureHairmat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      eyematSig.value = useMaterial({
        name: 'eyemat',
        diffuseMap: noSerialize(textureEyemat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      bodymatSig.value = useMaterial({
        name: 'bodymat',
        diffuseMap: noSerialize(textureBodySkinmat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      outfitBottommatSig.value = useMaterial({
        name: 'outfitBottommat',
        diffuseMap: noSerialize(textureOutfitBottommat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      outfitFootwearmatSig.value = useMaterial({
        name: 'outfitFootwearmat',
        diffuseMap: noSerialize(textureOutfitFootwearmat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      outfitTopmatSig.value = useMaterial({
        name: 'outfitTopmat',
        diffuseMap: noSerialize(textureOutfitTopmat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      outfitBodyFacematSig.value = useMaterial({
        name: 'outfitTopmat',
        diffuseMap: noSerialize(textureFacemat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
      outfitTeethmatSig.value = useMaterial({
        name: 'outfitTopmat',
        diffuseMap: noSerialize(textureTeethmat.data.value.resource),
        diffuse: noSerialize(new pc.Color().fromString('#ffffff')),
        diffuseMapChannel: 'rgb',
      });
    }

    return (
      <Entity {...props}>
        {asset.value && (
          <>
            <Render
              type="asset"
              asset={asset.value}
              onRenderAssetReady$={(entity) => (entitySig.value = entity)}
            >
              {/* <Animation asset={asset.value} activate={true} /> */}
            </Render>
            {hairmatSig.value && (
              <UpdateMaterial
                target="Wolf3D_Hair"
                material={hairmatSig.value}
              />
            )}
            {eyematSig.value && (
              <>
                <UpdateMaterial target="EyeLeft" material={eyematSig.value} />
                <UpdateMaterial target="EyeRight" material={eyematSig.value} />
              </>
            )}
            {bodymatSig.value && (
              <UpdateMaterial
                target="Wolf3D_Body"
                material={bodymatSig.value}
              />
            )}
            {outfitBottommatSig.value && (
              <UpdateMaterial
                target="Wolf3D_Outfit_Bottom"
                material={outfitBottommatSig.value}
              />
            )}
            {outfitFootwearmatSig.value && (
              <UpdateMaterial
                target="Wolf3D_Outfit_Footwear"
                material={outfitFootwearmatSig.value}
              />
            )}
            {outfitTopmatSig.value && (
              <UpdateMaterial
                target="Wolf3D_Outfit_Top"
                material={outfitTopmatSig.value}
              />
            )}
            {outfitBodyFacematSig.value && (
              <UpdateMaterial
                target="Wolf3D_Head"
                material={outfitBodyFacematSig.value}
              />
            )}
            {outfitTeethmatSig.value && (
              <UpdateMaterial
                target="Wolf3D_Teeth"
                material={outfitTeethmatSig.value}
              />
            )}
          </>
        )}
      </Entity>
    );
  },
);

export default AgentMetaHuman;
