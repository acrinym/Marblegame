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
 * Creates a spiral track that descends - actually a series of connected ramp segments
 * forming a continuous slope for marbles to roll down
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
  
  const segmentCount = Math.max(15, Math.ceil(turns * 12));
  const segmentLength = verticalDrop / segmentCount;
  const horizontalSpread = (startRadius - endRadius);
  
  const direction = clockwise ? 1 : -1;
  const trackThickness = 8;

  for (let i = 0; i < segmentCount; i++) {
    const t = i / segmentCount;
    const nextT = (i + 1) / segmentCount;
    
    const currentY = startY + verticalDrop * t;
    const nextY = startY + verticalDrop * nextT;
    
    const wavePhase = t * turns * 2 * Math.PI;
    const xOffset = Math.sin(wavePhase) * horizontalSpread * 0.5 * direction;
    
    const x = startX + xOffset;
    const y = (currentY + nextY) / 2;
    
    const angle = Math.atan2(nextY - currentY, xOffset * 0.1) + (direction * 0.1);

    const segment = Matter.Bodies.rectangle(x, y, segmentLength + 4, trackThickness, {
      isStatic: true,
      angle: angle,
      label: `spiral-track-floor-${id}-${i}`,
      friction: 0.02,
      restitution: 0.1,
      render: { 
        fillStyle: "#8b6914",
        strokeStyle: "#6b5010",
        lineWidth: 1,
      },
      chamfer: { radius: 2 }
    });
    
    bodies.push(segment);
  }
  
  Matter.Composite.add(world, bodies);
  
  return {
    bodies,
    id,
    startAngle: 0,
    endAngle: turns * 2 * Math.PI,
    radius: (startRadius + endRadius) / 2,
  };
}
