import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDialogs } from "../../../api/messages";
import SkeletonMessage from "../../../skeletons/SkeletonMessage";
import UserMessageCard from "../UserMessageCard/UserMessageCard";
import { findChatByMessage, findUser } from "../../../api/profile";
import { useTranslation } from "react-i18next";
import "./ChatLogs.scss";
import { clearState } from "../../../redux/chatWebSocket";

export default function ChatLogs({
  isInputFocus,
  searchingData,
  chats,
  setChats,
  searchMessages = false,
  setSearchChats,
  searchChats,
  // newMessage,
}) {
  const userId = useSelector((state) => state.authUser.user.id);
  const [chatMessages, setChatMessages] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const newMessage = useSelector(state =>state.chatWebSocket.userMessages);
  useEffect(() => {
    setChatMessages(newMessage);
  }, [newMessage]);


  useEffect(() => {
    fetchChatByMessage();
  }, [searchingData]);

  useEffect(() => {
    fetchUserDialogs();
  }, []);

  // useEffect(() => {
  //   setChatMessages(newMessage)
  // }, [newMessage]);

  function countChatMessage (idChat) {

    // return chatMessages.some((elem) => elem.id === idChat);
    return newMessage?.length !== 0 ? true : false;
  }
      
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
            <li key={elem.id || index} onClick={()=> dispatch(clearState())}> 
              <UserMessageCard
                userData={elem}
                setChats={setChats}
                chats={chats}
                messageCount={countChatMessage(elem.id)}
              >
              </UserMessageCard>
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
                messageCount={countChatMessage(elem.id)}
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
