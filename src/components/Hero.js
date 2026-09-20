// src/components/Hero.js — Blob Reveal Hero (Final Working)
// Uses a full-size inline SVG with an <svg:mask> whose circles are
// mutated each frame via rAF — zero React state in the hot loop.
import React, { useEffect, useRef, useState } from 'react';
import '../styles/Hero.css';

/* ─── Social data ─────────────────────────────────────────────── */
const SOCIALS = [
  {
    id: 'ig', label: 'Instagram', href: 'https://www.instagram.com/deepith_1718/',
    d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    id: 'tw', label: 'X / Twitter', href: 'https://x.com/DeepithD19',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.859L1.999 2.25H8.082l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    id: 'yt', label: 'YouTube', href: 'https://youtube.com',
    d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    id: 'li', label: 'LinkedIn', href: 'https://www.linkedin.com/in/deepithn12042004/',
    d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

/* ─── Spring config ───────────────────────────────────────────── */
const N       = 5;
const RADII   = [90, 64, 46, 32, 20];
const SPRINGS = [0.19, 0.12, 0.08, 0.055, 0.035];

function SvgIcon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Layout({ dark, onPortfolio }) {
  return (
    <div className="hr-content">
      <div className="hr-top">
        <h1 className={`hr-name ${dark ? 'hr-name-dark' : 'hr-name-light'}`}>
          <span>Deepith</span>
          <span>N</span>
        </h1>
        <a href="#projects" onClick={onPortfolio}
           className={`hr-port-link ${dark ? 'hr-port-link-dark' : 'hr-port-link-light'}`}>
          Portfolio&nbsp;↗
        </a>
      </div>
      <div className="hr-bottom">
        <p className={`hr-tagline ${dark ? 'hr-tagline-dark' : 'hr-tagline-light'}`}>
          Full&#8209;Stack&nbsp;·&nbsp;AI&nbsp;·&nbsp;Open&nbsp;Source
          <span className="hr-caret">_</span>
        </p>
        <div className="hr-social-row">
          {SOCIALS.map(s => (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
               aria-label={s.label} className={`hr-si ${dark ? 'hr-si-dark' : 'hr-si-light'}`}>
              <SvgIcon d={s.d} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const wrapRef    = useRef(null);
  const revealRef  = useRef(null);
  const dotRef     = useRef(null);
  const svgRef     = useRef(null);   // the full-size SVG holding mask + waves
  const rafRef     = useRef(null);

  const pos    = useRef(Array.from({ length: N }, (_, i) => ({ x: -800, y: -800, r: RADII[i] })));
  const target = useRef({ x: -800, y: -800 });
  const active = useRef(false);
  const phase  = useRef(0);
  const [on, setOn] = useState(false);

  /* ── rAF loop: directly mutate SVG DOM ──────────────────────── */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Circles live inside <mask id="hr-m"> → <g filter="url(#hr-f)">
    const circles   = svg.querySelectorAll('circle[data-b]');
    const wavePaths = svg.querySelectorAll('path[data-w]');

    function tick() {
      const p  = pos.current;
      const t  = target.current;
      const ak = active.current;

      // Primary blob
      const dx0 = t.x - p[0].x;
      const dy0 = t.y - p[0].y;
      p[0].x += dx0 * SPRINGS[0];
      p[0].y += dy0 * SPRINGS[0];
      p[0].r = RADII[0] + Math.min(34, Math.hypot(dx0, dy0) * 0.2);

      // Trailing blobs
      for (let i = 1; i < N; i++) {
        const dx = p[i - 1].x - p[i].x;
        const dy = p[i - 1].y - p[i].y;
        p[i].x += dx * SPRINGS[i];
        p[i].y += dy * SPRINGS[i];
        const spd = Math.hypot(dx, dy);
        const tr  = RADII[i] * (spd > 2 ? Math.min(1.65, 0.45 + spd * 0.028) : 1);
        p[i].r  += (tr - p[i].r) * 0.1;
      }

      // Update mask circles
      circles.forEach((c, i) => {
        c.setAttribute('cx', p[i].x.toFixed(1));
        c.setAttribute('cy', p[i].y.toFixed(1));
        c.setAttribute('r',  Math.max(0, p[i].r).toFixed(1));
        c.setAttribute('opacity', ak ? (1 - i * 0.12).toFixed(2) : '0');
      });

      // Update reveal layer visibility
      if (revealRef.current) {
        revealRef.current.style.opacity = ak ? '1' : '0';
      }

      // Animate waves
      phase.current += 0.007;
      const ph = phase.current;
      if (wavePaths[0]) wavePaths[0].setAttribute('d',
        `M0,${238+Math.sin(ph)*20} C360,${196+Math.sin(ph+1)*20} 720,${314+Math.sin(ph+2)*20} 1080,${220+Math.sin(ph+.5)*20} C1260,${180+Math.sin(ph+1.5)*20} 1380,${250+Math.sin(ph+2.5)*20} 1440,${250+Math.sin(ph)*20}`);
      if (wavePaths[1]) wavePaths[1].setAttribute('d',
        `M0,${448+Math.sin(ph+1.5)*15} C300,${530+Math.sin(ph+2)*15} 600,${370+Math.sin(ph+.5)*15} 900,${484+Math.sin(ph+1)*15} C1140,${550+Math.sin(ph+2.5)*15} 1320,${430+Math.sin(ph)*15} 1440,${418+Math.sin(ph+1.5)*15}`);
      if (wavePaths[2]) wavePaths[2].setAttribute('d',
        `M0,${334+Math.sin(ph+.8)*11} C480,${286+Math.sin(ph+1.8)*11} 960,${384+Math.sin(ph+.3)*11} 1440,${316+Math.sin(ph+1.3)*11}`);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Events ─────────────────────────────────────────────────── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const move = (cx, cy) => {
      const r = el.getBoundingClientRect();
      const x = cx - r.left;
      const y = cy - r.top;
      target.current = { x, y };
      active.current = true;
      setOn(true);
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px';
        dotRef.current.style.top  = y + 'px';
      }
    };

    const stop = () => { target.current = { x: -800, y: -800 }; active.current = false; setOn(false); };

    const onMM = e => move(e.clientX, e.clientY);
    const onTM = e => { if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY); };

    el.addEventListener('mousemove',  onMM);
    el.addEventListener('mouseleave', stop);
    el.addEventListener('touchmove',  onTM, { passive: true });
    el.addEventListener('touchend',   stop, { passive: true });
    return () => {
      el.removeEventListener('mousemove',  onMM);
      el.removeEventListener('mouseleave', stop);
      el.removeEventListener('touchmove',  onTM);
      el.removeEventListener('touchend',   stop);
    };
  }, []);

  const goProjects = e => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={wrapRef} className="hr" id="about-hero">

      {/*
        Full-size SVG spanning the entire hero.
        It holds:
          1. A <filter> for gooey metaball effect
          2. A <mask> using those filtered circles
          3. Wave path elements (animated by rAF)
        The mask ID "hr-m" is referenced by the reveal layer via CSS.
      */}
      <svg
        ref={svgRef}
        className="hr-svg"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gooey filter: blur + threshold = organic metaballs */}
          <filter id="hr-f" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="b" />
            <feColorMatrix in="b" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -16"
            />
          </filter>

          {/*
            Mask: black background hides everything.
            White circles (run through gooey filter) reveal the layer beneath.
            maskUnits="userSpaceOnUse" so coordinates match the page.
          */}
          <mask id="hr-m" maskUnits="userSpaceOnUse">
            {/* Black rect covers everything → hides reveal layer by default */}
            <rect x="-9999" y="-9999" width="99998" height="99998" fill="black" />
            {/* Gooey white blobs → reveal the masked area */}
            <g filter="url(#hr-f)">
              {Array.from({ length: N }).map((_, i) => (
                <circle
                  key={i}
                  data-b={i}
                  cx="-800" cy="-800"
                  r={RADII[i]}
                  fill="white"
                  opacity="0"
                />
              ))}
            </g>
          </mask>
        </defs>

        {/* Wave paths — mutated each frame by rAF */}
        <path data-w="0" stroke="rgba(0,0,0,0.065)" strokeWidth="1.5" fill="none" strokeLinecap="round" d="" />
        <path data-w="1" stroke="rgba(0,0,0,0.045)" strokeWidth="1.5" fill="none" strokeLinecap="round" d="" />
        <path data-w="2" stroke="rgba(0,0,0,0.03)"  strokeWidth="1"   fill="none" strokeLinecap="round" d="" />
      </svg>

      {/* ── BASE LAYER ── */}
      <div className="hr-layer hr-base">
        <div className="hr-photo hr-photo-base" style={{ background: 'radial-gradient(circle at center, #1e293b 0%, #0a0f1d 100%)' }} />
        <div className="hr-dots" aria-hidden="true" />
        <Layout dark onPortfolio={goProjects} />
      </div>

      {/* ── REVEAL LAYER: masked by SVG mask #hr-m ── */}
      <div
        ref={revealRef}
        className="hr-layer hr-reveal"
        style={{
          mask: 'url(#hr-m)',
          WebkitMask: 'url(#hr-m)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="hr-photo hr-photo-reveal" style={{ background: 'radial-gradient(circle at center, #0284c7 0%, #0369a1 100%)' }} aria-hidden="true" />
        <div className="hr-vignette" aria-hidden="true" />
        <Layout dark={false} onPortfolio={goProjects} />
      </div>

      {/* Cursor dot */}
      <div ref={dotRef} className={`hr-dot${on ? ' hr-dot-on' : ''}`} />
    </div>
  );
}
