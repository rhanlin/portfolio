import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();
  useVisibleTask$(() => {
    document.documentElement.style.setProperty(
      '--theme-primary-color',
      import.meta.env.VITE_PRIMARY_COLOR,
    );
  });
  return (
    <>
      <title>{head.title}</title>
      <meta charset="utf-8" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="viewport"
        content="initial-scale=1, viewport-fit=cover, user-scalable=no"
      />
      <meta name="theme-color" content={import.meta.env.VITE_PRIMARY_COLOR} />
      <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />
      <link rel="canonical" href={loc.url.href} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
