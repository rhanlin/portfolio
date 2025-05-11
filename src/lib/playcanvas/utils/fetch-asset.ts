import { noSerialize, NoSerialize } from '@builder.io/qwik';
import { Application, Asset } from 'playcanvas';

export type AssetType =
  | 'animation'
  | 'audio'
  | 'binary'
  | 'container'
  | 'cubemap'
  | 'css'
  | 'font'
  | 'gsplat'
  | 'json'
  | 'html'
  | 'material'
  | 'model'
  | 'render'
  | 'script'
  | 'shader'
  | 'sprite'
  | 'template'
  | 'text'
  | 'texture'
  | 'textureatlas';

export const fetchAsset = (
  app: Application,
  url: string,
  type: AssetType,
  props = {},
): Promise<NoSerialize<Asset> | null> => {
  return new Promise((resolve, reject) => {
    let asset: Asset | null = app.assets.find(url);
    if (!asset) {
      asset = new Asset(url, type, { url }, props);
      app.assets.add(asset);
    }

    if (asset.resource) {
      resolve(noSerialize(asset));
    } else {
      asset.once('load', () => {
        if (asset) {
          resolve(noSerialize(asset));
        } else {
          reject(new Error('Asset not found'));
        }
      });
      asset.once('error', (err: string) => reject(err));

      // Start loading if not already loading
      if (!asset.loading) {
        app.assets.load(asset);
      }
    }
  });
};
