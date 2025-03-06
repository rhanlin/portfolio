import { component$, PropFunction, Slot } from '@builder.io/qwik';
import { Asset, Entity as PcEntity } from 'playcanvas';
import { ComponentProps, useComponent } from '../hooks/use-component';
import { Container } from '../Container';

type RenderProps = ComponentProps & {
  type: string;
  asset?: Asset;
  onRenderAssetReady$?: PropFunction<(entity: PcEntity) => void>;
};

const RenderComponent = component$<ComponentProps>((props) => {
  useComponent('render', props);
  return null;
});

export const Render = component$<RenderProps>((props) => {
  // Render a container if the asset is a container
  if (props?.asset?.type === 'container') {
    return (
      <Container asset={props.asset} {...props}>
        <Slot />
      </Container>
    );
  }

  // Otherwise, render the component
  return <RenderComponent {...props} />;
});
