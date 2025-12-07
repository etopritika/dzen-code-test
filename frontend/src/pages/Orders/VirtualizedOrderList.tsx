import { Virtuoso } from "react-virtuoso";
import type { Order } from "@/store/ordersSlice";
import OrderItem from "@/pages/Orders/OrderItem";

interface VirtualizedOrderListProps {
  orders: Order[];
  onSelect: (order: Order) => void;
  onDelete: (order: Order) => void;
}

const VirtualizedOrderList = ({
  orders,
  onSelect,
  onDelete,
}: VirtualizedOrderListProps) => {
  return (
    <div
      style={{ height: "80vh" }}
      className="d-flex flex-column overflow-auto"
    >
      <Virtuoso
        data={orders}
        totalCount={orders.length}
        computeItemKey={(_, order) => order.id}
        itemContent={(_, order) => (
          <div className="mb-3">
            <OrderItem order={order} onSelect={onSelect} onDelete={onDelete} />
          </div>
        )}
      />
    </div>
  );
};

export default VirtualizedOrderList;
