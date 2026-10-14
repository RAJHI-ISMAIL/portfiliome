# ATELIER — AI Agent Development Guidelines

## 1. Project Overview

**Project name:** ATELIER
**Owner:** Ismail Rajhi — 3D Creator, Master's student in Computer Science
**Tagline:** Step inside the work.
**Project type:** Immersive, interactive 3D room portfolio website.

ATELIER is a portfolio experience built around a first-person 3D studio room. Instead of scrolling pages, the visitor walks into Ismail's creative space and interacts with physical objects to explore his work: a laptop for projects, a phone for contact, a framed poster for the about story, a PlayStation for gaming, and a whiteboard for services.

The room itself is a **Blender-authored asset** (`assets/game room.blend` → `public/models/room.glb`, 2.28 MB with Draco + JPEG@512px). It contains 200 objects, 7 lights, and procedural/texture materials. The React app loads it via `useGLTF` and overlays the interactive UI on top.

The website combines cinematic room visuals, realistic 3D rendering, smooth camera work, and a refined, responsive glass UI.

The goal is not another conventional portfolio grid. The goal is to make discovering Ismail's work feel like stepping into his studio.

### Core user journey

1. The user opens the landing page and sees a cinematic "enter the room" intro.
2. The room loads progressively with clean placeholder props.
3. The user explores the room with mouse parallax and limited orbit controls.
4. Hovering an object reveals a glowing hotspot label.
5. Clicking an object flies the camera to a preset viewpoint and opens a glass content panel.
6. The panel displays the real content for that station (projects, about, contact, gaming, services).
7. The user returns to the room overview and explores another station.
8. On mobile, bottom nav chips jump directly to each station without dragging.

The experience must feel like one connected space rather than separate pages stitched together.

---

## 2. Mandatory Agent Rules

Follow these rules throughout development.

### Inspect before modifying

* Inspect the existing project structure before writing code.
* Read this document and any available design documentation.
* If `agent.md`, `package.json`, or other project instructions exist, inspect them before implementation.
* Identify the installed framework, dependency versions, scripts, and existing conventions.
* Preserve existing working functionality.
* Do not replace project configuration or rewrite unrelated files without a clear reason.
* Do not assume a library is installed without checking.

### Work incrementally

* Implement only the phase requested by the user.
* Do not implement future phases unless explicitly asked.
* Complete the current task before expanding scope.
* Prefer small, testable changes over large rewrites.
* Do not leave broken imports, incomplete components, or placeholder functions presented as finished functionality.

### Be truthful about functionality

* Never claim a feature works unless it has been implemented and verified.
* Do not present static room images as an interactive 3D room.
* Do not make hotspots appear interactive when raycasting is not wired up.
* If WebGL is unavailable, show an honest static fallback and explain the limitation.
* Do not invent successful test results.

### Protect the codebase

* Use TypeScript and avoid `any` unless there is a documented reason.
* Avoid duplicated business logic.
* Avoid unnecessary dependencies.
* Never expose secrets or private credentials in client-side code.
* Keep components focused and reusable.
* Follow the existing project's dependency versions and coding conventions.

---

## 3. Technology Stack

Use the following technologies unless the existing project or a specific requirement justifies a change.

### Core application

* **Vite** — build tooling and dev server.
* **React 18** — component architecture and state-driven interfaces.
* **TypeScript** — typed application data and component contracts.
* **Tailwind CSS** — responsive layouts, HUD, panels, and visual styling.

### 3D rendering

* **Three.js** — 3D scene rendering.
* **React Three Fiber** — React integration for Three.js.
* **@react-three/drei** — helpers, controls, and utilities for React Three Fiber.
* **@react-three/postprocessing** — optional bloom for LEDs and light strips, only after the base scene performs well.

Use a persistent 3D scene. Never destroy and recreate the room when a panel opens or a station is selected.

### Animation

* **Framer Motion** — panel transitions, HUD animations, tooltip and intro sequences.
* Use native CSS transitions for simple hover states.

### Interface

* **Lucide React** — consistent interface icons. Do not mix unrelated icon styles or use emoji as production interface icons.
* **zustand** (optional) — only if hotspot/camera state outgrows React context.

### Development tools

* Use the existing package manager and lockfile.
* Run the available lint, type-check, and build scripts when relevant.

Do not install every library immediately. Add dependencies only when their phase requires them.

---

## 4. Design System

ATELIER must maintain a consistent visual identity across the room and all panels.

### Brand personality

