import { Entity, Vec3 } from 'playcanvas';
import { Script } from '../../components/Script';
import {
  OrbitCamera,
  OrbitCameraInputMouse,
  OrbitCameraInputTouch,
} from './orbit-camera';
import {
  component$,
  noSerialize,
  NoSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useParent } from '../../context/use-parent';

type OrbitCameraProps = {
  distanceMax?: number;
  distanceMin?: number;
  pitchAngleMax?: number;
  pitchAngleMin?: number;
  inertiaFactor?: number;
  focusEntity?: Entity | null;
  frameOnStart?: boolean;
  distance?: number;
  pivotPoint?: NoSerialize<Vec3> | null;
};

type OrbitCameraInputProps = {
  orbitSensitivity?: number;
  distanceSensitivity?: number;
};

type OrbitControls = OrbitCameraProps & {
  mouse?: OrbitCameraInputProps;
  touch?: OrbitCameraInputProps;
};

export const OrbitControls = component$<OrbitControls>(
  ({
    distanceMax = 20,
    distanceMin = 18,
    pitchAngleMax = 90,
    pitchAngleMin = 0,
    inertiaFactor = 0.0,
    focusEntity = null,
    pivotPoint = noSerialize(new Vec3()),
    frameOnStart = true,
    distance = 0,
    mouse = { orbitSensitivity: 0.3, distanceSensitivity: 0.15 },
    touch = { orbitSensitivity: 0.4, distanceSensitivity: 0.2 },
  }) => {
    const parent = useParent();
    const hasCamera = useSignal(false);

    useVisibleTask$(({ track }) => {
      track(() => parent.value);
      track(() => parent.count);

      if (parent.value?.camera) {
        hasCamera.value = true;
      }
    });
    if (!hasCamera.value) return null;

    const orbitCameraProps: OrbitCameraProps = {
      distanceMax,
      distanceMin,
      pitchAngleMax,
      pitchAngleMin,
      inertiaFactor,
      focusEntity,
      pivotPoint,
      frameOnStart,
      distance,
    };

    return (
      <>
        <Script script={noSerialize(OrbitCamera)} {...orbitCameraProps} />
        <Script script={noSerialize(OrbitCameraInputMouse)} {...mouse} />
        <Script script={noSerialize(OrbitCameraInputTouch)} {...touch} />
      </>
    );
  },
);
