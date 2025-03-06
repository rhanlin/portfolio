import { Color } from 'playcanvas';
import * as pc from 'playcanvas';
import {
  $,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import {
  Camera,
  Light,
  Render,
  UpdateMaterial,
} from '~/lib/playcanvas/components';
import { PointerEventCallback } from '~/lib/playcanvas/Entity';
import { EnvAtlas } from '~/lib/playcanvas/components/EnvAtlas';
import { OrbitControls, ShadowCatcher } from '~/lib/playcanvas/scripts';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { Animation } from '~/lib/playcanvas/components/Animation';
import { PostEffects } from '~/lib/playcanvas/components/PostEffects';

const Canvas = component$(() => {
  const app = useApp();
  const isMounted = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => app.count);

    if (app.value) {
      isMounted.value = true;
      window._app = pc.Application.getApplication('agent-app');
    }
  });

  if (!isMounted.value) return null;

  const onPointerDown = $<PointerEventCallback>((event) =>
    console.log('pointer down', event),
  );

  const { data: asset, isPending } = useModel('/glb/ultra_boy.glb');
  if (!app.value) return null;

  app.value.start();

  const surfaceMaterial = useMaterial({
    diffuse: noSerialize(new Color().fromString('#13566A')),
  });

  const jointsMaterial = useMaterial({
    diffuse: noSerialize(new Color().fromString('#1F2B2D')),
  });

  return (
    <Entity>
      <EnvAtlas
        src="/environment-map_1.png"
        intensity={0.4}
        exposure={2}
        skyboxMip={2}
      />

      <Entity name="camera" position={[0, 1.1, 2]} rotation={[-9.8, 0, 0]}>
        <Camera clearColor="#09050f" fov={45} />
        {/* <OrbitControls
          inertiaFactor={0.07}
          distanceMin={2}
          distanceMax={10}
          pitchAngleMin={1}
          pitchAngleMax={90}
        /> */}
        {asset.value && <PostEffects />}
        {/* <Light type="directional" color={noSerialize(new Color(1, 1, 1))} /> */}
      </Entity>
      <Entity
        name="agent"
        scale={[0.003, 0.003, 0.003]}
        onPointerDown={onPointerDown}
      >
        {/* <Render type="capsule" material={material} /> */}

        <Render type="asset" asset={asset.value}>
          {/* <UpdateMaterial target="Alpha_Surface" material={surfaceMaterial} />
          <UpdateMaterial target="Alpha_Joints" material={jointsMaterial} /> */}
          <Animation asset={asset.value} />
        </Render>
      </Entity>
      <ShadowCatcher width={5} depth={5} />
    </Entity>
  );
});

export default Canvas;
