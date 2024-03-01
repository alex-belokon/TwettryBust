import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDialogs } from "../../../api/messages";
import SkeletonMessage from "../../../skeletons/SkeletonMessage";
import UserMessageCard from "../UserMessageCard/UserMessageCard";
import { findChatByMessage, findUser } from "../../../api/profile";
import { useTranslation } from "react-i18next";
import "./ChatLogs.scss";

export default function ChatLogs({ isInputFocus, searchingData, chats, setChats, searchMessages=false }) {
  const userId = useSelector((state) => state.user.user.id);
  const { t } = useTranslation();
 
  useEffect(() => {
    async function fetchData() {
      if (searchingData && searchingData.trim() !== "") {
        try {
          let data;
          if (searchMessages) {
            data = await findChatByMessage(searchingData);
          } else {
            data = await findUser(searchingData);
          }
          setChats(data);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const data = await getUserDialogs(userId);
          setChats(data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [searchingData]);

  return (
    <>
      {chats && (
        <ul className="hatLogs__list">
          {chats.map((elem, index) => (
            <li key={elem.id || index}>
              <UserMessageCard userData={elem}></UserMessageCard>
            </li>
          ))}
        </ul>
      )}
      {isInputFocus && !chats &&(
        <p className="chatLogs__text">
          {t('messages.search')}
        </p>
      )}

       {!isInputFocus && !chats && (
        <SkeletonMessage></SkeletonMessage>
      )}
    </>
  );
}



// {
// avatar:"http://res.cloudinary.com/dfrps0cby/image/upload/v1709124163/wcdfdbmfe3sedtxxix4p.jpg"
// createdAt:"2024-02-28T14:14:57.602797"
// firstName: "Anna"
// id:"29645c69-aa43-4269-b9a8-d11ccb52794f"
// lastName: ""
// userName: "Anna"
// lastMessage: ''
// }