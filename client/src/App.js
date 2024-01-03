import React from "react";
import "@stripe/stripe-js";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import {
  Home,
  About,
  Cart,
  SingleProduct,
  Private,
  Products,
  Checkout,
  Error,
  Root,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      { path: "products/:pId", element: <SingleProduct /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
