# Engine 2: Mechanical Deconstruction

**Priority**: CORE (runs parallel with Oracle)  
**Execution**: Detailed component-level analysis  
**Role**: Break systems into working parts and relationships  
**Output**: Component map, dependencies, SPOFs, resilience assessment

---

## Purpose

Understand how things actually work at the mechanical level. Not "what is it" but "how is it built" and "what would break it."

This reveals hidden constraints, hidden opportunities, and single points of failure that emotional or abstract thinking misses.

---

## Core Questions

1. **What are the parts?** (Components)
2. **How do they connect?** (Dependencies)
3. **What must work for the whole to work?** (Critical path)
4. **What's the single point of failure?** (SPOF)
5. **What's the bottleneck?** (Constraint)
6. **How resilient is this?** (Robustness)
7. **How could this fail?** (Failure modes)
8. **How could this be improved?** (Optimization points)

---

## The Analysis Framework

### Step 1: Identify Components

```
SYSTEM: [Name what you're analyzing]

COMPONENTS:
1. [Component A]
   - Description: [What is it?]
   - Function: [What does it do?]
   - State: [Working/Broken/Stressed?]
   - Properties: [Size, cost, complexity, rarity]

2. [Component B]
   - Description: [What is it?]
   - Function: [What does it do?]
   - State: [Working/Broken/Stressed?]
   - Properties: [Size, cost, complexity, rarity]

[Continue for all major components]
```

---

### Step 2: Map Dependencies

```
DEPENDENCIES:

A → B: A must work for B to function
  - Type: Hard dependency (won't work without A)
  - Impact: Critical
  - Frequency: Always

A ⇄ B: A and B depend on each other
  - Type: Circular dependency
  - Impact: Can amplify problems
  - Risk: Deadlock possible

A ⟿ B: A enables B but B can work without A
  - Type: Soft dependency
  - Impact: Medium (B degraded without A)
  - Frequency: Sometimes

[Map all significant relationships]
```

---

### Step 3: Identify Critical Path

```
CRITICAL PATH: The sequence that MUST happen for success

Step 1: [Component A must do X]
  ↓
Step 2: [Component B must do Y]
  ↓
Step 3: [Component C must do Z]

If ANY step fails: Entire path breaks
```

---

### Step 4: Find Single Points of Failure (SPOF)

```
SPOF: A single component whose failure breaks the whole system

SPOF 1: [Component X]
- What it does: [Critical function]
- If it fails: [Entire system breaks]
- Probability of failure: [Low/Medium/High]
- Impact: [Critical/High/Medium]
- Mitigation: [Make redundant? Add backup? Strengthen?]
- Repair time: [How long to fix if broken?]

[List all SPOFs, ranked by impact × probability]
```

---

### Step 5: Identify Bottlenecks

```
BOTTLENECK: A resource or component that limits overall throughput

BOTTLENECK 1: [Resource X is limited]
- Current capacity: [Amount]
- Current demand: [Amount]
- Utilization: [Percentage]
- Can it be expanded? [Yes/No, why?]
- Alternative approaches? [List options]

[Identify all bottlenecks]
```

---

### Step 6: Map Information/Energy Flow

```
INPUT: [What goes in?]
  ↓
PROCESSING: [What happens to it?]
  ↓
OUTPUT: [What comes out?]

Flow rate: [Speed, quantity, consistency]
Quality gates: [Where is quality checked?]
Feedback loops: [What cycles back?]
Losses: [Where does stuff get lost/wasted?]
```

---

### Step 7: Assess Resilience

```
REDUNDANCY:
- Component A: No backup → Single point of failure
- Component B: 2 backups → Highly resilient
- Component C: Manual fallback → Medium resilience

FLEXIBILITY:
- Can the system adapt if conditions change?
- Can it handle surges?
- Can it degrade gracefully?

RECOVERY TIME:
- If component fails, how quickly can it be restored?
- Are there emergency modes?
- Is there a backup plan?

CURRENT RESILIENCE: [Low/Medium/High]
- What's the weakest link?
- Where would the system break first?
```

---

### Step 8: Identify Failure Modes

```
FAILURE MODE 1: [Component A fails]
- Cascade: [What else breaks as a result?]
- Timing: [How long before cascade is apparent?]
- Recovery: [Can system recover? How?]
- Probability: [How likely?]

FAILURE MODE 2: [Slow degradation]
- What gets worse gradually?
- When does it become critical?
- Can it be detected early?

FAILURE MODE 3: [Systemic failure]
- What if multiple components fail together?
- What's the correlation?
- Can it be predicted?

[List all significant failure modes]
```

---

## Example: Career System

