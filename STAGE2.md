# Stage 2 - 🤖 How to Create a Custom Agent in VSCode (Copilot)

## 🎯 Goal

This guide explains how to create a **custom Copilot Agent** that enforces project standards and performs a specific task (e.g., code review, clean code enforcement).

The agent will:

- Understand your project rules
- Analyze code
- Respond in a consistent, structured way

## Step by Step Guild

## ✅ Step 1 — Create the Agent File

1. open copilot
2. Change to 'Plan' mode
3. use '/create-agent' skill build in, in vscode to create the agent.

---

## ✅ Step 2 — Define the Agent Description

Start by explaining **what the agent does**.

```txt
Enforces clean code standards and provides structured feedback on code quality issues.
```

👉 Keep it short and clear.

---

## ✅ Step 3 — Define the Agent Persona (Behavior)

Decide how the agent should behave.

```yaml
persona:
  role: Code reviewer
  tone: Strict but helpful
  style: Clear and structured
```

---

## ✅ Step 4 — Define the Agent Goals

What should the agent achieve?

```yaml
goals:
  - Detect code quality issues
  - Explain problems clearly
  - Suggest improvements
  - Guide developers to better code
```

---

## ✅ Step 5 — Define the Rules (VERY IMPORTANT)

These are the standards your agent enforces (like you did in stage 1).

```yaml
rules:
  - Functions must be small and focused
  - Avoid magic numbers
  - Use meaningful variable names
  - Follow single responsibility principle
```

👉 Use:

- Your real coding standards
- Refactor examples (recommended)

---

## ✅ Step 6 — Define the Execution Flow

Explain how the agent should work.

```yaml
execution:
  - Analyze the provided code
  - Identify violations
  - Classify severity
  - Generate structured response
```

---

## ✅ Step 7 — Define the Output Format (MANDATORY)

Always use a **consistent structure**.

```yaml
output_format:
  - Violation
  - Sentence
  - Explanation
  - Fix
```

👉 Example output:

```
⚠️ CODE VIOLATION DETECTED

Violation: Function too long
Sentence: 5 days in clean code prison

Explanation:
This function has too many responsibilities.

Fix:
Split into smaller functions.
```

---

## ✅ Step 8 — Define Constraints (Safety + Quality)

Protect the agent from bad behavior.

```yaml
constraints:
  - Do not modify code unless asked
  - Do not fabricate missing information
  - Always explain reasoning
  - Keep responses structured
```

---

## ✅ Step 9 — Define Context Sources

Tell the agent where to learn from.

```yaml
context:
  - Current file
  - Related files
  - Project coding standards
  - Refactor examples (Stage 1)
```

---

## ✅ Step 10 — Add Tools

Define tools the agent can use:

```yaml
tools:
  - vscode/askQuestions
  - read
  - search
```

---

## ✅ Step 11 — Test the Agent

In VSCode:

- Open the chat
- choose the code-review agent you created
- ask copilot:

```
Review my codebase
```

✅ Check:

- Does it follow the rules?
- Is the output structured?
- Is it consistent?

---

# 🚀 Best Practices

✅ Keep rules clear and simple  
✅ Use structured output  
✅ Avoid long prompts  
✅ Reuse existing instructions (don’t duplicate logic)  
✅ Start simple, then improve

---

# 🧠 Pro Tip

The most important parts are:

1. **Rules** → what you enforce
2. **Output format** → how results look
3. **Persona** → how developers experience it

If these are good → the agent feels “real”.

## ✅ Summary

To build a good agent, always define:

- Description → What it does
- Persona → How it behaves
- Goals → What it achieves
- Rules → What it enforces
- Execution → How it works
- Output → What it returns
- Constraints → Safety