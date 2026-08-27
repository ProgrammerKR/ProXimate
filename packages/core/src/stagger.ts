import { animate, AnimateOptions, AnimationInstance } from './animate';

export interface StaggerOptions extends Omit<AnimateOptions, 'direction'> {
  stagger?: number;
  staggerDirection?: 'forward' | 'reverse' | 'center-out' | 'edges-in';
  direction?: AnimateOptions['direction'];
}

export function stagger(
  selectorOrElements: string | HTMLElement[],
  options: StaggerOptions = {}
): AnimationInstance[] {
  const elements = typeof selectorOrElements === 'string'
    ? Array.from(document.querySelectorAll(selectorOrElements)) as HTMLElement[]
    : selectorOrElements;

  const staggerMs = options.stagger ?? 50;
  const staggerDir = options.staggerDirection ?? 'forward';
  const total = elements.length;

  return elements.map((el, i) => {
    let index = i;
    
    if (staggerDir === 'reverse') {
      index = total - 1 - i;
    } else if (staggerDir === 'center-out') {
      const center = (total - 1) / 2;
      index = Math.abs(center - i);
    } else if (staggerDir === 'edges-in') {
      const center = (total - 1) / 2;
      index = center - Math.abs(center - i);
    }

    const calculatedDelay = (options.delay || 0) + (index * staggerMs);

    return animate(el, {
      ...options,
      delay: calculatedDelay
    });
  });
}
