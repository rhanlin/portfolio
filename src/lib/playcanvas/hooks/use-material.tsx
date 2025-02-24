import { StandardMaterial } from 'playcanvas';
import {
  noSerialize,
  NoSerialize,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useApp } from '../context/use-app';
import { useColors } from './use-color';

type WritableKeys<T> = {
  [K in keyof T]: T[K] extends { readonly [key: string]: unknown } ? never : K;
}[keyof T];

type MaterialProps = Pick<StandardMaterial, WritableKeys<StandardMaterial>>;

export const useMaterial = (
  props: Partial<MaterialProps>,
): NoSerialize<StandardMaterial> => {
  const app = useApp().value;

  if (!app) return;

  // 處理顏色屬性
  const colorProps = useColors(props, [
    'ambient',
    'attenuation',
    'diffuse',
    'emissive',
    'sheen',
    'specular',
  ]);

  // 初始化材質
  const material = useSignal<NoSerialize<StandardMaterial>>(
    noSerialize(new StandardMaterial()),
  );

  useTask$(() => {
    // 只在 `app` 存在時創建材質
    if (!app) return;

    Object.assign(material, props, colorProps);

    if (material.value) {
      material.value.update();
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => app);
    track(() => props);

    if (!app) return;

    // 過濾 `props` 只更新 `material` 內部存在的屬性
    const filteredProps = Object.fromEntries(
      Object.entries({ ...props, ...colorProps }).filter(
        ([key]) => key in material,
      ),
    );

    Object.assign(material, filteredProps);
    if (material.value) {
      material.value.update();
    }
  });

  // 清理材質
  useTask$(() => {
    return () => {
      if (material.value) {
        material.value.destroy();
      }
    };
  });

  return noSerialize(material.value);
};
