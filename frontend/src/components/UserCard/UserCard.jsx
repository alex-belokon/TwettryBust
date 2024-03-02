import { useState } from "react";
import { Link } from "react-router-dom";
import { avatarColor } from "../../utils/avatarColor";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";
import BtnFollow from "./BtnFollow";
import "./userCard.style.scss";

export default function UserCard({ userCard, isShowButton = true, linkToDialog=false, closeModal }) {

  const handleLinkClick = () => {
    linkToDialog && closeModal();
  };

  return (
    <div className="userCardWrapper">
      <Link to={linkToDialog ? `/messages/${userCard.id}` : `/profile/${userCard.id}`} className="userCard"  onClick={handleLinkClick}>
        {userCard.avatar
          ? <img
          className="userCard__img"
          src={userCard.avatar}
          alt={userCard.firstName}
        /> 
        : <div className={`userCard__img ${avatarColor(userCard?.userName?.[0]  || "U")}`}>{userCard?.userName?.[0] || 'U'}</div>} 
        <div className="userCard__dataWrapper">
          <p className="userCard__name">
            {userCard.firstName || userCard.lastName ? `${userCard?.firstName || ''} ${userCard?.lastName || ''}` : 'User'}
          </p>
          <p className="userCard__login">
            {userCard.userName}
            {userCard.following && (
              <span className="userCard__login--marker">Follows you</span>
            )}
          </p>
          <p className="userCard__bio">{userCard.bio}</p>
        </div>
      </Link>

      {isShowButton && <BtnFollow userData={userCard}></BtnFollow>}
    </div>
  );
}
