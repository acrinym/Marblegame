import Matter from "matter-js";

export interface CannonState {
  barrelBody: Matter.Body;
  sensorBody: Matter.Body;
  id: string;
  launchForce: number;
  angle: number;
  isLoaded: boolean;
}

export function createCannon(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  angle: number = -Math.PI / 4,
  launchForce: number = 0.04
): CannonState {
  const barrelLength = 60;
  const barrelWidth = 30;
  
  const barrelBody = Matter.Bodies.rectangle(x, y, barrelLength, barrelWidth, {
    isStatic: true,
    label: `cannon-barrel-${id}`,
    render: { fillStyle: "#374151" },
    angle,
  });
  
  const baseBody = Matter.Bodies.circle(
    x - Math.cos(angle) * barrelLength / 2,
    y - Math.sin(angle) * barrelLength / 2,
    25,
    {
      isStatic: true,
      label: `cannon-base-${id}`,
      render: { fillStyle: "#1f2937" },
    }
  );
  
  const sensorBody = Matter.Bodies.circle(x, y, 20, {
    isStatic: true,
    isSensor: true,
    label: `cannon-sensor-${id}`,
    render: { fillStyle: "rgba(55, 65, 81, 0.4)" },
  });
  
  Matter.Composite.add(world, [barrelBody, baseBody, sensorBody]);
  
  return {
    barrelBody,
    sensorBody,
    id,
    launchForce,
    angle,
    isLoaded: false,
  };
}

export function loadCannon(cannon: CannonState): CannonState {
  return { ...cannon, isLoaded: true };
}

export function fireCannon(marbleBody: Matter.Body, cannon: CannonState): CannonState {
  if (!cannon.isLoaded) return cannon;
  
  const launchX = cannon.barrelBody.position.x + Math.cos(cannon.angle) * 40;
  const launchY = cannon.barrelBody.position.y + Math.sin(cannon.angle) * 40;
  
  Matter.Body.setPosition(marbleBody, { x: launchX, y: launchY });
  
  Matter.Body.setVelocity(marbleBody, { x: 0, y: 0 });
  
  Matter.Body.applyForce(marbleBody, marbleBody.position, {
    x: Math.cos(cannon.angle) * cannon.launchForce,
    y: Math.sin(cannon.angle) * cannon.launchForce,
  });
  
  console.log(`Cannon fired! Angle: ${cannon.angle}, Force: ${cannon.launchForce}`);
  
  return { ...cannon, isLoaded: false };
}
