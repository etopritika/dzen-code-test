import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/layout/Layout";

const OrdersPage = lazy(() => import("@/pages/Orders/OrdersPage"));
const ProductsPage = lazy(() => import("@/pages/Products/ProductsPage"));
const ReportsPage = lazy(() => import("@/pages/Reports/ReportsPage"));
const MapPage = lazy(() => import("@/pages/Map/MapPage"));

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
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
    ],
  },
]);
