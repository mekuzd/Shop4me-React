import React, { createContext, useState } from "react";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState("light");

  const [Cart, setCart] = useState(
    localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  );

  const [alert, setalert] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const addToCart = (item) => {
    let newCart = [...Cart, { ...item, Quantity: 1, Total: item.price }];
    setCart(newCart);
    localStorage.setItem("cartItem", JSON.stringify(newCart));
  };

  const initialState = {
    Theme,
    setTheme,
    Cart,
    setCart,
    addToCart,
    alert,
    setalert,
    alertMessage,
    setalertMessage,
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
export default ContextProvider;
