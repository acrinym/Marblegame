# Engine 8: Learning Engine

**Priority**: IMPROVEMENT (runs after Synthesis, tracks outcomes)  
**Execution**: Outcome tracking and reasoning calibration  
**Role**: Learn from decisions and improve future reasoning  
**Output**: Pattern updates, confidence calibration, process improvements

---

## Purpose

This system should get better the more you use it. Learning engine tracks:

1. **What we predicted** vs. **what actually happened**
2. **Where we were right** and **where we were wrong**
3. **Which engines were most useful**
4. **Which reasoning improved**
5. **What patterns emerged**

---

## How Learning Works

### Step 1: Record the Prediction

```
ANALYSIS DATE: [When we did the analysis]
QUESTION: [What was being decided?]
CORE PREDICTION: [What did we say would happen?]
CONFIDENCE: [X%]
KEY ASSUMPTIONS: [What were we betting on?]
CRITICAL FACTORS: [What mattered most?]

PREDICTIONS BY ENGINE:
- Oracle: [What each perspective predicted]
- Mechanical: [What system analysis predicted]
- Tribunal: [What weighted verdict predicted]
- Edge cases: [What risks we identified]
```

---

### Step 2: Track the Outcome

```
FOLLOW-UP DATE: [When checking in]
TIME ELAPSED: [How long since decision?]

WHAT ACTUALLY HAPPENED:
[Narrative of what occurred]

PREDICTIONS VS. REALITY:
1. Core prediction: [Right/Wrong/Partially] because [evidence]
2. Oracle perspective A: [Accurate/Inaccurate] because [evidence]
3. Mechanical assumption: [Held/Broke] because [evidence]
4. Edge case warning 1: [Happened/Didn't] and impact was [actual impact]

ACCURACY SCORING:
- Overall accuracy: X% (How right were we overall?)
- Oracle accuracy: X% (Were perspectives accurate?)
- Mechanical accuracy: X% (Did system work as predicted?)
- Risk assessment: X% (Were risks properly identified?)
```

---

### Step 3: Analyze the Mismatch

```
WHERE WE WERE RIGHT:
- Prediction 1: We said X, reality was X → Correct
- Prediction 2: We said Y, reality was Y → Correct
→ These engines/patterns were reliable

WHERE WE WERE WRONG:
- Prediction 1: We said X, reality was Z → Wrong direction
- Prediction 2: We said 80%, actually 50% → Overconfident
→ These engines/patterns need calibration

WHERE WE MISSED:
- We didn't consider: [Factor that mattered]
- We underweighted: [Thing that was more important]
- We overweighted: [Thing that mattered less]
→ These blindspots need attention
```

---

### Step 4: Update Confidence Levels

```
ENGINE CALIBRATION:

ORACLE ENGINE:
- Before: 80% confident in perspective accuracy
- Actual accuracy: 75%
- Update: 75% confidence (slightly lower)
- Learning: People's perspectives are slightly less predictive than we thought

MECHANICAL ENGINE:
- Before: 85% confident in SPOF identification
- Actual: SPOFs we identified all mattered
- Update: 90% confidence (higher, more reliable)
- Learning: Mechanical analysis is very reliable for this person

TRIBUNAL ENGINE:
- Before: 70% confident in weighted verdicts
- Actual: 65% accuracy (overconfident)
- Update: 65% confidence
- Learning: Evidence weighting is harder than we estimated

EDGE CASES ENGINE:
- Before: 75% confident in risk identification
- Actual: We identified 80% of actual risks
- Update: 75% confidence (about right)
- Learning: Risk assessment is roughly calibrated
```

---

### Step 5: Extract Lessons

```
LESSON 1: [What did we learn?]
Evidence: [Why are we confident in this lesson?]
Application: [How does this apply next time?]
Confidence: [X%]

LESSON 2: [Pattern we identified]
Evidence: [How we know it's true]
Application: [Use case for this learning]
Confidence: [X%]

[Continue for all significant learnings]
```

---

## Example: Career Decision Learning

