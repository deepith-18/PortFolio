// src/components/MagnetLines.js
import React, { useRef, useEffect } from 'react';

const MagnetLines = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    // Cache spans coordinates to avoid layout reflow thrashing
    let cachedCoords = [];
    const cacheCoordinates = () => {
      cachedCoords = Array.from(items).map(item => {
        const rect = item.getBoundingClientRect();
        return {
          item,
          cx: rect.left + rect.width / 2 + window.scrollX,
          cy: rect.top + rect.height / 2 + window.scrollY
        };
      });
    };

    // Delay initial caching slightly to ensure positions have fully settled
    const timer = setTimeout(cacheCoordinates, 150);
    window.addEventListener('resize', cacheCoordinates);

    const onPointerMove = (pointer) => {
      if (!cachedCoords.length) return;

      const px = pointer.x + window.scrollX;
      const py = pointer.y + window.scrollY;

      cachedCoords.forEach(pos => {
        const b = px - pos.cx;
        const a = py - pos.cy;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (py > pos.cy ? 1 : -1);
        
        pos.item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e) => {
      onPointerMove({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    
    // Trigger initial calculation
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', cacheCoordinates);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  
  // Create spans with inline styles for the base rotation
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        display: 'block',
        transformOrigin: 'center',
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        '--rotate': `${baseAngle}deg`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform',
        transition: 'transform 0.1s ease-out'
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnet-lines-grid ${className}`}
      style={{
        display: 'grid',
        placeItems: 'center',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        pointerEvents: 'none', // Ensure it doesn't block cursor interactions
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
