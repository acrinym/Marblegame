# Engine 1: Parallel Oracle

**Priority**: CORE (runs after Harm Eval + Affect)  
**Execution**: Parallel (all 6 dimensions simultaneously)  
**Role**: Multi-perspective exploration of the problem  
**Output**: List of 6+ branches with reasoning, evidence, confidence

---

## Purpose

Generate multiple independent perspectives on the same question, exploring it from different angles simultaneously. The Oracle doesn't try to find "the right answer" - it finds all possible valid answers and shows how people with different perspectives would approach it.

This prevents anchoring bias (getting stuck in one viewpoint) and reveals blind spots.

---

## The 6 Dimensions

### Dimension 1: 6W+H Perspective
**Framework**: Who, What, When, Where, Why, How, Why Not?

```
WHO is involved?
- Main stakeholders
- Decision-makers
- Those affected
- Hidden actors

WHAT is the core question/problem?
- Surface level issue
- Underlying issue
- Root cause

WHEN is this relevant?
- Timing constraints
- Deadline pressures
- Seasonal factors
- Life stage

WHERE does this occur?
- Physical location
- Organizational context
- Market context
- Systemic location

WHY does it matter?
- Personal stakes
- Professional stakes
- Ethical stakes
- Practical stakes

HOW does it work?
- Current process
- How it could change
- Implementation path

WHY NOT? (Opposite)
- Why avoid this?
- What prevents it?
- What makes it hard?
```

**Output**: 3-5 key insights structured around these questions

---

### Dimension 2: Negation Perspective
**Framework**: What if the opposite is true?

```
ASSUMPTION 1: [Something obvious about the situation]
OPPOSITE: [What if that's wrong?]
IMPLICATIONS: [What changes if opposite is true?]

ASSUMPTION 2: [Something else taken for granted]
OPPOSITE: [What if that's not true?]
IMPLICATIONS: [What changes?]

[Continue for 3-5 key assumptions]

KEY INSIGHTS:
- Where is the consensus actually wrong?
- What would change everything?
- What conventional wisdom fails?
```

**Why useful**: Exposes when you're following herd thinking instead of evidence

---

### Dimension 3: Mechanical Perspective
**Framework**: How does this system actually work inside?

```
COMPONENTS: [What are the parts?]
RELATIONSHIPS: [How do they interact?]
CAUSAL CHAIN: [What causes what?]
CONSTRAINTS: [What limits possibility?]
LEVERAGE POINTS: [What would most change the system?]

KEY INSIGHTS:
- How is this system designed?
- What's the actual mechanism?
- What would break it?
- How to optimize it?
```

**Why useful**: Understanding mechanics reveals what's actually possible

---

### Dimension 4: Symbolic/Metaphorical Perspective
**Framework**: What symbols, archetypes, and patterns apply?

```
METAPHORS:
- This is like... [what else is it similar to?]
- This resembles... [what pattern repeats?]

ARCHETYPES:
- The Hero's Journey? [relevant aspects]
- The Trickster? [relevant aspects]
- The Mentor? [relevant aspects]
[Others as applicable]

SYMBOLIC MEANING:
- What does this represent?
- What does this symbolize for you?
- What does this mean culturally?

KEY INSIGHTS:
- What pattern is repeating?
- What psychological elements matter?
- What does this symbolize?
```

**Why useful**: Reveals psychological and cultural patterns that affect outcomes

---

### Dimension 5: Temporal Perspective
**Framework**: How does this change over time?

```
PAST:
- How did we get here?
- What history led to this?
- What patterns repeat from the past?

PRESENT:
- What's happening now?
- What are current trends?
- What's the inflection point?

FUTURE:
- Where is this heading?
- What trajectory are we on?
- What could change the path?

CYCLES:
- What patterns repeat cyclically?
- What seasons/phases apply?
- When is the optimal timing?

KEY INSIGHTS:
- What's the trend?
- Is this cyclical or linear?
- What window is closing?
- What's opening?
```

