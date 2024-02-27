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
        <h2 className="modal__title">Подтверждение адреса электронной почты</h2>
        <p className="modal-after-sign-in__text">
          Поздравляем с успешной регистрацией! Для завершения процесса
          подтвердите свой адрес электронной почты. Проверьте папку "Спам", если
          письмо не появится в течение нескольких минут. После подтверждения вы
          сможете войти и использовать TwettryBust. Благодарим за регистрацию!
        </p>
        <Button modalBtnReg onClick={closeModal}>ok</Button>
      </div>
    </ModalWrapper>
  );
}
