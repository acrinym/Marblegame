import type { MarbleColor } from "./stores/useMarbleDrop";

export interface ComponentPort {
  x: number;
  y: number;
  direction: number;
}

export interface ComponentPorts {
  entry: ComponentPort[];
  exit: { [key: string]: ComponentPort };
}

export interface LevelComponent {
  id: string;
  type: string;
  x?: number;
  y?: number;
  anchoredTo?: string;
  anchorPort?: string;
  properties?: Record<string, any>;
  next?: string;
  outputs?: Record<string, string>;
  color?: MarbleColor;
  comment?: string;
}

export interface LevelJSON {
  id: string;
  name: string;
  width: number;
  height: number;
  inventory?: Record<MarbleColor, number>;
  layout: LevelComponent[];
}

export interface PlacedComponent {
  id: string;
  type: string;
  x: number;
  y: number;
  angle: number;
  properties: Record<string, any>;
  ports: ComponentPorts;
}

const TYPE_MAPPING: Record<string, string> = {
  "straightTrack": "track",
  "curvedTrack": "spiralTrack",
  "triggeredDiverter": "triggeredDiverter",
  "sensor": "sensor",
};

const PORT_DEFINITIONS: Record<string, (props: any) => { entryOffset: { x: number; y: number }; exits: Record<string, { x: number; y: number; direction: number }> }> = {
  entryFunnel: () => ({
    entryOffset: { x: 0, y: -40 },
    exits: {
      bottom: { x: 0, y: 50, direction: Math.PI / 2 }
    }
  }),
  
  straightTrack: (props) => {
    const length = props?.length || 200;
    const angle = ((props?.angle || 0) * Math.PI) / 180;
    const halfLen = length / 2;
    const exitX = halfLen * Math.cos(angle);
    const exitY = halfLen * Math.sin(angle);
    return {
      entryOffset: { x: -exitX, y: -exitY },
      exits: {
        bottom: { x: exitX, y: exitY, direction: angle },
        left: { x: -exitX, y: -exitY, direction: angle + Math.PI },
        right: { x: exitX, y: exitY, direction: angle },
        end: { x: exitX, y: exitY, direction: angle }
      }
    };
  },
  
  curvedTrack: () => ({
    entryOffset: { x: 0, y: -60 },
    exits: {
      bottom: { x: 0, y: 80, direction: Math.PI / 2 }
    }
  }),
  
  diverter: () => ({
    entryOffset: { x: 0, y: -20 },
    exits: {
      left: { x: -50, y: 20, direction: (Math.PI * 5) / 6 },
      right: { x: 50, y: 20, direction: Math.PI / 6 },
      bottom: { x: 0, y: 20, direction: Math.PI / 2 }
    }
  }),
  
  triggeredDiverter: () => ({
    entryOffset: { x: 0, y: -20 },
    exits: {
      primary: { x: -50, y: 20, direction: (Math.PI * 5) / 6 },
      secondary: { x: 50, y: 20, direction: Math.PI / 6 },
      left: { x: -50, y: 20, direction: (Math.PI * 5) / 6 },
      right: { x: 50, y: 20, direction: Math.PI / 6 }
    }
  }),
  
  cannon: () => ({
    entryOffset: { x: 0, y: -30 },
    exits: {
      bottom: { x: 0, y: 40, direction: Math.PI / 2 }
    }
  }),
  
  exitBin: () => ({
    entryOffset: { x: 0, y: -25 },
    exits: {}
  }),
  
  sensor: () => ({
    entryOffset: { x: 0, y: 0 },
    exits: {}
  }),
  
  copperCoils: () => ({
    entryOffset: { x: -40, y: 0 },
    exits: {
      bottom: { x: 40, y: 0, direction: 0 }
    }
  }),
  
  spinner: () => ({
    entryOffset: { x: 0, y: -30 },
    exits: {
      bottom: { x: 0, y: 30, direction: Math.PI / 2 }
    }
  }),
  
  track: (props) => {
    const length = props?.length || 150;
    const angle = props?.angle || 0;
    const halfLen = length / 2;
    const exitX = halfLen * Math.cos(angle);
    const exitY = halfLen * Math.sin(angle);
    return {
      entryOffset: { x: -halfLen * Math.cos(angle), y: -halfLen * Math.sin(angle) },
      exits: {
        bottom: { x: exitX, y: exitY, direction: angle },
        right: { x: exitX, y: exitY, direction: angle },
        left: { x: -exitX, y: -exitY, direction: angle + Math.PI },
        end: { x: exitX, y: exitY, direction: angle }
      }
    };
  }
};

function getPortDefinition(type: string, props: any) {
  let defFn = PORT_DEFINITIONS[type];
  if (!defFn) {
    const mappedType = TYPE_MAPPING[type] || type;
    defFn = PORT_DEFINITIONS[mappedType];
  }
  if (defFn) {
    return defFn(props);
  }
  return {
    entryOffset: { x: 0, y: -20 },
    exits: { bottom: { x: 0, y: 20, direction: Math.PI / 2 } }
  };
}

function getMappedType(type: string): string {
  return TYPE_MAPPING[type] || type;
}

function rotatePoint(x: number, y: number, angle: number): { x: number; y: number } {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle)
  };
}

