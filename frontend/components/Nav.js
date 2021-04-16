import Link from 'next/link';
import React, { useState } from 'react';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
   const user = useUser();
   const {openCart} = useCart();
   return (
		<NavStyles>
			<Link href="/products">products</Link>
			{user && (
				<>
					<Link href="/sell">sell</Link>
					<Link href="/orders">Orders</Link>
					<Link href="/account">account</Link>
					<SignOut>Sign Out &rarr;</SignOut>
					<button type="button" onClick={openCart} >
						Cart <CartCount count={user?.cart?.reduce((acc, item) => acc + item.quantity, 0)} /> &rarr;
					</button>
				</>
			)}
			{!user && (
				<>
					<Link href="/signin">Sign In &rarr;</Link>
				</>
			)}
		</NavStyles>
	);
};

export default Nav;
