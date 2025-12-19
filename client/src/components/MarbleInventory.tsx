import { useMarbleDrop, type MarbleColor, MARBLE_COSTS } from "@/lib/stores/useMarbleDrop";

const MARBLE_COLORS: Record<MarbleColor, { hex: string; name: string }> = {
  red: { hex: "#EF4444", name: "Red" },
  orange: { hex: "#F97316", name: "Orange" },
  yellow: { hex: "#EAB308", name: "Yellow" },
  green: { hex: "#22C55E", name: "Green" },
  blue: { hex: "#3B82F6", name: "Blue" },
  purple: { hex: "#A855F7", name: "Purple" },
  steel: { hex: "#9CA3AF", name: "Steel" },
  black: { hex: "#1F2937", name: "Black" },
};

interface MarbleInventoryProps {
  vertical?: boolean;
}

export const MarbleInventory = ({ vertical = false }: MarbleInventoryProps) => {
  const { inventory, selectedColor, selectColor, purchaseMarble, score } = useMarbleDrop();
  const standardColors: MarbleColor[] = ["red", "orange", "yellow", "green", "blue", "purple"];
  const specialColors: Array<"steel" | "black"> = ["steel", "black"];

  if (vertical) {
    return (
      <div className="flex flex-col gap-2">
        {standardColors.map((color) => {
          const isSelected = selectedColor === color;
          const count = inventory[color];
          const colorInfo = MARBLE_COLORS[color];
          
          return (
            <button
              key={color}
              onClick={() => selectColor(color)}
              disabled={count <= 0}
              className={`
                relative p-2 rounded-lg transition-all duration-200 flex items-center gap-2
                ${isSelected 
                  ? 'ring-2 ring-white scale-105 shadow-lg' 
                  : 'ring-1 ring-gray-600 hover:ring-gray-400'
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
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex-shrink-0"
                style={{ backgroundColor: colorInfo.hex }}
              />
              <span className="text-white font-bold text-sm min-w-[24px]">
                {count}
              </span>
            </button>
          );
        })}
        <div className="border-t border-amber-600/50 pt-2 mt-1">
          <div className="text-xs text-amber-200 text-center mb-1">Special</div>
          {specialColors.map((color) => {
            const isSelected = selectedColor === color;
            const count = inventory[color];
            const colorInfo = MARBLE_COLORS[color];
            const cost = color === "steel" ? MARBLE_COSTS.steel : MARBLE_COSTS.black;
            const canAfford = score >= cost;
            
            return (
              <div key={color} className="flex flex-col gap-1 mb-2">
                <button
                  onClick={() => selectColor(color)}
                  disabled={count <= 0}
                  className={`
                    relative p-2 rounded-lg transition-all duration-200 flex items-center gap-2
                    ${isSelected 
                      ? 'ring-2 ring-white scale-105 shadow-lg' 
                      : 'ring-1 ring-gray-600 hover:ring-gray-400'
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
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex-shrink-0"
                    style={{ backgroundColor: colorInfo.hex }}
                  />
                  <span className="text-white font-bold text-sm min-w-[24px]">
                    {count}
                  </span>
                </button>
                <button
                  onClick={() => purchaseMarble(color)}
                  disabled={!canAfford}
                  className={`
                    px-2 py-0.5 rounded text-xs font-bold transition-all
                    ${canAfford 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Buy: {cost}pts
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 bg-opacity-90 rounded-lg p-4 shadow-xl border-2 border-cyan-500">
      <h2 className="text-xl font-bold text-cyan-300 mb-4 text-center tracking-wide">
        Marble Reservoir
      </h2>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {standardColors.map((color) => {
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

      <div className="border-t-2 border-cyan-500 pt-4 mt-4">
        <h3 className="text-sm font-bold text-cyan-300 mb-2 text-center">
          Special Marbles
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {specialColors.map((color) => {
            const isSelected = selectedColor === color;
            const count = inventory[color];
            const colorInfo = MARBLE_COLORS[color];
            const cost = color === "steel" ? MARBLE_COSTS.steel : MARBLE_COSTS.black;
            const canAfford = score >= cost;
            const description = color === "steel" 
              ? "Heavy, test switches" 
              : "Wild card, any bin";
            
            return (
              <div key={color} className="flex flex-col gap-2">
                <button
                  onClick={() => selectColor(color)}
                  disabled={count <= 0}
                  className={`
                    relative p-2 rounded-lg transition-all duration-200
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
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: colorInfo.hex }}
                    />
                    <span className="text-white font-bold text-xs">
                      {colorInfo.name}
                    </span>
                    <span className="text-lg font-bold text-white bg-gray-900 bg-opacity-70 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                    <span className="text-xs text-gray-300 text-center">
                      {description}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => purchaseMarble(color)}
                  disabled={!canAfford}
                  className={`
                    px-2 py-1 rounded text-xs font-bold transition-all
                    ${canAfford 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Buy: {cost}pts
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
