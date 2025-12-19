import Matter from "matter-js";

export interface TeleporterState {
  entrySensor: Matter.Body;
  exitMarker: Matter.Body;
  id: string;
  exitX: number;
  exitY: number;
  cooldown: number;
  lastUsed: number;
}

export function createTeleporter(
  world: Matter.World,
  entryX: number,
  entryY: number,
  exitX: number,
  exitY: number,
  id: string
): TeleporterState {
  const entrySensor = Matter.Bodies.circle(entryX, entryY, 25, {
    isStatic: true,
    isSensor: true,
    label: `teleporter-entry-${id}`,
    render: { fillStyle: "rgba(139, 92, 246, 0.6)" },
  });
  
  const entryRing = Matter.Bodies.circle(entryX, entryY, 30, {
    isStatic: true,
    label: `teleporter-ring-${id}`,
    render: { 
      fillStyle: "transparent",
      strokeStyle: "#8b5cf6",
      lineWidth: 4,
    },
  });
  
  const exitMarker = Matter.Bodies.circle(exitX, exitY, 25, {
    isStatic: true,
    isSensor: true,
    label: `teleporter-exit-${id}`,
    render: { fillStyle: "rgba(236, 72, 153, 0.6)" },
  });
  
  const exitRing = Matter.Bodies.circle(exitX, exitY, 30, {
    isStatic: true,
    label: `teleporter-exit-ring-${id}`,
    render: { 
      fillStyle: "transparent",
      strokeStyle: "#ec4899",
      lineWidth: 4,
    },
  });
  
  Matter.Composite.add(world, [entrySensor, entryRing, exitMarker, exitRing]);
  
  return {
    entrySensor,
    exitMarker,
    id,
    exitX,
    exitY,
    cooldown: 500,
    lastUsed: 0,
  };
}

export function teleportMarble(
  marbleBody: Matter.Body,
  teleporter: TeleporterState
): TeleporterState {
  const now = Date.now();
  if (now - teleporter.lastUsed < teleporter.cooldown) {
    return teleporter;
  }
  
  const velocity = marbleBody.velocity;
  
  Matter.Body.setPosition(marbleBody, {
    x: teleporter.exitX,
    y: teleporter.exitY,
  });
  
  Matter.Body.setVelocity(marbleBody, velocity);
  
  console.log(`Teleported marble to (${teleporter.exitX}, ${teleporter.exitY})`);
  
  return { ...teleporter, lastUsed: now };
}
