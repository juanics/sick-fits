import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import {perPage} from '../config';

export const ALL_PRODUCTS_QUERY = gql`
   query ALL_PRODUCTS_QUERY ($first: Int, $skip: Int){
      allProducts(first: $first, skip: $skip) {
         id
         name
         price
         description
         photo {
            id
            image {
               publicUrlTransformed
            }
         }
      }
   }
`;

const ProductsListStyles = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-gap: 60px;
`;

const Products = ({page}) => {
   console.log('products page', page)
   const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
      variables: {
         first: perPage,
         skip: perPage * (page-1)
      }
   });
   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error.message}</p>;
   return (
      <ProductsListStyles>
         {data.allProducts.map((p) => (
            <Product key={p.id} product={p} />
         ))}
      </ProductsListStyles>
   );
};

export default Products;
