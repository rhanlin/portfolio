import { component$, NoSerialize, useVisibleTask$ } from '@builder.io/qwik';
import { Asset, Texture } from 'playcanvas';
import { useApp } from '../context/use-app';

type EnvAtlasProps = {
  asset: NoSerialize<Asset> | null;
  intensity?: number;
  showSkybox?: boolean;
};

export const EnvAtlas = component$<EnvAtlasProps>(
  ({ asset, intensity = 1, showSkybox = true }) => {
    const app = useApp();

    useVisibleTask$(({ track }) => {
      track(() => app.value);
      track(() => asset?.resource);

      if (!app.value || !asset?.resource) return;

      app.value.scene.envAtlas = asset.resource as Texture;

      return () => {
        if (app.value && app.value.scene) {
          app.value.scene.envAtlas = null;
        }
      };
    });

    useVisibleTask$(({ track }) => {
      track(() => app.value);
      track(() => showSkybox);
      track(() => intensity);

      const layer = app.value?.scene?.layers?.getLayerByName('Skybox');
      if (layer) layer.enabled = showSkybox;
      if (app.value && app.value.scene)
        app.value.scene.skyboxIntensity = intensity;
    });

    return null;
  },
);
