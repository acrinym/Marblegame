import { useEffect, useCallback, useState } from "react";
import { PhysicsEngine } from "./PhysicsEngine";
import { GameUI } from "./GameUI";
import { LevelEditor } from "./LevelEditor";
import { LevelSelector } from "./LevelSelector";
import { useMarbleDrop, type MarbleColor } from "@/lib/stores/useMarbleDrop";
import { useAudio } from "@/lib/stores/useAudio";
import type { ContraptionType } from "./contraptions";
import type { LevelData } from "@/lib/levelData";

interface PlacedContraption {
  id: string;
  type: ContraptionType;
  x: number;
  y: number;
  angle?: number;
  state?: Record<string, any>;
}

export const MarbleDropGame = () => {
  const {
    dropMarble,
    selectedColor,
    canDropMarble,
    gameMode,
    setGameMode,
    resetGame,
    addScore,
    addMarbleToInventory,
  } = useMarbleDrop();

  const [placedContraptions, setPlacedContraptions] = useState<PlacedContraption[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLevelSelectorOpen, setIsLevelSelectorOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<LevelData | null>(null);

  const { playSuccess, playHit } = useAudio();

  const handleMarbleReachExit = useCallback(
    (marbleId: string, marbleColor: MarbleColor, exitColor: MarbleColor) => {
      const isMatch = marbleColor === exitColor || marbleColor === "black";
      const isSteel = marbleColor === "steel";
      
      if (isMatch && !isSteel) {
        console.log(`Success! ${marbleColor} marble reached ${marbleColor === "black" ? "any" : "matching"} ${exitColor} exit`);
        addScore(1000);
        if (marbleColor !== "black") {
          addMarbleToInventory(marbleColor, 1);
        }
        playSuccess();
      } else if (isSteel) {
        console.log(`Steel marble absorbed by ${exitColor} exit (no return)`);
        addScore(50);
        playHit();
      } else {
        console.log(`Miss! ${marbleColor} marble reached wrong ${exitColor} exit`);
        addScore(-200);
        playHit();
      }
    },
    [addScore, addMarbleToInventory, playSuccess, playHit]
  );

  const handleMarbleLost = useCallback(
    (marbleId: string, marbleColor: MarbleColor) => {
      console.log(`Lost ${marbleColor} marble!`);
      addScore(-100);
      playHit();
    },
    [addScore, playHit]
  );

  const handleDropMarble = useCallback(() => {
    if (!selectedColor || !canDropMarble) {
      console.log("Cannot drop marble:", { selectedColor, canDropMarble });
      return;
    }

    const marble = dropMarble();
    if (marble && (window as any).physicsEngine) {
      (window as any).physicsEngine.dropMarble(marble.color, marble.id);
    }
  }, [selectedColor, canDropMarble, dropMarble]);

  const handleReset = useCallback(() => {
    if ((window as any).physicsEngine) {
      (window as any).physicsEngine.clearAllMarbles();
    }
    resetGame();
    console.log("Game reset");
  }, [resetGame]);

  const handlePlaceContraption = useCallback((contraption: PlacedContraption) => {
    setPlacedContraptions(prev => [...prev, contraption]);
  }, []);

  const handleRemoveContraption = useCallback((id: string) => {
    setPlacedContraptions(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleUpdateContraption = useCallback((id: string, updates: Partial<PlacedContraption>) => {
    setPlacedContraptions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const handleSaveLevel = useCallback((contraptions: PlacedContraption[]) => {
    const levelData: LevelData = {
      id: `custom-${Date.now()}`,
      name: `Custom Level ${new Date().toLocaleTimeString()}`,
      description: "Custom level created in editor",
      difficulty: "medium",
      targetScore: 5000,
      contraptions: contraptions.map(c => ({
        id: c.id,
        type: c.type,
        x: c.x,
        y: c.y,
        angle: c.angle,
        state: c.state,
      })),
    };
    
    const savedLevels = JSON.parse(localStorage.getItem("marbleDrop_customLevels") || "[]");
    savedLevels.push(levelData);
    localStorage.setItem("marbleDrop_customLevels", JSON.stringify(savedLevels));
    console.log("Level saved:", levelData);
  }, []);

  const handleSelectLevel = useCallback((level: LevelData) => {
    setCurrentLevel(level);
    setIsLevelSelectorOpen(false);
    handleReset();
    console.log(`Selected level: ${level.name}`);
  }, [handleReset]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isEditorOpen) return;
      
      if (e.code === "Space") {
        e.preventDefault();
        handleDropMarble();
      } else if (e.code === "KeyE") {
        e.preventDefault();
        setGameMode("editor");
        setIsEditorOpen(true);
      } else if (e.code === "KeyL") {
        e.preventDefault();
        setIsLevelSelectorOpen(true);
      } else if (e.code === "KeyG") {
        e.preventDefault();
        setGameMode("play");
        setIsEditorOpen(false);
        setIsLevelSelectorOpen(false);
      } else if (e.code === "KeyR") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleDropMarble, setGameMode, handleReset, isEditorOpen]);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <PhysicsEngine
        onMarbleReachExit={handleMarbleReachExit}
        onMarbleLost={handleMarbleLost}
        levelContraptions={currentLevel?.contraptions || (placedContraptions.length > 0 ? placedContraptions : undefined)}
      />
      <GameUI 
        currentLevelName={currentLevel?.name}
        onOpenLevelSelector={() => setIsLevelSelectorOpen(true)}
      />
      <LevelSelector
        isOpen={isLevelSelectorOpen}
        onClose={() => setIsLevelSelectorOpen(false)}
        onSelectLevel={handleSelectLevel}
        currentLevelId={currentLevel?.id}
      />
      <LevelEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setGameMode("play");
        }}
        onSaveLevel={handleSaveLevel}
        placedContraptions={placedContraptions}
        onPlaceContraption={handlePlaceContraption}
        onRemoveContraption={handleRemoveContraption}
        onUpdateContraption={handleUpdateContraption}
      />
    </div>
  );
};
