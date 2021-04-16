import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
	mutation ADD_TO_CART_MUTATION ($productId: ID) {
		addToCart(productId: $productId) {
			quantity
			id
		}
	}
`;

const AddToCart = ({ id }) => {
   const {openCart} = useCart(); 
   const [addToCart, { loading, error, data }] = useMutation(ADD_TO_CART_MUTATION, {
		variables: {
			productId: id,
		},refetchQueries: [
         {query: CURRENT_USER_QUERY}
      ],
	});

   const handleAdd = async (e) => {
		await addToCart();
      openCart();

	};


	return (
		<button type="button" onClick={handleAdd} disabled={loading}>
			Add{loading && 'ing'} to Cart 🛒
		</button>
	);
};

export default AddToCart;
