import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { useMarbleDrop, type MarbleColor } from "@/lib/stores/useMarbleDrop";

const MARBLE_COLORS: Record<MarbleColor, string> = {
  red: "#EF4444",
  orange: "#F97316",
  yellow: "#EAB308",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#A855F7",
};

export interface PhysicsEngineRef {
  dropMarble: (color: MarbleColor, marbleId: string) => void;
  addBody: (body: Matter.Body) => void;
  removeBody: (body: Matter.Body) => void;
}

interface Props {
  onMarbleReachExit?: (marbleId: string, color: MarbleColor, exitColor: MarbleColor) => void;
  onMarbleLost?: (marbleId: string, color: MarbleColor) => void;
}

export const PhysicsEngine = ({ onMarbleReachExit, onMarbleLost }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const marbleBodiesRef = useRef<Map<string, { body: Matter.Body; color: MarbleColor; timestamp: number }>>(new Map());
  const exitBinsRef = useRef<Map<string, { body: Matter.Body; color: MarbleColor }>>(new Map());
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { setCanDropMarble, removeMarble } = useMarbleDrop();

  const clearAllMarbles = useCallback(() => {
    if (!engineRef.current) return;
    
    marbleBodiesRef.current.forEach(({ body }, marbleId) => {
      Matter.Composite.remove(engineRef.current!.world, body);
      removeMarble(marbleId);
    });
    marbleBodiesRef.current.clear();
    setCanDropMarble(true);
    console.log("Cleared all marbles from physics world");
  }, [removeMarble, setCanDropMarble]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = 1200;
    const height = 800;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1 },
    });
    engineRef.current = engine;

    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "#1a1a2e",
      },
    });
    renderRef.current = render;

    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    createWorld(engine.world);

    setIsInitialized(true);

    const collisionHandler = (event: Matter.IEventCollision<Matter.Engine>) => {
      event.pairs.forEach((pair: Matter.Pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;

        marbleBodiesRef.current.forEach(({ body: marbleBody, color: marbleColor }, marbleId) => {
          exitBinsRef.current.forEach(({ body: exitBody, color: exitColor }, exitId) => {
            if (
              (bodyA === marbleBody && bodyB === exitBody) ||
              (bodyB === marbleBody && bodyA === exitBody)
            ) {
              console.log(`Marble ${marbleId} (${marbleColor}) hit exit bin (${exitColor})`);
              
              setTimeout(() => {
                if (engineRef.current) {
                  Matter.Composite.remove(engineRef.current.world, marbleBody);
                  marbleBodiesRef.current.delete(marbleId);
                  removeMarble(marbleId);
                  setCanDropMarble(true);
                  
                  if (onMarbleReachExit) {
                    onMarbleReachExit(marbleId, marbleColor, exitColor);
                  }
                }
              }, 100);
            }
          });
        });
      });
    };

    Matter.Events.on(engine, "collisionStart", collisionHandler);

    const checkMarblesBounds = () => {
      const now = Date.now();
      marbleBodiesRef.current.forEach(({ body, color, timestamp }, marbleId) => {
        const velocity = Math.abs(body.velocity.x) + Math.abs(body.velocity.y);
        const age = now - timestamp;
        
        if (body.position.y > height + 100) {
          console.log(`Marble ${marbleId} fell off the screen`);
          Matter.Composite.remove(engine.world, body);
          marbleBodiesRef.current.delete(marbleId);
          removeMarble(marbleId);
          setCanDropMarble(true);
          
          if (onMarbleLost) {
            onMarbleLost(marbleId, color);
          }
        } else if (body.position.y > height - 150 && velocity < 0.5 && age > 2000) {
          console.log(`Marble ${marbleId} at rest on ground - considering it lost`);
          Matter.Composite.remove(engine.world, body);
          marbleBodiesRef.current.delete(marbleId);
          removeMarble(marbleId);
          setCanDropMarble(true);
          
          if (onMarbleLost) {
            onMarbleLost(marbleId, color);
          }
        }
      });
    };

    const boundsCheckInterval = setInterval(checkMarblesBounds, 500);

    return () => {
      clearInterval(boundsCheckInterval);
      Matter.Events.off(engine, "collisionStart", collisionHandler);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [onMarbleReachExit, onMarbleLost, removeMarble, setCanDropMarble]);

  const createWorld = (world: Matter.World) => {
    const width = 1200;
    const height = 800;

    const ground = Matter.Bodies.rectangle(width / 2, height - 10, width, 20, {
      isStatic: true,
      render: { fillStyle: "#2a2a3e" },
      label: "ground",
    });

    const leftWall = Matter.Bodies.rectangle(10, height / 2, 20, height, {
      isStatic: true,
      render: { fillStyle: "#2a2a3e" },
      label: "leftWall",
    });

    const rightWall = Matter.Bodies.rectangle(width - 10, height / 2, 20, height, {
      isStatic: true,
      render: { fillStyle: "#2a2a3e" },
      label: "rightWall",
    });

    const vortexFunnel = createVortexFunnel(600, 100);
    
    const curvedTrack = createCurvedTrack(600, 250);
    
    const exitBins = createExitBins(width, height);

    Matter.Composite.add(world, [ground, leftWall, rightWall, vortexFunnel, ...curvedTrack, ...exitBins]);
  };

  const createVortexFunnel = (x: number, y: number) => {
    const funnel = Matter.Bodies.trapezoid(x, y, 80, 60, 0.5, {
      isStatic: true,
      render: {
        fillStyle: "#4a9eff",
        strokeStyle: "#6bbfff",
        lineWidth: 2,
      },
      label: "vortexFunnel",
    });

    return funnel;
  };

  const createCurvedTrack = (startX: number, startY: number) => {
    const segments: Matter.Body[] = [];
    const numSegments = 10;
    const radius = 200;
    const angleStart = -Math.PI / 4;
    const angleEnd = Math.PI / 4;

    for (let i = 0; i < numSegments; i++) {
      const angle = angleStart + (angleEnd - angleStart) * (i / numSegments);
      const nextAngle = angleStart + (angleEnd - angleStart) * ((i + 1) / numSegments);
      
      const x1 = startX + Math.cos(angle) * radius;
      const y1 = startY + Math.sin(angle) * radius;
      const x2 = startX + Math.cos(nextAngle) * radius;
      const y2 = startY + Math.sin(nextAngle) * radius;
      
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;
      const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      const segmentAngle = Math.atan2(y2 - y1, x2 - x1);
      
      const segment = Matter.Bodies.rectangle(centerX, centerY, length, 8, {
        isStatic: true,
        angle: segmentAngle,
        render: {
          fillStyle: "#d4a574",
          strokeStyle: "#b8935f",
          lineWidth: 2,
        },
        label: "curvedTrack",
      });
      
      segments.push(segment);
    }

    return segments;
  };

  const createExitBins = (worldWidth: number, worldHeight: number) => {
    const bins: Matter.Body[] = [];
    const colors: MarbleColor[] = ["red", "orange", "yellow", "green", "blue", "purple"];
    const binWidth = 80;
    const binHeight = 60;
    const spacing = 120;
    const startX = (worldWidth - (colors.length - 1) * spacing) / 2;
    const y = worldHeight - 100;

    colors.forEach((color, index) => {
      const x = startX + index * spacing;
      
      const bin = Matter.Bodies.rectangle(x, y, binWidth, binHeight, {
        isStatic: true,
        isSensor: true,
        render: {
          fillStyle: MARBLE_COLORS[color],
          opacity: 0.5,
          strokeStyle: MARBLE_COLORS[color],
          lineWidth: 3,
        },
        label: `exitBin-${color}`,
      });
      
      bins.push(bin);
      exitBinsRef.current.set(`exit-${color}`, { body: bin, color });
    });

    return bins;
  };

  const dropMarbleInternal = (color: MarbleColor, marbleId: string) => {
    if (!engineRef.current) {
      console.error("Engine not initialized");
      return;
    }

    const marble = Matter.Bodies.circle(600, 160, 15, {
      restitution: 0.6,
      friction: 0.05,
      density: 0.001,
      render: {
        fillStyle: MARBLE_COLORS[color],
        strokeStyle: "#ffffff",
        lineWidth: 2,
      },
      label: `marble-${color}`,
    });

    Matter.Body.setVelocity(marble, { x: 0, y: 1 });

    Matter.Composite.add(engineRef.current.world, marble);
    marbleBodiesRef.current.set(marbleId, { body: marble, color, timestamp: Date.now() });
    
    console.log(`Dropped ${color} marble into physics world at position (600, 160)`);
  };

  useEffect(() => {
    if (isInitialized) {
      (window as any).physicsEngine = {
        dropMarble: dropMarbleInternal,
        clearAllMarbles: clearAllMarbles,
      };
    }
  }, [isInitialized, clearAllMarbles]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        className="border-4 border-gray-700 rounded-lg shadow-2xl"
      />
    </div>
  );
};