**Why useful**: Reveals timing factors and whether timing is critical

---

### Dimension 6: Relational/Systemic Perspective
**Framework**: How does this connect to everything else?

```
WHAT DOES THIS DEPEND ON?
- Prerequisites
- Enablers
- Assumptions required

WHAT DEPENDS ON THIS?
- Consequences
- Downstream effects
- Ripple effects

INTERCONNECTIONS:
- What else is affected?
- What's the feedback loop?
- What's coupled or decoupled?

STAKEHOLDERS:
- Who benefits?
- Who loses?
- Who is neutral?

KEY INSIGHTS:
- What's the network effect?
- What would break?
- Who should you include?
- What's the ripple impact?
```

**Why useful**: Reveals systemic effects and stakeholder factors

---

## How to Generate Oracle Branches

### Step 1: Choose Your Dimensions
**Default**: All 6 dimensions (comprehensive)
**Custom**: User specifies which to emphasize

### Step 2: For Each Dimension
1. Ask the framework questions
2. Generate 3-5 key insights
3. Find supporting evidence
4. Rate confidence (0-100%)
5. Identify assumptions
6. Note where this perspective is strong vs. weak

### Step 3: Create Branch Output

```
ORACLE BRANCH: [Dimension Name]

Perspective: [Brief name for this viewpoint]

Key Insights:
- [Insight 1]: [Reasoning] [Evidence]
- [Insight 2]: [Reasoning] [Evidence]
- [Insight 3]: [Reasoning] [Evidence]

Evidence:
- [Claim 1]: [Support] (Reliability: X%)
- [Claim 2]: [Support] (Reliability: X%)

Reasoning Steps:
1. [Logical step]
2. [Logical step]
3. [Logical step]

Confidence: X%
Assumptions: [What's being assumed?]
Where This Breaks: [What could invalidate this?]
```

---

## Example: "Should I change careers?"

### Branch 1: 6W+H Dimension
```
WHO: You + family + employer + future employers
WHAT: Career change decision with financial and personal impact
WHEN: Mid-career (1-15 years in), peak earning potential ahead
WHERE: Current field vs. new field (geography may change too)
WHY: Growth, fulfillment, financial improvement, values alignment
HOW: Transition plan, retraining, networking in new field
WHY NOT: Risk, sunk investment in current path, uncertainty

Key Insights:
- Timing is critical: Career changes have windows
- Financial impact is calculable but psychological impact uncertain
- New field network is essential (not just skills)
```

### Branch 2: Negation Dimension
```
ASSUMPTION: "I need to change careers for growth"
OPPOSITE: "I can grow more in current career than I think"

ASSUMPTION: "New field will be better"
OPPOSITE: "Current field has advantages I'm overlooking"

ASSUMPTION: "I'm the only one feeling unfulfilled"
OPPOSITE: "Fulfillment is internal, not field-dependent"

Key Insights:
- Maybe the issue is the job, not the field
- Maybe you can influence the current job differently
- Maybe the grass isn't actually greener
```

### Branch 3: Mechanical Dimension
```
SYSTEM: Career as a system of credentials, skills, network, finances

Components:
- Financial: Income, expenses, savings, opportunities
- Skills: Current skills, transferable skills, new skills needed
- Network: Contacts, relationships, opportunities
- Status/Credentials: Titles, degrees, experience

Relationships:
- Skills enable opportunities
- Network enables opportunities
- Financial stability enables transition
- Time enables skill development

Key Insights:
- Most important component: Network in new field (hard to build)
- Bottleneck: Financial runway during transition
- Single Point of Failure: If you can't afford to transition, you're stuck
```

