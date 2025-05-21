import { component$, useSignal, Slot } from '@builder.io/qwik';
import { useMetaTheme } from '~/context/MetaThemeContext';
import clsx from 'clsx';
export default component$<{ color: string; class?: string }>(
  ({ color, class: className }) => {
    const ref = useSignal<HTMLDivElement>();
    useMetaTheme(ref, { color });

    return (
      <section
        id={color}
        class={clsx(className, 'w-[100vw]')}
        style={{ backgroundColor: color }}
        ref={ref}
      >
        <Slot />
      </section>
    );
  },
);
