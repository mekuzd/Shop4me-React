import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import "./index.css";
import ContextProvider from "../Provider/Context";
import { ChakraProvider } from "@chakra-ui/react";
import Cart from "./pages/Cart";
import { Suspense } from "react";

const App = React.lazy(() => import("./App"));
const Login = React.lazy(() => import("./pages/login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Products = React.lazy(() => import("./pages/products"));
const Productsview = React.lazy(() => import("./pages/Productsview"));
const Error404 = React.lazy(() => import("./pages/error404"));

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
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextProvider>
        <Suspense
          fallback={
            <div className="loading ">
              <div className="text-warning spinner-border"></div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
