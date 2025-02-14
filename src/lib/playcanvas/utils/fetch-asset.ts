import { noSerialize, NoSerialize } from '@builder.io/qwik';
import { Application, Asset } from 'playcanvas';

export const fetchAsset = (
  app: Application,
  url: string,
  type: string,
  props = {},
): Promise<NoSerialize<Asset> | null> => {
  return new Promise((resolve, reject) => {
    let asset = app.assets.find(url);

    if (!asset) {
      asset = new Asset(url, type, { url }, props);
      app.assets.add(asset);
    }

    if (asset.resource) {
      resolve(noSerialize(asset));
    } else {
      asset.once('load', () => resolve(noSerialize(asset)));
      asset.once('error', (err: string) => reject(err));

      // Start loading if not already loading
      if (!asset.loading) {
        app.assets.load(asset);
      }
    }
  });
};
