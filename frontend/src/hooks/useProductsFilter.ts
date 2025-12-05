import { useState, useEffect } from "react";
import type { Product } from "@/store/ordersSlice";

export function useProductsFilter(products: Product[]) {
  const stored = localStorage.getItem("selectedType") ?? "all";
  const [selectedType, setSelectedType] = useState(stored);

  useEffect(() => {
    localStorage.setItem("selectedType", selectedType);
  }, [selectedType]);

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
