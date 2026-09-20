import React, { useMemo } from 'react';
import { Box, Plane, Cylinder } from '@react-three/drei';
import { getWoodTexture, getConcreteTexture } from '../utils/TextureGenerator';

import ProjectStation from './objects/ProjectStation';
import SkillsStation from './objects/SkillsStation';
import OpenSourceStation from './objects/OpenSourceStation';
import CertificationsStation from './objects/CertificationsStation';
import AdditionalInfoStation from './objects/AdditionalInfoStation';
import RecordPlayer from './objects/RecordPlayer';
import EasterEgg from './objects/EasterEgg';

/* ================================================================
   ARCHITECTURE CONSTANTS
   ================================================================ */
const WH  = 3.8;   // Wall Height
const DH  = 2.3;   // Door Height
const DW  = 3.0;   // Door Width
const WT  = 0.25;  // Wall Thickness

// eslint-disable-next-line no-unused-vars
const wallMats = {
  hall:  { color: '#d4c5b2', roughness: 0.8 },
  north: { color: '#b8cce4', roughness: 0.8 },
  east:  { color: '#b5d4b8', roughness: 0.8 },
  south: { color: '#c8b8d8', roughness: 0.8 },
  west:  { color: '#d4c49c', roughness: 0.8 },
};

/* ================================================================
   WALL HELPERS
   ================================================================ */
function HWall({ z, x1, x2, doorX, mat }) {
  const c = mat.color, r = mat.roughness, lintelH = WH - DH;
  if (doorX === undefined) {
    const w = x2 - x1;
    return (
      <Box args={[w, WH, WT]} position={[(x1 + x2) / 2, WH / 2, z]} receiveShadow castShadow>
        <meshStandardMaterial color={c} roughness={r} />
      </Box>
    );
  }
  const lw = (doorX - DW / 2) - x1;
  const rw = x2 - (doorX + DW / 2);
  return (
    <group>
      {lw > 0.01 && <Box args={[lw, WH, WT]} position={[x1 + lw / 2, WH / 2, z]} receiveShadow castShadow><meshStandardMaterial color={c} roughness={r} /></Box>}
      {rw > 0.01 && <Box args={[rw, WH, WT]} position={[x2 - rw / 2, WH / 2, z]} receiveShadow castShadow><meshStandardMaterial color={c} roughness={r} /></Box>}
      {lintelH > 0.01 && <Box args={[DW, lintelH, WT]} position={[doorX, DH + lintelH / 2, z]} receiveShadow castShadow><meshStandardMaterial color={c} roughness={r} /></Box>}
      <Box args={[0.12, DH, 0.18]} position={[doorX - DW / 2, DH / 2, z]}><meshStandardMaterial color="#6b4c30" roughness={0.5} /></Box>
      <Box args={[0.12, DH, 0.18]} position={[doorX + DW / 2, DH / 2, z]}><meshStandardMaterial color="#6b4c30" roughness={0.5} /></Box>
      <Box args={[DW + 0.24, 0.12, 0.18]} position={[doorX, DH + 0.06, z]}><meshStandardMaterial color="#6b4c30" roughness={0.5} /></Box>
    </group>
  );
}

function VWall({ x, z1, z2, doorZ, mat }) {
  const c = mat.color, r = mat.roughness, lintelH = WH - DH;
  if (doorZ === undefined) {
    const d = z2 - z1;
    return (
      <Box args={[WT, WH, d]} position={[x, WH / 2, (z1 + z2) / 2]} receiveShadow castShadow>
        <meshStandardMaterial color={c} roughness={r} />
      </Box>
    );
  }
  const fw = (doorZ - DW / 2) - z1;
  const bw = z2 - (doorZ + DW / 2);
  return (
    <group>
      {fw > 0.01 && <Box args={[WT, WH, fw]} position={[x, WH / 2, z1 + fw / 2]} receiveShadow castShadow><meshStandardMaterial color={c} roughness={r} /></Box>}
      {bw > 0.01 && <Box args={[WT, WH, bw]} position={[x, WH / 2, z2 - bw / 2]} receiveShadow castShadow><meshStandardMaterial color={c} roughness={r} /></Box>}
      {lintelH > 0.01 && <Box args={[WT, lintelH, DW]} position={[x, DH + lintelH / 2, doorZ]} receiveShadow castShadow><meshStandardMaterial color={c} roughness={r} /></Box>}
      <Box args={[0.18, DH, 0.12]} position={[x, DH / 2, doorZ - DW / 2]}><meshStandardMaterial color="#6b4c30" roughness={0.5} /></Box>
      <Box args={[0.18, DH, 0.12]} position={[x, DH / 2, doorZ + DW / 2]}><meshStandardMaterial color="#6b4c30" roughness={0.5} /></Box>
      <Box args={[0.18, 0.12, DW + 0.24]} position={[x, DH + 0.06, doorZ]}><meshStandardMaterial color="#6b4c30" roughness={0.5} /></Box>
    </group>
  );
}

/* ================================================================
   FURNITURE COMPONENTS (Ultra-Detailed Edition)
   ================================================================ */

/** Keyboard, Mousepad, Mouse and Coffee Cup accessories */
function DeskAccessories({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Felt Mousepad */}
      <Box args={[0.75, 0.005, 0.35]} position={[0, 0.752, 0]} receiveShadow>
        <meshStandardMaterial color="#2c2e30" roughness={0.9} />
      </Box>
      {/* Mechanical keyboard */}
      <Box args={[0.42, 0.015, 0.14]} position={[0, 0.76, 0.02]} castShadow>
        <meshStandardMaterial color="#181a1b" roughness={0.6} />
      </Box>
      {/* Accent keycaps */}
      <Box args={[0.015, 0.018, 0.015]} position={[-0.20, 0.765, -0.04]}><meshStandardMaterial color="#ef4444" /></Box>
      <Box args={[0.03, 0.018, 0.015]} position={[0.18, 0.765, 0.02]}><meshStandardMaterial color="#10b981" /></Box>
      <Box args={[0.16, 0.018, 0.015]} position={[0, 0.765, 0.06]}><meshStandardMaterial color="#e5e7eb" /></Box>
      {/* Computer mouse */}
      <Box args={[0.07, 0.022, 0.11]} position={[0.26, 0.76, 0.02]} castShadow>
        <meshStandardMaterial color="#212529" roughness={0.4} metalness={0.2} />
      </Box>
      {/* Mug */}
      <Cylinder args={[0.042, 0.042, 0.09, 10]} position={[-0.30, 0.795, -0.06]} castShadow>
        <meshStandardMaterial color="#dc2626" roughness={0.3} />
      </Cylinder>
      <Box args={[0.015, 0.05, 0.035]} position={[-0.34, 0.795, -0.06]}><meshStandardMaterial color="#dc2626" /></Box>
    </group>
  );
}

