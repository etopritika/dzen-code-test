import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/layout/Layout";
import OrdersPage from "@/pages/Orders/OrdersPage";
import OrderDetails from "@/pages/Orders/OrderDetails";
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
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
]);
