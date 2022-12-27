import React, { createContext, useState } from "react";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [Cart, setCart] = useState(
    localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  );

  const [Store, setStore] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
  );

  const [alert, setalert] = useState(false);
  const [alertMessage, setalertMessage] = useState("");

  const addToCart = (item) => {
    let itemExist = false;
    if (Cart) {
      Cart.map((existinItem) => {
        if (existinItem.id == item.id) {
          itemExist = true;
        }
      });
    }
    if (itemExist) {
      let prevCartitem = Cart.map((previtem) => {
        if (previtem.id == item.id) {
          return {
            ...previtem,
            Quantity: (previtem.Quantity += 1),
            Total: Math.round(previtem.price * previtem.Quantity * 100) / 100,
          };
        } else {
          return previtem;
        }
      });
      setCart(prevCartitem);
      localStorage.setItem("cartItem", JSON.stringify(prevCartitem));
      setalertMessage("ITEM ALREADY ADDED TO CART HENCE QUANTITY INCREASED");
      setalert(true);
    } else {
      let newCart = [...Cart, { ...item, Quantity: 1, Total: item.price }];
      setCart(newCart);
      localStorage.setItem("cartItem", JSON.stringify(newCart));
      setalertMessage("ITEM ADDED TO CART");
      setalert(true);
    }
  };

  const initialState = {
    addToCart,
    Store,
    setStore,
    Cart,
    setCart,
    alert,
    setalert,
    alertMessage,
    setalertMessage,
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
export default ContextProvider;
