import { createPortal } from "react-dom";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import cx from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./modalElements.style.scss";

export default function ModalWrapper({
  closeModal,
  children,
  className,
  modalBodyCloseIconAuth,
  modalBodyAuth,
  modalBodyWrapperAuth,
  showCloseIcon = false,
  goBackOnClose = false,
}) {
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const modalRoot = document.getElementById("modal-root");
  const modalRef = useRef(null);

  function closeModalWindow(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  const handleClose = () => {
    setIsClosing(true);
    if (goBackOnClose) {
      navigate(-1); // переход назад, если goBackOnClose === true
    } else {
      closeModal(); // обычное закрытие, если goBackOnClose === false
    }
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
        <div className={cx("modal__bodyWrapper", className, {
          "modal__bodyWrapper-auth": modalBodyWrapperAuth,
        })}>
          <div
            ref={modalRef}
            className={cx("modal__body", className, {
              "modal__body-auth": modalBodyAuth,
            })}
          >
            {showCloseIcon && (
              <AiOutlineClose
                className={cx("modal__body-close-icon", className, {
                  "modal__body-close-icon-auth": modalBodyCloseIconAuth,
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
