import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import { fetchOrders, type Order } from "@/store/ordersSlice";
import { usePersistedSelectedOrder } from "@/hooks/usePersistedSelectedOrder";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
import DeletePopup from "./DeletePopup";

const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    list: orders,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  usePersistedSelectedOrder(orders, selectedOrder, setSelectedOrder);

  const handleSelect = useCallback((order: Order) => {
    setSelectedOrder(order);
  }, []);

  const handleDelete = useCallback((order: Order) => {
    setOrderToDelete(order);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setOrderToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setOrderToDelete(null);
  }, []);

  if (loading) {
    return (
      <section className="mt-4 mb-4">
        <h2 className="mb-4">
          {t("orders.title")} / {orders.length}
        </h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-4 mb-4">
        <h2 className="mb-4">
          {t("orders.title")} / {orders.length}
        </h2>
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="mt-4 mb-4">
      <h2 className="mb-4">
        {t("orders.title")} / {orders.length}
      </h2>
      <div className="row">
        <div className="col-6">
          <OrderList
            orders={orders}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </div>
        <div className="col-6">
          <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
        </div>
      </div>
      {orderToDelete && (
        <DeletePopup
          order={orderToDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
};

export default OrdersPage;
