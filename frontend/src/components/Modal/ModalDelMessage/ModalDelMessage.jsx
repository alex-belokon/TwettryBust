import { deleteUserMessage } from "../../../api/messages";
import ModalWrapper from "../ModalElements/ModalWrapper";
import "./ModalDelMessage.scss";

export default function ModalDelMessage({setDialog, closeModal, messageId, setMessageId, dialog}) {

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
        <h2 className="delMessage__title">Видалити повідомлення?</h2>
        <p className="delMessage__text">Це повідомлення буде видалено для вас. Інші люди в розмові все одно його бачитимуть.</p>
        <div className="delMessage__btnWrapper">
          <button className="delMessage__btn--accent" onClick={delMessage}>Видалити</button>
          <button className="delMessage__btn" onClick={closeModal}>
            Скасувати
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
