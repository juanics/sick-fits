import { KeystoneContext, SessionStore } from '@keystone-next/types';

import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

async function checkout(root: any, { token }: { token: string }, context: KeystoneContext): Promise<OrderCreateInput> {
	//check user is authenticated
	const userId = context.session.itemId;
	if (!userId) {
		throw new Error('Sorry! you must be signed in to order');
	}

	//query current user
	const user = await context.lists.User.findOne({
		where: { id: userId },
		resolveFields: `
         id
         name
         email
         cart {
            id
            quantity
            product {
               name
               price
               description
               id
               photo {
                  id
                  image {
                     id 
                     publicUrlTransformed
                  }
               }
            }     
         }
      `,
	});
	console.dir(user, { depth: null });
	const cartItems = user.cart.filter((i) => i.product);

	//calc total price
	const total = cartItems.reduce((acc: number, item: CartItemCreateInput) => {
		return acc + item.product.price * item.quantity;
	}, 0);
	console.log(total);

	//create the charge with stripe library
	const charge = await stripeConfig.paymentIntents
		.create({
			amount: total,
			currency: 'USD',
			confirm: true,
			payment_method: token,
		})
		.catch((err) => {
			console.log(err);
			throw new Error(err);
		});

	console.log(charge);

	//making orderItems from the cartItems
	const orderItems = cartItems.map((item) => ({
		name: item.product.name,
		description: item.product.description,
		price: item.product.price,
		quantity: item.quantity,
		photo: {
			connect: {
				id: item.product.photo.id,
			},
		},
	}));

	const order = await context.lists.Order.createOne({
		data: {
			total: charge.amount,
			charge: charge.id,
			items: {
				create: orderItems,
			},
			user: { connect: { id: userId } },
		},
	});

	//cleanup old cart items
	const cartItemIds = user.cart.map((item) => item.id);
	await context.lists.CartItem?.deleteMany({
		ids: cartItemIds,
	});

	return order;
}

export default checkout;
