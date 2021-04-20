import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';
import PleaseSignIn from '../../components/PleaseSignIn';

const SINGLE_ORDER_QUERY = gql`
	query SINGLE_ORDER_QUERY($orderId: ID!) {
		order: Order(where: { id: $orderId }) {
			id
			total
			charge
			user {
				id
			}
			items {
				id
				name
				description
				price
				quantity
				photo {
					id
					image {
						id
						publicUrlTransformed
					}
				}
			}
		}
	}
`;

const OrderPage = ({ query }) => {
	return (
      <div>
         <PleaseSignIn>
            <OrderDetails id={query.id}/>
         </PleaseSignIn>
      </div>
   )
};

export default OrderPage;
