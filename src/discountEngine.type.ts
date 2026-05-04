export type CartItemCategory = "BOOK" | "ELECTRONICS" | "FOOD";

export type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  category?: CartItemCategory;
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

export type CartSummary = {
  originalTotal: number;
  bookQuantity: number;
  electronicsQuantity: number;
  electronicsTotal: number;
  foodTotal: number;
  totalItemQuantity: number;
  cheapestUnitPrice: number;
};

export type DiscountRule = {
  apply: (cart: Cart, summary: CartSummary) => AppliedRule | null;
};