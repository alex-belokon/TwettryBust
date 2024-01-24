import { IoIosArrowRoundBack } from "react-icons/io";
import "./profile.style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileHeader({ follow = false, userData }) {
  const userDataRedux = useSelector((state) => state.authUser.user);
  const navigate = useNavigate();

  return (
    <div className="profileHeader">
      <IoIosArrowRoundBack
        className="profileHeader__btn"
        onClick={() => navigate(-1)}
      />
      <div>
        <h2 className="profileHeader__title">
          {follow
            ? userDataRedux.name + ' ' +userDataRedux.lastName
            :`${userData?.name || 'Guest'} ${userData?.lastName || ''}`}
        </h2>
        {follow ? (
          <span className="profileHeader__info">{userDataRedux.login || "@User"}</span>
        ) : (
          <span className="profileHeader__info">{userData?.postsNumber || 0} posts</span>
        )}
      </div>
    </div>
  );
}
