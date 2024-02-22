import ModalWrapper from "../ModalElements/ModalWrapper";
import { RxCross2 } from "react-icons/rx";
import Searching from "../../Messages/Searching/Searching";
import { useState } from "react";
import { useEffect } from "react";
import { getUserDialogs } from "../../../api/messages";
import { useSelector } from "react-redux";
import SkeletonMessage from "../../../skeletons/SkeletonMessage";
import "./modalNewMessage.style.scss";
import UserMessageCard from "../../Messages/UserMessageCard/UserMessageCard";
import { findUser } from "../../../api/profile";
import NewDialogCard from "./NewDialogCard/NewDialogCard";

export default function ModalNewMessage({ closeModal }) {
  const [userDialogs, setUserDialogs] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);
  const [searchingData, setSearchingData] = useState("");
  const userId = useSelector((state) => state.authUser.user.id);
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    getUsersDialogs();
  }, []);

  useEffect(() => {
    if (searchingData && searchingData.trim() !== "") {
      getSearchUsers();
    }
  }, [searchingData]);

  async function getSearchUsers() {
    try {
      const data = await findUser(searchingData);
      setSearchUsers(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getUsersDialogs() {
    try {
      const data = await getUserDialogs(userId);
      setUserDialogs(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="modalEditProfile__header">
        <RxCross2 className="modal__crossBtn" onClick={closeModal} />
        <h3 className="modalEditProfile__title">Нове повідомлення</h3>
      </div>
      <div className="modalEditProfile__searching">
        <Searching
          placeholder="Пошук людей"
          isItModal
          setSearchingData={setSearchingData}
          searchingData={searchingData}
          isInputFocus={isInputFocus}
          setIsInputFocus={setIsInputFocus}
        ></Searching>
      </div>
      <div className="modalNewMessage__content">
        {userDialogs && searchingData === '' &&
          userDialogs.map((userCard) => (
            <UserMessageCard
              closeModal={closeModal}
              key={userCard.id}
              userData={userCard}
              search
            ></UserMessageCard>
          ))}
        {searchUsers && searchingData !== '' &&
          searchUsers.map((user) => (
            <NewDialogCard
              closeModal={closeModal}
              key={user.userName}
              user={user}
            ></NewDialogCard>
          ))}
          {!userDialogs && searchingData === '' && <SkeletonMessage></SkeletonMessage>}
          {searchUsers && searchUsers.length === 0 && searchingData !== '' && <p className="modalNewMessage__text">тут будуть ваші результати пошуку</p>}
      </div>
    </ModalWrapper>
  );
}
