import {
  $,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Color } from 'playcanvas';
import { Entity } from '~/lib/playcanvas';
import { Camera, Light, Render } from '~/lib/playcanvas/components';
import { PointerEventCallback } from '~/lib/playcanvas/Entity';
import { EnvAtlas } from '~/lib/playcanvas/components/EnvAtlas';
import {
  OrbitControls,
  ShadowCatcher,
  TransparentSkybox,
} from '~/lib/playcanvas/scripts';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';

const Canvas = component$(() => {
  const app = useApp();
  const isMounted = useSignal(false);

  useVisibleTask$(async ({ track }) => {
    track(() => [app.count]);

    if (app.value) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      app.value.start();
      isMounted.value = true;
    }
  });

  if (!isMounted.value) return null;

  const onPointerDown = $<PointerEventCallback>((event) =>
    console.log('pointer down', event),
  );

  const planeMaterial = useMaterial({
    diffuse: noSerialize(new Color().fromString('#7760F6')),
  });
  const ballMaterial = useMaterial({
    diffuse: noSerialize(new Color().fromString('#808080')),
  });

  const entities = [];

  for (let i = -5; i <= 5; i++) {
    for (let j = -5; j <= 5; j++) {
      entities.push(
        <Entity
          key={`${i}-${j}`}
          position={[i, -0.15, j]}
          scale={[0.95, 0.15, 0.95]}
        >
          <Render type="box" material={planeMaterial} />
        </Entity>,
      );
    }
  }

  return (
    <Entity name="stage">
      <EnvAtlas src="/environment-map_2.png" intensity={2} />
      <Entity name="camera" position={[4, 3.5, 4]} rotation={[-30, 45, 0]}>
        <Camera clearColor="#09050f" fov={45} />
        <OrbitControls
          inertiaFactor={0.07}
          distanceMin={6}
          distanceMax={10}
          pitchAngleMin={1}
          pitchAngleMax={90}
        />
        <TransparentSkybox />
      </Entity>
      <Entity
        name="planes"
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        onPointerDown={onPointerDown}
      >
        {entities}
      </Entity>

      <Entity name="ball" position={[0, 0.5, 0]}>
        <Render type={'sphere'} material={ballMaterial} />
      </Entity>
      <ShadowCatcher width={10} depth={10} />
    </Entity>
  );
});

export default Canvas;
