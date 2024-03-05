import { avatarColor } from "../../utils/avatarColor";
import "./UserAvatar.scss";

export default function UserAvatar({  userName = "U", userAvatar = null, size = null}) {

  return (
    <>
      <div className={`${size} userAvatar__wrapper ${avatarColor(userName[0])}`}>
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
