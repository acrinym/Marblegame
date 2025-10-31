import { useEffect, useCallback } from "react";
import { PhysicsEngine } from "./PhysicsEngine";
import { GameUI } from "./GameUI";
import { useMarbleDrop, type MarbleColor } from "@/lib/stores/useMarbleDrop";
import { useAudio } from "@/lib/stores/useAudio";

export const MarbleDropGame = () => {
  const {
    dropMarble,
    selectedColor,
    canDropMarble,
    setGameMode,
    resetGame,
    addScore,
    addMarbleToInventory,
  } = useMarbleDrop();

  const { playSuccess, playHit } = useAudio();

  const handleMarbleReachExit = useCallback(
    (marbleId: string, marbleColor: MarbleColor, exitColor: MarbleColor) => {
      if (marbleColor === exitColor) {
        console.log(`Success! ${marbleColor} marble reached matching ${exitColor} exit`);
        addScore(1000);
        addMarbleToInventory(marbleColor, 1);
        playSuccess();
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleDropMarble();
      } else if (e.code === "KeyE") {
        e.preventDefault();
        setGameMode("editor");
      } else if (e.code === "KeyG") {
        e.preventDefault();
        setGameMode("play");
      } else if (e.code === "KeyR") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleDropMarble, setGameMode, handleReset]);

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <PhysicsEngine
        onMarbleReachExit={handleMarbleReachExit}
        onMarbleLost={handleMarbleLost}
      />
      <GameUI />
    </div>
  );
};
