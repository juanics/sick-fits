import Orders from "../components/Orders";
import PleaseSignIn from "../components/PleaseSignIn";


const OrdersPage = () => (
	<div>
		<PleaseSignIn>
			<Orders />
		</PleaseSignIn>
	</div>
);

export default OrdersPage;
