import { createPortal } from "react-dom";
import "./modalElements.style.scss";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import cx from "classnames";


export default function ModalWrapper({closeModal, isModalPost=false, children, modalBodyLogIn=false}) {
  const modalRoot = document.getElementById("modal-root");
  const { t } = useTranslation();

  function closeModalWindow(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return createPortal(
    <div className="modal__bg" onClick={(e)=> closeModalWindow(e)}>
      <div className={cx('modal__body', {'modal__body-login': modalBodyLogIn})}>
        <div className="modal__btnWrapper">
          <RxCross2 className="modal__crossBtn" onClick={closeModal}/>
          {isModalPost && <button className="modal__draftsBtn">{t('btn.drafts')}</button>}

        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}


ModalWrapper.propTypes = {
  closeModal: PropTypes.func,
  isModalPost: PropTypes.bool,
};