The interface should feel:

* Cinematic and moody.
* Premium and tactile.
* Personal, not corporate.
* Immersive and calm.
* Smooth and responsive.

Avoid generic templates, excessive neon effects, cartoon illustrations, and cluttered layouts.

### Primary color palette

* Room background: `#0C0C0C`
* Primary text: `#D7E2EA`
* Heading gradient: `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` (used with background-clip text)
* CTA gradient: `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`
* Glass panels: white/5 fills with subtle borders and restrained backdrop blur
* Hotspot glow: soft cyan/white emissive highlight

These are starting tokens, not rigid values. Refine them to match approved design references.

### Typography

* **Kanit** (Google Fonts, weights 300–900) for all interface and heading text.
* Uppercase, tracking-tight headings with fluid `clamp()` scales.
* Light weight for body descriptions, medium for labels and names.
* Maintain clear contrast and hierarchy against the dark room.

### Spacing and shape

* Rounded pills for buttons and nav chips.
* Rounded cards (`rounded-[40px]`–`rounded-[60px]`) for project panels.
* Generous negative space around the room center.

---

## 5. Application Architecture

Keep the application modular and easy to extend.

Suggested structure:

```text
src/
  App.tsx
  main.tsx
  index.css

  components/
    room/
      RoomScene.tsx        — Canvas + <primitive> of the GLB + fog + CameraRig + Hotspots

    hotspots/
      StationContext.tsx   — global station state (activeStation, panelOpen)
      Hotspots.tsx         — raycast rings + point lights, scale/emissive on hover
      HotspotTooltip.tsx

    panels/
      PanelShell.tsx       — glass overlay that renders content by activeStation
      ProjectsPanel.tsx
      AboutPanel.tsx
      ContactPanel.tsx
      GamingPanel.tsx
      ServicesPanel.tsx

    hud/
      EnterScreen.tsx
      BackButton.tsx

  data/
    stations.ts           — typed station presets + ROOM_OVERVIEW

  hooks/
    useWebGL.ts
```

Adapt this structure to the existing project. Do not create empty files for every item before they are needed.

The room geometry is **not** authored in React — it lives in `assets/game room.blend`, is exported to `public/models/room.glb` (2.28 MB, Draco + JPEG@512px), and is loaded with `useGLTF`. Only the interactive UI (hotspots, camera, panels) is React + Three.js.

---

## 6. Phase-Based Development

Follow these phases in order. Do not skip ahead without user approval.

### Phase 1 — Room Shell ✅ DONE

**Goal:** Establish the 3D room and visual identity.

Implemented:
* `assets/game room.blend` inspected with Blender 5.2: 200 objects, 7 lights (4 Area + 3 Point), 1 camera, Cycles @2000×1500, procedural + texture materials.
* **Color management:** View Transform `AgX`, Look `AgX - Base Contrast`, Exposure `+2.0`, Gamma `1.0`. AgX is used for the requested filmic roll-off; exposure was raised to +2.0 after testing because AgX darkens the midtones significantly (EEVEE preview went from 6.6 at +0.5 to 25.6 mean luminance at +2.0).
* **World:** background `#0C0C0C` (0.02, 0.02, 0.02), strength `0.15`.
* **Lighting rebalanced:** all original lights removed. Warm Area light (4000K, 200W, 2m) outside the left window aimed at room center. Cool Area fill (6500K, 60W, 2m, shadows off) on the right. Emissive planes for LED strips instead of point lights: cyan at (0, -1.2, 0.55) scale (2.4, 0.12, 0.06) intensity 4.0; magenta at (-3.2, 2.0, 2.0) scale (0.12, 1.4, 0.5) intensity 3.0.
* **Camera:** 3/4 isometric at (8, -10, 11), lens 35, looking at (0, 0.5, 1.5) — ~35° down, frames desk + media unit + back wall.
* **Materials:** bright Principled BSDFs (>0.7 on all channels, unlinked) retinted to `#D8D2C8` (0.85, 0.82, 0.78); roughness below 0.3 raised to 0.6. Adjusted: `Material.001`, `Material.002`, `Material.007`.
* Preview rendered with EEVEE at 1280×960 — mean luminance 25.6, center 112.2, p90 83, max 246. Deep shadows, no blown-out whites.
* GLB exported with textures downscaled to 512px, meshes >5000 verts decimated, Draco compression level 6, JPEG q75 → **2.28 MB** (from 25.7 MB).
* `public/models/room.glb` loaded via `useGLTF` in `RoomScene.tsx`.

