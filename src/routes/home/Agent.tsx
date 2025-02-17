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
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { PointerEventCallback } from '~/lib/playcanvas/Entity';
import { EnvAtlas } from '~/lib/playcanvas/components/EnvAtlas';
import { OrbitControls } from '~/lib/playcanvas/scripts';
import { useModel } from '~/lib/playcanvas/hooks/use-model';

const Agent = component$(() => {
  const material = useMaterial({ diffuse: noSerialize(Color.GRAY) });
  const isMounted = useSignal(false);
  useVisibleTask$(() => {
    isMounted.value = true;
  });

  if (!isMounted.value) return null;

  const onPointerDown = $<PointerEventCallback>((event) =>
    console.log('pointer down', event),
  );

  const { data: asset } = useModel('/glb/low-poly-man.glb');
  return (
    <Entity>
      <EnvAtlas src="/environment-map.png" intensity={2} />

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
        <Render type="asset" asset={asset} />
      </Entity>
    </Entity>
  );
});

export default Agent;
