import { component$, useSignal } from '@builder.io/qwik';
import clsx from 'clsx';

interface BadgeProps {
  skill: string;
  logo: string;
  color: string;
  class?: string;
}

const Badge = component$<BadgeProps>(
  //https://img.shields.io/badge/-Playcanvas-303030?style=flat-square&logo=Playcanvas
  ({ skill, logo, color, class: customClass }) => {
    const error = useSignal(false);
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
      skill,
    )}-${color}?style=flat&logo=${encodeURIComponent(logo)}`;

    return badgeUrl && !error.value ? (
      <img
        src={badgeUrl}
        alt={skill}
        class={clsx('h-6 w-auto ', customClass)}
        onError$={() => (error.value = true)}
        width={24}
        height={24}
      />
    ) : (
      <span class="font-light bg-neutral-0/10 text-neutral-0">Badge</span>
    );
  },
);

export default Badge;