**Completion criteria:**
* The room renders on desktop and mobile.
* Camera drift and parallax work smoothly.
* The project builds successfully.
* No fake 3D interaction is presented as working functionality.

### Phase 2 — Hotspot System ✅ DONE

**Goal:** Make the room interactive.

Implemented:
* `data/stations.ts` — 5 typed station presets (laptop, phone, poster, PlayStation, whiteboard) + ROOM_OVERVIEW, with position/lookAt/cameraPosition.
* `hotspots/StationContext.tsx` — global state: `activeStation`, `panelOpen`, `selectStation`, `closePanel`.
* `hotspots/Hotspots.tsx` — raycast rings + point lights; scale and emissive lerp on hover; click → `selectStation`.
* `room/CameraRig.tsx` — fly-to system: stores from/to, cubic ease (1.1s to station, 0.9s to overview), drift only while in overview, `prefers-reduced-motion` aware.
* `hud/BackButton.tsx` — glass pill back button.
* `panels/PanelShell.tsx` — full-screen glass overlay (blur backdrop, scale+fade reveal), renders content by `activeStation`.
* `panels/{Projects,About,Contact,Gaming,Services}Panel.tsx` — Phase 3 placeholders.
* `App.tsx` wraps everything in `<StationProvider>`, adds `EscapeHandler` (ESC closes panel).

**Completion criteria:**
* Every station is hoverable and clickable.
* Camera transitions are smooth with no abrupt jumps.
* State is centralized and typed.

### Phase 3 — Content Panels

**Goal:** Deliver the real portfolio content in glass panels.

Implement:

* **Laptop panel — Projects:** project cards with title, category, client/personal tag, and the three image layouts per project.
* **Poster panel — About:** about text, portrait, and skill chips.
* **Phone panel — Contact:** email, GitHub, LinkedIn, Instagram links.
* **PlayStation panel — Gaming:** favorite games, genres, and streaming/social links.
* **Whiteboard panel — Services:** the five service items with descriptions.
* Framer Motion spring reveals, lazy loading per panel.

**Completion criteria:**

* All content renders from typed data files.
* Panels work on desktop and mobile.
* Loading and error states exist where content is fetched or lazy.

### Phase 4 — Polish and Optimization

**Goal:** Deliver a stable, responsive, production-quality experience.

Review:

* Desktop, tablet, and mobile layouts.
* WebGL performance and frame rate.
* Texture resolution and loading.
* Animation smoothness.
* Keyboard accessibility and screen-reader labels.
* Reduced-motion support.
* Mobile nav chips and touch controls.
* WebGL-unavailable fallback.
* Build errors, TypeScript errors, and console warnings.

---

## 7. Room Rendering and Interaction Rules

The room is the central visual feature of ATELIER.

### Rendering

* The room is a **Blender-authored asset** (`assets/game room.blend`), exported to `public/models/room.glb` (2.28 MB, Draco + JPEG@512px) and loaded with `useGLTF`. Do not rebuild the room in React.
* Keep the room proportional and believable: correct perspective, consistent scale.
* The GLB already contains its own lights (4 Area + 3 Point). The React scene does not add extra lights — only fog and camera.
* Avoid visible seams, flickering lights, and z-fighting.
* Use licensed assets or assets with clearly compatible usage rights.

### Camera

* Drift slowly while idle.
* Let users look around with drag and limited orbit.
* Fly to station viewpoints with smooth damping — no abrupt angular jumps.
* Preserve spatial continuity between room and panel states.
* Keep the scene mounted when panels open; overlay the panel on top.

### Hotspots

* Hotspots must be discoverable: glow on hover, tooltip with icon and name.
* Only one station is active at a time.
* Selecting a station must not reset the whole scene unnecessarily.
* Coordinate camera presets with the station layout and verify them visually.

### Controls

* Clamp orbit angles and zoom so users cannot leave the room.
* Prevent page scrolling from interfering with room gestures.
* Ensure controls remain accessible on touchscreens.

---

## 8. Content Data

### Typed models

Use a consistent representation throughout the application.

A project should contain:

* Id.
* Title.
* Category.
* Client or personal tag.
* Three images: two stacked in the left column, one tall in the right column.

A contact link should contain: label, URL, and Lucide icon name.

A service item should contain: number, name, and description.

A gaming item should contain: title, platform, and optional link.

### Data behavior

