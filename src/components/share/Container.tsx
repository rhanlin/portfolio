import { component$, Slot } from '@builder.io/qwik';

interface ContainerProps {
  class?: string;
}

export default component$<ContainerProps>(({ class: className = '' }) => {
  return (
    <div class={`mx-auto my-0 max-w-[1240px] min-w-[375px] px-3 ${className}`}>
      <Slot />
    </div>
  );
});
