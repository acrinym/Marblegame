import Matter from "matter-js";

export interface CornerCatcher {
  bodies: Matter.Body[];
  sensorBody: Matter.Body;
  id: string;
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  redirectAngle: number;
}

export function createCornerCatcher(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right" = "bottom-left",
  size: number = 80
): CornerCatcher {
  const wallThickness = 10;
  const bodies: Matter.Body[] = [];
  
  let wall1Pos: { x: number; y: number };
  let wall2Pos: { x: number; y: number };
  let wall1Size: { w: number; h: number };
  let wall2Size: { w: number; h: number };
  let sensorPos: { x: number; y: number };
  let redirectAngle: number;
  
  switch (corner) {
    case "top-left":
      wall1Pos = { x: x, y: y + size / 2 };
      wall1Size = { w: wallThickness, h: size };
      wall2Pos = { x: x + size / 2, y: y };
      wall2Size = { w: size, h: wallThickness };
      sensorPos = { x: x + size / 3, y: y + size / 3 };
      redirectAngle = Math.PI / 4;
      break;
    case "top-right":
      wall1Pos = { x: x, y: y + size / 2 };
      wall1Size = { w: wallThickness, h: size };
      wall2Pos = { x: x - size / 2, y: y };
      wall2Size = { w: size, h: wallThickness };
      sensorPos = { x: x - size / 3, y: y + size / 3 };
      redirectAngle = 3 * Math.PI / 4;
      break;
    case "bottom-left":
      wall1Pos = { x: x, y: y - size / 2 };
      wall1Size = { w: wallThickness, h: size };
      wall2Pos = { x: x + size / 2, y: y };
      wall2Size = { w: size, h: wallThickness };
      sensorPos = { x: x + size / 3, y: y - size / 3 };
      redirectAngle = -Math.PI / 4;
      break;
    case "bottom-right":
    default:
      wall1Pos = { x: x, y: y - size / 2 };
      wall1Size = { w: wallThickness, h: size };
      wall2Pos = { x: x - size / 2, y: y };
      wall2Size = { w: size, h: wallThickness };
      sensorPos = { x: x - size / 3, y: y - size / 3 };
      redirectAngle = -3 * Math.PI / 4;
      break;
  }
  
  const wall1 = Matter.Bodies.rectangle(
    wall1Pos.x, wall1Pos.y,
    wall1Size.w, wall1Size.h,
    {
      isStatic: true,
      label: `corner-catcher-wall-${id}`,
      render: { fillStyle: "#4a5568" },
      friction: 0.3,
      restitution: 0.4,
    }
  );
  
  const wall2 = Matter.Bodies.rectangle(
    wall2Pos.x, wall2Pos.y,
    wall2Size.w, wall2Size.h,
    {
      isStatic: true,
      label: `corner-catcher-wall-${id}`,
      render: { fillStyle: "#4a5568" },
      friction: 0.3,
      restitution: 0.4,
    }
  );
  
  const curveBody = Matter.Bodies.circle(
    x, y, size / 3,
    {
      isStatic: true,
      label: `corner-catcher-curve-${id}`,
      render: { fillStyle: "#2d3748" },
      friction: 0.2,
      restitution: 0.5,
    }
  );
  
  const sensorBody = Matter.Bodies.circle(
    sensorPos.x, sensorPos.y, size / 2,
    {
      isStatic: true,
      isSensor: true,
      label: `corner-catcher-sensor-${id}`,
      render: { fillStyle: "rgba(72, 187, 120, 0.3)" },
    }
  );
  
  bodies.push(wall1, wall2, curveBody);
  Matter.Composite.add(world, [...bodies, sensorBody]);
  
  return {
    bodies,
    sensorBody,
    id,
    corner,
    redirectAngle,
  };
}

export function applyCornerCatcherRedirect(
  marbleBody: Matter.Body,
  catcher: CornerCatcher,
  boostStrength: number = 0.015
): void {
  const speed = Math.sqrt(
    marbleBody.velocity.x * marbleBody.velocity.x +
    marbleBody.velocity.y * marbleBody.velocity.y
  );
  
  const minSpeed = Math.max(speed, 3);
  
  const dirX = Math.cos(catcher.redirectAngle);
  const dirY = Math.sin(catcher.redirectAngle);
  
  Matter.Body.setVelocity(marbleBody, {
    x: dirX * minSpeed,
    y: dirY * minSpeed,
  });
  
  Matter.Body.applyForce(marbleBody, marbleBody.position, {
    x: dirX * boostStrength,
    y: dirY * boostStrength,
  });
}
