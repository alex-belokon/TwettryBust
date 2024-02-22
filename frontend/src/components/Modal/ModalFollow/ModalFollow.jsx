import ModalWrapper from "../ModalElements/ModalWrapper";
import "./modalFollow.style.scss";

export default function ModalFollow({ closeModal, userData, toggleFollowing, isItFollowing }) {

  const userName = userData.firstName || userData.lastName ? `${userData.firstName} ${userData.lastName}` : userData.email;

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="modalFollow">
        <h3 className="modalFollow__title">{isItFollowing ? 'Unfollow' : 'Follow'} {userName} ?</h3>
        <p className="modalFollow__text">
        {isItFollowing 
          ? 'Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected.' 
          : 'Their posts will be displayed in your For You timeline. You can also view their profile.'} 
        </p>
        <div className="modalFollow__btnWrapper">
          <button className="modalFollow__btn" onClick={toggleFollowing}>{isItFollowing ? 'Unfollow' : 'Follow'}</button>
          <button className="modalFollow__btnReverse" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
