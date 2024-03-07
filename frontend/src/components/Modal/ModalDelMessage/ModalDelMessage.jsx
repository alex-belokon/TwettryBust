import { deleteUserMessage } from "../../../api/messages";
import ModalWrapper from "../ModalElements/ModalWrapper";
import "./ModalDelMessage.scss";
import { useTranslation } from "react-i18next";
export default function ModalDelMessage({setDialog, closeModal, messageId, setMessageId, dialog}) {
const { t } = useTranslation();
  function delMessage () {
    deleteMessageFetch();

    setMessageId(null);
    closeModal();
    const updateDialog = dialog.filter(item => item.id !== messageId);
    setDialog(updateDialog)
  }

  async function deleteMessageFetch () {
    try {
      const data = await deleteUserMessage(messageId);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="delMessage__wrapper">
        <h2 className="delMessage__title">{t("delete.message")}</h2>
        <p className="delMessage__text">{t("messages.deleteInfo")}</p>
        <div className="delMessage__btnWrapper">
          <button className="delMessage__btn--accent" onClick={delMessage}>
            {t("btn.delete")}
          </button>
          <button className="delMessage__btn" onClick={closeModal}>
            {t("btn.cancel")}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
