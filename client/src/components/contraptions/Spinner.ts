import Matter from "matter-js";

export interface SpinnerState {
  id: string;
  position: { x: number; y: number };
  angularVelocity: number;
  body: Matter.Body | null;
  sensorBody: Matter.Body | null;
}

const SPINNER_COLOR = "#8B4513";
const SPINNER_CENTER_COLOR = "#CD853F";

export function createSpinner(
  world: Matter.World,
  x: number,
  y: number,
  id: string,
  angularVelocity: number = 0.1
): SpinnerState {
  const armLength = 60;
  const armWidth = 8;

  const body = Matter.Bodies.rectangle(x, y, armLength * 2, armWidth, {
    isStatic: false,
    render: {
      fillStyle: SPINNER_COLOR,
      strokeStyle: SPINNER_CENTER_COLOR,
      lineWidth: 2,
    },
    label: `spinner-arm-${id}`,
  });

  const constraint = Matter.Constraint.create({
    pointA: { x, y },
    bodyB: body,
    pointB: { x: 0, y: 0 },
    stiffness: 1,
    length: 0,
  });

  Matter.Body.setAngularVelocity(body, angularVelocity);

  const sensorBody = Matter.Bodies.circle(x, y, armLength + 15, {
    isStatic: true,
    isSensor: true,
    render: {
      fillStyle: "transparent",
      strokeStyle: SPINNER_CENTER_COLOR,
      lineWidth: 1,
      opacity: 0.3,
    },
    label: `spinner-sensor-${id}`,
  });

  Matter.Composite.add(world, [body, constraint, sensorBody]);

  return {
    id,
    position: { x, y },
    angularVelocity,
    body,
    sensorBody,
  };
}

export function applySpinnerForce(
  marble: Matter.Body,
  spinner: SpinnerState
): void {
  if (!spinner.body) return;

  const dx = marble.position.x - spinner.position.x;
  const dy = marble.position.y - spinner.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance > 0) {
    const tangentX = -dy / distance;
    const tangentY = dx / distance;
    const force = 0.002 * spinner.angularVelocity;

    Matter.Body.applyForce(marble, marble.position, {
      x: tangentX * force * 50,
      y: tangentY * force * 50,
    });

    console.log(`Spinner ${spinner.id} flung marble`);
  }
}

export function removeSpinner(world: Matter.World, spinner: SpinnerState): void {
  if (spinner.body) {
    Matter.Composite.remove(world, spinner.body);
  }
  if (spinner.sensorBody) {
    Matter.Composite.remove(world, spinner.sensorBody);
  }
}