/** Flat-pack desk with 4 legs */
function Desk({ position, rotation = [0, 0, 0], w = 1.6, d = 0.75 }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[w, 0.06, d]} position={[0, 0.75, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#8a5c30" roughness={0.5} />
      </Box>
      {[[-w/2+0.08, 0, -d/2+0.08], [-w/2+0.08, 0, d/2-0.08], [w/2-0.08, 0, -d/2+0.08], [w/2-0.08, 0, d/2-0.08]].map((p, i) => (
        <Box key={i} args={[0.05, 0.75, 0.05]} position={[p[0], 0.375, p[2]]} castShadow>
          <meshStandardMaterial color="#343a40" metalness={0.8} roughness={0.2} />
        </Box>
      ))}
    </group>
  );
}

/** Curved Monitor with detailed stand */
function Monitor({ position, screenColor = '#1a3a6c' }) {
  return (
    <group position={position}>
      {/* Outer frame */}
      <Box args={[0.62, 0.4, 0.04]} position={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial color="#1f2022" roughness={0.4} metalness={0.5} />
      </Box>
      {/* Screen panel */}
      <Box args={[0.58, 0.36, 0.02]} position={[0, 0.2, 0.015]}>
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} roughness={0.1} />
      </Box>
      {/* Support column */}
      <Cylinder args={[0.02, 0.02, 0.22, 10]} position={[0, 0.02, -0.02]} castShadow>
        <meshStandardMaterial color="#495057" metalness={0.7} roughness={0.3} />
      </Cylinder>
      {/* Heavy base plate */}
      <Cylinder args={[0.08, 0.09, 0.015, 12]} position={[0, -0.09, -0.02]} castShadow>
        <meshStandardMaterial color="#212529" metalness={0.5} roughness={0.4} />
      </Cylinder>
    </group>
  );
}

/** Office chair with arm rests, cushion, and star wheeled base */
function Chair({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* 5-Spoke Wheel Base */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        const rx = Math.sin(angle) * 0.24;
        const rz = Math.cos(angle) * 0.24;
        return (
          <group key={i} position={[rx, 0.02, rz]}>
            <Box args={[0.04, 0.025, 0.24]} position={[-rx/2, 0.015, -rz/2]} rotation={[0, -angle, 0]}>
              <meshStandardMaterial color="#212529" metalness={0.6} />
            </Box>
            <Cylinder args={[0.02, 0.02, 0.02, 8]} rotation={[0, 0, Math.PI/2]} position={[0, -0.01, 0]} castShadow>
              <meshStandardMaterial color="#111" roughness={0.9} />
            </Cylinder>
          </group>
        );
      })}
      {/* Support piston */}
      <Cylinder args={[0.03, 0.035, 0.42, 8]} position={[0, 0.22, 0]} castShadow>
        <meshStandardMaterial color="#adb5bd" metalness={0.9} roughness={0.1} />
      </Cylinder>
      {/* Seat cushion */}
      <Box args={[0.48, 0.06, 0.48]} position={[0, 0.43, 0]} castShadow>
        <meshStandardMaterial color="#212529" roughness={0.8} />
      </Box>
      {/* Armrests */}
      <group position={[-0.26, 0.58, 0.05]}>
        <Box args={[0.02, 0.18, 0.03]} position={[0, -0.08, 0]}><meshStandardMaterial color="#343a40" /></Box>
        <Box args={[0.05, 0.02, 0.24]} position={[0, 0.01, -0.02]}><meshStandardMaterial color="#111" /></Box>
      </group>
      <group position={[0.26, 0.58, 0.05]}>
        <Box args={[0.02, 0.18, 0.03]} position={[0, -0.08, 0]}><meshStandardMaterial color="#343a40" /></Box>
        <Box args={[0.05, 0.02, 0.24]} position={[0, 0.01, -0.02]}><meshStandardMaterial color="#111" /></Box>
      </group>
      {/* Backrest mesh frame */}
      <Box args={[0.42, 0.52, 0.04]} position={[0, 0.72, -0.21]} castShadow>
        <meshStandardMaterial color="#343a40" roughness={0.6} />
      </Box>
      <Box args={[0.38, 0.48, 0.02]} position={[0, 0.72, -0.20]}>
        <meshStandardMaterial color="#111" roughness={0.95} />
      </Box>
    </group>
  );
}

