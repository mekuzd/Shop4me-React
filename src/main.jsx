import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "./pages/login";
import Error404 from "./pages/error404";
import Products from "./pages/products";
import "antd/dist/reset.css";
import Productsview from "./pages/Productsview";
import "./index.css";
import ContextProvider from "../Provider/Context";
import { ChakraProvider } from "@chakra-ui/react";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <Productsview />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
// parts of a URL
