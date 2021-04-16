import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

export const SIGNIN_MUTATION = gql`
   mutation SIGNIN_MUTATION ($email: String!, $password: String!) {
      authenticateUserWithPassword (email: $email, password: $password) {
         ... on UserAuthenticationWithPasswordSuccess {
            item {
               id
               email
               name
            }
         }
         ... on UserAuthenticationWithPasswordFailure {
            code
            message
         }
      }
   }
`;

const SignIn = () => {
   const [inputs, handleChange, resetForm, clearForm] = useForm({
      //initial state
      email: '',
      password: '',
   });

   const [signin, {error, loading, data}] = useMutation(SIGNIN_MUTATION, {
      variables:
      {
         email: inputs.email,
         password: inputs.password
      },
      refetchQueries: [{
         query: CURRENT_USER_QUERY
      }]
   })

   async function onSubmit(e){
      e.preventDefault();
      signin()
         .then((res) => {
            console.log(res)
            resetForm(); 
         });
   }

   return (
      <Form
         method="POST"
         onSubmit={onSubmit}
      >
         <h2>Sign in to your account</h2>
         {data?.authenticateUserWithPassword?.code === 'FAILURE' && <DisplayError error={{message: "Email or password wrong"}} />}
         <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="name">
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
            <button type="submit">Sign In &rarr;</button>
         </fieldset>
      </Form>
   );
};

export default SignIn;
