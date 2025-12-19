import Matter from "matter-js";

export interface BrakeState {
  body: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  friction: number;
}

export function createBrake(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  width: number = 80,
  angle: number = 0
): BrakeState {
  const body = Matter.Bodies.rectangle(x, y, width, 12, {
    isStatic: true,
    label: `brake-${id}`,
    render: { fillStyle: "#dc2626" },
    friction: 0.95,
    restitution: 0.05,
    angle,
  });
  
  const sensorBody = Matter.Bodies.rectangle(x, y, width + 20, 40, {
    isStatic: true,
    isSensor: true,
    label: `brake-sensor-${id}`,
    render: { fillStyle: "rgba(220, 38, 38, 0.2)" },
    angle,
  });
  
  Matter.Composite.add(world, [body, sensorBody]);
  
  return {
    body,
    sensorBody,
    id,
    friction: 0.95,
  };
}

export function applyBrake(marbleBody: Matter.Body, brake: BrakeState): void {
  const currentVelocity = marbleBody.velocity;
  const dampening = 0.7;
  
  Matter.Body.setVelocity(marbleBody, {
    x: currentVelocity.x * dampening,
    y: currentVelocity.y * dampening,
  });
}
