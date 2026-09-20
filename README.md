<div align="center">

# Deepith N — Portfolio & Interactive 3D Workshop

<p align="center">
  <strong>Interactive Developer Portfolio • 3D Virtual Studio • Hyprland OS Web Simulator</strong>
</p>

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.179-black?style=for-the-badge&logo=three.dot.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-8.18-red?style=for-the-badge&logo=three.dot.js&logoColor=white)](https://r3f.docs.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status: Open to Work](https://img.shields.io/badge/Status-Open_to_Opportunities-success?style=for-the-badge)](mailto:deepithdeekshith@gmail.com)

<br />

[Portfolio Modes](#portfolio-modes--experiences) •
[Featured Projects](#featured-projects) •
[Technical Skills](#technical-skills--stack) •
[3D Workshop](#3d-workshop-controls-guide) •
[Getting Started](#getting-started-locally) •
[Contact](#connect--contact)

---

</div>

## Executive Summary

> **Building Software That Solves Real Problems**
>
> I’m a Computer Science & Engineering graduate focused on building reliable, scalable, and user-centered software. I enjoy turning ideas into practical solutions through clean code, thoughtful system design, and modern development technologies.
>
> From backend services and full-stack applications to automation and intelligent systems, I’m driven by curiosity, continuous learning, and a strong foundation in software engineering. I focus on writing maintainable code, understanding systems from the ground up, and building products that are both functional and meaningful.

---

## Portfolio Modes & Experiences

This application integrates three distinct environments designed for comprehensive technical evaluation and interactive discovery:

```
                  ┌─────────────────────────────────────────┐
                  │            App Entry Router             │
                  └────────────────────┬────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│  Portfolio View  │         │   3D Workshop    │         │   Hyprland OS    │
│  (Modern Clean)  │         │   (R3F / Three)  │         │  (Web Simulator) │
└──────────────────┘         └──────────────────┘         └──────────────────┘
```

### 1. Unified Recruiter Portfolio View (`/` or `#/`)
- **Glassmorphic Interface**: Dark aesthetic built on clean CSS design tokens, glowing accent gradients, and typography optimized for readability.
- **Dynamic Role Rotation**: Transitions across key engineering capabilities (*Software Developer*, *AI Systems Engineer*, *Full-Stack Engineer*, *Machine Learning Specialist*, *Backend Systems Architect*).
- **Interactive Code Inspector**: Live toggleable preview for TypeScript schema (`developer.ts`) and telemetry metrics (`metrics.json`) with one-click clipboard copying.
- **Categorized Project Filtering**: Immediate filtering across **AI / ML**, **Systems & Security**, and **Full-Stack**.
- **Neomorphic Custom Cursor**: Cursor with dynamic hover scaling and click states, automatically disabled on touch devices for mobile ergonomics.

### 2. 3D Virtual Studio Workshop (`#/workshop`)
- **WebGL / Three.js Pipeline**: Engineered using `@react-three/fiber`, `@react-three/drei`, and postprocessing shaders.
- **First-Person & Third-Person Exploration**: Free movement via keyboard (`WASD` / Arrow keys) with pointer-lock mouse look.
- **Virtual Joystick on Mobile**: Dedicated on-screen thumbstick providing navigation on mobile screens and tablets.
- **Interactive Workstations**: In-world computer terminals that present project specifications and live demonstrations upon proximity.
- **Real-Time Lighting**: Physically based lighting, point sources, and emissive hardware glow.

### 3. Hyprland OS Desktop Simulator (`#/os` or `#/desktop`)
- **Tiling Window Management**: Web-based replica of the Hyprland compositor paired with a Waybar status panel.
- **Draggable & Resizable Floating Windows**: Terminal emulator, portfolio explorer, and system diagnostics.
- **Interactive Command Line**: Shell environment supporting command execution and navigation inside the browser.

---

## Technical Skills & Stack

<table align="center">
  <tr>
    <td align="center" width="25%"><strong>Languages</strong></td>
    <td width="75%">Python, Java, JavaScript (ES6+), C, SQL, HTML5, CSS3</td>
  </tr>
  <tr>
    <td align="center"><strong>Frontend & 3D</strong></td>
    <td>React.js, Next.js, Three.js, React Three Fiber (R3F), Drei, Framer Motion, GSAP, Vanilla CSS</td>
  </tr>
  <tr>
    <td align="center"><strong>Backend & APIs</strong></td>
    <td>FastAPI, Flask, Node.js, REST APIs, Socket.IO, Streamlit</td>
  </tr>
  <tr>
    <td align="center"><strong>AI, ML & CV</strong></td>
    <td>PyTorch, TensorFlow, BERT & Transformers, OpenCV, DeepFace, NLP, Scikit-Learn, Pandas, NumPy</td>
  </tr>
  <tr>
    <td align="center"><strong>Databases & Storage</strong></td>
    <td>MySQL, MongoDB, SQLite, ORM (SQLAlchemy), Database Schema Design</td>
  </tr>
  <tr>
    <td align="center"><strong>Infrastructure & Tools</strong></td>
    <td>Git, GitHub, Docker, Linux / Bash, Kubernetes (Kind), Postman, Bugzilla, CI/CD Workflows</td>
  </tr>
  <tr>
    <td align="center"><strong>Engineering Core</strong></td>
    <td>System Architecture, Data Structures & Algorithms, Multithreading, Cryptography, MVC Architecture</td>
  </tr>
</table>

---

## Featured Projects

| Project | Domain | Technologies | Highlights | Links |
| :--- | :--- | :--- | :--- | :---: |
| **Code from Design** | AI / Computer Vision | React, FastAPI, OpenCV, Python | Converts UI mockups into clean React code. Heuristic layout detection with 95% precision and sandboxed live preview. | [Code](https://github.com/deepith-18/Code-from-Design) |
| **Fake Review Detection** | NLP / Deep Learning | BERT, PyTorch, Scikit-Learn, Python | Evaluated BERT against traditional ML (Random Forest, Naive Bayes). Achieved 98% accuracy utilizing dense contextual embeddings. | [Code](https://github.com/deepith-18/Major_Project) |
| **Smart Health Advisor** | Generative AI | Google Gemini API, Streamlit, Python | Diagnostic healthcare advisor parsing symptoms, generating condition breakdowns, diet suggestions, and TTS audio narration. | [Code](https://github.com/deepith-18/Smart-Health-Advisor) |
| **Network Intrusion Detection** | Systems & Security | Scapy, Flask, Socket.IO, Cryptography | Real-time packet sniffer detecting Port Scans, SYN Floods, and DoS attacks. Logs cryptographically secured using Fernet encryption. | [Code](https://github.com/deepith-18/Network-IDS) |
| **AI Warehouse Optimization** | Machine Learning | Python, Scikit-Learn, Data Analytics | Optimized inventory tracking and demand forecasting. Improved prediction accuracy by 30% and cut processing latency by 40%. | [Code](https://github.com/deepith-18/AI-for-Warehouse-Optimization) |
| **Courier Management System** | Full-Stack / DBMS | Python, MySQL, Tkinter | End-to-end logistics & shipment tracking system with robust relational schema design and intuitive warehouse operator GUI. | [Code](https://github.com/deepith-18/Courier-Management-DBMS-Mini-Project) |
| **Facial Emotion AI** | Computer Vision | OpenCV, DeepFace, Python | Real-time facial emotion recognition running at 30+ FPS across 7 emotional states with dynamic live confidence telemetry. | [Code](https://github.com/deepith-18/Sentimental_analysis) |
| **Studicholic Video Gen** | Generative AI / TTS | Python, NLP, TTS, Video Synthesis | Automatically transforms uploaded PDF notes into narrated educational video lectures with synchronized visual slides. | [Code](https://github.com/deepith-18/StudentHolic-AI) |
| **AlgoVis Pro** | Systems & Software | Java, JavaFX, Multithreading, MVC | Interactive algorithm visualizer featuring non-blocking multithreaded sorting animations (Merge, Quick, Insertion) with real-time stats. | [Code](https://github.com/deepith-18/AlgoVisPro) |

---

## Open Source Contributions

* **[Kubernetes Controller (kro)](https://github.com/kubernetes-sigs/kro)** — Investigated Common Expression Language (CEL) evaluation in the kro Kubernetes controller. Configured local Kind clusters, deployed CRDs, executed the controller from source, and submitted minimal reproducible test cases to upstream maintainers.
* **[Web Platform Tests (WPT)](https://github.com/web-platform-tests/wpt)** — Authored web standards conformance test suites for HTML and CSS specifications executed continuously across Chromium, Firefox (Gecko), and WebKit engines.
* **[Mozilla Firefox (Bugzilla)](https://bugzilla.mozilla.org/)** — Investigated and documented minimal reproducible test cases for CSS Flexbox layout calculation behaviors in coordination with core Gecko engine engineers.
* **Open Source Ecosystem** — Diagnosed test suite failures, mitigated CI/CD pipeline flakiness, and submitted clean atomic commits via standard Git rebase workflows.

---

## Education & Certifications

### Education
- **Bachelor of Technology in Computer Science & Engineering** (2022 – 2026)  
  *ACS College of Engineering, Bengaluru* — **CGPA: 9.31 / 10**  
  *Specialization in Algorithms, AI, and Distributed Systems • Dean's Honor Roll*
- **Senior Secondary (+2 Science PCMB)** (2020 – 2022)  
  *Jawahar Navodaya Vidyalaya (JNV)* — **83%**
- **Secondary School (SSLC)** (2019 – 2020)  
  *Adarsha Vidyalaya* — **92%**

### Verified Certifications
- **NPTEL Programming in Java** — IIT Kharagpur / Ministry of Education ([Verification](https://drive.google.com/file/d/1ORMZk3fh_ct3qdxtbNClBBu7oeN9aCiu/view))
- **NPTEL Programming in Python** — IIT Madras ([Verification](https://drive.google.com/file/d/1FXAibJLrt-Y8CyefUlQ7Dh-cJH9MUrBv/view))
- **NPTEL Artificial Intelligence: Concepts & Techniques** — IIT ([Verification](https://drive.google.com/file/d/1Tuki8k3H9t6U3i8Qizw33FyO-2Dx4Yzb/view))
- **Microsoft Generative AI Career Essentials** — Microsoft & LinkedIn ([Verification](https://drive.google.com/file/d/1OPN1YRGVt1Q6BNZQu9zcQO4tVVc1JxC0/view))
- **Coursera Core Java Specialization** — Coursera ([Verification](https://drive.google.com/file/d/1HAPJYhICZS9bDl9K-KBAKwNPHrE1XC0Z/view))
- **Database Management Systems (DBMS)** — Infosys Springboard ([Verification](https://drive.google.com/file/d/1Pqtvmyuam1wUZEOrafU4ztMcKhbvLatC/view))

---

## 3D Workshop Controls Guide

When entering the **3D Virtual Studio Workshop** mode (`#/workshop`):

| Control | Action |
| :--- | :--- |
| `W` / `Up Arrow` | Move Forward |
| `S` / `Down Arrow` | Move Backward |
| `A` / `Left Arrow` | Move Left / Strafe |
| `D` / `Right Arrow` | Move Right / Strafe |
| `Mouse Drag` | Camera Look (Pitch & Yaw) |
| `Space` | Jump / Interact |
| `Shift` | Sprint / Boost Speed |
| `On-screen Joypad` | Touch Controls on Mobile & Tablet Devices |
| `Esc` / Header Button | Return to standard portfolio view |

---

## Project Architecture

```
Portfolio me/
├── public/
│   ├── index.html            # Main HTML entry with SEO metadata and typography
│   ├── DeepithN.pdf          # Resume document
│   └── *.png                 # Visual assets and project media
├── src/
│   ├── App.js                # Router orchestrating Portfolio, Workshop, and OS modes
│   ├── App.css               # Base layout styling
│   ├── index.js              # React 18 DOM mount point
│   ├── components/           # Core portfolio views and modules
│   │   ├── MainPortfolio.js  # Primary portfolio view
│   │   ├── Desktop.js        # Hyprland OS window manager simulator
│   │   ├── Taskbar.js        # Waybar taskbar interface
│   │   ├── Hero.js           # Header presentation
│   │   ├── LaptopScene.js    # Interactive 3D laptop preview
│   │   └── ...
│   ├── workshop/             # 3D Virtual Studio Workshop (Three.js & R3F)
│   │   ├── WorkshopApp.js    # Workshop scene orchestration
│   │   ├── scene/            # 3D meshes, room geometry, and lighting
│   │   ├── player/           # Keyboard and mobile touch controllers
│   │   └── ui/               # Heads-up display, joystick, and dialogues
│   └── styles/
│       └── MainPortfolio.css # Glassmorphic design tokens and styles
└── package.json              # Dependencies and build scripts
```

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (`v16.0.0` or higher, tested on `v18+` / `v20+`)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the repository
```bash
git clone https://github.com/deepith-18/PortFolio.git
cd PortFolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm start
```
Navigate to [http://localhost:3000](http://localhost:3000) in your web browser. The application supports hot reloading on source updates.

### 4. Build for production
```bash
npm run build
```
Generates a minified, production-ready bundle in the `build/` directory suitable for static hosting.

---

## Connect & Contact

<div align="center">

[![Email](https://img.shields.io/badge/Email-deepithdeekshith%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:deepithdeekshith@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Deepith_N-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/deepithn1718/)
[![GitHub](https://img.shields.io/badge/GitHub-deepith--18-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/deepith-18)

<br />

**Deepith N** • Bengaluru, Karnataka, India  
*Available for full-time software engineering roles, distributed systems engineering, and technology teams.*

</div>

---

<div align="center">
  <sub>Built with React, Three.js, and Modern Web Standards. © 2026 Deepith N.</sub>
</div>
