import { Entity as pcEntity, Application } from 'playcanvas';
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import { Camera, EnvAtlas, PostEffects } from '~/lib/playcanvas/components';
import { OrbitControls, ShadowCatcher } from '~/lib/playcanvas/scripts';
import { useApp } from '~/lib/playcanvas/context/use-app';
import AgentMetaHuman from '~/routes/home/AgentMetaHuman';
import AgentUltraBoy from '~/routes/home/AgentUltraBoy';

const Canvas = component$(() => {
  const app = useApp();
  if (!app.value) return null;

  useVisibleTask$(({ track }) => {
    track(() => app.count);

    if (app.value) {
      window._app = Application.getApplication('agent-app');
    }
  });

  const focusEntity = useSignal<pcEntity | null>(null);

  return (
    <Entity>
      <EnvAtlas
        src="/environment-map_1.png"
        intensity={0.4}
        exposure={2}
        skyboxMip={2}
      />
      <Entity name="camera" position={[4, 1.5, 4]}>
        <Camera clearColor="#09050f" fov={45} />
        {focusEntity.value && (
          <>
            <OrbitControls
              inertiaFactor={0.07}
              distanceMin={1.5}
              distanceMax={10}
              pitchAngleMin={1}
              pitchAngleMax={90}
              focusEntity={focusEntity.value}
            />
            <PostEffects />
          </>
        )}
        {/* <Light type="directional" color={noSerialize(new Color(1, 1, 1))} /> */}
      </Entity>
      <AgentMetaHuman
        name="AgentMetaHuman"
        position={[1, 0, 0]}
        scale={[100, 100, 100]}
        onModelReady$={(entity) => (focusEntity.value = entity)}
      />

      <AgentUltraBoy
        name="AgentUltraBoy"
        scale={[0.3, 0.3, 0.3]}
        // onModelReady$={(entity) => (focusEntity.value = entity)}
      />
      <ShadowCatcher width={5} depth={5} />
    </Entity>
  );
});

export default Canvas;
