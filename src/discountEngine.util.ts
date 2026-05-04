import type {
  AppliedRule,
  Cart,
  CartSummary,
  DiscountRule,
} from "./discountEngine.type";

export function summarizeCart(cart: Cart): CartSummary {
  return cart.items.reduce<CartSummary>(
    (summary, item) => {
      const lineTotal = item.unitPrice * item.quantity;

      summary.originalTotal += lineTotal;
      summary.totalItemQuantity += item.quantity;

      if (item.category === "BOOK") {
        summary.bookQuantity += item.quantity;
      }

      if (item.category === "ELECTRONICS") {
        summary.electronicsQuantity += item.quantity;
        summary.electronicsTotal += lineTotal;
      }

      if (item.category === "FOOD") {
        summary.foodTotal += lineTotal;
      }

      if (
        summary.cheapestUnitPrice === 0 ||
        item.unitPrice < summary.cheapestUnitPrice
      ) {
        summary.cheapestUnitPrice = item.unitPrice;
      }

      return summary;
    },
    {
      originalTotal: 0,
      bookQuantity: 0,
      electronicsQuantity: 0,
      electronicsTotal: 0,
      foodTotal: 0,
      totalItemQuantity: 0,
      cheapestUnitPrice: 0,
    },
  );
}

export function createRule(
  ruleId: string,
  description: string,
  getAmount: (cart: Cart, summary: CartSummary) => number,
): DiscountRule {
  return {
    apply(cart, summary) {
      const amount = getAmount(cart, summary);

      if (amount <= 0) {
        return null;
      }

      return {
        ruleId,
        description,
        amount: -amount,
      };
    },
  };
}

export function calculateAppliedRules(
  cart: Cart,
  summary: CartSummary,
  discountRules: DiscountRule[],
): AppliedRule[] {
  return discountRules
    .map((rule) => rule.apply(cart, summary))
    .filter((rule): rule is AppliedRule => rule !== null);
}