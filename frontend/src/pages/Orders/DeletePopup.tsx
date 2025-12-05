import type { Order } from "@/store/ordersSlice";
import ModalWrapper from "@/components/ModalWrapper";

interface DeletePopupProps {
  order: Order;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePopup = ({ order, onCancel, onConfirm }: DeletePopupProps) => {
  return (
    <ModalWrapper onClose={onCancel}>
      <div style={{ minWidth: "400px" }}>
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
    </ModalWrapper>
  );
};

export default DeletePopup;
