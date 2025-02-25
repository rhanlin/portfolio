import { StandardMaterial } from 'playcanvas';
import {
  noSerialize,
  NoSerialize,
  useSignal,
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
  const app = useApp();

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

  if (material.value) {
    Object.assign(material.value, props, colorProps);
    material.value.update();
  }

  useVisibleTask$(({ track }) => {
    track(() => app.count);
    track(() => props);

    if (!app.value) return;

    // 過濾 `props` 只更新 `material` 內部存在的屬性
    if (material.value) {
      const filteredProps = Object.fromEntries(
        Object.entries({ ...props, ...colorProps }).filter(
          ([key]) => key in material.value!,
        ),
      );

      Object.assign(material.value, filteredProps);
      if (material.value) {
        material.value.update();
      }
    }
  });

  // 清理材質
  useVisibleTask$(() => {
    return () => {
      if (material.value) {
        material.value.destroy();
      }
    };
  });

  return material.value;
};
