# Interactive 3D Portfolio & Virtual Studio

A web-based personal portfolio built with React and Three.js, featuring an interactive 3D virtual workshop and a simulated Linux desktop environment.

## Overview

This repository contains the source code for an interactive portfolio website. In addition to a standard responsive portfolio view, the project includes an exploratory 3D environment built with React Three Fiber and a browser-based tiling window manager simulator inspired by Hyprland.

## Core Features

- **Standard Portfolio View**: Clean dark-mode layout with project filtering, skill categories, and code preview tabs.
- **3D Virtual Workshop**: First-person and third-person exploration of a 3D studio room using Three.js and React Three Fiber, featuring interactive stations and mobile virtual joystick support.
- **Desktop Simulator**: A simulated Linux desktop environment with draggable floating windows, a Waybar-style panel, and an interactive terminal.
- **Responsive Layout**: Designed for desktops, tablets, and mobile screens.
- **Theme Support**: Consistent styling and design tokens implemented using vanilla CSS.

## Tech Stack

- **Framework**: React 18
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Animation**: Framer Motion, GSAP
- **Icons**: React Icons, FontAwesome
- **Styling**: Vanilla CSS with custom properties

## Project Structure

```
.
├── public/
│   ├── index.html            # HTML entry point and metadata
│   └── *.png                 # Static assets and screenshots
├── src/
│   ├── App.js                # Top-level view routing (Portfolio, Workshop, OS)
│   ├── App.css               # Global layout styles
│   ├── index.js              # React application entry point
│   ├── components/           # UI components for standard portfolio and OS view
│   │   ├── MainPortfolio.js  # Main portfolio page with data and project list
│   │   ├── Desktop.js        # Hyprland OS desktop simulation
│   │   ├── Taskbar.js        # Waybar taskbar simulation
│   │   └── ...
│   ├── workshop/             # 3D interactive room (Three.js / R3F)
│   │   ├── WorkshopApp.js    # Workshop scene container
│   │   ├── scene/            # 3D geometry, materials, and lighting
│   │   ├── player/           # Keyboard and mobile touch controls
│   │   └── ui/               # On-screen HUD, joystick, and dialogues
│   └── styles/
│       └── MainPortfolio.css # Portfolio styles and layout tokens
└── package.json              # Project metadata and dependencies
```

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 16 or higher recommended) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deepith-18/PortFolio.git
   cd PortFolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the local development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically reload when source files are updated.

### Production Build

To build the application for production deployment:

```bash
npm run build
```

This creates an optimized, minified bundle in the `build/` directory ready for deployment on static hosting providers (such as GitHub Pages, Vercel, or Netlify).

## Routes and Views

The application switches views based on the URL hash:

- `#/` — Main portfolio view
- `#/workshop` — 3D interactive virtual workshop
- `#/os` or `#/desktop` — Simulated Hyprland desktop environment

## 3D Controls

When exploring the 3D workshop:

| Key / Input | Function |
| :--- | :--- |
| `W`, `A`, `S`, `D` / Arrows | Move forward, left, backward, right |
| Mouse Drag | Look around |
| `Shift` | Sprint |
| `Space` | Jump / Interact |
| Virtual Joystick | Mobile touch navigation |

## Customization

- **Portfolio Data**: Update project descriptions, skills, and links in `src/components/MainPortfolio.js`.
- **3D Scene Assets**: Modify room objects, textures, and lighting in `src/workshop/scene/`.
- **Styling**: Adjust colors and layout properties in `src/styles/MainPortfolio.css`.

## License

This project is licensed under the MIT License.
