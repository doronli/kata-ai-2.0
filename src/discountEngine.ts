export type CartItem = {
    id: string;
    name: string;
    unitPrice: number;
    quantity: number;
    category?: any;
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

export function calculateDiscounts(cart: Cart): DiscountResult {
    let x = 0;
    let y = 0;
    let z = 0;
    let cheapest = 0;
    let count = 0;
    const rules: AppliedRule[] = [];
    let running = 0;

    for (let i = 0; i < cart.items.length; i += 1) {
        const current = cart.items[i];
        const line = current.unitPrice * current.quantity;

        x += line;
        count += current.quantity;

        if (current.category === 'BOOK') {
            y += current.quantity;
        }

        if (current.category === 'ELECTRONICS') {
            z += line;
        }

        if (current.category === 'FOOD') {
            running += line;
        }

        if (cheapest === 0 || current.unitPrice < cheapest) {
            cheapest = current.unitPrice;
        }
    }

    running = x;

    if (running > 300) {
        const amount = (running * 10) / 100;
        rules.push({
            ruleId: 'A',
            description: '10% cart discount (>300)',
            amount: -amount,
        });
        running -= amount;
    }

    if (y >= 3) {
        rules.push({
            ruleId: 'B',
            description: 'BOOK bundle discount (3+ books)',
            amount: -15,
        });
        running -= 15;
    }

    if (count > 5) {
        const amount = cheapest / 2;
        rules.push({
            ruleId: 'C',
            description: '50% off cheapest item (>5 items total)',
            amount: -amount,
        });
        running -= amount;
    }

    if (count >= 2 && z > 0) {
        const amount = (running * 5) / 100;
        rules.push({
            ruleId: 'D',
            description: '5% discount on ELECTRONICS total (≥2 ELECTRONICS items)',
            amount: -amount,
        });
        running -= amount;
    }

    if (running > 100) {
        let foodTotal = 0;

        for (let i = 0; i < cart.items.length; i += 1) {
            if (cart.items[i].category === 'FOOD') {
                foodTotal += cart.items[i].unitPrice * cart.items[i].quantity;
            }
        }

        if (foodTotal > 100) {
            rules.push({
                ruleId: 'E',
                description: 'FOOD category discount (>100)',
                amount: -20,
            });
            running -= 20;
        }
    }

    if (running > 1000) {
        rules.push({
            ruleId: 'F',
            description: 'Free shipping (>1000)',
            amount: -50,
        });
        running -= 50;
    }

    if (cart.customerId.indexOf('vip') === 0) {
        const amount = (running * 5) / 100;
        rules.push({
            ruleId: 'G',
            description: 'VIP customer discount (5%)',
            amount: -amount,
        });
        running -= amount;
    }

    if (running < 0) {
        running = 0;
    }

    return {
        originalTotal: x,
        finalTotal: Number(running.toFixed(2)),
        appliedRules: rules,
    };
}