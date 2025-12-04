import type { Order } from "./OrdersPage";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
  onSelect: (order: Order) => void;
}

const OrderList = ({ orders, onSelect }: OrderListProps) => {
  return (
    <ul className="list-unstyled d-flex flex-column gap-3">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderItem order={order} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
