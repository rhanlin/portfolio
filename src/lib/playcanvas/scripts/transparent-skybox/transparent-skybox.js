import { Script, LAYERID_SKYBOX } from 'playcanvas';

export class TransparentSkybox extends Script {
  initialize() {
    this.entity.camera.layers = this.entity.camera.layers.filter((l) => {
      return l !== LAYERID_SKYBOX;
    });
  }
}
