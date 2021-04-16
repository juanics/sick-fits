import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import { useRouter } from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
   mutation CREATE_PRODUCT_MUTATION($name: String!, $description: String!, $price: Int!, $image: Upload) {
      createProduct(
         data: {
            name: $name
            description: $description
            price: $price
            status: "AVAILABLE"
            photo: { create: { image: $image, altText: $name } }
         }
      ) {
         id
         price
         description
         name
      }
   }
`;

const CreateProduct = () => {
   const [inputs, handleChange, clearForm, resetForm] = useForm({
      image: '',
      name: '',
      price: 0,
      description: '',
   });

   const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
      variables: inputs, //this are de args to the method mutation, in this case its the object cause the names are the same
      refetchQueries: [
         {
            query: ALL_PRODUCTS_QUERY,
         },
      ],
   });

   const router = useRouter();
   return (
      <Form
         onSubmit={async (e) => {
            e.preventDefault();
            const res = await createProduct();
            clearForm();

            //Go to page
            router.push({
               pathname: `/product/${res.data.createProduct.id}`
            });
         }}
      >
         {error && <DisplayError error={error} />}
         <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="image">
               Image
               <input required id="image" name="image" type="file" onChange={(e) => handleChange(e)} />
            </label>
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
            <button type="submit">+ Add Product</button>
         </fieldset>
      </Form>
   );
};

export default CreateProduct;
