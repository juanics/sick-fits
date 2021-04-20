import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import OrderItemStyles from './styles/OrderItemStyles';
import { useUser } from './User';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import Head from 'next/head';
const USER_ORDERS_QUERY = gql`
	query USER_ORDERS_QUERY($userId: ID!) {
		orders: allOrders(where: { user: { id: $userId } }) {
			id
			charge
			total
			items {
				id
				name
				description
				price
				photo {
					id
					image {
						id
						publicUrlTransformed
					}
				}
				quantity
			}
		}
	}
`;

const OrdersUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-gap: 4rem;
`;

const Orders = () => {
	const user = useUser();
	const { data, loading, error } = useQuery(USER_ORDERS_QUERY, {
		variables: {
			userId: user?.id,
		},
	});
	const { orders } = data || {};
	if (loading) return <p>Loading...</p>;
	if (error) return <DisplayError>{error}</DisplayError>;
	return (
		<div>
			<Head>
				<title>Your Orders ({orders.length})</title>
			</Head>
			{orders.length ? <h2>You have {orders.length} orders</h2> : <p>You don't have orders yet</p>}
			<OrdersUl>
				{orders.map((order) => {
					return (
						<OrderItemStyles key={order.id}>
							<Link href={`/order/${order.id}`}>
								<a>
									<div className="order-meta">
										<p>{order.items?.reduce((acc, item) => acc + item.quantity, 0)} Items</p>
										<p>
											{order.items.length} Product{order.items.length > 1 ? 's' : ''}
										</p>
										<p>{formatMoney(order.total)}</p>
									</div>
									<div className="images">
										{order.items?.map((item) => (
											<img key={`image-${item.id}`} src={item.photo?.image?.publicUrlTransformed} alt={item.name} />
										))}
									</div>
								</a>
							</Link>
						</OrderItemStyles>
					);
				})}
			</OrdersUl>
		</div>
	);
};

export default Orders;
