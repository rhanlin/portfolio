import * as pc from 'playcanvas';

//--------------- POST EFFECT DEFINITION------------------------//
class WatercolorEffect extends pc.PostEffect {
  constructor(graphicsDevice, vs, fs) {
    super(graphicsDevice);

    this.shader = new pc.Shader(graphicsDevice, {
      attributes: {
        aPosition: pc.SEMANTIC_POSITION,
      },
      vshader: vs,
      fshader: fs,
    });
  }

  // Every post effect must implement the render method which
  // sets any parameters that the shader might require and
  // also renders the effect on the screen
  render(inputTarget, outputTarget, rect) {
    // Set the input render target to the shader. This is the image rendered from our camera
    this.device.scope.resolve('uColorBuffer').setValue(inputTarget.colorBuffer);

    // Draw a full screen quad on the output target. In this case the output target is the screen.
    // Drawing a full screen quad will run the shader that we defined above
    pc.drawFullscreenQuad(
      this.device,
      outputTarget,
      this.vertexBuffer,
      this.shader,
      rect,
    );
  }
}

//--------------- SCRIPT DEFINITION------------------------//
export class Watercolor extends pc.Script {
  /**
   * Vertex Shader
   * @type {Asset|null}
   * @assetType {Shader}
   * */
  vs = null;

  /**
   * Fragment Shader
   * @type {Asset|null}
   * @assetType {Shader}
   * */
  fs = null;

  initialize() {
    const effect = new WatercolorEffect(
      this.app.graphicsDevice,
      this.vs.resource,
      this.fs.resource,
    );

    // add the effect to the camera's postEffects queue
    const queue = this.entity.camera.postEffects;
    queue.addEffect(effect);

    // when the script is enabled add our effect to the camera's postEffects queue
    this.on('enable', function () {
      queue.addEffect(effect, false);
    });

    // when the script is disabled remove our effect from the camera's postEffects queue
    this.on('disable', function () {
      queue.removeEffect(effect);
    });
  }
}
