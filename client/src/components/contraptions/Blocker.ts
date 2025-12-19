import Matter from "matter-js";

export interface BlockerState {
  body: Matter.Body;
  id: string;
  isActive: boolean;
}

export function createBlocker(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  width: number = 60,
  height: number = 20,
  angle: number = 0
): BlockerState {
  const body = Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    label: `blocker-${id}`,
    render: { fillStyle: "#ef4444" },
    friction: 0.8,
    restitution: 0.3,
    angle,
  });
  
  const warningStripe1 = Matter.Bodies.rectangle(x - width / 4, y, 5, height, {
    isStatic: true,
    label: `blocker-stripe-${id}`,
    render: { fillStyle: "#fbbf24" },
    angle,
  });
  
  const warningStripe2 = Matter.Bodies.rectangle(x + width / 4, y, 5, height, {
    isStatic: true,
    label: `blocker-stripe-${id}`,
    render: { fillStyle: "#fbbf24" },
    angle,
  });
  
  Matter.Composite.add(world, [body, warningStripe1, warningStripe2]);
  
  return {
    body,
    id,
    isActive: true,
  };
}

export function toggleBlocker(blocker: BlockerState, world: Matter.World): BlockerState {
  const newActive = !blocker.isActive;
  
  if (newActive) {
    blocker.body.render.fillStyle = "#ef4444";
    blocker.body.collisionFilter.mask = 0xFFFFFFFF;
  } else {
    blocker.body.render.fillStyle = "rgba(239, 68, 68, 0.3)";
    blocker.body.collisionFilter.mask = 0;
  }
  
  return { ...blocker, isActive: newActive };
}
