import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";
import FollowActions from "./FollowActions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import BtnFollow from "../UserCard/BtnFollow";
import { createNewDialog } from "../../api/messages";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { avatarColor } from "../../utils/avatarColor";
export default function ProfileUsedInfo({ userData, setUserData }) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { t } = useTranslation();
  const userId = useSelector((state) => state.user.user.id);
  const { id } = useParams();

  const isCurrentUser = userId === id;
  const options = { day: 'numeric', month: 'short', year: 'numeric' };

  async function createDialog() {
    try {
      await createNewDialog(userId, id);
    } catch (e) {
      console.log(e);
    }
  }

  function formattedDate (data) {
    return new Date(data).toLocaleDateString('uk-UA', options)
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
          <div className={`profile__userScreensaver ${avatarColor(userData.userName.split("")[0])}`}>
            {userData.avatar ? (
              <img
                className="profile__screensaver"
                src={userData.avatar}
                alt={userData.userName + " photo"}
              />
            ) : (
              <span>{`${userData.userName}`.split("")[0]}</span>
            )}
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
                to="/messages"
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
              <span style={{ margin: "0 5px" }}>{t("userProfile.birthday")}</span>
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
