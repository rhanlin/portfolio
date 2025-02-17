import { Script as PcScript } from 'playcanvas';
import { component$, NoSerialize } from '@builder.io/qwik';
import { useScript } from '../hooks/use-script';

type ScriptProps = {
  script: new (...args: unknown[]) => NoSerialize<PcScript>;
  [key: string]: unknown;
};

export const Script = component$<ScriptProps>(({ script, ...props }) => {
  if (!script) return;
  useScript(script, props);

  return null;
});
