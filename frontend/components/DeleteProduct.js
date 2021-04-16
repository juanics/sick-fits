import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

const DELETE_PRODUCT_MUTATION = gql`
   mutation DELETE_PRODUCT_MUTATION($id: ID!) {
      deleteProduct(id: $id) {
         id
         name
      }
   }
`;

const update = (cache, payload) => {
   console.log(payload);
   cache.evict(cache.identify(payload.data.deleteProduct))
}

const DeleteProduct = ({ id, children }) => {
   const [deleteProduct, { data, error, loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
      variables: {
         id,
      },
      update
   });
   return (
      <button
         type="button"
         disabled={loading}
         onClick={() => {
            if (confirm('Are you sure you want to delete?')) {
               deleteProduct(id).catch(err => alert(err.message));
            }
         }}
      >
         {children}
      </button>
   );
};

export default DeleteProduct;
