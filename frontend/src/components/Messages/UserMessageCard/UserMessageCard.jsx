import "./userMessageCard.style.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export default function UserMessageCard({ userData }) {
  const [user, setUser] = useState([]);
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [chatId, setChatId] = useState(null)

  useEffect(() => {
    if (userData && userData.creator && userData.user && currentUserId) {
      const isCreator = userData.creator.id === currentUserId;
      setUser(isCreator ? userData.user : userData.creator);
      setChatId(userData.id)
    }
  }, [userData]);

  return (
    <NavLink to={`${chatId}`} state={{ interlocutorId: user.id }} className="messageCard">
      {user.avatar 
      ? <img className="messageCard__img" src={user.avatar} alt={user.name} />
      : <div className="messageCard__img"></div>} 
      <div className="messageCard__textWrapper">
        <div style={{ display: "flex" }}>
          <p className="messageCard__title">
            {user.firstName} {user.lastName}
          </p>
          <span className="messageCard__login">{user.username}</span>
          <span className="messageCard__date">
            {new Date(user.createdAt).toLocaleString()}
          </span>
        </div>
        <p className="messageCard__lastMessage">{user.lastMessage}</p>
      </div>
    </NavLink>
  );
}
