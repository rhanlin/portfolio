import { TEXTURETYPE_RGBP } from 'playcanvas';
import { useSignal, useTask$ } from '@builder.io/qwik';
import { useApp } from '../context/use-app';
import { fetchAsset } from '../utils/fetch-asset';

export const useAsset = (src: string, type: string, props?: any) => {
  const app = useApp();
  const data = useSignal<any | null>(null);
  const isPending = useSignal<boolean>(true);

  useTask$(async ({ track }) => {
    track(() => [app.value, src, type, props]);
    if (!app.value || !src) return;

    isPending.value = true;
    try {
      data.value = await fetchAsset(app.value, src, type, props);
    } finally {
      isPending.value = false;
    }
  });

  return { data, isPending };
};

/**
 * Loads a texture asset as an environment atlas
 */
export const useEnvAtlas = (src: string, props = {}) =>
  useAsset(src, 'texture', {
    ...props,
    type: TEXTURETYPE_RGBP,
    mipmaps: false,
  });
