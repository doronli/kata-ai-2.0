# Refactor Plan

## Goal

Refactor `calculateDiscounts` in `src/discountEngine.ts` so it is easier to read, easier to test, and aligned with DRY and SOLID principles, while preserving the public API and the business rules from `EXERCISE.md`.

## Current Problems

- One function is doing too many jobs: total calculation, rule detection, discount application, and result formatting.
- Some discounts are computed from the wrong base total instead of the original cart state.
- The same cart data is scanned multiple times for different totals.
- Variable names are unclear and make the flow hard to reason about.
- `category?: any` weakens the domain model and hides mistakes.

## Refactor Steps

1. Clarify the domain types.
   - Replace vague category typing with the known business categories.
   - Keep the public types stable, but make the internal model stricter and safer.

2. Separate calculation concerns.
   - Compute cart totals and category summaries in one place.
   - Evaluate each discount rule independently from the others.
   - Apply discounts only after the rule decision is made, so simultaneous rules stay correct.

3. Make rules explicit.
   - Represent each rule as a clearly named unit with a single responsibility.
   - Keep rule descriptions and IDs centralized so they do not drift.

4. Remove duplicated traversal and repeated logic.
   - Reuse the same cart summary instead of looping over items repeatedly.
   - Avoid recomputing the same totals in multiple branches.

5. Improve readability.
   - Replace cryptic variables with descriptive names.
   - Prefer straightforward branching over mutation-heavy flow.
   - Make the final result assembly simple and predictable.

6. Protect behavior with tests.
   - Keep the existing tests green.
   - Add focused tests for rule interactions if any edge cases are still uncovered.

## SOLID Guidance

- SRP: split the engine into smaller pieces, each with one reason to change.
- OCP: add new discount rules without growing one large conditional block.
- LSP: if using rule objects, each rule should be interchangeable without special handling.
- ISP: keep the data contracts narrow and specific.
- DIP: have the calculator depend on rule abstractions, not hard-coded rule logic everywhere.

## Target Outcome

- Each rule is evaluated consistently against the correct cart state.
- The code is easier to extend and review.
- The behavior remains pure and deterministic.
- The tests pass and the logic is easier to trust.
