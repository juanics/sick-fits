import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const CartItem = list({
	//TODO
	// access
	ui: {
		listView: {
			initialColumns: ['product', 'quantity', 'user'],
		},
	},
	fields: {
		quantity: integer({
			isRequired: true,
			defaultValue: 1,
		}),
		product: relationship({
			ref: 'Product',
		}),
		user: relationship({
			ref: 'User.cart',
		}),
	},
});
