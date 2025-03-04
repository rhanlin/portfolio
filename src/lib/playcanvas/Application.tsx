import {
  component$,
  useSignal,
  Slot,
  useVisibleTask$,
  noSerialize,
  type Signal,
  type CSSProperties,
} from '@builder.io/qwik';
import {
  RESOLUTION_AUTO,
  Application as PlayCanvasApplication,
  Mouse,
  TouchDevice,
  FILLMODE_NONE,
  type FILLMODE_KEEP_ASPECT,
  type FILLMODE_FILL_WINDOW,
  type RESOLUTION_FIXED,
} from 'playcanvas';
import * as Ammo from 'sync-ammo';
import { useParent, useParentProvider } from './context/use-parent';
import {
  usePointerEvents,
  usePointerEventsProvider,
} from './context/use-pointer-events';
import { usePicker } from './hooks/use-picker';
import { generateAppId, useApp, useAppProvider } from './context/use-app';

interface GraphicsOptions {
  /** Boolean that indicates if the canvas contains an alpha buffer. */
  alpha?: boolean; //true,
  /** Boolean that indicates that the drawing buffer is requested to have a depth buffer of at least 16 bits. */
  depth?: boolean; //true
  /** Boolean that indicates that the drawing buffer is requested to have a stencil buffer of at least 8 bits. */
  stencil?: boolean; //true
  /** Boolean that indicates whether or not to perform anti-aliasing if possible. */
  antialias?: boolean; //true
  /** Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha. */
  premultipliedAlpha?: boolean; //true
  /** If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author. */
  preserveDrawingBuffer?: boolean; //false
  /** A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. */
  powerPreference?: 'default' | 'high-performance' | 'low-power'; // 'default'
  /** Boolean that indicates if a context will be created if the system performance is low or if no hardware GPU is available. */
  failIfMajorPerformanceCaveat?: boolean; //false
  /** Boolean that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop. */
  desynchronized?: boolean; //false
  /** BBoolean that hints to the user agent to use a compatible graphics adapter for an immersive XR device. */
  xrCompatible?: boolean; //false
}

interface ApplicationProps {
  /** The class name to attach to the canvas component */
  className?: string;
  /** A style object added to the canvas component */
  style?: CSSProperties;
  /** Controls how the canvas fills the window and resizes when the window changes. */
  fillMode?:
    | typeof FILLMODE_NONE
    | typeof FILLMODE_FILL_WINDOW
    | typeof FILLMODE_KEEP_ASPECT;
  /** Change the resolution of the canvas, and set the way it behaves when the window is resized. */
  resolutionMode?: typeof RESOLUTION_AUTO | typeof RESOLUTION_FIXED;
  /** Clamps per-frame delta time to an upper bound. Useful since returning from a tab deactivation can generate huge values for dt, which can adversely affect game state. */
  maxDeltaTime?: number;
  /** Scales the global time delta. */
  timeScale?: number;
  /** Whether to use the PlayCanvas Physics system. */
  usePhysics?: boolean;
  /** Graphics Settings */
  graphicsDeviceOptions?: GraphicsOptions;
}

type ApplicationWithoutCanvasProps = ApplicationProps & {
  /** A ref to a html canvas element */
  canvas: Signal<HTMLCanvasElement | undefined>;
};

export const Application = component$<
  ApplicationProps & {
    id?: string;
  }
>(
  ({
    id,
    className = 'pc-app',
    style = { width: '100%', height: '100%' },
    ...props
  }) => {
    const canvasSig = useSignal<HTMLCanvasElement>();
    return (
      <>
        <canvas
          id={id ?? generateAppId()}
          class={className}
          style={style}
          ref={canvasSig}
        />
        <ApplicationWithoutCanvas canvas={canvasSig} {...props}>
          <Slot />
        </ApplicationWithoutCanvas>
      </>
    );
  },
);

export const ApplicationWithoutCanvas =
  component$<ApplicationWithoutCanvasProps>(
    ({
      canvas,
      fillMode = FILLMODE_NONE,
      resolutionMode = RESOLUTION_AUTO,
      maxDeltaTime = 0.1,
      timeScale = 1,
      usePhysics = false,
      ...otherProps
    }) => {
      useAppProvider({
        value: undefined,
        count: 0,
      });

      usePointerEventsProvider({ value: undefined });

      useParentProvider({
        value: undefined,
        count: 0,
      });

      const appContext = useApp();
      const pointerEventsContext = usePointerEvents();
      const parentContext = useParent();

      useVisibleTask$(({ track }) => {
        track(() => canvas.value);
        const graphicsDeviceOptions = {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
          desynchronized: false,
          xrCompatible: false,
          ...otherProps.graphicsDeviceOptions,
        };

        if (canvas.value) {
          console.log(
            `%c ApplicationWithoutCanvas start...`,
            'color: #ffd34f; background-color: #131311; font-size: 0.8rem; padding: 2px 4px; border-radius: 4px;',
          );

          // @ts-expect-error The PC Physics system expects a global Ammo instance
          if (usePhysics && !globalThis.Ammo) globalThis.Ammo = Ammo.default;

          const localApp = new PlayCanvasApplication(canvas.value, {
            mouse: new Mouse(canvas.value),
            touch: new TouchDevice(canvas.value),
            graphicsDeviceOptions,
          });

          localApp.setCanvasFillMode(fillMode);
          localApp.setCanvasResolution(resolutionMode);

          appContext.value = noSerialize(localApp);
          appContext.count += 1;

          localApp.root.name = 'root';
          parentContext.value = noSerialize(localApp.root);
        }

        return () => {
          if (!appContext.value) return;

          appContext.value.destroy();

          // @ts-expect-error Clean up the global Ammo instance
          if (usePhysics && globalThis.Ammo) delete globalThis.Ammo;

          appContext.value = undefined;
          appContext.count += 1;
        };
      });

      // These appContext properties can be updated without re-rendering
      useVisibleTask$(({ track }) => {
        track(() => appContext.value);

        if (!appContext.value) return;
        appContext.value.maxDeltaTime = maxDeltaTime;
        appContext.value.timeScale = timeScale;
      });

      usePicker(
        noSerialize(appContext.value),
        canvas.value,
        pointerEventsContext.value,
      );

      return <Slot />;
    },
  );
