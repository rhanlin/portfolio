import { component$ } from '@builder.io/qwik';
import { FILLMODE_NONE, RESOLUTION_AUTO } from 'playcanvas';
import { Application } from '~/lib/playcanvas';
import AgentCanvas from './AgentCanvas';
import {
  generateAppId,
  createAppProvider,
  createAppScopeProvider,
} from '~/lib/playcanvas/context/use-app';

const CanvasComponent = component$(() => {
  const id = generateAppId();
  const { AppProvider } = createAppProvider(id);
  const { AppScopeProvider } = createAppScopeProvider();

  return (
    <AppProvider value={undefined} count={0}>
      <AppScopeProvider value={id}>
        <Application
          scopeId={id}
          usePhysics
          fillMode={FILLMODE_NONE}
          resolutionMode={RESOLUTION_AUTO}
        >
          <AgentCanvas scopeId={id} />
        </Application>
      </AppScopeProvider>
    </AppProvider>
  );
});

const Agent = component$(() => {
  return <CanvasComponent />;
});

export default Agent;
