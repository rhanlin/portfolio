import { component$, Slot } from '@builder.io/qwik';
import Text from './Text';
import Button from './Button';

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
      class="mr-9 group"
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

const NavigationInfo = [
  {
    key: 'present',
    title: 'Present',
  },
  {
    key: 'skills',
    title: 'Skills',
  },
  {
    key: 'contact',
    title: 'Contact',
  },
];
const Header = component$(() => {
  return (
    <div class="w-full pt-19 pb-14">
      <div class="flex justify-between my-6">
        <div class="flex">
          <Text as="h4">Rhan0</Text>
          <Text as="h4" class="text-neutral-10/25">
            , Front-end
          </Text>
        </div>
        <ul class="flex">
          {NavigationInfo.map((item) => (
            <li key={item.key}>
              <NavItem href={item.key}>{item.title}</NavItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default Header;
