import { useTranslation } from "react-i18next";
import type { Order } from "@/store/ordersSlice";
import ModalWrapper from "@/components/ModalWrapper";

interface DeletePopupProps {
  order: Order;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePopup = ({ order, onCancel, onConfirm }: DeletePopupProps) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper onClose={onCancel}>
      <div style={{ minWidth: "400px" }}>
        <h5 className="mb-3">{t("deletePopup.title")}</h5>
        <p className="mb-4">
          {t("deletePopup.message")} "<strong>{order.title}</strong>"?
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {t("buttons.cancel")}
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            {t("buttons.delete")}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeletePopup;
