import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";
import BtnFollow from "./BtnFollow";
import "./userCard.style.scss";
import { useTranslation } from "react-i18next";
export default function UserCard({ userCard, isShowButton = true, linkToDialog=false, closeModal }) {

  const handleLinkClick = () => {
    linkToDialog && closeModal();
  };
const { t } = useTranslation();
  return (
    <div className="userCardWrapper">
      <Link
        to={
          linkToDialog ? `/messages/${userCard.id}` : `/profile/${userCard.id}`
        }
        className="userCard"
        onClick={handleLinkClick}
      >
        <UserAvatar
          userName={userCard?.userName}
          userAvatar={userCard.avatar}
        ></UserAvatar>
        <div className="userCard__dataWrapper">
          <p className="userCard__name">
            {userCard.firstName || userCard.lastName
              ? `${userCard?.firstName || ""} ${userCard?.lastName || ""}`
              : "User"}
          </p>
          <p className="userCard__login">
            {userCard.userName}
            {userCard.following && (
              <span className="userCard__login--marker">
                {t("profile .follows")}
              </span>
            )}
          </p>
          <p className="userCard__bio">{userCard.bio}</p>
        </div>
      </Link>

      {isShowButton && <BtnFollow userData={userCard}></BtnFollow>}
    </div>
  );
}
