import { $, component$, noSerialize, useSignal } from '@builder.io/qwik';
import { Color, Entity as pcEntity } from 'playcanvas';
import { Entity } from '~/lib/playcanvas';
import {
  Camera,
  Render,
  EnvAtlas,
  RenderAssetAnimation,
} from '~/lib/playcanvas/components';
import { PointerEventCallback } from '~/lib/playcanvas/Entity';
import { OrbitControls, TransparentSkybox } from '~/lib/playcanvas/scripts';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { PosteffectWatercolor } from '~/lib/playcanvas/scripts/posteffects';

const Canvas = component$(() => {
  const app = useApp();
  if (!app.value) return null;

  const focusEntity = useSignal<pcEntity | null>(null);

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

  const { data: cube } = useModel('/glb/cube.glb');
  // const { data: oceanAsset } = useModel('/glb/ocean_scene.glb');
  const { data: tornado } = useModel('/glb/tornado.glb');

  return (
    <Entity name="stage">
      <EnvAtlas src="/environment-map_2.png" intensity={2} />
      <Entity name="camera" position={[4, 3.5, 4]} rotation={[-30, 45, 0]}>
        <Camera clearColor="#09050f" fov={60} />
        {focusEntity.value && (
          <OrbitControls
            inertiaFactor={0.07}
            distanceMin={3}
            distanceMax={12}
            pitchAngleMin={-90}
            pitchAngleMax={90}
            focusEntity={focusEntity.value}
          />
        )}
        <TransparentSkybox />
        <PosteffectWatercolor />
      </Entity>
      {/* <Entity
        name="planes"
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        onPointerDown={onPointerDown}
      >
        {entities}
      </Entity> */}

      {/* <Entity name="ball" position={[0, 0.5, 0]}>
        <Render type={'sphere'} material={ballMaterial} />
      </Entity> */}

      <Entity name="cube">
        {cube.value && (
          <Render
            type="asset"
            asset={cube.value}
            onRenderAssetReady$={(entity) => (focusEntity.value = entity)}
          >
            <RenderAssetAnimation asset={cube.value} />
          </Render>
        )}
      </Entity>

      <Entity name="tornado" scale={[0.2, 0.2, 0.2]} position={[1.2, 1.5, 0]}>
        {tornado.value && (
          <Render type="asset" asset={tornado.value}>
            <RenderAssetAnimation asset={tornado.value} />
          </Render>
        )}
      </Entity>
    </Entity>
  );
});

export default Canvas;
