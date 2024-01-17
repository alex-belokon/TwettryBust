import { createPortal } from "react-dom";
import "./modalElements.style.scss";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";


export default function ModalWrapper({closeModal, isModalPost=false}) {
  const modalRoot = document.getElementById("modal-root");

  function closeModalWindow(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return createPortal(
    <div className="modal__bg" onClick={(e)=> closeModalWindow(e)}>
      <div className="modal__body">
        <div className="modal__btnWrapper">
          <RxCross2 className="modal__crossBtn" onClick={closeModal}/>
          {isModalPost && <button className="modal__draftsBtn">Drafts</button>}
        </div>
        <div className="modal__body">
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