import { useSignal, useVisibleTask$, useOnWindow, $ } from '@builder.io/qwik';

/**
 * A custom hook for Qwik that provides media query matching functionality
 * @param query The media query string to match
 * @returns A signal that contains the current match state
 */
export function useMediaQuery(query: string) {
  const matches = useSignal(false);

  // Initial check and setup when component becomes visible
  useVisibleTask$(({ cleanup }) => {
    // Check if window is available (browser environment)
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    matches.value = mediaQueryList.matches;

    // Define the handler
    const handler = (event: MediaQueryListEvent) => {
      matches.value = event.matches;
    };

    // Add event listener
    mediaQueryList.addEventListener('change', handler);

    // Clean up
    cleanup(() => {
      mediaQueryList.removeEventListener('change', handler);
    });
  });

  return matches;
}

// Usage example with SSR/hydration considerations
export function useResponsiveBreakpoint() {
  // Default values
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);
  const isDesktop = useSignal(true); // Default to desktop in SSR

  useVisibleTask$(() => {
    // Check the initial state
    isMobile.value = window.matchMedia('(max-width: 639px)').matches;
    isTablet.value = window.matchMedia(
      '(min-width: 640px) and (max-width: 1023px)',
    ).matches;
    isDesktop.value = window.matchMedia('(min-width: 1024px)').matches;

    // Setup listeners
    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const tabletQuery = window.matchMedia(
      '(min-width: 640px) and (max-width: 1023px)',
    );
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const updateMobile = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches;
    };
    const updateTablet = (e: MediaQueryListEvent) => {
      isTablet.value = e.matches;
    };
    const updateDesktop = (e: MediaQueryListEvent) => {
      isDesktop.value = e.matches;
    };

    mobileQuery.addEventListener('change', updateMobile);
    tabletQuery.addEventListener('change', updateTablet);
    desktopQuery.addEventListener('change', updateDesktop);

    return () => {
      mobileQuery.removeEventListener('change', updateMobile);
      tabletQuery.removeEventListener('change', updateTablet);
      desktopQuery.removeEventListener('change', updateDesktop);
    };
  });

  return { isMobile, isTablet, isDesktop };
}
