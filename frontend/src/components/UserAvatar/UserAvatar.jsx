import { avatarColor } from "../../utils/avatarColor";
import "./UserAvatar.scss";

export default function UserAvatar({  userName, userAvatar = null, size = null}) {
console.log(userName)
  return (
    <>
      <div className={`${size} userAvatar__wrapper ${avatarColor(userName ? userName[0] : 'U')}`}>
        {userAvatar ? (
          <img
            className="userAvatar__img"
            src={userAvatar}
            alt={userName + " photo"}
          />
        ) : (
          <span>{`${userName}`?.[0] || "U"}</span>
        )}
      </div>
    </>
  );
}
