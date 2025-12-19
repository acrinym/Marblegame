# Pathing System & Connection Logic (The "Spine" of the Machine)

## 1. The Core Misconception
**CURRENT FAILURE:** The AI treats components as isolated islands.
**REQUIRED LOGIC:** The game is a **Continuous Flow System**. A "Path" is not just a visual line; it is a strict **Parent-Child dependency**.

**Rule #1:** A marble must *never* touch "empty air" between components.
**Rule #2:** If Component A connects to Component B, Component B's position is **calculated relative** to Component A's *Exit Port*, not placed arbitrarily.

---

## 2. Anatomy of a Component
Every contraption must expose standard "Ports" in its code interface.

### The `ComponentPort` Interface
```typescript
interface ComponentPort {
  x: number;  // Absolute X position
  y: number;  // Absolute Y position
  direction: number;  // Angle in radians (direction marble exits)
}

interface ComponentPorts {
  entry: ComponentPort[];
  exit: ComponentPort[];
}
```

### Port Naming Convention
- `top`: Entry from above
- `bottom`: Exit downward
- `left`: Exit leftward
- `right`: Exit rightward

---

## 3. The Anchoring Algorithm

When building a level, we don't say "Place Track at 500, 500." We say:
> "Attach a **Track** to the **Bottom-Exit** of **Funnel_1**."

### The Math:

```typescript
function calculatePosition(
  component: ComponentConfig,
  parentComponent: PlacedComponent
): { x: number, y: number } {
  // 1. Get parent's exit port
  const parentExit = parentComponent.ports.exit[anchorPortIndex];
  
  // 2. Get child's entry port offset (relative to its center)
  const childEntryOffset = getEntryOffset(component.type);
  
  // 3. Position child so its entry aligns with parent's exit
  return {
    x: parentExit.x - childEntryOffset.x,
    y: parentExit.y - childEntryOffset.y
  };
}
```

### Example: Funnel -> Track

1. Funnel at (300, 100) has exit port at (300, 130) [bottom center + gap]
2. Track's entry offset is (0, -80) [top of track relative to center]
3. Track position = (300 - 0, 130 - (-80)) = (300, 210)
4. Track is placed at (300, 210), with its top exactly at (300, 130)

---

## 4. Port Definitions by Component Type

### Entry Funnel
```
Entry: (x, y - 40)  // Top, where marble spawns
Exit:  (x, y + 30)  // Bottom, through the gap
```

### Straight Track (length L, angle A)
```
Entry: (x - L/2 * cos(A), y - L/2 * sin(A))  // Start of track
Exit:  (x + L/2 * cos(A), y + L/2 * sin(A))  // End of track
```

### Diverter
```
Entry: (x, y - 20)  // Top center
Exit Left:  (x - 40, y + 10)  // Left end when angled left
Exit Right: (x + 40, y + 10)  // Right end when angled right
```

### Curved Track (radius R, startAngle, endAngle)
```
Entry: (x + R * cos(startAngle), y + R * sin(startAngle))
Exit:  (x + R * cos(endAngle), y + R * sin(endAngle))
```

### Exit Bin
```
Entry: (x, y - 25)  // Top center
Exit: none
```

---

## 5. The Level Loader Process

### Step 1: Parse JSON
Read the level JSON file with all component definitions.

### Step 2: Build Dependency Graph
Components with `anchoredTo` depend on their parent being placed first.

### Step 3: Topological Sort
Process components in order:
1. Components with absolute (x, y) first
2. Then anchored components, following the dependency chain

### Step 4: Calculate Positions
For each anchored component:
1. Look up parent component
2. Get parent's specified exit port
3. Calculate child position using anchoring math
4. Store child's absolute position and ports

### Step 5: Create Physics Bodies
Now that all positions are known, create Matter.js bodies.

---

## 6. Special Cases

### Air Connections (Cannon/Crossbow)
Some components connect through the air (projectile trajectory).
- Do NOT physically snap these
- The cannon's exit is a trajectory, not a port
- The receiving track has an absolute position

### Diverter Dual Outputs
Diverters have two exit ports (left and right).
- The `outputs` field specifies which child connects to which exit
- Both children are anchored to the same parent but different ports

---

## 7. Visual Debugging

For development, draw port markers:
- **Green Dot**: Entry port
- **Red Dot**: Exit port
- **Yellow Line**: Connection between parent exit and child entry

If a red dot is not touching a green dot, **THE PATH IS BROKEN**.

---

## 8. JSON Schema

```json
{
  "id": "component_id",
  "type": "componentType",
  
  // EITHER absolute position:
  "x": 300,
  "y": 100,
  
  // OR anchored position:
  "anchoredTo": "parent_id",
  "anchorPort": "bottom",  // or "left", "right", "top"
  
  // Component-specific properties:
  "properties": {
    "length": 200,
    "angle": 45
  },
  
  // For single-exit components:
  "next": "next_component_id",
  
  // For multi-exit components (diverters):
  "outputs": {
    "left": "left_child_id",
    "right": "right_child_id"
  }
}
```
