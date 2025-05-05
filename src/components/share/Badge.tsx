import { component$, useSignal } from '@builder.io/qwik';
import clsx from 'clsx';

type BadgeProps = {
  skill: string;
  class?: string;
  url: string;
};

const Badge = component$<BadgeProps>(({ skill, url, class: className }) => {
  const error = useSignal(false);

  return !error.value ? (
    <img
      src={url}
      alt={skill}
      class={clsx('h-6 w-auto ', className)}
      onError$={() => (error.value = true)}
      width={24}
      height={24}
    />
  ) : (
    <span class="font-light bg-neutral-10/10 text-neutral-10">Badge</span>
  );
});

export default Badge;
