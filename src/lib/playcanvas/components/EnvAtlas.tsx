import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Asset, Texture } from 'playcanvas';
import { useEnvAtlas } from '../hooks/use-asset';
import { useApp } from '../context/use-app';

type EnvAtlasProps = {
  src: string;
  intensity?: number;
  showSkybox?: boolean;
};

export const EnvAtlas = component$<EnvAtlasProps>(
  ({ src, intensity = 1, showSkybox = true }) => {
    const app = useApp().value;

    const { data } = useEnvAtlas(src, { app });
    const asset = data.value as Asset;

    useVisibleTask$(({ track }) => {
      track(() => [app, asset?.resource]);
      if (!app) return;
      if (!asset?.resource) return;

      app.scene.envAtlas = asset.resource as Texture;

      return () => {
        if (app && app.scene) {
          app.scene.envAtlas = null;
        }
      };
    });

    useVisibleTask$(({ track }) => {
      track(() => [app, showSkybox, intensity]);
      if (!app) return;

      const layer = app.scene.layers.getLayerByName('Skybox');
      if (layer) layer.enabled = showSkybox;
      app.scene.skyboxIntensity = intensity;
    });

    return null;
  },
);
