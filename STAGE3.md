# STAGE 3: Multi-Model Code Review Orchestrator

**Goal**: Create 3 parallel review subagents + orchestrator that merges findings by model.

---

## TASKS

### 1. Create 3 Subagents in `.github/agents/`

Create these three files:

**review-security.agent.md** (Gemini)
```yaml
---
name: "Security Reviewer"
tools: [read, search, execute]
user-invocable: false
model: Gemini 3.1 Pro (Preview)
---
Security review: ...
Output: | Severity | Issue | Why | File | Recommendation |
```

**review-standards.agent.md** (Claude)
```yaml
---
name: "Standards Reviewer"
tools: [read, search, execute]
user-invocable: false
model: Claude Sonnet 4.6
---
Code quality review: ...
Output: | Severity | Issue | Why | File | Recommendation |
```

**review-performance.agent.md** (GPT)
```yaml
---
name: "Performance Reviewer"
tools: [read, search, execute]
user-invocable: false
model: GPT-5.3-Codex
---
Performance review: ...
Output: | Severity | Issue | Why | File | Recommendation |
```

- [ ] All 3 created with correct YAML frontmatter

---

### 2. Update `.github/agents/solid-reviewer.agent.md`

**Add to YAML frontmatter:**
```yaml
agents: [review-security, review-standards, review-performance]
```

**Add to instructions:**
- Invoke all 3 subagents in parallel
- Collect findings, deduplicate identical issues
- Output unified table: `| Severity | Problem | File | Found by | Guidance |`
- "Found by" column: `Gemini, Claude` (consensus) or `GPT` (unique finding)
- Mark consensus: "2/3 models agree on..."

- [ ] Updated with subagent metadata + orchestration logic

---

### 3. Test on the entire codebase

Invoke `solid-reviewer` with: "Review my #codebase"

- [ ] All 3 subagents run in parallel
- [ ] Output shows "Found by" attribution
- [ ] No duplicate findings (merged correctly)
- [ ] Time < 2 min

---

### 4. Validation

- [ ] All 3 subagent files created
- [ ] Orchestrator calls all 3 in parallel
- [ ] Findings attributed to correct models
- [ ] Consensus detected (e.g., "Claude, GPT-4")
- [ ] Unique findings preserved (e.g., "Gemini only")
- [ ] Unified output table shown

---

**Success**: 3 subagents, 1 orchestrator, parallel execution, multi-model attribution.