### Branch 4: Symbolic Dimension
```
METAPHOR: "Career change is a hero's journey"
- Leaving safety (current career)
- Facing trials (retraining, rejection)
- Gaining powers (new skills)
- Returning changed

ARCHETYPE: "The Reinvention"
- Common pattern of starting over
- Phoenix rising from ashes
- But requires courage and sacrifice

Key Insights:
- There's psychological power in "new beginning"
- But also loss of identity (I was a [former role])
- The transition is the hard part, not the destination
```

### Branch 5: Temporal Dimension
```
PAST: How did you get into this field?
- Were you choosing or defaulting?
- Have you ever seriously considered leaving?
- What triggered this question now?

PRESENT: What's happening now?
- Burnout? Boredom? Opportunity? Values shift?
- Is this urgency temporary or permanent?

FUTURE: Where is this heading?
- 5 years if you stay?
- 5 years if you change?
- Is there a closing window?

Key Insights:
- Timing matters: Are you running TO something or FROM something?
- 5-year outlook: Will you regret either choice?
- Window: Is this the last time you can do this?
```

### Branch 6: Relational Dimension
```
DEPENDS ON: Financial security, market demand, family support
AFFECTS: Family finances, family time, identity
ECOSYSTEM: Industry trends, job market, economy

Stakeholders:
- You: Benefits from growth/fulfillment
- Family: Affected by financial/time change
- Current employer: Loses experienced person
- New field: Gains experienced career-switcher

Key Insights:
- Family impact is critical consideration
- Current employer may counter-offer
- New field may be skeptical of career-switcher
- Support system essential during transition
```

---

## Confidence Levels

### High Confidence (80-100%)
- Well-established facts or patterns
- Multiple sources of evidence
- Logical chains are solid
- Assumptions are sound

### Medium Confidence (50-79%)
- Some evidence but not conclusive
- Logical chain has gaps
- Assumptions are reasonable but not certain
- Field-dependent knowledge

### Low Confidence (Below 50%)
- Limited evidence
- Multiple assumptions
- Logical chains are weak
- Highly dependent on individual circumstances

---

## When Perspectives Conflict

```
Branch 1 says: "Change careers"
Branch 2 says: "Maybe stay"
Branch 3 says: "The decision mechanism is flawed"

This is GOOD. Conflicts reveal:
- Assumptions that differ
- Information that's uncertain
- Areas needing more thought
- Where you need to decide based on values, not logic
```

---

## Tips for Strong Oracle Output

1. **Be independent**: Each dimension should be explored fresh, not biased by others
2. **Find evidence**: Not just opinion, but reasoning and evidence
3. **Show assumptions**: Make clear what's being taken for granted
4. **Acknowledge limits**: Where is each perspective strong vs. weak?
5. **Rate confidence**: Be honest about certainty levels
6. **Integrate later**: Let Tribunal and Synthesis integrate conflicting views

---

## Quick Reference: 6 Dimensions

| Dimension | Asks | Reveals |
|-----------|------|---------|
| 6W+H | Who/What/When/Where/Why/How? | Context, stakeholders, process |
| Negation | What if opposite is true? | Assumptions, weaknesses, blind spots |
| Mechanical | How does the system work? | Components, constraints, leverage |
| Symbolic | What patterns/metaphors apply? | Psychological, cultural factors |
| Temporal | How does this change over time? | Timing, windows, trajectories |
| Relational | How does this connect to everything? | Systemic effects, dependencies |

---

## Output Format

All Oracle branches should include:
- ✅ Perspective name and dimension
- ✅ 3-5 key insights
- ✅ Evidence for claims
- ✅ Confidence level
- ✅ Assumptions being made
- ✅ Where this perspective breaks
- ✅ Reasoning steps

This ensures Tribunal can evaluate them fairly.

---

## Integration with Other Engines

**Oracle → Tribunal**: Tribunal weighs these branches by evidence quality  
**Oracle → Synthesis**: Synthesis integrates insights into final answer  
**Oracle → Memory**: Memory stores successful patterns  
**Oracle → Learning**: Learning tracks which branches were most useful

The Oracle doesn't judge; it explores. Judgment comes later.
