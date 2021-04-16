import { useMutation } from "@apollo/client";
import gql from "graphql-tag"
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
   mutation SIGNOUT_MUTATION {
      endSession 
   }
`;

const SignOut = ({children}) => {

   const [signOut] = useMutation(SIGNOUT_MUTATION, {
      refetchQueries: [{
         query: CURRENT_USER_QUERY
      }]
   });

   return (
      <button type="button" onClick={signOut}>
         {children}
      </button>
   )
}

export default SignOut
