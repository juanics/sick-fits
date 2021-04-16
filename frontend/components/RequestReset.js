import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import { SIGNIN_MUTATION } from './SignIn';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			code
			message
		}
	}
`;

const RequestReset = () => {
	const [inputs, handleChange, resetForm, clearForm] = useForm({
		//initial state
		email: '',
	});

	const [signup, { data, error, loading }] = useMutation(REQUEST_RESET_MUTATION, {
		variables: inputs,
	});

	async function handleSubmit(e) {
		e.preventDefault();
		const res = await signup().catch(console.error);
		console.log(res);
	}

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Request reset password</h2>
			{error && <DisplayError error={error} />}
			<fieldset disabled={loading} aria-busy={loading}>
				{data?.sendUserPasswordResetLink === null && (
					<p>Request sent! Check your email</p>
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
				<button type="submit">Request Reset &rarr;</button>
			</fieldset>
		</Form>
	);
};

export default RequestReset;
