import Popup from "./Popup";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalWrapper from '../ModalElements/ModalWrapper';

export default function PopupLogOut({ closePopup }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <Popup closePopup={closePopup}>
      <div className="btnWrapper">
        <button className="btn" onClick={()=>setIsModalOpen(true)}>Add an existing account</button>
        <button className="btn">Log out</button>
      </div>
      {isModalOpen && <ModalWrapper closeModal={()=>setIsModalOpen(false)}></ModalWrapper>}
    </Popup>
  );
}

PopupLogOut.propTypes = {
  closePopup: PropTypes.func,
};
