import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleFollow } from "../../api/profile";
import { addDelFollow } from "../../redux/changeFollow";
import ModalFollow from "../Modal/ModalFollow/ModalFollow";
import { useTranslation } from "react-i18next";
import {sendDataNotification} from "../../redux/chatWebSocket.js"
export default function BtnFollow({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [isItFollowing, setIsItFollowing] = useState(
    userData.isFollowedByCurrent || userData.isFollowed
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const isCurrentUser = currentUserId === userData.id;
const { t } = useTranslation();

  async function toggleFollowing() {
    const idUser = userData.id ? userData.id : id;
    try {
    const response = await toggleFollow(idUser);
      setIsModalOpen(false);
      dispatch(addDelFollow());

      dispatch (sendDataNotification({notificationType: "USER_SUBSCRIPTION", sender: currentUserId, receiver: idUser}));

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
          {isItFollowing ? t("btn.unsubscribe") : t("btn.follow")}
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
