import type { Cart, DiscountResult } from "./discountEngine.type";
import {
  calculateAppliedRules,
  createRule,
  summarizeCart,
} from "./discountEngine.util";
import type { DiscountRule } from "./discountEngine.type";

const discountRules: DiscountRule[] = [
  createRule("A", "10% cart discount (>300)", (_, summary) =>
    summary.originalTotal > 300 ? summary.originalTotal * 0.1 : 0,
  ),
  createRule("B", "BOOK bundle discount (3+ books)", (_, summary) =>
    summary.bookQuantity >= 3 ? 15 : 0,
  ),
  createRule("C", "50% off cheapest item (>5 items total)", (_, summary) =>
    summary.totalItemQuantity > 5 ? summary.cheapestUnitPrice / 2 : 0,
  ),
  createRule(
    "D",
    "5% discount on ELECTRONICS total (≥2 ELECTRONICS items)",
    (_, summary) =>
      summary.electronicsQuantity >= 2 ? summary.electronicsTotal * 0.05 : 0,
  ),
  createRule("E", "FOOD category discount (>100)", (_, summary) =>
    summary.foodTotal > 100 ? 20 : 0,
  ),
  createRule("F", "Free shipping (>1000)", (_, summary) =>
    summary.originalTotal > 1000 ? 50 : 0,
  ),
  createRule("G", "VIP customer discount (5%)", (cart, summary) =>
    cart.customerId.startsWith("vip") ? summary.originalTotal * 0.05 : 0,
  ),
];

export function calculateDiscounts(cart: Cart): DiscountResult {
  const summary = summarizeCart(cart);
  const appliedRules = calculateAppliedRules(cart, summary, discountRules);
  const totalDiscount = appliedRules.reduce((sum, rule) => sum + Math.abs(rule.amount), 0);
  const finalTotal = Math.max(0, summary.originalTotal - totalDiscount);

  return {
    originalTotal: summary.originalTotal,
    finalTotal: Number(finalTotal.toFixed(2)),
    appliedRules,
  };
}
