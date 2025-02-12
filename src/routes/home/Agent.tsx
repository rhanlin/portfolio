import { Color } from 'playcanvas';
import { component$, noSerialize } from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import { Camera, Light, Render } from '~/lib/playcanvas/components';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';

const Agent = component$(() => {
  const material = useMaterial({ diffuse: noSerialize(Color.GRAY) });

  return (
    <>
      <Entity name="test">
        <Entity name="camera" position={[0, 0, 0]}>
          <Camera clearColor={noSerialize(Color.RED)} fov={60} />
          <Light type="directional" color={noSerialize(new Color(1, 1, 1))} />
        </Entity>
        <Entity name="render" position={[0, 0, 0]}>
          <Render type="box" material={material} />
        </Entity>
      </Entity>
    </>
  );
});

export default Agent;
