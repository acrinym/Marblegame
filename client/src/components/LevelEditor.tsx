import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MarbleColor } from "@/lib/stores/useMarbleDrop";
import type { ContraptionType } from "./contraptions";

interface PlacedContraption {
  id: string;
  type: ContraptionType;
  x: number;
  y: number;
  angle?: number;
  state?: Record<string, any>;
}

interface LevelEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLevel: (contraptions: PlacedContraption[]) => void;
  placedContraptions: PlacedContraption[];
  onPlaceContraption: (contraption: PlacedContraption) => void;
  onRemoveContraption: (id: string) => void;
  onUpdateContraption: (id: string, updates: Partial<PlacedContraption>) => void;
}

const CONTRAPTION_PALETTE = [
  { type: "diverter" as ContraptionType, name: "Diverter", description: "Toggle direction switch", color: "#d4a574" },
  { type: "copperCoils" as ContraptionType, name: "Copper Coils", description: "Speed boost track", color: "#CD7F32" },
  { type: "waterJet" as ContraptionType, name: "Water Jet", description: "Directional force", color: "#4a9eff" },
  { type: "spinner" as ContraptionType, name: "Spinner", description: "Centrifugal fling", color: "#8B4513" },
  { type: "triggeredDiverter" as ContraptionType, name: "Triggered Switch", description: "One-time activation", color: "#666666" },
  { type: "cornerCatcher" as ContraptionType, name: "Corner Catcher", description: "Catches & redirects marbles", color: "#48bb78" },
  { type: "quarterPipe" as ContraptionType, name: "Quarter Pipe", description: "90-degree curved track", color: "#8b5a2b" },
  { type: "halfPipe" as ContraptionType, name: "Half Pipe", description: "180-degree curved track", color: "#a0522d" },
];

const PAINTER_COLORS: MarbleColor[] = ["red", "orange", "yellow", "green", "blue", "purple"];

const GRID_SIZE = 20;

