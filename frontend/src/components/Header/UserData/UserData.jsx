import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PopupLogOut from "../../Modal/Popup/PopupLogOut";
import "./userData.style.scss";
import { useSelector } from "react-redux";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function UserData() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userData = useSelector((state) => state.authUser.user);

  return (
    <div className="userData__wrapper">
      {isPopupOpen && (
        <PopupLogOut closePopup={() => setIsPopupOpen(false)}></PopupLogOut>
      )}

      <div className="userData">
        <div onClick={() => setIsPopupOpen(true)}>
          <UserAvatar
            userName={userData?.userName}
            userAvatar={userData.avatar}
          ></UserAvatar>
        </div>

        <div className="userData__info">
          <p className="userData__name">
            {userData.firstName || ""} {userData.lastName || ""}
          </p>
          <p className="userData__email">{userData.userName || "Guest"}</p>
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
