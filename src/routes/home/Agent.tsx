import {
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import { Application } from '~/lib/playcanvas';
import AgentCanvas from './AgentCanvas';
import preloadAssets from '~/lib/playcanvas/assets/ultra-boy';
// import preloadAssets from '~/lib/playcanvas/assets/meta-human';

const Agent = component$(() => {
  const isMounted = useSignal(false);
  useVisibleTask$(() => {
    isMounted.value = true;
  });
  if (!isMounted.value) return null;

  return (
    <Application
      id="agent-app"
      usePhysics
      fillMode={FILLMODE_NONE}
      resolutionMode={RESOLUTION_AUTO}
      preloadAssets={noSerialize(preloadAssets)}
    >
      <AgentCanvas />
    </Application>
  );
});

export default Agent;
