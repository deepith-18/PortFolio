// src/components/ReceptionLobby.js
// Phase 1 — Reception Lobby: Software Company HQ
// Design: Apple / Notion / Linear — dark, minimal, premium
// DO NOT TOUCH: Fedora OS mode remains separate.

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import '../styles/ReceptionLobby.css';

// ─────────────────────────────────────────────────────────────
// UTILITY: build a floor with subtle reflective sheen
// ─────────────────────────────────────────────────────────────
function buildFloor(scene) {
  // Large polished floor plane
  const geo = new THREE.PlaneGeometry(80, 80, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x080c14,
    roughness: 0.10,
    metalness: 0.88,
  });
  const floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -4.2;
  scene.add(floor);

  // Very subtle grid lines on the floor — barely visible
  const gridHelper = new THREE.GridHelper(60, 30, 0x1a2540, 0x0f1929);
  gridHelper.position.y = -4.19;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.45;
  scene.add(gridHelper);
}

// ─────────────────────────────────────────────────────────────
// UTILITY: build the HQ glass building
// ─────────────────────────────────────────────────────────────
function buildHQBuilding(scene) {
  const group = new THREE.Group();
  // Scale up the entire building for more presence
  group.scale.set(1.35, 1.35, 1.35);

  // ── Main tower body — bright enough to read against dark BG ──
  const towerGeo = new THREE.BoxGeometry(5.4, 9.0, 2.8);
  const towerMat = new THREE.MeshBasicMaterial({ color: 0x0d2550 });
  const tower = new THREE.Mesh(towerGeo, towerMat);
  tower.position.y = 1.5;
  group.add(tower);

  // ── Bright wireframe edges for architectural feel ──
  const edgesGeo = new THREE.EdgesGeometry(towerGeo);
  const edgesMat = new THREE.LineBasicMaterial({
    color: 0x4a90d9,
    transparent: true,
    opacity: 0.95,
  });
  const edges = new THREE.LineSegments(edgesGeo, edgesMat);
  edges.position.y = 1.5;
  group.add(edges);

  // ── Window panes — glowing blue panels ──────────────────
  const windowRows = 7;
  const windowCols = 3;
  for (let row = 0; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      const winGeo = new THREE.PlaneGeometry(1.15, 0.70);
      const lit = Math.random() > 0.28;
      const winMat = new THREE.MeshBasicMaterial({
        color: lit ? 0x1a5aaa : 0x0a1c3a,
        transparent: true,
        opacity: lit ? 0.88 : 0.40,
      });
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.set(
        -2.0 + col * 2.0,
        -2.5 + row * 1.25,
        1.42
      );
      group.add(win);
    }
  }

  // ── Horizontal floor separators ─────────────────────────
  for (let i = 0; i < 8; i++) {
    const lineGeo = new THREE.BoxGeometry(5.44, 0.06, 0.06);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x2d6ca8 });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(0, -2.5 + i * 1.25, 1.45);
    group.add(line);
  }

  // ── Vertical column dividers ─────────────────────────────
  for (let i = 0; i < 4; i++) {
    const vGeo = new THREE.BoxGeometry(0.06, 9.0, 0.06);
    const vMat = new THREE.MeshBasicMaterial({ color: 0x2d6ca8 });
    const vLine = new THREE.Mesh(vGeo, vMat);
    vLine.position.set(-2.1 + i * 1.4, 1.5, 1.45);
    group.add(vLine);
  }

  // ── Rooftop accent bar ────────────────────────────────────
  const roofGeo = new THREE.BoxGeometry(5.6, 0.22, 3.0);
  const roofMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 6.05;
  group.add(roof);

  const roofEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(roofGeo),
    new THREE.LineBasicMaterial({ color: 0x60a8ff })
  );
  roofEdges.position.y = 6.05;
  group.add(roofEdges);

  // ── Slim antenna / spire ─────────────────────────────────
  const spireGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.5, 6);
  const spireMat = new THREE.MeshBasicMaterial({ color: 0x64ffda });
  const spire = new THREE.Mesh(spireGeo, spireMat);
  spire.position.y = 7.4;
  group.add(spire);

  // ── Blinky light on spire top ─────────────────────────────
  const blinkGeo = new THREE.SphereGeometry(0.10, 8, 8);
  const blinkMat = new THREE.MeshBasicMaterial({ color: 0x64ffda });
  const blink = new THREE.Mesh(blinkGeo, blinkMat);
  blink.position.y = 8.7;
  blink.userData.isBlinker = true;
  group.add(blink);

  // ── Left wing ────────────────────────────────────────────
  const wingLGeo = new THREE.BoxGeometry(2.0, 4.5, 2.4);
  const wingLMat = new THREE.MeshBasicMaterial({ color: 0x091c38 });
  const wingL = new THREE.Mesh(wingLGeo, wingLMat);
  wingL.position.set(-3.7, -0.75, 0);
  group.add(wingL);

  const wingLEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(wingLGeo),
    new THREE.LineBasicMaterial({ color: 0x2d6ca8, transparent: true, opacity: 0.90 })
  );
  wingLEdges.position.set(-3.7, -0.75, 0);
  group.add(wingLEdges);

  // ── Right wing ───────────────────────────────────────────
  const wingRGeo = new THREE.BoxGeometry(2.0, 4.5, 2.4);
  const wingR = new THREE.Mesh(wingRGeo, wingLMat.clone());
  wingR.position.set(3.7, -0.75, 0);
  group.add(wingR);

  const wingREdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(wingRGeo),
    new THREE.LineBasicMaterial({ color: 0x2d6ca8, transparent: true, opacity: 0.90 })
  );
  wingREdges.position.set(3.7, -0.75, 0);
  group.add(wingREdges);

  // ── Base / lobby podium ───────────────────────────────────
  const baseGeo = new THREE.BoxGeometry(8.0, 0.5, 3.6);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0c1a30,
    roughness: 0.06,
    metalness: 0.97,
    emissive: 0x0a1828,
    emissiveIntensity: 0.4,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -3.22;
  group.add(base);

  // ── Ground-level entrance glow strip ─────────────────────
  const glowGeo = new THREE.BoxGeometry(2.5, 0.04, 0.18);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.75,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(0, -2.95, 1.45);
  group.add(glow);

  scene.add(group);
  return { group, blinker: blink };
}

