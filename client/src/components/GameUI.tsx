import { useState } from "react";
import { useMarbleDrop } from "@/lib/stores/useMarbleDrop";
import { MarbleInventory } from "./MarbleInventory";

interface GameUIProps {
  onOpenLevelSelector?: () => void;
  currentLevelName?: string;
}

export const GameUI = ({ onOpenLevelSelector, currentLevelName }: GameUIProps = {}) => {
  const { score, selectedColor, canDropMarble, gameMode, resetGame } = useMarbleDrop();
  const [topMinimized, setTopMinimized] = useState(false);
  const [bottomMinimized, setBottomMinimized] = useState(false);
  const [reservoirMinimized, setReservoirMinimized] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Left Side - Marble Reservoir */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-auto">
        <div className="bg-gray-800 bg-opacity-95 rounded-lg shadow-xl border-2 border-amber-600">
          <div 
            className="flex items-center justify-between px-3 py-2 border-b border-amber-600/50 cursor-pointer hover:bg-amber-900/20"
            onClick={() => setReservoirMinimized(!reservoirMinimized)}
          >
            <span className="text-amber-200 text-sm font-semibold">Reservoir</span>
            <button className="text-amber-300 hover:text-white text-lg leading-none">
              {reservoirMinimized ? "+" : "-"}
            </button>
          </div>
          {!reservoirMinimized && (
            <div className="p-2">
              <MarbleInventory vertical />
            </div>
          )}
        </div>
      </div>

      {/* Top Right - Score */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="bg-gray-800 bg-opacity-95 rounded-lg shadow-xl border-2 border-yellow-500 min-w-[180px]">
          <div 
            className="flex items-center justify-between px-4 py-2 border-b border-yellow-500/50 cursor-pointer hover:bg-yellow-900/20"
            onClick={() => setTopMinimized(!topMinimized)}
          >
            <span className="text-yellow-300 font-bold">Score</span>
            <button className="text-yellow-300 hover:text-white text-lg leading-none">
              {topMinimized ? "+" : "-"}
            </button>
          </div>
          {!topMinimized && (
            <div className="p-4">
              <div className="text-3xl font-bold text-white text-center font-mono">
                {score.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Center - Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-gray-900 bg-opacity-95 rounded-lg px-6 py-3 shadow-xl border-2 border-cyan-400">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Marble Drop - Vortex Edition
          </h1>
          <p className="text-center text-gray-400 text-xs mt-1">
            Inspired by Schauberger's Implosion Mechanics
          </p>
        </div>
      </div>

      {/* Bottom Center - Controls & Status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-gray-800 bg-opacity-95 rounded-lg shadow-xl border-2 border-purple-500">
          <div 
            className="flex items-center justify-between px-4 py-2 border-b border-purple-500/50 cursor-pointer hover:bg-purple-900/20"
            onClick={() => setBottomMinimized(!bottomMinimized)}
          >
            <span className="text-purple-300 font-semibold text-sm">Controls</span>
            <button className="text-purple-300 hover:text-white text-lg leading-none">
              {bottomMinimized ? "+" : "-"}
            </button>
          </div>
          {!bottomMinimized && (
            <div className="p-4 flex flex-col gap-3">
              <div className="text-center">
                {selectedColor ? (
                  <div className="text-white font-semibold">
                    Selected: <span className="text-cyan-300 capitalize">{selectedColor}</span> marble
                  </div>
                ) : (
                  <div className="text-gray-400 font-semibold">
                    Select a marble from the reservoir
                  </div>
                )}
              </div>
              
              <div className="text-center">
                {canDropMarble ? (
                  <div className="text-green-400 font-semibold animate-pulse">
                    Press SPACE to drop marble
                  </div>
                ) : (
                  <div className="text-orange-400 font-semibold">
                    Wait for current marble...
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-center text-xs text-gray-300 flex-wrap">
                <div className="bg-gray-700 px-2 py-1 rounded">
                  <kbd className="font-mono">E</kbd> Editor
                </div>
                <div className="bg-gray-700 px-2 py-1 rounded">
                  <kbd className="font-mono">L</kbd> Levels
                </div>
                <div className="bg-gray-700 px-2 py-1 rounded">
                  <kbd className="font-mono">R</kbd> Reset
                </div>
              </div>
              {currentLevelName && (
                <div className="text-center text-cyan-400 text-sm">
                  Playing: {currentLevelName}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
