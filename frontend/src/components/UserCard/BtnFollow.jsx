import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsersFollowers, toggleFollow } from "../../api/profile";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";

export default function BtnFollow({ userLogin, userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [isItFollowing, setIsItFollowing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getFollowing();
  }, [id]);

  async function getFollowing() {
    try {
      const data = await getUsersFollowers(currentUserId);
      setIsItFollowing(data.some((elem) => elem.id === id));
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleFollowing () {
    try {
     await toggleFollow(currentUserId, id);
      setIsModalOpen(false);
      setIsItFollowing(prevState => !prevState)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {isItFollowing ? (
        <button
          className="userCard__btn"
          aria-label="Following or Unfollow"
          onClick={() => setIsModalOpen(true)}
        ></button>
      ) : (
        <button
          className="userCard__btn--reverse"
          aria-label="Following or Unfollow"
          onClick={() => setIsModalOpen(true)}
        ></button>
      )}

      {isModalOpen && (
        <ModalFollow
          userName={userLogin}
          closeModal={() => setIsModalOpen(false)}
          toggleFollowing={toggleFollowing}
        ></ModalFollow>
      )}
    </>
  );
}
