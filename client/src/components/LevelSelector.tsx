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
  const [hoveredLevel, setHoveredLevel] = useState<LevelData | null>(null);

  if (!isOpen) return null;

  const builtInLevels = levels.filter(l => l.id.startsWith("level-"));
  const customLevels = levels.filter(l => !l.id.startsWith("level-"));

  const displayLevels = selectedTab === "builtin" ? builtInLevels : customLevels;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <Card className="w-[800px] max-h-[85vh] overflow-hidden bg-slate-900 border-amber-600/50">
        <CardHeader className="border-b border-amber-700/30 bg-gradient-to-r from-amber-900/20 to-slate-900">
          <CardTitle className="text-2xl text-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              <div>
                <span>Leonardo's Workshop</span>
                <p className="text-sm font-normal text-amber-200/60">Select a Puzzle</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </CardTitle>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant={selectedTab === "builtin" ? "default" : "outline"}
              onClick={() => setSelectedTab("builtin")}
              className={selectedTab === "builtin" ? "bg-amber-700 hover:bg-amber-600" : "border-amber-600/50 text-amber-200"}
            >
              Historical Puzzles ({builtInLevels.length})
            </Button>
            <Button
              variant={selectedTab === "custom" ? "default" : "outline"}
              onClick={() => setSelectedTab("custom")}
              className={selectedTab === "custom" ? "bg-amber-700 hover:bg-amber-600" : "border-amber-600/50 text-amber-200"}
            >
              Custom Creations ({customLevels.length})
            </Button>
          </div>
        </CardHeader>
        
        <div className="flex">
          <CardContent className="p-4 overflow-y-auto max-h-[55vh] flex-1">
            {displayLevels.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                {selectedTab === "custom" 
                  ? "No custom levels yet. Press 'E' to open the Editor!" 
                  : "No built-in levels available"}
              </div>
            ) : (
              <div className="grid gap-2">
                {displayLevels.map((level, index) => (
                  <button
                    key={level.id}
                    onClick={() => onSelectLevel(level)}
                    onMouseEnter={() => setHoveredLevel(level)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      currentLevelId === level.id
                        ? "bg-amber-800/50 ring-2 ring-amber-400"
                        : "bg-slate-800/50 hover:bg-amber-900/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-700/50 flex items-center justify-center text-amber-200 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-amber-100">{level.name}</h3>
                          {level.isBonus && (
                            <span className="px-1.5 py-0.5 bg-purple-600 rounded text-xs text-white">
                              BONUS
                            </span>
                          )}
                        </div>
                        {level.subtitle && (
                          <p className="text-xs text-amber-200/60 italic">{level.subtitle}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs text-white ${DIFFICULTY_COLORS[level.difficulty]}`}>
                          {level.difficulty.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
          
          <div className="w-64 border-l border-amber-700/30 p-4 bg-gradient-to-b from-amber-900/10 to-slate-900">
            {hoveredLevel ? (
              <div className="space-y-3">
                <h4 className="font-bold text-amber-100 text-lg">{hoveredLevel.name}</h4>
                {hoveredLevel.subtitle && (
                  <p className="text-sm text-amber-200/70 italic">{hoveredLevel.subtitle}</p>
                )}
                <p className="text-sm text-gray-300">{hoveredLevel.description}</p>
                
                <div className="border-t border-amber-700/30 pt-3 mt-3">
                  <p className="text-sm text-amber-200">
                    <span className="text-amber-400">Target:</span> {hoveredLevel.targetScore.toLocaleString()} pts
                  </p>
                  <p className="text-sm text-amber-200">
                    <span className="text-amber-400">Contraptions:</span> {hoveredLevel.contraptions.length}
                  </p>
                </div>
                
                {hoveredLevel.leonardoNote && (
                  <div className="bg-amber-900/20 rounded-lg p-3 border border-amber-700/30 mt-3">
                    <p className="text-xs text-amber-300/80 italic leading-relaxed">
                      "{hoveredLevel.leonardoNote}"
                    </p>
                    <p className="text-xs text-amber-400 mt-2 text-right">— Leonardo</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-amber-200/40 py-8">
                <p className="text-4xl mb-2">📜</p>
                <p className="text-sm">Hover over a level to see details</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
