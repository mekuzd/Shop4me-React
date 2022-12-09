import React, { createContext, useState } from "react";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState("light");

  const [Cart, setCart] = useState(
    localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  );

  localStorage.setItem("cartItem", JSON.stringify(Cart));

  const addToCart = (item) => {
    setCart([...Cart, { ...item, Quantity: 1, Total: item.price }]);
    localStorage.setItem("cartItem", JSON.stringify(Cart));
  };

  const initialState = {
    Theme,
    setTheme,
    Cart,
    setCart,
    addToCart,
  };

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
export default ContextProvider;
