import { component$, Slot, type QwikIntrinsicElements } from '@builder.io/qwik';
import { tv, type VariantProps } from 'tailwind-variants';
import clsx from 'clsx';

const buttonVariants = tv({
  base: 'button',
  variants: {
    variant: {
      default:
        'text-sm font-medium bg-neutral-10/20 active:bg-neutral-10/50 hover:bg-neutral-10/30 disabled:bg-neutral-10/10',
      icon: 'border border-neutral-10/50 bg-neutral-10/20 active:bg-neutral-10/50 hover:bg-neutral-10/30 disabled:bg-neutral-10/10',
      ghost: '',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'size-10',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonTag = 'button' | 'a';

type ButtonProps<T extends ButtonTag> = {
  as?: T;
  class?: string;
} & VariantProps<typeof buttonVariants> &
  (T extends 'a'
    ? Omit<QwikIntrinsicElements['a'], 'type'>
    : QwikIntrinsicElements['button']);

const Button = component$<ButtonProps<ButtonTag>>(
  ({ class: className, variant, size, as = 'button', ...props }) => {
    const Component = as as keyof QwikIntrinsicElements;

    return (
      <Component
        {...(props as any)}
        class={clsx(buttonVariants({ variant, size }), className)}
      >
        <Slot />
      </Component>
    );
  },
);

export default Button;
