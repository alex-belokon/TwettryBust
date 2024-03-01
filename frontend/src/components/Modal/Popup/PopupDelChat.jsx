import { GoCircleSlash } from "react-icons/go";
import { deleteUserChat } from "../../../api/messages";
import Popup from "./Popup";

export default function PopupDelChat({ closePopup, chatId, chats, setChats }) {
  
  async function delChat() {
    try {
      await deleteUserChat(chatId);
      const filteredChats = chats.filter(elem => elem.id !== chatId)
      setChats(filteredChats);
      closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="popupDelChat" onClick={delChat}>
      <Popup closePopup={closePopup}>
        <div className="popupDelChat__wrapper">
          <GoCircleSlash className="popupDelChat__icon" /> "Видалити чат"
        </div>
      </Popup>
    </div>
  );
}
