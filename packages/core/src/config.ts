export type ReducedMotionConfig = 'respect' | 'always' | 'never';

export interface ProXimateConfig {
  reducedMotion: ReducedMotionConfig;
}

let currentConfig: ProXimateConfig = {
  reducedMotion: 'respect',
};

export function configure(options: Partial<ProXimateConfig>) {
  currentConfig = { ...currentConfig, ...options };
}

export function getConfig(): ProXimateConfig {
  return currentConfig;
}

export function shouldReduceMotion(): boolean {
  if (currentConfig.reducedMotion === 'always') return true;
  if (currentConfig.reducedMotion === 'never') return false;
  
  // 'respect' mode
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}
