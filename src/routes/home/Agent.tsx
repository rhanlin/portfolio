import { component$ } from '@builder.io/qwik';
import { FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import { Application } from '~/lib/playcanvas';
import AgentCanvas from './AgentCanvas';

const Agent = component$(() => {
  return (
    <Application
      usePhysics
      fillMode={FILLMODE_NONE}
      resolutionMode={RESOLUTION_AUTO}
    >
      <AgentCanvas />
    </Application>
  );
});

export default Agent;
