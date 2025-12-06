import type { Product } from "@/store/ordersSlice";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ul className="list-unstyled d-flex flex-column gap-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
