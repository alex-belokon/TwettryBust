import { useTranslation } from "react-i18next";

import ModalWrapper from "../ModalElements/ModalWrapper";
import Button from "../../Buttons/Button/Button";

export default function ModalAfterSigIn({ closeModal }) {
  const { t } = useTranslation();

  return (
    <ModalWrapper
      modalBodyAfterSignIn
    >
      <div className="modal-after-sign-in__wrapper">
        <h2 className="modal__title">{t("modalSignUp.modalAfterSignUp.title")}</h2>
        <p className="modal-after-sign-in__text">
          {t("modalSignUp.modalAfterSignUp.text")}  
        </p>
        <Button modalBtnReg onClick={closeModal}>OK</Button>
      </div>
    </ModalWrapper>
  );
}
