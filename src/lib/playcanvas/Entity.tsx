import {
  component$,
  useSignal,
  Slot,
  useVisibleTask$,
  PropFunction,
  noSerialize,
  useContextProvider,
  useStore,
  useContext,
} from '@builder.io/qwik';
import { Entity as PcEntity } from 'playcanvas';
import { useApp } from './context/use-app';
import { ParentContext, ParentContextType } from './context/use-parent';
import {
  SyntheticMouseEvent,
  SyntheticPointerEvent,
} from './utils/synthetic-event';

type PointerEventCallback = (event: SyntheticPointerEvent) => void;
type MouseEventCallback = (event: SyntheticMouseEvent) => void;

type EntityProps = {
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
    const isMounted = useSignal(false);

    useVisibleTask$(() => {
      isMounted.value = true;
    });

    if (isMounted.value === false) return;

    const app = useApp();
    // 獲取父級實體
    const parent = useContext(ParentContext);
    // 創建當前實體

    const entity = new PcEntity(name, app.value);
    useContextProvider(
      ParentContext,
      useStore<ParentContextType>({ value: noSerialize(entity) }),
    );
    // useContextProvider(
    //   ParentContext,
    //   useStore<ParentContextType>({
    //     value: entity,
    //     count: 0,
    //   }),
    // );

    // const pointerEvents = usePointerEvents();

    // Check if the entity has pointer events attached
    // const hasPointerEvents = !!(
    //   onPointerDown ||
    //   onPointerUp ||
    //   onPointerOver ||
    //   onPointerOut ||
    //   onClick
    // );

    // Create the entity only when 'app' changes
    // const entitySig = useSignal<NoSerialize<PcEntity>>(undefined);

    // useVisibleTask$(({ track }) => {
    //   track(() => app.value);
    // if (!app.value) return;

    // const entity = noSerialize(new PcEntity(name, app.value));
    // entitySig.value = noSerialize(new PcEntity(name, app.value));
    // parent!.value = noSerialize(app.value.root);
    // parent!.count++;

    // entitySig.value = entity;
    // });

    // Add entity to parent when 'entity' or 'parent' changes
    useVisibleTask$(({ track }) => {
      track(() => parent.value);

      if (!entity || !parent.value) return;

      if (parent.value.children.indexOf(entity) === -1) {
        console.log('spl Adding', entity.name, 'to parent', parent.value.name);
        parent.value.addChild(entity);
      }

      if (onEntityReady$ && entity) {
        onEntityReady$(entity);
      }

      return () => {
        console.log('spl Removing...');

        if (entity && parent.value) {
          console.log(
            'spl Removing',
            entity.name,
            'from parent',
            parent.value.name,
          );
          parent.value.removeChild(entity);
          entity.destroy();
        }
      };
    });

    // // PointerEvents
    // useVisibleTask$(({ track }) => {
    //   track(() => app.value);
    //   // track(() => parent.count);
    //   track(() => entitySig.value);
    //   track(() => onPointerDown);
    //   track(() => onPointerUp);
    //   track(() => onPointerOver);
    //   track(() => onPointerOut);
    //   track(() => onClick);

    //   const entity = entitySig.value;
    //   if (!entity) return;

    //   if (hasPointerEvents) {
    //     pointerEvents.value?.add(entity.getGuid());
    //   }

    //   if (onPointerDown) entity.on('pointerdown', onPointerDown);
    //   if (onPointerUp) entity.on('pointerup', onPointerUp);
    //   if (onPointerOver) entity.on('pointerover', onPointerOver);
    //   if (onPointerOut) entity.on('pointerout', onPointerOut);
    //   if (onClick) entity.on('click', onClick);

    //   return () => {
    //     if (hasPointerEvents) {
    //       pointerEvents.value?.delete(entity.getGuid());
    //     }
    //     if (onPointerDown) entity.off('pointerdown', onPointerDown);
    //     if (onPointerUp) entity.off('pointerup', onPointerUp);
    //     if (onPointerOver) entity.off('pointerover', onPointerOver);
    //     if (onPointerOut) entity.off('pointerout', onPointerOut);
    //     if (onClick) entity.off('click', onClick);
    //   };
    // });

    // useVisibleTask$(({ track }) => {
    //   track(() => entitySig.value);
    //   track(() => name);
    //   track(() => position);
    //   track(() => scale);
    //   track(() => rotation);

    //   const entity = entitySig.value;
    //   if (!entity) return;

    //   entity.name = name;
    //   entity.setLocalPosition(...(position as [number, number, number]));
    //   entity.setLocalScale(...(scale as [number, number, number]));
    //   entity.setLocalEulerAngles(...(rotation as [number, number, number]));
    // });

    return <Slot />;
  },
);
