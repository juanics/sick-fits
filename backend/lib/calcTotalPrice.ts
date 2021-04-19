import { CartItemCreateInput } from '../.keystone/schema-types';

export default function calcTotalPrice(cart): number {
	return cart.reduce((acc: number, item: CartItemCreateInput) => {
		if (!item.product) return acc;
		return acc + item.quantity * item.product.price;
	}, 0);
}
