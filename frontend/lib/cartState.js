import { useContext, useState,createContext } from "react";

const LocalStateContext = createContext();
const {Provider} = LocalStateContext;

const CartStateProvider = ({children}) => {
   const [cartOpen, setCartOpen] = useState(false);

   const toggleCart = () => {
      setCartOpen(!cartOpen);
   }

   const closeCart = () => {
      setCartOpen(false);
   }

   const openCart = () => {
      setCartOpen(true);
   }
   return (
      <Provider value={{cartOpen, toggleCart, closeCart, openCart}}>{children}</Provider>
   );
}

const useCart = () => {
   const state = useContext(LocalStateContext);
   return state;
}

export { CartStateProvider, useCart };