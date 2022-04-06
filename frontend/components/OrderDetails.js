import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import DisplayError from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';

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

const OrderDetails = ({id}) => {

	console.log("id llegando por props", id)

	//el param con el que llego a la page, llega por props
	const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
		variables: {
			orderId: id,
		},
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <DisplayError>{error}</DisplayError>;
	const order = data?.order;
	return (
		<OrderStyles>
			<Head>
				<title>Sick Fits - Order {order.id}</title>
			</Head>
			<p>
				<span>Order Id:</span>
				<span>{order.id}</span>
			</p>
			<p>
				<span>Charge:</span>
				<span>{order.charge}</span>
			</p>
			<p>
				<span>Total:</span>
				<span>{formatMoney(order.total)}</span>
			</p>
			<p>
				<span>Item count:</span>
				<span>{order.items.length}</span>
			</p>
			<div className="items">
				{order.items.map((item) => (
					<div className="order-item" key={item.id}>
						<img src={item.photo?.image?.publicUrlTransformed} alt={item.name} />
						<div className="item-details">
							<h2>{item.name}</h2>
							<p>Qty: {item.quantity}</p>
							<p>Each: {formatMoney(item.price)}</p>
							<p>Sub total: {formatMoney(item.price * item.quantity)}</p>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</OrderStyles>
	);
};

export default OrderDetails;
