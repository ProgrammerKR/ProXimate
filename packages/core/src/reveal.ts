import { animate, AnimateOptions } from './animate';

export interface RevealOptions extends AnimateOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

export function reveal(
  selectorOrElement: string | HTMLElement,
  options: RevealOptions = {}
) {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return;
  }

  const elements = typeof selectorOrElement === 'string'
    ? Array.from(document.querySelectorAll(selectorOrElement)) as HTMLElement[]
    : [selectorOrElement];

  const observerOptions = {
    threshold: options.threshold ?? 0.2,
    rootMargin: options.rootMargin ?? '0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target as HTMLElement, options);
        if (options.once !== false) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  elements.forEach(el => {
    // Initial invisible state could be handled via CSS or here
    observer.observe(el);
  });

  return {
    disconnect: () => observer.disconnect()
  };
}
