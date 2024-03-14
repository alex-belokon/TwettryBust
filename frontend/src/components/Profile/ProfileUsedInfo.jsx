import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";
import FollowActions from "./FollowActions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import BtnFollow from "../UserCard/BtnFollow";
import { createNewDialog } from "../../api/messages";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import UserAvatar from "../UserAvatar/UserAvatar";
import i18next from "i18next";
export default function ProfileUsedInfo({ userData, setUserData }) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { t } = useTranslation();
  const userId = useSelector((state) => state.user.user.id);
  const { id } = useParams();
  const navigate = useNavigate();

  const isCurrentUser = userId === id;
  const options = { day: "numeric", month: "short", year: "numeric" };

  async function createDialog() {
    try {
      const data = await createNewDialog(userId, id);
      console.log(data);
      const interlocutorId = data.creator.id === userId ? data.user.id : data.creator.id;
      navigate(`/messages/${data.id}`, { state: { interlocutorId: interlocutorId } });
    } catch (e) {
      console.log(e);
    }
  }

  function formattedDate(data) {
    return new Date(data).toLocaleDateString(i18next.language, options);
  }

  return (
    <>
      <div className="profile__banner">
        {userData.headerPhoto && (
          <img
            className="profile__bannerImg"
            src={userData.headerPhoto}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="profileInfo">
        <div className="profileInfo__photoWrapper">
          <div className={`profile__userScreensaver`}>
            <UserAvatar
              userName={userData?.userName}
              userAvatar={userData?.avatar}
              size="big"
            ></UserAvatar>
          </div>
          {isCurrentUser ? (
            <button
              className="profile__btn"
              onClick={() => setIsModalEditOpen(true)}
            >
              {t("btn.editProfile")}
            </button>
          ) : (
            <div className="userActions">
              <Link
                className="profile__btnLetter"
                aria-label="send letter"
                onClick={createDialog}
              >
                <FaRegEnvelope />
              </Link>
              <div style={{ width: "110px" }}></div>
              <BtnFollow userData={userData}></BtnFollow>
            </div>
          )}
        </div>
        <h2 className="profileInfo__userName">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="profileInfo__userMail">{userData.userName}</p>
        <p className="profileInfo__bio">{userData.bio}</p>

        <div className="profileInfo__dateWrapper">
          {userData.location && (
             <p className="profileInfo__date">
               <IoLocationOutline className="userProfile_icon" />
               {userData.location}
             </p>
           )}
          {userData.website && (
             <p className="profileInfo__date">
               <AiOutlineLink  className="userProfile_icon" />
               <a href={userData.website} target="_blank">{userData.website}</a>
             </p>
           )}
          {userData.createdAt && (
            <p className="profileInfo__date">
              <IoCalendarOutline className="userProfile_icon" />
              <span style={{ margin: "0 5px" }}>{t("userProfile.joined")}</span>
              {formattedDate(userData.createdAt)}
            </p>
          )}
          {userData.dateOfBirth && (
            <p className="profileInfo__date">
              <LiaBirthdayCakeSolid className="userProfile_icon" />
              <span style={{ margin: "0 5px" }}>
                {t("userProfile.birthday")}
              </span>
              {formattedDate(userData.dateOfBirth)}
            </p>
          )}

          
      
        </div>

        <FollowActions
          following={userData.following}
          followers={userData.followers}
          userData={userData}
        ></FollowActions>
      </div>

      {isModalEditOpen && (
        <ModalEditProfile
          userData={userData}
          setUserData={setUserData}
          closeModal={() => setIsModalEditOpen(false)}
        ></ModalEditProfile>
      )}
    </>
  );
}

ProfileUsedInfo.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
};
