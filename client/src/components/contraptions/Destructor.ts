import Matter from "matter-js";

export interface DestructorState {
  body: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  vortexBodies: Matter.Body[];
}

export function createDestructor(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  radius: number = 40
): DestructorState {
  const body = Matter.Bodies.circle(x, y, radius, {
    isStatic: true,
    label: `destructor-${id}`,
    render: { fillStyle: "#7c3aed" },
  });
  
  const innerVortex = Matter.Bodies.circle(x, y, radius * 0.6, {
    isStatic: true,
    label: `destructor-inner-${id}`,
    render: { fillStyle: "#5b21b6" },
  });
  
  const core = Matter.Bodies.circle(x, y, radius * 0.3, {
    isStatic: true,
    label: `destructor-core-${id}`,
    render: { fillStyle: "#1e1b4b" },
  });
  
  const sensorBody = Matter.Bodies.circle(x, y, radius + 10, {
    isStatic: true,
    isSensor: true,
    label: `destructor-sensor-${id}`,
    render: { fillStyle: "rgba(124, 58, 237, 0.3)" },
  });
  
  const vortexBodies = [body, innerVortex, core];
  
  Matter.Composite.add(world, [...vortexBodies, sensorBody]);
  
  return {
    body,
    sensorBody,
    id,
    vortexBodies,
  };
}

export function destroyMarble(
  marbleBody: Matter.Body,
  destructor: DestructorState,
  world: Matter.World,
  onDestroy?: (marbleLabel: string) => void
): void {
  const dx = destructor.body.position.x - marbleBody.position.x;
  const dy = destructor.body.position.y - marbleBody.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 30) {
    console.log(`Marble destroyed by implosion device ${destructor.id}`);
    
    if (onDestroy) {
      onDestroy(marbleBody.label);
    }
    
    Matter.Composite.remove(world, marbleBody);
  } else {
    const pullStrength = 0.002;
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;
    
    Matter.Body.applyForce(marbleBody, marbleBody.position, {
      x: normalizedDx * pullStrength,
      y: normalizedDy * pullStrength,
    });
  }
}
