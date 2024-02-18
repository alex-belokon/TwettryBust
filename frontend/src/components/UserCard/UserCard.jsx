import { useState } from "react";
import { Link } from "react-router-dom";
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
        <img
          className="userCard__img"
          src={userCard.userScreensaver}
          alt={userCard.name}
        />
        <div className="userCard__dataWrapper">
          <p className="userCard__name">
            {userCard.name + " " + userCard.lastName}
          </p>
          <p className="userCard__login">
            {userCard.login}{" "}
            {userCard.following && (
              <span className="userCard__login--marker">Follows you</span>
            )}
          </p>
          <p className="userCard__bio">{userCard.bio}</p>
        </div>
      </Link>

      {isShowButton && <BtnFollow userLogin={userCard.login}></BtnFollow>}
    </div>
  );
}