* Keep content in typed data files, not hardcoded inside components.
* Validate external data before rendering if any content is fetched.
* Handle loading, failures, and missing values.
* Clearly distinguish unavailable content from empty content.

---

## 9. State Management and Routing

Use the simplest state management solution that fits the current scope.

Treat active station, camera target, panel open state, loading state, and animation state as separate concerns.

Keep the selected station available across the room and panels. If deep-linking is added, encode the station in the URL with additional application state.

Do not make the room depend on a panel remaining mounted.

---

## 10. Animation and Interaction Standards

ATELIER should feel fluid rather than excessively animated.

### Timing guidelines

Use these as starting points, then refine through testing:

* Button hover: approximately 150–250 ms.
* Tooltip reveal: approximately 200–300 ms.
* Panel reveal: approximately 300–600 ms.
* Camera fly to station: approximately 900–1,400 ms.
* Intro sequence: approximately 1,000–2,000 ms.

### Motion principles

* Use smooth easing.
* Avoid sudden changes in scale or orientation.
* Use staggered animation sparingly.
* Avoid animating every element simultaneously.
* Respect `prefers-reduced-motion`.

All animations must remain usable on mobile and lower-powered hardware.

---

## 11. Performance Standards

The 3D experience must not compromise usability.

* Lazy-load panels on first open.
* Optimize textures and image assets.
* Clamp device pixel ratio.
* Limit lights, shadows, and expensive post-processing.
* Use the Three.js render loop for frame-level animation rather than updating React state on every frame.
* Pause or reduce nonessential animation when the page is hidden.
* Clean up event listeners and resources.
* Provide loading indicators for major visual assets.
* Keep interface controls responsive while content loads.
* Use a static fallback if WebGL initialization fails.

---

## 12. Accessibility and Responsive Design

### Responsive design

Desktop:

* Large cinematic room with full camera control.
* Floating glass panels.
* Hover tooltips.

Tablet:

* Scaled room, compact panels, touch orbit.

Mobile:

* Bottom nav chips for direct station jumps.
* Full-screen panels with large touch targets.
* Simplified lighting to preserve frame rate.

### Accessibility

* Use semantic HTML for HUD and panels.
* Provide accessible names for icon-only buttons.
* Ensure visible keyboard focus; support Tab + Enter on hotspots.
* Maintain sufficient text contrast.
* Respect reduced-motion settings.
* Ensure essential content is available even if the 3D room cannot render.

---

## 13. Code Quality Standards

* Keep components small and focused.
* Define explicit TypeScript types for projects, stations, and contact data.
* Centralize camera presets, coordinate math, and theme constants.
* Avoid unnecessary abstraction.
* Avoid giant components containing UI, animation, and business logic together.
* Use descriptive file and variable names.
* Remove unused imports and dead code.
* Avoid suppressing TypeScript or lint errors without justification.

Prefer maintainable code over clever but difficult-to-understand implementations.

---

## 14. Required Workflow for Every Task

Whenever the user asks for an implementation task:

1. **Inspect:** Review the relevant files, existing code, design documentation, and dependencies.
2. **Plan:** Identify the smallest coherent set of changes required.
3. **Implement:** Modify only the necessary files and follow the current phase's scope.
4. **Verify:** Run appropriate lint, type-check, and build commands available in the project.
5. **Review:** Check for broken imports, responsive layout problems, and unfinished interactions.
6. **Report:** Summarize the changes, verification results, and known limitations.

Do not claim tests passed if they were not run.

If a verification command fails, report the failure and distinguish existing issues from issues introduced by the changes when possible.

If a requirement is ambiguous, make a reasonable, reversible decision when possible. Ask the user only when a missing detail materially changes the implementation.

---

## 15. Definition of Project Success

ATELIER is successful when:

* The room is visually distinctive and responsive.
* The room is genuinely interactive, not merely decorative.
* Every station is discoverable through hover glow and tooltips.
* The camera flies smoothly to each station and back.
* Panels display Ismail's real projects, about, contact, gaming, and services content.
* Mobile users can navigate via bottom chips without dragging.
* Animations remain smooth and do not obstruct usability.
* The experience handles WebGL failure and missing content gracefully.
* The codebase remains modular, typed, maintainable, and buildable.

## Final Instruction

Always prioritize the user's current task, the approved design references, and the active implementation phase.

Do not attempt to build the entire product in one step.

Build ATELIER incrementally, verify each phase, preserve working functionality, and maintain a consistent visual identity throughout the project.
