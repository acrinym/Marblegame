import Matter from "matter-js";
import type { MarbleColor } from "@/lib/stores/useMarbleDrop";

export interface PainterState {
  id: string;
  position: { x: number; y: number };
  targetColor: MarbleColor;
  body: Matter.Body | null;
  sensorBody: Matter.Body | null;
}

const PAINTER_COLORS: Record<MarbleColor, string> = {
  red: "#EF4444",
  orange: "#F97316",
  yellow: "#EAB308",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#A855F7",
  steel: "#9CA3AF",
  black: "#1F2937",
};

export function createPainter(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  targetColor: MarbleColor
): PainterState {
  const eggWidth = 50;
  const eggHeight = 70;
  
  const vertices = [];
  const segments = 20;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const radiusX = eggWidth / 2;
    const radiusY = eggHeight / 2 * (1 + 0.3 * Math.cos(angle));
    vertices.push({
      x: x + radiusX * Math.cos(angle),
      y: y + radiusY * Math.sin(angle),
    });
  }

  const body = Matter.Bodies.fromVertices(x, y, [vertices], {
    isStatic: true,
    render: {
      fillStyle: `${PAINTER_COLORS[targetColor]}66`,
      strokeStyle: PAINTER_COLORS[targetColor],
      lineWidth: 4,
    },
    label: `painter-${id}`,
  });

  const sensorBody = Matter.Bodies.circle(x, y, 35, {
    isStatic: true,
    isSensor: true,
    render: {
      fillStyle: "transparent",
    },
    label: `painter-sensor-${id}`,
  });

  if (body) {
    Matter.Composite.add(world, [body, sensorBody]);
  } else {
    const fallbackBody = Matter.Bodies.circle(x, y, 30, {
      isStatic: true,
      render: {
        fillStyle: `${PAINTER_COLORS[targetColor]}66`,
        strokeStyle: PAINTER_COLORS[targetColor],
        lineWidth: 4,
      },
      label: `painter-${id}`,
    });
    Matter.Composite.add(world, [fallbackBody, sensorBody]);
    
    return {
      id,
      position: { x, y },
      targetColor,
      body: fallbackBody,
      sensorBody,
    };
  }

  return {
    id,
    position: { x, y },
    targetColor,
    body,
    sensorBody,
  };
}

export function paintMarble(
  marble: Matter.Body,
  painter: PainterState,
  onColorChange: (marbleId: string, newColor: MarbleColor) => void
): void {
  const marbleLabel = marble.label;
  const marbleIdMatch = marbleLabel.match(/marble-(\w+)/);
  
  if (marbleIdMatch) {
    marble.render.fillStyle = PAINTER_COLORS[painter.targetColor];
    marble.label = `marble-${painter.targetColor}`;
    
    console.log(`Painter ${painter.id} changed marble to ${painter.targetColor}`);
    onColorChange(marbleLabel, painter.targetColor);
  }
}

export function removePainter(world: Matter.World, painter: PainterState): void {
  if (painter.body) {
    Matter.Composite.remove(world, painter.body);
  }
  if (painter.sensorBody) {
    Matter.Composite.remove(world, painter.sensorBody);
  }
}
