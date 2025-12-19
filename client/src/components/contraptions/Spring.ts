import Matter from "matter-js";

export interface SpringState {
  baseBody: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  bounceForce: number;
  angle: number;
}

export function createSpring(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  angle: number = -Math.PI / 2,
  bounceForce: number = 0.025
): SpringState {
  const baseBody = Matter.Bodies.rectangle(x, y, 40, 20, {
    isStatic: true,
    label: `spring-base-${id}`,
    render: { fillStyle: "#22c55e" },
    angle,
  });
  
  const coilWidth = 30;
  const coilHeight = 15;
  const coilBody = Matter.Bodies.rectangle(
    x + Math.cos(angle + Math.PI / 2) * 15,
    y + Math.sin(angle + Math.PI / 2) * 15,
    coilWidth, coilHeight,
    {
      isStatic: true,
      label: `spring-coil-${id}`,
      render: { fillStyle: "#16a34a" },
      angle,
    }
  );
  
  const sensorBody = Matter.Bodies.circle(
    x + Math.cos(angle + Math.PI / 2) * 25,
    y + Math.sin(angle + Math.PI / 2) * 25,
    25,
    {
      isStatic: true,
      isSensor: true,
      label: `spring-sensor-${id}`,
      render: { fillStyle: "rgba(34, 197, 94, 0.3)" },
    }
  );
  
  Matter.Composite.add(world, [baseBody, coilBody, sensorBody]);
  
  return {
    baseBody,
    sensorBody,
    id,
    bounceForce,
    angle,
  };
}

export function applySpringBounce(marbleBody: Matter.Body, spring: SpringState): void {
  const bounceAngle = spring.angle + Math.PI / 2;
  
  const forceX = Math.cos(bounceAngle) * spring.bounceForce;
  const forceY = Math.sin(bounceAngle) * spring.bounceForce;
  
  Matter.Body.applyForce(marbleBody, marbleBody.position, {
    x: forceX,
    y: forceY,
  });
  
  console.log(`Spring bounce applied: angle=${bounceAngle}, force=(${forceX.toFixed(4)}, ${forceY.toFixed(4)})`);
}
