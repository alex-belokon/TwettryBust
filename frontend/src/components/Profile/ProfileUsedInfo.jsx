import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";
import FollowActions from "./FollowActions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import BtnFollow from "../UserCard/BtnFollow";
export default function ProfileUsedInfo({ userData, setUserData }) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { t } = useTranslation();
  const userId = useSelector((state) => state.authUser.user.id);
  const { id } = useParams();
  
  const isCurrentUser = userId === id;

  return (
    <>
      <div className="profile__banner">
        {userData.banner && (
          <img
            className="profile__bannerImg"
            src={userData.banner}
            aria-hidden="true"
          />
        )
      }
      </div>
      <div className="profileInfo">
        <div className="profileInfo__photoWrapper">
          <div className="profile__userScreensaver">
            {userData.userScreensaver ? (
              <img
                className="profile__screensaver"
                src={userData.userScreensaver}
                alt={userData.name + " photo"}
              />
            ) : (
              <span>{`${userData.name}`.split("")[0]}</span>
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
              <Link to='/messages' className="profile__btnLetter" aria-label="send letter">
                <FaRegEnvelope />
              </Link>
              <div style={{width: '110px'}}></div>
              <BtnFollow></BtnFollow>
            </div>
          )}
        </div>
        <h2 className="profileInfo__userName">
          {userData.name} {userData.lastName}{" "}
        </h2>
        <p className="profileInfo__userMail">{userData.login}</p>
        <p className="profileInfo__bio">{userData.bio}</p>
        <p className="profileInfo__date">
          <IoCalendarOutline className="icon" />
          {t("userProfile.joined")} {userData.joiningDate}
        </p>

        <FollowActions
          following={userData.following}
          followers={userData.followers}
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
