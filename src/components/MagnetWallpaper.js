// src/components/MagnetWallpaper.js
import React, { useRef, useEffect } from 'react';

export default function MagnetWallpaper({ color = '#1eda60', opacity = 0.18 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const spans = container.querySelectorAll('span');

    // Caching coordinate metrics once to completely eliminate layout thrashing
    let cachedCoords = [];
    const cacheCoordinates = () => {
      cachedCoords = Array.from(spans).map(span => {
        const rect = span.getBoundingClientRect();
        return {
          span,
          cx: rect.left + rect.width / 2 + window.scrollX,
          cy: rect.top + rect.height / 2 + window.scrollY
        };
      });
    };

    // Delay initial caching slightly to let dimensions settle
    const timer = setTimeout(cacheCoordinates, 150);
    window.addEventListener('resize', cacheCoordinates);

    const onMove = (e) => {
      if (!cachedCoords.length) return;
      
      const clientX = e.clientX + window.scrollX;
      const clientY = e.clientY + window.scrollY;

      cachedCoords.forEach(pos => {
        const b = clientX - pos.cx;
        const a = clientY - pos.cy;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (clientY > pos.cy ? 1 : -1);
        pos.span.style.setProperty('--r', `${r}deg`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', cacheCoordinates);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const COLS = 18;
  const ROWS = 12;
  const total = COLS * ROWS;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        opacity: opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: '1.5px',
            height: '22px',
            background: color,
            margin: 'auto',
            transformOrigin: 'center',
            transform: 'rotate(var(--r, -10deg))',
            '--r': '-10deg',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
