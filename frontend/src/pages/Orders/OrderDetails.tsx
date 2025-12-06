import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Order } from "@/store/ordersSlice";
import ProductRow from "./ProductRow";
import AddProductForm from "./AddProductForm";

interface OrderDetailsProps {
  order: Order | null;
  onClose: () => void;
}

const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  const { t } = useTranslation();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  if (!order) {
    return (
      <aside className="border-start p-4">
        <div className="text-muted">Select an order</div>
      </aside>
    );
  }

  return (
    <aside
      className="border-start p-4 animate__animated animate__fadeInRight"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{order.title}</h4>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={onClose}
          type="button"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <button
        className="btn btn-light border mb-3"
        onClick={() => setIsAddProductOpen(true)}
      >
        + {t("buttons.addProduct")}
      </button>

      <div>
        {order.products.map((p) => (
          <ProductRow key={p.id} product={p} />
        ))}
      </div>

      {isAddProductOpen && (
        <AddProductForm onClose={() => setIsAddProductOpen(false)} />
      )}
    </aside>
  );
};

export default OrderDetails;
