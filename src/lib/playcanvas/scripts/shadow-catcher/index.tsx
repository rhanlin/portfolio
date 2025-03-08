import { component$, noSerialize } from '@builder.io/qwik';
import { ShadowCatcher as ShadowCatcherScript } from './shadow-catcher';
import { Script } from '~/lib/playcanvas/components';

export const ShadowCatcher = component$<Record<string, unknown>>((props) => {
  return <Script script={noSerialize(ShadowCatcherScript)} {...props} />;
});
