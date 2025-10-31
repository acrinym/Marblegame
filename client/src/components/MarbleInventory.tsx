import { useMarbleDrop, type MarbleColor } from "@/lib/stores/useMarbleDrop";

const MARBLE_COLORS: Record<MarbleColor, { hex: string; name: string }> = {
  red: { hex: "#EF4444", name: "Red" },
  orange: { hex: "#F97316", name: "Orange" },
  yellow: { hex: "#EAB308", name: "Yellow" },
  green: { hex: "#22C55E", name: "Green" },
  blue: { hex: "#3B82F6", name: "Blue" },
  purple: { hex: "#A855F7", name: "Purple" },
};

export const MarbleInventory = () => {
  const { inventory, selectedColor, selectColor } = useMarbleDrop();
  const colors: MarbleColor[] = ["red", "orange", "yellow", "green", "blue", "purple"];

  return (
    <div className="bg-gray-800 bg-opacity-90 rounded-lg p-4 shadow-xl border-2 border-cyan-500">
      <h2 className="text-xl font-bold text-cyan-300 mb-4 text-center tracking-wide">
        Marble Reservoir
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          const count = inventory[color];
          const colorInfo = MARBLE_COLORS[color];
          
          return (
            <button
              key={color}
              onClick={() => selectColor(color)}
              disabled={count <= 0}
              className={`
                relative p-3 rounded-lg transition-all duration-200
                ${isSelected 
                  ? 'ring-4 ring-white scale-105 shadow-lg' 
                  : 'ring-2 ring-gray-600 hover:ring-gray-400'
                }
                ${count <= 0 
                  ? 'opacity-40 cursor-not-allowed' 
                  : 'cursor-pointer hover:scale-105'
                }
              `}
              style={{
                backgroundColor: `${colorInfo.hex}33`,
                borderColor: colorInfo.hex,
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                  style={{ backgroundColor: colorInfo.hex }}
                />
                <span className="text-white font-bold text-sm">
                  {colorInfo.name}
                </span>
                <span className="text-2xl font-bold text-white bg-gray-900 bg-opacity-70 px-3 py-1 rounded-full">
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
