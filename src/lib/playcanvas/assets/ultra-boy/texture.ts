import { Asset } from 'playcanvas';

const rootPath = 'ultra-boy';

const TextureAmbient = new Asset('TextureAmbient', 'texture', {
  url: `/glb/${rootPath}/texture/Texture_Body_metallicRoughness.png`,
});
const TextureDiffuse = new Asset('TextureDiffuse', 'texture', {
  url: `/glb/${rootPath}/texture/Texture_Body_baseColor.jpeg`,
});
const TextureEmissive = new Asset('TextureEmissive', 'texture', {
  url: `/glb/${rootPath}/texture/Texture_Body_emissive.jpeg`,
});
const TextureNormalMap = new Asset('TextureNormalMap', 'texture', {
  url: `/glb/${rootPath}/texture/Texture_Body_normal.png`,
});

export const PreloadTextures = {
  TextureAmbient,
  TextureDiffuse,
  TextureEmissive,
  TextureNormalMap,
};
