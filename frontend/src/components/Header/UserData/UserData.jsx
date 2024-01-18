import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PopupLogOut from "../../Modal/Popup/PopupLogOut";
import "./userData.style.scss";

export default function UserData() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const userData = {
    name: "User User",
    email: "user@gmai.com",
    // img: 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg?w=740&t=st=1705548515~exp=1705549115~hmac=4b02fd40c212afb54a0fc35c96b35b501167a0e1d0e2cbf9738768903ea50694',
    img: null,
  };

  return (
    <div className="userData__wrapper">
      {isPopupOpen && (
        <PopupLogOut closePopup={() => setIsPopupOpen(false)}></PopupLogOut>
      )}

      <div className="userData">
        <div className="userData__screensaver">
          {userData.img ? (
            <img className="userData__img" src={userData.img} alt={userData.name + " photo"} />
          ) : (
            <span>{`${userData.name}`.split("")[0]}</span>
          )}
        </div>
        <div className="userData__info">
          <p className="userData__name">{userData.name}</p>
          <p className="userData__email">{userData.email}</p>
        </div>
        <button
          aria-label="open window log out"
          className="btn"
          onClick={() => setIsPopupOpen(true)}
        >
          <HiOutlineDotsHorizontal />
        </button>
      </div>
    </div>
  );
}
