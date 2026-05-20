import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { useMarbleDrop, type MarbleColor } from "@/lib/stores/useMarbleDrop";
import {
  createDiverter,
  toggleDiverter,
  type DiverterState,
  createCopperEnergyCoils,
  applyBoost,
  type CopperCoilState,
  createWaterJetPropulsor,
  applyWaterJetForce,
  type WaterJetState,
  createTriggeredDiverter,
  triggerDiverter,
  type TriggeredDiverterState,
  createSpinner,
  applySpinnerForce,
  type SpinnerState,
  createPainter,
  paintMarble,
  type PainterState,
  createCornerCatcher,
  applyCornerCatcherRedirect,
  type CornerCatcher,
  createQuarterPipe,
  createHalfPipe,
  createSpiralTrack,
  type CurvedTrack as CurvedTrackState,
  createLift,
  activateLift,
  updateLift,
  type LiftState,
  createBrake,
  applyBrake,
  type BrakeState,
  createTeleporter,
  teleportMarble,
  type TeleporterState,
  createSpring as createSpringContraption,
  applySpringBounce,
  type SpringState,
  createCannon,
  loadCannon,
  fireCannon,
  type CannonState,
  createDestructor,
  destroyMarble,
  type DestructorState,
  createBlocker,
  type BlockerState,
  createHeater,
  applyHeat,
  type HeaterState,
  createFreezer,
  applyFreeze,
  type FreezerState,
} from "./contraptions";

const MARBLE_COLORS: Record<MarbleColor, string> = {
  red: "#EF4444",
  orange: "#F97316",
  yellow: "#EAB308",
  green: "#22C55E",
  blue: "#3B82F6",
  purple: "#A855F7",
  steel: "#9CA3AF",
  black: "#1F2937",
};

export const MARBLE_PROPERTIES: Record<MarbleColor, { density: number; restitution: number; friction: number; radius: number }> = {
  red: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
  orange: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
  yellow: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
  green: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
  blue: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
  purple: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
  steel: { density: 0.003, restitution: 0.4, friction: 0.08, radius: 15 },
  black: { density: 0.001, restitution: 0.6, friction: 0.05, radius: 15 },
};

export interface PhysicsEngineRef {
  dropMarble: (color: MarbleColor, marbleId: string) => void;
  addBody: (body: Matter.Body) => void;
  removeBody: (body: Matter.Body) => void;
}

export interface ContraptionConfig {
  id: string;
  type: string;
  x: number;
  y: number;
  angle?: number;
  state?: Record<string, any>;
}

interface Props {
  onMarbleReachExit?: (marbleId: string, color: MarbleColor, exitColor: MarbleColor) => void;
  onMarbleLost?: (marbleId: string, color: MarbleColor) => void;
  levelContraptions?: ContraptionConfig[];
}

