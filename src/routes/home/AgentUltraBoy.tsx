import { Entity as pcEntity } from 'playcanvas';
import {
  component$,
  noSerialize,
  PropFunction,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Entity } from '~/lib/playcanvas';
import {
  Render,
  UpdateMaterial,
  Animation,
  AnimStateGraph,
} from '~/lib/playcanvas/components';
import { useModel } from '~/lib/playcanvas/hooks/use-model';
import { useApp } from '~/lib/playcanvas/context/use-app';
import { useMaterial } from '~/lib/playcanvas/hooks/use-material';
import { EntityProps } from '~/lib/playcanvas/Entity';
import { AnimStateGraphData, CiberBoyMaterialConfig } from '~/constants/agent';
import { ModelAnimationAssets } from '~/lib/playcanvas/assets/ultra-boy/animation';

type AgentUltraBoyProps = EntityProps & {
  onModelReady$?: PropFunction<(entity: pcEntity) => void>;
};
const AgentUltraBoy = component$<AgentUltraBoyProps>(
  ({ onModelReady$, ...props }) => {
    const app = useApp();
    if (!app.value) return null;

    const entitySig = useSignal<pcEntity | null>(null);

    useVisibleTask$(({ track }) => {
      track(() => entitySig.value);
      if (!entitySig.value) return;

      if (onModelReady$) {
        onModelReady$(entitySig.value);
      }
    });

    const { data: asset, isPending } = useModel('/glb/ultra-boy/model.glb');

    const material = useMaterial(CiberBoyMaterialConfig);

    return (
      <Entity {...props}>
        {asset.value && (
          <>
            <Render
              type="asset"
              asset={asset.value}
              onRenderAssetReady$={(entity) => (entitySig.value = entity)}
            >
              {
                <>
                  <AnimStateGraph data={AnimStateGraphData} />
                  {ModelAnimationAssets.map((animationAsset) => (
                    <Animation
                      key={animationAsset.asset.name}
                      stateName={animationAsset.stateName}
                      asset={noSerialize(animationAsset.asset)}
                    />
                  ))}
                </>
              }
            </Render>
            {material && (
              <UpdateMaterial target="Ciber Boy" material={material} />
            )}
          </>
        )}
      </Entity>
    );
  },
);

export default AgentUltraBoy;
