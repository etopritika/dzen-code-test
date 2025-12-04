import type { Order } from "./OrdersPage";

interface OrderItemProps {
  order: Order;
  onSelect: (order: Order) => void;
}

const OrderItem = ({ order, onSelect }: OrderItemProps) => {
  const productCount = order.products.length;

  const handleClick = () => {
    onSelect(order);
  };

  return (
    <div
      className="card border rounded cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title">{order.title}</h5>
          <p className="card-text text-muted mb-2">{productCount} products</p>
          <p className="card-text small text-muted mb-1">Date: {order.date}</p>
          <p className="card-text small text-muted">
            Formatted date placeholder
          </p>
        </div>
        <div className="ms-3">
          <button type="button" className="btn btn-link text-danger p-0">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
