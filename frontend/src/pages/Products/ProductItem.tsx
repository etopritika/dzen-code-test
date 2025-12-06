import { useAppSelector } from "@/store";
import type { Product } from "@/store/ordersSlice";
import { formatShortDate, formatFullDate } from "@/utils/formatDate";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const orders = useAppSelector((state) => state.orders.list);
  const order = orders.find((o) => o.id === product.order);

  const usdPrice = product.price.find((p) => p.symbol === "USD");
  const uahPrice = product.price.find((p) => p.symbol === "UAH");

  const startShort = formatShortDate(product.guarantee.start);
  const startFull = formatFullDate(product.guarantee.start);
  const endShort = formatShortDate(product.guarantee.end);
  const endFull = formatFullDate(product.guarantee.end);

  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <h5 className="fw-bold mb-2">{product.title}</h5>
          <p className="text-muted mb-2">{product.type}</p>
          <div className="text-muted small mb-2">
            Guarantee:{" "}
            <time dateTime={product.guarantee.start}>{startShort}</time> –{" "}
            <time dateTime={product.guarantee.end}>{endShort}</time>
          </div>
          <div className="text-muted small mb-2">
            <time dateTime={product.guarantee.start}>{startFull}</time> –{" "}
            <time dateTime={product.guarantee.end}>{endFull}</time>
          </div>
          <div className="d-flex gap-3 mb-2">
            {usdPrice && (
              <span className="text-muted small">
                {usdPrice.value} {usdPrice.symbol}
              </span>
            )}
            {uahPrice && (
              <span className="text-muted small">
                {uahPrice.value} {uahPrice.symbol}
              </span>
            )}
          </div>
          <p className="text-muted small mb-0">
            Arrival: {order?.title ?? "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
