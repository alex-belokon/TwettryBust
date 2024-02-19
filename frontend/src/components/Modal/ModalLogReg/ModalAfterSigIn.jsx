import { useTranslation } from "react-i18next";

import ModalWrapper from "../ModalElements/ModalWrapper";

export default function ModalAfterSigIn({ closeModal }) {
  const { t } = useTranslation();

  return (
    <ModalWrapper showCloseIcon modalBodyCloseIconAuth>
      <div className="modal-after-sign-in__wrapper">
        <h2 className="modal__title">Подтверждение адреса электронной почты</h2>
        <p className="modal-after-sign-in__text">
          Поздравляем! Вы успешно зарегистрировались на нашем ресурсе. Чтобы
          завершить процесс регистрации, необходимо подтвердить ваш адрес
          электронной почты. На указанный вами адрес электронной почты было
          отправлено письмо с ссылкой для подтверждения. Пожалуйста, проверьте
          свою электронную почту и следуйте инструкциям в письме. Если вы не
          получили письмо в течение нескольких минут, пожалуйста, проверьте
          папку "Спам". Если вы все еще не можете найти письмо, свяжитесь с
          нашей службой поддержки. После успешного подтверждения адреса
          электронной почты вы сможете войти в свой аккаунт и начать
          использовать TwettryBust. Благодарим вас за регистрацию!
        </p>
        <button onClick={closeModal}>ok</button>
      </div>
    </ModalWrapper>
  );
}
