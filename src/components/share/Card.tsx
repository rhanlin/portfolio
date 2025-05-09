import { $, component$, type PropFunction, Slot } from '@builder.io/qwik';
import clsx from 'clsx';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
  base: '',
  variants: {
    variant: {
      '30-50-50-30':
        'rounded-tl-[30px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[30px] ',
      '50-30-30-50':
        'rounded-tl-[50px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[50px] ',
      '50-30-50-30':
        'rounded-tl-[50px] rounded-tr-[30px] rounded-bl-[50px] rounded-br-[30px] ',
      '30-50-30-50':
        'rounded-tl-[30px] rounded-tr-[50px] rounded-bl-[30px] rounded-br-[50px] ',
      '50-30-30-30':
        'rounded-tl-[50px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[30px] ',
      '30-50-30-30':
        'rounded-tl-[30px] rounded-tr-[50px] rounded-bl-[30px] rounded-br-[30px] ',
      '30-30-30-30': 'rounded-[30px]',
    },
  },
  defaultVariants: {
    variant: '30-30-30-30',
  },
});

type CardProps = VariantProps<typeof cardVariants> & {
  class?: string;
  wrapperClass?: string;
  backgroundImage?: string;
  onClick$?: PropFunction<(param: any) => any>;
};

export default component$(
  ({
    class: className,
    wrapperClass,
    variant,
    backgroundImage,
    onClick$ = $(() => {}),
  }: CardProps) => {
    return (
      <div
        class={clsx(
          cardVariants({ variant }),
          'card-bg-gradient relative shadow-md flex justify-center items-center',
          wrapperClass,
        )}
      >
        <div
          class={clsx(
            cardVariants({ variant }),
            'w-[calc(100%-2px)] h-[calc(100%-2px)] bg-background overflow-hidden',
          )}
        >
          <div
            class={clsx(
              'px-6 py-6 lg:px-15 lg:py-10 w-full h-full bg-cover cursor-pointer',
              className,
            )}
            style={
              backgroundImage
                ? { backgroundImage: `url(${backgroundImage})` }
                : {}
            }
            onClick$={onClick$}
          >
            <Slot />
          </div>
        </div>
      </div>
    );
  },
);
