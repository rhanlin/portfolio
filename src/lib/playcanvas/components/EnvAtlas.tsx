import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Asset, Texture } from 'playcanvas';
import { useEnvAtlas } from '../hooks/use-asset';
import { useApp } from '../context/use-app';

type EnvAtlasProps = {
  src: string;
  intensity?: number;
  showSkybox?: boolean;
  exposure?: number;
  skyboxMip?: number;
};

export const EnvAtlas = component$<EnvAtlasProps>(
  ({ src, intensity = 1, exposure = 1, skyboxMip = 1, showSkybox = true }) => {
    const app = useApp();

    const { data } = useEnvAtlas(src, { app: app.value });
    const asset = data.value as Asset;

    useVisibleTask$(({ track }) => {
      track(() => [app.count, asset?.resource]);
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
      track(() => [app.count, showSkybox, intensity, exposure, skyboxMip]);
      if (!app.value) return;

      const layer = app.value.scene.layers.getLayerByName('Skybox');
      if (layer) layer.enabled = showSkybox;
      app.value.scene.skyboxIntensity = intensity;
      app.value.scene.exposure = exposure;
      app.value.scene.skyboxMip = skyboxMip;
    });

    return null;
  },
);
