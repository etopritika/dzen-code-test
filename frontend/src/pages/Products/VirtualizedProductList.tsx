import { Virtuoso } from "react-virtuoso";
import type { Product } from "@/store/ordersSlice";
import ProductItem from "@/pages/Products/ProductItem";

interface VirtualizedProductListProps {
  products: Product[];
}

const VirtualizedProductList = ({ products }: VirtualizedProductListProps) => {
  return (
    <div
      style={{ height: "80vh" }}
      className="d-flex flex-column overflow-auto"
    >
      <Virtuoso
        data={products}
        totalCount={products.length}
        computeItemKey={(_, product) => product.id}
        itemContent={(_, product) => (
          <div className="mb-3">
            <ProductItem product={product} />
          </div>
        )}
      />
    </div>
  );
};

export default VirtualizedProductList;
