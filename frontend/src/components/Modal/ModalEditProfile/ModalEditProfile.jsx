import ModalWrapper from "../ModalElements/ModalWrapper";
import PropTypes from "prop-types";
import "./modalEditProfile.style.scss";
import { RxCross1 } from "react-icons/rx";
import { TbCameraPlus } from "react-icons/tb";
import { useState } from "react";
import UploadWidget from "../../UploadWidget";
export default function ModalEditProfile({ closeModal }) {
  const [bannerUrl, setBannerUrl] = useState(null);

  const userData = {
    // banner: null,
    // userScreensaver: null,
    banner: bannerUrl,
    userScreensaver:
      "https://sitis.com.ua/upload/medialibrary/121/Programmist_1c.jpg",
    name: "Name",
    lastName: "User",
    bio: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae totam sint, voluptatibus corporis quos debitis eaque cupiditate molestiae. Assumenda, ut.",
    login: "@userName3333",
    joiningDate: "серпень 2023",
    location: "Ukraine",
    birthDate: "22.10.13",
    following: "2",
    followers: "5",
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="modalEditProfile__header">
        <h3 className="modalEditProfile__title">Edit profile</h3>
        <button className="modalEditProfile__btnSave">Save</button>
      </div>
      <div className="modalEditProfile__body">
        <div className="modalEditProfile__banner">
          {userData.banner && (
            <img
              className="modalEditProfile__bannerImg"
              src={userData.banner}
              alt="user banner"
            />
          )}
          <div className="modalEditProfile__bannerBtnWrapper">
            <UploadWidget imgUrl={setBannerUrl} className='modalEditProfile__bannerAddBtn'>
              <TbCameraPlus size={22} />
            </UploadWidget>
            <button className="modalEditProfile__bannerRemoveBtn" onClick={()=>setBannerUrl(null)} aria-label="delete image">
              <RxCross1 size={18} />
            </button>
          </div>
        </div>

        {userData.userScreensaver ? (
          <img
            className="modalEditProfile__screensaver"
            src={userData.userScreensaver}
            alt={userData.name + " photo"}
          />
        ) : (
          <span>{`${userData.name}`.split("")[0]}</span>
        )}
      </div>
    </ModalWrapper>
  );
}

ModalEditProfile.propTypes = {
  closeModal: PropTypes.func,
};
