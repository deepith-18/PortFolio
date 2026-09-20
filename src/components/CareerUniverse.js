// src/components/CareerUniverse.js
// Phase 1: Skill Galaxy Only
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import '../styles/CareerUniverse.css';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const NODE_DETAILS = {
  deepith: {
    name: 'Deepith N',
    role: 'Software Developer',
    skills: ['Java', 'Python', 'React', 'AI / ML'],
    note: 'Open To Opportunities',
    isCore: true,
  },
  ai: {
    name: 'Artificial Intelligence',
    level: 'Advanced',
    usedIn: ['AI Resume Screener', 'Fake Review Detection', 'Agentic Pipelines'],
    tech: 'LangChain · OpenAI · HuggingFace',
  },
  python: {
    name: 'Python',
    level: 'Advanced',
    usedIn: ['AI Resume Screener', 'Fake Review Detection', 'Automation Scripts'],
    tech: 'FastAPI · NumPy · Pandas · OpenCV',
  },
  java: {
    name: 'Java',
    level: 'Advanced',
    usedIn: ['Enterprise Systems', 'DSA Projects', 'Backend Services'],
    tech: 'Spring Boot · Hibernate · JUnit',
  },
  react: {
    name: 'React.js',
    level: 'Advanced',
    usedIn: ['This Portfolio', 'Full-Stack Apps', 'Data Dashboards'],
    tech: 'Three.js · GSAP · Redux · Next.js',
  },
  sql: {
    name: 'SQL & Databases',
    level: 'Advanced',
    usedIn: ['AI Screener Backend', 'Data Pipelines', 'Analytics'],
    tech: 'PostgreSQL · MySQL · SQLite · PgVector',
  },
  ml: {
    name: 'Machine Learning',
    level: 'Intermediate → Advanced',
    usedIn: ['Fake Review Detector', 'Predictive Models', 'Classification'],
    tech: 'TensorFlow · PyTorch · Scikit-Learn',
  },
};

// Node layout matching:
//           AI
//   Python      SQL
// Java  DEEPITH  React
//           ML

const NODES_CONFIG = [
  { id: 'deepith', pos: new THREE.Vector3(0,    0,    0),  size: 0.88, isCore: true  },
  { id: 'ai',     pos: new THREE.Vector3(0,    4.6,  0.5), size: 0.44 },
  { id: 'python', pos: new THREE.Vector3(-3.6, 2.5,  0),  size: 0.44 },
  { id: 'sql',    pos: new THREE.Vector3( 3.6, 2.5,  0),  size: 0.44 },
  { id: 'java',   pos: new THREE.Vector3(-5.2, 0,    0.5), size: 0.44 },
  { id: 'react',  pos: new THREE.Vector3( 5.2, 0,    0.5), size: 0.44 },
  { id: 'ml',     pos: new THREE.Vector3(0,   -3.6,  0.5), size: 0.44 },
];

// Only hub-spoke connections — no spaghetti
const CONNECTIONS = [
  { from: 'deepith', to: 'ai'     },
  { from: 'deepith', to: 'python' },
  { from: 'deepith', to: 'java'   },
  { from: 'deepith', to: 'react'  },
  { from: 'deepith', to: 'sql'    },
  { from: 'deepith', to: 'ml'     },
];

