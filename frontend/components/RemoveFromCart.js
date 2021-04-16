import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	cursor: pointer;
	&:hover {
		color: var(--red);
	}
`;

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		deleteCartItem(id: $id) {
			id
		}
	}
`;

const update = (cache, payload) => {
   cache.evict(cache.identify(payload?.data?.deleteCartItem));
}

const RemoveFromCart = ({ id }) => {
	const [deleteCartItem, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
		variables: { id },
      update,
      // optimisticResponse: { // no funca
      //    deleteCartItem: {
      //       __typename: 'CartItem',
      //       id
      //    }
      // }
	});
	return (
		<BigButton type="button" title="Remove item from cart" onClick={deleteCartItem} disabled={loading}>
			&times;
		</BigButton>
	);
};

export default RemoveFromCart;
