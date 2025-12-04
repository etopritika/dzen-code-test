import { useState } from "react";
import type { Product } from "@/store/ordersSlice";

export function useProductsFilter(products: Product[]) {
  const [selectedType, setSelectedType] = useState("all");

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
