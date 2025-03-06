import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { CameraFrame } from 'playcanvas';
import { merge } from 'lodash-es';
import { PostControls, usePostControls } from '../hooks/use-post-controls';
import { useApp } from '../context/use-app';
import { useParent } from '../context/use-parent';

type PostEffectsProps = { overrides?: Partial<PostControls> };

export const PostEffects = component$<PostEffectsProps>(
  ({ overrides = {} }) => {
    const app = useApp();
    const parent = useParent();
    const postSettings = usePostControls();
    const settings = merge(postSettings, overrides);

    useVisibleTask$(({ track }) => {
      track(() => [app.count, parent.count]);
      if (!app.value || !parent.value) return;

      const camera = parent.value.camera;
      if (!camera) return;

      const cameraFrame = new CameraFrame(app.value, camera);
      Object.entries(settings).forEach(([key, value]) => {
        (cameraFrame as any)[key] = value;
      });
      cameraFrame.update();
    });

    return null;
  },
);
