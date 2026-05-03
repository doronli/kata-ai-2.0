# Copilot Mastery Kata: Discount Engine Refactor

**Duration**: 90 minutes  
**Your Mission**: Fix bad code without rewriting the whole solution from scratch.

## The Challenge

This repository now contains an intentionally messy implementation in [src/discountEngine.ts](src/discountEngine.ts).

Your job is to turn it into production-quality code while preserving the required behavior.

## Business Rules (IMPLEMENT EXACTLY)

**Rule A**: Cart total > 300 → 10% discount on entire cart  
**Rule B**: ≥3 BOOK items (total quantity) → 15₪ fixed discount  
**Rule C**: >5 items total → 50% off on cheapest item  
**Rule D**: ≥2 ELECTRONICS items → 5% discount on ELECTRONICS total  
**Rule E**: FOOD category total > 100 → 20₪ fixed discount  
**Rule F**: Cart total > 1000 → Free shipping (deduct 50₪ shipping cost)  
**Rule G**: Customer ID starts with "vip" → Additional 5% discount on entire cart

## Requirements

- Rules apply **simultaneously**
- `finalTotal >= 0` (never negative)
- Return **all applied rules** with descriptions
- Pure functions only
- Do not replace the implementation with a totally unrelated rewrite unless needed

## What Is Intentionally Bad

The starter implementation includes deliberate problems:

- confusing names
- duplicated calculations
- mutation-heavy control flow
- magic numbers
- weak structure
- some logic bugs
- tests that expose incorrect behavior

## Success Criteria

- Make the tests pass
- Improve the code so the logic is easy to reason about
- Keep the public API stable
- Add or improve tests if the current ones are not enough

## Suggested Workflow

1. Read the tests first.
2. Identify which failures are caused by incorrect rule handling.
3. Fix behavior in small steps.
4. Refactor only after each step is protected by tests.

## Starter Types

```typescript
export type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  category?: "BOOK" | "ELECTRONICS" | "FOOD";
};

export type Cart = { customerId: string; items: CartItem[] };

export type AppliedRule = {
  ruleId: string;
  description: string;
  amount: number;
};

export type DiscountResult = {
  originalTotal: number;
  finalTotal: number;
  appliedRules: AppliedRule[];
};
```

## Expected Behavior Example

```json
{
  "originalTotal": 8510,
  "finalTotal": 7649.5,
  "appliedRules": [
    {
      "ruleId": "A",
      "description": "10% cart discount (>300)",
      "amount": -851
    },
    {
      "ruleId": "B",
      "description": "BOOK bundle discount (3+ books)",
      "amount": -15
    },
    {
      "ruleId": "C",
      "description": "50% off cheapest item (>5 items total)",
      "amount": -25
    },
    {
      "ruleId": "D",
      "description": "5% discount on ELECTRONICS total (≥2 ELECTRONICS items)",
      "amount": -400
    }
  ]
}
```

## Your Task

Fix and refactor `calculateDiscounts(cart: Cart): DiscountResult` in [src/discountEngine.ts](src/discountEngine.ts).
