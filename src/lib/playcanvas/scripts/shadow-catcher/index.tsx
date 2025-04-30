import { component$, noSerialize } from '@builder.io/qwik';
import { Vec3, SHADOW_VSM_16F, SHADOWUPDATE_REALTIME } from 'playcanvas';
import { ShadowCatcher as ShadowCatcherScript } from 'playcanvas/scripts/esm/shadow-catcher.mjs';
import { Light, Script } from '~/lib/playcanvas/components';
import { Entity } from '../../Entity';

type ShadowCatcherProps = {
  width?: number;
  depth?: number;
  intensity?: number;
};

export const ShadowCatcher = component$<ShadowCatcherProps>((props) => {
  const { width = 2, depth = 2, intensity = 0.75 } = props;
  const scale = noSerialize(new Vec3(width, 1, depth));

  return (
    <Entity>
      <Light
        type="directional"
        castShadows={true}
        normalOffsetBias={0}
        shadowBias={0}
        shadowDistance={16}
        shadowResolution={1024}
        shadowType={SHADOW_VSM_16F}
        shadowUpdateMode={SHADOWUPDATE_REALTIME}
        vsmBlurSize={16}
        shadowIntensity={intensity}
        intensity={0}
      />
      <Script
        script={noSerialize(ShadowCatcherScript)}
        intensity={intensity}
        scale={scale}
      />
    </Entity>
  );
});
