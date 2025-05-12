import {
  $,
  component$,
  noSerialize,
  useSignal,
  useOnDocument,
} from '@builder.io/qwik';
import { type Asset, FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import { Application } from '~/lib/playcanvas';
import AgentCanvas from './AgentCanvas';
import metaHumanPreloadAssets from '~/lib/playcanvas/assets/meta-human';
import ultraBoyPreloadAssets from '~/lib/playcanvas/assets/ultra-boy';

const mergeAssets = (
  assets1: Record<string, Asset>,
  assets2: Record<string, Asset>,
): Record<string, Asset> => {
  const mergedAssets: Record<string, Asset> = { ...assets1 };

  Object.entries(assets2).forEach(([key, value]) => {
    let newKey = key;
    let counter = 1;
    while (Object.prototype.hasOwnProperty.call(mergedAssets, newKey)) {
      newKey = `${key}_${counter}`;
      counter++;
    }
    mergedAssets[newKey] = value;
  });

  return mergedAssets;
};

const Agent = component$(() => {
  const isMounted = useSignal(false);
  const assetLoaded = useSignal(false);
  useOnDocument(
    'qinit',
    $(() => {
      isMounted.value = true;
    }),
  );
  if (!isMounted.value) return null;

  const preloadAssets = mergeAssets(
    metaHumanPreloadAssets,
    ultraBoyPreloadAssets,
  );

  return (
    <Application
      id="agent-app"
      usePhysics
      fillMode={FILLMODE_NONE}
      resolutionMode={RESOLUTION_AUTO}
      preloadAssets={noSerialize(preloadAssets)}
      preloadAssetsCallback={$(() => {
        assetLoaded.value = true;
      })}
    >
      <AgentCanvas assetLoaded={assetLoaded} />
    </Application>
  );
});

export default Agent;
