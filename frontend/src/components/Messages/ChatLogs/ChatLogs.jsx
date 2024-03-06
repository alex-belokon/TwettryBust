import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDialogs } from "../../../api/messages";
import SkeletonMessage from "../../../skeletons/SkeletonMessage";
import UserMessageCard from "../UserMessageCard/UserMessageCard";
import { findChatByMessage, findUser } from "../../../api/profile";
import { useTranslation } from "react-i18next";
import "./ChatLogs.scss";

export default function ChatLogs({
  isInputFocus,
  searchingData,
  chats,
  setChats,
  searchMessages = false,
  setSearchChats,
  searchChats,
}) {
  const userId = useSelector((state) => state.authUser.user.id);
  const { t } = useTranslation();

  useEffect(() => {
    fetchChatByMessage();
  }, [searchingData]);

  useEffect(() => {
    fetchUserDialogs();
  }, []);
  
  async function fetchUserDialogs() {
    try {
      const data = await getUserDialogs(userId);
      setChats(data);
    } catch (e) {
      console.log(e);
    }
  }
  async function fetchChatByMessage() {
    if (searchingData && searchingData.trim() !== "" && searchMessages) {
      try {
        const getData = await findChatByMessage(searchingData);
        setSearchChats(getData.messageDTO);
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <>
      {chats && !isInputFocus && (
        <ul className="hatLogs__list">
          {chats.map((elem, index) => (
            <li key={elem.id || index}>
              <UserMessageCard
                userData={elem}
                setChats={setChats}
                chats={chats}
              ></UserMessageCard>
            </li>
          ))}
        </ul>
      )}
      {isInputFocus && searchChats && (
        <ul className="hatLogs__list">
          {searchChats.map((elem, index) => (
            <li key={elem.id || index}>
              <UserMessageCard
                userData={elem}
                setChats={setSearchChats}
                chats={searchChats}
              ></UserMessageCard>
            </li>
          ))}
        </ul>
      )}
      {isInputFocus && !chats && (
        <p className="chatLogs__text">{t("messages.search")}</p>
      )}

      {!isInputFocus && !chats && <SkeletonMessage></SkeletonMessage>}
    </>
  );
}