export const PhysicsEngine = ({ onMarbleReachExit, onMarbleLost, levelContraptions }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const marbleBodiesRef = useRef<Map<string, { body: Matter.Body; color: MarbleColor; timestamp: number }>>(new Map());
  const exitBinsRef = useRef<Map<string, { body: Matter.Body; color: MarbleColor }>>(new Map());
  const divertersRef = useRef<Map<string, DiverterState>>(new Map());
  const copperCoilsRef = useRef<Map<string, CopperCoilState>>(new Map());
  const waterJetsRef = useRef<Map<string, WaterJetState>>(new Map());
  const triggeredDivertersRef = useRef<Map<string, TriggeredDiverterState>>(new Map());
  const spinnersRef = useRef<Map<string, SpinnerState>>(new Map());
  const paintersRef = useRef<Map<string, PainterState>>(new Map());
  const cornerCatchersRef = useRef<Map<string, CornerCatcher>>(new Map());
  const curvedTracksRef = useRef<Map<string, CurvedTrackState>>(new Map());
  const liftsRef = useRef<Map<string, LiftState>>(new Map());
  const brakesRef = useRef<Map<string, BrakeState>>(new Map());
  const teleportersRef = useRef<Map<string, TeleporterState>>(new Map());
  const springsRef = useRef<Map<string, SpringState>>(new Map());
  const cannonsRef = useRef<Map<string, CannonState>>(new Map());
  const destructorsRef = useRef<Map<string, DestructorState>>(new Map());
  const blockersRef = useRef<Map<string, BlockerState>>(new Map());
  const heatersRef = useRef<Map<string, HeaterState>>(new Map());
  const freezersRef = useRef<Map<string, FreezerState>>(new Map());
  const marbleColorsRef = useRef<Map<string, MarbleColor>>(new Map());
  const entryFunnelsRef = useRef<Array<{ id: string; x: number; y: number }>>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentFunnelIndex, setCurrentFunnelIndex] = useState(0);
  
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
        background: "#0d1117", // Dark blueprint background
        showAngleIndicator: false,
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    const loadContraptionsFromConfig = (world: Matter.World, contraptions: ContraptionConfig[]) => {
      divertersRef.current.clear();
      copperCoilsRef.current.clear();
      waterJetsRef.current.clear();
      triggeredDivertersRef.current.clear();
      spinnersRef.current.clear();
      paintersRef.current.clear();
      cornerCatchersRef.current.clear();
      curvedTracksRef.current.clear();
      liftsRef.current.clear();
      brakesRef.current.clear();
      teleportersRef.current.clear();
      springsRef.current.clear();
      cannonsRef.current.clear();
      destructorsRef.current.clear();
      blockersRef.current.clear();
      heatersRef.current.clear();
      freezersRef.current.clear();
      entryFunnelsRef.current = [];
      exitBinsRef.current.clear();

      contraptions.forEach((config) => {
        const { id, type, x, y, angle = 0, state = {} } = config;
        
        switch (type) {
          case "diverter":
            const diverter = createDiverter(world, x, y, id, "left");
            divertersRef.current.set(id, diverter);
            break;
          case "copperCoils":
            const coil = createCopperEnergyCoils(world, x, y, id, angle);
            copperCoilsRef.current.set(id, coil);
            break;
          case "waterJet":
            const jet = createWaterJetPropulsor(world, x, y, id, angle, 0.006);
            waterJetsRef.current.set(id, jet);
            break;
          case "spinner":
            const spinner = createSpinner(world, x, y, id, 0.08);
            spinnersRef.current.set(id, spinner);
            break;
          case "triggeredDiverter":
            const trigX = x - 100;
            const trigY = y - 100;
            const triggered = createTriggeredDiverter(world, x, y, trigX, trigY, id, "left");
            triggeredDivertersRef.current.set(id, triggered);
            break;
          case "painter":
            const targetColor = state?.targetColor || "blue";
            const painter = createPainter(world, x, y, id, targetColor as MarbleColor);
            paintersRef.current.set(id, painter);
            break;
          case "cornerCatcher":
            const cornerDir = state?.corner || "bottom-left";
            const catcher = createCornerCatcher(world, x, y, id, cornerDir);
            cornerCatchersRef.current.set(id, catcher);
            break;
          case "quarterPipe":
            const pipeDir = state?.direction || "se";
            const qPipe = createQuarterPipe(world, x, y, id, pipeDir, state?.radius || 80);
            curvedTracksRef.current.set(id, qPipe);
            break;
          case "halfPipe":
            const halfDir = state?.orientation || "bottom";
            const hPipe = createHalfPipe(world, x, y, id, halfDir, state?.radius || 60);
            curvedTracksRef.current.set(id, hPipe);
            break;
          case "spiralTrack":
            const spiral = createSpiralTrack(
              world, x, y, id,
              state?.turns || 2,
              state?.startRadius || 80,
              state?.endRadius || 60,
              state?.verticalDrop || 200,
              state?.clockwise !== false
            );
            curvedTracksRef.current.set(id, spiral);
            break;
          case "lift":
            const lift = createLift(world, x, y, id, state?.height || 200);
            liftsRef.current.set(id, lift);
            break;
          case "brake":
            const brake = createBrake(world, x, y, id, state?.width || 80, angle);
            brakesRef.current.set(id, brake);
            break;
          case "teleporter":
            const exitX = state?.exitX || x + 200;
            const exitY = state?.exitY || y;
            const teleporter = createTeleporter(world, x, y, exitX, exitY, id);
            teleportersRef.current.set(id, teleporter);
            break;
          case "spring":
            const springC = createSpringContraption(world, x, y, id, angle, state?.bounceForce || 0.025);
            springsRef.current.set(id, springC);
            break;
          case "cannon":
            const cannon = createCannon(world, x, y, id, angle, state?.launchForce || 0.04);
            cannonsRef.current.set(id, cannon);
            break;
          case "destructor":
            const destructor = createDestructor(world, x, y, id, state?.radius || 40);
            destructorsRef.current.set(id, destructor);
            break;
          case "blocker":
            const blocker = createBlocker(world, x, y, id, state?.width || 60, state?.height || 20, angle);
            blockersRef.current.set(id, blocker);
            break;
          case "heater":
            const heater = createHeater(world, x, y, id, state?.width || 60, state?.intensity || 1.5);
            heatersRef.current.set(id, heater);
            break;
          case "freezer":
            const freezer = createFreezer(world, x, y, id, state?.width || 60, state?.slowFactor || 0.5);
            freezersRef.current.set(id, freezer);
            break;
          case "track":
            const trackLength = state?.length || 100;
            const trackWidth = 6;
            const railGap = 24; // Gap between rails (marble passes inside)
            
            // Calculate perpendicular offset for rails
            const perpAngle = angle + Math.PI / 2;
            const innerOffset = railGap / 2 - trackWidth / 2;
            const outerOffset = railGap / 2 + trackWidth / 2;
            
            // Create two parallel rails (channel effect)
            const innerRail = Matter.Bodies.rectangle(
              x + Math.cos(perpAngle) * innerOffset,
              y + Math.sin(perpAngle) * innerOffset,
              trackLength,
              trackWidth,
              {
                isStatic: true,
                angle: angle,
                render: { 
                  fillStyle: "#c9a66b", // Wood color
                  strokeStyle: "#8b6914", 
                  lineWidth: 1
                },
                label: `track-inner-${id}`,
              }
            );
            
            const outerRail = Matter.Bodies.rectangle(
              x + Math.cos(perpAngle) * outerOffset,
              y + Math.sin(perpAngle) * outerOffset,
              trackLength,
              trackWidth,
              {
                isStatic: true,
                angle: angle,
                render: { 
                  fillStyle: "#c9a66b",
                  strokeStyle: "#8b6914",
                  lineWidth: 1
                },
                label: `track-outer-${id}`,
              }
            );
            
            Matter.Composite.add(world, [innerRail, outerRail]);
            break;
          case "entryFunnel":
            const funnelBody = createEntryFunnel(x, y, id);
            Matter.Composite.add(world, funnelBody);
            entryFunnelsRef.current.push({ id, x, y });
            break;
          case "exitBin":
            const binColor = state?.color || "red";
            const binBody = createSingleExitBin(x, y, id, binColor as MarbleColor);
            exitBinsRef.current.set(id, { body: binBody, color: binColor as MarbleColor });
            Matter.Composite.add(world, binBody);
            break;
          default:
            console.warn(`Unknown contraption type: ${type}`);
        }
      });
      
      console.log(`Loaded ${contraptions.length} contraptions from config`);
    };

    const initWorld = (world: Matter.World, contraptions?: ContraptionConfig[]) => {
      const w = 1200;
      const h = 800;

      const ground = Matter.Bodies.rectangle(w / 2, h - 10, w, 20, {
        isStatic: true,
        render: { fillStyle: "#2a2a3e" },
        label: "ground",
      });

      const leftWall = Matter.Bodies.rectangle(10, h / 2, 20, h, {
        isStatic: true,
        render: { fillStyle: "#2a2a3e" },
        label: "leftWall",
      });

      const rightWall = Matter.Bodies.rectangle(w - 10, h / 2, 20, h, {
        isStatic: true,
        render: { fillStyle: "#2a2a3e" },
        label: "rightWall",
      });

      Matter.Composite.add(world, [ground, leftWall, rightWall]);

      if (contraptions && contraptions.length > 0) {
        const hasEntryFunnels = contraptions.some(c => c.type === "entryFunnel");
        const hasExitBins = contraptions.some(c => c.type === "exitBin");
        
        if (!hasEntryFunnels) {
          const vortexFunnel = createVortexFunnel(600, 100);
          Matter.Composite.add(world, vortexFunnel);
        }
        
        if (!hasExitBins) {
          const exitBins = createExitBins(w, h);
          Matter.Composite.add(world, exitBins);
        }
        
        loadContraptionsFromConfig(world, contraptions);
      } else {
        const diverter1 = createDiverter(world, 450, 400, "diverter-1", "left");
        divertersRef.current.set("diverter-1", diverter1);

        const diverter2 = createDiverter(world, 750, 400, "diverter-2", "right");
        divertersRef.current.set("diverter-2", diverter2);

        const coil1 = createCopperEnergyCoils(world, 350, 500, "coil-1", Math.PI / 8);
        copperCoilsRef.current.set("coil-1", coil1);

        const coil2 = createCopperEnergyCoils(world, 850, 500, "coil-2", -Math.PI / 8);
        copperCoilsRef.current.set("coil-2", coil2);

        const waterJet1 = createWaterJetPropulsor(world, 250, 550, "jet-1", -Math.PI / 4, 0.006);
        waterJetsRef.current.set("jet-1", waterJet1);

        const waterJet2 = createWaterJetPropulsor(world, 950, 550, "jet-2", -3 * Math.PI / 4, 0.006);
        waterJetsRef.current.set("jet-2", waterJet2);

        const triggeredDiverter1 = createTriggeredDiverter(world, 600, 450, 500, 350, "triggered-1", "left");
        triggeredDivertersRef.current.set("triggered-1", triggeredDiverter1);

        const spinner1 = createSpinner(world, 200, 450, "spinner-1", 0.08);
        spinnersRef.current.set("spinner-1", spinner1);

        const painter1 = createPainter(world, 1000, 400, "painter-1", "blue");
        paintersRef.current.set("painter-1", painter1);

        const corner1 = createCornerCatcher(world, 100, 600, "corner-1", "bottom-left");
        cornerCatchersRef.current.set("corner-1", corner1);

        const corner2 = createCornerCatcher(world, 1100, 600, "corner-2", "bottom-right");
        cornerCatchersRef.current.set("corner-2", corner2);

        const qPipe1 = createQuarterPipe(world, 300, 350, "qpipe-1", "se", 60);
        curvedTracksRef.current.set("qpipe-1", qPipe1);

        const qPipe2 = createQuarterPipe(world, 900, 350, "qpipe-2", "sw", 60);
        curvedTracksRef.current.set("qpipe-2", qPipe2);
        
        // Create connected path from funnel to rest of machine
        // Funnel exit is around (600, 135), connect it to the diverters/main system
        const vortexFunnel = createVortexFunnel(600, 100);
        
        // Add straight track/ramp connecting funnel to the diverters below
        const funnelToDiverter = Matter.Bodies.rectangle(600, 260, 180, 8, {
          isStatic: true,
          angle: Math.PI / 6, // 30 degrees down
          render: { 
            fillStyle: "#d4a574", 
            strokeStyle: "#b8935f", 
            lineWidth: 2 
          },
          label: "funnel-ramp",
        });
        
        const curvedTrack = createCurvedTrack(600, 250);
        const exitBins = createExitBins(w, h);
        Matter.Composite.add(world, [vortexFunnel, funnelToDiverter, ...curvedTrack, ...exitBins]);
        
        createGuideRails(world);
      }
    };

    initWorld(engine.world, levelContraptions);

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

          divertersRef.current.forEach((diverter, diverterId) => {
            if (diverter.body && (bodyA === marbleBody && bodyB === diverter.body || bodyB === marbleBody && bodyA === diverter.body)) {
              const newState = toggleDiverter(diverter);
              divertersRef.current.set(diverterId, newState);
            }
          });

          copperCoilsRef.current.forEach((coil, coilId) => {
            if (coil.sensorBody && (bodyA === marbleBody && bodyB === coil.sensorBody || bodyB === marbleBody && bodyA === coil.sensorBody)) {
              applyBoost(marbleBody, coil, { x: marbleBody.velocity.x, y: marbleBody.velocity.y });
            }
          });

          waterJetsRef.current.forEach((jet, jetId) => {
            if (jet.sensorBody && (bodyA === marbleBody && bodyB === jet.sensorBody || bodyB === marbleBody && bodyA === jet.sensorBody)) {
              applyWaterJetForce(marbleBody, jet);
            }
          });

          triggeredDivertersRef.current.forEach((tDiverter, tDiverterId) => {
            if (tDiverter.triggerBody && !tDiverter.isTriggered && 
                (bodyA === marbleBody && bodyB === tDiverter.triggerBody || bodyB === marbleBody && bodyA === tDiverter.triggerBody)) {
              const newState = triggerDiverter(tDiverter);
              triggeredDivertersRef.current.set(tDiverterId, newState);
            }
          });

          spinnersRef.current.forEach((spinner, spinnerId) => {
            if (spinner.sensorBody && (bodyA === marbleBody && bodyB === spinner.sensorBody || bodyB === marbleBody && bodyA === spinner.sensorBody)) {
              applySpinnerForce(marbleBody, spinner);
            }
          });

          paintersRef.current.forEach((painter, painterId) => {
            if (painter.sensorBody && (bodyA === marbleBody && bodyB === painter.sensorBody || bodyB === marbleBody && bodyA === painter.sensorBody)) {
              paintMarble(marbleBody, painter, (marbleLabel, newColor) => {
                const marbleEntry = marbleBodiesRef.current.get(marbleId);
                if (marbleEntry) {
                  marbleBodiesRef.current.set(marbleId, { ...marbleEntry, color: newColor });
                }
              });
            }
          });

          cornerCatchersRef.current.forEach((catcher, catcherId) => {
            if (catcher.sensorBody && (bodyA === marbleBody && bodyB === catcher.sensorBody || bodyB === marbleBody && bodyA === catcher.sensorBody)) {
              applyCornerCatcherRedirect(marbleBody, catcher);
              console.log(`Marble caught and redirected by corner catcher ${catcherId}`);
            }
          });

          liftsRef.current.forEach((lift, liftId) => {
            if (lift.sensorBody && (bodyA === marbleBody && bodyB === lift.sensorBody || bodyB === marbleBody && bodyA === lift.sensorBody)) {
              const newState = activateLift(lift);
              liftsRef.current.set(liftId, newState);
              console.log(`Marble activated lift ${liftId}`);
            }
          });

          brakesRef.current.forEach((brake, brakeId) => {
            if (brake.sensorBody && (bodyA === marbleBody && bodyB === brake.sensorBody || bodyB === marbleBody && bodyA === brake.sensorBody)) {
              applyBrake(marbleBody, brake);
              console.log(`Marble slowed by brake ${brakeId}`);
            }
          });

          teleportersRef.current.forEach((teleporter, teleporterId) => {
            if (teleporter.entrySensor && (bodyA === marbleBody && bodyB === teleporter.entrySensor || bodyB === marbleBody && bodyA === teleporter.entrySensor)) {
              const newState = teleportMarble(marbleBody, teleporter);
              teleportersRef.current.set(teleporterId, newState);
            }
          });

          springsRef.current.forEach((spring, springId) => {
            if (spring.sensorBody && (bodyA === marbleBody && bodyB === spring.sensorBody || bodyB === marbleBody && bodyA === spring.sensorBody)) {
              applySpringBounce(marbleBody, spring);
            }
          });

          cannonsRef.current.forEach((cannon, cannonId) => {
            if (cannon.sensorBody && (bodyA === marbleBody && bodyB === cannon.sensorBody || bodyB === marbleBody && bodyA === cannon.sensorBody)) {
              let newState = loadCannon(cannon);
              newState = fireCannon(marbleBody, newState);
              cannonsRef.current.set(cannonId, newState);
            }
          });

          destructorsRef.current.forEach((destructor, destructorId) => {
            if (destructor.sensorBody && (bodyA === marbleBody && bodyB === destructor.sensorBody || bodyB === marbleBody && bodyA === destructor.sensorBody)) {
              if (engineRef.current) {
                destroyMarble(marbleBody, destructor, engineRef.current.world, (label) => {
                  marbleBodiesRef.current.delete(marbleId);
                  removeMarble(marbleId);
                  setCanDropMarble(true);
                  if (onMarbleLost) {
                    onMarbleLost(marbleId, marbleColor);
                  }
                });
              }
            }
          });

          heatersRef.current.forEach((heater, heaterId) => {
            if (heater.sensorBody && (bodyA === marbleBody && bodyB === heater.sensorBody || bodyB === marbleBody && bodyA === heater.sensorBody)) {
              applyHeat(marbleBody, heater);
            }
          });

          freezersRef.current.forEach((freezer, freezerId) => {
            if (freezer.sensorBody && (bodyA === marbleBody && bodyB === freezer.sensorBody || bodyB === marbleBody && bodyA === freezer.sensorBody)) {
              applyFreeze(marbleBody, freezer);
            }
          });
        });
      });
    };

    Matter.Events.on(engine, "collisionStart", collisionHandler);

    const updateHandler = () => {
      liftsRef.current.forEach((lift, liftId) => {
        if (lift.hasMarble) {
          const updatedLift = updateLift(lift);
          liftsRef.current.set(liftId, updatedLift);
          
          marbleBodiesRef.current.forEach(({ body: marbleBody }) => {
            const dx = Math.abs(marbleBody.position.x - lift.platformBody.position.x);
            const dy = marbleBody.position.y - lift.platformBody.position.y;
            if (dx < 30 && dy > -5 && dy < 25) {
              Matter.Body.setPosition(marbleBody, {
                x: marbleBody.position.x,
                y: lift.platformBody.position.y - 20,
              });
              Matter.Body.setVelocity(marbleBody, { x: 0, y: 0 });
            }
          });
        }
      });
    };

    Matter.Events.on(engine, "beforeUpdate", updateHandler);

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
      Matter.Events.off(engine, "beforeUpdate", updateHandler);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
    };
  }, [onMarbleReachExit, onMarbleLost, removeMarble, setCanDropMarble, levelContraptions]);

  const createGuideRails = (world: Matter.World) => {
    const rail1 = Matter.Bodies.rectangle(350, 450, 100, 8, {
      isStatic: true,
      angle: Math.PI / 6,
      render: { fillStyle: "#d4a574", strokeStyle: "#b8935f", lineWidth: 2 },
      label: "guideRail",
    });

    const rail2 = Matter.Bodies.rectangle(850, 450, 100, 8, {
      isStatic: true,
      angle: -Math.PI / 6,
      render: { fillStyle: "#d4a574", strokeStyle: "#b8935f", lineWidth: 2 },
      label: "guideRail",
    });

    const rail3 = Matter.Bodies.rectangle(450, 550, 80, 8, {
      isStatic: true,
      angle: Math.PI / 10,
      render: { fillStyle: "#d4a574", strokeStyle: "#b8935f", lineWidth: 2 },
      label: "guideRail",
    });

    const rail4 = Matter.Bodies.rectangle(750, 550, 80, 8, {
      isStatic: true,
      angle: -Math.PI / 10,
      render: { fillStyle: "#d4a574", strokeStyle: "#b8935f", lineWidth: 2 },
      label: "guideRail",
    });

    const centerRail = Matter.Bodies.rectangle(600, 520, 120, 8, {
      isStatic: true,
      render: { fillStyle: "#d4a574", strokeStyle: "#b8935f", lineWidth: 2 },
      label: "guideRail",
    });

    Matter.Composite.add(world, [rail1, rail2, rail3, rail4, centerRail]);
  };

  const createVortexFunnel = (x: number, y: number) => {
    // Real V-shaped funnel with gap at bottom - likeEntryFunnel
    const wallLength = 60;
    const wallThickness = 6;
    const funnelAngle = Math.PI / 6;
    const bottomGap = 35; // Gap for marble to pass through
    
    const leftWall = Matter.Bodies.rectangle(
      x - bottomGap / 2 - (wallLength / 2) * Math.sin(funnelAngle),
      y - (wallLength / 2) * Math.cos(funnelAngle),
      wallThickness, 
      wallLength, 
      {
        isStatic: true,
        angle: -funnelAngle,
        render: {
          fillStyle: "#c9a66b",
          strokeStyle: "#a68b5b",
          lineWidth: 2,
        },
        label: "vortexFunnel-left",
      }
    );
    
    const rightWall = Matter.Bodies.rectangle(
      x + bottomGap / 2 + (wallLength / 2) * Math.sin(funnelAngle),
      y - (wallLength / 2) * Math.cos(funnelAngle),
      wallThickness, 
      wallLength, 
      {
        isStatic: true,
        angle: funnelAngle,
        render: {
          fillStyle: "#c9a66b",
          strokeStyle: "#a68b5b",
          lineWidth: 2,
        },
        label: "vortexFunnel-right",
      }
    );
    
    // Funnel exit position (for connecting to tracks)
    const exitY = y + bottomGap / 2;
    
    return Matter.Body.create({
      parts: [leftWall, rightWall],
      isStatic: true,
      label: "vortexFunnel",
    });
  };

  const createEntryFunnel = (x: number, y: number, id: string) => {
    const wallLength = 60;
    const wallThickness = 6;
    const funnelAngle = Math.PI / 6;
    const bottomGap = 50;
    
    const leftWall = Matter.Bodies.rectangle(
      x - bottomGap / 2 - (wallLength / 2) * Math.sin(funnelAngle),
      y - (wallLength / 2) * Math.cos(funnelAngle),
      wallThickness, 
      wallLength, 
      {
        isStatic: true,
        angle: -funnelAngle,
        render: {
          fillStyle: "#c9a66b",
          strokeStyle: "#a68b5b",
          lineWidth: 2,
        },
        label: `entryFunnel-${id}-left`,
      }
    );
    
    const rightWall = Matter.Bodies.rectangle(
      x + bottomGap / 2 + (wallLength / 2) * Math.sin(funnelAngle),
      y - (wallLength / 2) * Math.cos(funnelAngle),
      wallThickness, 
      wallLength, 
      {
        isStatic: true,
        angle: funnelAngle,
        render: {
          fillStyle: "#c9a66b",
          strokeStyle: "#a68b5b",
          lineWidth: 2,
        },
        label: `entryFunnel-${id}-right`,
      }
    );
    
    Matter.Composite.add(engineRef.current!.world, [leftWall, rightWall]);
    
    return Matter.Body.create({
      parts: [],
      isStatic: true,
    });
  };

  const createSingleExitBin = (x: number, y: number, id: string, color: MarbleColor) => {
    const binWidth = 70;
    const binHeight = 50;
    
    const bin = Matter.Bodies.rectangle(x, y, binWidth, binHeight, {
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: MARBLE_COLORS[color],
        opacity: 0.6,
        strokeStyle: MARBLE_COLORS[color],
        lineWidth: 3,
      },
      label: `exitBin-${color}`,
    });
    
    return bin;
  };

  const createCurvedTrack = (startX: number, startY: number) => {
    const segments: Matter.Body[] = [];
    const numSegments = 20; // More segments for smoother curve
    const radius = 200;
    const angleStart = -Math.PI / 4;
    const angleEnd = Math.PI / 4;
    const railGap = 24; // Gap between inner and outer rail
    const railWidth = 6;

    // Create two parallel curves (rails)
    for (let rail = 0; rail < 2; rail++) {
      const offset = rail === 0 ? -railGap / 2 : railGap / 2;
      
      for (let i = 0; i < numSegments; i++) {
        const angle = angleStart + (angleEnd - angleStart) * (i / numSegments);
        const nextAngle = angleStart + (angleEnd - angleStart) * ((i + 1) / numSegments);
        
        // Offset the radius for inner/outer rail
        const r1 = radius + offset;
        const r2 = radius + offset;
        
        const x1 = startX + Math.cos(angle) * r1;
        const y1 = startY + Math.sin(angle) * r1;
        const x2 = startX + Math.cos(nextAngle) * r2;
        const y2 = startY + Math.sin(nextAngle) * r2;
        
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const segmentAngle = Math.atan2(y2 - y1, x2 - x1);
        
        const segment = Matter.Bodies.rectangle(centerX, centerY, length, railWidth, {
          isStatic: true,
          angle: segmentAngle,
          render: {
            fillStyle: "#c9a66b", // Wood rail color
            strokeStyle: "#8b6914",
            lineWidth: 1,
          },
          label: `curvedTrack-${rail}-${i}`,
        });
        
        segments.push(segment);
      }
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

  const dropMarbleInternal = (color: MarbleColor, marbleId: string, funnelIndex: number = 0) => {
    if (!engineRef.current) {
      console.error("Engine not initialized");
      return;
    }

    let dropX = 600;
    let dropY = 160;
    
    if (entryFunnelsRef.current.length > 0) {
      const funnel = entryFunnelsRef.current[funnelIndex % entryFunnelsRef.current.length];
      dropX = funnel.x;
      dropY = funnel.y - 40;
    }

    const props = MARBLE_PROPERTIES[color];
    const marble = Matter.Bodies.circle(dropX, dropY, props.radius, {
      restitution: props.restitution,
      friction: props.friction,
      density: props.density,
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
    
    console.log(`Dropped ${color} marble at funnel ${funnelIndex} position (${dropX}, ${dropY})`);
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
