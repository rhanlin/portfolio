import {
  component$,
  useSignal,
  useOnWindow,
  $,
  type PropFunction,
  useTask$,
} from '@builder.io/qwik';
import { type RouteLocation } from '@builder.io/qwik-city';
import Text from './Text';

type LanguagePopoverProps = {
  location: RouteLocation;
  isOpen: boolean;
  onClose$: PropFunction<(param: any) => any>;
  buttonRef: { value: HTMLButtonElement | undefined };
};

const LocaleLink = ({
  locale,
  location,
  onClose$,
}: {
  locale: string;
  location: RouteLocation;
  onClose$: PropFunction<(param: any) => any>;
}) => (
  <li class="group px-4 py-2 cursor-pointer hover:bg-neutral-10/5 transition-colors">
    {locale === location.params.locale ? (
      <Text as="label" class="text-neutral-10/50">
        {locale === 'en' ? 'English' : '繁體中文'}
      </Text>
    ) : (
      <a
        href={`/${locale}${location.url.pathname.slice(3)}${location.url.search}`}
        onClick$={onClose$}
      >
        <Text
          as="label"
          class="text-neutral-10/20 group-active:text-neutral-10/50 group-hover:text-neutral-10/30 group-disabled:text-neutral-10/10 cursor-pointer"
        >
          {locale === 'en' ? 'English' : '繁體中文'}
        </Text>
      </a>
    )}
  </li>
);

const LanguagePopover = component$<LanguagePopoverProps>(
  ({ location, isOpen, onClose$, buttonRef }) => {
    const popoverRef = useSignal<HTMLDivElement>();
    const position = useSignal({ top: 0, left: 0 });

    const updatePosition = $(() => {
      if (buttonRef.value && popoverRef.value) {
        const buttonRect = buttonRef.value.getBoundingClientRect();
        const popoverRect = popoverRef.value.getBoundingClientRect();

        position.value = {
          top: buttonRect.bottom + window.scrollY + 20,
          left: buttonRect.right - popoverRect.width + window.scrollX,
        };
      }
    });

    useOnWindow('resize', updatePosition);

    useTask$(({ track }) => {
      track(() => [buttonRef.value, popoverRef.value]);
      if (buttonRef.value && popoverRef.value) {
        updatePosition();
      }
    });

    if (!isOpen) return null;

    return (
      <div
        ref={popoverRef}
        class="fixed bg-background border border-neutral-10/20 rounded-lg shadow-lg z-50 min-w-[8rem]"
        style={{
          top: `${position.value.top}px`,
          left: `${position.value.left}px`,
        }}
      >
        <ul class="py-2">
          <LocaleLink locale="en" location={location} onClose$={onClose$} />
          <LocaleLink locale="tw" location={location} onClose$={onClose$} />
        </ul>
      </div>
    );
  },
);

export default LanguagePopover;
