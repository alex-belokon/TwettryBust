import { useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import PopupDelChat from "../../Modal/Popup/PopupDelChat";
import "./BtnDelChat.scss";

export default function BtnDelChat({ chatId, setChats, chats }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <button type="button" className="delChat__infoHeaderBtn">
      <GoKebabHorizontal
        className="delChat__icon"
        onClick={() => setIsPopupOpen(true)}
      />
      {isPopupOpen && (
        <PopupDelChat closePopup={() => setIsPopupOpen(false)} chatId={chatId} setChats={setChats} chats={chats}></PopupDelChat>
      )}
    </button>
  );
}
