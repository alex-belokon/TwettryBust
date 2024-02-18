import ModalWrapper from "../ModalElements/ModalWrapper";
import { RxCross2 } from "react-icons/rx";
import Searching from "../../Messages/Searching/Searching";
import { useState } from "react";
import { useEffect } from "react";
import { getUserDialogs, searchUser } from "../../../api/messages";
import UserCard from "../../UserCard/UserCard";
import { useSelector } from "react-redux";
import SkeletonMessage from "../../../skeletons/SkeletonMessage";
import "./modalNewMessage.style.scss";

export default function ModalNewMessage({ closeModal }) {
  const [dialogs, setDialogs] = useState(null);
  const [searchingData, setSearchingData] = useState(null);
  const userId = useSelector((state) => state.authUser.user.id);
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (searchingData && searchingData.trim() !== "") {
        try {
          const data = await searchUser(searchingData);
          setDialogs(data);
        } catch (e) {
          console.error(e);
        }
      } else {
        setDialogs(null);
        try {
          const data = await getUserDialogs(userId);
          setDialogs(data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [searchingData]);

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
          isInputFocus={isInputFocus}
          setIsInputFocus={setIsInputFocus}
          setChats={setDialogs}
        ></Searching>
      </div>
      <div className="modalNewMessage__content">
        {!dialogs && isInputFocus && <p className="modalNewMessage__contentText">Тут будуть результати запиту</p>}
        {!dialogs && !isInputFocus && <SkeletonMessage></SkeletonMessage>}
        {dialogs &&
          dialogs.map((userCard) => (
            <UserCard closeModal={closeModal} linkToDialog isShowButton={false} userCard={userCard} key={userCard.id}></UserCard>
          ))}
      </div>
    </ModalWrapper>
  );
}
