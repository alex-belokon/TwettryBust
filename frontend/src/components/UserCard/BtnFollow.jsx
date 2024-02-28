import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleFollow } from "../../api/profile";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";

export default function BtnFollow({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.user.user.id);
  const [isItFollowing, setIsItFollowing] = useState(
    userData.isFollowedByCurrent || userData.isFollowed
  );
  const { id } = useParams();
  const isCurrentUser = currentUserId === userData.id;

  async function toggleFollowing() {
    const idUser = userData.id ? userData.id : id;
    try {
      await toggleFollow(currentUserId, idUser);
      setIsModalOpen(false);
      setIsItFollowing((prevState) => !prevState);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {!isCurrentUser && (
        <button
          className={isItFollowing ? "userCard__btn" : "userCard__btn--reverse"}
          aria-label="Following or Unfollow"
          onClick={() => setIsModalOpen(true)}
        >
          {isItFollowing ? "Unfollow" : "Follow"}
        </button>
      )}

      {isModalOpen && (
        <ModalFollow
          userData={userData}
          isItFollowing={isItFollowing}
          closeModal={() => setIsModalOpen(false)}
          toggleFollowing={toggleFollowing}
        ></ModalFollow>
      )}
    </>
  );
}
