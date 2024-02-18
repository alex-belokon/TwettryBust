import { IoIosArrowRoundBack } from "react-icons/io";
import "./profile.style.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileHeader({ follow = false, userData }) {
  const user = useSelector((state) => state.authUser.user);

  return (
    <div className="profileHeader">
      <Link to={`/profile/${user.id}`}>
        <IoIosArrowRoundBack
          className="profileHeader__btn"
        />
      </Link>

      <div>
        <h2 className="profileHeader__title">
          {follow
            ? user.userName + " " + user.lastName
            : `${userData?.userName || "Guest"} ${userData?.lastName || ""}`}
        </h2>
        {follow ? (
          <span className="profileHeader__info">
            {user.email || "@user"}
          </span>
        ) : (
          <span className="profileHeader__info">
            {userData?.postsNumber || 0} posts
          </span>
        )}
      </div>
    </div>
  );
}
