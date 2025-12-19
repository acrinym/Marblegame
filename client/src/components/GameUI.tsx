import { useMarbleDrop } from "@/lib/stores/useMarbleDrop";
import { MarbleInventory } from "./MarbleInventory";

interface GameUIProps {
  onOpenLevelSelector?: () => void;
  currentLevelName?: string;
}

export const GameUI = ({ onOpenLevelSelector, currentLevelName }: GameUIProps = {}) => {
  const { score, selectedColor, canDropMarble, gameMode, resetGame } = useMarbleDrop();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 left-4 pointer-events-auto">
        <MarbleInventory />
      </div>

      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-xl border-2 border-yellow-500 min-w-[200px]">
          <h2 className="text-xl font-bold text-yellow-300 mb-2 text-center">
            Score
          </h2>
          <div className="text-4xl font-bold text-white text-center font-mono">
            {score.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-gray-800 bg-opacity-90 rounded-lg p-4 shadow-xl border-2 border-purple-500 flex flex-col gap-3">
          <div className="text-center">
            {selectedColor ? (
              <div className="text-white font-semibold">
                Selected: <span className="text-cyan-300 capitalize">{selectedColor}</span> marble
              </div>
            ) : (
              <div className="text-gray-400 font-semibold">
                Select a marble color from the reservoir
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
                Wait for current marble to finish...
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-center text-sm text-gray-300 flex-wrap">
            <div className="bg-gray-700 px-3 py-1 rounded">
              <kbd className="font-mono">E</kbd> Editor
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded">
              <kbd className="font-mono">L</kbd> Levels
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded">
              <kbd className="font-mono">R</kbd> Reset
            </div>
          </div>
          {currentLevelName && (
            <div className="text-center mt-2 text-cyan-400 text-sm">
              Playing: {currentLevelName}
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-gray-900 bg-opacity-95 rounded-lg px-6 py-3 shadow-xl border-2 border-cyan-400">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Marble Drop - Vortex Edition
          </h1>
          <p className="text-center text-gray-400 text-sm mt-1">
            Inspired by Schauberger's Implosion Mechanics
          </p>
        </div>
      </div>
    </div>
  );
};
