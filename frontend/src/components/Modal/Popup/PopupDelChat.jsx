import { GoCircleSlash } from "react-icons/go";
import { deleteUserChat } from "../../../api/messages";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

export default function PopupDelChat({ closePopup, chatId, chats, setChats }) {
  const navigate = useNavigate();
  
  async function delChat() {
    try {
      await deleteUserChat(chatId);
      const filteredChats = chats.filter(elem => elem.id !== chatId)
      setChats(filteredChats);
      navigate('/messages');
      closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="popupDelChat" onClick={closePopup}>
      <Popup closePopup={closePopup}>
        <button className="popupDelChat__wrapper" onClick={delChat}>
          <GoCircleSlash className="popupDelChat__icon" /> "Видалити чат"
        </button>
      </Popup>
    </div>
  );
}
