import { useState } from "react";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";
import "./userCard.style.scss";

export default function UserCard({ userCard }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = userCard.login;

  return (
    <div className="userCard">
      <img
        className="userCard__img"
        src={userCard.userScreensaver}
        alt={userCard.name}
      />
      <div className="userCard__dataWrapper">
        <p className="userCard__name">{userCard.name + userCard.lastName}</p>
        <p className="userCard__login">
          {userCard.login}  {userCard.isFollows && <span className="userCard__login--marker">Follows you</span>} 
        </p>
        <p className="userCard__bio">{userCard.bio}</p>
      </div>
      <button className="userCard__btn" aria-label="Following or Unfollow" onClick={()=>setIsModalOpen(true)}></button>
      {isModalOpen && <ModalFollow userName={userName} closeModal={()=>setIsModalOpen(false)}></ModalFollow>}
    </div>
  );
}
