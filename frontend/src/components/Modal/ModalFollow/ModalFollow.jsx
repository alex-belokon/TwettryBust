import ModalWrapper from "../ModalElements/ModalWrapper";
import "./modalFollow.style.scss";
import { useTranslation } from "react-i18next";
export default function ModalFollow({ closeModal, userData, toggleFollowing, isItFollowing }) {
const { t } = useTranslation();
  const userName = userData.firstName || userData.lastName ? `${userData.firstName} ${userData.lastName}` : userData.email;

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="modalFollow">
        <h3 className="modalFollow__title">
          {isItFollowing ? t("btn.unsubscribe") : t("btn.follow")} {userName} ?
        </h3>
        <p className="modalFollow__text">
          {isItFollowing
            ? t("profile.modalUnfollow")
            : t("profile.modalFollow")}
        </p>
        <div className="modalFollow__btnWrapper">
          <button className="modalFollow__btn" onClick={toggleFollowing}>
            {isItFollowing ? t("btn.unsubscribe") : t("btn.follow")}
          </button>
          <button className="modalFollow__btnReverse" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
