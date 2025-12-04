import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "@/store";
import { fetchOrders, type Order } from "@/store/ordersSlice";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
import DeletePopup from "./DeletePopup";

const OrdersPage = () => {
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

  return (
    <section className="mt-4 mb-4">
      <h2 className="mb-4">Orders / 25</h2>
      <div className="row">
        <div className="col-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!loading && !error && (
            <OrderList
              orders={orders}
              onSelect={setSelectedOrder}
              onDelete={(order) => setOrderToDelete(order)}
            />
          )}
        </div>
        <div className="col-6">
          <OrderDetails
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      </div>
      {orderToDelete && (
        <DeletePopup
          order={orderToDelete}
          onCancel={() => setOrderToDelete(null)}
          onConfirm={() => {
            // no real delete logic required
            setOrderToDelete(null);
          }}
        />
      )}
    </section>
  );
};

export default OrdersPage;
