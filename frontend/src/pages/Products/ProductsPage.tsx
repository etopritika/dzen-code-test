import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import { fetchOrders } from "@/store/ordersSlice";
import { useProductsFilter } from "@/hooks/useProductsFilter";
import VirtualizedProductList from "./VirtualizedProductList";

const ProductsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    list: products,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const { selectedType, setSelectedType, types, filteredProducts } =
    useProductsFilter(products);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="mt-4 mb-4">
        <h2 className="mb-4">{t("products.title")}</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-4 mb-4">
        <h2 className="mb-4">{t("products.title")}</h2>
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="mt-4 mb-4">
      <h2 className="mb-4">
        {t("products.title")} / {products.length}
      </h2>
      <div className="mb-4">
        <select
          className="form-select"
          style={{ maxWidth: "300px" }}
          value={selectedType}
          onChange={handleTypeChange}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "All types" : type}
            </option>
          ))}
        </select>
      </div>
      <VirtualizedProductList products={filteredProducts} />
    </section>
  );
};

export default ProductsPage;
