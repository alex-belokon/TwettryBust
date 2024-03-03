import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PopupLogOut from "../../Modal/Popup/PopupLogOut";
import "./userData.style.scss";
import { useSelector } from "react-redux";
import { avatarColor } from "../../../utils/avatarColor";

export default function UserData() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userData = useSelector(state => state.authUser.user);
  return (
    <div className="userData__wrapper">
      {isPopupOpen && (
        <PopupLogOut closePopup={() => setIsPopupOpen(false)}></PopupLogOut>
      )}

      <div className="userData">
        <div className={`userData__screensaver ${avatarColor(userData?.userName?.[0] ?? 'U')}`} onClick={() => setIsPopupOpen(true)}>
          {userData.avatar ? (
            <img className="userData__img" src={userData.avatar} alt="user photo" />
          ) : (
            <span>{userData?.userName?.[0] ?? 'U' }</span>
          )}
        </div>
        <div className="userData__info">
          <p className="userData__name">{userData.firstName || ''} {userData.lastName || ''}</p>
          <p className="userData__email">{userData.userName || 'Guest'}</p>
        </div>
        <button
          aria-label="open window log out"
          className="btn__open"
          onClick={() => setIsPopupOpen(true)}
        >
          <HiOutlineDotsHorizontal />
        </button>
      </div>
    </div>
  );
}
