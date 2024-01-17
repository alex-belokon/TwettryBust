import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PopupLogOut from "../../Modal/Popup/PopupLogOut";
import "./userData.style.scss";

export default function UserData() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const userData = {
    name: "User User",
    email: "user@gmai.com",
  };

  return (
    <div className="userData__wrapper">
      {isPopupOpen && (
        <PopupLogOut closePopup={() => setIsPopupOpen(false)}></PopupLogOut>
      )}

      <div className="userData">
        <div className="userData__info">
          <p>{userData.name}</p>
          <p>{userData.email}</p>
        </div>
        <button aria-label="open window log out" className="btn" onClick={() => setIsPopupOpen(true)}>
          <HiOutlineDotsHorizontal />
        </button>
      </div>
    </div>
  );
}