export function calculatePosition(
  component: LevelComponent,
  placedComponents: Map<string, PlacedComponent>
): { x: number; y: number; inheritedAngle: number } {
  if (component.x !== undefined && component.y !== undefined && !component.anchoredTo) {
    return { x: component.x, y: component.y, inheritedAngle: 0 };
  }
  
  if (!component.anchoredTo) {
    console.warn(`Component ${component.id} has no position or anchor`);
    return { x: 600, y: 400, inheritedAngle: 0 };
  }
  
  const parent = placedComponents.get(component.anchoredTo);
  if (!parent) {
    console.warn(`Parent ${component.anchoredTo} not found for ${component.id}`);
    return { x: 600, y: 400, inheritedAngle: 0 };
  }
  
  const anchorPort = component.anchorPort || "bottom";
  const parentExit = parent.ports.exit[anchorPort];
  
  if (!parentExit) {
    console.warn(`Exit port ${anchorPort} not found on parent ${parent.id}, available: ${Object.keys(parent.ports.exit).join(", ")}`);
    return { x: parent.x, y: parent.y + 60, inheritedAngle: 0 };
  }
  
  const childDef = getPortDefinition(component.type, component.properties);
  
  const rotatedEntry = rotatePoint(childDef.entryOffset.x, childDef.entryOffset.y, parentExit.direction - Math.PI / 2);
  
  return {
    x: parentExit.x - rotatedEntry.x,
    y: parentExit.y - rotatedEntry.y,
    inheritedAngle: parentExit.direction
  };
}

export function loadLevel(levelData: LevelJSON): PlacedComponent[] {
  const placedComponents = new Map<string, PlacedComponent>();
  const result: PlacedComponent[] = [];
  
  const components = levelData.layout.filter(c => c.id && c.type);
  
  const absoluteComponents = components.filter(c => c.x !== undefined && c.y !== undefined && !c.anchoredTo);
  const anchoredComponents = components.filter(c => c.anchoredTo);
  
  for (const comp of absoluteComponents) {
    const mappedType = getMappedType(comp.type);
    const portDef = getPortDefinition(comp.type, comp.properties);
    const angle = comp.properties?.angle ? (comp.properties.angle * Math.PI) / 180 : 0;
    
    const placed: PlacedComponent = {
      id: comp.id,
      type: mappedType,
      x: comp.x!,
      y: comp.y!,
      angle,
      properties: { 
        ...comp.properties, 
        color: comp.color,
        length: comp.properties?.length || 150
      },
      ports: {
        entry: [{ x: comp.x! + portDef.entryOffset.x, y: comp.y! + portDef.entryOffset.y, direction: -Math.PI / 2 }],
        exit: {}
      }
    };
    
    for (const [portName, portOffset] of Object.entries(portDef.exits)) {
      placed.ports.exit[portName] = {
        x: comp.x! + portOffset.x,
        y: comp.y! + portOffset.y,
        direction: portOffset.direction
      };
    }
    
    placedComponents.set(comp.id, placed);
    result.push(placed);
  }
  
  let remaining = [...anchoredComponents];
  let iterations = 0;
  const maxIterations = 100;
  
  while (remaining.length > 0 && iterations < maxIterations) {
    iterations++;
    const nextBatch: LevelComponent[] = [];
    const stillRemaining: LevelComponent[] = [];
    
    for (const comp of remaining) {
      if (placedComponents.has(comp.anchoredTo!)) {
        nextBatch.push(comp);
      } else {
        stillRemaining.push(comp);
      }
    }
    
    for (const comp of nextBatch) {
      const pos = calculatePosition(comp, placedComponents);
      const mappedType = getMappedType(comp.type);
      const portDef = getPortDefinition(comp.type, comp.properties);
      
      let angle = comp.properties?.angle ? (comp.properties.angle * Math.PI) / 180 : 0;
      if (mappedType === "track" && comp.properties?.angle) {
        angle = (comp.properties.angle * Math.PI) / 180;
      }
      
      const placed: PlacedComponent = {
        id: comp.id,
        type: mappedType,
        x: pos.x,
        y: pos.y,
        angle,
        properties: { 
          ...comp.properties, 
          color: comp.color,
          length: comp.properties?.length || 150
        },
        ports: {
          entry: [{ x: pos.x + portDef.entryOffset.x, y: pos.y + portDef.entryOffset.y, direction: -Math.PI / 2 }],
          exit: {}
        }
      };
      
      for (const [portName, portOffset] of Object.entries(portDef.exits)) {
        placed.ports.exit[portName] = {
          x: pos.x + portOffset.x,
          y: pos.y + portOffset.y,
          direction: portOffset.direction
        };
      }
      
      placedComponents.set(comp.id, placed);
      result.push(placed);
    }
    
    remaining = stillRemaining;
  }
  
  if (remaining.length > 0) {
    console.warn("Could not place components (circular or missing dependencies):", remaining.map(c => c.id));
  }
  
  console.log(`Loaded ${result.length} components from level ${levelData.name}`);
  return result;
}

export function convertToContraptionConfig(placed: PlacedComponent[]): Array<{
  id: string;
  type: string;
  x: number;
  y: number;
  angle?: number;
  state?: Record<string, any>;
}> {
  return placed.map(p => ({
    id: p.id,
    type: p.type,
    x: p.x,
    y: p.y,
    angle: p.angle,
    state: p.properties
  }));
}
