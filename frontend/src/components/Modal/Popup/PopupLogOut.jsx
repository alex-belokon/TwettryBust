import Popup from "./Popup";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalWrapper from '../ModalElements/ModalWrapper';
import { useTranslation } from "react-i18next";

export default function PopupLogOut({ closePopup }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } =useTranslation();
  
  return (
    <Popup closePopup={closePopup}>
      <div className="btnWrapper">
        <button className="btn" onClick={()=>setIsModalOpen(true)}>{t('btn.existingAccount')}</button>
        <button className="btn">{t('btn.logOut')}</button>
      </div>
      {isModalOpen && <ModalWrapper closeModal={()=>setIsModalOpen(false)}></ModalWrapper>}
    </Popup>
  );
}

PopupLogOut.propTypes = {
  closePopup: PropTypes.func,
};
