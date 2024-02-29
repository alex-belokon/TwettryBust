import "./userMessageCard.style.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import BtnDelChat from "../BtnDelChat/BtnDelChat";

export default function UserMessageCard({
  userData,
  closeModal,
  search = false,
}) {
  const [user, setUser] = useState([]);
  const currentUserId = useSelector((state) => state.user.user.id);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    if (userData && userData.creator && userData.user && currentUserId) {
      const isCreator = userData.creator.id === currentUserId;
      setUser(isCreator ? userData.user : userData.creator);
      setChatId(userData.id);
    } else {
      setChatId(userData.chatId);
      setUser(userData.senderId)
    }
  }, [userData]);

  return (
    <div className="userMessageCard__wrapper">
      <NavLink
        to={`${chatId}`}
        state={{ interlocutorId: user.id }}
        className={search ? "messageCard messageCardSearch" : "messageCard"}
        onClick={() => closeModal && closeModal()}
      >
        {user.avatar ? (
          <img className="messageCard__img" src={user.avatar} alt={user.name} />
        ) : (
          <div className="messageCard__img messageCard__img--letter">
            {`${user.username}`.split("")[0]}
          </div>
        )}
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
              {user.firstName} {user.lastName}
            </p>
            <span className="messageCard__login" title={`${user.username}`}>
              {user.username}
            </span>
            <span
              className="messageCard__date"
              title={`${new Date(user.createdAt).toLocaleString()}`}
            >
              {new Date(user.createdAt).toLocaleString()}
            </span>
          </div>
          { userData.lastMessage || userData.content 
          ? <p className="messageCard__lastMessage">{userData.lastMessage || userData.content}</p>
          : <p className="messageCard__lastMessage messageCard__lastMessage--opacity">У вас немає жодного повідомлення</p>}
        </div>
      </NavLink>
      <BtnDelChat chatId={chatId}></BtnDelChat>
    </div>
  );
}
