import { component$, Signal, Slot } from '@builder.io/qwik';
import { Asset } from 'playcanvas';
import { ComponentProps, useComponent } from '../hooks/use-component';
import { Container } from '../Container';

type RenderProps = ComponentProps & {
  type: string;
  asset?: Signal<Asset>;
};

const RenderComponent = component$<ComponentProps>((props) => {
  useComponent('render', props);
  return null;
});

export const Render = component$<RenderProps>((props) => {
  // Render a container if the asset is a container
  if (props?.asset?.value?.type === 'container') {
    return (
      <Container asset={props.asset.value}>
        <Slot />
      </Container>
    );
  }

  // Otherwise, render the component
  return <RenderComponent {...props} />;
});
