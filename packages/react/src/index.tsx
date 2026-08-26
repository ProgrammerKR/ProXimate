import React, { useEffect, useRef, useState } from 'react';
import { animate, AnimationInstance, AnimateOptions, reveal, stagger, configure } from '@proximate/core';

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
  const localRef = useRef<HTMLElement>(null);
  const ref = (forwardedRef || localRef) as React.MutableRefObject<HTMLElement>;
  const [animationInstance, setAnimationInstance] = useState<AnimationInstance | null>(null);

  useEffect(() => {
    if (!ref.current) return;

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
      const observer = reveal(ref.current, { ...options, threshold, once });
      return () => {
        observer?.disconnect();
      };
    } else {
      const instance = animate(ref.current, options);
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
      ref={ref}
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
