import { $, component$, Slot, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import LanguageSVG from '~/assets/icons/language.svg?component';
import Text from './Text';
import Button from './Button';
import LanguagePopover from './LanguagePopover';

type NavItemProps = {
  href: string;
};

const NavItem = component$<NavItemProps>(({ href }) => {
  return (
    <Button
      as="a"
      href={`#${href}`}
      variant="ghost"
      size="custom"
      class="group"
    >
      <Text
        as="h4"
        class="text-neutral-10/20 group-active:text-neutral-10/50 group-hover:text-neutral-10/30 group-disabled:text-neutral-10/10"
      >
        <Slot />
      </Text>
    </Button>
  );
});

const LanguagePopoverButton = component$(() => {
  const isOpen = useSignal(false);
  const location = useLocation();
  const buttonRef = useSignal<HTMLButtonElement>();

  return (
    <>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        class="group w-6 h-6"
        onClick$={() => (isOpen.value = !isOpen.value)}
      >
        <LanguageSVG
          class="text-neutral-10/20 group-active:text-neutral-10/50 group-hover:text-neutral-10/30 group-disabled:text-neutral-10/10"
          width={24}
          height={24}
        />
      </Button>
      <LanguagePopover
        location={location}
        isOpen={isOpen.value}
        onClose={$(() => (isOpen.value = false))}
        buttonRef={buttonRef}
      />
    </>
  );
});

const Header = component$(() => {
  const NavigationInfo = [
    {
      key: 'present',
      title: $localize`Present`,
    },
    {
      key: 'skills',
      title: $localize`Skills`,
    },
    {
      key: 'contact',
      title: $localize`Contact`,
    },
  ];

  return (
    <header>
      <div class="w-full pt-19 pb-14">
        <div class="flex justify-between my-6">
          <div class="flex items-center">
            <Text as="h4">Rhan0</Text>
            <Text as="h4" class="text-neutral-10/25">
              {`, ${$localize`Front-end`}`}
            </Text>
          </div>
          <ul class="flex items-center">
            {NavigationInfo.map((item) => (
              <li key={item.key} class="mr-9">
                <NavItem href={item.key}>{item.title}</NavItem>
              </li>
            ))}

            <li class="mr-9">
              <span class="text-neutral-10/20">|</span>
            </li>

            <li class="flex items-center">
              <LanguagePopoverButton />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
});

export default Header;
