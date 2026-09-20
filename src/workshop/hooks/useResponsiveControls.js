import { useState, useEffect } from 'react';

export function checkIsMobile() {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth <= 900 ||
    ('ontouchstart' in window) ||
    (Boolean(navigator.maxTouchPoints) && navigator.maxTouchPoints > 0) ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  );
}

export default function useResponsiveControls() {
  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return { isMobile };
}
