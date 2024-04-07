import "./userMessageCard.style.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import BtnDelChat from "../BtnDelChat/BtnDelChat";
import { useTranslation } from "react-i18next";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { clearState } from "../../../redux/chatWebSocket";

export default function UserMessageCard({
  userData,
  closeModal,
  search = false,
  setChats,
  chats,
  messageCount = false,
}) {
  const [user, setUser] = useState([]);
  const [userDataProps, setUserDataProps] = useState(
    userData.senderId ? userData.senderId : userData
  );
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [chatId, setChatId] = useState(null);
  const { t } = useTranslation();
  const newMessage = useSelector((state) => state.chatWebSocket.userMessages);
  const dispatch = useDispatch();
  const filteredMessage = newMessage.filter(message => message.chatId === chatId)
  const lastMessage = filteredMessage[filteredMessage.length - 1];

  useEffect(()=> {
    if(lastMessage) {
      setUserDataProps({...userDataProps, lastMessage: lastMessage.content})
    }
  }, [lastMessage])

  useEffect(() => {
    if (
      userDataProps &&
      userDataProps.creator &&
      userDataProps.user &&
      currentUserId
    ) {
      const isCreator = userDataProps.creator.id === currentUserId;
      setUser(isCreator ? userDataProps.user : userDataProps.creator);
      setChatId(userDataProps.id);
    } else {
      setChatId(userData.chatId);
      setUser(userDataProps);
    }
  }, [userData]);

  function sime() {
    closeModal && closeModal();
    dispatch(clearState(newMessage.filter((elem) => elem.chatId !== chatId)));
  }

  return (
    <div className="userMessageCard__wrapper">
      <NavLink
        to={`${chatId}`}
        state={{ interlocutorUser: user }}
        className={`messageCard ${search ? "messageCardSearch" : ""} ${
          messageCount ? "messageCardNewMessage__bg" : ""
        }`}
        onClick={() => sime()}
      >
        <UserAvatar
          userName={user?.username}
          userAvatar={user?.avatar}
        ></UserAvatar>

        <div className="messageCard__textWrapper">
          <div style={{ display: "flex" }}>
            <p
              className="messageCard__title"
              title={
                user.firstName &&
                user.lastName &&
                `${user.firstName} ${user.lastName}`
              }
            >
              {user.firstName || user.lastName
                ? `${user.firstName} ${user.lastName}`
                : "User"}
            </p>
            <span className="messageCard__login" title={`${user.username}`}>
              {user.username}
            </span>
            <span
              className="messageCard__date"
              title={`${new Date(user.createdAt).toLocaleString()}`}
            >
              {userDataProps.timestamp
                ? new Date(userDataProps.timestamp).toLocaleString()
                : new Date(user.createdAt).toLocaleString()}
            </span>
          </div>
          {lastMessage ? (
            <p className="messageCard__lastMessage">{lastMessage.content}</p>
          ) : (
            <p className="messageCard__lastMessage messageCard__lastMessage--opacity">
              {userDataProps.lastMessage ||
                userData.content ||
                t("messages.noMessages")}
            </p>
          )}
        </div>
      </NavLink>
      {!search && (
        <div>
          {messageCount && (
            <div className="userMessageCard__messageCount"></div>
          )}
          <BtnDelChat
            chatId={chatId}
            setChats={setChats}
            chats={chats}
          ></BtnDelChat>
        </div>
      )}
    </div>
  );
}
