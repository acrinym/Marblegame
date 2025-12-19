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
  description: string;
  difficulty: "easy" | "medium" | "hard";
  contraptions: ContraptionConfig[];
  targetScore: number;
}

export const BUILT_IN_LEVELS: LevelData[] = [
  {
    id: "level-1",
    name: "First Steps",
    description: "Learn the basics of marble dropping",
    difficulty: "easy",
    targetScore: 3000,
    contraptions: [
      { id: "diverter-1", type: "diverter", x: 450, y: 400 },
      { id: "diverter-2", type: "diverter", x: 750, y: 400 },
    ],
  },
  {
    id: "level-2",
    name: "Energy Flow",
    description: "Use copper coils to boost your marbles",
    difficulty: "easy",
    targetScore: 5000,
    contraptions: [
      { id: "coil-1", type: "copperCoils", x: 350, y: 450, angle: Math.PI / 8 },
      { id: "coil-2", type: "copperCoils", x: 850, y: 450, angle: -Math.PI / 8 },
      { id: "diverter-1", type: "diverter", x: 600, y: 350 },
    ],
  },
  {
    id: "level-3",
    name: "Water Works",
    description: "Master the water jet propulsors",
    difficulty: "medium",
    targetScore: 8000,
    contraptions: [
      { id: "jet-1", type: "waterJet", x: 300, y: 500, angle: -Math.PI / 4 },
      { id: "jet-2", type: "waterJet", x: 900, y: 500, angle: -3 * Math.PI / 4 },
      { id: "diverter-1", type: "diverter", x: 450, y: 350 },
      { id: "diverter-2", type: "diverter", x: 750, y: 350 },
    ],
  },
  {
    id: "level-4",
    name: "Spin Cycle",
    description: "Ride the spinner to reach distant exits",
    difficulty: "medium",
    targetScore: 10000,
    contraptions: [
      { id: "spinner-1", type: "spinner", x: 400, y: 400 },
      { id: "spinner-2", type: "spinner", x: 800, y: 400 },
      { id: "coil-1", type: "copperCoils", x: 600, y: 500 },
    ],
  },
  {
    id: "level-5",
    name: "Color Transformation",
    description: "Use painters to change marble colors mid-flight",
    difficulty: "hard",
    targetScore: 15000,
    contraptions: [
      { id: "painter-1", type: "painter", x: 400, y: 350, state: { targetColor: "blue" } },
      { id: "painter-2", type: "painter", x: 800, y: 350, state: { targetColor: "red" } },
      { id: "diverter-1", type: "diverter", x: 600, y: 450 },
      { id: "coil-1", type: "copperCoils", x: 500, y: 550 },
      { id: "coil-2", type: "copperCoils", x: 700, y: 550 },
    ],
  },
  {
    id: "level-6",
    name: "Vortex Master",
    description: "Complete challenge with all contraptions",
    difficulty: "hard",
    targetScore: 20000,
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
