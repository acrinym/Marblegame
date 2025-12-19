import Matter from "matter-js";

export interface WaterJetState {
  id: string;
  position: { x: number; y: number };
  direction: { x: number; y: number };
  force: number;
  body: Matter.Body | null;
  sensorBody: Matter.Body | null;
}

const WATER_JET_COLOR = "#4a9eff";
const WATER_JET_GLOW = "#6bbfff";

export function createWaterJetPropulsor(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  directionAngle: number = 0,
  force: number = 0.008
): WaterJetState {
  const direction = {
    x: Math.cos(directionAngle),
    y: Math.sin(directionAngle),
  };

  const body = Matter.Bodies.trapezoid(x, y, 40, 30, 0.4, {
    isStatic: true,
    angle: directionAngle + Math.PI / 2,
    render: {
      fillStyle: WATER_JET_COLOR,
      strokeStyle: WATER_JET_GLOW,
      lineWidth: 2,
    },
    label: `waterJet-${id}`,
  });

  const sensorBody = Matter.Bodies.rectangle(
    x + direction.x * 40,
    y + direction.y * 40,
    60,
    40,
    {
      isStatic: true,
      isSensor: true,
      angle: directionAngle,
      render: {
        fillStyle: "rgba(74, 158, 255, 0.2)",
        strokeStyle: WATER_JET_GLOW,
        lineWidth: 1,
      },
      label: `waterJet-sensor-${id}`,
    }
  );

  Matter.Composite.add(world, [body, sensorBody]);

  return {
    id,
    position: { x, y },
    direction,
    force,
    body,
    sensorBody,
  };
}

export function applyWaterJetForce(
  marble: Matter.Body,
  waterJet: WaterJetState
): void {
  Matter.Body.applyForce(marble, marble.position, {
    x: waterJet.direction.x * waterJet.force,
    y: waterJet.direction.y * waterJet.force,
  });

  console.log(`Water jet ${waterJet.id} pushed marble`);
}

export function removeWaterJetPropulsor(world: Matter.World, waterJet: WaterJetState): void {
  if (waterJet.body) {
    Matter.Composite.remove(world, waterJet.body);
  }
  if (waterJet.sensorBody) {
    Matter.Composite.remove(world, waterJet.sensorBody);
  }
}
