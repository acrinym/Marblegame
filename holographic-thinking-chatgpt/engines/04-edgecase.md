# Engine 4: Edge Case Engine

**Priority**: SAFETY (runs parallel with Oracle + Mechanical)  
**Execution**: Stress-test assumptions and find breaking points  
**Role**: Identify critical risks, boundary conditions, and failure modes  
**Output**: Critical scenarios ranked by severity, mitigations, black swans

---

## Purpose

Find where your analysis breaks. Every analysis has assumptions, and every assumption can be wrong. This engine asks "what if the worst happens?" and "what breaks our logic?"

Not to be pessimistic, but to be prepared.

---

## The Four Questions

1. **What's the worst case scenario?**
2. **What assumption could invalidate this analysis?**
3. **What if the opposite happened?**
4. **What are we not seeing?** (Black swans)

---

## Scenario Analysis

### For Each Component/Assumption: Test to Failure

```
ASSUMPTION: [Something being taken for granted]
STRESS TEST: What if this breaks?
SCENARIO: [Concrete situation where it breaks]
PROBABILITY: X% [How likely?]
IMPACT: [Critical/High/Medium/Low]
TIMELINE: [How long before impact is felt?]
MITIGATION: [What would prevent or recover from this?]
```

---

## Critical Scenarios

### High-Probability, High-Impact Scenarios
```
SCENARIO: [Likely bad thing that would hurt a lot]
- Description: [What happens?]
- Trigger: [What causes it?]
- Probability: X% (This is likely)
- Impact: CRITICAL
- Timeline: [How fast does it escalate?]
- Mitigations:
  1. [Prevent it from happening]
  2. [Detect it early]
  3. [Recover quickly if it happens]
- Early warning signs: [What would you notice first?]
```

### Low-Probability, Critical-Impact Scenarios
```
SCENARIO: [Unlikely but catastrophic thing]
- Description: [What happens?]
- Trigger: [What rare event causes it?]
- Probability: X% (This is rare)
- Impact: CRITICAL
- Timeline: [How fast does it escalate?]
- Mitigations:
  1. [Insurance/hedging]
  2. [Contingency plan]
  3. [What's your backup?]
```

---

## Example: Career Change Edge Cases

```
EDGE CASE 1: New job is worse than expected
SCENARIO: You start job and realize:
  - Culture is toxic
  - Manager is bad
  - Job description was misleading
  - Role is different from what was promised
PROBABILITY: 30% (happens to many people)
IMPACT: CRITICAL (stuck in bad situation away from support network)
TIMELINE: 2-4 weeks to realize, 3-6 months to accept, 6-12 months to escape

Mitigations:
1. PREVENTION:
   - Vet culture thoroughly before accepting
   - Talk to current employees (not just interviews)
   - Red flags: High turnover, vague job description, unclear goals
   
2. DETECTION:
   - After 1 month: Assess if reality matches expectations
   - Ask: Is this worse than expected or just different?
   - Red flags: Stress, dread, questioning decision
   
3. RECOVERY:
   - If within 6 months: Can negotiate exit or transfer
   - If within 1 year: Can leave and find something better
   - After 1 year: Establish yourself before leaving
   - Keep network active (exit option)

Early warning: Feeling uncomfortable within first 2 weeks
---

EDGE CASE 2: Family crisis happens and you need to go back
SCENARIO: Parent gets ill, kid has problems, spouse needs help
PROBABILITY: 30% (probable over 2-3 years)
IMPACT: HIGH (pulled between job and crisis)
TIMELINE: Days to realize you need to leave, weeks to months to actually leave

Mitigations:
1. PREVENTION:
   - Maintain close relationships with family
   - Health check-ins with parents
   - Monitor kids' adjustment

2. EARLY RESPONSE:
   - Have exit conversation before crisis: "If emergency, I go"
   - Line up coverage (who can take your job?)
   - Save money for potential move
   - Maintain house in original city (or family has room)

3. RECOVERY:
   - Negotiate leave of absence if possible
   - Remote work if possible
   - Accept you might need to leave this job
   - Know it's not failure, it's priorities

Early warning: Family asks for help more frequently
---

EDGE CASE 3: You're unhappy in new city
SCENARIO: Can't make friends, feel isolated, depressed
PROBABILITY: 30% (depends on personality)
IMPACT: HIGH (miserable and far from support)
TIMELINE: 3-6 months to realize, 1-2 years to accept

Mitigations:
1. PREVENTION:
   - Assess personality: Are you social? Do you make friends easily?
   - Plan community before moving (groups, activities, meetups)
   - Choose city carefully (nightlife, size, weather)

2. EARLY RESPONSE:
   - Set deadline for community-building: "By month 3, I'll have..."
   - Therapy or coaching to help navigate
   - Video calls with home friends (maintain connections)
   - Acknowledge: First 6 months are hard

3. RECOVERY:
   - If truly miserable at 1 year: Consider moving back
   - Try harder before giving up (6 months = too early)
   - Know it's not weakness, it's fit

Early warning: Spending most evenings alone, not making plans
---

EDGE CASE 4: You regret the decision
SCENARIO: In 2-3 years, you realize this wasn't worth it
PROBABILITY: 40% (common with major moves)
IMPACT: MEDIUM-HIGH (regret affects quality of life)
TIMELINE: Realization at 1 year, acceptance at 2-3 years, action at 3-5 years

Mitigations:
1. PRE-COMMITMENT:
   - Decide decision timeline: "I'll evaluate at 2 years"
   - Commit: "I'll give this 2 years, then reassess"
   - Don't keep second-guessing throughout

2. MONITORING:
   - Track satisfaction quarterly
   - Record reasons you took the job
   - Compare to current reality
   
3. RECOVERY:
   - At evaluation point: Stay, leave, or adjust?
   - Recognize sunk cost (past time can't be recovered)
   - Make new decision based on present facts
   - Plan transition if leaving

Early warning: Constant doubt, comparing self to people who stayed
```

