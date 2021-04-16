import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import { SIGNIN_MUTATION } from './SignIn';
import Form from './styles/Form';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
		redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
			code
			message
		}
	}
`;

const ResetPassword = ({token}) => {
	const [inputs, handleChange, resetForm, clearForm] = useForm({
		//initial state
		email: '',
		token: token,
		password: '',
	});

   console.log('token ' +token)

	const [reset, { data, loading }] = useMutation(RESET_MUTATION, {
		variables: inputs,
	});

   const error = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;

	async function handleSubmit(e) {
		e.preventDefault();
      console.log(inputs);
		const res = await reset().catch(console.error);
		console.log(res);
	}

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Reset yout password</h2>
			{error && <DisplayError error={error} />}
			<fieldset disabled={loading} aria-busy={loading}>
				{data?.redeemUserPasswordResetToken === null && (
					<p>Password reset success</p>
				)}
            <label htmlFor="email">
               Email
               <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={inputs.email}
                  onChange={(e) => handleChange(e)}
               />
            </label>
            <label htmlFor="password">
               Password
               <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  value={inputs.password}
                  onChange={(e) => handleChange(e)}
               />
            </label>
				
				<button type="submit">Request Reset &rarr;</button>
			</fieldset>
		</Form>
	);
};

export default ResetPassword;
