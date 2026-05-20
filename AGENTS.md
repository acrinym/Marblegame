# Marble Drop - Development Context

## Project Overview

A marble drop game recreation inspired by the original Sierra game "Marble Drop" (1997). The goal is to create a faithful remake with the original's Leonardo da Vinci sketch-machine aesthetic.

## Art Direction

The game should feel like a Leonardo da Vinci sketch-machine:
- **Background:** Parchment/cream (#F5E6C8)
- **Rails:** Brass (#B5A642), copper (#B87333), silver
- **Diverters:** Green flipper-gates (#228B22)
- **Exit bins:** Dark wood trays (#2C2416) with colored borders
- **Trigger wires:** Red (#FF0000)
- **Container border:** Brass (#8B7500)

## Key Files

- `client/src/components/PhysicsEngine.tsx` - Core physics and rendering
- `client/src/lib/levelData.ts` - Level definitions
- `LEVEL_DESIGN.md` - Comprehensive reference guide (SEE THIS FIRST)

## Level Design Reference

**Important:** See `LEVEL_DESIGN.md` for:
- All 50 level layouts
- Mechanics descriptions  
- Component types
- Color codes (R, Y, B, O, G, P, Bl, S)
- Technical notes

## Current Features

- Physics engine using Matter.js
- Multiple marble colors
- Basic contraptions (diverters, copper coils, spinners, teleporters, etc.)
- Level loading system
- 10 built-in levels

## Technologies

- React + TypeScript
- Matter.js for physics
- TailwindCSS for styling

## Development Notes

- The physics canvas renders directly - styling comes from Matter.js render options
- Colors are specified in the render.fillStyle and render.strokeStyle properties
- Component rendering can be customized in individual contraption files in `client/src/components/contraptions/`