import ModalWrapper from "../ModalElements/ModalWrapper";
import "./modalFollow.style.scss";

export default function ModalFollow({ closeModal, userName, toggleFollowing }) {
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="modalFollow">
        <h3 className="modalFollow__title">Unfollow {userName} ?</h3>
        <p className="modalFollow__text">
          Their posts will no longer show up in your For You timeline. You can
          still view their profile, unless their posts are protected.
        </p>
        <div className="modalFollow__btnWrapper">
          <button className="modalFollow__btn" onClick={toggleFollowing}>Unfollow</button>
          <button className="modalFollow__btnReverse" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
