import { component$, useVisibleTask$ } from '@builder.io/qwik';
import {
  AnimComponent,
  ANIM_GREATER_THAN,
  ANIM_LESS_THAN,
  ANIM_GREATER_THAN_EQUAL_TO,
  ANIM_LESS_THAN_EQUAL_TO,
  ANIM_EQUAL_TO,
  ANIM_NOT_EQUAL_TO,
} from 'playcanvas';
import { useComponent } from '../hooks/use-component';
import { useParent } from '../context/use-parent';

interface AnimationState {
  name: string;
  speed?: number;
  loop?: boolean;
  defaultState?: boolean;
}

interface AnimationTransitionCondition {
  value: number;
  predicate:
    | typeof ANIM_GREATER_THAN
    | typeof ANIM_LESS_THAN
    | typeof ANIM_GREATER_THAN_EQUAL_TO
    | typeof ANIM_LESS_THAN_EQUAL_TO
    | typeof ANIM_EQUAL_TO
    | typeof ANIM_NOT_EQUAL_TO;
  parameterName: string;
}

interface AnimationTransition {
  from: string;
  to: string;
  time?: number;
  conditions?: AnimationTransitionCondition[];
  defaultTransition?: boolean;
}

interface AnimationLayer {
  name: string;
  states: AnimationState[];
  transitions: AnimationTransition[];
}

interface AnimationParameter {
  name: string;
  type: string;
  value: number;
}

interface PlayerAnimStateGraphData {
  layers: AnimationLayer[];
  parameters: {
    xDirection: AnimationParameter;
    zDirection: AnimationParameter;
  };
}

type AnimStateGraphProps = {
  data: PlayerAnimStateGraphData;
};

export const AnimStateGraph = component$<AnimStateGraphProps>(({ data }) => {
  useComponent('anim', {
    activate: true,
  });
  const parent = useParent();

  useVisibleTask$(({ track }) => {
    track(() => [parent.count]);
    const entity = parent.value;

    if (!entity) return;

    const anim: AnimComponent | undefined = entity.anim;

    if (!anim) return;

    anim!.loadStateGraph(data);
  });

  return null;
});
