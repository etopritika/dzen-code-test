import type { Order } from "@/store/ordersSlice";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
  onSelect: (order: Order) => void;
  onDelete: (order: Order) => void;
}

const OrderList = ({ orders, onSelect, onDelete }: OrderListProps) => {
  return (
    <ul className="list-unstyled d-flex flex-column gap-3">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderItem order={order} onSelect={onSelect} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
