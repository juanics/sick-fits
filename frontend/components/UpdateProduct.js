import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { SINGLE_PRODUCT_QUERY } from './SingleProduct';
import Form from './styles/Form';

const UPDATE_PRODUCT_MUTATION = gql`
   mutation UPDATE_PRODUCT_MUTATION($id: ID!, $name: String!, $description: String, $price: Int!) {
      updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
         id
         name
         description
         price
      }
   }
`;

const UpdateProduct = ({ id }) => {
   const { data: qData, error: qError, loading: qLoading } = useQuery(SINGLE_PRODUCT_QUERY, { variables: { id } });

   const [updateProuct, { data: mData, error: mError, loading: mLoading }] = useMutation(UPDATE_PRODUCT_MUTATION);

   const [inputs, handleChange, clearForm, resetForm] = useForm(qData?.Product);

   if (qLoading) return <p>Loading...</p>;
   return (
      <Form
         onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProuct({
               variables: {
                  id: id,
                  name: inputs.name,
                  description: inputs.description,
                  price: inputs.price,
               },
            }).catch(console.error);
         }}
      >
         {(mError || qError) && <DisplayError error={mError || qError} />}
         <fieldset disabled={mLoading} aria-busy={mLoading}>
            <label htmlFor="name">
               Name
               <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={inputs.name}
                  onChange={(e) => handleChange(e)}
               />
            </label>
            <label htmlFor="price">
               Price
               <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={inputs.price}
                  onChange={(e) => handleChange(e)}
               />
            </label>
            <label htmlFor="description">
               Description
               <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={inputs.description}
                  onChange={(e) => handleChange(e)}
               />
            </label>
            <button type="submit">Update Product</button>
         </fieldset>
      </Form>
   );
};

export default UpdateProduct;
