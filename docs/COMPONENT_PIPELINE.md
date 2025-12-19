# Marble Drop (Schauberger Edition) - Component Pipeline & Physics Logic

## 1. Core Physics Principles
* **Engine:** Matter.js (2D Physics).
* **Rendering:** Matter.Render with custom canvas overlay for UI.
* **Marble Physics:**
    * Marbles are high-density, low-friction circles.
    * **Movement:** Gravity-driven (y-axis positive).
    * **Interaction:** Marbles trigger logic via **Sensors** (invisible non-colliding bodies) or **Collisions** (physical bounces).

---

## 2. Component Reference

### A. Curved Track (TrackSegment)
* **Thematic Visual:** Smooth, bent wood or copper rails.
* **Physics Implementation:**
    * **Old Way (Avoid):** Chain of static circles (creates bumpy "bead" effect).
    * **Current Standard:** A chain of **Tangential Rectangles**.
    * **Construction:** Calculate the tangent angle at every *N* degrees along an arc. Place a rectangle rotated to that angle. This creates a smooth polygon surface that marbles roll over silently.
    * **Walls:** Tracks have two "rails" (inner and outer) created as separate bodies to form a channel.
* **Parameters:** `radius`, `startAngle`, `endAngle`, `trackWidth`.
* **Ports:**
    * Entry: Top of arc (calculated from startAngle)
    * Exit: Bottom of arc (calculated from endAngle)

### B. Entry Funnel (Start Point)
* **Thematic Visual:** A V-shaped guide that directs marbles into the machine.
* **Physics Implementation:**
    * **Geometry:** Two angled rectangles forming a V with a gap at the bottom.
    * **Gap Size:** Must be larger than marble diameter (30px minimum for 15px radius marbles).
* **Ports:**
    * Entry: Top center (where marbles spawn)
    * Exit: Bottom center (gap between V walls)

### C. Diverter (Switch)
* **Thematic Visual:** A weighted wooden latch that flips direction.
* **Physics Implementation:**
    * **Body:** A single static rectangle pivoted at the center.
    * **Movement:** Uses hard-coded angle setting (not physics motor).
* **Logic:**
    * **Trigger:** Click event or collision with a specific sensor.
    * **Behavior:** Toggles angle between `-30deg` (Left Path) and `+30deg` (Right Path).
    * **Debounce:** 200ms cooldown to prevent rapid flickering.
* **Ports:**
    * Entry: Top center
    * Exit Left: Left end of angled body
    * Exit Right: Right end of angled body

### D. Copper Energy Coil (Accelerator)
* **Thematic Visual:** Spiraled copper tubing that glows when active.
* **Physics Implementation:**
    * **Sensor:** A large invisible rectangle covering the track area (`isSensor: true`).
* **Logic:**
    * **Event:** `collisionStart` with the Sensor.
    * **Action:** Apply a **Vector Force** aligned with the track's angle.
* **Ports:**
    * Entry: Start of coil segment
    * Exit: End of coil segment (same direction)

### E. Lift (Elevator)
* **Thematic Visual:** A water-counterweighted platform.
* **Physics Implementation:**
    * **Platform:** A Kinematic body that collides with marbles.
    * **Sensor:** Detects when marble boards.
    * **Rails:** Static vertical walls to contain marble.
* **Logic:**
    * **State Machine:** `Waiting` -> `Ascending` -> `Dumping` -> `Descending`.
* **Ports:**
    * Entry: Bottom platform position
    * Exit: Top dump position

### F. Water Jet Propulsor
* **Thematic Visual:** A stream of pressurized water.
* **Physics Implementation:**
    * **Sensor:** A long, thin rectangle representing the water stream.
* **Logic:**
    * **Event:** `collisionActive` (fires every frame marble is inside).
    * **Action:** Apply constant low-magnitude force in stream direction.
* **Ports:**
    * Entry: Start of jet
    * Exit: End of jet trajectory

### G. Spinner (Randomizer)
* **Thematic Visual:** A water wheel or turbine blade.
* **Physics Implementation:**
    * **Body:** A cross or star shape.
    * **Constraint:** Pinned to background using revolute joint.
* **Logic:**
    * **Passive:** Rotates freely when hit.
    * **Active:** Can be motorized to fling marbles.
* **Ports:**
    * Entry: Any point around perimeter
    * Exit: Tangential to rotation direction

### H. Cannon (Crossbow)
* **Thematic Visual:** A mechanical launcher.
* **Physics Implementation:**
    * **Body:** Static housing.
    * **Logic:** Applies impulse force to marble when triggered.
* **Ports:**
    * Entry: Loading position
    * Exit: Trajectory endpoint (air connection)

### I. Triggered Diverter
* **Thematic Visual:** A gate connected via hydraulic line to pressure plate.
* **Physics Implementation:**
    * **Gate:** Same as Standard Diverter.
    * **Trigger:** Separate Sensor body elsewhere on map.
* **Logic:**
    * **Connection:** Gate stores Trigger ID.
    * **Event:** Marble hits Trigger -> Gate toggles.
* **Ports:**
    * Same as Diverter

### J. Exit Bin
* **Thematic Visual:** Colored collection basin.
* **Physics Implementation:**
    * **Body:** Static sensor rectangle.
* **Logic:**
    * **Event:** `collisionStart` - check marble color match.
* **Ports:**
    * Entry: Top center

---

## 3. Data Structures

### Level Data (JSON)
Each level is defined by a JSON file with anchored components.
```json
{
  "id": "level_1",
  "layout": [
    {
      "id": "funnel_1",
      "type": "entryFunnel",
      "x": 300,
      "y": 100,
      "next": "track_1"
    },
    {
      "id": "track_1",
      "type": "straightTrack",
      "anchoredTo": "funnel_1",
      "anchorPort": "bottom",
      "properties": { "length": 200, "angle": 30 }
    }
  ]
}
```

### Contraption Interface (TypeScript)
```typescript
interface Contraption {
  bodies: Matter.Body[];
  sensors: Matter.Body[];
  ports: {
    entry: { x: number, y: number }[];
    exit: { x: number, y: number }[];
  };
  update?: (time: number) => void;
  onInteract?: (marble: Matter.Body) => void;
}
```