// ─────────────────────────────────────────────────────────────
// UTILITY: ambient particle dust (very minimal)
// ─────────────────────────────────────────────────────────────
function buildParticles(scene) {
  const count = 180;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 38;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x3b82f6,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  return pts;
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ReceptionLobby({ onExit, onEnter }) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const [entered, setEntered] = useState(false);
  const [zoomDone, setZoomDone] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    // ── Scene ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050a12);
    scene.fog = new THREE.FogExp2(0x050a12, 0.022);

    // ── Camera ─────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      300
    );
    // Fixed front view — no controls, no WASD, no mouse look
    camera.position.set(0, 2.0, 22);
    camera.lookAt(0, 0.5, 0);

    // ── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ── Lighting ───────────────────────────────────────────────
    // Dim ambient raised significantly for better overall visibility
    scene.add(new THREE.AmbientLight(0x3060a0, 0.35));

    // Key light from above-left — blue tinted for night feel
    const keyLight = new THREE.DirectionalLight(0x4a90d9, 1.4);
    keyLight.position.set(-8, 18, 12);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Front fill — warm blue — strongest light directly facing the building
    const fillLight = new THREE.DirectionalLight(0x7ab0f8, 1.8);
    fillLight.position.set(0, 4, 22);
    scene.add(fillLight);

    // Blue point glow at building base — very bright
    const baseGlow = new THREE.PointLight(0x3b82f6, 6.0, 20);
    baseGlow.position.set(0, -2.5, 4.0);
    scene.add(baseGlow);

    // Cyan ambient glow from top of spire
    const spireGlow = new THREE.PointLight(0x64ffda, 3.0, 16);
    spireGlow.position.set(0, 8.5, 0);
    scene.add(spireGlow);

    // Subtle rim from left
    const rimLight = new THREE.PointLight(0x1e3a7a, 2.8, 28);
    rimLight.position.set(-12, 2, -5);
    scene.add(rimLight);

    // Right rim fill
    const rimRight = new THREE.PointLight(0x1a3560, 2.0, 24);
    rimRight.position.set(12, 2, -5);
    scene.add(rimRight);

    // ── Scene objects ──────────────────────────────────────────
    buildFloor(scene);
    const { group: buildingGroup, blinker } = buildHQBuilding(scene);
    const particles = buildParticles(scene);

    // ── Render loop ────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId  = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Building very gentle breathing (barely noticeable)
      buildingGroup.position.y = Math.sin(t * 0.4) * 0.03;

      // Blinker pulse
      if (blinker) {
        blinker.material.opacity = 0.4 + Math.abs(Math.sin(t * 2.5)) * 0.6;
        blinker.material.transparent = true;
      }

      // Particles drift
      particles.rotation.y = t * 0.006;
      particles.rotation.x = Math.sin(t * 0.12) * 0.02;

      // Base glow pulse
      baseGlow.intensity = 2.4 + Math.sin(t * 1.2) * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Expose camera for zoom-in on Enter ────────────────────
    window._lobbyCamera  = camera;
    window._lobbyScene   = scene;
    window._lobbyRenderer = renderer;

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      delete window._lobbyCamera;
      delete window._lobbyScene;
      delete window._lobbyRenderer;
      renderer.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Enter button handler — slow zoom in then hand off ──────
  const handleEnter = () => {
    if (entered) return;
    setEntered(true);

    const camera = window._lobbyCamera;
    if (!camera) {
      // Fallback if 3D not ready
      setTimeout(() => { setZoomDone(true); }, 1000);
      return;
    }

    // Slow zoom forward
    gsap.to(camera.position, {
      z: 6,
      y: 2.0,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(0, 1.5, 0),
      onComplete: () => {
        setZoomDone(true);
        // Phase 2 callback or Coming Soon
        onEnter?.();
      },
    });
  };

  return (
    <div className="lobby-container" ref={containerRef}>
      {/* 3D canvas — fixed front view */}
      <canvas className="lobby-canvas" ref={canvasRef} />

      {/* ── Atmospheric vignette / overlay ── */}
      <div className="lobby-vignette" />

      {/* ── Bottom ground-level fog strip ── */}
      <div className="lobby-ground-fog" />

      {/* ── UI Layer ─────────────────────── */}
      {!zoomDone && (
        <div className={`lobby-ui${entered ? ' lobby-ui--zooming' : ''}`}>

          {/* Eyebrow label */}
          <div className="lobby-eyebrow">
            <span className="lobby-eyebrow-dot" />
            Recruiter Mode
          </div>

          {/* Main HQ title */}
          <h1 className="lobby-title">DEEPITH HQ</h1>

          {/* Role */}
          <p className="lobby-role">Software Developer</p>

          {/* Tagline */}
          <p className="lobby-tagline">
            Building software, AI solutions<br />
            and modern web applications.
          </p>

          {/* Enter button */}
          <button
            id="lobby-enter-btn"
            className="lobby-enter-btn"
            onClick={handleEnter}
            disabled={entered}
          >
            <span className="lobby-enter-icon">→</span>
            Enter Headquarters
          </button>

          {/* Subtle hint */}
          {!entered && (
            <p className="lobby-hint">Click to explore the building</p>
          )}

          {/* Coming Soon badge — shown after zoom while Phase 2 loads */}
        </div>
      )}

      {/* Coming Soon overlay after zoom */}
      {zoomDone && (
        <div className="lobby-coming-soon">
          <div className="lobby-coming-soon-badge">
            <span className="lobby-coming-soon-icon">🏗</span>
            <span className="lobby-coming-soon-text">Phase 2 — Engineering Wing</span>
            <span className="lobby-coming-soon-sub">Coming soon</span>
          </div>
          <button className="lobby-back-btn" onClick={() => { setZoomDone(false); setEntered(false); }}>
            ← Back to Lobby
          </button>
        </div>
      )}

      {/* Exit to Fedora OS */}
      <button className="lobby-exit-btn" onClick={onExit} title="Return to Fedora OS">
        <span>✕</span> Exit
      </button>
    </div>
  );
}
