import type { Order } from "./OrdersPage";

interface OrderDetailsProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  if (!order) {
    return (
      <aside className="border-start p-4">
        <div className="text-muted">Select an order</div>
      </aside>
    );
  }

  return (
    <aside className="border-start p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h5>{order.title}</h5>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={onClose}
          type="button"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <p className="text-muted">{order.description}</p>
    </aside>
  );
};

export default OrderDetails;