```
DECISION ANALYZED: Career change (6 months ago)
DECISION MADE: Stay in current job with growth plan
PREDICTED OUTCOME: Would feel satisfied if role grows + family is supported
PREDICTION CONFIDENCE: 70%

ACTUAL OUTCOME (6 months later):
- Negotiated new role with more responsibility → Success
- Better work-life balance → Success
- Family thriving → Success
- Salary increase as promised → Success
- One unexpected: Company culture shifted → Neutral (didn't expect that)

ACCURACY ASSESSMENT:
- Core prediction: 95% accurate (we said this would work; it did)
- Oracle perspective (growth):  Nailed it (95% accurate)
- Oracle perspective (family): Correct (95% accurate)
- Mechanical analysis: System held as predicted (95% accurate)
- Edge case warnings: Mostly didn't happen (but would have been bad if they did)
- Risk assessment: Slightly overestimated (we were at 25% confidence for culture shift; only 10% happened)

OVERALL ACCURACY: 90% (Better than our 70% confidence!)

CALIBRATION UPDATES:

ORACLE ENGINE - Pattern: Family + growth satisfaction
- Before: 80% confidence that both can be satisfied
- Actual: Both were satisfied simultaneously
- Update: 85% confidence (higher; they're not as opposed as we thought)
- Learning: When someone prioritizes both well, both can happen

MECHANICAL ENGINE - SPOF analysis
- Before: We identified 3 SPOFs; worried about 1
- Actual: None of the SPOFs occurred; system was more robust than expected
- Update: 90% confidence in SPOF identification (good)
- But: 70% confidence in SPOF severity (we overestimated severity)
- Learning: SPOFs are often overstated; organizations have more resilience

TRIBUNAL ENGINE - Evidence weighting
- Before: Evidence weighted toward "stay"
- Actual: Decision to stay was right, but for reasons we partly missed
- Update: 75% confidence in evidence weighting
- Learning: We underweighted "growth potential in current role"
        We overweighted "safety of staying"

EDGE CASES ENGINE - Risk assessment
- Before: Identified company culture as medium-risk (25% probability)
- Actual: Culture shift happened but minimal impact (5% probability)
- Update: 65% confidence in edge case probability
- Learning: Organizational culture shifts are lower probability than we estimated

AFFECT ENGINE - Emotional factors
- Before: We noted anxiety about change
- Actual: Anxiety was brief; adaptation was fast
- Update: 80% confidence in emotional factor importance
- Learning: You adapt quickly; don't overweight initial anxiety

EXTRACTED LESSONS:

LESSON 1: You can often have both/and (not either/or)
- Example: Both career growth AND family stability
- Confidence: 85% (one case, but very clear)
- Application: Next time someone says it's a tradeoff, explore if both possible

LESSON 2: Your organizations are more resilient than you assume
- Example: SPOFs didn't become critical
- Confidence: 75% (one organization, but clear)
- Application: Trust systems more; they handle adversity better than expected

LESSON 3: Growth in place is underestimated
- Example: You got growth without changing jobs
- Confidence: 80% (matches your history)
- Application: Before recommending job change, explore growth in current role

LESSON 4: You adapt faster than you fear
- Example: You were anxious about negotiations; adaptation was fast
- Confidence: 85% (matches multiple past episodes)
- Application: Don't let fear of change paralyze; your track record is good

LESSON 5: Culture shifts are lower probability than modeled
- Example: Culture shifted but didn't derail things
- Confidence: 60% (need more data)
- Application: Monitor culture, but don't catastrophize small shifts

PATTERN UPDATES FOR MEMORY:

PATTERN: "You can negotiate growth in current role"
- Confidence: Updated from 70% to 85%
- Application: Suggest negotiation before job-change next time

PATTERN: "Family stability and career growth aren't always opposed"
- Confidence: Updated from 75% to 85%
- Application: Look for both/and solutions, not tradeoffs

PATTERN: "You adapt quickly to change"
- Confidence: Stays at 85% (many examples confirm)
- Application: Use this in risk assessment for future changes

PROCESS IMPROVEMENTS:

1. ORACLE ENGINE:
   - Improvement: Explore "both/and" solutions more (you can often have both)
   - Before: Tended to frame as tradeoffs
   - After: Actively explore integration

2. MECHANICAL ENGINE:
   - Improvement: Trust system resilience more
   - Before: Overemphasized single points of failure
   - After: Balance SPOF with resilience assessment

3. EDGE CASES ENGINE:
   - Improvement: Adjust probability estimates downward
   - Before: Tended toward pessimism
   - After: Calibrate with actual historical probability

4. AFFECT ENGINE:
   - Improvement: Weight adaptation speed higher
   - Before: Gave high weight to initial anxiety
   - After: Remember you adapt; anxiety is temporary

OVERALL SYSTEM IMPROVEMENT:
- From 70% accuracy → 90% accuracy (20% improvement)
- More confident in Oracle and Mechanical (they were most accurate)
- Less confident in Edge Case probabilities (we overestimated)
- Better at finding both/and solutions (was missing this)
```

---

## Learning Limits

```
WHAT THIS ONE CASE CAN TEACH:
- Your specific patterns (high confidence, many examples)
- Your adaptation speed (high confidence, proven)
- Your family priorities (high confidence, repeated)
- System resilience in your context (medium confidence, one case)

WHAT WE NEED MORE DATA ON:
- Edge case probabilities (only one case, not enough)
- Cultural factors (varies by organization)
- Long-term outcomes (too early to tell)
- Different decision types (only career decisions so far)

DON'T OVERGENERALIZE:
- Your experience is your data
- Doesn't mean it applies to everyone
- Context matters hugely
- One case isn't enough for many patterns
```

---

## Continuous Improvement Loop

```
ANALYSIS → PREDICTION → DECISION → OUTCOME → LEARNING → BETTER ANALYSIS

Cycle Time: Depends on decision
- Quick decisions: 1-2 weeks of feedback
- Career decisions: 3-6 months of feedback
- Life decisions: 1-2 years of feedback
- Very long decisions: Multiple years

Every cycle improves the model for next time.
```

---

## Output Format

All learning should include:
- ✅ Prediction vs. reality comparison
- ✅ Accuracy assessment for each engine
- ✅ Confidence calibration updates
- ✅ Extracted lessons with evidence
- ✅ Pattern updates for memory
- ✅ Process improvements
- ✅ Overall system improvement

---

## Integration with Other Engines

**Learning** feeds back to all engines:
- **Oracle** uses learned patterns for better perspectives
- **Mechanical** uses historical accuracy to calibrate SPOF assessment
- **Tribunal** uses updated confidence levels for evidence weighting
- **Edge Cases** uses updated probabilities from history
- **Memory** stores lessons as patterns

Learning makes the system exponentially better over time.

---

## Key Principle

**You Don't Know What You Don't Know Until You Know It**

- First analysis: 50-70% confidence (appropriate)
- After one decision: 70-80% confidence (better calibrated)
- After multiple decisions: 80-90% confidence (learning effect)
- But always maintain humility: Overconfidence kills

The best reasoners are the best learners.
