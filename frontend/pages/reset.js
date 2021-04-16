import React from 'react'
import RequestReset from '../components/RequestReset'
import ResetPassword from '../components/ResetPassword'

const ResetPage = ({query}) => {
   if (!query.token) {
      return (
         <>
         <p>You must supply a token!</p>
         <RequestReset/>
         </>
      )
   }
   return (
      <div>
         <ResetPassword token={query.token}/>
      </div>
   )
}

export default ResetPage
