import { calculateDiscounts, type Cart } from '../index';

describe('calculateDiscounts bad-code kata', () => {
    it('returns no discounts for an empty cart', () => {
        const result = calculateDiscounts({ customerId: 'guest', items: [] });

        expect(result).toEqual({
            originalTotal: 0,
            finalTotal: 0,
            appliedRules: [],
        });
    });

    it('applies the book bundle rule', () => {
        const cart: Cart = {
            customerId: 'guest',
            items: [
                { id: 'b1', name: 'Book 1', unitPrice: 20, quantity: 2, category: 'BOOK' },
                { id: 'b2', name: 'Book 2', unitPrice: 30, quantity: 1, category: 'BOOK' },
            ],
        };

        const result = calculateDiscounts(cart);

        expect(result.appliedRules).toContainEqual({
            ruleId: 'B',
            description: 'BOOK bundle discount (3+ books)',
            amount: -15,
        });
        expect(result.finalTotal).toBe(55);
    });

    it('applies the electronics rule based on electronics total only', () => {
        const cart: Cart = {
            customerId: 'guest',
            items: [
                { id: 'e1', name: 'Phone', unitPrice: 500, quantity: 1, category: 'ELECTRONICS' },
                { id: 'e2', name: 'Headphones', unitPrice: 300, quantity: 1, category: 'ELECTRONICS' },
                { id: 'b1', name: 'Novel', unitPrice: 50, quantity: 1, category: 'BOOK' },
            ],
        };

        const result = calculateDiscounts(cart);

        expect(result.appliedRules).toContainEqual({
            ruleId: 'D',
            description: '5% discount on ELECTRONICS total (≥2 ELECTRONICS items)',
            amount: -40,
        });
        expect(result.finalTotal).toBe(725);
    });

    it('treats VIP and shipping thresholds as simultaneous cart-wide rules', () => {
        const cart: Cart = {
            customerId: 'vip-77',
            items: [
                { id: 'e1', name: 'Laptop', unitPrice: 900, quantity: 1, category: 'ELECTRONICS' },
                { id: 'e2', name: 'Monitor', unitPrice: 200, quantity: 1, category: 'ELECTRONICS' },
            ],
        };

        const result = calculateDiscounts(cart);

        expect(result.appliedRules).toEqual([
            {
                ruleId: 'A',
                description: '10% cart discount (>300)',
                amount: -110,
            },
            {
                ruleId: 'D',
                description: '5% discount on ELECTRONICS total (≥2 ELECTRONICS items)',
                amount: -55,
            },
            {
                ruleId: 'F',
                description: 'Free shipping (>1000)',
                amount: -50,
            },
            {
                ruleId: 'G',
                description: 'VIP customer discount (5%)',
                amount: -55,
            },
        ]);
        expect(result.originalTotal).toBe(1100);
        expect(result.finalTotal).toBe(830);
    });

    it('never returns a negative total', () => {
        const cart: Cart = {
            customerId: 'vip-free',
            items: [
                { id: 'f1', name: 'Snack', unitPrice: 10, quantity: 11, category: 'FOOD' },
                { id: 'b1', name: 'Cheap Book', unitPrice: 5, quantity: 3, category: 'BOOK' },
            ],
        };

        const result = calculateDiscounts(cart);

        expect(result.finalTotal).toBeGreaterThanOrEqual(0);
    });
});