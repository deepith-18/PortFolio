// src/components/ScrollConnection.js
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaBrain, FaCode, FaDatabase, FaCloud, FaServer, FaCogs } from 'react-icons/fa';

const SKILL_NODES = [
  { id: 'ai', label: 'AI & ML', icon: FaBrain, x: -160, y: -100, color: '#64ffda' },
  { id: 'dev', label: 'Full Stack', icon: FaCode, x: 160, y: -100, color: '#f39c12' },
  { id: 'data', label: 'Data Eng', icon: FaDatabase, x: -200, y: 80, color: '#3498db' },
  { id: 'cloud', label: 'Cloud Systems', icon: FaCloud, x: 200, y: 80, color: '#9b59b6' },
  { id: 'sys', label: 'Architecture', icon: FaServer, x: 0, y: -180, color: '#e74c3c' },
  { id: 'ops', label: 'DevOps', icon: FaCogs, x: 0, y: 180, color: '#2ecc71' }
];

export default function ScrollConnection() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the container in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out scroll values
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map progress to scales and line completions
  const centerScale = useTransform(smoothProgress, [0.1, 0.4, 0.7], [0.8, 1.3, 1.05]);
  const connectionProgress = useTransform(smoothProgress, [0.3, 0.65], [0, 1]);
  const nodesScale = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);
  const nodesOpacity = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);

  return (
    <div 
      ref={containerRef} 
      className="scroll-connection-container"
      style={{
        position: 'relative',
        width: '90%',
        maxWidth: '750px',
        height: 'auto',
        aspectRatio: '4/3',
        margin: '2rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.01)',
        borderRadius: '24px',
        border: '1px solid rgba(0, 0, 0, 0.03)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Network Grid Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.7,
          pointerEvents: 'none'
        }}
      />

      {/* SVG Canvas - Responsive viewBox allows native scaling on small screens */}
      <svg 
        viewBox="0 0 800 600" 
        style={{
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'visible'
        }}
      >
        <defs>
          {SKILL_NODES.map(node => (
            <linearGradient key={`grad-${node.id}`} id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
              <stop offset="100%" stopColor={node.color} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>

        {/* Dynamic connecting lines radiating from the center (400, 300) */}
        {SKILL_NODES.map(node => (
          <g key={`line-${node.id}`}>
            {/* Background trace line */}
            <line
              x1="400"
              y1="300"
              x2={400 + node.x}
              y2={300 + node.y}
              stroke="rgba(0, 0, 0, 0.04)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Active animated connecting line */}
            <motion.line
              x1="400"
              y1="300"
              x2={400 + node.x}
              y2={300 + node.y}
              stroke={`url(#grad-${node.id})`}
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: connectionProgress,
                filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1))'
              }}
            />
          </g>
        ))}

        {/* Center Core Node rendered inside SVG using foreignObject */}
        <g transform="translate(400, 300)">
          <foreignObject x="-60" y="-60" width="120" height="120">
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                style={{
                  width: '95px',
                  height: '95px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '6px',
                  boxSizing: 'border-box',
                  scale: centerScale
                }}
                whileHover={{ scale: 1.12, boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <span style={{ fontSize: '20px', marginBottom: '2px' }}>⚡</span>
                <span style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.1 }}>
                  DEEPITH CORE
                </span>
              </motion.div>
            </div>
          </foreignObject>
        </g>

        {/* Surrounding Nodes inside SVG */}
        {SKILL_NODES.map(node => {
          const IconComponent = node.icon;
          return (
            <motion.g 
              key={node.id} 
              transform={`translate(${400 + node.x}, ${300 + node.y})`}
              style={{ scale: nodesScale, opacity: nodesOpacity }}
            >
              <foreignObject x="-65" y="-65" width="130" height="130">
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Interactive Node Bubble */}
                  <motion.div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      border: `3px solid ${node.color}`,
                      boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000',
                      cursor: 'pointer'
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      backgroundColor: node.color,
                      color: '#fff',
                      boxShadow: `0 8px 20px ${node.color}55`
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <IconComponent size={18} />
                  </motion.div>

                  {/* Label */}
                  <span
                    style={{
                      marginTop: '6px',
                      fontSize: '9px',
                      fontWeight: '700',
                      letterSpacing: '-0.02em',
                      color: '#333',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none'
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
