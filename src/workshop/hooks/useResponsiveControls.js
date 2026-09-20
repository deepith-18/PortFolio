import { useState, useEffect } from 'react';

export default function useResponsiveControls() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if primary input is touch (coarse pointer)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { isMobile };
}
