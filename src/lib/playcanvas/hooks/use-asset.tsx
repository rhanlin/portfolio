import { TEXTURETYPE_RGBP } from 'playcanvas';
import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { fetchAsset } from '../utils/fetch-asset';
import { useApp } from '../context/use-app';

export const useAsset = (src: string, type: string, props?: any) => {
  const app = useApp().value;

  const data = useSignal<any | null>(null);
  const isPending = useSignal<boolean>(true);

  useVisibleTask$(async ({ track }) => {
    track(() => [app, src, type, props]);

    if (!app || !src) return;

    isPending.value = true;

    try {
      data.value = await fetchAsset(app, src, type, props);
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
