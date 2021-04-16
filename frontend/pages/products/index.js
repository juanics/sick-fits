import { useRouter } from 'next/router';
import React from 'react';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = () => {
   const {query} = useRouter();
   console.log(query)

   return (
   <div>
      <Pagination page={query.page || 1}/>
      <Products page={query.page || 1}/>
      <Pagination page={query.page || 1}/>
   </div>
)};

export default ProductsPage;
