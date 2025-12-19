# Engine 3: Tribunal

**Priority**: SYNTHESIS (runs after Oracle + Mechanical)  
**Execution**: Multi-voice evidence evaluation and weighing  
**Role**: Evaluate competing claims and reach informed judgment  
**Output**: Judge's framework, jury votes, evidence evaluation, executioner verdict

---

## Purpose

Not all perspectives are equally valid. Evidence varies in reliability. The Tribunal weighs competing claims by evidence quality, not by counting votes or false balance.

This is how you reach confident decisions despite disagreement.

---

## The Three Voices

### The Judge
**Role**: Frames the decision space, sets criteria, evaluates evidence

The Judge asks:
- What are we actually deciding?
- What values are at stake?
- How do we evaluate competing claims?
- What counts as evidence?
- What's our decision standard? (preponderance? beyond reasonable doubt? consensus?)

**Judge Output**:
```
DECISION FRAME:
Question: [What are we deciding?]
Stakes: [What's at stake?]
Values: [What matters most?]
Decision Standard: [What level of proof is needed?]
Timeline: [How long can we deliberate?]
```

---

### The Jury (6-12 Perspectives)
**Role**: Present claims with evidence and reasoning

Each juror represents a perspective and must:
1. State their position clearly
2. Provide evidence for their claim
3. Acknowledge weaknesses
4. Rate their own confidence

**Jury Member Output**:
```
PERSPECTIVE: [Name/role of this juror]
CLAIM: [What they believe]
EVIDENCE: [Specific facts supporting the claim]
REASONING: [Logical chain from evidence to claim]
CONFIDENCE: X% [How sure are they?]
COUNTERARGUMENTS: [What could prove them wrong?]
ASSUMPTIONS: [What are they taking for granted?]
```

---

### The Executioner
**Role**: Weigh all evidence and render final verdict

The Executioner:
1. Evaluates evidence reliability (independent of who presents it)
2. Weights jurors by evidence quality (not equally)
3. Identifies conflicts and uncertainties
4. Renders final verdict
5. Explains reasoning

**Executioner Output**:
```
EVIDENCE EVALUATION:
Claim 1: [Reliability X%, based on: evidence quality, source credibility]
Claim 2: [Reliability Y%, based on: evidence quality, source credibility]

WEIGHTED JUDGMENT:
Juror 1 (Reliability 85%): 30% weight in final verdict
Juror 2 (Reliability 60%): 20% weight in final verdict
Juror 3 (Reliability 95%): 50% weight in final verdict

FINAL VERDICT: [Based on weighted evidence]
CONFIDENCE: X% [How sure about this verdict?]
KEY DISAGREEMENTS: [Where did jurors conflict?]
UNCERTAINTIES: [What could change the verdict?]
```

---

## How the Tribunal Works

### Step 1: Judge Frames the Decision

```
JUDGE SAYS:
"We're deciding whether to [action].

What's at stake:
- Financially: [amount, risk]
- Personally: [emotional, relational]
- Professionally: [career impact]
- Ethically: [principles involved]

How we'll evaluate evidence:
- We need credible sources
- We need logical reasoning
- We acknowledge uncertainty
- We prefer evidence over opinion

Decision standard:
- We'll go with preponderance of evidence (>50% likely)
- Not absolute certainty (impossible to get)
- We need 60%+ confidence to decide"
```

---

### Step 2: Jury Members Present

```
JUROR 1 (The Optimist):
CLAIM: "This is a great opportunity"
EVIDENCE:
- Industry growth: 15% per year
- Salary increase: 30%
- Work-life balance reports: Positive
REASONING: More growth + more money = better
CONFIDENCE: 75%
COUNTERARGUMENTS:
- Salary doesn't account for COL increase
- Industry reports might be outdated
- Anecdotal evidence only

JUROR 2 (The Skeptic):
CLAIM: "This could be a trap"
EVIDENCE:
- High turnover rate (40% per year)
- Glassdoor reviews: Mixed to negative
- Job description sounds different from reality reports
REASONING: High turnover + bad reviews = risky
CONFIDENCE: 70%
COUNTERARGUMENTS:
- Turnover might be normal for industry
- Disgruntled employees more likely to review
- Only looking at worst cases

JUROR 3 (The Realist):
CLAIM: "It depends on execution"
EVIDENCE:
- Company is growing
- Management seems competent
- But culture issues are reported
REASONING: Success depends on whether you can handle the culture
CONFIDENCE: 65%
COUNTERARGUMENTS:
- Culture can change
- You might be the one who changes it
```

