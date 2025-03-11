import { noSerialize, NoSerialize, useStore, useTask$ } from '@builder.io/qwik';
import {
  Color,
  PIXELFORMAT_111110F,
  PIXELFORMAT_RGBA16F,
  PIXELFORMAT_RGBA32F,
  SSAOTYPE_NONE,
  SSAOTYPE_LIGHTING,
  SSAOTYPE_COMBINE,
  TONEMAP_LINEAR,
  TONEMAP_FILMIC,
  TONEMAP_HEJL,
  TONEMAP_ACES,
  TONEMAP_ACES2,
  TONEMAP_NEUTRAL,
  PIXELFORMAT_RGBA8,
} from 'playcanvas';
import { useApp } from '../context/use-app';

enum RenderFormat {
  RGBA8 = PIXELFORMAT_RGBA8,
  RG11B10 = PIXELFORMAT_111110F,
  RGBA16 = PIXELFORMAT_RGBA16F,
  RGBA32 = PIXELFORMAT_RGBA32F,
}
export interface PostControls {
  lighting: {
    exposure: number;
    skyBoxIntensity: number;
  };
  rendering: {
    renderFormats: RenderFormat[];
    stencil: boolean;
    renderTargetScale: number;
    samples: number;
    sceneColorMap: boolean;
    sceneDepthMap: boolean;
    toneMapping:
      | typeof TONEMAP_LINEAR
      | typeof TONEMAP_FILMIC
      | typeof TONEMAP_HEJL
      | typeof TONEMAP_ACES
      | typeof TONEMAP_ACES2
      | typeof TONEMAP_NEUTRAL;
    sharpness: number;
    renderFormatFallback0: number;
    renderFormatFallback1: number;
  };
  ssao: {
    type:
      | typeof SSAOTYPE_NONE
      | typeof SSAOTYPE_LIGHTING
      | typeof SSAOTYPE_COMBINE;
    blurEnabled: boolean;
    randomize: boolean;
    intensity: number;
    radius: number;
    samples: number;
    power: number;
    minAngle: number;
    scale: number;
  };
  bloom: {
    enabled: boolean;
    intensity: number;
    blurLevel: number;
  };
  grading: {
    enabled: boolean;
    brightness: number;
    contrast: number;
    saturation: number;
    tint: NoSerialize<Color>;
  };
  vignette: {
    enabled: boolean;
    intensity: number;
    inner: number;
    outer: number;
    curvature: number;
  };
  taa: {
    enabled: boolean;
    jitter: number;
  };
  fringing: {
    enabled: boolean;
    intensity: number;
  };
  dof: {
    enabled: boolean;
    nearBlur: boolean;
    focusDistance: number;
    focusRange: number;
    blurRadius: number;
    blurRings: number;
    blurRingPoints: number;
    highQuality: boolean;
  };
}

export const usePostControls = (): PostControls => {
  const app = useApp();

  const tint = useStore<{ value: NoSerialize<Color>; count: number }>({
    value: noSerialize(new Color()),
    count: 0,
  });

  useTask$(async ({ track }) => {
    track(() => app.id);
    tint.value = noSerialize(new Color());
    tint.count += 1;
  });

  const lighting = useStore({
    exposure: 1.21,
    skyBoxIntensity: 1.02,
  });

  const rendering = useStore({
    renderFormats: [
      PIXELFORMAT_111110F,
      PIXELFORMAT_RGBA16F,
      PIXELFORMAT_RGBA32F,
    ],
    stencil: false,
    renderTargetScale: 1.0,
    samples: 4,
    sceneColorMap: false,
    sceneDepthMap: false,
    toneMapping: TONEMAP_ACES2,
    sharpness: 0.0,
  });

  const ssao = useStore({
    type: SSAOTYPE_NONE,
    blurEnabled: true,
    randomize: false,
    intensity: 0.5,
    radius: 30,
    samples: 12,
    power: 6,
    minAngle: 10,
    scale: 1,
  });

  const bloom = useStore({
    enabled: true,
    intensity: 0.05,
    blurLevel: 10,
  });

  const grading = useStore({
    enabled: false,
    brightness: 0.83,
    contrast: 1.06,
    saturation: 1.2,
    tint: '#fed',
  });

  const vignette = useStore({
    enabled: true,
    intensity: 1,
    inner: 0.25,
    outer: 1.52,
    curvature: 0.78,
  });

  const taa = useStore({
    enabled: false,
    jitter: 0.4,
  });

  const fringing = useStore({
    enabled: true,
    intensity: 10,
  });

  const dof = useStore({
    enabled: false,
    nearBlur: false,
    focusDistance: 100,
    focusRange: 10,
    blurRadius: 3,
    blurRings: 4,
    blurRingPoints: 5,
    highQuality: true,
  });

  if (tint.value) {
    tint.value.fromString(grading.tint);
  }

  return {
    lighting,
    rendering: {
      ...rendering,
      renderFormatFallback0: 12,
      renderFormatFallback1: 14,
      sceneColorMap: false,
      sceneDepthMap: false,
    },
    ssao: {
      ...ssao,
      blurEnabled: true,
    },
    bloom,
    grading: {
      ...grading,
      tint: tint.value,
    },
    vignette,
    taa,
    fringing,
    dof,
  };
};
