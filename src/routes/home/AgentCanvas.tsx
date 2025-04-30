import { Entity as pcEntity } from 'playcanvas';
import { component$, Signal, useSignal } from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import { Camera, EnvAtlas, PostEffects } from '~/lib/playcanvas/components';
import { OrbitControls, ShadowCatcher } from '~/lib/playcanvas/scripts';
import { useApp } from '~/lib/playcanvas/context/use-app';
import AgentMetaHuman from '~/routes/home/AgentMetaHuman';
import AgentUltraBoy from '~/routes/home/AgentUltraBoy';
import { PosteffectWatercolor } from '~/lib/playcanvas/scripts/posteffects';

type CanvasProps = {
  assetLoaded: Signal<boolean>;
};
const Canvas = component$<CanvasProps>(({ assetLoaded }) => {
  const app = useApp();
  if (!app.value) return null;

  const focusEntity = useSignal<pcEntity | null>(null);

  return (
    <Entity>
      <EnvAtlas
        src="/environment-map_1.png"
        intensity={0.4}
        exposure={2}
        skyboxMip={2}
      />
      <Entity name="camera" position={[0, 3.6, 4.5]}>
        <Camera clearColor="#09050f" fov={45} />
        {focusEntity.value && (
          <>
            <OrbitControls
              inertiaFactor={0.07}
              distanceMin={6}
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
      {assetLoaded.value && (
        <>
          {/* <AgentMetaHuman
            name="AgentMetaHuman"
            position={[1, 0, 0]}
            scale={[100, 100, 100]}
            onModelReady$={(entity) => (focusEntity.value = entity)}
          /> */}

          <AgentUltraBoy
            name="AgentUltraBoy"
            // scale={[0.3, 0.3, 0.3]}
            onModelReady$={(entity) => (focusEntity.value = entity)}
          />
        </>
      )}
      <ShadowCatcher width={5} depth={5} />
    </Entity>
  );
});

export default Canvas;
