import Matter from "matter-js";
import type { MarbleColor } from "@/lib/stores/useMarbleDrop";

export interface DiverterState {
  id: string;
  position: { x: number; y: number };
  direction: "left" | "right";
  body: Matter.Body | null;
}

export interface ContraptionDefinition {
  id: string;
  type: string;
  position: { x: number; y: number };
  angle?: number;
  state?: Record<string, any>;
}

const DIVERTER_COLOR = "#d4a574";
const DIVERTER_ACTIVE_COLOR = "#e8c896";

export function createDiverter(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  initialDirection: "left" | "right" = "left"
): DiverterState {
  const angle = initialDirection === "left" ? -Math.PI / 6 : Math.PI / 6;
  
  const body = Matter.Bodies.rectangle(x, y, 80, 10, {
    isStatic: true,
    angle: angle,
    render: {
      fillStyle: DIVERTER_COLOR,
      strokeStyle: "#b8935f",
      lineWidth: 2,
    },
    label: `diverter-${id}`,
  });

  Matter.Composite.add(world, body);

  return {
    id,
    position: { x, y },
    direction: initialDirection,
    body,
  };
}

export function toggleDiverter(
  diverter: DiverterState
): DiverterState {
  if (!diverter.body) return diverter;

  const newDirection = diverter.direction === "left" ? "right" : "left";
  const newAngle = newDirection === "left" ? -Math.PI / 6 : Math.PI / 6;

  Matter.Body.setAngle(diverter.body, newAngle);
  
  diverter.body.render.fillStyle = DIVERTER_ACTIVE_COLOR;
  setTimeout(() => {
    if (diverter.body) {
      diverter.body.render.fillStyle = DIVERTER_COLOR;
    }
  }, 200);

  console.log(`Diverter ${diverter.id} toggled to ${newDirection}`);

  return {
    ...diverter,
    direction: newDirection,
  };
}

export function removeDiverter(world: Matter.World, diverter: DiverterState): void {
  if (diverter.body) {
    Matter.Composite.remove(world, diverter.body);
  }
}
