import { createPortal } from "react-dom";
import type { Order } from "@/store/ordersSlice";

interface DeletePopupProps {
  order: Order;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePopup = ({ order, onCancel, onConfirm }: DeletePopupProps) => {
  return createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded p-4 animate__animated animate__fadeInDown"
        style={{ minWidth: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="mb-3">Delete order?</h5>
        <p className="mb-4">
          Are you sure you want to delete "<strong>{order.title}</strong>"?
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeletePopup;
