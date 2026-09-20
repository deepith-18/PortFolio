// src/components/HorizontalTicker.js
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalTicker() {
  const containerRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const ticker = tickerRef.current;
    if (!container || !ticker) return;

    // Calculate how far to translate (the width of the scrollable content minus viewport width)
    const getScrollAmount = () => {
      const tickerWidth = ticker.offsetWidth;
      const windowWidth = window.innerWidth;
      return -(tickerWidth - windowWidth + 100);
    };

    const ctx = gsap.context(() => {
      gsap.to(ticker, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center+=20%',
          end: 'bottom center-=20%',
          scrub: 1, // Smooth dragging/scrubbing
          invalidateOnRefresh: true, // Recalculates on resize
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="horizontal-ticker-section"
      style={{
        width: '100%',
        minHeight: '120vh', // Scrolling height to drive ScrollTrigger
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '10vh 0',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: '40%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Infinite ribbon flex flow */}
        <div 
          ref={tickerRef} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            whiteSpace: 'nowrap',
            willChange: 'transform',
            padding: '0 2rem'
          }}
        >
          {/* Main Ticker Text Row with embedded SVGs */}
          <span 
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'min(7vw, 90px)',
              fontWeight: '700',
              letterSpacing: '-0.04em',
              color: '#000',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            <span>Full Stack Dev</span>
            
            {/* SVG dot separator */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ alignSelf: 'center', margin: '0 10px', flexShrink: 0 }}>
              <circle cx="8" cy="8" r="8" fill="#ff4081" />
            </svg>

            <span>AI &amp; ML Engineer</span>
            
            {/* SVG Wave curve as punctuation */}
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none" style={{ alignSelf: 'center', margin: '0 10px' }}>
              <path d="M0 15 Q 15 0, 30 15 T 60 15" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>

            <span>Open Source</span>
            
            {/* Sparkle icon */}
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffb300', margin: '0 10px', animation: 'spin 6s linear infinite' }}>
              <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
            </svg>

            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: '400' }}>System Architecture</span>
            
            <span>Data Engineering</span>

            {/* Glowing loop connector */}
            <svg width="60" height="35" viewBox="0 0 60 35" fill="none" style={{ margin: '0 10px' }}>
              <path d="M5 18 C 15 -2, 25 -2, 30 18 C 35 38, 45 38, 55 18" stroke="#000" strokeWidth="4" strokeLinecap="round" />
              <circle cx="30" cy="18" r="4" fill="#000" />
            </svg>

            <span style={{ textDecoration: 'underline', textDecorationColor: '#000', textUnderlineOffset: '8px' }}>Cloud &amp; DevOps</span>
            
            <span>Python · React · Java</span>
            
            {/* Solid dot separator */}
            <span style={{ fontSize: '60px', color: '#ff4081', lineHeight: 1 }}>•</span>
            
            <span style={{ letterSpacing: '0.05em', color: '#888' }}>Building What Matters</span>
          </span>

          {/* Repeat Ticker Text for continuity */}
          <span 
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'min(7vw, 90px)',
              fontWeight: '700',
              letterSpacing: '-0.04em',
              color: '#000',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              opacity: 0.15
            }}
          >
            <span>Full Stack Dev</span>
            
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ alignSelf: 'center', margin: '0 10px', flexShrink: 0 }}>
              <circle cx="8" cy="8" r="8" fill="#ff4081" />
            </svg>

            <span>AI &amp; ML Engineer</span>
            
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none" style={{ alignSelf: 'center', margin: '0 10px' }}>
              <path d="M0 15 Q 15 0, 30 15 T 60 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>

            <span>Open Source</span>
            
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 10px' }}>
              <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
            </svg>

            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: '400' }}>System Architecture</span>
            
            <span>Data Engineering</span>
            
            <span style={{ textDecoration: 'underline' }}>Cloud &amp; DevOps</span>
            
            <span>Python · React · Java</span>
            <span style={{ fontSize: '60px', lineHeight: 1 }}>•</span>
            <span>Building What Matters</span>
          </span>
        </div>
      </div>
      
      {/* Visual background guide lines */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05) 50%, transparent)',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '70%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05) 50%, transparent)',
          zIndex: 1
        }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
