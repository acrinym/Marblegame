import Matter from "matter-js";

export interface FreezerState {
  body: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  slowFactor: number;
}

export function createFreezer(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  width: number = 60,
  slowFactor: number = 0.5
): FreezerState {
  const body = Matter.Bodies.rectangle(x, y, width, 25, {
    isStatic: true,
    label: `freezer-${id}`,
    render: { fillStyle: "#3b82f6" },
    friction: 0.8,
  });
  
  const iceRing1 = Matter.Bodies.rectangle(x, y - 15, width - 10, 5, {
    isStatic: true,
    label: `freezer-ice-${id}`,
    render: { fillStyle: "#93c5fd" },
  });
  
  const iceRing2 = Matter.Bodies.rectangle(x, y + 15, width - 10, 5, {
    isStatic: true,
    label: `freezer-ice-${id}`,
    render: { fillStyle: "#93c5fd" },
  });
  
  const sensorBody = Matter.Bodies.rectangle(x, y, width + 20, 50, {
    isStatic: true,
    isSensor: true,
    label: `freezer-sensor-${id}`,
    render: { fillStyle: "rgba(59, 130, 246, 0.2)" },
  });
  
  Matter.Composite.add(world, [body, iceRing1, iceRing2, sensorBody]);
  
  return {
    body,
    sensorBody,
    id,
    slowFactor,
  };
}

export function applyFreeze(marbleBody: Matter.Body, freezer: FreezerState): void {
  const currentVelocity = marbleBody.velocity;
  const slowMultiplier = freezer.slowFactor;
  
  Matter.Body.setVelocity(marbleBody, {
    x: currentVelocity.x * slowMultiplier,
    y: currentVelocity.y * slowMultiplier,
  });
  
  marbleBody.render.fillStyle = "#93c5fd";
  
  console.log(`Marble frozen! Speed multiplied by ${slowMultiplier}`);
}
