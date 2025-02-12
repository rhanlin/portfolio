import {
  AppBase,
  CameraComponent,
  type Entity as pcEntity,
  Picker,
} from 'playcanvas';
import {
  $,
  useSignal,
  useVisibleTask$,
  noSerialize,
  NoSerialize,
} from '@builder.io/qwik';
import {
  SyntheticMouseEvent,
  SyntheticPointerEvent,
} from '../utils/synthetic-event';

export const usePicker = (
  app: NoSerialize<AppBase>,
  el: HTMLElement | undefined,
  pointerEvents: NoSerialize<Set<string>>,
) => {
  const activeEntitySig = useSignal<NoSerialize<pcEntity>>();
  const pointerDetailsSig = useSignal<PointerEvent | null>(null);
  const canvasRectSig = useSignal<DOMRect | null>(
    app ? app.graphicsDevice.canvas.getBoundingClientRect() : null,
  );

  // Watch for the canvas to resize. Neccesary for correct picking
  useVisibleTask$(({ track }) => {
    track(() => app);

    const resizeObserver = new ResizeObserver(() => {
      canvasRectSig.value = app
        ? app.graphicsDevice.canvas.getBoundingClientRect()
        : null;
    });

    if (app) resizeObserver.observe(app.graphicsDevice.canvas);
    return () => resizeObserver.disconnect();
  });

  let picker: Picker | null = null;
  let onPointerMove: (e: PointerEvent) => void = $(() => {});
  let onFrameUpdate: () => Promise<null> = $(async () => null);
  let onInteractionEvent: (e: MouseEvent) => Promise<void> = $(async () => {});

  useVisibleTask$(({ track }) => {
    track(() => app);

    if (app && app.graphicsDevice) {
      picker = new Picker(
        app,
        app.graphicsDevice.width,
        app.graphicsDevice.height,
      );
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => picker);

    onPointerMove = (e: PointerEvent) => {
      pointerDetailsSig.value = e;
    };
  });

  useVisibleTask$(({ track }) => {
    track(() => picker);
    track(() => pointerEvents);

    onFrameUpdate = async () => {
      if (pointerEvents?.size === 0) return null;

      const e: PointerEvent | null = pointerDetailsSig.value;
      if (!picker || !app || !e) return null;

      if (!canvasRectSig.value) return null;

      const entity = await getEntityAtPointerEvent(
        app,
        picker,
        canvasRectSig.value,
        e,
      );
      if (!entity) return null;

      const prevEntity = activeEntitySig.value;

      // Find the common ancestor of the current target and last event. We do not need to bubble past this
      const stopBubblingAt = getNearestCommonAncestor(prevEntity, entity);

      // If the pointer moves out of the current hovered entity (and its children)
      if (prevEntity && prevEntity !== entity) {
        const pointerOutEvent = new SyntheticPointerEvent(e);
        pointerOutEvent.type = 'pointerout';
        propagateEvent(prevEntity, pointerOutEvent, stopBubblingAt);
      }

      // If the pointer moves over a new entity
      if (entity && entity !== prevEntity) {
        const pointerOverEvent = new SyntheticPointerEvent(e);
        pointerOverEvent.type = 'pointerover';
        propagateEvent(entity, pointerOverEvent, stopBubblingAt);
      }

      // Update our reference
      activeEntitySig.value = noSerialize(entity);

      return null;
    };

    onInteractionEvent = async (e: MouseEvent) => {
      if (!picker || !app || !canvasRectSig.value) return;

      const entity = await getEntityAtPointerEvent(
        app,
        picker,
        canvasRectSig.value,
        e,
      );

      if (!entity) return;

      // Handle other pointer events (down, up, move)
      const syntheticEvent =
        e instanceof PointerEvent
          ? new SyntheticPointerEvent(e)
          : new SyntheticMouseEvent(e);

      propagateEvent(entity, syntheticEvent);
    };
  });

  useVisibleTask$(({ track }) => {
    track(() => app);
    track(() => el);
    track(() => onInteractionEvent);
    track(() => pointerEvents);

    if (!picker || !el || !app) return;

    el.addEventListener('pointerup', onInteractionEvent);
    el.addEventListener('pointerdown', onInteractionEvent);
    el.addEventListener('mouseup', onInteractionEvent);
    el.addEventListener('click', onInteractionEvent);
    el.addEventListener('pointermove', onPointerMove);
    app.on('update', onFrameUpdate);

    return () => {
      el.removeEventListener('pointerup', onInteractionEvent);
      el.removeEventListener('pointerdown', onInteractionEvent);
      el.removeEventListener('click', onInteractionEvent);
      el.removeEventListener('pointermove', onPointerMove);
      app.off('update', onFrameUpdate);
    };
  });
};

const getEntityAtPointerEvent = async (
  app: AppBase,
  picker: Picker,
  rect: DOMRect,
  e: MouseEvent,
): Promise<NoSerialize<pcEntity>> => {
  // Find the highest priority camera
  const [activeCamera]: CameraComponent[] = (
    app.root.findComponents('camera') as CameraComponent[]
  )
    .filter((camera: CameraComponent) => !camera.renderTarget)
    .sort((a: CameraComponent, b: CameraComponent) => a.priority - b.priority);

  if (!activeCamera) return;

  // Get canvas bounds
  const canvas = app.graphicsDevice.canvas;

  if (!canvas || canvas.width === 0 || canvas.height === 0) return;

  // Calculate position relative to canvas
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Account for canvas scaling
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  // prepare the picker and perform picking
  try {
    picker.prepare(activeCamera, app.scene);
    const [meshInstance] = await picker.getSelectionAsync(
      x * scaleX,
      y * scaleY,
    );
    if (!meshInstance) return;

    return noSerialize(meshInstance?.node as pcEntity);
  } catch {
    // The picker can fail if the camera is not active or the canvas is not visible
    return;
  }
};

const getNearestCommonAncestor = (
  a: NoSerialize<pcEntity>,
  b: NoSerialize<pcEntity>,
): NoSerialize<pcEntity> => {
  const ancestors = noSerialize(new Set<pcEntity>());

  // Traverse up the parent chain of entity 'a' and add each ancestor to the set
  let current: NoSerialize<pcEntity> = a;
  while (current) {
    ancestors?.add(current);
    current = noSerialize(current.parent as pcEntity);
  }

  // Traverse up the parent chain of entity 'b' and check against the set
  current = b;
  while (current) {
    if (ancestors?.has(current)) {
      return current; // Found the nearest common ancestor
    }
    current = noSerialize(current.parent as pcEntity);
  }

  return; // No common ancestor found
};

// Utility to propagate events up the entity hierarchy
const propagateEvent = (
  entity: NoSerialize<pcEntity>,
  event: SyntheticPointerEvent | SyntheticMouseEvent,
  stopAt?: NoSerialize<pcEntity>,
): boolean => {
  while (entity) {
    if (entity === stopAt) return false;
    entity.fire(event.type, event);
    if (event.hasStoppedPropagation) return true;
    entity = noSerialize(entity.parent as pcEntity);
  }
  return false;
};
