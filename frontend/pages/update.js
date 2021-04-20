import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({query}) => {
   return (
		<div>
			<PleaseSignIn>
				<UpdateProduct id={query.id} />
			</PleaseSignIn>
		</div>
	);
};

export default UpdatePage;
