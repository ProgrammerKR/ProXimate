import { describe, it, expect, beforeEach } from 'vitest';
import { configure, getConfig, shouldReduceMotion } from '../src/config';
import { animate } from '../src/animate';

describe('ProXimate Configuration', () => {
  beforeEach(() => {
    configure({ reducedMotion: 'respect' });
  });

  it('updates configuration correctly', () => {
    configure({ reducedMotion: 'always' });
    expect(getConfig().reducedMotion).toBe('always');
  });

  it('respects shouldReduceMotion when set to always', () => {
    configure({ reducedMotion: 'always' });
    expect(shouldReduceMotion()).toBe(true);
  });

  it('respects shouldReduceMotion when set to never', () => {
    configure({ reducedMotion: 'never' });
    expect(shouldReduceMotion()).toBe(false);
  });
});

describe('ProXimate Runtime', () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  it('applies animation classes correctly', () => {
    animate(element, 'fade-in-up');
    expect(element.classList.contains('px-animate')).toBe(true);
    expect(element.classList.contains('px-fade-in-up')).toBe(true);
  });

  it('applies CSS variables for duration and delay', () => {
    animate(element, { animation: 'zoom-in', duration: 800, delay: 200 });
    expect(element.style.getPropertyValue('--px-duration')).toBe('800ms');
    expect(element.style.getPropertyValue('--px-delay')).toBe('200ms');
  });
});
