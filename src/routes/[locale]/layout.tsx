import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/share/Header';
import type { RequestHandler } from '@builder.io/qwik-city';
import { extractLang } from '~/i18n';
import { MetaThemeProvider } from '~/context/MetaThemeContext';
import Container from '~/components/share/Container';
import ColorSection from '~/components/share/ColorSection';

const locales = new Set(['en', 'tw']);

export const onGet: RequestHandler = async ({
  request,
  url,
  redirect,
  pathname,
  params,
  locale,
  cacheControl,
}) => {
  if (locales.has(params.locale)) {
    // Set the locale for this request
    // TODO be case-insensitive
    locale(params.locale);
  } else {
    // Redirect to the correct locale
    const guessedLocale = extractLang(request, url);
    let path;
    if (
      params.locale === '__' ||
      /^[a-z][a-z](-[a-z][a-z])?/i.test(params.locale)
    ) {
      // invalid locale
      // TODO a better way to replace the locale parameter that supports a base path
      path = '/' + pathname.split('/').slice(2).join('/');
    } else {
      // no locale
      path = pathname;
    }
    throw redirect(301, `/${guessedLocale}${path}${url.search}`);
  }

  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <MetaThemeProvider>
        <ColorSection color="#09050f" class="py-2 md:py-2.5">
          <Container>
            <Header />
          </Container>
        </ColorSection>
        <main>
          <Slot />
        </main>
        <footer></footer>
      </MetaThemeProvider>
    </>
  );
});