---

### Step 3: Executioner Weighs

```
EXECUTIONER ANALYSIS:

EVIDENCE QUALITY:
- Industry growth data (Juror 1): High credibility, recent sources
- Salary increase (Juror 1): High credibility, verified
- Turnover data (Juror 2): Medium credibility (Glassdoor can be biased)
- Culture reports (Juror 2 & 3): Medium credibility (anecdotal)

JUROR CREDIBILITY:
- Optimist (Juror 1): 75% reliable (tends to overlook negatives)
- Skeptic (Juror 2): 70% reliable (tends to overlook positives)
- Realist (Juror 3): 85% reliable (balanced, clear-eyed)

WEIGHTED VERDICT:
- 30% weight to Optimist (credible on financials)
- 25% weight to Skeptic (credible on risks)
- 45% weight to Realist (most balanced)

FINAL VERDICT: "This is worth considering, with eyes open"
CONFIDENCE: 68%

KEY DISAGREEMENTS:
- About culture: Fixable or permanent?
- About risk: Acceptable or too high?
- About value: Worth the tradeoff?

UNCERTAINTIES:
- We don't know your actual culture fit
- We don't know if 30% raise is enough
- We don't know if role is what they say
```

---

## Evidence Evaluation Criteria

### High Credibility Evidence
- Peer-reviewed research
- Verified data
- Multiple independent sources
- Financial records
- Direct personal observation
- Expert testimony
- **Weight**: 90-100%

### Medium Credibility Evidence
- Industry reports
- Company data
- Multiple anecdotes
- Logical inference
- Expert opinion
- **Weight**: 60-80%

### Low Credibility Evidence
- Single anecdote
- Anonymous opinions
- Emotional reasoning
- Gossip
- Speculation
- **Weight**: 20-40%

### No Credit
- Contradiction of facts
- Deliberate deception
- Conspiracy theories unsupported by evidence
- **Weight**: 0-10%

---

## Conflict Resolution

### When Two Jurors Completely Disagree

```
JUROR A: "This is safe"
JUROR B: "This is risky"

EXECUTIONER INVESTIGATION:
1. What evidence does each have?
2. Is one definition of "safe" vs other definition of "risk"?
3. Are they weighing the same factors differently?
4. Is one missing information the other has?

EXECUTIONER VERDICT:
"A is right about: [specific aspect]
B is right about: [specific aspect]
The disagreement is about acceptable risk level, not facts.
You must decide your risk tolerance, not us."
```

---

## Verdict Types

### Clear Verdict (80%+ confidence)
Evidence points strongly in one direction.
```
"Based on evidence, you should [action]"
```

### Leaning Verdict (60-79% confidence)
Evidence leans one way but legitimate uncertainty remains.
```
"Based on evidence, [action] is more likely to succeed,
but significant risks remain."
```

### Balanced Verdict (40-60% confidence)
Evidence doesn't strongly favor either option.
```
"Evidence could support either choice.
The decision depends on your values/risk tolerance."
```

### Conditional Verdict
"If [condition is true], then [recommendation].
If [different condition], then [different recommendation]."
```
"If you have family support: Take the job
If you don't have support: Stay"
```

---

## Output Format

All tribunal analysis should include:
- ✅ Judge's decision frame
- ✅ Jury perspectives (6+ jurors with evidence)
- ✅ Evidence evaluation (credibility ratings)
- ✅ Juror credibility assessment
- ✅ Weighted verdict
- ✅ Overall confidence
- ✅ Key disagreements
- ✅ Uncertainties
- ✅ What would change the verdict

---

## Integration with Other Engines

**Oracle → Tribunal**: Tribunal weighs oracle perspectives by evidence  
**Mechanical → Tribunal**: Tribunal considers mechanical constraints as evidence  
**Edge Cases → Tribunal**: Tribunal adjusts verdict based on risk tolerance  
**Tribunal → Synthesis**: Synthesis uses tribunal verdict as core recommendation  
**Tribunal → Learning**: Learning updates how we evaluate evidence types  

The Tribunal is the voice of reason in a world of incomplete information.
