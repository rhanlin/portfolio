import { useAsset } from './use-asset';

export const useModel = (src: string, props = {}) =>
  useAsset(src, 'container', props);
