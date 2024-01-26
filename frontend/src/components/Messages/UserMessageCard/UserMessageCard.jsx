import "./userMessageCard.style.scss";
import { NavLink } from "react-router-dom";

export default function UserMessageCard({ userData }) {

  return (
    <NavLink to={`${userData.id}`} className="messageCard">
      <img className="messageCard__img" src={userData.userScreensaver} alt={userData.name} />
      <div style={{flexGrow: '1'}}>
        <div style={{display: 'flex'}}>
          <p className="messageCard__title">
            {userData.name} {userData.lastName}
          </p>
          <span className="messageCard__login">{userData.login}</span>
          <span className="messageCard__date">{userData.dateOfLastMessage}</span>
        </div>
        <p className="messageCard__lastMessage">{userData.lastMessage}</p>
      </div>
    </NavLink>
  );
}
