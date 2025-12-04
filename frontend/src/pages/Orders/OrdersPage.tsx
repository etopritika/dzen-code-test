import { useState } from "react";
import { orders } from "./mockData";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: unknown[];
}

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <section className="mt-4 mb-4">
      <h2 className="mb-4">Orders / 25</h2>
      <div className="row">
        <div className="col-6">
          <OrderList orders={orders} onSelect={setSelectedOrder} />
        </div>
        <div className="col-6">
          <OrderDetails
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
