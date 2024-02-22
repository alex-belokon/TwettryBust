import Popup from "./Popup";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalWrapper from "../ModalElements/ModalWrapper";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/userAuth";

export default function PopupLogOut({ closePopup }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div style={{width: '250px', position: 'absolute', bottom: '40px'}}>
      <Popup closePopup={closePopup}>
        <div className="btnWrapper">
          <button className="btnPopup" onClick={() => setIsModalOpen(true)}>
            {t("btn.existingAccount")}
          </button>
          <button onClick={handleLogOut} className="btnPopup">
            {t("btn.logOut")}
          </button>
        </div>
        {isModalOpen && (
          <ModalWrapper closeModal={() => setIsModalOpen(false)}></ModalWrapper>
        )}
      </Popup>
    </div>
  );
}

PopupLogOut.propTypes = {
  closePopup: PropTypes.func,
};
