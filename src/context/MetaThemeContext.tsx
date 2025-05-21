/**
 * This file is based on meta-theme-swap (https://github.com/evankirkiles/meta-theme-swap/tree/main)
 */

import {
  $,
  component$,
  createContextId,
  useComputed$,
  useContextProvider,
  useSignal,
  useVisibleTask$,
  useContext,
  noSerialize,
  Slot,
  type Signal,
  type QRL,
  type PropsOf,
  type NoSerialize,
} from '@builder.io/qwik';

// Define context interface
export interface IMetaThemeContext {
  observeElement$: QRL<(el: Element) => void>;
  unobserveElement$: QRL<(el: Element) => void>;
}

// Create context ID
export const MetaThemeContext =
  createContextId<IMetaThemeContext>('meta-theme-context');

// Define Intersection Observer settings
const IO_TOP_OPTIONS = {
  rootMargin: '-0.05% 0px -99.9% 0px',
};

const IO_BOT_OPTIONS = {
  rootMargin: '-99.9% 0px -0.05% 0px',
};

/**
 * Meta Theme Provider component for controlling WebKit navigation and address bar colors.
 *
 * Usage example:
 * ```
 * <MetaThemeProvider>
 *   ...your application
 * </MetaThemeProvider>
 * ```
 */
export const MetaThemeProvider = component$<PropsOf<'div'>>((props) => {
  const metaTag = useSignal<HTMLMetaElement | null>(null);
  const currThemeColor = useSignal<string | null>(null);
  const observedElements = useSignal<Set<Element>>(new Set());
  const topPrio = useSignal<number>(-Infinity);
  const botPrio = useSignal<number>(-Infinity);
  const observerTop = useSignal<NoSerialize<IntersectionObserver>>();
  const observerBottom = useSignal<NoSerialize<IntersectionObserver>>();

  // Initialize Intersection Observers
  useVisibleTask$(() => {
    metaTag.value = document.querySelector('meta[name="theme-color"]');
    currThemeColor.value = metaTag.value?.getAttribute('content') ?? null;

    // Callback function to update WebKit status bar color
    function updateTop(es: IntersectionObserverEntry[]) {
      if (!metaTag.value) return;
      const selectedEntry = es
        .filter((e) => e.isIntersecting)
        .reduce<[Element | null, number]>(
          (acc, entry) => {
            const priority = parseInt(
              entry.target.getAttribute('data-mts-priority') ?? '-1',
            );
            return priority >= acc[1] ? [entry.target, priority] : acc;
          },
          [null, topPrio.value],
        );
      const target = selectedEntry[0];
      if (!target) return;
      topPrio.value = selectedEntry[1];
      const color = target.getAttribute('data-mts-color');
      if (!color) return;
      currThemeColor.value = color;
      metaTag.value.setAttribute('content', currThemeColor.value);
    }

    // Callback function to update WebKit address bar color
    function updateBot(es: IntersectionObserverEntry[]) {
      if (!metaTag.value) return;
      const selectedEntry = es
        .filter((e) => e.isIntersecting)
        .reduce<[Element | null, number]>(
          (acc, entry) => {
            const priority = parseInt(
              entry.target.getAttribute('data-mts-priority') ?? '-1',
            );
            return priority >= acc[1] ? [entry.target, priority] : acc;
          },
          [null, botPrio.value],
        );
      const target = selectedEntry[0];
      if (!target) return;
      botPrio.value = selectedEntry[1];
      const color = target.getAttribute('data-mts-color');
      if (!color) return;
      document.body.style.backgroundColor = color;
      metaTag.value.setAttribute('content', currThemeColor.value + 'fe');
      const meta = metaTag.value;
      requestAnimationFrame(() => {
        meta.setAttribute('content', currThemeColor.value || '');
      });
    }

    // Create Intersection Observers
    observerTop.value = noSerialize(
      new IntersectionObserver(updateTop, IO_TOP_OPTIONS),
    );
    observerBottom.value = noSerialize(
      new IntersectionObserver(updateBot, IO_BOT_OPTIONS),
    );

    // Cleanup function
    return () => {
      observerTop.value?.disconnect();
      observerBottom.value?.disconnect();
    };
  });

  // Add element to observation list
  const observeElement$ = $(async (elToAdd: Element) => {
    if (!observerTop.value || !observerBottom.value) return;
    if (observedElements.value.has(elToAdd)) return;

    observedElements.value.add(elToAdd);
    // Create new Set to trigger reactive update
    observedElements.value = new Set(observedElements.value);

    // Reset priorities
    topPrio.value = -Infinity;
    botPrio.value = -Infinity;

    // Re-observe all elements
    observedElements.value.forEach((el) => {
      observerTop.value!.unobserve(el);
      observerTop.value!.observe(el);
      observerBottom.value!.unobserve(el);
      observerBottom.value!.observe(el);
    });
  });

  // Remove element from observation list
  const unobserveElement$ = $(async (elToDelete: Element) => {
    if (!observerTop.value || !observerBottom.value) return;
    if (!observedElements.value.has(elToDelete)) return;

    observedElements.value.delete(elToDelete);
    // Create new Set to trigger reactive update
    observedElements.value = new Set(observedElements.value);

    // Reset priorities
    topPrio.value = -Infinity;
    botPrio.value = -Infinity;

    // Re-observe all elements
    observedElements.value.forEach((el) => {
      observerTop.value!.unobserve(el);
      observerTop.value!.observe(el);
      observerBottom.value!.unobserve(el);
      observerBottom.value!.observe(el);
    });
  });

  // Provide context
  useContextProvider(MetaThemeContext, {
    observeElement$,
    unobserveElement$,
  });

  return <Slot {...props}></Slot>;
});

/**
 * Hook for using Meta Theme context
 * Sets theme color for an element. When the element reaches the top of the screen,
 * the navigation bar will change to the specified color;
 * when the element reaches the bottom of the screen,
 * the address bar will change to the specified color.
 *
 * @param elementRef Signal of the element to check intersection
 * @param options Configuration options, including color and priority
 */
export interface MetaThemeOptions {
  color: string;
  priority?: number;
}

export function useMetaTheme(
  elementRef: Signal<Element | undefined>,
  options: Signal<MetaThemeOptions> | MetaThemeOptions,
) {
  const ctx = useContext(MetaThemeContext);

  // Prepare options, handle signal or direct object
  const resolvedOptions = useComputed$(() => {
    const opts =
      typeof options === 'object' && 'value' in options
        ? options.value
        : options;
    return {
      color: opts.color,
      priority: opts.priority ?? -1,
    };
  });

  // Add theme switching attributes to element
  useVisibleTask$(({ track, cleanup }) => {
    const el = track(() => elementRef.value);
    const opts = track(() => resolvedOptions.value);
    if (!el) return;

    el.setAttribute('data-mts-color', opts.color);
    el.setAttribute('data-mts-priority', opts.priority.toString());

    cleanup(() => {
      el?.removeAttribute('data-mts-color');
      el?.removeAttribute('data-mts-priority');
    });
  });

  // Observe element
  useVisibleTask$(({ track, cleanup }) => {
    const el = track(() => elementRef.value);

    if (!el) return;

    // Execute observation
    ctx.observeElement$(el);

    cleanup(() => {
      ctx.unobserveElement$(el);
    });
  });
}
