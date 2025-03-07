import {
  component$,
  Slot,
  useVisibleTask$,
  PropFunction,
  noSerialize,
} from '@builder.io/qwik';
import { Entity as PcEntity } from 'playcanvas';
import { useParent, useParentProvider } from './context/use-parent';
import {
  SyntheticMouseEvent,
  SyntheticPointerEvent,
} from './utils/synthetic-event';
import { usePointerEvents } from './context/use-pointer-events';
import { useApp } from './context/use-app';

export type PointerEventCallback = (event: SyntheticPointerEvent) => void;
export type MouseEventCallback = (event: SyntheticMouseEvent) => void;

export type EntityProps = {
  name?: string;
  position?: number[];
  scale?: number[];
  rotation?: number[];
  onPointerUp?: PointerEventCallback;
  onPointerDown?: PointerEventCallback;
  onPointerOver?: PointerEventCallback;
  onPointerOut?: PointerEventCallback;
  onClick?: MouseEventCallback;
  onEntityReady$?: PropFunction<(entity: PcEntity) => void>;
};

export const Entity = component$<EntityProps>(
  ({
    name = 'Untitled',
    position = [0, 0, 0],
    scale = [1, 1, 1],
    rotation = [0, 0, 0],
    onPointerDown,
    onPointerUp,
    onPointerOver,
    onPointerOut,
    onClick,
    onEntityReady$,
  }) => {
    const app = useApp().value;
    const parent = useParent();

    const entity = new PcEntity(name, app);
    useParentProvider({ value: noSerialize(entity), count: 0 });

    const pointerEvents = usePointerEvents();

    // Check if the entity has pointer events attached
    const hasPointerEvents = !!(
      onPointerDown ||
      onPointerUp ||
      onPointerOver ||
      onPointerOut ||
      onClick
    );

    // Add entity to parent when 'entity' or 'parent' changes
    useVisibleTask$(({ track }) => {
      track(() => [app, parent.value, entity]);

      if (!entity || !parent.value) return;

      console.log(
        '[debug] Entity Adding',
        entity.name,
        'to parent',
        parent.value.name,
      );

      parent.value.addChild(entity);

      if (onEntityReady$) {
        onEntityReady$(entity);
      }

      return () => {
        if (entity && parent.value) {
          console.log(
            '[debug] Entity Removing',
            entity.name,
            'from parent',
            parent.value.name,
          );
          parent.value.removeChild(entity);
          entity.destroy();
        }
      };
    });

    // PointerEvents
    useVisibleTask$(({ track }) => {
      track(() => app);
      track(() => parent.value);
      track(() => entity);
      track(() => onPointerDown);
      track(() => onPointerUp);
      track(() => onPointerOver);
      track(() => onPointerOut);
      track(() => onClick);

      // const entity = entitySig.value;
      if (!entity) return;

      if (hasPointerEvents) {
        pointerEvents.value?.add(entity.getGuid());
      }

      if (onPointerDown) entity.on('pointerdown', onPointerDown);
      if (onPointerUp) entity.on('pointerup', onPointerUp);
      if (onPointerOver) entity.on('pointerover', onPointerOver);
      if (onPointerOut) entity.on('pointerout', onPointerOut);
      if (onClick) entity.on('click', onClick);

      return () => {
        if (hasPointerEvents) {
          pointerEvents.value?.delete(entity.getGuid());
        }
        if (onPointerDown) entity.off('pointerdown', onPointerDown);
        if (onPointerUp) entity.off('pointerup', onPointerUp);
        if (onPointerOver) entity.off('pointerover', onPointerOver);
        if (onPointerOut) entity.off('pointerout', onPointerOut);
        if (onClick) entity.off('click', onClick);
      };
    });

    useVisibleTask$(({ track }) => {
      track(() => entity);
      track(() => name);
      track(() => position);
      track(() => scale);
      track(() => rotation);

      if (!entity) return;

      entity.name = name;
      entity.setLocalPosition(...(position as [number, number, number]));
      entity.setLocalScale(...(scale as [number, number, number]));
      entity.setLocalEulerAngles(...(rotation as [number, number, number]));
    });

    return <Slot />;
  },
);
