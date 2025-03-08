import { ANIM_EQUAL_TO, ANIM_GREATER_THAN, ANIM_LESS_THAN } from 'playcanvas';
enum AnimationName {
  Idle = 'Idle',
  BackwardDiagonalLeft = 'Back_Right',
  BackwardDiagonalRight = 'Back_Left',
  Backward = 'Back',
  ForwardDiagonalLeft = 'Forward_Left',
  ForwardDiagonalRight = 'Forward_Right',
  Forward = 'Forward',
  StrafeLeft = 'Left',
  StrafeRight = 'Right',
}

export const AnimStateGraphData = {
  layers: [
    {
      name: 'Base',
      states: [
        {
          name: 'START',
        },
        {
          name: 'ANY',
        },
        {
          name: 'END',
        },
        {
          name: AnimationName.Idle,
          speed: 1.0,
          loop: true,
          defaultState: true,
        },
        {
          name: AnimationName.Forward,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.Backward,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.StrafeLeft,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.StrafeRight,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.ForwardDiagonalLeft,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.ForwardDiagonalRight,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.BackwardDiagonalRight,
          speed: 1.0,
          loop: true,
        },
        {
          name: AnimationName.BackwardDiagonalLeft,
          speed: 1.0,
          loop: true,
        },
      ],
      transitions: [
        {
          from: 'START',
          to: AnimationName.Idle,
          defaultTransition: true,
        },
        {
          from: 'ANY',
          to: AnimationName.Idle,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_EQUAL_TO,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_EQUAL_TO,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.ForwardDiagonalRight,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_GREATER_THAN,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_GREATER_THAN,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.ForwardDiagonalLeft,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_LESS_THAN,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_GREATER_THAN,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.Forward,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_EQUAL_TO,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_GREATER_THAN,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.StrafeRight,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_GREATER_THAN,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_EQUAL_TO,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.StrafeLeft,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_LESS_THAN,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_EQUAL_TO,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.BackwardDiagonalRight,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_GREATER_THAN,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_LESS_THAN,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.BackwardDiagonalLeft,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_LESS_THAN,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_LESS_THAN,
              parameterName: 'zDirection',
            },
          ],
        },
        {
          from: 'ANY',
          to: AnimationName.Backward,
          time: 0.15,
          conditions: [
            {
              value: 0,
              predicate: ANIM_EQUAL_TO,
              parameterName: 'xDirection',
            },
            {
              value: 0,
              predicate: ANIM_LESS_THAN,
              parameterName: 'zDirection',
            },
          ],
        },
      ],
    },
  ],
  parameters: {
    xDirection: {
      name: 'xDirection',
      type: 'FLOAT',
      value: 0,
    },
    zDirection: {
      name: 'zDirection',
      type: 'FLOAT',
      value: 0,
    },
  },
};
