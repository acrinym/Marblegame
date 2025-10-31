import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type MarbleColor = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "steel" | "black";
export type GameMode = "play" | "editor";

export interface MarbleInventory {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  purple: number;
  steel: number;
  black: number;
}

export const MARBLE_COSTS: Record<"steel" | "black" | "standard", number> = {
  standard: 500,
  steel: 100,
  black: 1500,
};

export interface ActiveMarble {
  id: string;
  color: MarbleColor;
  bodyId?: number;
}

interface MarbleDropState {
  inventory: MarbleInventory;
  selectedColor: MarbleColor | null;
  score: number;
  gameMode: GameMode;
  activeMarbles: ActiveMarble[];
  canDropMarble: boolean;
  
  selectColor: (color: MarbleColor) => void;
  dropMarble: () => ActiveMarble | null;
  removeMarble: (id: string) => void;
  addMarbleToInventory: (color: MarbleColor, count: number) => void;
  purchaseMarble: (color: "steel" | "black" | MarbleColor) => boolean;
  addScore: (points: number) => void;
  setGameMode: (mode: GameMode) => void;
  setCanDropMarble: (can: boolean) => void;
  resetGame: () => void;
}

const INITIAL_INVENTORY: MarbleInventory = {
  red: 7,
  orange: 7,
  yellow: 7,
  green: 7,
  blue: 7,
  purple: 7,
  steel: 0,
  black: 0,
};

export const useMarbleDrop = create<MarbleDropState>()(
  subscribeWithSelector((set, get) => ({
    inventory: { ...INITIAL_INVENTORY },
    selectedColor: null,
    score: 10000,
    gameMode: "play",
    activeMarbles: [],
    canDropMarble: true,
    
    selectColor: (color: MarbleColor) => {
      console.log(`Selected marble color: ${color}`);
      set({ selectedColor: color });
    },
    
    dropMarble: () => {
      const { selectedColor, inventory, canDropMarble } = get();
      
      if (!selectedColor) {
        console.log("No marble color selected");
        return null;
      }
      
      if (!canDropMarble) {
        console.log("Cannot drop marble yet");
        return null;
      }
      
      if (inventory[selectedColor] <= 0) {
        console.log(`No ${selectedColor} marbles left in inventory`);
        return null;
      }
      
      const marbleId = `marble-${Date.now()}-${Math.random()}`;
      const newMarble: ActiveMarble = {
        id: marbleId,
        color: selectedColor,
      };
      
      set((state) => ({
        inventory: {
          ...state.inventory,
          [selectedColor]: state.inventory[selectedColor] - 1,
        },
        activeMarbles: [...state.activeMarbles, newMarble],
        canDropMarble: false,
      }));
      
      console.log(`Dropped ${selectedColor} marble (ID: ${marbleId})`);
      return newMarble;
    },
    
    removeMarble: (id: string) => {
      set((state) => ({
        activeMarbles: state.activeMarbles.filter(m => m.id !== id),
      }));
      console.log(`Removed marble: ${id}`);
    },
    
    addMarbleToInventory: (color: MarbleColor, count: number) => {
      set((state) => ({
        inventory: {
          ...state.inventory,
          [color]: state.inventory[color] + count,
        },
      }));
    },
    
    purchaseMarble: (color: "steel" | "black" | MarbleColor) => {
      const { score } = get();
      const cost = color === "steel" ? MARBLE_COSTS.steel : 
                   color === "black" ? MARBLE_COSTS.black : 
                   MARBLE_COSTS.standard;
      
      if (score < cost) {
        console.log(`Not enough points to purchase ${color} marble. Need ${cost}, have ${score}`);
        return false;
      }
      
      set((state) => ({
        score: state.score - cost,
        inventory: {
          ...state.inventory,
          [color]: state.inventory[color] + 1,
        },
      }));
      
      console.log(`Purchased ${color} marble for ${cost} points`);
      return true;
    },
    
    addScore: (points: number) => {
      set((state) => ({ score: state.score + points }));
      console.log(`Added ${points} points. Total: ${get().score}`);
    },
    
    setGameMode: (mode: GameMode) => {
      console.log(`Game mode: ${mode}`);
      set({ gameMode: mode });
    },
    
    setCanDropMarble: (can: boolean) => {
      set({ canDropMarble: can });
    },
    
    resetGame: () => {
      set({
        inventory: { ...INITIAL_INVENTORY },
        selectedColor: null,
        score: 10000,
        activeMarbles: [],
        canDropMarble: true,
      });
      console.log("Game reset");
    },
  }))
);
