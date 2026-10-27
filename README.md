# Ismail Rajhi — 3D Interactive Portfolio

An immersive, interactive 3D developer portfolio showcasing the work and experience of **Ismail Rajhi** — a Tunisian Computer Science graduate and Master's student in Computer Science based in China. 

## Overview

This project features a retro CRT workstation experience with a fully interactive 3D environment. Navigate around a virtual desk setup, interact with a vintage computer monitor displaying **IsmailOS**, and explore the portfolio through an engaging desktop-like interface complete with sound effects, animations, and ambient atmosphere.

## Live Demo

[Visit the portfolio](https://ismailrajhi.com/)

## Tech Stack

### Core
- **[Three.js](https://threejs.org/)** (v0.137.5) - 3D rendering engine
- **[TypeScript](https://www.typescriptlang.org/)** (v4.6.2) - Type-safe development
- **[Webpack](https://webpack.js.org/)** (v5) - Module bundling and build tooling

### 3D & Animation
- **[GSAP](https://greensock.com/gsap/)** - Animation library
- **[@tweenjs/tween.js](https://github.com/tweenjs/tween.js/)** - Tweening engine
- **[Camera Controls](https://github.com/yomotsu/camera-controls)** - Camera movement and controls
- **[lil-gui](https://lil-gui.georgealways.com/)** - Debug UI

### UI & Frameworks
- **[React](https://react.dev/)** (v17) - For overlay UI components
- **[Framer Motion](https://www.framer.com/motion/)** - UI animations

### Backend & Utilities
- **[Express](https://expressjs.com/)** - Production server
- **[Nodemailer](https://nodemailer.com/)** - Email functionality for contact form
- **[GLSL Shaders](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)** - Custom shaders via glslify

## Features

- **Interactive 3D Environment** - Explore a detailed retro desk setup with monitor, keyboard, decor, and ambient elements
- **IsmailOS** - A fully functional-looking retro operating system interface running on the virtual CRT monitor
- **Immersive Audio** - Keyboard typing sounds, mouse clicks, ambient office noise, startup sequence, and radio
- **Smooth Camera Transitions** - Cinematic camera movements with keyframe animations
- **Responsive Design** - Adapts to different screen sizes
- **CRT Aesthetic** - Authentic retro computing feel with scanlines and vintage styling

## Project Structure

```
portfiliome/
├── src/                    # Source code
│   ├── Application/        # Core application logic
│   │   ├── Camera/         # Camera controls and keyframes
│   │   ├── World/          # 3D world objects (Computer, Monitor, etc.)
│   │   ├── Audio/          # Audio management
│   │   └── Utils/          # Utilities (Resources, Time, Mouse, etc.)
│   ├── script.ts           # Entry point
│   └── style.css           # Global styles
├── static/                 # Static assets
│   ├── models/             # GLTF 3D models
│   ├── textures/           # Textures and UI elements
│   ├── audio/              # Sound effects and ambient audio
│   └── draco/              # Draco mesh compression
├── server/                 # Express server for production
└── bundler/                # Webpack configurations
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Ismail-Rajhi/portfiliome.git
cd portfiliome

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:8080` (or the next available port).

### Production Build

```bash
# Build for production
npm run build

# Serve the production build
npm start
```

## Credits

- Original inspiration and base structure from [henryheffernan.com](https://henryheffernan.com/)
- 3D assets and environment modeling
- Custom implementation and personal portfolio content by Ismail Rajhi

## License

This project is UNLICENSED. All rights reserved.
