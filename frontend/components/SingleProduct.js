import { gql, useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import Head from 'next/head';
import styled from 'styled-components';

const ProductStyles = styled.div`
   display: grid;
   grid-auto-columns: 1fr;
   grid-auto-flow: column;
   /* min-height: 800px; */
   max-width: var(--maxWidth);
   align-items: top;
   gap: 2rem;

   img {
      width: 100%;
      /* height: 100%; */
      object-fit: contain;
   }
`;

export const SINGLE_PRODUCT_QUERY = gql`
   query SINGLE_PRODUCT_QUERY($id: ID!) {
      Product(where: { id: $id }) {
         id
         price
         name
         description
         photo {
            id
            altText
            image {
               publicUrlTransformed
            }
         }
      }
   }
`;

export default function SingleProduct({ id }) {
   const { error, loading, data } = useQuery(SINGLE_PRODUCT_QUERY, {
      variables: {
         id: id,
      },
   });

   if (loading) return <p>Loading...</p>;
   if (error) return <DisplayError error={error} />;
   return (
      <ProductStyles>
         <Head>
            <title>Sick Fits | {data.Product.name}</title>
         </Head>
         <img src={data.Product.photo.image.publicUrlTransformed} alt={data.Product.photo.altText} />
         <div className="details">
            <h2>{data.Product.name}</h2>
            <p>{data.Product.description}</p>
         </div>
      </ProductStyles>
   );
}
