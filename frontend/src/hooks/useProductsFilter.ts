import { useMemo } from "react";
import type { Product } from "@/store/ordersSlice";
import { useLocalStorage } from "./useLocalStorage";

export function useProductsFilter(products: Product[]) {
  const [selectedType, setSelectedType] = useLocalStorage<string>(
    "selectedType",
    "all"
  );

  const types = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.type)))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      selectedType === "all"
        ? products
        : products.filter((p) => p.type === selectedType),
    [products, selectedType]
  );

  return {
    selectedType,
    setSelectedType,
    types,
    filteredProducts,
  };
}
