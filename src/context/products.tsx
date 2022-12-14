import  { createContext, ReactNode, useState } from "react";
import { Product } from "./types";


const Context = createContext({});

interface Props {
    children : ReactNode;
}


export function ProductsContextProvider({ children } : Props) {
const [cartItems, setCartItems] = useState<Array<Product>>([]);

    return (
    <Context.Provider value={{cartItems, setCartItems}}>
         {children}
    </Context.Provider>
    
    );
}

export default Context;