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
import { createAppProvider } from '~/lib/playcanvas/context/use-app';

type CanvasProps = {
  scopeId: string;
};

const Canvas = component$<CanvasProps>(({ scopeId }) => {
  const { useApp } = createAppProvider(scopeId);
  const app = useApp();
  const isMounted = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => [app.count]);

    if (app.value) {
      isMounted.value = true;
    }
  });

  if (!isMounted.value) return null;

  const onPointerDown = $<PointerEventCallback>((event) =>
    console.log('pointer down', event),
  );

  if (!app.value) return null;

  setTimeout(() => {
    // TODO: Need to figure out why timeOut is needed...
    app.value!.start();
  }, 500);

  return (
    <Entity>
      <EnvAtlas src="/environment-map_1.png" intensity={2} />

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
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        onPointerDown={onPointerDown}
      >
        <Render type="box" />
      </Entity>
    </Entity>
  );
});

export default Canvas;
