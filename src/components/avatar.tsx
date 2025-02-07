import { component$, useSignal } from '@builder.io/qwik';
import { tv } from 'tailwind-variants';

const avatarVariants = tv({
  base: 'relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200',
  variants: {
    size: {
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-24 h-24 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  class?: string;
}

const Avatar = component$<AvatarProps>(
  ({ src, alt = 'Avatar', size = 'md', class: customClass }) => {
    const error = useSignal(false);

    return (
      <div class={avatarVariants({ size, class: customClass })}>
        {src && !error.value ? (
          <img
            src={src}
            alt={alt}
            class="w-full h-full object-cover rounded-full"
            onError$={() => (error.value = true)}
            width={100}
            height={100}
          />
        ) : (
          <span class="text-gray-600 font-medium">{alt.charAt(0)}</span>
        )}
      </div>
    );
  },
);

export default Avatar;
