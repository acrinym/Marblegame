# Marble Drop Game

## Overview

A physics-based puzzle game where players strategically drop colored marbles through contraptions to reach matching exit bins. The game features a 2D physics engine using Matter.js, a React-based UI, and is inspired by the classic Marble Drop game with a unique Schauberger aesthetic (vortexes, organic mechanics, flowing energy).

The application is built as a full-stack web application with:
- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Physics**: Matter.js for 2D physics simulation
- **UI Library**: Radix UI components with Tailwind CSS

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure**: The frontend follows a component-based React architecture with clear separation of concerns:

- **Game Components**: Core game logic lives in `PhysicsEngine.tsx` (Matter.js physics simulation), `MarbleDropGame.tsx` (game orchestration), and `GameUI.tsx` (HUD and controls)
- **UI Components**: Reusable Radix UI components in `/components/ui/` provide consistent, accessible UI elements
- **State Management**: Zustand stores handle global state with three main stores:
  - `useMarbleDrop`: Manages marble inventory, scoring, active marbles, and game mode
  - `useAudio`: Handles sound effects and background music
  - `useGame`: Controls game phase transitions (ready, playing, ended)

**Rendering Strategy**: The physics engine uses Matter.js with a custom Canvas-based renderer, while the UI overlays use React components with absolute positioning.

**Styling Approach**: Tailwind CSS utility classes with CSS custom properties for theming (defined in tailwind.config.ts). The design system uses HSL color values for consistent theming.

### Backend Architecture

**Server Framework**: Express.js application with middleware for JSON parsing, URL encoding, and request logging.

**Routing Pattern**: Routes are registered through a centralized `registerRoutes` function in `server/routes.ts`. All API endpoints are prefixed with `/api`.

**Development vs Production**: The Vite dev server is conditionally mounted in development mode only (see `server/vite.ts`). In production, static files are served from the built `/dist` directory.

**Storage Interface**: An abstraction layer (`IStorage` interface) allows swapping between in-memory storage (`MemStorage`) and database implementations without changing business logic. Currently uses in-memory storage with a basic user schema.

### Data Storage

**Database**: PostgreSQL configured through Drizzle ORM.

**Schema Definition**: Database schema is defined in `shared/schema.ts` using Drizzle's table builders. Currently includes a `users` table with basic fields (id, username, password).

**Migration Strategy**: Drizzle Kit manages migrations with schema files stored in `/migrations` and the schema source in `shared/schema.ts`.

**Rationale**: The schema is shared between frontend and backend (via the `/shared` directory) to ensure type safety across the stack. Drizzle was chosen for its TypeScript-first approach and seamless integration with PostgreSQL.

### External Dependencies

**Database Provider**: Neon serverless PostgreSQL (`@neondatabase/serverless`) for scalable, serverless database access.

**Physics Engine**: Matter.js provides the 2D physics simulation for marble movement, collisions, and realistic rolling behavior.

**3D Graphics**: Three.js ecosystem (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) is integrated for potential 3D rendering features or visual effects, though the current implementation focuses on 2D canvas rendering.

**UI Framework**: Radix UI provides accessible, unstyled component primitives (accordion, dialog, dropdown, etc.) that are styled with Tailwind CSS.

**State Management**: Zustand with the `subscribeWithSelector` middleware enables reactive state updates and selective component re-renders.

**Audio**: Standard HTML5 Audio API for background music and sound effects (hit sounds, success sounds).

**Build Tools**: 
- Vite for frontend bundling with React plugin and GLSL shader support
- esbuild for backend bundling
- TypeScript for type checking across the entire codebase

**Development Tools**: 
- Replit runtime error overlay for improved debugging
- TSX for running TypeScript directly in development
- Drizzle Kit for database migrations

**Asset Support**: The build configuration explicitly supports 3D model formats (GLTF, GLB) and audio files (MP3, OGG, WAV), indicating planned multimedia features.

## Level Design System

### JSON-Based Level Definition

Levels are defined as JSON files in `client/src/levels/`. The system uses an **anchoring approach** where component positions are calculated based on parent-child port connections, not absolute coordinates.

**Key Files:**
- `client/src/lib/LevelLoader.ts` - Parses JSON and calculates anchored positions
- `client/src/levels/level1_thales.json` - Example level topology
- `docs/PATHING_LOGIC.md` - Full documentation of the anchoring system
- `docs/COMPONENT_PIPELINE.md` - Component physics specifications

### How to Define a Level

1. **Trace the marble path** in the original game by hand
2. **Write the chain**: `Funnel -> Track A -> Diverter (left: Track B, right: Track C) -> Bins`
3. **Convert to JSON** with `anchoredTo` and `anchorPort` fields

### JSON Component Structure

```json
{
  "id": "track_1",
  "type": "straightTrack",
  "anchoredTo": "funnel_1",
  "anchorPort": "bottom",
  "properties": { "length": 200, "angle": 45 },
  "next": "diverter_1"
}
```

**Fields:**
- `id`: Unique identifier
- `type`: Component type (entryFunnel, straightTrack, curvedTrack, diverter, cannon, exitBin, etc.)
- `anchoredTo`: ID of parent component (or use absolute `x`, `y` for root components)
- `anchorPort`: Which exit port to anchor to (bottom, left, right)
- `properties`: Component-specific settings (length, angle, color, etc.)
- `next`/`outputs`: Downstream connections

### Port System

Each component defines entry and exit ports:
- **Entry Port**: Where marbles enter (top of component)
- **Exit Ports**: Where marbles exit (bottom, left, right depending on component)

The LevelLoader snaps each component's entry port to its parent's specified exit port.

### Type Mapping

JSON types are mapped to physics engine types:
- `straightTrack` -> `track`
- `curvedTrack` -> `spiralTrack`

### Important Notes

- **Do NOT guess positions** - always use anchoring
- **Angles in straightTrack are degrees** (0-360)
- **Angles in track are radians** (internal physics)
- **Air connections** (cannon trajectories) use absolute positioning for the target