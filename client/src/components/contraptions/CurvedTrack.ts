import Matter from "matter-js";

export interface CurvedTrack {
  bodies: Matter.Body[];
  id: string;
  startAngle: number;
  endAngle: number;
  radius: number;
}

export function createCurvedTrack(
  world: Matter.World,
  centerX: number,
  centerY: number,
  id: string,
  radius: number = 100,
  startAngle: number = 0,
  endAngle: number = Math.PI / 2,
  trackWidth: number = 12
): CurvedTrack {
  const bodies: Matter.Body[] = [];
  
  const angleSpan = endAngle - startAngle;
  const segments = Math.max(8, Math.ceil(Math.abs(angleSpan) / (Math.PI / 12)));
  const angleStep = angleSpan / segments;
  
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + i * angleStep;
    
    const outerX = centerX + (radius + trackWidth / 2) * Math.cos(angle);
    const outerY = centerY + (radius + trackWidth / 2) * Math.sin(angle);
    
    const innerX = centerX + (radius - trackWidth / 2) * Math.cos(angle);
    const innerY = centerY + (radius - trackWidth / 2) * Math.sin(angle);
    
    const outerSegment = Matter.Bodies.circle(outerX, outerY, 5, {
      isStatic: true,
      label: `curved-track-outer-${id}-${i}`,
      render: { fillStyle: "#8b5a2b" },
      friction: 0.3,
      restitution: 0.2,
    });
    
    const innerSegment = Matter.Bodies.circle(innerX, innerY, 5, {
      isStatic: true,
      label: `curved-track-inner-${id}-${i}`,
      render: { fillStyle: "#8b5a2b" },
      friction: 0.3,
      restitution: 0.2,
    });
    
    bodies.push(outerSegment, innerSegment);
  }
  
  Matter.Composite.add(world, bodies);
  
  return {
    bodies,
    id,
    startAngle,
    endAngle,
    radius,
  };
}

export function createQuarterPipe(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  direction: "ne" | "nw" | "se" | "sw" = "se",
  radius: number = 80
): CurvedTrack {
  let startAngle: number;
  let endAngle: number;
  let centerX = x;
  let centerY = y;
  
  switch (direction) {
    case "ne":
      startAngle = Math.PI;
      endAngle = 3 * Math.PI / 2;
      centerX = x + radius;
      centerY = y + radius;
      break;
    case "nw":
      startAngle = 3 * Math.PI / 2;
      endAngle = 2 * Math.PI;
      centerX = x - radius;
      centerY = y + radius;
      break;
    case "se":
      startAngle = Math.PI / 2;
      endAngle = Math.PI;
      centerX = x + radius;
      centerY = y - radius;
      break;
    case "sw":
    default:
      startAngle = 0;
      endAngle = Math.PI / 2;
      centerX = x - radius;
      centerY = y - radius;
      break;
  }
  
  return createCurvedTrack(world, centerX, centerY, id, radius, startAngle, endAngle);
}

export function createHalfPipe(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  orientation: "top" | "bottom" | "left" | "right" = "bottom",
  radius: number = 60
): CurvedTrack {
  let startAngle: number;
  let endAngle: number;
  
  switch (orientation) {
    case "top":
      startAngle = Math.PI;
      endAngle = 2 * Math.PI;
      break;
    case "bottom":
      startAngle = 0;
      endAngle = Math.PI;
      break;
    case "left":
      startAngle = -Math.PI / 2;
      endAngle = Math.PI / 2;
      break;
    case "right":
    default:
      startAngle = Math.PI / 2;
      endAngle = 3 * Math.PI / 2;
      break;
  }
  
  return createCurvedTrack(world, x, y, id, radius, startAngle, endAngle);
}
