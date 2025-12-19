import Matter from "matter-js";

export interface HeaterState {
  body: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  intensity: number;
}

export function createHeater(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  width: number = 60,
  intensity: number = 1.5
): HeaterState {
  const body = Matter.Bodies.rectangle(x, y, width, 25, {
    isStatic: true,
    label: `heater-${id}`,
    render: { fillStyle: "#ef4444" },
    friction: 0.3,
  });
  
  const glowRing1 = Matter.Bodies.rectangle(x, y - 15, width - 10, 5, {
    isStatic: true,
    label: `heater-glow-${id}`,
    render: { fillStyle: "#f97316" },
  });
  
  const glowRing2 = Matter.Bodies.rectangle(x, y + 15, width - 10, 5, {
    isStatic: true,
    label: `heater-glow-${id}`,
    render: { fillStyle: "#f97316" },
  });
  
  const sensorBody = Matter.Bodies.rectangle(x, y, width + 20, 50, {
    isStatic: true,
    isSensor: true,
    label: `heater-sensor-${id}`,
    render: { fillStyle: "rgba(239, 68, 68, 0.2)" },
  });
  
  Matter.Composite.add(world, [body, glowRing1, glowRing2, sensorBody]);
  
  return {
    body,
    sensorBody,
    id,
    intensity,
  };
}

export function applyHeat(marbleBody: Matter.Body, heater: HeaterState): void {
  const currentVelocity = marbleBody.velocity;
  const speedMultiplier = heater.intensity;
  
  Matter.Body.setVelocity(marbleBody, {
    x: currentVelocity.x * speedMultiplier,
    y: currentVelocity.y * speedMultiplier,
  });
  
  marbleBody.render.fillStyle = "#fbbf24";
  
  console.log(`Marble heated! Speed multiplied by ${speedMultiplier}`);
}
