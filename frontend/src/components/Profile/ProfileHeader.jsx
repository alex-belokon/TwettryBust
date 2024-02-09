import { IoIosArrowRoundBack } from "react-icons/io";
import "./profile.style.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileHeader({ follow = false, userData }) {
  const userDataRedux = useSelector((state) => state.authUser.user);

  return (
    <div className="profileHeader">
      <Link to={`/profile/${userDataRedux.id}`}>
        <IoIosArrowRoundBack
          className="profileHeader__btn"
        />
      </Link>

      <div>
        <h2 className="profileHeader__title">
          {follow
            ? userDataRedux.name + " " + userDataRedux.lastName
            : `${userData?.name || "Guest"} ${userData?.lastName || ""}`}
        </h2>
        {follow ? (
          <span className="profileHeader__info">
            {userDataRedux.login || "@user"}
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
