import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import { SIGNIN_MUTATION } from './SignIn';
import Form from './styles/Form';

const SIGNUP_MUTATION = gql`
   mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
      createUser(data: { name: $name, email: $email, password: $password }) {
         id
         name
         email
      }
   }
`;

const SignUp = () => {
   const [inputs, handleChange, resetForm, clearForm] = useForm({
      //initial state
      name: '',
      email: '',
      password: '',
   });

   const [signup, {data, error, loading}] = useMutation(SIGNUP_MUTATION, {
      variables: inputs,
      // mutation: SIGNIN_MUTATION,
      // refetchQueries: [
      //    {
      //       query: CURRENT_USER_QUERY,
      //    },
      // ],
   });

   async function handleSubmit(e) {
      e.preventDefault();
      const res = await signup().catch(console.error);
      console.log(res);
   }

   return (
      <Form method="POST" onSubmit={handleSubmit}>
         <h2>Sign Up for an account</h2>
         {error && <DisplayError error={error} />}
         <fieldset disabled={loading} aria-busy={loading}>

         {data?.createUser && <p>Welcome {data.createUser.name}! you successfully created an account, you can go ahead and sign in</p>}
            <label htmlFor="name">
               Name
               <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={inputs.name}
                  onChange={(e) => handleChange(e)}
               />
            </label>
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
            <button type="submit">Sign Up &rarr;</button>
         </fieldset>
      </Form>
   );
};

export default SignUp;
