import Matter from "matter-js";

export interface CopperCoilState {
  id: string;
  position: { x: number; y: number };
  boostForce: number;
  bodies: Matter.Body[];
  sensorBody: Matter.Body | null;
}

const COPPER_COLOR = "#CD7F32";
const COPPER_GLOW = "#FFB347";

export function createCopperEnergyCoils(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  angle: number = 0,
  boostForce: number = 0.005
): CopperCoilState {
  const bodies: Matter.Body[] = [];
  
  const trackLength = 100;
  const trackWidth = 8;
  
  const mainTrack = Matter.Bodies.rectangle(x, y, trackLength, trackWidth, {
    isStatic: true,
    angle: angle,
    render: {
      fillStyle: COPPER_COLOR,
      strokeStyle: COPPER_GLOW,
      lineWidth: 3,
    },
    label: `copperCoil-track-${id}`,
  });
  bodies.push(mainTrack);

  for (let i = 0; i < 3; i++) {
    const offset = (i - 1) * 30;
    const coilX = x + Math.cos(angle) * offset;
    const coilY = y + Math.sin(angle) * offset;
    
    const coil = Matter.Bodies.circle(coilX, coilY - 8, 4, {
      isStatic: true,
      render: {
        fillStyle: COPPER_GLOW,
        strokeStyle: COPPER_COLOR,
        lineWidth: 2,
      },
      label: `copperCoil-coil-${id}-${i}`,
    });
    bodies.push(coil);
  }

  const sensorBody = Matter.Bodies.rectangle(x, y, trackLength + 20, 40, {
    isStatic: true,
    isSensor: true,
    render: {
      fillStyle: "transparent",
      strokeStyle: COPPER_GLOW,
      lineWidth: 1,
      opacity: 0.3,
    },
    label: `copperCoil-sensor-${id}`,
  });
  Matter.Body.setAngle(sensorBody, angle);

  Matter.Composite.add(world, [...bodies, sensorBody]);

  return {
    id,
    position: { x, y },
    boostForce,
    bodies,
    sensorBody,
  };
}

export function applyBoost(
  marble: Matter.Body,
  coil: CopperCoilState,
  direction: { x: number; y: number }
): void {
  const normalizedDir = {
    x: direction.x / Math.sqrt(direction.x ** 2 + direction.y ** 2),
    y: direction.y / Math.sqrt(direction.x ** 2 + direction.y ** 2),
  };

  Matter.Body.applyForce(marble, marble.position, {
    x: normalizedDir.x * coil.boostForce,
    y: normalizedDir.y * coil.boostForce,
  });

  console.log(`Copper coil ${coil.id} boosted marble`);
}

export function removeCopperEnergyCoils(world: Matter.World, coil: CopperCoilState): void {
  coil.bodies.forEach(body => Matter.Composite.remove(world, body));
  if (coil.sensorBody) {
    Matter.Composite.remove(world, coil.sensorBody);
  }
}
