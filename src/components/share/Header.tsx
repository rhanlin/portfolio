import { component$, Slot } from '@builder.io/qwik';
import { Link, RouteLocation, useLocation } from '@builder.io/qwik-city';
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

const LocaleLink = ({
  locale,
  location,
}: {
  locale: string;
  location: RouteLocation;
}) => (
  <li>
    {locale === location.params.locale ? (
      <div>{locale}</div>
    ) : (
      <a
        href={`/${locale}${location.url.pathname.slice(3)}${
          location.url.search
        }`}
      >
        {locale}
      </a>
    )}
  </li>
);

const Header = component$(() => {
  const location = useLocation();
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
          <div class="flex">
            <Text as="h4">Rhan0</Text>
            <Text as="h4" class="text-neutral-10/25">
              {`, ${$localize`Front-end`}`}
            </Text>
          </div>
          <ul class="flex">
            {NavigationInfo.map((item) => (
              <li key={item.key}>
                <NavItem href={item.key}>{item.title}</NavItem>
              </li>
            ))}

            <li>
              <span>|</span>
            </li>

            <LocaleLink locale="en" location={location} />
            <LocaleLink locale="tw" location={location} />
          </ul>
        </div>
      </div>
    </header>
  );
});

export default Header;
