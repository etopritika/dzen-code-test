import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/layout/Layout";
import OrdersPage from "@/pages/Orders/OrdersPage";
import ProductsPage from "@/pages/Products/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/orders" replace />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
]);
