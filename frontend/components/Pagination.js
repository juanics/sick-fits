import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import { useState } from 'react';

export const PAGINATION_QUERY = gql`
   query PAGINATION_QUERY {
      _allProductsMeta {
         count
      }
   }
`;

const Pagination = ({ page }) => {
   const { error, loading, data } = useQuery(PAGINATION_QUERY);
   const { count } = data?._allProductsMeta || 0
   const pageCount = Math.ceil(count / perPage);

   if (loading) return <p>Loading...</p>;
   if (error) return <DisplayError error={error} />;

   return (
      <PaginationStyles>
         <Head>
            <title>Sick Fits | Page {page} of {pageCount}</title>
         </Head>
         <Link href={`/products/${Number(page) - 1}`}>
            <a aria-disabled={page <= 1}>&larr; Prev</a>
         </Link>
         <p>
            Page {page} of {pageCount}
         </p>
         <p>{count} Products total</p>
         <Link href={`/products/${Number(page) + 1}`}>
            <a aria-disabled={page >= pageCount}>Next &rarr;</a>
         </Link>
      </PaginationStyles>
   );
};

export default Pagination;
