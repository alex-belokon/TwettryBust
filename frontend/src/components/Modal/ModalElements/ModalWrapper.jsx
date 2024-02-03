import { createPortal } from "react-dom";
import "./modalElements.style.scss";
import PropTypes from "prop-types";
import cx from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function ModalWrapper({
  closeModal,
  children,
  modalBodyLogIn,
  className,
  showCloseIcon = false,
  modalBodySignUp,
}) {
  const [isClosing, setIsClosing] = useState(false);

  const modalRoot = document.getElementById("modal-root");
  const modalRef = useRef(null);

  function closeModalWindow(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  const handleClose = () => {
    setIsClosing(true);
  };

  return createPortal(
    <div
      className={`modal__bg ${isClosing ? "" : "visible"}`}
      onMouseDown={(e) => closeModalWindow(e)}
    >
      <CSSTransition
        in={!isClosing}
        timeout={300}
        classNames="modal"
        nodeRef={modalRef}
        onExited={closeModal}
        unmountOnExit
      >
        <div className="modal__bodyWrapper">
          <div
            ref={modalRef}
            className={cx("modal__body", className, {
              "modal__body-login": modalBodyLogIn,
              "modal__body-signup": modalBodySignUp,
            })}
          >
            {showCloseIcon && (
              <AiOutlineClose
                className={cx("modal__body-close-icon", className, {
                  "modal__body-loginIcon": modalBodyLogIn,
                })}
                onClick={handleClose}
              />
            )}
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>,
    modalRoot
  );
}

ModalWrapper.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
  showCloseIcon: PropTypes.bool,
};
