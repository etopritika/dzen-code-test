import type { Product } from "@/store/ordersSlice";

interface ProductRowProps {
  product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
  const usdPrice = product.price.find((p) => p.symbol === "USD");
  const uahPrice = product.price.find((p) => p.symbol === "UAH");

  return (
    <div className="d-flex align-items-center justify-content-between p-2 border-bottom mb-2">
      <div className="flex-grow-1">
        <div className="fw-bold mb-1">{product.title}</div>
        <div className="text-muted small">
          SN: {product.serialNumber} • {product.type}
        </div>
      </div>
      <div className="text-end ms-3">
        {usdPrice && (
          <div className="small">
            {usdPrice.value} {usdPrice.symbol}
          </div>
        )}
        {uahPrice && (
          <div className="text-muted small">
            {uahPrice.value} {uahPrice.symbol}
          </div>
        )}
      </div>
      <i className="bi bi-chevron-right text-muted ms-2"></i>
    </div>
  );
};

export default ProductRow;
