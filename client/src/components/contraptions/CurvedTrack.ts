import Matter from "matter-js";

export interface CurvedTrack {
  bodies: Matter.Body[];
  id: string;
  startAngle: number;
  endAngle: number;
  radius: number;
}

/**
 * Creates a smooth curved track using rectangular segments rather than circles.
 * This provides a smoother rolling surface and looks more like a continuous rail.
 */
export function createCurvedTrack(
  world: Matter.World,
  centerX: number,
  centerY: number,
  id: string,
  radius: number = 100,
  startAngle: number = 0,
  endAngle: number = Math.PI / 2,
  trackWidth: number = 20
): CurvedTrack {
  const bodies: Matter.Body[] = [];
  
  const totalAngle = endAngle - startAngle;
  
  const segmentLength = 15;
  const arcLength = Math.abs(totalAngle) * radius;
  const segmentCount = Math.max(4, Math.ceil(arcLength / segmentLength));
  const angleStep = totalAngle / segmentCount;

  const wallThickness = 6;
  const outerRadius = radius + trackWidth / 2;
  const innerRadius = radius - trackWidth / 2;

  const createRail = (railRadius: number, labelSuffix: string) => {
    for (let i = 0; i < segmentCount; i++) {
      const currentAngle = startAngle + (i * angleStep) + (angleStep / 2);
      
      const x = centerX + railRadius * Math.cos(currentAngle);
      const y = centerY + railRadius * Math.sin(currentAngle);
      
      const rotation = currentAngle + (Math.PI / 2);

      const segment = Matter.Bodies.rectangle(x, y, segmentLength + 2, wallThickness, {
        isStatic: true,
        angle: rotation,
        label: `curved-track-${labelSuffix}-${id}-${i}`,
        friction: 0.05,
        restitution: 0.2,
        render: { 
          fillStyle: "#8b5a2b",
          strokeStyle: "#6b4423",
          lineWidth: 1,
        },
        chamfer: { radius: 1 } 
      });
      
      bodies.push(segment);
    }
  };

  createRail(outerRadius, "outer");
  createRail(innerRadius, "inner");
  
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
      centerX = x;
      centerY = y + radius;
      break;
    case "nw":
      startAngle = 3 * Math.PI / 2;
      endAngle = 2 * Math.PI;
      centerX = x;
      centerY = y + radius;
      break;
    case "se":
      startAngle = Math.PI / 2;
      endAngle = Math.PI;
      centerX = x;
      centerY = y - radius;
      break;
    case "sw":
    default:
      startAngle = 0;
      endAngle = Math.PI / 2;
      centerX = x;
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

/**
 * Creates a spiral track that descends in a corkscrew pattern
 */
export function createSpiralTrack(
  world: Matter.World,
  startX: number,
  startY: number,
  id: string,
  turns: number = 2,
  startRadius: number = 80,
  endRadius: number = 60,
  verticalDrop: number = 200,
  clockwise: boolean = true
): CurvedTrack {
  const bodies: Matter.Body[] = [];
  
  const totalAngle = turns * 2 * Math.PI * (clockwise ? 1 : -1);
  const segmentLength = 12;
  const avgRadius = (startRadius + endRadius) / 2;
  const arcLength = Math.abs(totalAngle) * avgRadius;
  const segmentCount = Math.max(20, Math.ceil(arcLength / segmentLength));
  
  const wallThickness = 5;
  const trackWidth = 18;

  const createSpiralRail = (radiusOffset: number, labelSuffix: string) => {
    for (let i = 0; i < segmentCount; i++) {
      const t = i / segmentCount;
      const currentAngle = t * totalAngle;
      
      const currentRadius = startRadius + (endRadius - startRadius) * t + radiusOffset;
      const currentY = startY + verticalDrop * t;
      
      const x = startX + currentRadius * Math.cos(currentAngle);
      const y = currentY + currentRadius * Math.sin(currentAngle) * 0.3;
      
      const nextT = (i + 1) / segmentCount;
      const nextAngle = nextT * totalAngle;
      const rotation = (currentAngle + nextAngle) / 2 + Math.PI / 2;

      const segment = Matter.Bodies.rectangle(x, y, segmentLength + 2, wallThickness, {
        isStatic: true,
        angle: rotation,
        label: `spiral-track-${labelSuffix}-${id}-${i}`,
        friction: 0.05,
        restitution: 0.15,
        render: { 
          fillStyle: "#7a4e2a",
          strokeStyle: "#5a3a1a",
          lineWidth: 1,
        },
        chamfer: { radius: 1 }
      });
      
      bodies.push(segment);
    }
  };

  createSpiralRail(trackWidth / 2, "outer");
  createSpiralRail(-trackWidth / 2, "inner");
  
  Matter.Composite.add(world, bodies);
  
  return {
    bodies,
    id,
    startAngle: 0,
    endAngle: totalAngle,
    radius: avgRadius,
  };
}
