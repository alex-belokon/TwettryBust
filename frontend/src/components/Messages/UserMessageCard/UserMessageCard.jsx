import "./userMessageCard.style.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import BtnDelChat from "../BtnDelChat/BtnDelChat";
import { useTranslation } from "react-i18next";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function UserMessageCard({
  userData,
  closeModal,
  search = false,
  setChats,
  chats,
  messageCount=false,
}) {
  const [user, setUser] = useState([]);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [chatId, setChatId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (userData && userData.creator && userData.user && currentUserId) {
      const isCreator = userData.creator.id === currentUserId;
      setUser(isCreator ? userData.user : userData.creator);
      setChatId(userData.id);
    } else {
      setChatId(userData.chatId);
      setUser(userData);
    }
  }, [userData]);

  return (
    <div className="userMessageCard__wrapper">
      <NavLink
        to={`${chatId}`}
        state={{ interlocutorId: user.id }}
        className={`messageCard ${search ? "messageCardSearch" : ""} ${messageCount ? "messageCardNewMessage__bg" : ""}`}
        onClick={() => closeModal && closeModal()}
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
              {userData.timestamp
                ? new Date(userData.timestamp).toLocaleString()
                : new Date(user.createdAt).toLocaleString()}
            </span>
          </div>
          {userData.lastMessage || userData.content ? (
            <p className="messageCard__lastMessage">
              {userData.lastMessage || userData.content}
            </p>
          ) : (
            <p className="messageCard__lastMessage messageCard__lastMessage--opacity">
              {t("messages.noMessages")}
            </p>
          )}
        </div>
      </NavLink>
      {!search && (
        <div>
          {messageCount && <div className="userMessageCard__messageCount"></div> }
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
