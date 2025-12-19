import type { MarbleColor } from "./stores/useMarbleDrop";

export interface ContraptionConfig {
  id: string;
  type: string;
  x: number;
  y: number;
  angle?: number;
  state?: Record<string, any>;
}

export interface LevelData {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  contraptions: ContraptionConfig[];
  targetScore: number;
  leonardoNote?: string;
  isBonus?: boolean;
}

export const BUILT_IN_LEVELS: LevelData[] = [
  {
    id: "level-1",
    name: "Thales of Miletus",
    subtitle: "The First Philosopher",
    description: "Learn the basics - guide marbles through diverters to matching exit bins",
    difficulty: "easy",
    targetScore: 5000,
    leonardoNote: "Every journey begins with a single marble. Master the fundamentals before reaching for the stars.",
    contraptions: [
      // Entry funnels - Basket 1 (Left) and Basket 2 (Right)
      { id: "funnel-1", type: "entryFunnel", x: 300, y: 60 },
      { id: "funnel-2", type: "entryFunnel", x: 900, y: 60 },
      
      // Guide tracks from left funnel down to first diverter
      { id: "track-L1", type: "track", x: 300, y: 130, angle: Math.PI / 12, state: { length: 80 } },
      { id: "track-L2", type: "track", x: 340, y: 180, angle: Math.PI / 8, state: { length: 100 } },
      { id: "track-L3", type: "track", x: 390, y: 240, angle: Math.PI / 10, state: { length: 90 } },
      
      // Guide tracks from right funnel down to second diverter
      { id: "track-R1", type: "track", x: 900, y: 130, angle: -Math.PI / 12, state: { length: 80 } },
      { id: "track-R2", type: "track", x: 860, y: 180, angle: -Math.PI / 8, state: { length: 100 } },
      { id: "track-R3", type: "track", x: 810, y: 240, angle: -Math.PI / 10, state: { length: 90 } },
      
      // Main diverters - toggle when marbles pass
      { id: "diverter-1", type: "diverter", x: 450, y: 300 },
      { id: "diverter-2", type: "diverter", x: 750, y: 300 },
      
      // Tracks from diverters to center rail
      { id: "track-C1", type: "track", x: 500, y: 360, angle: -Math.PI / 10, state: { length: 100 } },
      { id: "track-C2", type: "track", x: 700, y: 360, angle: Math.PI / 10, state: { length: 100 } },
      
      // Center diverter for routing
      { id: "diverter-3", type: "diverter", x: 600, y: 420 },
      
      // Outer tracks - left side to Red bin
      { id: "track-OL1", type: "track", x: 380, y: 380, angle: Math.PI / 6, state: { length: 120 } },
      { id: "track-OL2", type: "track", x: 320, y: 460, angle: Math.PI / 8, state: { length: 100 } },
      { id: "track-OL3", type: "track", x: 280, y: 540, angle: Math.PI / 10, state: { length: 100 } },
      { id: "track-OL4", type: "track", x: 260, y: 620, angle: Math.PI / 12, state: { length: 80 } },
      
      // Outer tracks - right side to Blue bin
      { id: "track-OR1", type: "track", x: 820, y: 380, angle: -Math.PI / 6, state: { length: 120 } },
      { id: "track-OR2", type: "track", x: 880, y: 460, angle: -Math.PI / 8, state: { length: 100 } },
      { id: "track-OR3", type: "track", x: 920, y: 540, angle: -Math.PI / 10, state: { length: 100 } },
      { id: "track-OR4", type: "track", x: 940, y: 620, angle: -Math.PI / 12, state: { length: 80 } },
      
      // Center tracks to Yellow bin
      { id: "track-M1", type: "track", x: 550, y: 480, angle: Math.PI / 12, state: { length: 100 } },
      { id: "track-M2", type: "track", x: 650, y: 480, angle: -Math.PI / 12, state: { length: 100 } },
      { id: "track-M3", type: "track", x: 580, y: 550, angle: Math.PI / 16, state: { length: 80 } },
      { id: "track-M4", type: "track", x: 620, y: 550, angle: -Math.PI / 16, state: { length: 80 } },
      { id: "track-M5", type: "track", x: 600, y: 620, angle: 0, state: { length: 100 } },
      
      // Exit bins - Red (left), Yellow (center), Blue (right)
      { id: "exit-red", type: "exitBin", x: 250, y: 700, state: { color: "red" } },
      { id: "exit-yellow", type: "exitBin", x: 600, y: 700, state: { color: "yellow" } },
      { id: "exit-blue", type: "exitBin", x: 950, y: 700, state: { color: "blue" } },
    ],
  },
  {
    id: "level-2",
    name: "Archimedes",
    subtitle: "The Lever Master",
    description: "Use copper coils to boost your marbles",
    difficulty: "easy",
    targetScore: 5000,
    leonardoNote: "Give me a lever long enough and I shall move the world. The copper coils channel nature's hidden energy.",
    contraptions: [
      { id: "coil-1", type: "copperCoils", x: 350, y: 450, angle: Math.PI / 8 },
      { id: "coil-2", type: "copperCoils", x: 850, y: 450, angle: -Math.PI / 8 },
      { id: "diverter-1", type: "diverter", x: 600, y: 350 },
    ],
  },
  {
    id: "level-3",
    name: "Hero of Alexandria",
    subtitle: "The Steam Engineer",
    description: "Master the water jet propulsors",
    difficulty: "medium",
    targetScore: 8000,
    leonardoNote: "Hero understood that water holds tremendous power. Channel the flow, guide the marble.",
    contraptions: [
      { id: "jet-1", type: "waterJet", x: 300, y: 500, angle: -Math.PI / 4 },
      { id: "jet-2", type: "waterJet", x: 900, y: 500, angle: -3 * Math.PI / 4 },
      { id: "diverter-1", type: "diverter", x: 450, y: 350 },
      { id: "diverter-2", type: "diverter", x: 750, y: 350 },
    ],
  },
  {
    id: "level-4",
    name: "Ctesibius",
    subtitle: "Father of Pneumatics",
    description: "Ride the spinner to reach distant exits",
    difficulty: "medium",
    targetScore: 10000,
    leonardoNote: "The vortex is nature's most perfect motion. Let the spinner fling your marbles to destiny.",
    contraptions: [
      { id: "spinner-1", type: "spinner", x: 400, y: 400 },
      { id: "spinner-2", type: "spinner", x: 800, y: 400 },
      { id: "coil-1", type: "copperCoils", x: 600, y: 500 },
      { id: "corner-1", type: "cornerCatcher", x: 150, y: 550, state: { corner: "bottom-left" } },
      { id: "corner-2", type: "cornerCatcher", x: 1050, y: 550, state: { corner: "bottom-right" } },
    ],
  },
  {
    id: "level-5",
    name: "Galileo",
    subtitle: "Bonus Level",
    description: "A bonus challenge for the brave",
    difficulty: "medium",
    targetScore: 12000,
    isBonus: true,
    leonardoNote: "The heavens move in mysterious ways. This bonus puzzle rewards the patient observer.",
    contraptions: [
      { id: "teleporter-1", type: "teleporter", x: 300, y: 400, state: { exitX: 900, exitY: 300 } },
      { id: "spring-1", type: "spring", x: 600, y: 500, angle: -Math.PI / 2 },
      { id: "diverter-1", type: "diverter", x: 500, y: 350 },
    ],
  },
  {
    id: "level-6",
    name: "Aristotle",
    subtitle: "The Natural Philosopher",
    description: "Use painters to change marble colors mid-flight",
    difficulty: "hard",
    targetScore: 15000,
    leonardoNote: "Aristotle taught us that change is the law of nature. Transform your marbles to match their destiny.",
    contraptions: [
      { id: "painter-1", type: "painter", x: 400, y: 350, state: { targetColor: "blue" } },
      { id: "painter-2", type: "painter", x: 800, y: 350, state: { targetColor: "red" } },
      { id: "diverter-1", type: "diverter", x: 600, y: 450 },
      { id: "coil-1", type: "copperCoils", x: 500, y: 550 },
      { id: "coil-2", type: "copperCoils", x: 700, y: 550 },
    ],
  },
  {
    id: "level-7",
    name: "Euclid",
    subtitle: "The Geometer",
    description: "Navigate precise angles and curves",
    difficulty: "hard",
    targetScore: 18000,
    leonardoNote: "Geometry is the foundation of all machines. Every angle must be calculated with precision.",
    contraptions: [
      { id: "qpipe-1", type: "quarterPipe", x: 350, y: 350, state: { direction: "se" } },
      { id: "qpipe-2", type: "quarterPipe", x: 850, y: 350, state: { direction: "sw" } },
      { id: "diverter-1", type: "diverter", x: 600, y: 300 },
      { id: "brake-1", type: "brake", x: 450, y: 500 },
      { id: "brake-2", type: "brake", x: 750, y: 500 },
      { id: "coil-1", type: "copperCoils", x: 600, y: 550 },
    ],
  },
  {
    id: "level-8",
    name: "Brunelleschi",
    subtitle: "The Architect",
    description: "A masterpiece of mechanical complexity",
    difficulty: "hard",
    targetScore: 20000,
    leonardoNote: "Like the great dome of Florence, this puzzle requires vision and patience to complete.",
    contraptions: [
      { id: "diverter-1", type: "diverter", x: 400, y: 300 },
      { id: "diverter-2", type: "diverter", x: 800, y: 300 },
      { id: "triggered-1", type: "triggeredDiverter", x: 600, y: 400 },
      { id: "spinner-1", type: "spinner", x: 300, y: 450 },
      { id: "spinner-2", type: "spinner", x: 900, y: 450 },
      { id: "coil-1", type: "copperCoils", x: 450, y: 550 },
      { id: "coil-2", type: "copperCoils", x: 750, y: 550 },
      { id: "jet-1", type: "waterJet", x: 200, y: 500, angle: -Math.PI / 6 },
      { id: "jet-2", type: "waterJet", x: 1000, y: 500, angle: -5 * Math.PI / 6 },
      { id: "painter-1", type: "painter", x: 600, y: 550, state: { targetColor: "green" } },
    ],
  },
  {
    id: "level-9",
    name: "Vitruvius",
    subtitle: "The Engineer",
    description: "Cannons and springs create chaos",
    difficulty: "hard",
    targetScore: 25000,
    leonardoNote: "Vitruvius knew that great machines require both power and precision. Time your launches carefully.",
    contraptions: [
      { id: "cannon-1", type: "cannon", x: 300, y: 400, angle: -Math.PI / 4 },
      { id: "cannon-2", type: "cannon", x: 900, y: 400, angle: -3 * Math.PI / 4 },
      { id: "spring-1", type: "spring", x: 600, y: 350, angle: -Math.PI / 2 },
      { id: "diverter-1", type: "diverter", x: 500, y: 500 },
      { id: "diverter-2", type: "diverter", x: 700, y: 500 },
      { id: "corner-1", type: "cornerCatcher", x: 150, y: 600, state: { corner: "bottom-left" } },
      { id: "corner-2", type: "cornerCatcher", x: 1050, y: 600, state: { corner: "bottom-right" } },
    ],
  },
  {
    id: "level-10",
    name: "Democritus",
    subtitle: "The Atomist",
    description: "Beware the implosion devices!",
    difficulty: "hard",
    targetScore: 30000,
    leonardoNote: "Democritus believed all matter could be divided. The implosion devices will test this theory on your marbles.",
    contraptions: [
      { id: "destructor-1", type: "destructor", x: 400, y: 450 },
      { id: "destructor-2", type: "destructor", x: 800, y: 450 },
      { id: "diverter-1", type: "diverter", x: 600, y: 350 },
      { id: "blocker-1", type: "blocker", x: 350, y: 350 },
      { id: "blocker-2", type: "blocker", x: 850, y: 350 },
      { id: "coil-1", type: "copperCoils", x: 500, y: 550 },
      { id: "coil-2", type: "copperCoils", x: 700, y: 550 },
      { id: "teleporter-1", type: "teleporter", x: 250, y: 500, state: { exitX: 600, exitY: 600 } },
    ],
  },
];

export function saveLevelToStorage(levelData: LevelData): void {
  const savedLevels = loadCustomLevelsFromStorage();
  const existingIndex = savedLevels.findIndex(l => l.id === levelData.id);
  
  if (existingIndex >= 0) {
    savedLevels[existingIndex] = levelData;
  } else {
    savedLevels.push(levelData);
  }
  
  localStorage.setItem("marbleDrop_customLevels", JSON.stringify(savedLevels));
  console.log(`Saved level: ${levelData.name}`);
}

export function loadCustomLevelsFromStorage(): LevelData[] {
  try {
    const saved = localStorage.getItem("marbleDrop_customLevels");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load custom levels:", e);
  }
  return [];
}

export function getAllLevels(): LevelData[] {
  return [...BUILT_IN_LEVELS, ...loadCustomLevelsFromStorage()];
}

export function getLevelById(id: string): LevelData | undefined {
  return getAllLevels().find(l => l.id === id);
}
