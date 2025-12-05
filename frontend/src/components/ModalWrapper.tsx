import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { PropsWithChildren } from "react";

interface ModalWrapperProps {
  onClose: () => void;
}

const ModalWrapper = ({
  onClose,
  children,
}: PropsWithChildren<ModalWrapperProps>) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center animate__animated animate__fadeIn"
      style={{ zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-4 animate__animated animate__fadeInDown"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalWrapper;
