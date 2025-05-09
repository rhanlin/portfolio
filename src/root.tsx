import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import './global.css';
import { useI18n } from './i18n';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useI18n();
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link
          rel="manifest"
          href={`${import.meta.env.BASE_URL}manifest.json`}
        />
        {/* {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )} */}
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        {/* {!isDev && <ServiceWorkerRegister />} */}
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
