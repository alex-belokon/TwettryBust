import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleFollow } from "../../api/profile";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";

export default function BtnFollow({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [isItFollowing, setIsItFollowing] = useState(userData.isFollowing);
  const { id } = useParams();

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
      <button
        className={
          isItFollowing ? "userCard__btn" : "userCard__btn--reverse"
        }
        aria-label="Following or Unfollow"
        onClick={() => setIsModalOpen(true)}
      >
        {isItFollowing ? "Unfollow" : "Follow"}
      </button>

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
