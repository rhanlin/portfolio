import { component$, Slot } from '@builder.io/qwik';

interface GridContainerProps {
  class?: string;
}

export default component$<GridContainerProps>(({ class: className = '' }) => {
  return (
    <div class={`grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 ${className}`}>
      <Slot />
    </div>
  );
});
