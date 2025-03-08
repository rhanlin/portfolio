import {
  Entity as pcEntity,
  Color,
  Vec2,
  StandardMaterial,
  TEXTURETYPE_RGBP,
  BLEND_NONE,
  DITHER_NONE,
} from 'playcanvas';
import {
  component$,
  NoSerialize,
  noSerialize,
  PropFunction,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import {
  Render,
  UpdateMaterial,
  Animation,
  AnimStateGraph,
} from '~/lib/playcanvas/components';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { useAsset } from '~/lib/playcanvas/hooks/use-asset';
import { EntityProps } from '~/lib/playcanvas/Entity';
import { AnimStateGraphData } from '~/constants/agent';

type AgentUltraBoyProps = EntityProps & {
  onModelReady$?: PropFunction<(entity: pcEntity) => void>;
};
const AgentUltraBoy = component$<AgentUltraBoyProps>(
  ({ onModelReady$, ...props }) => {
    const app = useApp();
    if (!app.value) return null;

    const entitySig = useSignal<pcEntity | null>(null);
    const materialSig = useSignal<NoSerialize<StandardMaterial>>();

    useVisibleTask$(({ track }) => {
      track(() => entitySig.value);
      if (!entitySig.value) return;

      if (onModelReady$) {
        onModelReady$(entitySig.value);
      }
    });

    const { data: asset, isPending } = useModel('/glb/ultra-boy/model.glb');
    const animIdle = useAsset(
      '/glb/ultra-boy/animations/Idle.glb',
      'animation',
      { app: app.value },
    );
    const textureAmbient = useAsset(
      '/glb/ultra-boy/texture/Texture_Body_metallicRoughness.png',
      'texture',
      {
        app: app.value,
        type: TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );
    const textureDiffuse = useAsset(
      '/glb/ultra-boy/texture/Texture_Body_baseColor.jpeg',
      'texture',
      {
        app: app.value,
        type: TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );
    const textureEmissive = useAsset(
      '/glb/ultra-boy/texture/Texture_Body_emissive.jpeg',
      'texture',
      {
        app: app.value,
        type: TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );
    const textureNormalMap = useAsset(
      '/glb/ultra-boy/texture/Texture_Body_normal.png',
      'texture',
      {
        app: app.value,
        type: TEXTURETYPE_RGBP,
        mipmaps: true,
      },
    );

    if (
      textureAmbient.data.value &&
      textureDiffuse.data.value &&
      textureEmissive.data.value &&
      textureNormalMap.data.value
    ) {
      materialSig.value = useMaterial({
        aoMap: noSerialize(textureAmbient.data.value.resource),
        aoMapUv: 0,
        aoMapChannel: 'r',
        occludeSpecular: 1.0,
        aoIntensity: 1.0,
        ambient: noSerialize(new Color().fromString('#ffffff')),

        diffuseMap: noSerialize(textureDiffuse.data.value.resource),
        diffuseMapUv: 0,
        diffuseMapChannel: 'rgb',
        diffuseVertexColor: false,
        diffuse: noSerialize(new Color().fromString('#ffffff')),

        useMetalness: true,
        metalnessMap: noSerialize(textureAmbient.data.value.resource),
        metalnessMapUv: 0,
        metalnessMapChannel: 'b',
        metalnessVertexColor: false,
        metalness: 1.0,
        useMetalnessSpecularColor: true,
        specular: noSerialize(new Color().fromString('#ffffff')),
        specularityFactor: 0.258,

        glossMap: noSerialize(textureAmbient.data.value.resource),
        glossMapUv: 0,
        glossMapChannel: 'g',
        glossVertexColor: false,
        gloss: 100, // shininess: 100,
        glossInvert: true,

        emissiveMap: noSerialize(textureEmissive.data.value.resource),
        emissiveMapUv: 0,
        emissiveMapChannel: 'rgb',
        emissiveVertexColor: false,
        emissive: noSerialize(new Color().fromString('#ffffff')),
        emissiveIntensity: 7.46,

        blendType: BLEND_NONE,
        opacityMap: noSerialize(textureDiffuse.data.value.resource),
        opacityMapUv: 0,
        opacityMapChannel: 'a',
        opacityVertexColor: false,
        alphaTest: 0,
        alphaToCoverage: false,
        opacityDither: DITHER_NONE,
        opacityShadowDither: DITHER_NONE,

        normalMap: noSerialize(textureNormalMap.data.value.resource),
        normalMapUv: 0,
        bumpiness: 1.0,

        useSheen: false,
        cull: 1,
        useLighting: true,
        twoSidedLighting: false,
        depthWrite: true,
        clearCoatGlossInvert: false,
        sheenGlossInvert: false,
        useDynamicRefraction: false,
        specularTint: false,
        useIridescence: false,
        shininess: 100,
        opacity: 1,
        bumpMapFactor: 1,
        reflectivity: 1,
        clearCoat: 0,
        clearCoatGloss: 1,
        clearCoatBumpiness: 1,
        refractionIndex: 0.666667,
        refraction: 0,
        sheenGloss: 0,
        thickness: 0,
        attenuationDistance: 0,
        iridescence: 0,
        iridescenceRefractionIndex: 0.666667,
        iridescenceThicknessMin: 0,
        iridescenceThicknessMax: 0,
        ambientTint: true,
        diffuseTint: true,
        emissiveTint: true,
        metalnessTint: true,
        sheenTint: true,
        sheenGlossTint: true,
        attenuation: noSerialize(new Color().fromString('#ffffff')),
        aoMapTiling: noSerialize(new Vec2(1, 1)),
        aoMapOffset: noSerialize(new Vec2()),
        aoMapRotation: 0,
        diffuseMapTiling: noSerialize(new Vec2(1, 1)),
        diffuseMapOffset: noSerialize(new Vec2()),
        diffuseMapRotation: 0,
        specularMapChannel: 'rgb',
        specularMapUv: 0,
        specularMapTiling: noSerialize(new Vec2(1, 1)),
        specularMapOffset: noSerialize(new Vec2()),
        specularMapRotation: 0,
        specularAntialias: true,
        specularityFactorMap: null,
        specularityFactorMapChannel: 'r',
        specularityFactorMapUv: 0,
        specularityFactorMapTiling: noSerialize(new Vec2(1, 1)),
        specularityFactorMapOffset: noSerialize(new Vec2()),
        specularityFactorMapRotation: 0,
        enableGGXSpecular: false,
        anisotropy: 0,
        metalnessMapTiling: noSerialize(new Vec2(1, 1)),
        metalnessMapOffset: noSerialize(new Vec2()),
        metalnessMapRotation: 0,
        conserveEnergy: true,
        glossMapTiling: noSerialize(new Vec2(1, 1)),
        glossMapOffset: noSerialize(new Vec2()),
        glossMapRotation: 0,
        clearCoatMapChannel: 'r',
        clearCoatMapUv: 0,
        clearCoatMapTiling: noSerialize(new Vec2(1, 1)),
        clearCoatMapOffset: noSerialize(new Vec2()),
        clearCoatMapRotation: 0,
        clearCoatVertexColor: false,
        clearCoatVertexColorChannel: 'r',
        clearCoatGlossMapChannel: 'r',
        clearCoatGlossMapUv: 0,
        clearCoatGlossMapTiling: noSerialize(new Vec2(1, 1)),
        clearCoatGlossMapOffset: noSerialize(new Vec2()),
        clearCoatGlossMapRotation: 0,
        clearCoatGlossVertexColor: false,
        clearCoatGlossVertexColorChannel: 'r',
        clearCoatNormalMapUv: 0,
        clearCoatNormalMapTiling: noSerialize(new Vec2(1, 1)),
        clearCoatNormalMapOffset: noSerialize(new Vec2()),
        clearCoatNormalMapRotation: 0,
        sheenMap: null,
        sheenMapChannel: 'rgb',
        sheenMapUv: 0,
        sheenMapTiling: noSerialize(new Vec2(1, 1)),
        sheenMapOffset: noSerialize(new Vec2()),
        sheenMapRotation: 0,
        sheenGlossMap: null,
        sheenGlossMapChannel: 'r',
        sheenGlossMapUv: 0,
        sheenGlossMapTiling: noSerialize(new Vec2(1, 1)),
        sheenGlossMapOffset: noSerialize(new Vec2()),
        sheenGlossMapRotation: 0,
        emissiveMapTiling: noSerialize(new Vec2(1, 1)),
        emissiveMapOffset: noSerialize(new Vec2()),
        emissiveMapRotation: 0,
        normalMapTiling: noSerialize(new Vec2(1, 1)),
        normalMapOffset: noSerialize(new Vec2()),
        normalMapRotation: 0,
        refractionMap: null,
        refractionMapChannel: 'r',
        refractionMapUv: 0,
        refractionMapTiling: noSerialize(new Vec2(1, 1)),
        refractionMapOffset: noSerialize(new Vec2()),
        refractionMapRotation: 0,
        refractionVertexColor: false,
        refractionVertexColorChannel: 'r',
        dispersion: 0,
        thicknessMap: null,
        thicknessMapChannel: 'r',
        thicknessMapUv: 0,
        thicknessMapTiling: noSerialize(new Vec2(1, 1)),
        thicknessMapOffset: noSerialize(new Vec2()),
        thicknessMapRotation: 0,
        thicknessVertexColor: false,
        thicknessVertexColorChannel: 'r',
        iridescenceMap: null,
        iridescenceMapChannel: 'r',
        iridescenceMapUv: 0,
        iridescenceMapTiling: noSerialize(new Vec2(1, 1)),
        iridescenceMapOffset: noSerialize(new Vec2()),
        iridescenceMapRotation: 0,
        iridescenceThicknessMap: null,
        iridescenceThicknessMapChannel: 'r',
        iridescenceThicknessMapUv: 0,
        iridescenceThicknessMapTiling: noSerialize(new Vec2(1, 1)),
        iridescenceThicknessMapOffset: noSerialize(new Vec2()),
        iridescenceThicknessMapRotation: 0,
        heightMapChannel: 'r',
        heightMapUv: 0,
        heightMapTiling: noSerialize(new Vec2(1, 1)),
        heightMapOffset: noSerialize(new Vec2()),
        heightMapRotation: 0,
        heightMapFactor: 1,
        alphaFade: true,
        opacityMapTiling: noSerialize(new Vec2(1, 1)),
        opacityMapOffset: noSerialize(new Vec2()),
        opacityMapRotation: 0,
        opacityFadesSpecular: true,
        cubeMapProjection: 0,
        lightMapChannel: 'rgb',
        lightMapUv: 0,
        lightMapTiling: noSerialize(new Vec2(1, 1)),
        lightMapOffset: noSerialize(new Vec2()),
        lightMapRotation: 0,
        depthTest: true,
        useFog: true,
        useSkybox: true,
        useTonemap: true,
        useGammaTonemap: true,
        mapping_format: 'path',
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
              {animIdle.data.value && (
                <>
                  <AnimStateGraph data={AnimStateGraphData} />
                  <Animation stateName="Idle" asset={animIdle.data.value} />
                </>
              )}
            </Render>
            {materialSig.value && (
              <UpdateMaterial target="Ciber Boy" material={materialSig.value} />
            )}
          </>
        )}
      </Entity>
    );
  },
);

export default AgentUltraBoy;
