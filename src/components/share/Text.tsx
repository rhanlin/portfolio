import { component$, Slot } from '@builder.io/qwik';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';

const textVariants = tv({
  base: '',
  variants: {
    variant: {
      h1: 'header header-1',
      h2: 'header header-2',
      h3: 'header header-3',
      h4: 'header header-4',
      h5: 'header header-5',
      p: 'paragraph paragraph-1',
      label: 'paragraph paragraph-2',
      span: 'paragraph paragraph-3',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'label' | 'span';

type TextProps = {
  as?: TextTag;
  class?: string;
};

const Text = component$<TextProps>(({ as = 'p', class: className }) => {
  const Component = as;
  return (
    <Component class={clsx(textVariants({ variant: as }), className)}>
      <Slot />
    </Component>
  );
});

export default Text;
