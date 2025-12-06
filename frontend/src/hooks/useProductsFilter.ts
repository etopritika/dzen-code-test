import type { Product } from "@/store/ordersSlice";
import { useLocalStorage } from "./useLocalStorage";

export function useProductsFilter(products: Product[]) {
  const [selectedType, setSelectedType] = useLocalStorage<string>(
    "selectedType",
    "all"
  );

  const types = ["all", ...Array.from(new Set(products.map((p) => p.type)))];

  const filteredProducts =
    selectedType === "all"
      ? products
      : products.filter((p) => p.type === selectedType);

  return {
    selectedType,
    setSelectedType,
    types,
    filteredProducts,
  };
}
