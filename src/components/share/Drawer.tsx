import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { type PropFunction, Slot } from '@builder.io/qwik';
import clsx from 'clsx';

export interface DrawerProps {
  open: boolean;
  onOpenChange$?: PropFunction<(open: boolean) => void>;
  side?: 'left' | 'right' | 'top' | 'bottom';
  blurAmount?: string;
  class?: string;
}

const sideTransform = {
  top: 'translate-y-[-100%]',
  bottom: 'translate-y-[100%]',
  left: 'translate-x-[-100%]',
  right: 'translate-x-[100%]',
} as const;

const sideBorderRadius = {
  top: 'rounded-bl-[18px] rounded-br-[18px]',
  bottom: 'rounded-tl-[18px] rounded-tr-[18px]',
  left: 'rounded-tr-[18px] rounded-br-[18px]',
  right: 'rounded-tl-[18px] rounded-bl-[18px]',
} as const;

export const Drawer = component$<DrawerProps>(
  ({
    open,
    onOpenChange$,
    class: className,
    side = 'right',
    blurAmount = '12px',
  }) => {
    const isOpen = useSignal(open);

    useVisibleTask$(({ track }) => {
      track(() => open);
      isOpen.value = open;
    });

    const handleClose = $(() => {
      isOpen.value = false;
      onOpenChange$?.(false);
    });

    const sideClasses = {
      right: 'inset-y-0 right-0 h-full',
      left: 'inset-y-0 left-0 h-full',
      top: 'inset-x-0 top-0 w-full',
      bottom: 'inset-x-0 bottom-0 w-full',
    };

    return (
      <div
        class={clsx(
          'fixed inset-0 z-50',
          isOpen.value ? '' : 'pointer-events-none',
          className,
        )}
        onClick$={handleClose}
      >
        {/* Backdrop */}
        <div
          class={clsx(
            'fixed inset-0 bg-black/50 transition-opacity',
            isOpen.value ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          style={`backdrop-filter: blur(${blurAmount})`}
        />

        {/* Drawer content */}
        <div class={clsx('fixed z-50 flex', sideClasses[side])}>
          <div
            class={clsx(
              'shadow-lg bg-primary transition-transform duration-300 ease-in-out flex flex-col h-full w-full',
              sideBorderRadius[side],
              isOpen.value ? '' : sideTransform[side],
            )}
            onClick$={(e) => e.stopPropagation()}
          >
            <Slot />
          </div>
        </div>
      </div>
    );
  },
);

export const DrawerContent = component$(() => {
  return (
    <div class="flex flex-col overflow-y-auto h-full p-6">
      <Slot />
    </div>
  );
});

export const DrawerHeader = component$(() => {
  return (
    <div class="flex flex-col space-y-1.5 p-4">
      <Slot />
    </div>
  );
});

export const DrawerTitle = component$(() => {
  return (
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50">
      <Slot />
    </h3>
  );
});

// Drawer Description component
export const DrawerDescription = component$(() => {
  return (
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <Slot />
    </p>
  );
});

export const DrawerFooter = component$(() => {
  return (
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4 mt-auto">
      <Slot />
    </div>
  );
});

export const DrawerClose = component$<{ onClick$?: PropFunction<() => void> }>(
  ({ onClick$ }) => {
    return (
      <button
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800"
        onClick$={onClick$}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span class="sr-only">Close</span>
      </button>
    );
  },
);
