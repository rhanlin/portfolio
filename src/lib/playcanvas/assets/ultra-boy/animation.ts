import { Asset } from 'playcanvas';

export enum AnimationName {
  Idle = 'Idle',
  Talking = 'Talking',
  Dance = 'Dance',
  Walk = 'Walk',
}

const rootPath = 'ultra-boy';

const AnimationIdle = new Asset(`${rootPath}_AnimationIdle`, 'animation', {
  url: `/glb/${rootPath}/animations/Idle.glb`,
});
const AnimationTalking = new Asset(
  `${rootPath}_AnimationTalking`,
  'animation',
  {
    url: `/glb/${rootPath}/animations/Talking.glb`,
  },
);
const AnimationDance = new Asset(`${rootPath}_AnimationDance`, 'animation', {
  url: `/glb/${rootPath}/animations/Dance.glb`,
});
const AnimationWalk = new Asset(`${rootPath}_AnimationWalk`, 'animation', {
  url: `/glb/${rootPath}/animations/Walk.glb`,
});

export const PreloadAnimations = {
  AnimationIdle,
  AnimationTalking,
  AnimationDance,
  AnimationWalk,
};

export const ModelAnimationAssets = [
  {
    stateName: AnimationName.Idle,
    asset: AnimationIdle,
  },
  {
    stateName: AnimationName.Talking,
    asset: AnimationTalking,
  },
  {
    stateName: AnimationName.Dance,
    asset: AnimationDance,
  },
  {
    stateName: AnimationName.Walk,
    asset: AnimationWalk,
  },
];
