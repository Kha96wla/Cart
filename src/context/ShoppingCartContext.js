import { createContext, useContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";

const ShopingCartContext = createContext({});

const initialCartItems = localStorage.getItem("shopping-cart")
   ? JSON.parse(localStorage.getItem("shopping-cart"))
   : [];



const ShoppingCartProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState(initialCartItems);

    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(cartItems))
    }, [cartItems])

    const openCart = () => {
        setIsOpen(true);
    };
    const closeCart = () => {
        setIsOpen(false);
    };
    const cartQuantity = cartItems.reduce((quantity, item) => (
        item.quantity + quantity
    ), 0)
    const getItemsQuantity = (id) =>{
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };
    const increaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if(currItems.find(item => item.id === id) == null){
                return[...currItems, {id, quantity: 1}];
            }else {
                return currItems.map((item) => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if(currItems.find(item => item.id === id) == null){
                currItems.filter((item) => item.id !== id);
            }else {
                return currItems.map((item) => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else {
                        return item;
                    }
                });
            }
        });
    };
    
    const removeItemFromCart = (id) => {
        setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    };

  return (
    <ShopingCartContext.Provider 
      value={{
        cartItems, 
        getItemsQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeItemFromCart,
        openCart,
        closeCart,
        cartQuantity
    }}
    >
     {children}
     <ShoppingCart isOpen={isOpen} />
    </ShopingCartContext.Provider>
    
  )
}

export default ShoppingCartProvider;
export const useShopingCart = () => {
    return useContext(ShopingCartContext);
}