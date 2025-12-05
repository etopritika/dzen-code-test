import { useEffect, useRef } from "react";
import type { Order } from "@/store/ordersSlice";

export function usePersistedSelectedOrder(
  orders: Order[],
  selectedOrder: Order | null,
  setSelectedOrder: (order: Order | null) => void
) {
  const restoredRef = useRef(false);

  useEffect(() => {
    if (selectedOrder) {
      localStorage.setItem("selectedOrderId", String(selectedOrder.id));
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (restoredRef.current) return;

    const saved = localStorage.getItem("selectedOrderId");
    if (saved && orders.length > 0) {
      const found = orders.find((o) => o.id === Number(saved));
      if (found) {
        setSelectedOrder(found);
        restoredRef.current = true;
      }
    }
  }, [orders, setSelectedOrder]);
}

