import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoKebabHorizontal } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { deleteUserChat } from "../../../api/messages";
import PopupDelChat from "../../Modal/Popup/PopupDelChat";
import "./BtnDelChat.scss";

export default function BtnDelChat({ chatId, setChats, chats }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    <button type="button" className="delChat__infoHeaderBtn" aria-label='open popup delete chat'>
      <GoKebabHorizontal
        className="delChat__icon"
        onClick={() => setIsPopupOpen(true)}
      />
      {isPopupOpen && (
        <PopupDelChat closePopup={() => setIsPopupOpen(false)} delChat={delChat}></PopupDelChat>
      )}
    </button>
  );
}