```
SYSTEM: Career as a mechanical system

COMPONENTS:
1. Financial Engine
   - Salary, income, expenses
   - Function: Provide financial stability
   - State: Working well
   - Criticality: Very high

2. Credential System
   - Degrees, certifications, experience
   - Function: Signal competence to others
   - State: Stable
   - Criticality: High

3. Network
   - Professional relationships, contacts
   - Function: Provide opportunities
   - State: Growing
   - Criticality: Critical for career growth

4. Skills
   - Technical and soft skills
   - Function: Actually do the work
   - State: Adequate
   - Criticality: High

5. Energy/Health
   - Physical and mental capacity
   - Function: Enable work
   - State: [Depends on person]
   - Criticality: High (enables everything)

DEPENDENCIES:
- Financial stable IF work is stable
- Work stable IF health maintains
- Growth depends on network

CRITICAL PATH:
Health good → Energy available → Can do work → Earn income → 
Financial stability → Career stability

SINGLE POINTS OF FAILURE:
1. SPOF: Health/Energy
   - If burnout: Can't work
   - Probability: Medium (30% over 5 years)
   - Impact: Critical (entire system stops)
   - Mitigation: Prevent burnout, maintain health, have emergency fund

2. SPOF: Income (if no savings)
   - If lose job: Financial crisis
   - Probability: Medium (depends on stability)
   - Impact: Critical
   - Mitigation: Build emergency fund, diversify income, maintain network

3. SPOF: Network (for opportunities)
   - If isolated: No advancement
   - Probability: Low (but increases with time in same role)
   - Impact: High (stagnation)
   - Mitigation: Actively maintain relationships, seek new connections

BOTTLENECKS:
1. Time: Can't do everything
   - Limited hours per week
   - Must choose: Work, learning, health, relationships
   - Trade-offs are required

2. Attention: Can't learn everything
   - Can't master all skills
   - Must specialize
   - Breadth vs. depth tension

RESILIENCE: Medium
- No backup income if job lost
- Health depends on current job being sustainable
- Growth depends on active network maintenance
- Emergency fund would improve resilience

WAYS TO IMPROVE:
1. Build emergency fund (3-12 months expenses)
2. Maintain health aggressively
3. Actively cultivate network (not just when job hunting)
4. Develop portable skills (not company-specific)
5. Keep credentials current
6. Have side projects or consulting options
```

---

## Common Patterns

### The Single Point of Failure (SPOF)
One component is so critical that if it fails, everything fails.

**Example**: Power goes out in a hospital → All systems fail  
**Mitigation**: Add backup generator, redundancy

### The Bottleneck
One component limits the throughput of the whole system.

**Example**: Factory can make 1000 units/day but distribution can only handle 500  
**Mitigation**: Expand distribution, reduce production, add intermediary storage

### The Coupling Problem
Two components depend on each other, creating instability.

**Example**: Partner's mood affects your performance, your stress affects their mood  
**Mitigation**: Decouple by improving communication, setting boundaries

### The Cascade Failure
One component fails, which breaks a second, which breaks a third.

**Example**: Tired → Make mistake → Damaged confidence → More mistakes → Burnout  
**Mitigation**: Break the chain early (sleep, reset, support)

### The Hidden Dependency
A critical component depends on something that's invisible.

**Example**: Career depends on luck meeting preparation  
**Mitigation**: Identify what's invisible, make it visible, manage it

---

## Resilience Assessment Checklist

- ✓ **Redundancy**: Are critical components backed up?
- ✓ **Flexibility**: Can the system adapt or degrade gracefully?
- ✓ **Recovery**: How quickly can components be restored?
- ✓ **Monitoring**: Can problems be detected early?
- ✓ **Isolation**: Can failures be contained, not cascade?
- ✓ **Alternatives**: Are there workarounds or backups?
- ✓ **Buffer**: Are there reserves (time, money, energy)?

Low-resilience systems fail suddenly. High-resilience systems fail gracefully.

---

## Output Format

All mechanical analysis should include:
- ✅ Components list with functions
- ✅ Dependency map
- ✅ Critical path
- ✅ SPOFs (ranked by severity)
- ✅ Bottlenecks
- ✅ Flow mapping
- ✅ Resilience assessment
- ✅ Failure modes
- ✅ Improvement suggestions

This level of detail reveals what other approaches miss.

---

## Integration with Other Engines

**Mechanical → Tribunal**: Tribunal weighs components' importance  
**Mechanical → Edge Cases**: Edge cases stress-test the components  
**Mechanical → Synthesis**: Synthesis uses understanding to make better recommendations  
**Mechanical → Memory**: Memory stores patterns about how systems work  

The mechanical view is objective. It reveals constraints that override opinion.
