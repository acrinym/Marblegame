import Matter from "matter-js";

export interface TriggeredDiverterState {
  id: string;
  position: { x: number; y: number };
  direction: "left" | "right";
  isTriggered: boolean;
  triggerId: string;
  body: Matter.Body | null;
  triggerBody: Matter.Body | null;
}

const DIVERTER_INACTIVE_COLOR = "#666666";
const DIVERTER_ACTIVE_COLOR = "#d4a574";
const TRIGGER_COLOR = "#ff6b6b";
const TRIGGER_PRESSED_COLOR = "#4ecdc4";

export function createTriggeredDiverter(
  world: Matter.World,
  diverterX: number,
  diverterY: number,
  triggerX: number,
  triggerY: number,
  id: string,
  targetDirection: "left" | "right" = "right"
): TriggeredDiverterState {
  const initialAngle = targetDirection === "left" ? Math.PI / 6 : -Math.PI / 6;
  
  const body = Matter.Bodies.rectangle(diverterX, diverterY, 80, 10, {
    isStatic: true,
    angle: initialAngle,
    render: {
      fillStyle: DIVERTER_INACTIVE_COLOR,
      strokeStyle: "#444444",
      lineWidth: 2,
    },
    label: `triggeredDiverter-${id}`,
  });

  const triggerBody = Matter.Bodies.rectangle(triggerX, triggerY, 30, 10, {
    isStatic: true,
    isSensor: true,
    render: {
      fillStyle: TRIGGER_COLOR,
      strokeStyle: "#cc5555",
      lineWidth: 2,
    },
    label: `triggeredDiverter-trigger-${id}`,
  });

  Matter.Composite.add(world, [body, triggerBody]);

  return {
    id,
    position: { x: diverterX, y: diverterY },
    direction: targetDirection === "left" ? "right" : "left",
    isTriggered: false,
    triggerId: `trigger-${id}`,
    body,
    triggerBody,
  };
}

export function triggerDiverter(
  diverter: TriggeredDiverterState
): TriggeredDiverterState {
  if (!diverter.body || diverter.isTriggered) return diverter;

  const newDirection = diverter.direction === "left" ? "right" : "left";
  const newAngle = newDirection === "left" ? -Math.PI / 6 : Math.PI / 6;

  Matter.Body.setAngle(diverter.body, newAngle);
  diverter.body.render.fillStyle = DIVERTER_ACTIVE_COLOR;
  diverter.body.render.strokeStyle = "#b8935f";

  if (diverter.triggerBody) {
    diverter.triggerBody.render.fillStyle = TRIGGER_PRESSED_COLOR;
  }

  console.log(`Triggered diverter ${diverter.id} activated, now pointing ${newDirection}`);

  return {
    ...diverter,
    direction: newDirection,
    isTriggered: true,
  };
}

export function resetTriggeredDiverter(
  diverter: TriggeredDiverterState,
  targetDirection: "left" | "right"
): TriggeredDiverterState {
  if (!diverter.body) return diverter;

  const initialDirection = targetDirection === "left" ? "right" : "left";
  const initialAngle = targetDirection === "left" ? Math.PI / 6 : -Math.PI / 6;

  Matter.Body.setAngle(diverter.body, initialAngle);
  diverter.body.render.fillStyle = DIVERTER_INACTIVE_COLOR;
  diverter.body.render.strokeStyle = "#444444";

  if (diverter.triggerBody) {
    diverter.triggerBody.render.fillStyle = TRIGGER_COLOR;
  }

  return {
    ...diverter,
    direction: initialDirection,
    isTriggered: false,
  };
}

export function removeTriggeredDiverter(world: Matter.World, diverter: TriggeredDiverterState): void {
  if (diverter.body) {
    Matter.Composite.remove(world, diverter.body);
  }
  if (diverter.triggerBody) {
    Matter.Composite.remove(world, diverter.triggerBody);
  }
}
