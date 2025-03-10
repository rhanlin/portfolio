import { Asset } from 'playcanvas';

const rootPath = 'meta-human';

const TextureBodyHair = new Asset('TextureAmbient', 'texture', {
  url: `/glb/${rootPath}/texture/Body_hair.jpeg`,
});
const TextureBodyEye = new Asset('TextureDiffuse', 'texture', {
  url: `/glb/${rootPath}/texture/Body_eye.jpeg`,
});
const TextureBodySkin = new Asset('TextureEmissive', 'texture', {
  url: `/glb/${rootPath}/texture/Body_skin.jpeg`,
});
const TextureOutfitBottom = new Asset('TextureNormalMap', 'texture', {
  url: `/glb/${rootPath}/texture/Outfit_bottom.png`,
});
const TextureOutfitFootwear = new Asset('TextureNormalMap', 'texture', {
  url: `/glb/${rootPath}/texture/Outfit_footwear.jpeg`,
});
const TextureOutfitTop = new Asset('TextureNormalMap', 'texture', {
  url: `/glb/${rootPath}/texture/Outfit_top.jpeg`,
});
const TextureBodyFace = new Asset('TextureNormalMap', 'texture', {
  url: `/glb/${rootPath}/texture/Body_face.jpeg`,
});
const TextureBodyTeeth = new Asset('TextureNormalMap', 'texture', {
  url: `/glb/${rootPath}/texture/Body_teeth.jpeg`,
});

export const PreloadTextures = {
  TextureBodyHair,
  TextureBodyEye,
  TextureBodySkin,
  TextureOutfitBottom,
  TextureOutfitFootwear,
  TextureOutfitTop,
  TextureBodyFace,
  TextureBodyTeeth,
};
