import { Asset } from 'playcanvas';
import { PreloadAnimations } from './animation';
import { PreloadTextures } from './texture';

export default {
  ...PreloadAnimations,
  ...PreloadTextures,
} as Record<string, Asset>;
