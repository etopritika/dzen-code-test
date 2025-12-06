import { useEffect, useRef } from "react";
import type { Order } from "@/store/ordersSlice";
import { useLocalStorage } from "./useLocalStorage";

export function usePersistedSelectedOrder(
  orders: Order[],
  selectedOrder: Order | null,
  setSelectedOrder: (order: Order | null) => void
) {
  const restoredRef = useRef(false);
  const [savedOrderId, setSavedOrderId] = useLocalStorage<number | null>(
    "selectedOrderId",
    null
  );

  useEffect(() => {
    if (selectedOrder) {
      setSavedOrderId(selectedOrder.id);
    }
  }, [selectedOrder, setSavedOrderId]);

  useEffect(() => {
    if (restoredRef.current) return;

    if (savedOrderId && orders.length > 0) {
      const found = orders.find((o) => o.id === savedOrderId);
      if (found) {
        setSelectedOrder(found);
        restoredRef.current = true;
      }
    }
  }, [orders, savedOrderId, setSelectedOrder]);
}