---

## Black Swans (Unknown Unknowns)

```
ASSUMPTION WE'RE NOT QUESTIONING:
[Maybe this won't be a problem, but what if?]

BLACK SWAN 1: Remote work becomes standard
SCENARIO: COVID-like situation forces remote work
IMPACT: You could have stayed and gotten raise instead of moving
PROBABILITY: Unknown (but not zero)
MITIGATION: Negotiate remote work option? Plan to stay flexible?

BLACK SWAN 2: Market crash in new field
SCENARIO: Industry you're entering collapses
PROBABILITY: Low but possible
MITIGATION: Maintain financial reserves, keep options open

BLACK SWAN 3: Unexpected opportunity in current location
SCENARIO: Perfect job becomes available while you're moving
PROBABILITY: Low but happens
MITIGATION: Recognize you can't optimize for unknowns

KEY INSIGHT: You can't prepare for black swans. But you can:
- Build financial reserves
- Maintain relationships and options
- Stay flexible
- Be ready to adapt
```

---

## Assumption Stress-Testing

### For Each Key Assumption: "What if that's wrong?"

```
ASSUMPTION 1: "The job will be stable"
WHAT IF: Company goes bankrupt, industry collapses, role gets eliminated
IMPACT: You're unemployed far from support network
MITIGATION: Financial reserves, skills are transferable, network building

ASSUMPTION 2: "My family will be OK with me being gone"
WHAT IF: Spouse is resentful, kids are emotionally affected, family falls apart
IMPACT: Relationship damage that might be irreparable
MITIGATION: Family discussion before move, therapy, regular visits, clear commitment

ASSUMPTION 3: "I'll be happy in new city"
WHAT IF: I'm lonely, depressed, isolate myself
IMPACT: Miserable despite good job
MITIGATION: Plan community, social activities, therapy if needed

ASSUMPTION 4: "I can handle the stress"
WHAT IF: I burn out, my health suffers, I can't perform
IMPACT: Everything collapses
MITIGATION: Stress management, health prioritization, early warning monitoring

[Continue for all major assumptions]
```

---

## Risk Ranking Framework

**Severity = Probability × Impact**

```
CRITICAL RISK (60%+ probability + HIGH impact):
→ Must be addressed before decision

SERIOUS RISK (40-60% probability + HIGH impact OR 60%+ probability + MEDIUM impact):
→ Must have mitigation plan

MODERATE RISK (20-40% probability + HIGH impact OR 40-60% probability + MEDIUM impact):
→ Should have mitigation plan

LOW RISK (anything below moderate):
→ Monitor but don't paralyze decision

NEGLIGIBLE RISK:
→ Don't worry about it
```

---

## Mitigation Strategies

### Prevent It From Happening
```
What can you do to reduce probability?
- Vet thoroughly before accepting
- Negotiate key terms upfront
- Set expectations clearly
- Build support systems before moving
```

### Detect It Early
```
How would you know if this was happening?
- What are early warning signs?
- How often will you check?
- Who would tell you?
- What's your monitoring plan?
```

### Recover Quickly
```
If it happens, what's your plan?
- Can you leave this job?
- Do you have financial reserves?
- Is there a backup plan?
- Can you move back?
- What's the exit timeline?
```

---

## Output Format

All edge case analysis should include:
- ✅ Critical scenarios (ranked by severity)
- ✅ Probability for each scenario
- ✅ Impact assessment
- ✅ Timeline to recognize/unfold
- ✅ Mitigation for each scenario (prevent/detect/recover)
- ✅ Early warning signs
- ✅ Assumption stress-testing
- ✅ Black swan factors (unknowns)
- ✅ Overall risk assessment

This reveals where your plan is vulnerable.

---

## Integration with Other Engines

**Oracle → Edge Cases**: Oracle perspectives are stress-tested  
**Mechanical → Edge Cases**: Mechanical dependencies are tested for failure  
**Edge Cases → Tribunal**: Tribunal adjusts verdict based on risk tolerance  
**Edge Cases → Synthesis**: Synthesis includes risk mitigation in action plan  

The Edge Case Engine is your insurance policy. It makes plans more robust.
