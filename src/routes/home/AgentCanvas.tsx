import { Color } from 'playcanvas';
import {
  $,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import { Camera, Light, Render } from '~/lib/playcanvas/components';
import { PointerEventCallback } from '~/lib/playcanvas/Entity';
import { EnvAtlas } from '~/lib/playcanvas/components/EnvAtlas';
import { OrbitControls } from '~/lib/playcanvas/scripts';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { useApp } from '~/lib/playcanvas/context/use-app';

const Canvas = component$(() => {
  const app = useApp();
  const isMounted = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => app.count);

    if (app.value) {
      isMounted.value = true;
    }
  });

  if (!isMounted.value) return null;

  const onPointerDown = $<PointerEventCallback>((event) =>
    console.log('pointer down', event),
  );

  const { data: asset, isPending } = useModel('/glb/low-poly-man.glb');
  if (!app.value) return null;

  app.value.start();

  return (
    <Entity>
      <EnvAtlas src="/environment-map_1.png" />

      <Entity name="camera" position={[4, 3.5, 4]} rotation={[-30, 45, 0]}>
        <Camera clearColor="#111111" fov={45} />
        <OrbitControls
          inertiaFactor={0.07}
          distanceMin={6}
          distanceMax={10}
          pitchAngleMin={1}
          pitchAngleMax={90}
        />
        <Light type="directional" color={noSerialize(new Color(1, 1, 1))} />
      </Entity>
      <Entity
        name="render"
        position={[0, -3.5, 0]}
        scale={[1, 1, 1]}
        onPointerDown={onPointerDown}
      >
        {/* <Render type="capsule" /> */}

        <Render type="asset" asset={asset.value} />
      </Entity>
    </Entity>
  );
});

export default Canvas;
