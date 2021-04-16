import { from } from '@apollo/client';
import styled from 'styled-components';
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import { useUser } from './User'
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';


const CartItemStyles = styled.li`
   padding: 1rem 0;
   border-bottom: 1px solid var(--lightGrey);
   display: grid;
   grid-template-columns: auto 1fr auto;
   img {
      margin-right: 1rem;
   }
   h3, p  {
      margin: 0
   }
`;

const CartItem = ({cartItem}) => {
   const {product} = cartItem
   console.log(product);
   if (!product) return null;
   return (
      <CartItemStyles>
         <img width="100" src={product.photo.image.publicUrlTransformed} alt={product.name}/>
         <div>
            <h3>{product.name}</h3>
            <p>{formatMoney(product.price * cartItem.quantity)} 
                -
               <em>{cartItem.quantity} &times; {formatMoney(product.price)}</em> each
            </p>
         </div>
         <RemoveFromCart id={cartItem.id}/>
         
      </CartItemStyles>
   )
}


const Cart = () => {
   const user = useUser();
   const {cartOpen, closeCart} = useCart();
   if (!user) return null;
   return (
      <CartStyles open={cartOpen}>
         <header>
            <Supreme>Shopping Cart</Supreme>
            <CloseButton onClick={closeCart}>&times;</CloseButton>
         </header>
         <ul>
            {user.cart.map(ci => <CartItem key={ci.id} cartItem={ci}/>)}
         </ul>
         <footer>
            <p>{formatMoney(calcTotalPrice(user.cart))}</p>
         </footer>
      </CartStyles>
   )
}

export default Cart
