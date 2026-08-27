import React, { useEffect, useRef, useState } from 'react';
import { animate, AnimationInstance, AnimateOptions, reveal, stagger, configure } from '@proximate-css/core';

export interface MotionProps extends AnimateOptions {
  children: React.ReactNode;
  animation?: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
  threshold?: number;
  once?: boolean;
}

export const Motion = React.forwardRef<HTMLElement, MotionProps>(({
  children,
  animation = 'fade-in',
  as: Component = 'div',
  className = '',
  style,
  reveal: useReveal = false,
  threshold = 0.2,
  once = true,
  duration,
  delay,
  easing,
  iterations,
  direction,
  fillMode,
  onStart,
  onComplete,
  onCancel,
  ...rest
}, forwardedRef) => {
  const localRef = useRef<HTMLElement | null>(null);
  
  const setRefs = React.useCallback(
    (element: HTMLElement | null) => {
      localRef.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = element;
      }
    },
    [forwardedRef]
  );

  const [animationInstance, setAnimationInstance] = useState<AnimationInstance | null>(null);

  useEffect(() => {
    if (!localRef.current) return;
    const currentEl = localRef.current;

    const options = {
      animation,
      duration,
      delay,
      easing,
      iterations,
      direction,
      fillMode,
      onStart,
      onComplete,
      onCancel,
    };

    if (useReveal) {
      const observer = reveal(currentEl, { ...options, threshold, once });
      return () => {
        observer?.disconnect();
      };
    } else {
      const instance = animate(currentEl, options);
      setAnimationInstance(instance);
      return () => {
        instance.cancel();
      };
    }
  }, [
    animation, duration, delay, easing, iterations, direction, fillMode,
    useReveal, threshold, once
  ]);

  const Tag = Component as any;

  // Merge classes (preventing duplicates if handled by core, but we let core manage it)
  // For initial server render, we don't apply the 'px-animate' yet to avoid flash of wrong state, 
  // but for a pure CSS library, we might want it immediately. We'll let `animate()` handle it.
  return (
    <Tag
      ref={setRefs}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Motion.displayName = 'Motion';

export { stagger, reveal, configure };
