import { createPortal } from "react-dom";
import "./modalElements.style.scss";
import PropTypes from "prop-types";

export default function ModalWrapper({ closeModal, children }) {
  const modalRoot = document.getElementById("modal-root");
  function closeModalWindow(event) {
    if (event.target === event.currentTarget) {
      closeModal();
      setShowCloseIcon(true);
    }
  }

  return createPortal(
    <div className="modal__bg" onMouseDown={(e) => closeModalWindow(e)}>
      <div className="modal__body">{children}</div>
    </div>,
    modalRoot
  );
}

ModalWrapper.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  showCloseIcon: PropTypes.bool,
};