function snapToGrid(value: number): number {
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

export function LevelEditor({
  isOpen,
  onClose,
  onSaveLevel,
  placedContraptions,
  onPlaceContraption,
  onRemoveContraption,
  onUpdateContraption,
}: LevelEditorProps) {
  const [selectedType, setSelectedType] = useState<ContraptionType | null>(null);
  const [selectedPainterColor, setSelectedPainterColor] = useState<MarbleColor>("red");
  const [selectedContraption, setSelectedContraption] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedType) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = snapToGrid(e.clientX - rect.left);
    const y = snapToGrid(e.clientY - rect.top);

    const newContraption: PlacedContraption = {
      id: `${selectedType}-${Date.now()}`,
      type: selectedType,
      x,
      y,
      angle: 0,
      state: selectedType === "painter" 
        ? { targetColor: selectedPainterColor } 
        : selectedType === "cornerCatcher" 
          ? { corner: "bottom-left" }
          : selectedType === "quarterPipe"
            ? { direction: "se" }
            : selectedType === "halfPipe"
              ? { orientation: "bottom" }
              : undefined,
    };

    onPlaceContraption(newContraption);
    console.log(`Placed ${selectedType} at (${x}, ${y})`);
  }, [selectedType, selectedPainterColor, onPlaceContraption]);

  const handleContraptionDrag = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedContraption(id);
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !selectedContraption) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = snapToGrid(e.clientX - rect.left);
    const y = snapToGrid(e.clientY - rect.top);

    onUpdateContraption(selectedContraption, { x, y });
  }, [isDragging, selectedContraption, onUpdateContraption]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRotate = useCallback((id: string, delta: number) => {
    const contraption = placedContraptions.find(c => c.id === id);
    if (contraption) {
      const newAngle = (contraption.angle || 0) + delta;
      onUpdateContraption(id, { angle: newAngle });
    }
  }, [placedContraptions, onUpdateContraption]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex">
      <div className="w-64 bg-slate-900 p-4 overflow-y-auto border-r border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Contraptions</h2>
        
        <div className="space-y-2">
          {CONTRAPTION_PALETTE.map((item) => (
            <button
              key={item.type}
              onClick={() => setSelectedType(item.type)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedType === item.type
                  ? "bg-slate-700 ring-2 ring-cyan-400"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="text-white font-medium">{item.name}</div>
                  <div className="text-slate-400 text-xs">{item.description}</div>
                </div>
              </div>
            </button>
          ))}

          <button
            onClick={() => setSelectedType("painter")}
            className={`w-full p-3 rounded-lg text-left transition-all ${
              selectedType === "painter"
                ? "bg-slate-700 ring-2 ring-cyan-400"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-red-500 via-green-500 to-blue-500" />
              <div>
                <div className="text-white font-medium">Painter</div>
                <div className="text-slate-400 text-xs">Change marble color</div>
              </div>
            </div>
          </button>

          {selectedType === "painter" && (
            <div className="ml-4 mt-2 flex flex-wrap gap-2">
              {PAINTER_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedPainterColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedPainterColor === color ? "border-white" : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: color === "red" ? "#EF4444" :
                      color === "orange" ? "#F97316" :
                      color === "yellow" ? "#EAB308" :
                      color === "green" ? "#22C55E" :
                      color === "blue" ? "#3B82F6" : "#A855F7"
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <h3 className="text-lg font-bold text-white mb-3">Actions</h3>
          <div className="space-y-2">
            <Button
              onClick={() => onSaveLevel(placedContraptions)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Save Level
            </Button>
            <Button
              onClick={() => setSelectedType(null)}
              variant="outline"
              className="w-full"
            >
              Clear Selection
            </Button>
            <Button
              onClick={onClose}
              variant="destructive"
              className="w-full"
            >
              Exit Editor
            </Button>
          </div>
        </div>

        {selectedContraption && (
          <div className="mt-6 pt-4 border-t border-slate-700">
            <h3 className="text-lg font-bold text-white mb-3">Selected</h3>
            <div className="space-y-2">
              <Button
                onClick={() => handleRotate(selectedContraption, Math.PI / 12)}
                variant="outline"
                className="w-full"
              >
                Rotate +15°
              </Button>
              <Button
                onClick={() => handleRotate(selectedContraption, -Math.PI / 12)}
                variant="outline"
                className="w-full"
              >
                Rotate -15°
              </Button>
              <Button
                onClick={() => {
                  onRemoveContraption(selectedContraption);
                  setSelectedContraption(null);
                }}
                variant="destructive"
                className="w-full"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-12 bg-slate-800 flex items-center justify-between px-4 border-b border-slate-700">
          <span className="text-white font-medium">
            {selectedType ? `Placing: ${selectedType}` : "Select a contraption to place"}
          </span>
          <span className="text-slate-400 text-sm">
            {placedContraptions.length} contraptions placed
          </span>
        </div>

        <div
          className="flex-1 relative overflow-hidden cursor-crosshair"
          style={{ backgroundColor: "#1a1a2e" }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #444 1px, transparent 1px),
                linear-gradient(to bottom, #444 1px, transparent 1px)
              `,
              backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
            }}
          />

          {placedContraptions.map((c) => (
            <div
              key={c.id}
              className={`absolute cursor-move ${
                selectedContraption === c.id ? "ring-2 ring-cyan-400" : ""
              }`}
              style={{
                left: c.x - 20,
                top: c.y - 20,
                width: 40,
                height: 40,
                transform: `rotate(${(c.angle || 0)}rad)`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedContraption(c.id);
              }}
              onMouseDown={(e) => handleContraptionDrag(e, c.id)}
            >
              <div
                className="w-full h-full rounded flex items-center justify-center text-white text-xs font-bold"
                style={{
                  backgroundColor: 
                    c.type === "diverter" ? "#d4a574" :
                    c.type === "copperCoils" ? "#CD7F32" :
                    c.type === "waterJet" ? "#4a9eff" :
                    c.type === "spinner" ? "#8B4513" :
                    c.type === "triggeredDiverter" ? "#666666" :
                    c.type === "painter" ? "#A855F7" :
                    c.type === "curvedTrack" ? "#d4a574" :
                    c.type === "exitBin" ? "#22C55E" : "#888888",
                }}
              >
                {c.type.charAt(0).toUpperCase()}
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 bg-slate-900/90 rounded-lg p-4 text-white text-sm">
            <div className="font-bold mb-2">Controls</div>
            <ul className="space-y-1 text-slate-300">
              <li>Click to place contraption</li>
              <li>Click placed item to select</li>
              <li>Drag to move</li>
              <li>Use sidebar to rotate/delete</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
