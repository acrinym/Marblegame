import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllLevels, type LevelData } from "@/lib/levelData";

interface LevelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (level: LevelData) => void;
  currentLevelId?: string;
}

const DIFFICULTY_COLORS = {
  easy: "bg-green-600",
  medium: "bg-yellow-600",
  hard: "bg-red-600",
};

export function LevelSelector({ isOpen, onClose, onSelectLevel, currentLevelId }: LevelSelectorProps) {
  const levels = getAllLevels();
  const [selectedTab, setSelectedTab] = useState<"builtin" | "custom">("builtin");

  if (!isOpen) return null;

  const builtInLevels = levels.filter(l => l.id.startsWith("level-"));
  const customLevels = levels.filter(l => !l.id.startsWith("level-"));

  const displayLevels = selectedTab === "builtin" ? builtInLevels : customLevels;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <Card className="w-[600px] max-h-[80vh] overflow-hidden bg-slate-900 border-cyan-500">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-2xl text-white flex items-center justify-between">
            <span>Select Level</span>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              X
            </Button>
          </CardTitle>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant={selectedTab === "builtin" ? "default" : "outline"}
              onClick={() => setSelectedTab("builtin")}
              className={selectedTab === "builtin" ? "bg-cyan-600" : ""}
            >
              Built-in Levels ({builtInLevels.length})
            </Button>
            <Button
              variant={selectedTab === "custom" ? "default" : "outline"}
              onClick={() => setSelectedTab("custom")}
              className={selectedTab === "custom" ? "bg-cyan-600" : ""}
            >
              Custom Levels ({customLevels.length})
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 overflow-y-auto max-h-[60vh]">
          {displayLevels.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {selectedTab === "custom" 
                ? "No custom levels yet. Create one in the Editor!" 
                : "No built-in levels available"}
            </div>
          ) : (
            <div className="grid gap-3">
              {displayLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => onSelectLevel(level)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    currentLevelId === level.id
                      ? "bg-cyan-800 ring-2 ring-cyan-400"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{level.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{level.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs text-white ${DIFFICULTY_COLORS[level.difficulty]}`}>
                          {level.difficulty.toUpperCase()}
                        </span>
                        <span className="text-sm text-yellow-400">
                          Target: {level.targetScore.toLocaleString()} pts
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {level.contraptions.length} contraptions
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
