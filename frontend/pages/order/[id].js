import React from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import OrderDetails from '../../components/OrderDetails';

const OrderPage = ({ query }) => {

	console.log('query', query)
	console.log('id', query.id)

	const {id} = query;

	return (
      <div>
         <PleaseSignIn>
            <OrderDetails id={id}/>
         </PleaseSignIn>
      </div>
   )
};

export default OrderPage;
