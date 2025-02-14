import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Asset, Texture } from 'playcanvas';
import { useApp } from '../context/use-app';
import { useEnvAtlas } from '../hooks/use-asset';

type EnvAtlasProps = {
  src: string;
  intensity?: number;
  showSkybox?: boolean;
};

export const EnvAtlas = component$<EnvAtlasProps>(
  ({ src, intensity = 1, showSkybox = true }) => {
    const app = useApp();
    const { data } = useEnvAtlas(src);
    const asset = data.value as Asset;
    useVisibleTask$(({ track }) => {
      track(() => [app.value, asset?.resource]);

      if (!app.value) return;
      if (!asset?.resource) return;

      app.value.scene.envAtlas = asset.resource as Texture;

      return () => {
        if (app.value && app.value.scene) {
          app.value.scene.envAtlas = null;
        }
      };
    });

    useVisibleTask$(({ track }) => {
      track(() => [app.value, showSkybox, intensity]);

      if (!app.value) return;

      const layer = app.value.scene.layers.getLayerByName('Skybox');
      if (layer) layer.enabled = showSkybox;
      app.value.scene.skyboxIntensity = intensity;
    });

    return null;
  },
);
