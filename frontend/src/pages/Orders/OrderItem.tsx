import type { Order } from "@/store/ordersSlice";
import { getProductsCount, getSumUSD, getSumUAH } from "@/utils/orderHelpers";
import { formatShortDate, formatFullDate } from "@/utils/formatDate";

interface OrderItemProps {
  order: Order;
  onSelect: (order: Order) => void;
  onDelete: (order: Order) => void;
}

const OrderItem = ({ order, onSelect, onDelete }: OrderItemProps) => {
  const productCount = getProductsCount(order);
  const sumUSD = getSumUSD(order);
  const sumUAH = getSumUAH(order);
  const shortDate = formatShortDate(order.date);
  const fullDate = formatFullDate(order.date);

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
          <p className="card-text small text-muted mb-1">{shortDate}</p>
          <p className="card-text small text-muted mb-1">{fullDate}</p>
          <p className="card-text small text-muted">
            {sumUSD} USD / {sumUAH} UAH
          </p>
        </div>
        <div className="ms-3">
          <button
            type="button"
            className="btn btn-link text-danger p-0"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(order);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
