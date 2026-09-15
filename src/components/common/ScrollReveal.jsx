import React, { useRef, useState, useEffect } from 'react';

/**
 * ScrollReveal
 * Progressive enhancement wrapper compliant with modern-web-guidance.
 * Combines CSS View Timeline support with IntersectionObserver fallback.
 */
export const ScrollReveal = ({
  children,
  animation = 'fade-up', // 'fade-up' | 'scale' | 'fade-left' | 'fade-right'
  delay = 0,
  duration = 600,
  threshold = 0.12,
  className = ''
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If native CSS scroll-driven animation is supported, let CSS handle it
    const supportsViewTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (supportsViewTimeline) {
      setIsVisible(true);
      return;
    }

    // IntersectionObserver fallback for browsers without ViewTimeline
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentEl = ref.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  const animationClasses = {
    'fade-up': isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8 pointer-events-none',
    'scale': isVisible
      ? 'opacity-100 scale-100'
      : 'opacity-0 scale-95 pointer-events-none',
    'fade-left': isVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 -translate-x-8 pointer-events-none',
    'fade-right': isVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 translate-x-8 pointer-events-none'
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      className={`transition-all ease-spring will-change-transform ${animationClasses[animation] || animationClasses['fade-up']} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
