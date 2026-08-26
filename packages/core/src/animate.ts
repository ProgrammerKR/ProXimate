import { shouldReduceMotion } from './config';

export interface AnimateOptions {
  animation?: string;
  duration?: number;
  delay?: number;
  easing?: string;
  iterations?: number | typeof Infinity;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
}

export interface AnimationInstance {
  play: () => void;
  pause: () => void;
  reverse: () => void;
  cancel: () => void;
  finish: () => void;
}

export function animate(
  element: HTMLElement | string,
  optionsOrName: string | AnimateOptions
): AnimationInstance {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  
  if (!el) {
    throw new Error(`ProXimate: Element not found.`);
  }

  const options: AnimateOptions = typeof optionsOrName === 'string' 
    ? { animation: optionsOrName } 
    : optionsOrName;

  const animationName = options.animation || 'fade-in';
  
  // Set up CSS variables for the animation
  if (options.duration !== undefined) {
    el.style.setProperty('--px-duration', `${options.duration}ms`);
  }
  if (options.delay !== undefined) {
    el.style.setProperty('--px-delay', `${options.delay}ms`);
  }
  if (options.easing !== undefined) {
    el.style.setProperty('--px-ease', options.easing);
  }
  if (options.iterations !== undefined) {
    el.style.setProperty('--px-iteration-count', options.iterations.toString());
  }
  if (options.direction !== undefined) {
    el.style.setProperty('--px-direction', options.direction);
  }
  if (options.fillMode !== undefined) {
    el.style.setProperty('--px-fill-mode', options.fillMode);
  }

  // Handle reduced motion
  if (shouldReduceMotion()) {
    el.setAttribute('data-px-reduced-motion', 'true');
  } else {
    el.removeAttribute('data-px-reduced-motion');
  }

  // Clean up previous animations
  el.classList.remove('px-animate');
  const classList = Array.from(el.classList);
  classList.forEach((cls) => {
    if (cls.startsWith('px-')) {
      el.classList.remove(cls);
    }
  });

  // Force reflow
  void el.offsetWidth;

  // Add animation classes
  el.classList.add('px-animate');
  el.classList.add(`px-${animationName}`);

  options.onStart?.();

  // Create a controllable instance using DOM events (since it's CSS-based)
  let isPaused = false;
  
  const handleEnd = (e: AnimationEvent) => {
    if (e.target === el) {
      options.onComplete?.();
      el.removeEventListener('animationend', handleEnd);
    }
  };

  const handleCancel = (e: AnimationEvent) => {
    if (e.target === el) {
      options.onCancel?.();
      el.removeEventListener('animationcancel', handleCancel);
    }
  };

  el.addEventListener('animationend', handleEnd);
  el.addEventListener('animationcancel', handleCancel);

  return {
    play: () => {
      isPaused = false;
      el.style.animationPlayState = 'running';
    },
    pause: () => {
      isPaused = true;
      el.style.animationPlayState = 'paused';
    },
    reverse: () => {
      const currentDir = window.getComputedStyle(el).animationDirection;
      el.style.animationDirection = currentDir === 'reverse' ? 'normal' : 'reverse';
    },
    cancel: () => {
      el.classList.remove('px-animate');
      el.classList.remove(`px-${animationName}`);
      options.onCancel?.();
    },
    finish: () => {
      // Jump to end by setting delay to negative duration conceptually,
      // or just removing the animation and applying final state.
      // For a CSS-first approach, we can force the animation to complete.
      el.style.animationDelay = `-${window.getComputedStyle(el).animationDuration}`;
    }
  };
}
