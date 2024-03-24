import { IoIosArrowRoundBack } from "react-icons/io";
import "./profile.style.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileHeader({ follow = false, userData }) {
  const user = useSelector((state) => state.user.user);
  const displayUserData = userData ? userData : user;

  return (
    <div className="profileHeader">
      <Link to={`/profile/${displayUserData.id}`} aria-label='Go to profile'>
        <IoIosArrowRoundBack
          className="profileHeader__btn"
        />
      </Link>

      <div>
        <h2 className="profileHeader__title">
          {(displayUserData.firstName || displayUserData.lastName)
            ? displayUserData.firstName + " " + displayUserData.lastName
            : `${displayUserData?.userName}`}
            
        </h2>
        {follow ? (
          <span className="profileHeader__info">
            {displayUserData.userName || "@user"}
          </span>
        ) : (
          <span className="profileHeader__info">
            {displayUserData?.postsCount || 0} posts
          </span>
        )}
      </div>
    </div>
  );
}
