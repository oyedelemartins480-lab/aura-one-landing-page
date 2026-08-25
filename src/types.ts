export interface ProductColor {
  id: string;
  name: string;
  subname: string;
  hex: string;
  accentHex: string;
  bodyColor: string;
  metalColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  glowColor: string;
  description: string;
}

export type FinishType = 'matte' | 'brushed' | 'ceramic';

export interface CameraStage {
  id: number;
  tag: string;
  title: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  rotationOffset: [number, number, number];
  focusPart?: 'body' | 'core' | 'dial' | 'base';
}

export interface ProductSpec {
  category: string;
  items: { label: string; value: string; detail?: string }[];
}

export interface ProductFeature {
  id: string;
  badge: string;
  title: string;
  description: string;
  metric: { value: string; label: string };
  highlights: string[];
  iconName: 'Activity' | 'Cpu' | 'Radio' | 'Shield' | 'Zap' | 'Volume2';
}

export interface ViewportMode {
  isFreeOrbit: boolean;
  isExploded: boolean;
  activeStageIndex: number;
  finish: FinishType;
  selectedColor: ProductColor;
  autoRotate: boolean;
}