// Colors — Fedora Blue, Cyan, White only
const C = {
  blue:  0x3b82f6,
  cyan:  0x64ffda,
  white: 0xffffff,
  bg:    0x030810,
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function CareerUniverse({ onExit }) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);

  const [welcomePhase, setWelcomePhase]   = useState('intro');
  const [activeNodeId, setActiveNodeId]   = useState(null);
  const [isZoomedIn, setIsZoomedIn]       = useState(false); // true when autopiloted to a node

  // Render loop refs — never stale state
  const autopilotRef  = useRef(false);
  const activeNodeRef = useRef(null);
  const isZoomedRef   = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    container.focus();

    // Dismiss welcome overlay after 3s
    const dismissTimer = setTimeout(() => setWelcomePhase('hidden'), 3200);

    // ── Scene ────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020508);  // deep space black
    scene.fog = new THREE.FogExp2(0x020508, 0.016); // lighter fog — wider visible depth

    // ── Camera ───────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      500
    );
    camera.position.set(0, 4, 28);   // start zoomed out
    camera.lookAt(0, 0.8, 0);

    // ── Renderer ─────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ── Lighting ─────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.10));

    const keyLight = new THREE.DirectionalLight(C.blue, 0.40);
    keyLight.position.set(-8, 12, 10);
    scene.add(keyLight);

    const cyanPoint = new THREE.PointLight(C.cyan, 2.0, 18);
    cyanPoint.position.set(0, 0.5, 0);
    scene.add(cyanPoint);

    // ════════════════════════════════════════════════
    // REAL GALAXY BACKGROUND
    // 3 star layers + 3 nebula layers
    // Think: Hubble Deep Field, Milky Way, Orion Nebula
    // ════════════════════════════════════════════════

    // ── Layer 1: Dense Milky Way band (concentrated in a tilted plane) ──
    const mwCount = 1800;
    const mwPos   = new Float32Array(mwCount * 3);
    const mwCol   = new Float32Array(mwCount * 3);
    for (let i = 0; i < mwCount; i++) {
      // Distribute in a tilted disc (the Milky Way plane)
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random();  // 0-1, use power for more central density
      const rad    = 40 + Math.pow(spread, 0.4) * 110;
      const bandH  = (Math.random() - 0.5) * (20 + spread * 15); // thin disc
      // Tilt the band ~25 degrees across the sky
      const x = Math.cos(angle) * rad;
      const y = bandH + Math.sin(angle) * rad * 0.08; // slight curve
      const z = Math.sin(angle) * rad;
      mwPos[i*3]   = x;
      mwPos[i*3+1] = y;
      mwPos[i*3+2] = z;
      // Star colors: hot blue-white, medium white-yellow, warm orange-red
      const rnd = Math.random();
      if (rnd < 0.25) {
        // Blue-white hot stars (O/B type)
        mwCol[i*3]=0.60; mwCol[i*3+1]=0.75; mwCol[i*3+2]=1.00;
      } else if (rnd < 0.60) {
        // White / yellow-white (A/F/G type — like our Sun)
        mwCol[i*3]=1.00; mwCol[i*3+1]=0.97; mwCol[i*3+2]=0.88;
      } else if (rnd < 0.82) {
        // Warm yellow-orange (K type)
        mwCol[i*3]=1.00; mwCol[i*3+1]=0.82; mwCol[i*3+2]=0.55;
      } else {
        // Red giants (M type)
        mwCol[i*3]=1.00; mwCol[i*3+1]=0.45; mwCol[i*3+2]=0.30;
      }
    }
    const mwGeo = new THREE.BufferGeometry();
    mwGeo.setAttribute('position', new THREE.BufferAttribute(mwPos, 3));
    mwGeo.setAttribute('color',    new THREE.BufferAttribute(mwCol, 3));
    const mwMat = new THREE.PointsMaterial({
      size: 0.35, vertexColors: true,
      transparent: true, opacity: 0.65, sizeAttenuation: true,
    });
    const milkyWay = new THREE.Points(mwGeo, mwMat);
    scene.add(milkyWay);

    // ── Layer 2: Sparse foreground stars (all around, brighter) ──
    const starCount = 600;
    const starPos   = new Float32Array(starCount * 3);
    const starCol   = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 50 + Math.random() * 80;
      starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i*3+2] = r * Math.cos(phi);
      const rnd = Math.random();
      if (rnd < 0.15) {
        starCol[i*3]=0.55; starCol[i*3+1]=0.80; starCol[i*3+2]=1.00; // blue-white
      } else if (rnd < 0.55) {
        starCol[i*3]=1.00; starCol[i*3+1]=1.00; starCol[i*3+2]=1.00; // pure white
      } else if (rnd < 0.78) {
        starCol[i*3]=1.00; starCol[i*3+1]=0.90; starCol[i*3+2]=0.70; // warm yellow
      } else {
        starCol[i*3]=1.00; starCol[i*3+1]=0.55; starCol[i*3+2]=0.35; // orange-red
      }
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.75, vertexColors: true,
      transparent: true, opacity: 0.90, sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Layer 3: Giant bright stars (a few dozen very bright points) ──
    const giantCount = 35;
    const giantPos   = new Float32Array(giantCount * 3);
    const giantCol   = new Float32Array(giantCount * 3);
    for (let i = 0; i < giantCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 45 + Math.random() * 60;
      giantPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      giantPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      giantPos[i*3+2] = r * Math.cos(phi);
      const rnd = Math.random();
      if (rnd < 0.4) {
        giantCol[i*3]=0.75; giantCol[i*3+1]=0.88; giantCol[i*3+2]=1.00; // blue supergiant
      } else {
        giantCol[i*3]=1.00; giantCol[i*3+1]=1.00; giantCol[i*3+2]=1.00; // white supergiant
      }
    }
    const giantGeo = new THREE.BufferGeometry();
    giantGeo.setAttribute('position', new THREE.BufferAttribute(giantPos, 3));
    giantGeo.setAttribute('color',    new THREE.BufferAttribute(giantCol, 3));
    const giantMat = new THREE.PointsMaterial({
      size: 1.6, vertexColors: true,
      transparent: true, opacity: 1.0, sizeAttenuation: true,
    });
    const giantStars = new THREE.Points(giantGeo, giantMat);
    scene.add(giantStars);

    // ── Nebula Layer 1: Purple/Violet (like Orion Nebula) ──
    const neb1Count = 250;
    const neb1Pos   = new Float32Array(neb1Count * 3);
    const neb1Col   = new Float32Array(neb1Count * 3);
    for (let i = 0; i < neb1Count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad   = 25 + Math.random() * 60;
      neb1Pos[i*3]   = Math.cos(angle) * rad + (Math.random()-0.5)*30;
      neb1Pos[i*3+1] = (Math.random() - 0.5) * 50;
      neb1Pos[i*3+2] = Math.sin(angle) * rad + (Math.random()-0.5)*25;
      const rnd = Math.random();
      if (rnd < 0.5) {
        neb1Col[i*3]=0.55; neb1Col[i*3+1]=0.15; neb1Col[i*3+2]=0.85;
      } else {
        neb1Col[i*3]=0.75; neb1Col[i*3+1]=0.30; neb1Col[i*3+2]=0.95;
      }
    }
    const neb1Geo = new THREE.BufferGeometry();
    neb1Geo.setAttribute('position', new THREE.BufferAttribute(neb1Pos, 3));
    neb1Geo.setAttribute('color',    new THREE.BufferAttribute(neb1Col, 3));
    const neb1Mat = new THREE.PointsMaterial({
      size: 0.45, vertexColors: true,
      transparent: true, opacity: 0.35, sizeAttenuation: true,
    });
    const nebula1 = new THREE.Points(neb1Geo, neb1Mat);
    scene.add(nebula1);

    // ── Nebula Layer 2: Blue/Teal (reflection nebula) ──
    const neb2Count = 200;
    const neb2Pos   = new Float32Array(neb2Count * 3);
    const neb2Col   = new Float32Array(neb2Count * 3);
    for (let i = 0; i < neb2Count; i++) {
      const angle = Math.random() * Math.PI * 2 + 1.2;
      const rad   = 20 + Math.random() * 50;
      neb2Pos[i*3]   = Math.cos(angle) * rad * 1.3 + (Math.random()-0.5)*35;
      neb2Pos[i*3+1] = (Math.random() - 0.5) * 40;
      neb2Pos[i*3+2] = Math.sin(angle) * rad + (Math.random()-0.5)*20;
      const rnd = Math.random();
      if (rnd < 0.5) {
        neb2Col[i*3]=0.10; neb2Col[i*3+1]=0.45; neb2Col[i*3+2]=0.95;
      } else {
        neb2Col[i*3]=0.15; neb2Col[i*3+1]=0.75; neb2Col[i*3+2]=0.90;
      }
    }
    const neb2Geo = new THREE.BufferGeometry();
    neb2Geo.setAttribute('position', new THREE.BufferAttribute(neb2Pos, 3));
    neb2Geo.setAttribute('color',    new THREE.BufferAttribute(neb2Col, 3));
    const neb2Mat = new THREE.PointsMaterial({
      size: 0.40, vertexColors: true,
      transparent: true, opacity: 0.30, sizeAttenuation: true,
    });
    const nebula2 = new THREE.Points(neb2Geo, neb2Mat);
    scene.add(nebula2);

    // ── Nebula Layer 3: Faint magenta/pink (like Crab Nebula) ──
    const neb3Count = 150;
    const neb3Pos   = new Float32Array(neb3Count * 3);
    const neb3Col   = new Float32Array(neb3Count * 3);
    for (let i = 0; i < neb3Count; i++) {
      const angle = Math.random() * Math.PI * 2 + 2.8;
      const rad   = 30 + Math.random() * 55;
      neb3Pos[i*3]   = Math.cos(angle) * rad + (Math.random()-0.5)*20;
      neb3Pos[i*3+1] = (Math.random() - 0.5) * 35;
      neb3Pos[i*3+2] = Math.sin(angle) * rad * 0.7 + (Math.random()-0.5)*15;
      neb3Col[i*3]=0.90; neb3Col[i*3+1]=0.30; neb3Col[i*3+2]=0.65;
    }
    const neb3Geo = new THREE.BufferGeometry();
    neb3Geo.setAttribute('position', new THREE.BufferAttribute(neb3Pos, 3));
    neb3Geo.setAttribute('color',    new THREE.BufferAttribute(neb3Col, 3));
    const neb3Mat = new THREE.PointsMaterial({
      size: 0.38, vertexColors: true,
      transparent: true, opacity: 0.28, sizeAttenuation: true,
    });
    const nebula3 = new THREE.Points(neb3Geo, neb3Mat);
    scene.add(nebula3);

    // Subtle grid — barely visible, just for depth cue
    const grid = new THREE.GridHelper(80, 50, 0x0a1628, 0x060d18);
    grid.position.y = -3.5;
    grid.material.transparent = true;
    grid.material.opacity = 0.08;
    scene.add(grid);


    // ── Build Skill Nodes ────────────────────
    const nodeMap   = {};       // id → mesh
    const nodesGroup = new THREE.Group();

    NODES_CONFIG.forEach(cfg => {
      const color = cfg.isCore ? C.white : C.blue;

      // Core sphere
      const geo = new THREE.SphereGeometry(cfg.size, 40, 40);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: cfg.isCore ? C.cyan : C.blue,
        emissiveIntensity: cfg.isCore ? 0.9 : 0.7,
        roughness: 0.12,
        metalness: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(cfg.pos);
      mesh.userData = {
        id:      cfg.id,
        basePos: cfg.pos.clone(),
        isCore:  cfg.isCore || false,
        size:    cfg.size,
      };

      // Wireframe halo
      const haloGeo = new THREE.SphereGeometry(cfg.size * 1.4, 14, 14);
      const haloMat = new THREE.MeshBasicMaterial({
        color:       cfg.isCore ? C.cyan : C.blue,
        wireframe:   true,
        transparent: true,
        opacity:     cfg.isCore ? 0.28 : 0.16,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      mesh.add(halo);

      // Outer glow ring (torus) for core node only
      if (cfg.isCore) {
        const ringGeo = new THREE.TorusGeometry(1.2, 0.03, 8, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: C.cyan, transparent: true, opacity: 0.45,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);

        const ring2Geo = new THREE.TorusGeometry(1.55, 0.02, 8, 48);
        const ring2Mat = new THREE.MeshBasicMaterial({
          color: C.blue, transparent: true, opacity: 0.28,
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 4;
        mesh.add(ring2);
      }

      nodesGroup.add(mesh);
      nodeMap[cfg.id] = mesh;
    });
    scene.add(nodesGroup);

    // ── Connection Lines (hub-spoke) ─────────
    const pulseParticles = [];

    CONNECTIONS.forEach(conn => {
      const fromMesh = nodeMap[conn.from];
      const toMesh   = nodeMap[conn.to];
      if (!fromMesh || !toMesh) return;

      const p1 = fromMesh.userData.basePos;
      const p2 = toMesh.userData.basePos;

      // Mid-point slight arc to avoid overlaps
      const mid = p1.clone().lerp(p2, 0.5);
      mid.z -= 0.4;

      const curve      = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(36);
      const lineGeo    = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat    = new THREE.LineBasicMaterial({
        color:       C.cyan,
        transparent: true,
        opacity:     0.38,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      // Data pulse along the line
      const pulseGeo = new THREE.SphereGeometry(0.055, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: C.cyan, transparent: true, opacity: 0.85,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(pulseMesh);

      pulseParticles.push({
        mesh:     pulseMesh,
        curve,
        progress: Math.random(),
        speed:    0.006 + Math.random() * 0.005,
      });
    });

    // Home position constant — overview of the full galaxy
    const HOME = { x: 0, y: 1.8, z: 15 };
    const LOOK_AT = new THREE.Vector3(0, 0.8, 0);

    // Intro zoom from high up
    gsap.to(camera.position, {
      x: HOME.x, y: HOME.y, z: HOME.z,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => camera.lookAt(LOOK_AT),
      onComplete: () => camera.lookAt(LOOK_AT),
    });

    // Expose home function so the React button can call it
    const goHome = () => {
      if (autopilotRef.current) return;
      autopilotRef.current = true;
      isZoomedRef.current = false;
      setIsZoomedIn(false);
      setActiveNodeId(null);
      activeNodeRef.current = null;
      gsap.to(camera.position, {
        x: HOME.x, y: HOME.y, z: HOME.z,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate:  () => camera.lookAt(LOOK_AT),
        onComplete: () => {
          camera.lookAt(LOOK_AT);
          autopilotRef.current = false;
        },
      });
    };
    window._universeGoHome = goHome;

    // ── CHANGE 2: Click-only autopilot. No WASD. No mouse-look. ──
    const raycaster = new THREE.Raycaster();
    const mouse2    = new THREE.Vector2();

    const triggerAutopilot = (targetMesh) => {
      autopilotRef.current = true;

      const targetPos = new THREE.Vector3();
      targetMesh.getWorldPosition(targetPos);
      const pullBack = targetMesh.userData.isCore ? 5.2 : 3.8;
      targetPos.z += pullBack;
      targetPos.y = 1.8;

      gsap.to(camera.position, {
        x: targetPos.x, y: targetPos.y, z: targetPos.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const lp = new THREE.Vector3();
          targetMesh.getWorldPosition(lp);
          camera.lookAt(lp);
        },
        onComplete: () => {
          autopilotRef.current = false;
          isZoomedRef.current = true;
          setIsZoomedIn(true);
          const lp = new THREE.Vector3();
          targetMesh.getWorldPosition(lp);
          camera.lookAt(lp);
        },
      });
    };

    const onCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse2.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse2.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse2, camera);
      const hits = raycaster.intersectObjects(nodesGroup.children, true);
      if (hits.length > 0) {
        let obj = hits[0].object;
        while (obj.parent && obj.parent !== scene && !obj.userData.id) obj = obj.parent;
        if (obj?.userData.id) {
          setWelcomePhase('hidden');
          triggerAutopilot(obj);
        }
      }
    };

    const onCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse2.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse2.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse2, camera);
      const hits = raycaster.intersectObjects(nodesGroup.children, true);
      canvas.style.cursor = hits.length > 0 ? 'pointer' : 'default';
    };

    canvas.addEventListener('click',     onCanvasClick);
    canvas.addEventListener('mousemove', onCanvasMouseMove);

    // ── Render Loop ──────────────────────────
    const clock = new THREE.Clock();
    let animId  = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Advance clock; read elapsed time for all animations
      clock.getDelta(); // keeps internal clock ticking
      const t = clock.elapsedTime;

      // Galaxy rotation — each layer drifts at different rate
      stars.rotation.y    = t * 0.003;
      milkyWay.rotation.y = t * 0.002;
      giantStars.rotation.y = t * 0.003;
      nebula1.rotation.y  = t * 0.0008;
      nebula2.rotation.y  = -t * 0.0005;  // counter-rotate for parallax
      nebula3.rotation.y  = t * 0.0012;

      // Node animations
      nodesGroup.children.forEach(node => {
        const base   = node.userData.basePos;
        const isCore = node.userData.isCore;
        const freq   = isCore ? 0.7 : 1.1;
        const amp    = isCore ? 0.12 : 0.08;

        node.position.y = base.y + Math.sin(t * freq + base.x) * amp;

        if (isCore) {
          node.rotation.y = t * 0.20;
          const ring1 = node.children[1];
          const ring2 = node.children[2];
          if (ring1) ring1.rotation.z = t * 0.40;
          if (ring2) ring2.rotation.z = -t * 0.25;

          // Change 3: Very subtle pulse — 1.0 → 1.05 → 1.0 every 3 seconds
          const cycle = t % 3.0;
          const pulseExtra = cycle < 0.5
            ? Math.sin((cycle / 0.5) * Math.PI) * 0.05
            : 0;
          node.scale.setScalar(1.0 + pulseExtra);
          node.material.emissiveIntensity = 0.9 + pulseExtra * 1.5;
        }

        const halo = node.children[0];
        if (halo) {
          halo.rotation.y = t * 0.22 * (isCore ? 1.4 : 1);
          halo.rotation.x = t * 0.10;
        }
      });

      // Pulse particles
      pulseParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        p.mesh.position.copy(p.curve.getPointAt(p.progress));
      });

      // Camera always looks at galaxy center when not on autopilot
      if (!autopilotRef.current) {
        camera.lookAt(0, 0.8, 0);
      }

      // No WASD — click autopilot only


      // ── Proximity Detection ─────────────────
      let closest = null;
      let minDist = Infinity;

      nodesGroup.children.forEach(node => {
        const d = camera.position.distanceTo(node.position);
        node.material.emissiveIntensity = node.userData.isCore ? 0.9 : 0.7;
        node.scale.setScalar(1.0);
        if (d < minDist) { minDist = d; closest = node; }
      });

      if (closest && minDist < 4.5) {
        if (!closest.userData.isCore) {
          // Skill nodes glow on proximity
          closest.material.emissiveIntensity = 1.6 + Math.sin(t * 5.5) * 0.3;
          closest.scale.setScalar(1.15);
        }
        if (activeNodeRef.current !== closest.userData.id) {
          activeNodeRef.current = closest.userData.id;
          setActiveNodeId(closest.userData.id);
        }
      } else {
        if (activeNodeRef.current !== null) {
          activeNodeRef.current = null;
          setActiveNodeId(null);
        }
      }

      // ── Floating HTML Label Projections ─────
      const tmp = new THREE.Vector3();
      nodesGroup.children.forEach(node => {
        const id  = node.userData.id;
        const el  = document.getElementById(`nlabel-${id}`);
        if (!el) return;

        node.getWorldPosition(tmp);
        const dist = camera.position.distanceTo(tmp);
        tmp.project(camera);

        if (tmp.z > 1.0) { el.style.opacity = '0'; return; }

        const px = (tmp.x *  0.5 + 0.5) * container.clientWidth;
        const py = (tmp.y * -0.5 + 0.5) * container.clientHeight;
        el.style.transform = `translate(-50%, -140%) translate(${px}px, ${py}px)`;

        let opacity = 1.0;
        if (dist > 16) opacity = Math.max(0, 1 - (dist - 16) / 10);
        el.style.opacity = String(opacity);
        el.classList.toggle('active', id === closest?.userData.id && minDist < 4.5);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ──────────────────────────────
    return () => {
      clearTimeout(dismissTimer);
      cancelAnimationFrame(animId);
      delete window._universeGoHome;
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('click',     onCanvasClick);
      canvas.removeEventListener('mousemove', onCanvasMouseMove);
      renderer.dispose();
      mwGeo.dispose();   mwMat.dispose();
      starGeo.dispose(); starMat.dispose();
      giantGeo.dispose(); giantMat.dispose();
      neb1Geo.dispose(); neb1Mat.dispose();
      neb2Geo.dispose(); neb2Mat.dispose();
      neb3Geo.dispose(); neb3Mat.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeNode = activeNodeId ? NODE_DETAILS[activeNodeId] : null;

  return (
    <div
      className="universe-container"
      ref={containerRef}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      {/* 3D Canvas */}
      <canvas className="universe-canvas" ref={canvasRef} />

      {/* ── Floating HTML Labels ── */}
      <div className="universe-labels-container">
        {NODES_CONFIG.map(n => (
          <div
            key={n.id}
            id={`nlabel-${n.id}`}
            className={`node-floating-label${n.isCore ? ' core-node' : ''}`}
          >
            {n.id === 'deepith' ? 'DEEPITH' : n.id.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ── Welcome Overlay ── */}
      <div className={`universe-welcome-overlay${welcomePhase === 'hidden' ? ' fade-out' : ''}`}>
        <div className="universe-welcome-title">Welcome, Recruiter</div>
        <div className="universe-welcome-sub">Explore my skill network</div>
        <div className="universe-welcome-hint click-hint">
          Click any node to inspect
        </div>
      </div>

      {/* ── Node Proximity HUD Card ── */}
      <div className={`universe-node-hud${activeNode ? ' active' : ''}`}>
        {activeNode && (
          activeNode.isCore ? (
            // DEEPITH core card
            <div className="hud-core-card">
              <div className="hud-core-name">{activeNode.name}</div>
              <div className="hud-core-role">{activeNode.role}</div>
              <div className="hud-core-skills">
                {activeNode.skills.map(s => (
                  <span key={s} className="hud-skill-pill">{s}</span>
                ))}
              </div>
              <div className="hud-core-note">{activeNode.note}</div>
            </div>
          ) : (
            // Skill card
            <div className="hud-skill-card">
              <div className="hud-skill-name">{activeNode.name}</div>
              <div className="hud-skill-level">Level: {activeNode.level}</div>
              <div className="hud-section-label">Used In:</div>
              <ul className="hud-used-in">
                {activeNode.usedIn.map(u => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
              <div className="hud-tech">{activeNode.tech}</div>
            </div>
          )
        )}
      </div>

      {/* ── Controls HUD ── */}
      <div className="universe-controls-hud">
        <div className="hud-row">
          <span className="hud-key">Click</span>
          <span>any skill to inspect</span>
        </div>
      </div>

      {/* ── Back to Overview Button (shown when zoomed into a node) ── */}
      {isZoomedIn && (
        <button
          className="universe-back-btn"
          onClick={() => window._universeGoHome?.()}
        >
          ← Overview
        </button>
      )}

      {/* ── Exit ── */}
      <button className="universe-exit-btn" onClick={onExit} title="Return to Fedora OS">
        <span>✕</span> Exit
      </button>
    </div>
  );
}