/** Bookshelf filled with randomized, detailed books */
function Bookshelf({ position, rotation = [0, 0, 0] }) {
  const bookColors = ['#c0392b','#2980b9','#27ae60','#e67e22','#8e44ad','#16a085','#d35400','#2471a3','#1e8449','#f1c40f','#34495e'];
  return (
    <group position={position} rotation={rotation}>
      {/* Wood frame */}
      <Box args={[1.3, 1.9, 0.32]} position={[0, 0.95, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#6f4e37" roughness={0.8} />
      </Box>
      {/* Horizontal Shelves */}
      {[0.04, 0.42, 0.8, 1.18, 1.56, 1.86].map((y, i) => (
        <Box key={i} args={[1.22, 0.04, 0.3]} position={[0, y, 0]} receiveShadow>
          <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
        </Box>
      ))}
      {/* Dynamic Randomized Books */}
      {Array.from({ length: 22 }).map((_, i) => {
        const shelf = Math.floor(i / 5);
        const slot = i % 5;
        const shelfY = 0.06 + shelf * 0.38;
        const bookW = 0.035 + Math.random() * 0.035;
        const bookH = 0.20 + Math.random() * 0.06;
        const bookD = 0.20 + Math.random() * 0.03;
        const color = bookColors[Math.floor(Math.random() * bookColors.length)];
        const rotZ = Math.random() > 0.82 ? (Math.random() > 0.5 ? 0.12 : -0.12) : 0;
        return (
          <Box key={i} args={[bookW, bookH, bookD]} 
            position={[-0.45 + slot * 0.22, shelfY + bookH/2, 0.02]} 
            rotation={[0, 0, rotZ]}
            castShadow
          >
            <meshStandardMaterial color={color} roughness={0.65} />
          </Box>
        );
      })}
    </group>
  );
}

/** Whiteboard on wall */
function Whiteboard({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[2.0, 1.2, 0.06]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#495057" roughness={0.5} metalness={0.3} />
      </Box>
      <Box args={[1.92, 1.12, 0.03]} position={[0, 0, 0.04]}>
        <meshStandardMaterial color="#f8f9fa" roughness={0.05} />
      </Box>
      {/* Drawings */}
      <Box args={[0.7, 0.015, 0.01]} position={[-0.3, 0.1, 0.06]}><meshStandardMaterial color="#023e8a" /></Box>
      <Box args={[0.5, 0.015, 0.01]} position={[-0.1, -0.05, 0.06]}><meshStandardMaterial color="#c1121f" /></Box>
      <Box args={[0.35, 0.015, 0.01]} position={[0.3, 0.2, 0.06]}><meshStandardMaterial color="#38b000" /></Box>
      {/* Marker tray */}
      <Box args={[2.0, 0.04, 0.1]} position={[0, -0.62, 0.08]}>
        <meshStandardMaterial color="#212529" roughness={0.4} />
      </Box>
    </group>
  );
}

/** Realistic architectural recessed ceiling fixture with integrated light source */
function CeilingLight({ position, color = '#ffffff', w = 0.7, intensity = 2.0 }) {
  return (
    <group position={position}>
      <Box args={[w, 0.06, 0.22]}>
        <meshStandardMaterial color="#adb5bd" roughness={0.3} />
      </Box>
      <Box args={[w - 0.06, 0.01, 0.16]} position={[0, -0.035, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
      </Box>
      <pointLight 
        color={color} 
        intensity={intensity} 
        distance={8.5} 
        decay={1.4} 
        position={[0, -0.15, 0]} 
      />
    </group>
  );
}

/** Multi-blade high-tech server rack cabinet */
function ServerRack({ position }) {
  const ledColors = ['#39ff14', '#00e5ff', '#ff3366', '#39ff14', '#ffaa00'];
  return (
    <group position={position}>
      {/* Metal chassis */}
      <Box args={[0.65, 1.85, 0.55]} position={[0, 0.925, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1c1e" roughness={0.3} metalness={0.8} />
      </Box>
      {/* Ventilation mesh border */}
      <Box args={[0.01, 1.7, 0.5]} position={[-0.33, 0.925, 0]}><meshStandardMaterial color="#111" /></Box>
      <Box args={[0.01, 1.7, 0.5]} position={[0.33, 0.925, 0]}><meshStandardMaterial color="#111" /></Box>
      {/* Blade Servers */}
      {Array.from({ length: 8 }).map((_, i) => {
        const y = 0.22 + i * 0.20;
        return (
          <group key={i} position={[0, y, 0.01]}>
            <Box args={[0.59, 0.16, 0.54]} position={[0, 0, 0]} castShadow>
              <meshStandardMaterial color="#2d3033" roughness={0.4} metalness={0.7} />
            </Box>
            <Box args={[0.46, 0.12, 0.01]} position={[-0.04, 0, 0.272]}>
              <meshStandardMaterial color="#0c0e10" roughness={0.9} />
            </Box>
            <Box args={[0.015, 0.015, 0.015]} position={[0.22, 0.04, 0.273]}>
              <meshBasicMaterial color={ledColors[i % 5]} />
            </Box>
            <Box args={[0.015, 0.015, 0.015]} position={[0.25, 0.04, 0.273]}>
              <meshBasicMaterial color={Math.random() > 0.5 ? ledColors[(i+1)%5] : '#333'} />
            </Box>
            <Box args={[0.015, 0.015, 0.015]} position={[0.22, -0.04, 0.273]}>
              <meshBasicMaterial color={ledColors[(i+2)%5]} />
            </Box>
            <Box args={[0.04, 0.015, 0.01]} position={[0.23, -0.01, 0.273]}><meshStandardMaterial color="#111" /></Box>
          </group>
        );
      })}
    </group>
  );
}

/** Potted plant with organic stems and leaves */
function Plant({ position, scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Terracotta pot */}
      <Cylinder args={[0.16, 0.12, 0.25, 10]} position={[0, 0.125, 0]} castShadow>
        <meshStandardMaterial color="#cc7755" roughness={0.8} />
      </Cylinder>
      <Cylinder args={[0.17, 0.17, 0.05, 10]} position={[0, 0.23, 0]} castShadow>
        <meshStandardMaterial color="#cc7755" roughness={0.7} />
      </Cylinder>
      <Cylinder args={[0.155, 0.155, 0.02, 10]} position={[0, 0.24, 0]}>
        <meshStandardMaterial color="#4a2c11" roughness={0.95} />
      </Cylinder>
      {/* Stems */}
      {[[0, 0.35, 0, 0.55], [-0.08, 0.33, 0.06, 0.45], [0.08, 0.33, -0.06, 0.48], [0.06, 0.34, 0.08, 0.52], [-0.06, 0.34, -0.08, 0.5]].map((p, i) => (
        <group key={i} position={[p[0], 0.25, p[2]]} rotation={[0.1 * Math.sin(i), i * 1.2, 0.08 * Math.cos(i)]}>
          <Cylinder args={[0.01, 0.015, p[3], 6]} position={[0, p[3]/2, 0]} castShadow>
            <meshStandardMaterial color="#386f2b" roughness={0.9} />
          </Cylinder>
          {[0.45, 0.75, 1.0].map((h, k) => (
            <Box key={k} args={[0.18, 0.02, 0.12]} position={[0, p[3] * h * 0.8, 0.04]} rotation={[0.3, 0.2, -0.15]} castShadow>
              <meshStandardMaterial color={i % 2 === 0 ? '#4f9b3b' : '#60ab4c'} roughness={0.8} />
            </Box>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Certificate diploma frame */
function CertFrame({ position, rotation = [0, 0, 0], accentColor = '#d4af37' }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[0.55, 0.42, 0.04]} castShadow>
        <meshStandardMaterial color="#3a1e05" roughness={0.7} />
      </Box>
      <Box args={[0.49, 0.36, 0.02]} position={[0, 0, 0.03]}>
        <meshStandardMaterial color="#fffcf7" roughness={0.9} />
      </Box>
      <Cylinder args={[0.038, 0.038, 0.01, 12]} position={[0.15, -0.08, 0.045]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} emissive={accentColor} emissiveIntensity={0.3} />
      </Cylinder>
    </group>
  );
}

/** Detailed golden trophy cup */
function Trophy({ position }) {
  return (
    <group position={position}>
      {/* Cup body */}
      <Cylinder args={[0.09, 0.04, 0.18, 12]} position={[0, 0.32, 0]} castShadow>
        <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.1} emissive="#b8860b" emissiveIntensity={0.35} />
      </Cylinder>
      {/* Handles */}
      <Box args={[0.015, 0.11, 0.05]} position={[-0.1, 0.32, 0]} rotation={[0, 0, 0.18]} castShadow>
        <meshStandardMaterial color="#ffd700" metalness={0.9} />
      </Box>
      <Box args={[0.015, 0.11, 0.05]} position={[0.1, 0.32, 0]} rotation={[0, 0, -0.18]} castShadow>
        <meshStandardMaterial color="#ffd700" metalness={0.9} />
      </Box>
      {/* Stem connector */}
      <Cylinder args={[0.015, 0.02, 0.12, 8]} position={[0, 0.18, 0]} castShadow>
        <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.1} />
      </Cylinder>
      {/* Polished wood base */}
      <Box args={[0.14, 0.12, 0.14]} position={[0, 0.06, 0]} castShadow>
        <meshStandardMaterial color="#2b1810" roughness={0.5} />
      </Box>
      <Box args={[0.08, 0.04, 0.01]} position={[0, 0.06, 0.071]}>
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
      </Box>
    </group>
  );
}

/** Round collaboration boardroom table */
function CollabTable({ position }) {
  return (
    <group position={position}>
      <Cylinder args={[1.1, 1.1, 0.06, 24]} position={[0, 0.76, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#916a42" roughness={0.55} />
      </Cylinder>
      {/* Central Cable Management Box */}
      <Box args={[0.3, 0.008, 0.3]} position={[0, 0.791, 0]}>
        <meshStandardMaterial color="#212529" metalness={0.7} roughness={0.3} />
      </Box>
      <Cylinder args={[0.12, 0.16, 0.76, 12]} position={[0, 0.38, 0]} castShadow>
        <meshStandardMaterial color="#343a40" metalness={0.7} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.48, 0.48, 0.03, 12]} position={[0, 0.015, 0]}>
        <meshStandardMaterial color="#212529" metalness={0.6} roughness={0.4} />
      </Cylinder>
    </group>
  );
}

/** Slim Laptop with detailed keys, trackpad, and display hinges */
function Laptop({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Metal chassis */}
      <Box args={[0.34, 0.015, 0.24]} position={[0, 0.007, 0]} castShadow>
        <meshStandardMaterial color="#6c757d" roughness={0.3} metalness={0.8} />
      </Box>
      {/* Trackpad */}
      <Box args={[0.08, 0.002, 0.05]} position={[0, 0.016, 0.08]}>
        <meshStandardMaterial color="#495057" roughness={0.6} />
      </Box>
      {/* Keypad block */}
      <Box args={[0.28, 0.002, 0.11]} position={[0, 0.016, -0.02]}>
        <meshStandardMaterial color="#212529" roughness={0.8} />
      </Box>
      {/* Screen screen cover */}
      <group position={[0, 0.01, -0.115]} rotation={[-0.45, 0, 0]}>
        <Box args={[0.34, 0.23, 0.012]} position={[0, 0.11, 0]} castShadow>
          <meshStandardMaterial color="#6c757d" roughness={0.3} metalness={0.8} />
        </Box>
        <Box args={[0.31, 0.20, 0.006]} position={[0, 0.11, 0.006]}>
          <meshStandardMaterial color="#1a3d6c" emissive="#1a3d6c" emissiveIntensity={0.6} roughness={0.1} />
        </Box>
        <Cylinder args={[0.01, 0.01, 0.22, 6]} rotation={[0, 0, Math.PI/2]} position={[0, -0.01, 0]}>
          <meshStandardMaterial color="#111" />
        </Cylinder>
      </group>
    </group>
  );
}

/** Certificate display shelf */
function DisplayShelf({ position, w = 1.8, levels = 3 }) {
  return (
    <group position={position}>
      {/* Wooden backboard */}
      <Box args={[w, levels * 0.55 + 0.1, 0.06]} position={[0, (levels * 0.55 + 0.1) / 2, -0.12]}>
        <meshStandardMaterial color="#5a3d21" roughness={0.8} />
      </Box>
      {/* Horizonal shelves */}
      {Array.from({ length: levels }).map((_, i) => (
        <Box key={i} args={[w, 0.04, 0.26]} position={[0, i * 0.55 + 0.04, 0]} receiveShadow>
          <meshStandardMaterial color="#735232" roughness={0.6} />
        </Box>
      ))}
      {/* Vertical side panels */}
      <Box args={[0.05, levels * 0.55 + 0.1, 0.26]} position={[-w/2, (levels * 0.55) / 2, 0]} castShadow>
        <meshStandardMaterial color="#5a3d21" roughness={0.8} />
      </Box>
      <Box args={[0.05, levels * 0.55 + 0.1, 0.26]} position={[w/2, (levels * 0.55) / 2, 0]} castShadow>
        <meshStandardMaterial color="#5a3d21" roughness={0.8} />
      </Box>
    </group>
  );
}



/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function RoomModel({ isDarkMode = true }) {
  const woodTex = useMemo(() => getWoodTexture(), []);
  const concTex = useMemo(() => getConcreteTexture(), []);




  // Dynamic colors & materials based on active theme
  // Modern architectural tech studio palette (warm slate, smoked oak, matte acoustic ceiling)
  const localWallMats = useMemo(() => {
    return isDarkMode ? {
      hall:  { color: '#333842', roughness: 0.65 },   // Deep refined architectural slate
      north: { color: '#253448', roughness: 0.65 },  // Sophisticated tech slate blue
      east:  { color: '#22382c', roughness: 0.65 },  // Clean botanical forest slate
      south: { color: '#322646', roughness: 0.65 },  // Creative studio violet slate
      west:  { color: '#3d3020', roughness: 0.65 },  // Warm amber studio wood slate
    } : {
      hall:  { color: '#d8d4cb', roughness: 0.65 },  // Clean beige
      north: { color: '#c3d3e7', roughness: 0.65 },  // Light tech blue
      east:  { color: '#c4e2c8', roughness: 0.65 },  // Light soft green
      south: { color: '#dcd0e7', roughness: 0.65 },  // Light soft lavender
      west:  { color: '#e8dcba', roughness: 0.65 },  // Light warm gold
    };
  }, [isDarkMode]);

  const beamColor = isDarkMode ? '#16181f' : '#b89d7c';
  const columnColor = isDarkMode ? '#22252e' : '#a89d90';

  return (
    <group>
      {/* ==============================================================
          FLOORS  (x=-19..19, z=-19..19 cross shape)
          ============================================================== */}
      <Plane args={[10,10]} rotation={[-Math.PI/2,0,0]} position={[0,0,0]} receiveShadow>
        <meshStandardMaterial map={woodTex} color={isDarkMode ? "#272a33" : "#d0b085"} roughness={0.25} metalness={0.12} />
      </Plane>
      {/* Corridors */}
      {[[0,0,-7,3,4],[7,0,0,4,3],[0,0,7,3,4],[-7,0,0,4,3]].map(([x,,z,w,d],i)=>(
        <Plane key={i} args={[w,d]} rotation={[-Math.PI/2,0,0]} position={[x,0,z]} receiveShadow>
          <meshStandardMaterial map={woodTex} color={isDarkMode ? "#272a33" : "#d0b085"} roughness={0.25} metalness={0.12} />
        </Plane>
      ))}
      {/* Room floors */}
      <Plane args={[14,10]} rotation={[-Math.PI/2,0,0]} position={[0,0,-14]} receiveShadow>
        <meshStandardMaterial map={concTex} color={isDarkMode ? "#212836" : "#d3dfed"} roughness={0.28} metalness={0.15} />
      </Plane>
      <Plane args={[10,14]} rotation={[-Math.PI/2,0,0]} position={[14,0,0]} receiveShadow>
        <meshStandardMaterial map={woodTex} color={isDarkMode ? "#1d2b23" : "#c5dfcb"} roughness={0.25} metalness={0.12} />
      </Plane>
      <Plane args={[14,10]} rotation={[-Math.PI/2,0,0]} position={[0,0,14]} receiveShadow>
        <meshStandardMaterial map={concTex} color={isDarkMode ? "#281e35" : "#dfd8eb"} roughness={0.28} metalness={0.12} />
      </Plane>
      <Plane args={[10,14]} rotation={[-Math.PI/2,0,0]} position={[-14,0,0]} receiveShadow>
        <meshStandardMaterial map={woodTex} color={isDarkMode ? "#302619" : "#ebdcb5"} roughness={0.25} metalness={0.12} />
      </Plane>

      {/* ── Illuminated Inlay Floor Directional Guides ────────────────── */}
      {/* North / Projects (Cyan) */}
      <Box args={[0.08, 0.005, 14]} position={[0, 0.004, -7]}><meshBasicMaterial color="#06b6d4" /></Box>
      {/* East / Skills (Emerald) */}
      <Box args={[14, 0.005, 0.08]} position={[7, 0.004, 0]}><meshBasicMaterial color="#10b981" /></Box>
      {/* South / Open Source (Violet) */}
      <Box args={[0.08, 0.005, 14]} position={[0, 0.004, 7]}><meshBasicMaterial color="#8b5cf6" /></Box>
      {/* West / Certifications (Amber) */}
      <Box args={[14, 0.005, 0.08]} position={[-7, 0.004, 0]}><meshBasicMaterial color="#f59e0b" /></Box>

      {/* ==============================================================
          CEILINGS (Modern Architectural Matte Loft Finish)
          ============================================================== */}
      {/* Hall */}
      <Plane args={[10,10]} rotation={[Math.PI/2,0,0]} position={[0,WH,0]}>
        <meshStandardMaterial color={isDarkMode ? "#191b22" : "#eeeae3"} roughness={0.8} />
      </Plane>
      {/* Corridors */}
      {[[0,WH,-7,3,4],[7,WH,0,4,3],[0,WH,7,3,4],[-7,WH,0,4,3]].map(([x,y,z,w,d],i)=>(
        <Plane key={i} args={[w,d]} rotation={[Math.PI/2,0,0]} position={[x,y,z]}>
          <meshStandardMaterial color={isDarkMode ? "#191b22" : "#eeeae3"} roughness={0.8} />
        </Plane>
      ))}
      {/* Room ceilings */}
      <Plane args={[14,10]} rotation={[Math.PI/2,0,0]} position={[0,WH,-14]}>
        <meshStandardMaterial color={isDarkMode ? "#151821" : "#e6eaf0"} roughness={0.8} />
      </Plane>
      <Plane args={[10,14]} rotation={[Math.PI/2,0,0]} position={[14,WH,0]}>
        <meshStandardMaterial color={isDarkMode ? "#141c17" : "#e7ede9"} roughness={0.8} />
      </Plane>
      <Plane args={[14,10]} rotation={[Math.PI/2,0,0]} position={[0,WH,14]}>
        <meshStandardMaterial color={isDarkMode ? "#191421" : "#eae6f0"} roughness={0.8} />
      </Plane>
      <Plane args={[10,14]} rotation={[Math.PI/2,0,0]} position={[-14,WH,0]}>
        <meshStandardMaterial color={isDarkMode ? "#1c1712" : "#eeebe0"} roughness={0.8} />
      </Plane>

      {/* ==============================================================
          STRUCTURAL COLUMNS & CORNER PILLARS
          ============================================================== */}
      {/* Central Hall Pillars */}
      {[[-4.85, 0, -4.85], [4.85, 0, -4.85], [-4.85, 0, 4.85], [4.85, 0, 4.85]].map((pos, i) => (
        <Box key={i} args={[0.35, WH, 0.35]} position={pos} castShadow receiveShadow>
          <meshStandardMaterial color={columnColor} roughness={0.7} />
        </Box>
      ))}
      {/* Room Pillars */}
      {/* North Room */}
      {[[-6.85, 0, -9.15], [6.85, 0, -9.15], [-6.85, 0, -18.85], [6.85, 0, -18.85]].map((pos, i) => (
        <Box key={i} args={[0.32, WH, 0.32]} position={pos} castShadow receiveShadow>
          <meshStandardMaterial color={columnColor} roughness={0.7} />
        </Box>
      ))}
      {/* East Room */}
      {[[9.15, 0, -6.85], [18.85, 0, -6.85], [9.15, 0, 6.85], [18.85, 0, 6.85]].map((pos, i) => (
        <Box key={i} args={[0.32, WH, 0.32]} position={pos} castShadow receiveShadow>
          <meshStandardMaterial color={columnColor} roughness={0.7} />
        </Box>
      ))}
      {/* South Room */}
      {[[-6.85, 0, 9.15], [6.85, 0, 9.15], [-6.85, 0, 18.85], [6.85, 0, 18.85]].map((pos, i) => (
        <Box key={i} args={[0.32, WH, 0.32]} position={pos} castShadow receiveShadow>
          <meshStandardMaterial color={columnColor} roughness={0.7} />
        </Box>
      ))}
      {/* West Room */}
      {[[-9.15, 0, -6.85], [-18.85, 0, -6.85], [-9.15, 0, 6.85], [-18.85, 0, 6.85]].map((pos, i) => (
        <Box key={i} args={[0.32, WH, 0.32]} position={pos} castShadow receiveShadow>
          <meshStandardMaterial color={columnColor} roughness={0.7} />
        </Box>
      ))}

      {/* ==============================================================
          STRUCTURAL CEILING BEAMS
          ============================================================== */}
      {/* Central Hall Beams (X/Z grid crossing) */}
      <Box args={[10, 0.18, 0.22]} position={[0, WH - 0.09, 0]}><meshStandardMaterial color={beamColor} roughness={0.8} /></Box>
      <Box args={[0.22, 0.18, 10]} position={[0, WH - 0.09, 0]}><meshStandardMaterial color={beamColor} roughness={0.8} /></Box>
      {/* Room Beams */}
      <Box args={[14, 0.15, 0.20]} position={[0, WH - 0.075, -14]}><meshStandardMaterial color={beamColor} roughness={0.8} /></Box>
      <Box args={[0.20, 0.15, 14]} position={[14, WH - 0.075, 0]}><meshStandardMaterial color={beamColor} roughness={0.8} /></Box>
      <Box args={[14, 0.15, 0.20]} position={[0, WH - 0.075, 14]}><meshStandardMaterial color={beamColor} roughness={0.8} /></Box>
      <Box args={[0.20, 0.15, 14]} position={[-14, WH - 0.075, 0]}><meshStandardMaterial color={beamColor} roughness={0.8} /></Box>

      {/* ==============================================================
          HALL WALLS
          ============================================================== */}
      <HWall z={-5} x1={-5} x2={5} doorX={0} mat={localWallMats.hall} />
      <HWall z={ 5} x1={-5} x2={5} doorX={0} mat={localWallMats.hall} />
      <VWall x={ 5} z1={-5} z2={5} doorZ={0} mat={localWallMats.hall} />
      <VWall x={-5} z1={-5} z2={5} doorZ={0} mat={localWallMats.hall} />

      {/* ==============================================================
          CORRIDORS
          ============================================================== */}
      <VWall x={-1.5} z1={-9} z2={-5} mat={localWallMats.hall} />
      <VWall x={ 1.5} z1={-9} z2={-5} mat={localWallMats.hall} />
      <HWall z={-1.5} x1={5} x2={9} mat={localWallMats.hall} />
      <HWall z={ 1.5} x1={5} x2={9} mat={localWallMats.hall} />
      <VWall x={-1.5} z1={5} z2={9} mat={localWallMats.hall} />
      <VWall x={ 1.5} z1={5} z2={9} mat={localWallMats.hall} />
      <HWall z={-1.5} x1={-9} x2={-5} mat={localWallMats.hall} />
      <HWall z={ 1.5} x1={-9} x2={-5} mat={localWallMats.hall} />

      {/* ==============================================================
          NORTH ROOM — Projects  (x -7..7, z -9..-19)
          ============================================================== */}
      <HWall z={-9}  x1={-7} x2={7} doorX={0} mat={localWallMats.north} />
      <HWall z={-19} x1={-7} x2={7}            mat={localWallMats.north} />
      <VWall x={-7} z1={-19} z2={-9}           mat={localWallMats.north} />
      <VWall x={ 7} z1={-19} z2={-9}           mat={localWallMats.north} />

      {/* Door sign + accent light */}
      <Box args={[DW-0.2, 0.45, 0.08]} position={[0, DH+0.35, -9.04]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isDarkMode ? 0.7 : 0.3} />
      </Box>
      <pointLight position={[0, 3.2, -14]} intensity={isDarkMode ? 2.5 : 1.2} color="#60a5fa" distance={14} decay={1.5} />

      {/* Accent trim */}
      <Box args={[14,0.08,0.05]} position={[0,0.9,-9.15]}><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[14,0.08,0.05]} position={[0,0.9,-18.85]}><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[0.05,0.08,10]} position={[-7.15,0.9,-14]}><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[0.05,0.08,10]} position={[ 7.15,0.9,-14]}><meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>

      {/* 🖥️ FURNITURE — North Room (Projects) */}
      <CeilingLight position={[-2.5, WH-0.04, -13]} color="#ddeeff" />
      <CeilingLight position={[ 2.5, WH-0.04, -13]} color="#ddeeff" />
      <CeilingLight position={[-2.5, WH-0.04, -16]} color="#ddeeff" />
      <CeilingLight position={[ 2.5, WH-0.04, -16]} color="#ddeeff" />

      <Desk position={[-3.5, 0, -16]} rotation={[0, 0, 0]} />
      <Chair position={[-3.5, 0, -14.9]} rotation={[0, Math.PI, 0]} />
      <Monitor position={[-3.5, 0.78, -16.3]} screenColor={isDarkMode ? "#1a3a6c" : "#99bbff"} />
      <DeskAccessories position={[-3.5, 0, -16]} />
      <Laptop position={[-3.0, 0.78, -16]} rotation={[0, -0.3, 0]} />

      <Desk position={[3.5, 0, -16]} rotation={[0, 0, 0]} />
      <Chair position={[3.5, 0, -14.9]} rotation={[0, Math.PI, 0]} />
      <Monitor position={[3.2, 0.78, -16.3]} screenColor={isDarkMode ? "#1a3a6c" : "#99bbff"} />
      <Monitor position={[3.9, 0.78, -16.3]} screenColor={isDarkMode ? "#0a2a40" : "#66aaff"} />
      <DeskAccessories position={[3.5, 0, -16]} />

      <ServerRack position={[5.8, 0, -18]} />
      <ServerRack position={[5.8, 0, -16.2]} />
      <Plant position={[-6.2, 0, -9.8]} />
      <Plant position={[ 6.2, 0, -9.8]} />

      {/* Wall Art Frame */}
      <Box args={[2.0, 1.1, 0.05]} position={[-5, 2.0, -18.9]} castShadow>
        <meshStandardMaterial color="#2d1b0a" roughness={0.7} />
      </Box>
      <Box args={[1.8, 0.9, 0.03]} position={[-5, 2.0, -18.88]}>
        <meshStandardMaterial color={isDarkMode ? "#0a2040" : "#aaccff"} emissive={isDarkMode ? "#1040a0" : "#000000"} emissiveIntensity={isDarkMode ? 0.5 : 0.0} />
      </Box>

      <ProjectStation position={[0, 0, -12]} />

      {/* ==============================================================
          EAST ROOM — Skills  (x 9..19, z -7..7)
          ============================================================== */}
      <VWall x={ 9} z1={-7} z2={7} doorZ={0} mat={localWallMats.east} />
      <VWall x={19} z1={-7} z2={7}            mat={localWallMats.east} />
      <HWall z={-7} x1={9} x2={19}            mat={localWallMats.east} />
      <HWall z={ 7} x1={9} x2={19}            mat={localWallMats.east} />

      <Box args={[DW-0.2, 0.45, 0.08]} position={[9.04, DH+0.35, 0]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={isDarkMode ? 0.7 : 0.3} />
      </Box>
      <pointLight position={[14, 3.2, 0]} intensity={isDarkMode ? 2.5 : 1.2} color="#34d399" distance={14} decay={1.5} />

      <Box args={[0.05,0.08,14]} position={[ 9.15,0.9,0]}><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[0.05,0.08,14]} position={[18.85,0.9,0]}><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[10,0.08,0.05]} position={[14,0.9,-7.15]}><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[10,0.08,0.05]} position={[14,0.9, 7.15]}><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>

      {/* 📚 FURNITURE — East Room (Skills) */}
      <CeilingLight position={[12, WH-0.04, -2.5]} color="#ddfff0" />
      <CeilingLight position={[12, WH-0.04,  2.5]} color="#ddfff0" />
      <CeilingLight position={[16, WH-0.04, -2.5]} color="#ddfff0" />
      <CeilingLight position={[16, WH-0.04,  2.5]} color="#ddfff0" />

      <Bookshelf position={[18.4, 0, -3.5]} rotation={[0, -Math.PI/2, 0]} />
      <Bookshelf position={[18.4, 0,  0  ]} rotation={[0, -Math.PI/2, 0]} />
      <Bookshelf position={[18.4, 0,  3.5]} rotation={[0, -Math.PI/2, 0]} />
      <Whiteboard position={[14, 2.0, -6.88]} rotation={[0, 0, 0]} />

      <Desk position={[13, 0, 2]} rotation={[0, Math.PI/2, 0]} d={0.7} />
      <Chair position={[11.8, 0, 2]} rotation={[0, Math.PI/2, 0]} />
      <Monitor position={[13, 0.78, 1.7]} screenColor={isDarkMode ? "#0a3020" : "#a8e6cf"} />
      <DeskAccessories position={[13, 0, 2]} rotation={[0, Math.PI/2, 0]} />

      <Plant position={[9.8, 0, -6.2]} />
      <Plant position={[9.8, 0,  6.2]} />
      <Plant position={[18.2, 0, 6.2]} />

      <SkillsStation position={[14, 0, 0]} />

      {/* ==============================================================
          SOUTH ROOM — Open Source  (x -7..7, z 9..19)
          ============================================================== */}
      <HWall z={ 9} x1={-7} x2={7} doorX={0} mat={localWallMats.south} />
      <HWall z={19} x1={-7} x2={7}            mat={localWallMats.south} />
      <VWall x={-7} z1={9}  z2={19}           mat={localWallMats.south} />
      <VWall x={ 7} z1={9}  z2={19}           mat={localWallMats.south} />

      <Box args={[DW-0.2, 0.45, 0.08]} position={[0, DH+0.35, 9.04]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={isDarkMode ? 0.7 : 0.3} />
      </Box>
      <pointLight position={[0, 3.2, 14]} intensity={isDarkMode ? 2.5 : 1.2} color="#a78bfa" distance={14} decay={1.5} />

      <Box args={[14,0.08,0.05]} position={[0,0.9, 9.15]}><meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[14,0.08,0.05]} position={[0,0.9,18.85]}><meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[0.05,0.08,10]} position={[-7.15,0.9,14]}><meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[0.05,0.08,10]} position={[ 7.15,0.9,14]}><meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>

      {/* 🌐 FURNITURE — South Room (Open Source) */}
      <CeilingLight position={[-2.5, WH-0.04, 13]} color="#f0ecff" />
      <CeilingLight position={[ 2.5, WH-0.04, 13]} color="#f0ecff" />
      <CeilingLight position={[-2.5, WH-0.04, 16]} color="#f0ecff" />
      <CeilingLight position={[ 2.5, WH-0.04, 16]} color="#f0ecff" />

      <CollabTable position={[0, 0, 15]} />
      {[[1.4, 0, 15],[-1.4, 0, 15],[0, 0, 13.6],[0, 0, 16.4]].map(([x,y,z], i) => (
        <Chair key={i} position={[x, y, z]} rotation={[0, i === 2 ? 0 : i === 3 ? Math.PI : i === 0 ? -Math.PI/2 : Math.PI/2, 0]} />
      ))}

      <ServerRack position={[-5.8, 0, 18]} />
      <ServerRack position={[-4.0, 0, 18]} />

      <Box args={[1.8, 1.0, 0.06]} position={[4, 2.1, 18.9]} castShadow>
        <meshStandardMaterial color="#2d1b0a" roughness={0.7} />
      </Box>
      <Box args={[1.72, 0.92, 0.03]} position={[4, 2.1, 18.88]}>
        <meshStandardMaterial color={isDarkMode ? "#200a30" : "#ead6ff"} emissive={isDarkMode ? "#6020a0" : "#000000"} emissiveIntensity={isDarkMode ? 0.5 : 0.0} />
      </Box>

      <Plant position={[-6.2, 0, 9.8]} />
      <Plant position={[ 6.2, 0, 9.8]} />

      <OpenSourceStation position={[0, 0, 14]} />

      {/* ==============================================================
          WEST ROOM — Certs & Education  (x -19..-9, z -7..7)
          ============================================================== */}
      <VWall x={ -9} z1={-7} z2={7} doorZ={0} mat={localWallMats.west} />
      <VWall x={-19} z1={-7} z2={7}            mat={localWallMats.west} />
      <HWall z={-7} x1={-19} x2={-9}           mat={localWallMats.west} />
      <HWall z={ 7} x1={-19} x2={-9}           mat={localWallMats.west} />

      <Box args={[DW-0.2, 0.45, 0.08]} position={[-9.04, DH+0.35, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={isDarkMode ? 0.7 : 0.3} />
      </Box>
      <pointLight position={[-14, 3.2, 0]} intensity={isDarkMode ? 2.5 : 1.2} color="#fbbf24" distance={14} decay={1.5} />

      <Box args={[0.05,0.08,14]} position={[ -9.15,0.9,0]}><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[0.05,0.08,14]} position={[-18.85,0.9,0]}><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[10,0.08,0.05]} position={[-14,0.9,-7.15]}><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>
      <Box args={[10,0.08,0.05]} position={[-14,0.9, 7.15]}><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={isDarkMode ? 0.5 : 0.1}/></Box>

      {/* 🏆 FURNITURE — West Room (Certs & Education) */}
      <CeilingLight position={[-12, WH-0.04, -2.5]} color="#fff8e0" />
      <CeilingLight position={[-12, WH-0.04,  2.5]} color="#fff8e0" />
      <CeilingLight position={[-16, WH-0.04, -2.5]} color="#fff8e0" />
      <CeilingLight position={[-16, WH-0.04,  2.5]} color="#fff8e0" />

      <DisplayShelf position={[-18.5, 0, -3]} w={1.6} levels={3} />
      <DisplayShelf position={[-18.5, 0,  1]} w={1.6} levels={3} />

      <CertFrame position={[-18.75, 2.4, -0.6]} rotation={[0, Math.PI/2, 0]} accentColor="#ffd700" />
      <CertFrame position={[-18.75, 2.4,  0.2]} rotation={[0, Math.PI/2, 0]} accentColor="#c0c0c0" />
      <CertFrame position={[-18.75, 2.4,  1.0]} rotation={[0, Math.PI/2, 0]} accentColor="#cd7f32" />
      <CertFrame position={[-18.75, 1.8, -0.6]} rotation={[0, Math.PI/2, 0]} accentColor="#ffd700" />
      <CertFrame position={[-18.75, 1.8,  0.2]} rotation={[0, Math.PI/2, 0]} accentColor="#ffd700" />
      <CertFrame position={[-18.75, 1.8,  1.0]} rotation={[0, Math.PI/2, 0]} accentColor="#c0c0c0" />

      <Trophy position={[-18.3, 0.06, -3.5]} />
      <Trophy position={[-18.3, 0.06, -2.5]} />
      <Trophy position={[-18.3, 0.06,  0.5]} />

      <Desk position={[-12.5, 0, 3.5]} rotation={[0, Math.PI/2, 0]} />
      <Chair position={[-13.6, 0, 3.5]} rotation={[0, Math.PI/2, 0]} />
      <Laptop position={[-12.5, 0.78, 3.5]} rotation={[0, Math.PI/4, 0]} />
      <DeskAccessories position={[-12.5, 0, 3.5]} rotation={[0, Math.PI/2, 0]} />

      <Plant position={[-9.8, 0, -6.2]} scale={1.2} />
      <Plant position={[-9.8, 0,  6.2]} scale={1.2} />

      <CertificationsStation position={[-14, 0, 0]} />

      {/* ==============================================================
          CENTRAL HALL — Profile & Info  (x -5..5, z -5..5)
          ============================================================== */}
      {/* Ceiling Downlights */}
      <CeilingLight position={[-2.2, WH-0.04, -2.2]} color="#fff8f0" intensity={1.8} />
      <CeilingLight position={[ 2.2, WH-0.04, -2.2]} color="#fff8f0" intensity={1.8} />
      <CeilingLight position={[-2.2, WH-0.04,  2.2]} color="#fff8f0" intensity={1.8} />
      <CeilingLight position={[ 2.2, WH-0.04,  2.2]} color="#fff8f0" intensity={1.8} />

      {/* ── Central Holographic Command Pedestal (Hero Focal Point) ── */}
      <AdditionalInfoStation position={[0, 0, 0]} />

      {/* ── Illuminated Architectural Wing Portal Signs ─────────────── */}
      {/* North Portal: Projects (Cyan) */}
      <group position={[0, DH + 0.32, -4.86]}>
        <Box args={[2.4, 0.4, 0.08]} castShadow><meshStandardMaterial color="#121418" metalness={0.8} roughness={0.3} /></Box>
        <Box args={[2.26, 0.28, 0.02]} position={[0, 0, 0.045]}><meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={1.0} /></Box>
      </group>

      {/* East Portal: Skills Lab (Emerald) */}
      <group position={[4.86, DH + 0.32, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <Box args={[2.4, 0.4, 0.08]} castShadow><meshStandardMaterial color="#121418" metalness={0.8} roughness={0.3} /></Box>
        <Box args={[2.26, 0.28, 0.02]} position={[0, 0, 0.045]}><meshStandardMaterial color="#047857" emissive="#34d399" emissiveIntensity={1.0} /></Box>
      </group>

      {/* South Portal: Open Source (Violet) */}
      <group position={[0, DH + 0.32, 4.86]} rotation={[0, Math.PI, 0]}>
        <Box args={[2.4, 0.4, 0.08]} castShadow><meshStandardMaterial color="#121418" metalness={0.8} roughness={0.3} /></Box>
        <Box args={[2.26, 0.28, 0.02]} position={[0, 0, 0.045]}><meshStandardMaterial color="#6d28d9" emissive="#a855f7" emissiveIntensity={1.0} /></Box>
      </group>

      {/* West Portal: Certifications (Amber) */}
      <group position={[-4.86, DH + 0.32, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Box args={[2.4, 0.4, 0.08]} castShadow><meshStandardMaterial color="#121418" metalness={0.8} roughness={0.3} /></Box>
        <Box args={[2.26, 0.28, 0.02]} position={[0, 0, 0.045]}><meshStandardMaterial color="#b45309" emissive="#fbbf24" emissiveIntensity={1.0} /></Box>
      </group>

      {/* ── Minimalist Architectural Lounge Nook in Southeast Corner ─── */}
      <group position={[3.6, 0, 3.4]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Minimalist wool area rug */}
        <Plane args={[2.2, 1.8]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} receiveShadow>
          <meshStandardMaterial color="#1a1d25" roughness={0.9} />
        </Plane>
        {/* Low Smoked Glass Coffee Table */}
        <Box args={[1.1, 0.32, 0.6]} position={[0, 0.16, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#0f1117" roughness={0.1} metalness={0.85} transparent opacity={0.85} />
        </Box>
        {/* Ultra-thin Dev Laptop */}
        <Laptop position={[0, 0.33, 0]} rotation={[0, 0.2, 0]} />
        {/* Modernist Lounge Armchairs */}
        <Chair position={[-0.8, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Chair position={[0.8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      </group>

      {/* Modern architectural corner planter */}
      <Plant position={[-4.2, 0, -4.2]} scale={1.2} />
      <Plant position={[ 4.2, 0, -4.2]} scale={1.2} />

      {/* ==============================================================
          TALL OUTER SHELL (sky blocker)
          ============================================================== */}
      <Box args={[14,80,WT]} position={[0,40,-19.1]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[14,80,WT]} position={[0,40, 19.1]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[WT,80,14]} position={[ 19.1,40,0]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[WT,80,14]} position={[-19.1,40,0]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[WT,80,10]} position={[-7.1,40,-14]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[WT,80,10]} position={[ 7.1,40,-14]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[WT,80,10]} position={[-7.1,40, 14]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[WT,80,10]} position={[ 7.1,40, 14]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[10,80,WT]} position={[14,40,-7.1]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[10,80,WT]} position={[14,40, 7.1]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[10,80,WT]} position={[-14,40,-7.1]}><meshStandardMaterial color="#0a0808" /></Box>
      <Box args={[10,80,WT]} position={[-14,40, 7.1]}><meshStandardMaterial color="#0a0808" /></Box>
      {/* Corner fill blockers */}
      {[[ 13,40,-14],[-13,40,-14],[ 13,40,14],[-13,40,14]].map(([x,y,z],i)=>(
        <Box key={i} args={[12,80,10]} position={[x,y,z]}><meshStandardMaterial color="#0a0808" /></Box>
      ))}

      {/* ==============================================================
          EXTRAS
          ============================================================== */}
      <RecordPlayer position={[11, 0.05, -5.5]} />
      <EasterEgg    position={[-17, 0.3, 5.5]} />

    </group>
  );
}

