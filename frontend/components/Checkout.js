import { useMutation } from '@apollo/client';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import nProgress from 'nprogress';
import React, { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';
import DisplayError from './ErrorMessage';
import { useRouter } from 'next/dist/client/router';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
	box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
	border: 1px solid rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
   mutation CREATE_ORDER_MUTATION($token: String!) {
      checkout(token: $token) {
         id
         charge
         total
         items {
            id
            name
         }
      }
   }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const Checkout = () => {
	return (
		<Elements stripe={stripeLib}>
			<CheckoutForm />
		</Elements>
	);
};

const CheckoutForm = () => {
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
   const router = useRouter();
   const {closeCart} = useCart();
	const [checkout, { error: graphQlError }] = useMutation(CREATE_ORDER_MUTATION, {
      refetchQueries: [{
         query: CURRENT_USER_QUERY
      }]
   });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		nProgress.start();

		//create payment method via stripe
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		console.log(paymentMethod);

		//handling errors
		if (error) {
			nProgress.done();
			return setError(error); //stops the checkout from happening
		}

      const order = await checkout({
			variables: {
				token: paymentMethod.id,
			},
		});

      console.log(order);
      router.push({
			pathname: '/order/[oid]',
			query: { oid: order.data.checkout.id },
		});

      closeCart();

		setLoading(false);
		nProgress.done();
	};

	return (
		<CheckoutFormStyles onSubmit={handleSubmit}>
			{error && <p style={{ fontSize: 12 }}>{error.message}</p>}
			{graphQlError && <DisplayError>{graphQlError}</DisplayError>}
			<CardElement />
			<SickButton>Check out now</SickButton>
		</CheckoutFormStyles>
	);
};

export default Checkout;
