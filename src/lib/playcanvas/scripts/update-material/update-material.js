import { Script, StandardMaterial } from 'playcanvas';

export class UpdateMaterial extends Script {
  /** @type {string} */
  target = '';

  /** @type {StandardMaterial|null} */
  material = null;

  initialize() {
    if (this.material) {
      this.entity.findComponents('render').forEach((render) => {
        if (render.entity.name === this.target) {
          render.meshInstances.forEach((meshInstance) => {
            meshInstance.material = props.material;
            meshInstance.material.update();
          });
        }
      });
    }
  }
}
