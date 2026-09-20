import React from 'react';

/**
 * Super Realistic Architectural Room Lighting
 * Balances rich ambient detail, soft shadows, and warm architectural downlights.
 * Eliminates flat washed-out white whilst ensuring crystal-clear visibility.
 */
export default function RoomLighting({ isDarkMode = true }) {
  return (
    <>
      {/* ── 1. Global Ambient & Architectural Bounce ─────────────────── */}
      {/* Balanced natural ambient — provides visibility without flattening depth */}
      <ambientLight intensity={0.72} color="#f8fafc" />

      {/* Architectural hemisphere bounce (subtle skylight + floor bounce) */}
      <hemisphereLight
        skyColor="#bae6fd"
        groundColor="#1e2430"
        intensity={0.68}
      />

      {/* ── 2. Studio Key & Fill Lights (Interior) ──────────────────── */}
      <directionalLight
        position={[6, 3.6, 5]}
        intensity={1.15}
        color="#fffaf0"
        castShadow
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-6, 3.6, -5]}
        intensity={0.75}
        color="#e0f2fe"
      />

      {/* ── 3. High-CRI Room Architectural Spotlights ────────────────── */}
      {/* Central Hall (Atrium / Holographic Command Center) */}
      <pointLight
        position={[0, 3.4, 0]}
        intensity={2.8}
        color="#fffbf5"
        distance={20}
        decay={1.4}
      />
      <pointLight
        position={[0, 3.2, 2.8]}
        intensity={1.9}
        color="#fef3c7"
        distance={14}
        decay={1.5}
      />
      <pointLight
        position={[0, 3.2, -2.8]}
        intensity={1.9}
        color="#e0f2fe"
        distance={14}
        decay={1.5}
      />

      {/* North Room (Projects Gallery) — Tech Blue Accent Glow */}
      <pointLight
        position={[0, 3.3, -14]}
        intensity={2.8}
        color="#60a5fa"
        distance={22}
        decay={1.3}
      />
      <pointLight
        position={[-2.5, 3.1, -15]}
        intensity={1.6}
        color="#38bdf8"
        distance={12}
        decay={1.4}
      />
      <pointLight
        position={[2.5, 3.1, -15]}
        intensity={1.6}
        color="#38bdf8"
        distance={12}
        decay={1.4}
      />

      {/* East Room (Skills Hub) — Emerald Cyber Mint */}
      <pointLight
        position={[14, 3.3, 0]}
        intensity={2.8}
        color="#34d399"
        distance={22}
        decay={1.3}
      />
      <pointLight
        position={[14, 3.1, -2.5]}
        intensity={1.6}
        color="#10b981"
        distance={12}
        decay={1.4}
      />
      <pointLight
        position={[14, 3.1, 2.5]}
        intensity={1.6}
        color="#10b981"
        distance={12}
        decay={1.4}
      />

      {/* South Room (Open Source Hub) — Cosmic Violet */}
      <pointLight
        position={[0, 3.3, 14]}
        intensity={2.8}
        color="#a855f7"
        distance={22}
        decay={1.3}
      />
      <pointLight
        position={[-2.5, 3.1, 15]}
        intensity={1.6}
        color="#818cf8"
        distance={12}
        decay={1.4}
      />
      <pointLight
        position={[2.5, 3.1, 15]}
        intensity={1.6}
        color="#818cf8"
        distance={12}
        decay={1.4}
      />

      {/* West Room (Certifications & Honors) — Warm Amber Gold */}
      <pointLight
        position={[-14, 3.3, 0]}
        intensity={2.8}
        color="#fbbf24"
        distance={22}
        decay={1.3}
      />
      <pointLight
        position={[-14, 3.1, -2.5]}
        intensity={1.6}
        color="#f59e0b"
        distance={12}
        decay={1.4}
      />
      <pointLight
        position={[-14, 3.1, 2.5]}
        intensity={1.6}
        color="#f59e0b"
        distance={12}
        decay={1.4}
      />

      {/* ── 4. Corridor Connector Path Illuminators ─────────────────── */}
      <pointLight position={[0, 3.2, -7]} intensity={1.4} color="#bae6fd" distance={10} decay={1.4} />
      <pointLight position={[7, 3.2, 0]}  intensity={1.4} color="#a7f3d0" distance={10} decay={1.4} />
      <pointLight position={[0, 3.2, 7]}  intensity={1.4} color="#ddd6fe" distance={10} decay={1.4} />
      <pointLight position={[-7, 3.2, 0]} intensity={1.4} color="#fde68a" distance={10} decay={1.4} />
    </>
  );
}
