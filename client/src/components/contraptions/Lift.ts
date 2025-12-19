import Matter from "matter-js";

export interface LiftState {
  platformBody: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  bottomY: number;
  topY: number;
  speed: number;
  isMovingUp: boolean;
  hasMarble: boolean;
}

export function createLift(
  world: Matter.World,
  x: number,
  bottomY: number,
  id: string,
  height: number = 200,
  platformWidth: number = 50
): LiftState {
  const topY = bottomY - height;
  
  const platformBody = Matter.Bodies.rectangle(x, bottomY, platformWidth, 10, {
    isStatic: true,
    label: `lift-platform-${id}`,
    render: { fillStyle: "#6b7280" },
    friction: 0.8,
    restitution: 0.1,
  });
  
  const leftRail = Matter.Bodies.rectangle(x - platformWidth / 2 - 5, (bottomY + topY) / 2, 8, height + 20, {
    isStatic: true,
    label: `lift-rail-${id}`,
    render: { fillStyle: "#4b5563" },
  });
  
  const rightRail = Matter.Bodies.rectangle(x + platformWidth / 2 + 5, (bottomY + topY) / 2, 8, height + 20, {
    isStatic: true,
    label: `lift-rail-${id}`,
    render: { fillStyle: "#4b5563" },
  });
  
  const sensorBody = Matter.Bodies.rectangle(x, bottomY, platformWidth - 10, 30, {
    isStatic: true,
    isSensor: true,
    label: `lift-sensor-${id}`,
    render: { fillStyle: "rgba(107, 114, 128, 0.3)" },
  });
  
  Matter.Composite.add(world, [platformBody, leftRail, rightRail, sensorBody]);
  
  return {
    platformBody,
    sensorBody,
    id,
    bottomY,
    topY,
    speed: 2,
    isMovingUp: false,
    hasMarble: false,
  };
}

export function activateLift(lift: LiftState): LiftState {
  if (!lift.hasMarble) {
    return { ...lift, hasMarble: true, isMovingUp: true };
  }
  return lift;
}

export function updateLift(lift: LiftState): LiftState {
  if (!lift.hasMarble) return lift;
  
  const currentY = lift.platformBody.position.y;
  
  if (lift.isMovingUp) {
    const newY = currentY - lift.speed;
    if (newY <= lift.topY) {
      Matter.Body.setPosition(lift.platformBody, { x: lift.platformBody.position.x, y: lift.topY });
      return { ...lift, isMovingUp: false, hasMarble: false };
    }
    Matter.Body.setPosition(lift.platformBody, { x: lift.platformBody.position.x, y: newY });
  } else {
    const newY = currentY + lift.speed;
    if (newY >= lift.bottomY) {
      Matter.Body.setPosition(lift.platformBody, { x: lift.platformBody.position.x, y: lift.bottomY });
      return lift;
    }
    Matter.Body.setPosition(lift.platformBody, { x: lift.platformBody.position.x, y: newY });
  }
  
  return lift;
}
